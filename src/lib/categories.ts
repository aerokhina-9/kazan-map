// Категории находок

export type FindingType = 'Place' | 'Food' | 'Drink';
export type TimeActivity = 'day' | 'evening' | 'night';

export interface Category {
  id: string;
  label: {
    ru: string;
    chv: string;
    tt: string;
  };
  description: {
    ru: string;
    chv: string;
    tt: string;
  };
  icon: string; // название иконки из lucide-react
  color: string;
  group: 'general' | 'food';
}

// Общие категории мест
export const GENERAL_CATEGORIES: Category[] = [
  {
    id: 'Calm',
    label: { ru: 'Тихое', chv: 'Шăп', tt: 'Тыныч' },
    description: {
      ru: 'Спокойное место для отдыха',
      chv: 'Ăнланма ăста вырăн',
      tt: 'Ял итәр өчен тыныч урын',
    },
    icon: 'Moon',
    color: '#6366f1',
    group: 'general',
  },
  {
    id: 'Weird',
    label: { ru: 'Странное', chv: 'Тĕрлĕ', tt: 'Гаҗәп' },
    description: {
      ru: 'Необычное, удивительное',
      chv: 'Ятлă, тĕрлĕ',
      tt: 'Гадәти булмаган, гаҗәп',
    },
    icon: 'Sparkles',
    color: '#f59e0b',
    group: 'general',
  },
  {
    id: 'Solo',
    label: { ru: 'Для одиночества', chv: 'Пĕрреш', tt: 'Ялгыз булырга' },
    description: {
      ru: 'Хорошо побыть одному',
      chv: 'Пĕрреш пулма лайăх',
      tt: 'Ялгыз калырга яхшы',
    },
    icon: 'User',
    color: '#8b5cf6',
    group: 'general',
  },
  {
    id: 'Lively',
    label: { ru: 'Живое', chv: 'Чĕрĕ', tt: 'Җанлы' },
    description: {
      ru: 'Энергичное, насыщенное',
      chv: 'Хастар, тулли',
      tt: 'Җанлы, тулы',
    },
    icon: 'Zap',
    color: '#ef4444',
    group: 'general',
  },
  {
    id: 'Green',
    label: { ru: 'Зелёное', chv: 'Симĕс', tt: 'Яшел' },
    description: {
      ru: 'Природное, парковое',
      chv: 'Çутçанталăка хăватлă',
      tt: 'Табигать, парк',
    },
    icon: 'TreePine',
    color: '#22c55e',
    group: 'general',
  },
  {
    id: 'Tense',
    label: { ru: 'Напряжённое', chv: 'Ыратакан', tt: 'Катлаулы' },
    description: {
      ru: 'Место с особой атмосферой',
      chv: 'Уйăрăмлă атмосферăллă',
      tt: 'Аерым атмосфера белән',
    },
    icon: 'AlertTriangle',
    color: '#64748b',
    group: 'general',
  },
  {
    id: 'Border',
    label: { ru: 'Пограничное', chv: 'Чикеллĕ', tt: 'Чик буе' },
    description: {
      ru: 'Между мирами, переходное',
      chv: 'Тĕнчесен хушшинче',
      tt: 'Дөньялар арасында',
    },
    icon: 'Layers',
    color: '#0ea5e9',
    group: 'general',
  },
];

// Категории для локальной кухни «Где ест город»
export const FOOD_CATEGORIES: Category[] = [
  {
    id: 'EverydayFood',
    label: { ru: 'Повседневная еда', chv: 'Эрне апачĕ', tt: 'Көндәлек ашлар' },
    description: {
      ru: 'Обычная еда на каждый день',
      chv: 'Кашни кунхи апат',
      tt: 'Гадәти көндәлек аш',
    },
    icon: 'Utensils',
    color: '#f97316',
    group: 'food',
  },
  {
    id: 'LocalStaple',
    label: { ru: 'Местная база', chv: 'Вырăн апачĕ', tt: 'Җирле ашлар' },
    description: {
      ru: 'Традиционные блюда региона',
      chv: 'Регионăн апат йăли',
      tt: 'Төбәкнең традицион ашлары',
    },
    icon: 'ChefHat',
    color: '#dc2626',
    group: 'food',
  },
  {
    id: 'DrinkingPlace',
    label: { ru: 'Выпивка без концепта', chv: 'Эçмелли', tt: 'Эчәр урын' },
    description: {
      ru: 'Простое место выпить',
      chv: 'Уçалла эçме вырăн',
      tt: 'Гади эчәр урын',
    },
    icon: 'Beer',
    color: '#ca8a04',
    group: 'food',
  },
  {
    id: 'TeaPlace',
    label: { ru: 'Чай / безалкогольное', chv: 'Чĕй', tt: 'Чәй' },
    description: {
      ru: 'Чайная, кофейня',
      chv: 'Чĕй эçмелли вырăн',
      tt: 'Чәйхәнә, кофехана',
    },
    icon: 'Coffee',
    color: '#78350f',
    group: 'food',
  },
  {
    id: 'TimeCapsule',
    label: { ru: 'Из другого времени', chv: 'Пулăшран', tt: 'Башка вакыттан' },
    description: {
      ru: 'Словно застыло в прошлом',
      chv: 'Иртнĕ вăхăтра юлнă пек',
      tt: 'Үткәндә калгандай',
    },
    icon: 'Clock',
    color: '#7c3aed',
    group: 'food',
  },
  {
    id: 'AfterWork',
    label: { ru: 'После смены', chv: 'Ĕç хыççăн', tt: 'Эштән соң' },
    description: {
      ru: 'Куда идут после работы',
      chv: 'Ĕçрен кайсан çитеççĕ',
      tt: 'Эштән соң барыр урын',
    },
    icon: 'Briefcase',
    color: '#0891b2',
    group: 'food',
  },
  {
    id: 'Intergenerational',
    label: { ru: 'Разные поколения', chv: 'Пур çулсем', tt: 'Төрле буыннар' },
    description: {
      ru: 'Место встречи поколений',
      chv: 'Çулсем тĕл пулакан вырăн',
      tt: 'Буыннар очрашу урыны',
    },
    icon: 'Users',
    color: '#0d9488',
    group: 'food',
  },
];

export const ALL_CATEGORIES = [...GENERAL_CATEGORIES, ...FOOD_CATEGORIES];

export function getCategoryById(id: string): Category | undefined {
  return ALL_CATEGORIES.find((c) => c.id === id);
}

export function getCategoriesByGroup(group: 'general' | 'food'): Category[] {
  return ALL_CATEGORIES.filter((c) => c.group === group);
}

export function getCategoriesForType(type: FindingType): Category[] {
  if (type === 'Place') {
    return GENERAL_CATEGORIES;
  }
  return FOOD_CATEGORIES;
}
