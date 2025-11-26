export type Language = 'uzb' | 'rus' | 'eng';

export interface Translations {
  // Language selection
  selectLanguage: string;
  languageSelected: string;
  languageChanged: string;
  
  // Welcome and commands
  welcome: string;
  availableCommands: string;
  commandAqi: string;
  commandSubscriptions: string;
  commandHelp: string;
  commandLanguage: string;
  subscribeInfo: string;
  
  // Cities
  cities: Record<string, string>;
  
  // AQI Check
  quickAqiCheck: string;
  selectCityForAqi: string;
  showAllCities: string;
  currentAqiLevels: string;
  fetchingAqi: string;
  currentAirQuality: string;
  aqiLevel: string;
  mainPollutant: string;
  temperature: string;
  humidity: string;
  healthImplication: string;
  recommendation: string;
  unavailable: string;
  
  // Subscriptions
  manageSubscriptions: string;
  yourSubscriptions: string;
  noSubscriptions: string;
  selectCitiesForAlerts: string;
  alertThresholdsInfo: string;
  tapToToggle: string;
  subscribed: string;
  notSubscribed: string;
  subscribedTo: string;
  unsubscribedFrom: string;
  
  // Threshold notifications
  thresholdAlert: string;
  reachedModerate: string;
  reachedUnhealthySensitive: string;
  reachedUnhealthy: string;
  reachedVeryUnhealthy: string;
  reachedHazardous: string;
  currentAqi: string;
  
  // Help
  helpCenter: string;
  welcomeToBot: string;
  selectTopic: string;
  gettingStarted: string;
  commands: string;
  aboutAqi: string;
  tipsTricks: string;
  faq: string;
  backToHelp: string;
  
  // Getting Started
  gettingStartedTitle: string;
  gettingStartedText: string;
  
  // Commands Help
  commandsTitle: string;
  commandsText: string;
  
  // About AQI
  aboutAqiTitle: string;
  supportedCities: string;
  aqiLevelsTitle: string;
  aqiGood: string;
  aqiModerate: string;
  aqiUnhealthySensitive: string;
  aqiUnhealthy: string;
  aqiVeryUnhealthy: string;
  aqiHazardous: string;
  cacheInfo: string;
  
  // Tips
  tipsTitle: string;
  tipsText: string;
  
  // FAQ
  faqTitle: string;
  faqText: string;
  
  // Errors
  somethingWentWrong: string;
  unableToIdentify: string;
  errorUpdatingSubscription: string;
  
  // Common
  yes: string;
  no: string;
  back: string;
}

