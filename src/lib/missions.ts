// Система миссий

import { Finding } from './findings';
import { Lang } from './i18n';

export interface Mission {
  id: string;
  title: { ru: string; chv: string; tt: string };
  description: { ru: string; chv: string; tt: string };
  icon: string;
  target: number;
  progress: number;
  completed: boolean;
  badge?: string;
}

export type MissionId =
  | 'escapeBubble'
  | 'whereEats'
  | 'afterWork'
  | 'quietKazan'
  | 'borderland'
  | 'threeSteps';

const MISSIONS_STORAGE_KEY = 'kazan-map-missions';

// Определения миссий
export const MISSION_DEFINITIONS: Record<
  MissionId,
  Omit<Mission, 'progress' | 'completed'>
> = {
  escapeBubble: {
    id: 'escapeBubble',
    title: {
      ru: 'Выйти из туристического пузыря',
      chv: 'Турист пузырĕнчен тух',
      tt: 'Туристик пузырьдан чык',
    },
    description: {
      ru: 'Добавить 1 находку вне туристического ядра',
      chv: 'Турист тĕшĕнчен тухса 1 тупăш хуш',
      tt: 'Туристик үзәктән читтә 1 табылган өстә',
    },
    icon: 'Compass',
    target: 1,
    badge: 'Explorer',
  },
  whereEats: {
    id: 'whereEats',
    title: {
      ru: 'Где ест город',
      chv: 'Хула мĕнте апатланать',
      tt: 'Шәһәр кайда ашый',
    },
    description: {
      ru: 'Добавить 1 Food или Drink находку',
      chv: '1 апат е эçмелли тупăш хуш',
      tt: '1 ашамлык яки эчемлек өстә',
    },
    icon: 'Utensils',
    target: 1,
    badge: 'Gourmet',
  },
  afterWork: {
    id: 'afterWork',
    title: {
      ru: 'После смены',
      chv: 'Ĕç хыççăн',
      tt: 'Эштән соң',
    },
    description: {
      ru: 'Добавить AfterWork место вечером',
      chv: 'Каçпа AfterWork вырăн хуш',
      tt: 'Кичтә AfterWork урыны өстә',
    },
    icon: 'Briefcase',
    target: 1,
    badge: 'Worker',
  },
  quietKazan: {
    id: 'quietKazan',
    title: {
      ru: 'Тихая Казань',
      chv: 'Шăп Казан',
      tt: 'Тыныч Казан',
    },
    description: {
      ru: 'Добавить Calm место',
      chv: 'Шăп вырăн хуш',
      tt: 'Тыныч урын өстә',
    },
    icon: 'Moon',
    target: 1,
    badge: 'Zen',
  },
  borderland: {
    id: 'borderland',
    title: {
      ru: 'Пограничье',
      chv: 'Чикеллĕ',
      tt: 'Чик буе',
    },
    description: {
      ru: 'Добавить Border находку',
      chv: 'Чикеллĕ тупăш хуш',
      tt: 'Чик буе табылганы өстә',
    },
    icon: 'Layers',
    target: 1,
    badge: 'BorderWalker',
  },
  threeSteps: {
    id: 'threeSteps',
    title: {
      ru: 'Три шага в неизвестность',
      chv: 'Виçĕ утăм паллă мар',
      tt: 'Билгесезлеккә өч адым',
    },
    description: {
      ru: 'Раскрыть 3 зоны тумана',
      chv: '3 тăман районĕ уç',
      tt: '3 томан зонасын ач',
    },
    icon: 'Eye',
    target: 3,
    badge: 'FogLifter',
  },
};

// Загрузка прогресса миссий из LocalStorage
export function loadMissions(): Mission[] {
  if (typeof window === 'undefined') {
    return Object.values(MISSION_DEFINITIONS).map((def) => ({
      ...def,
      progress: 0,
      completed: false,
    }));
  }

  try {
    const stored = localStorage.getItem(MISSIONS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored) as Mission[];
    }
  } catch (e) {
    console.error('Error loading missions:', e);
  }

  return Object.values(MISSION_DEFINITIONS).map((def) => ({
    ...def,
    progress: 0,
    completed: false,
  }));
}

// Сохранение прогресса миссий
export function saveMissions(missions: Mission[]): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(MISSIONS_STORAGE_KEY, JSON.stringify(missions));
  } catch (e) {
    console.error('Error saving missions:', e);
  }
}

// Проверка и обновление миссий на основе находок
export function updateMissions(
  findings: Finding[],
  currentMissions: Mission[]
): Mission[] {
  const userFindings = findings.filter((f) => !f.id.startsWith('mock-'));
  const updated = [...currentMissions];

  for (const mission of updated) {
    switch (mission.id) {
      case 'escapeBubble': {
        const count = userFindings.filter((f) => !f.isInTouristCore).length;
        mission.progress = Math.min(count, mission.target);
        mission.completed = mission.progress >= mission.target;
        break;
      }
      case 'whereEats': {
        const count = userFindings.filter(
          (f) => f.type === 'Food' || f.type === 'Drink'
        ).length;
        mission.progress = Math.min(count, mission.target);
        mission.completed = mission.progress >= mission.target;
        break;
      }
      case 'afterWork': {
        const count = userFindings.filter(
          (f) =>
            f.category === 'AfterWork' && f.timeActivity === 'evening'
        ).length;
        mission.progress = Math.min(count, mission.target);
        mission.completed = mission.progress >= mission.target;
        break;
      }
      case 'quietKazan': {
        const count = userFindings.filter((f) => f.category === 'Calm').length;
        mission.progress = Math.min(count, mission.target);
        mission.completed = mission.progress >= mission.target;
        break;
      }
      case 'borderland': {
        const count = userFindings.filter(
          (f) => f.category === 'Border'
        ).length;
        mission.progress = Math.min(count, mission.target);
        mission.completed = mission.progress >= mission.target;
        break;
      }
      case 'threeSteps': {
        // Считаем все находки как раскрытые зоны тумана
        mission.progress = Math.min(userFindings.length, mission.target);
        mission.completed = mission.progress >= mission.target;
        break;
      }
    }
  }

  saveMissions(updated);
  return updated;
}

// Получение текста миссии на нужном языке
export function getMissionText(
  mission: Mission,
  field: 'title' | 'description',
  lang: Lang
): string {
  return mission[field][lang] || mission[field].ru;
}

// Получение завершённых миссий (для бейджей)
export function getCompletedMissions(missions: Mission[]): Mission[] {
  return missions.filter((m) => m.completed);
}
