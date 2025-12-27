// Расчёт плотности достопримечательностей и туристического ядра

import {
  attractions,
  KAZAN_BOUNDS,
  GRID_SIZE,
  DENSITY_RADIUS,
  TOURIST_THRESHOLD,
} from '@/data/attractions';

export interface GridCell {
  row: number;
  col: number;
  lat: number;
  lng: number;
  density: number;
  isTouristCore: boolean;
}

export interface DensityGrid {
  cells: GridCell[][];
  maxDensity: number;
  touristCoreCells: GridCell[];
}

// Расчёт расстояния между двумя точками (Haversine)
function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // Радиус Земли в км
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Расчёт плотности для одной ячейки
function calculateCellDensity(
  cellLat: number,
  cellLng: number,
  radius: number
): number {
  let density = 0;

  for (const attraction of attractions) {
    const distance = haversineDistance(
      cellLat,
      cellLng,
      attraction.lat,
      attraction.lng
    );

    // Дистанция в градусах ~= radius * 111 км на градус широты
    const distanceInDegrees = distance / 111;

    if (distanceInDegrees <= radius) {
      // Используем гауссово сглаживание с учётом веса
      const influence =
        attraction.weight *
        Math.exp(-Math.pow(distanceInDegrees / radius, 2) * 2);
      density += influence;
    }
  }

  return density;
}

// Создание сетки плотности
export function createDensityGrid(): DensityGrid {
  const latStep = (KAZAN_BOUNDS.north - KAZAN_BOUNDS.south) / GRID_SIZE;
  const lngStep = (KAZAN_BOUNDS.east - KAZAN_BOUNDS.west) / GRID_SIZE;

  const cells: GridCell[][] = [];
  let maxDensity = 0;

  // Первый проход: расчёт плотности
  for (let row = 0; row < GRID_SIZE; row++) {
    cells[row] = [];
    for (let col = 0; col < GRID_SIZE; col++) {
      const lat = KAZAN_BOUNDS.south + (row + 0.5) * latStep;
      const lng = KAZAN_BOUNDS.west + (col + 0.5) * lngStep;

      const density = calculateCellDensity(lat, lng, DENSITY_RADIUS);

      cells[row][col] = {
        row,
        col,
        lat,
        lng,
        density,
        isTouristCore: false,
      };

      if (density > maxDensity) {
        maxDensity = density;
      }
    }
  }

  // Второй проход: нормализация и определение туристического ядра
  const touristCoreCells: GridCell[] = [];

  for (let row = 0; row < GRID_SIZE; row++) {
    for (let col = 0; col < GRID_SIZE; col++) {
      const cell = cells[row][col];
      const normalizedDensity = maxDensity > 0 ? cell.density / maxDensity : 0;

      cell.density = normalizedDensity;
      cell.isTouristCore = normalizedDensity >= TOURIST_THRESHOLD;

      if (cell.isTouristCore) {
        touristCoreCells.push(cell);
      }
    }
  }

  return { cells, maxDensity, touristCoreCells };
}

// Проверка, находится ли точка в туристическом ядре
export function isInTouristCore(
  lat: number,
  lng: number,
  grid: DensityGrid
): boolean {
  const latStep = (KAZAN_BOUNDS.north - KAZAN_BOUNDS.south) / GRID_SIZE;
  const lngStep = (KAZAN_BOUNDS.east - KAZAN_BOUNDS.west) / GRID_SIZE;

  const row = Math.floor((lat - KAZAN_BOUNDS.south) / latStep);
  const col = Math.floor((lng - KAZAN_BOUNDS.west) / lngStep);

  if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
    return grid.cells[row][col].isTouristCore;
  }

  return false;
}

// Создание GeoJSON полигона для туристического ядра
export function createTouristCoreGeoJSON(grid: DensityGrid): GeoJSON.FeatureCollection {
  const latStep = (KAZAN_BOUNDS.north - KAZAN_BOUNDS.south) / GRID_SIZE;
  const lngStep = (KAZAN_BOUNDS.east - KAZAN_BOUNDS.west) / GRID_SIZE;

  const features: GeoJSON.Feature[] = grid.touristCoreCells.map((cell) => {
    const south = KAZAN_BOUNDS.south + cell.row * latStep;
    const north = south + latStep;
    const west = KAZAN_BOUNDS.west + cell.col * lngStep;
    const east = west + lngStep;

    return {
      type: 'Feature',
      properties: {
        density: cell.density,
      },
      geometry: {
        type: 'Polygon',
        coordinates: [
          [
            [west, south],
            [east, south],
            [east, north],
            [west, north],
            [west, south],
          ],
        ],
      },
    };
  });

  return {
    type: 'FeatureCollection',
    features,
  };
}

// Создание GeoJSON для тумана с вырезами (holes)
export function createFogGeoJSON(
  revealedPoints: { lat: number; lng: number; radius: number }[]
): GeoJSON.Feature {
  // Внешний контур тумана - покрываем весь мир с запасом
  const outerRing: GeoJSON.Position[] = [
    [-180, -85],
    [180, -85],
    [180, 85],
    [-180, 85],
    [-180, -85],
  ];

  // Создаём вырезы для каждой открытой точки
  const holes: GeoJSON.Position[][] = revealedPoints.map((point) => {
    const hole: GeoJSON.Position[] = [];
    const segments = 32;

    // Создаём круг (в обратном направлении для hole)
    for (let i = segments; i >= 0; i--) {
      const angle = (i / segments) * 2 * Math.PI;
      const lat = point.lat + point.radius * Math.cos(angle);
      const lng =
        point.lng +
        (point.radius * Math.sin(angle)) / Math.cos((point.lat * Math.PI) / 180);
      hole.push([lng, lat]);
    }

    return hole;
  });

  return {
    type: 'Feature',
    properties: {},
    geometry: {
      type: 'Polygon',
      coordinates: [outerRing, ...holes],
    },
  };
}

// Получение границ ячейки сетки
export function getCellBounds(cell: GridCell): {
  north: number;
  south: number;
  east: number;
  west: number;
} {
  const latStep = (KAZAN_BOUNDS.north - KAZAN_BOUNDS.south) / GRID_SIZE;
  const lngStep = (KAZAN_BOUNDS.east - KAZAN_BOUNDS.west) / GRID_SIZE;

  return {
    south: KAZAN_BOUNDS.south + cell.row * latStep,
    north: KAZAN_BOUNDS.south + (cell.row + 1) * latStep,
    west: KAZAN_BOUNDS.west + cell.col * lngStep,
    east: KAZAN_BOUNDS.west + (cell.col + 1) * lngStep,
  };
}
