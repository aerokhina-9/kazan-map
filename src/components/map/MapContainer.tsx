'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useApp } from '@/lib/context';
import { KAZAN_CENTER } from '@/data/attractions';
import { createTouristCoreGeoJSON, createFogGeoJSON } from '@/lib/density';
import { getRevealedPoints } from '@/lib/findings';
import { getCategoryById } from '@/lib/categories';
import { translations } from '@/lib/i18n';
import * as LucideIcons from 'lucide-react';

// Фикс иконок Leaflet
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Компонент для обработки кликов по карте
function MapClickHandler() {
  const { isAddingFinding, setPendingLocation, mode } = useApp();

  useMapEvents({
    click: (e) => {
      if (isAddingFinding && mode === 'explorer') {
        setPendingLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      }
    },
  });

  return null;
}

// Компонент с прицелом и подсказкой для выбора места
function AddingModeOverlay() {
  const { isAddingFinding, pendingLocation, setPendingLocation, mode } = useApp();
  const map = useMap();

  const handleConfirmCenter = () => {
    const center = map.getCenter();
    setPendingLocation({ lat: center.lat, lng: center.lng });
  };

  if (!isAddingFinding || mode !== 'explorer' || pendingLocation) return null;

  return (
    <>
      {/* Crosshair in center */}
      <div className="absolute inset-0 pointer-events-none z-[999] flex items-center justify-center">
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 -translate-x-1/2 w-0.5 h-16 bg-indigo-600" />
          {/* Horizontal line */}
          <div className="absolute top-1/2 -translate-y-1/2 h-0.5 w-16 bg-indigo-600" />
          {/* Center dot */}
          <div className="w-4 h-4 bg-indigo-600 rounded-full border-2 border-white shadow-lg" />
          {/* Pulsing ring */}
          <div className="absolute inset-0 -m-4 w-12 h-12 border-4 border-indigo-400 rounded-full animate-ping opacity-30" />
        </div>
      </div>

      {/* Top instruction banner */}
      <div className="absolute top-16 md:top-20 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto max-w-[90%] md:max-w-none">
        <div className="bg-indigo-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl shadow-xl flex flex-col items-center gap-1.5 md:gap-2">
          <div className="font-medium flex items-center gap-2 text-sm md:text-base">
            <LucideIcons.MousePointerClick size={18} className="md:w-5 md:h-5" />
            <span className="text-xs md:text-base">Двигай карту и нажми кнопку ниже</span>
          </div>
          <div className="text-xs md:text-sm text-indigo-200">
            или кликни прямо на карту
          </div>
        </div>
      </div>

      {/* Bottom confirm button */}
      <div className="absolute bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 z-[1000] pointer-events-auto max-w-[90%] md:max-w-none">
        <button
          onClick={handleConfirmCenter}
          className="bg-white text-indigo-600 px-5 py-3 md:px-8 md:py-4 rounded-xl shadow-xl font-bold flex items-center gap-2 md:gap-3 hover:bg-indigo-50 transition-colors border-2 border-indigo-600 text-sm md:text-base"
        >
          <LucideIcons.MapPin size={20} className="md:w-6 md:h-6" />
          <span className="text-xs md:text-base">Выбрать эту точку</span>
        </button>
      </div>
    </>
  );
}

