export type UzbekistanCity = 
  | 'Tashkent'
  | 'Samarkand'
  | 'Bukhara'
  | 'Namangan'
  | 'Andijan'
  | 'Fergana'
  | 'Nukus'
  | 'Karshi'
  | 'Urgench';

export interface AirQualityData {
  city: string;
  country: string;
  state?: string;
  location?: {
    coordinates: [number, number];
  };
  current: {
    pollution: {
      ts: string;
      aqius: number;
      mainus: string;
      aqicn: number;
      maincn: string;
    };
    weather: {
      ts: string;
      tp: number;
      pr: number;
      hu: number;
      ws: number;
      wd: number;
      ic: string;
    };
  };
}

export interface AirQualityAlert {
  id: string;
  chatId: number;
  city: UzbekistanCity;
  thresholdAqi: number;
  direction: 'above' | 'below';
  createdAt: string;
}

export interface AQILevel {
  level: string;
  color: string;
  emoji: string;
  healthImplication: {
    uzb: string;
    rus: string;
    eng: string;
  };
  cautionaryStatement: {
    uzb: string;
    rus: string;
    eng: string;
  };
}

export const AQI_LEVELS: Record<string, AQILevel> = {
  good: {
    level: 'Good',
    color: '🟢',
    emoji: '😊',
    healthImplication: {
      uzb: "Havo sifati qoniqarli",
      rus: "Качество воздуха удовлетворительное",
      eng: "Air quality is satisfactory"
    },
    cautionaryStatement: {
      uzb: "Havo ifloslanishi hech qanday xavf tug'dirmaydi",
      rus: "Загрязнение воздуха не представляет опасности",
      eng: "Air pollution poses little or no risk"
    }
  },
  moderate: {
    level: 'Moderate',
    color: '🟡',
    emoji: '😐',
    healthImplication: {
      uzb: "Havo sifati qoniqarli",
      rus: "Качество воздуха приемлемое",
      eng: "Air quality is acceptable"
    },
    cautionaryStatement: {
      uzb: "Ba'zi sezgir odamlar uchun ozgina xavf",
      rus: "Небольшой риск для чувствительных людей",
      eng: "Moderate concern for sensitive people"
    }
  },
  unhealthyForSensitive: {
    level: 'Unhealthy for Sensitive Groups',
    color: '🟠',
    emoji: '😷',
    healthImplication: {
      uzb: "Sezgir guruhlar uchun nosog'lom",
      rus: "Нездорово для чувствительных групп",
      eng: "Unhealthy for sensitive groups"
    },
    cautionaryStatement: {
      uzb: "Sezgir odamlar salomatlik ta'sirlarini his qilishi mumkin",
      rus: "Чувствительные люди могут испытывать проблемы со здоровьем",
      eng: "Sensitive people may experience health effects"
    }
  },
  unhealthy: {
    level: 'Unhealthy',
    color: '🔴',
    emoji: '😨',
    healthImplication: {
      uzb: "Nosog'lom",
      rus: "Нездорово",
      eng: "Unhealthy"
    },
    cautionaryStatement: {
      uzb: "Har kim salomatlik ta'sirlarini his qilishi mumkin",
      rus: "Каждый может испытывать проблемы со здоровьем",
      eng: "Everyone may begin to experience health effects"
    }
  },
  veryUnhealthy: {
    level: 'Very Unhealthy',
    color: '🟣',
    emoji: '😱',
    healthImplication: {
      uzb: "Juda nosog'lom",
      rus: "Очень нездорово",
      eng: "Very unhealthy"
    },
    cautionaryStatement: {
      uzb: "Favqulodda vaziyat: barcha aholi ta'sirlanadi",
      rus: "Чрезвычайная ситуация: все население затронуто",
      eng: "Health alert: everyone may experience serious effects"
    }
  },
  hazardous: {
    level: 'Hazardous',
    color: '🟤',
    emoji: '☠️',
    healthImplication: {
      uzb: "Xavfli",
      rus: "Опасно",
      eng: "Hazardous"
    },
    cautionaryStatement: {
      uzb: "Favqulodda ogohantirish: barcha aholi jiddiy ta'sirlanadi",
      rus: "Чрезвычайное предупреждение: серьезная угроза для всего населения",
      eng: "Health warning: everyone may experience serious health effects"
    }
  }
};

export function getAQILevel(aqi: number): AQILevel {
  if (aqi <= 50) return AQI_LEVELS.good;
  if (aqi <= 100) return AQI_LEVELS.moderate;
  if (aqi <= 150) return AQI_LEVELS.unhealthyForSensitive;
  if (aqi <= 200) return AQI_LEVELS.unhealthy;
  if (aqi <= 300) return AQI_LEVELS.veryUnhealthy;
  return AQI_LEVELS.hazardous;
}

export const UZBEKISTAN_CITIES: Record<UzbekistanCity, { lat: number; lon: number; uzb: string; rus: string }> = {
  'Tashkent': { lat: 41.2995, lon: 69.2401, uzb: 'Toshkent', rus: 'Ташкент' },
  'Samarkand': { lat: 39.6270, lon: 66.9750, uzb: 'Samarqand', rus: 'Самарканд' },
  'Bukhara': { lat: 39.7747, lon: 64.4286, uzb: 'Buxoro', rus: 'Бухара' },
  'Namangan': { lat: 40.9983, lon: 71.6726, uzb: 'Namangan', rus: 'Наманган' },
  'Andijan': { lat: 40.7821, lon: 72.3442, uzb: 'Andijon', rus: 'Андижан' },
  'Fergana': { lat: 40.3864, lon: 71.7864, uzb: "Farg'ona", rus: 'Фергана' },
  'Nukus': { lat: 42.4531, lon: 59.6103, uzb: 'Nukus', rus: 'Нукус' },
  'Karshi': { lat: 38.8606, lon: 65.7975, uzb: 'Qarshi', rus: 'Карши' },
  'Urgench': { lat: 41.5500, lon: 60.6333, uzb: 'Urganch', rus: 'Ургенч' }
};