export const translations: Record<Language, Translations> = {
  uzb: {
    selectLanguage: "Tilni tanlang / Выберите язык / Select Language",
    languageSelected: "O'zbek tili tanlandi ✅",
    languageChanged: "Til muvaffaqiyatli o'zgartirildi!",
    
    welcome: "Xush kelibsiz! 🌤️\n\nToza Havo - O'zbekistondagi havo sifatini kuzatish boti",
    availableCommands: "📋 Mavjud buyruqlar:",
    commandAqi: "/aqi - Joriy havo sifatini tekshirish",
    commandSubscriptions: "/subscriptions - Shaharlar uchun xabarnomalarni boshqarish",
    commandHelp: "/help - Yordam",
    commandLanguage: "/language - Tilni o'zgartirish",
    subscribeInfo: "🔔 Shaharlarni tanlang va AQI darajasi o'zgarganda avtomatik xabarnomalar oling (50, 100, 150, 200, 250, 300)",
    
    cities: {
      'Tashkent': '🏛️ Toshkent',
      'Samarkand': '🕌 Samarqand',
      'Bukhara': '🕌 Buxoro',
      'Namangan': '🏔️ Namangan',
      'Andijan': '🏔️ Andijon',
      'Fergana': "🏔️ Farg'ona",
      'Nukus': '🏜️ Nukus',
      'Karshi': '🌾 Qarshi',
      'Urgench': '🏜️ Urganch'
    },
    
    quickAqiCheck: "💨 Havo Sifatini Tekshirish",
    selectCityForAqi: "Joriy havo sifatini ko'rish uchun shaharni tanlang:",
    showAllCities: "📊 Barcha Shaharlarni Ko'rish",
    currentAqiLevels: "📊 Joriy Havo Sifati",
    fetchingAqi: "Ma'lumotlar yuklanmoqda...",
    currentAirQuality: "Joriy havo sifati:",
    aqiLevel: "AQI darajasi:",
    mainPollutant: "Asosiy ifloslovchi:",
    temperature: "Harorat:",
    humidity: "Namlik:",
    healthImplication: "Salomatlikka ta'siri:",
    recommendation: "Tavsiya:",
    unavailable: "❌ Ma'lumot mavjud emas",
    
    manageSubscriptions: "🔔 Obuna Boshqaruvi",
    yourSubscriptions: "🔔 Sizning obunalaringiz",
    noSubscriptions: "Sizda hozircha obunalar yo'q",
    selectCitiesForAlerts: "Xabarnomalar olish uchun shaharlarni tanlang",
    alertThresholdsInfo: "AQI quyidagi darajalardan o'tganda xabarnoma olasiz: 50, 100, 150, 200, 250, 300",
    tapToToggle: "Bosish orqali yoqish/o'chirish:",
    subscribed: "✅ Obuna",
    notSubscribed: "➕ Obuna emas",
    subscribedTo: "obunaga qo'shildi ✅",
    unsubscribedFrom: "obunadan chiqarildi",
    
    thresholdAlert: "🚨 Xabardorlik!",
    reachedModerate: "O'rtacha darajaga yetdi",
    reachedUnhealthySensitive: "Sezgir guruhlar uchun nosog'lom",
    reachedUnhealthy: "Nosog'lom darajaga yetdi",
    reachedVeryUnhealthy: "Juda nosog'lom daraja",
    reachedHazardous: "Xavfli daraja!",
    currentAqi: "Joriy AQI:",
    
    helpCenter: "🤖 Yordam Markazi",
    welcomeToBot: "Toza Havo botiga xush kelibsiz!\n\nBu bot O'zbekistonning asosiy shaharlarida havo sifatini kuzatishga yordam beradi.",
    selectTopic: "Ko'proq bilish uchun mavzuni tanlang:",
    gettingStarted: "🚀 Boshlash",
    commands: "📋 Buyruqlar",
    aboutAqi: "💨 Havo Sifati Haqida",
    tipsTricks: "💡 Maslahatlar",
    faq: "❓ Savol-Javoblar",
    backToHelp: "← Orqaga",
    
    gettingStartedTitle: "🚀 Boshlash",
    gettingStartedText: "Havo sifatini tekshirish uchun /aqi buyrug'ini yuboring.\n\n" +
      "Siz:\n" +
      "• Alohida shaharlarni tekshirishingiz\n" +
      "• Barcha shaharlarni birdan ko'rishingiz\n" +
      "• AQI darajasi, ifloslovchilar, harorat va namlikni bilishingiz mumkin\n" +
      "• Salomatlik tavsiyalarini olasiz\n\n" +
      "Ma'lumotlar 30 daqiqa davomida keshlanadi.",
    
    commandsTitle: "📋 Buyruqlar",
    commandsText: "📋 Mavjud buyruqlar:\n\n" +
      "/aqi - Joriy havo sifatini tekshirish\n" +
      "/subscriptions - Shaharlar uchun xabarnomalarni boshqarish\n" +
      "/help - Yordam menyusini ko'rsatish\n" +
      "/language - Tilni o'zgartirish\n\n" +
      "💡 Maslahatlar:\n" +
      "• Barcha buyruqlar darhol ishlaydi\n" +
      "• Ma'lumotlar har 30 daqiqada yangilanadi\n" +
      "• Ko'p tillar qo'llab-quvvatlanadi",
    
    aboutAqiTitle: "💨 Havo Sifati Indeksi",
    supportedCities: "Qo'llab-quvvatlanadigan shaharlar:\nToshkent, Samarqand, Buxoro, Namangan, Andijon, Farg'ona, Nukus, Qarshi, Urganch",
    aqiLevelsTitle: "AQI darajalari:",
    aqiGood: "🟢 0-50: Yaxshi",
    aqiModerate: "🟡 51-100: O'rtacha",
    aqiUnhealthySensitive: "🟠 101-150: Sezgir guruhlar uchun nosog'lom",
    aqiUnhealthy: "🔴 151-200: Nosog'lom",
    aqiVeryUnhealthy: "🟣 201-300: Juda nosog'lom",
    aqiHazardous: "🟤 301+: Xavfli",
    cacheInfo: "\nMa'lumotlar 30 daqiqa davomida keshlanadi.",
    
    tipsTitle: "💡 Foydali Maslahatlar",
    tipsText: "📊 Botdan foydalanish:\n" +
      "• Havo sifatini tez tekshirish uchun /aqi dan foydalaning\n" +
      "• Barcha shaharlarni solishtirish uchun \"Barcha Shaharlar\"ni bosing\n" +
      "• Salomatlik tavsiyalariga e'tibor bering\n\n" +
      "🏥 Salomatlik maslahatlari:\n" +
      "• AQI > 150 bo'lsa, tashqarida faoliyatdan saqlaning\n" +
      "• AQI > 100 bo'lsa, havo tozalagichdan foydalaning\n" +
      "• Tashqarida reja tuzishdan oldin AQI ni tekshiring\n\n" +
      "🔔 Obunalar:\n" +
      "• Shaharlaringizga obuna bo'ling\n" +
      "• AQI o'zgarganda avtomatik xabarnoma oling\n" +
      "• Do'stlar va oilangiz bilan ulashing",
    
    faqTitle: "❓ Tez-tez So'raladigan Savollar",
    faqText: "❓ Savol: Ma'lumotlar qanchalik aniq?\n" +
      "✅ Javob: Ma'lumotlar IQAir API dan olinadi va butun dunyo bo'ylab ishonchli.\n\n" +
      "❓ Savol: Ma'lumotlar qancha vaqt yangilanadi?\n" +
      "✅ Javob: Ma'lumotlar 30 daqiqa davomida keshlanadi. Keyin yangisi olinadi.\n\n" +
      "❓ Savol: Nima uchun keshlash ishlatiladi?\n" +
      "✅ Javob: API chaqiruvlarini kamaytirish va bot barcha foydalanuvchilar uchun tez ishlashi uchun.\n\n" +
      "❓ Savol: Bot bepulmi?\n" +
      "✅ Javob: Ha, butunlay bepul!",
    
    somethingWentWrong: "❌ Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.",
    unableToIdentify: "❌ Foydalanuvchini aniqlab bo'lmadi.",
    errorUpdatingSubscription: "Obunani yangilashda xatolik",
    
    yes: "Ha",
    no: "Yo'q",
    back: "Orqaga"
  },

  rus: {
    selectLanguage: "Tilni tanlang / Выберите язык / Select Language",
    languageSelected: "Русский язык выбран ✅",
    languageChanged: "Язык успешно изменён!",
    
    welcome: "Добро пожаловать! 🌤️\n\nТоза Хаво - бот для мониторинга качества воздуха в Узбекистане",
    availableCommands: "📋 Доступные команды:",
    commandAqi: "/aqi - Проверить текущее качество воздуха",
    commandSubscriptions: "/subscriptions - Управление уведомлениями по городам",
    commandHelp: "/help - Помощь",
    commandLanguage: "/language - Изменить язык",
    subscribeInfo: "🔔 Выберите города и получайте автоматические уведомления при изменении уровня AQI (50, 100, 150, 200, 250, 300)",
    
    cities: {
      'Tashkent': '🏛️ Ташкент',
      'Samarkand': '🕌 Самарканд',
      'Bukhara': '🕌 Бухара',
      'Namangan': '🏔️ Наманган',
      'Andijan': '🏔️ Андижан',
      'Fergana': '🏔️ Фергана',
      'Nukus': '🏜️ Нукус',
      'Karshi': '🌾 Карши',
      'Urgench': '🏜️ Ургенч'
    },
    
    quickAqiCheck: "💨 Проверка Качества Воздуха",
    selectCityForAqi: "Выберите город для просмотра текущего качества воздуха:",
    showAllCities: "📊 Показать Все Города",
    currentAqiLevels: "📊 Текущее Качество Воздуха",
    fetchingAqi: "Загрузка данных...",
    currentAirQuality: "Текущее качество воздуха:",
    aqiLevel: "Уровень AQI:",
    mainPollutant: "Основной загрязнитель:",
    temperature: "Температура:",
    humidity: "Влажность:",
    healthImplication: "Влияние на здоровье:",
    recommendation: "Рекомендация:",
    unavailable: "❌ Данные недоступны",
    
    manageSubscriptions: "🔔 Управление Подписками",
    yourSubscriptions: "🔔 Ваши подписки",
    noSubscriptions: "У вас пока нет подписок",
    selectCitiesForAlerts: "Выберите города для получения уведомлений",
    alertThresholdsInfo: "Вы получите уведомление при пересечении AQI следующих уровней: 50, 100, 150, 200, 250, 300",
    tapToToggle: "Нажмите для переключения:",
    subscribed: "✅ Подписка активна",
    notSubscribed: "➕ Нет подписки",
    subscribedTo: "подписка оформлена ✅",
    unsubscribedFrom: "подписка отменена",
    
    thresholdAlert: "🚨 Внимание!",
    reachedModerate: "Достигнут умеренный уровень",
    reachedUnhealthySensitive: "Нездорово для чувствительных групп",
    reachedUnhealthy: "Достигнут нездоровый уровень",
    reachedVeryUnhealthy: "Очень нездоровый уровень",
    reachedHazardous: "Опасный уровень!",
    currentAqi: "Текущий AQI:",
    
    helpCenter: "🤖 Центр Помощи",
    welcomeToBot: "Добро пожаловать в бот Toza Havo!\n\nЭтот бот помогает отслеживать качество воздуха в основных городах Узбекистана.",
    selectTopic: "Выберите тему для получения информации:",
    gettingStarted: "🚀 Начало работы",
    commands: "📋 Команды",
    aboutAqi: "💨 О качестве воздуха",
    tipsTricks: "💡 Советы",
    faq: "❓ Вопросы и ответы",
    backToHelp: "← Назад",
    
    gettingStartedTitle: "🚀 Начало работы",
    gettingStartedText: "Используйте команду /aqi для проверки качества воздуха.\n\n" +
      "Вы можете:\n" +
      "• Проверять отдельные города\n" +
      "• Просматривать все города сразу\n" +
      "• Узнавать уровень AQI, загрязнители, температуру и влажность\n" +
      "• Получать рекомендации по здоровью\n\n" +
      "Данные кешируются на 30 минут.",
    
    commandsTitle: "📋 Команды",
    commandsText: "📋 Доступные команды:\n\n" +
      "/aqi - Проверить текущее качество воздуха\n" +
      "/subscriptions - Управление уведомлениями по городам\n" +
      "/help - Показать меню помощи\n" +
      "/language - Изменить язык\n\n" +
      "💡 Быстрые советы:\n" +
      "• Все команды работают мгновенно\n" +
      "• Данные обновляются каждые 30 минут\n" +
      "• Поддерживается несколько языков",
    
    aboutAqiTitle: "💨 Индекс Качества Воздуха",
    supportedCities: "Поддерживаемые города:\nТашкент, Самарканд, Бухара, Наманган, Андижан, Фергана, Нукус, Карши, Ургенч",
    aqiLevelsTitle: "Уровни AQI:",
    aqiGood: "🟢 0-50: Хорошо",
    aqiModerate: "🟡 51-100: Умеренно",
    aqiUnhealthySensitive: "🟠 101-150: Нездорово для чувствительных групп",
    aqiUnhealthy: "🔴 151-200: Нездорово",
    aqiVeryUnhealthy: "🟣 201-300: Очень нездорово",
    aqiHazardous: "🟤 301+: Опасно",
    cacheInfo: "\nДанные кешируются на 30 минут.",
    
    tipsTitle: "💡 Полезные Советы",
    tipsText: "📊 Использование бота:\n" +
      "• Используйте /aqi для быстрой проверки\n" +
      "• Нажмите \"Показать все города\" для сравнения\n" +
      "• Обращайте внимание на рекомендации по здоровью\n\n" +
      "🏥 Советы по здоровью:\n" +
      "• При AQI > 150 избегайте активности на улице\n" +
      "• При AQI > 100 используйте очистители воздуха\n" +
      "• Проверяйте AQI перед планированием выхода\n\n" +
      "🔔 Подписки:\n" +
      "• Подпишитесь на интересующие города\n" +
      "• Получайте автоматические уведомления\n" +
      "• Делитесь с друзьями и семьей",
    
    faqTitle: "❓ Часто Задаваемые Вопросы",
    faqText: "❓ Вопрос: Насколько точны данные?\n" +
      "✅ Ответ: Данные получены из IQAir API и надежны по всему миру.\n\n" +
      "❓ Вопрос: Как часто обновляются данные?\n" +
      "✅ Ответ: Данные кешируются на 30 минут. После этого загружаются свежие данные.\n\n" +
      "❓ Вопрос: Зачем используется кеширование?\n" +
      "✅ Ответ: Для уменьшения запросов к API и быстрой работы для всех пользователей.\n\n" +
      "❓ Вопрос: Бот бесплатный?\n" +
      "✅ Ответ: Да, полностью бесплатный!",
    
    somethingWentWrong: "❌ Произошла ошибка. Пожалуйста, попробуйте еще раз.",
    unableToIdentify: "❌ Не удалось идентифицировать пользователя.",
    errorUpdatingSubscription: "Ошибка обновления подписки",
    
    yes: "Да",
    no: "Нет",
    back: "Назад"
  },

  eng: {
    selectLanguage: "Tilni tanlang / Выберите язык / Select Language",
    languageSelected: "English language selected ✅",
    languageChanged: "Language successfully changed!",
    
    welcome: "Welcome! 🌤️\n\nToza Havo - Air Quality Monitoring Bot for Uzbekistan",
    availableCommands: "📋 Available commands:",
    commandAqi: "/aqi - Check current air quality",
    commandSubscriptions: "/subscriptions - Manage city alert subscriptions",
    commandHelp: "/help - Help",
    commandLanguage: "/language - Change language",
    subscribeInfo: "🔔 Subscribe to cities and receive automatic notifications when AQI levels change (50, 100, 150, 200, 250, 300)",
    
    cities: {
      'Tashkent': '🏛️ Tashkent',
      'Samarkand': '🕌 Samarkand',
      'Bukhara': '🕌 Bukhara',
      'Namangan': '🏔️ Namangan',
      'Andijan': '🏔️ Andijan',
      'Fergana': '🏔️ Fergana',
      'Nukus': '🏜️ Nukus',
      'Karshi': '🌾 Karshi',
      'Urgench': '🏜️ Urgench'
    },
    
    quickAqiCheck: "💨 Air Quality Check",
    selectCityForAqi: "Select a city to view current air quality:",
    showAllCities: "📊 Show All Cities",
    currentAqiLevels: "📊 Current Air Quality",
    fetchingAqi: "Loading data...",
    currentAirQuality: "Current air quality:",
    aqiLevel: "AQI level:",
    mainPollutant: "Main pollutant:",
    temperature: "Temperature:",
    humidity: "Humidity:",
    healthImplication: "Health implication:",
    recommendation: "Recommendation:",
    unavailable: "❌ Data unavailable",
    
    manageSubscriptions: "🔔 Manage Subscriptions",
    yourSubscriptions: "🔔 Your subscriptions",
    noSubscriptions: "You don't have any subscriptions yet",
    selectCitiesForAlerts: "Select cities to receive notifications",
    alertThresholdsInfo: "You'll receive notifications when AQI crosses these levels: 50, 100, 150, 200, 250, 300",
    tapToToggle: "Tap to toggle:",
    subscribed: "✅ Subscribed",
    notSubscribed: "➕ Not subscribed",
    subscribedTo: "subscribed ✅",
    unsubscribedFrom: "unsubscribed",
    
    thresholdAlert: "🚨 Alert!",
    reachedModerate: "Reached Moderate level",
    reachedUnhealthySensitive: "Unhealthy for Sensitive Groups",
    reachedUnhealthy: "Reached Unhealthy level",
    reachedVeryUnhealthy: "Very Unhealthy level",
    reachedHazardous: "Hazardous level!",
    currentAqi: "Current AQI:",
    
    helpCenter: "🤖 Help Center",
    welcomeToBot: "Welcome to Toza Havo bot!\n\nThis bot helps you track air quality in major cities of Uzbekistan.",
    selectTopic: "Select a topic to learn more:",
    gettingStarted: "🚀 Getting Started",
    commands: "📋 Commands",
    aboutAqi: "💨 About Air Quality",
    tipsTricks: "💡 Tips",
    faq: "❓ FAQ",
    backToHelp: "← Back",
    
    gettingStartedTitle: "🚀 Getting Started",
    gettingStartedText: "Use /aqi command to check air quality.\n\n" +
      "You can:\n" +
      "• Check individual cities\n" +
      "• View all cities at once\n" +
      "• See AQI level, pollutants, temperature, and humidity\n" +
      "• Get health recommendations\n\n" +
      "Data is cached for 30 minutes.",
    
    commandsTitle: "📋 Commands",
    commandsText: "📋 Available commands:\n\n" +
      "/aqi - Check current air quality\n" +
      "/subscriptions - Manage city alert subscriptions\n" +
      "/help - Show help menu\n" +
      "/language - Change language\n\n" +
      "💡 Quick tips:\n" +
      "• All commands work instantly\n" +
      "• Data updates every 30 minutes\n" +
      "• Multiple languages supported",
    
    aboutAqiTitle: "💨 Air Quality Index",
    supportedCities: "Supported cities:\nTashkent, Samarkand, Bukhara, Namangan, Andijan, Fergana, Nukus, Karshi, Urgench",
    aqiLevelsTitle: "AQI levels:",
    aqiGood: "🟢 0-50: Good",
    aqiModerate: "🟡 51-100: Moderate",
    aqiUnhealthySensitive: "🟠 101-150: Unhealthy for Sensitive Groups",
    aqiUnhealthy: "🔴 151-200: Unhealthy",
    aqiVeryUnhealthy: "🟣 201-300: Very Unhealthy",
    aqiHazardous: "🟤 301+: Hazardous",
    cacheInfo: "\nData is cached for 30 minutes.",
    
    tipsTitle: "💡 Helpful Tips",
    tipsText: "📊 Using the bot:\n" +
      "• Use /aqi for quick checks\n" +
      "• Tap \"Show All Cities\" to compare\n" +
      "• Pay attention to health recommendations\n\n" +
      "🏥 Health tips:\n" +
      "• Avoid outdoor activities when AQI > 150\n" +
      "• Use air purifiers when AQI > 100\n" +
      "• Check AQI before planning outdoor activities\n\n" +
      "🔔 Subscriptions:\n" +
      "• Subscribe to your cities\n" +
      "• Get automatic notifications\n" +
      "• Share with friends and family",
    
    faqTitle: "❓ Frequently Asked Questions",
    faqText: "❓ Question: How accurate is the data?\n" +
      "✅ Answer: Data is from IQAir API and is reliable worldwide.\n\n" +
      "❓ Question: How often does data update?\n" +
      "✅ Answer: Data is cached for 30 minutes. After that, fresh data is fetched.\n\n" +
      "❓ Question: Why use caching?\n" +
      "✅ Answer: To reduce API calls and ensure fast performance for all users.\n\n" +
      "❓ Question: Is the bot free?\n" +
      "✅ Answer: Yes, completely free!",
    
    somethingWentWrong: "❌ Something went wrong. Please try again.",
    unableToIdentify: "❌ Unable to identify user.",
    errorUpdatingSubscription: "Error updating subscription",
    
    yes: "Yes",
    no: "No",
    back: "Back"
  }
};

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations.uzb;
}
