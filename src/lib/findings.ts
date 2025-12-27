// Система находок и хранения в LocalStorage

import { FindingType, TimeActivity } from './categories';

export interface Finding {
  id: string;
  lat: number;
  lng: number;
  type: FindingType;
  category: string;
  note?: string;
  trust: number;
  timeActivity: TimeActivity;
  createdAt: number;
  isInTouristCore: boolean;
}

const FINDINGS_STORAGE_KEY = 'kazan-map-findings';

// Моковые находки для демонстрации
export const MOCK_FINDINGS: Finding[] = [
  {
    id: 'mock-1',
    lat: 55.7650,
    lng: 49.0950,
    type: 'Place',
    category: 'Calm',
    trust: 3,
    timeActivity: 'day',
    createdAt: Date.now() - 86400000 * 5,
    isInTouristCore: false,
  },
  {
    id: 'mock-2',
    lat: 55.7720,
    lng: 49.1550,
    type: 'Food',
    category: 'EverydayFood',
    note: 'Здесь обедают строители',
    trust: 5,
    timeActivity: 'day',
    createdAt: Date.now() - 86400000 * 3,
    isInTouristCore: false,
  },
  {
    id: 'mock-3',
    lat: 55.8100,
    lng: 49.0800,
    type: 'Place',
    category: 'Green',
    trust: 2,
    timeActivity: 'evening',
    createdAt: Date.now() - 86400000 * 2,
    isInTouristCore: false,
  },
  {
    id: 'mock-4',
    lat: 55.7580,
    lng: 49.1300,
    type: 'Drink',
    category: 'AfterWork',
    note: 'После 18:00',
    trust: 4,
    timeActivity: 'evening',
    createdAt: Date.now() - 86400000,
    isInTouristCore: false,
  },
  {
    id: 'mock-5',
    lat: 55.8050,
    lng: 49.1800,
    type: 'Place',
    category: 'Weird',
    trust: 1,
    timeActivity: 'night',
    createdAt: Date.now() - 86400000 * 7,
    isInTouristCore: false,
  },
  {
    id: 'mock-6',
    lat: 55.7450,
    lng: 49.1100,
    type: 'Food',
    category: 'LocalStaple',
    note: 'Эчпочмаки настоящие',
    trust: 6,
    timeActivity: 'day',
    createdAt: Date.now() - 86400000 * 4,
    isInTouristCore: false,
  },
  {
    id: 'mock-7',
    lat: 55.7780,
    lng: 49.0700,
    type: 'Place',
    category: 'Border',
    trust: 2,
    timeActivity: 'evening',
    createdAt: Date.now() - 86400000 * 6,
    isInTouristCore: false,
  },
  {
    id: 'mock-8',
    lat: 55.8300,
    lng: 49.1400,
    type: 'Food',
    category: 'TimeCapsule',
    note: 'Совок в лучшем смысле',
    trust: 3,
    timeActivity: 'day',
    createdAt: Date.now() - 86400000 * 8,
    isInTouristCore: false,
  },
];

// Загрузка находок из LocalStorage
export function loadFindings(): Finding[] {
  if (typeof window === 'undefined') {
    return MOCK_FINDINGS;
  }

  try {
    const stored = localStorage.getItem(FINDINGS_STORAGE_KEY);
    if (stored) {
      const userFindings = JSON.parse(stored) as Finding[];
      // Объединяем моковые находки с пользовательскими
      return [...MOCK_FINDINGS, ...userFindings];
    }
  } catch (e) {
    console.error('Error loading findings:', e);
  }

  return MOCK_FINDINGS;
}

// Сохранение находок в LocalStorage
export function saveFindings(findings: Finding[]): void {
  if (typeof window === 'undefined') return;

  try {
    // Сохраняем только пользовательские находки (не моковые)
    const userFindings = findings.filter(
      (f) => !f.id.startsWith('mock-')
    );
    localStorage.setItem(FINDINGS_STORAGE_KEY, JSON.stringify(userFindings));
  } catch (e) {
    console.error('Error saving findings:', e);
  }
}

// Добавление новой находки
export function addFinding(
  finding: Omit<Finding, 'id' | 'trust' | 'createdAt'>
): Finding {
  const newFinding: Finding = {
    ...finding,
    id: `finding-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    trust: 1,
    createdAt: Date.now(),
  };

  const findings = loadFindings();
  findings.push(newFinding);
  saveFindings(findings);

  return newFinding;
}

// Увеличение доверия к находке
export function confirmFinding(findingId: string): void {
  const findings = loadFindings();
  const finding = findings.find((f) => f.id === findingId);

  if (finding) {
    finding.trust += 1;
    saveFindings(findings);
  }
}

// Получение точек для раскрытия тумана
export function getRevealedPoints(findings: Finding[]): {
  lat: number;
  lng: number;
  radius: number;
}[] {
  return findings.map((f) => ({
    lat: f.lat,
    lng: f.lng,
    // Радиус зависит от доверия: базовый 0.003 (≈300м) + бонус за доверие
    radius: 0.003 + Math.min(f.trust, 5) * 0.0005,
  }));
}

// Генерация уникального ID
export function generateId(): string {
  return `finding-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