// Компонент для анимированного тумана
function AnimatedFog() {
  const { findings, densityGrid } = useApp();
  const [fogOpacity, setFogOpacity] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);

  // Получаем точки для вырезов
  const revealedPoints = useMemo(() => getRevealedPoints(findings), [findings]);

  // Создаём GeoJSON тумана с вырезами
  const fogGeoJSON = useMemo(() => createFogGeoJSON(revealedPoints), [revealedPoints]);

  // Анимация появления тумана
  useEffect(() => {
    const timer = setTimeout(() => {
      setFogOpacity(0.7);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Триггерим анимацию при изменении находок
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [findings.length]);

  if (!densityGrid) return null;

  return (
    <GeoJSON
      key={`fog-${animationKey}`}
      data={fogGeoJSON}
      style={{
        fillColor: '#1a1a2e',
        fillOpacity: fogOpacity,
        stroke: false,
        className: 'fog-layer',
      }}
    />
  );
}

// Компонент туристического ядра
function TouristCoreLayer() {
  const { densityGrid } = useApp();
  const [visible, setVisible] = useState(false);

  const touristCoreGeoJSON = useMemo(() => {
    if (!densityGrid) return null;
    return createTouristCoreGeoJSON(densityGrid);
  }, [densityGrid]);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  if (!touristCoreGeoJSON || !visible) return null;

  return (
    <GeoJSON
      data={touristCoreGeoJSON}
      style={(feature) => ({
        fillColor: '#ef4444',
        fillOpacity: 0.15 + (feature?.properties?.density || 0) * 0.2,
        color: '#ef4444',
        weight: 0.5,
        opacity: 0.3,
      })}
    />
  );
}

// Создание кастомной иконки для маркера
function createMarkerIcon(category: string, type: string): L.DivIcon {
  const cat = getCategoryById(category);
  const color = cat?.color || '#6366f1';
  const isFood = type === 'Food' || type === 'Drink';

  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        border-radius: ${isFood ? '8px' : '50%'};
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.3s ease;
      " class="marker-icon">
        <div style="
          width: 12px;
          height: 12px;
          background: white;
          border-radius: ${isFood ? '2px' : '50%'};
          opacity: 0.9;
        "></div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
}

// Компонент маркера находки
function FindingMarker({ finding }: { finding: { id: string; lat: number; lng: number; type: string; category: string; note?: string; trust: number; timeActivity: string } }) {
  const { confirmFinding, lang, getNestedTranslation } = useApp();
  const [isAnimating, setIsAnimating] = useState(true);
  const category = getCategoryById(finding.category);

  // Получаем компонент иконки
  const IconComponent = category?.icon
    ? (LucideIcons as unknown as Record<string, React.ComponentType<{ size?: number; color?: string }>>)[category.icon]
    : LucideIcons.MapPin;

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(false), 700);
    return () => clearTimeout(timer);
  }, []);

  const timeLabels = {
    day: translations.timeActivity.day,
    evening: translations.timeActivity.evening,
    night: translations.timeActivity.night,
  };

  return (
    <Marker
      position={[finding.lat, finding.lng]}
      icon={createMarkerIcon(finding.category, finding.type)}
    >
      <Popup>
        <div className={`p-2 min-w-[200px] ${isAnimating ? 'animate-pop-in' : ''}`}>
          <div className="flex items-center gap-2 mb-2">
            {IconComponent && <IconComponent size={20} color={category?.color} />}
            <span className="font-medium" style={{ color: category?.color }}>
              {category ? getNestedTranslation(category.label) : finding.category}
            </span>
          </div>

          <div className="text-sm text-gray-600 space-y-1">
            <p>
              <span className="text-gray-400">{getNestedTranslation(translations.findingPopup.timeActive)}:</span>{' '}
              {getNestedTranslation(timeLabels[finding.timeActivity as keyof typeof timeLabels])}
            </p>
            <p>
              <span className="text-gray-400">{getNestedTranslation(translations.findingPopup.trust)}:</span>{' '}
              <span className="font-medium">{finding.trust}</span>
            </p>
            {finding.note && (
              <p className="italic text-gray-500 mt-2">&ldquo;{finding.note}&rdquo;</p>
            )}
          </div>

          <button
            onClick={() => confirmFinding(finding.id)}
            className="mt-3 w-full py-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg transition-colors"
          >
            {getNestedTranslation(translations.actions.confirm)} (+1)
          </button>
        </div>
      </Popup>
    </Marker>
  );
}

// Компонент для полёта к новой находке
function FlyToNewFinding() {
  const { lastAddedFinding } = useApp();
  const map = useMap();

  useEffect(() => {
    if (lastAddedFinding) {
      map.flyTo([lastAddedFinding.lat, lastAddedFinding.lng], 15, {
        duration: 1,
      });
    }
  }, [lastAddedFinding, map]);

  return null;
}

