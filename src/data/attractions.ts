// Достопримечательности Казани для расчёта туристического ядра
// Реальные координаты популярных туристических мест

export interface Attraction {
  id: string;
  lat: number;
  lng: number;
  weight: number; // 1-3, влияет на расчёт плотности
}

export const KAZAN_CENTER = {
  lat: 55.7887,
  lng: 49.1221,
};

export const KAZAN_BOUNDS = {
  north: 55.8800,
  south: 55.7000,
  east: 49.3000,
  west: 48.9000,
};

export const attractions: Attraction[] = [
  // Кремль и окрестности (высокая плотность)
  { id: 'kremlin-1', lat: 55.7989, lng: 49.1054, weight: 3 },
  { id: 'kremlin-2', lat: 55.7985, lng: 49.1062, weight: 3 },
  { id: 'kul-sharif', lat: 55.7986, lng: 49.1048, weight: 3 },
  { id: 'suyumbike', lat: 55.7993, lng: 49.1061, weight: 3 },
  { id: 'blagoveshchensky', lat: 55.7982, lng: 49.1067, weight: 2 },
  { id: 'hermitage-kazan', lat: 55.7979, lng: 49.1082, weight: 2 },

  // Баумана (пешеходная улица)
  { id: 'baumana-1', lat: 55.7905, lng: 49.1165, weight: 3 },
  { id: 'baumana-2', lat: 55.7893, lng: 49.1184, weight: 3 },
  { id: 'baumana-3', lat: 55.7878, lng: 49.1202, weight: 2 },
  { id: 'bell-tower', lat: 55.7880, lng: 49.1189, weight: 2 },
  { id: 'cat-kazan', lat: 55.7899, lng: 49.1175, weight: 2 },
  { id: 'clock-baumana', lat: 55.7910, lng: 49.1154, weight: 1 },
  { id: 'nikolsky-cathedral', lat: 55.7902, lng: 49.1140, weight: 2 },
  { id: 'epiphany-cathedral', lat: 55.7883, lng: 49.1193, weight: 2 },

  // Площадь Тукая
  { id: 'tukay-square', lat: 55.7852, lng: 49.1230, weight: 3 },
  { id: 'tukay-metro', lat: 55.7854, lng: 49.1236, weight: 2 },

  // Черное озеро и парк
  { id: 'black-lake', lat: 55.7948, lng: 49.1244, weight: 2 },
  { id: 'black-lake-park', lat: 55.7940, lng: 49.1235, weight: 2 },

  // Парк Тысячелетия и Казан
  { id: 'millennium-park', lat: 55.7964, lng: 49.1081, weight: 2 },
  { id: 'kazan-palace', lat: 55.7966, lng: 49.1024, weight: 3 },
  { id: 'ministry', lat: 55.7947, lng: 49.1089, weight: 1 },

  // Старо-Татарская слобода
  { id: 'tatar-sloboda-1', lat: 55.7823, lng: 49.1191, weight: 2 },
  { id: 'tatar-sloboda-2', lat: 55.7812, lng: 49.1210, weight: 2 },
  { id: 'marjani-mosque', lat: 55.7796, lng: 49.1231, weight: 2 },
  { id: 'kayum-nasiri', lat: 55.7815, lng: 49.1199, weight: 2 },
  { id: 'shamil-house', lat: 55.7808, lng: 49.1222, weight: 1 },

  // Озеро Кабан
  { id: 'kaban-1', lat: 55.7780, lng: 49.1240, weight: 2 },
  { id: 'kaban-2', lat: 55.7755, lng: 49.1268, weight: 2 },
  { id: 'kaban-embankment', lat: 55.7745, lng: 49.1256, weight: 2 },
  { id: 'theater-kamala', lat: 55.7782, lng: 49.1252, weight: 2 },

  // Театры и музеи центра
  { id: 'opera-theater', lat: 55.7904, lng: 49.1263, weight: 2 },
  { id: 'national-museum', lat: 55.7968, lng: 49.1109, weight: 2 },
  { id: 'pushkin-library', lat: 55.7956, lng: 49.1201, weight: 1 },
  { id: 'qualitypark', lat: 55.7922, lng: 49.1118, weight: 2 },

  // Казанский университет
  { id: 'university-1', lat: 55.7925, lng: 49.1228, weight: 2 },
  { id: 'university-2', lat: 55.7933, lng: 49.1219, weight: 2 },
  { id: 'lobachevsky', lat: 55.7928, lng: 49.1237, weight: 1 },

  // Центр Семьи «Казан»
  { id: 'kazan-family', lat: 55.8050, lng: 49.0923, weight: 3 },

  // НКЦ и дворец земледельцев
  { id: 'farmers-palace', lat: 55.7987, lng: 49.1007, weight: 3 },
  { id: 'nkc', lat: 55.7865, lng: 49.1080, weight: 2 },

  // Парк Горького
  { id: 'gorky-park-1', lat: 55.7840, lng: 49.1356, weight: 2 },
  { id: 'gorky-park-2', lat: 55.7828, lng: 49.1370, weight: 1 },

  // Площадь Свободы
  { id: 'freedom-square', lat: 55.7885, lng: 49.1268, weight: 2 },
  { id: 'tatarstan-hotel', lat: 55.7877, lng: 49.1272, weight: 1 },

  // Петропавловский собор
  { id: 'petropavlovsky', lat: 55.7937, lng: 49.1162, weight: 2 },

  // Речной порт и набережная
  { id: 'river-port', lat: 55.7870, lng: 49.0985, weight: 2 },
  { id: 'kremlin-embankment', lat: 55.7962, lng: 49.0991, weight: 2 },
  { id: 'palace-embankment', lat: 55.8012, lng: 49.0970, weight: 2 },

  // Дальние туристические точки (но всё ещё посещаемые)
  { id: 'riviera', lat: 55.8193, lng: 49.1022, weight: 2 },
  { id: 'aquapark', lat: 55.8210, lng: 49.1010, weight: 2 },

  // Казан Арена (стадион)
  { id: 'kazan-arena', lat: 55.8217, lng: 49.1605, weight: 2 },

  // Храм всех религий
  { id: 'all-religions', lat: 55.8003, lng: 49.2384, weight: 3 },

  // Раифский монастырь (далеко, но туристический)
  { id: 'raifa', lat: 55.9093, lng: 48.7284, weight: 2 },

  // Свияжск (остров)
  { id: 'sviyazhsk', lat: 55.7712, lng: 48.6615, weight: 3 },

  // Дополнительные точки в центре
  { id: 'svoboda-metro', lat: 55.7900, lng: 49.1285, weight: 1 },
  { id: 'kremlevskaya-metro', lat: 55.7965, lng: 49.1118, weight: 2 },
  { id: 'gabdulla-tukay-park', lat: 55.7855, lng: 49.1245, weight: 1 },
  { id: 'circus', lat: 55.8048, lng: 49.1175, weight: 1 },
  { id: 'puppet-theater', lat: 55.7873, lng: 49.1231, weight: 1 },

  // Ещё несколько точек для плотности
  { id: 'kazan-mall', lat: 55.7860, lng: 49.1260, weight: 1 },
  { id: 'koltso', lat: 55.7879, lng: 49.1238, weight: 1 },
  { id: 'chasha', lat: 55.7955, lng: 49.1055, weight: 2 },
  { id: 'bauman-garden', lat: 55.7887, lng: 49.1212, weight: 1 },
  { id: 'tinchurin-park', lat: 55.7715, lng: 49.1451, weight: 1 },
  { id: 'lebyazhye', lat: 55.7568, lng: 49.0856, weight: 1 },
];

export const GRID_SIZE = 40; // 40x40 сетка для расчёта плотности
export const DENSITY_RADIUS = 0.015; // ~1.5km радиус для расчёта плотности
export const TOURIST_THRESHOLD = 0.3; // порог для туристического ядра (30% от макс. плотности)