// Маркер ожидающей позиции
function PendingLocationMarker() {
  const { pendingLocation } = useApp();
  const map = useMap();

  useEffect(() => {
    if (pendingLocation) {
      map.flyTo([pendingLocation.lat, pendingLocation.lng], map.getZoom(), {
        duration: 0.5,
      });
    }
  }, [pendingLocation, map]);

  if (!pendingLocation) return null;

  const pulsingIcon = L.divIcon({
    className: 'pending-marker',
    html: `
      <div style="
        width: 40px;
        height: 40px;
        position: relative;
      ">
        <div style="
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: rgba(99, 102, 241, 0.3);
          animation: pulse 1.5s ease-out infinite;
        "></div>
        <div style="
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 16px;
          height: 16px;
          background: #6366f1;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        "></div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });

  return <Marker position={[pendingLocation.lat, pendingLocation.lng]} icon={pulsingIcon} />;
}

// Маркер пользователя (Марио-стиль)
function UserLocationMarker() {
  const { mode } = useApp();
  const map = useMap();

  // Демо-позиция в центре Казани (всегда используем её для демо)
  const demoPosition: [number, number] = [55.7887, 49.1221];

  // Обработчик кнопки "Найти Марио"
  useEffect(() => {
    const handleFlyToMario = () => {
      map.flyTo(demoPosition, 15, { duration: 1 });
    };

    window.addEventListener('flyToMario', handleFlyToMario);
    return () => window.removeEventListener('flyToMario', handleFlyToMario);
  }, [map]);

  // Показываем персонажа только в режиме исследователя
  if (mode !== 'explorer') return null;

  // Всегда используем демо-позицию (пользователь в Израиле, геолокация бесполезна)
  const currentPosition = demoPosition;

  const marioIcon = L.divIcon({
    className: 'mario-marker',
    html: `
      <div style="
        width: 64px;
        height: 80px;
        position: relative;
      ">
        <!-- Тень -->
        <div style="
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 10px;
          background: rgba(0,0,0,0.3);
          border-radius: 50%;
          animation: shadow-pulse 1s ease infinite;
        "></div>
        <!-- Марио -->
        <img
          src="/mario"
          style="
            width: 64px;
            height: 64px;
            object-fit: contain;
          "
        />
        <!-- Индикатор -->
        <div style="
          position: absolute;
          top: -16px;
          left: 50%;
          transform: translateX(-50%);
          background: #e74c3c;
          color: white;
          font-size: 11px;
          font-weight: bold;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
        ">
          ЭТО ТЫ!
        </div>
      </div>
    `,
    iconSize: [64, 80],
    iconAnchor: [32, 70],
  });

  return <Marker position={currentPosition} icon={marioIcon} />;
}

// Основной компонент карты
export default function KazanMap() {
  const { findings, selectedCategories, showFood, mode } = useApp();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Фильтруем находки по категориям и типу
  const filteredFindings = useMemo(() => {
    return findings.filter((f) => {
      // Фильтр по типу Food/Drink
      if (!showFood && (f.type === 'Food' || f.type === 'Drink')) {
        return false;
      }

      // Фильтр по категориям
      if (selectedCategories.length > 0 && !selectedCategories.includes(f.category)) {
        return false;
      }

      return true;
    });
  }, [findings, selectedCategories, showFood]);

  if (!isClient) {
    return (
      <div className="w-full h-full bg-gray-900 flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading map...</div>
      </div>
    );
  }

  return (
    <>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.7;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }

        @keyframes bounce {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        @keyframes pop-in {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .animate-pop-in {
          animation: pop-in 0.5s ease-out;
        }

        .fog-layer {
          transition: fill-opacity 0.7s ease-out;
        }

        .leaflet-popup-content-wrapper {
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.15);
        }

        .marker-icon:hover {
          transform: scale(1.2);
        }

        .custom-marker, .pending-marker, .mario-marker {
          background: transparent !important;
          border: none !important;
        }
      `}</style>

      <MapContainer
        center={[KAZAN_CENTER.lat, KAZAN_CENTER.lng]}
        zoom={12}
        style={{ height: '100%', width: '100%' }}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Туристическое ядро */}
        <TouristCoreLayer />

        {/* Туман */}
        <AnimatedFog />

        {/* Маркеры находок */}
        {filteredFindings.map((finding) => (
          <FindingMarker key={finding.id} finding={finding} />
        ))}

        {/* Маркер пользователя */}
        <UserLocationMarker />

        {/* Маркер ожидающей позиции */}
        <PendingLocationMarker />

        {/* Обработчик кликов */}
        <MapClickHandler />

        {/* Оверлей для добавления находки */}
        <AddingModeOverlay />

        {/* Полёт к новой находке */}
        <FlyToNewFinding />
      </MapContainer>
    </>
  );
}
