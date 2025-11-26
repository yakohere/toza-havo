export type Language = 'uzb' | 'rus' | 'eng';

export interface Translations {
  selectLanguage: string;
  languageSelected: string;
  languageChanged: string;
  
  welcome: string;
  chooseCity: string;
  
  cities: Record<string, string>;
  
  citySelected: string;
  currentAirQuality: string;
  aqiLevel: string;
  mainPollutant: string;
  temperature: string;
  humidity: string;
  lastUpdated: string;
  
  setAlert: string;
  sendThresholdAqi: string;
  thresholdExample: string;
  invalidThreshold: string;
  settingUpAlert: string;
  alertSet: string;
  notifyWhenAqi: string;
  currentAqi: string;
  failedToSave: string;
  unableToFetchAqi: string;
  
  above: string;
  below: string;
  risesAbove: string;
  fallsBelow: string;
  
  yourActiveAlerts: string;
  noActiveAlerts: string;
  createFirstAlert: string;
  fetchingAlerts: string;
  away: string;
  created: string;
  useDeleteAlert: string;
  useCheckAqi: string;
  
  deleteAlerts: string;
  selectAlertToDelete: string;
  deleteAllAlerts: string;
  cancel: string;
  confirmDeleteAll: string;
  confirmDeleteAllText: string;
  yesDeleteAll: string;
  allAlertsDeleted: string;
  successfullyDeleted: string;
  alertDeleted: string;
  useMyAlerts: string;
  
  quickAqiCheck: string;
  selectCityForAqi: string;
  showAllCities: string;
  currentAqiLevels: string;
  unavailable: string;
  setAlertForAqi: string;
  fetchingAqi: string;
  unableToFetchCityAqi: string;
  
  helpCenter: string;
  welcomeToAssistant: string;
  selectTopic: string;
  gettingStarted: string;
  commands: string;
  aboutAqi: string;
  tipsTricks: string;
  faq: string;
  backToHelp: string;
  
  gettingStartedTitle: string;
  step1: string;
  step2: string;
  step3: string;
  step4: string;
  exampleTitle: string;
  exampleStep1: string;
  exampleStep2: string;
  exampleStep3: string;
  thatsIt: string;
  autoDetection: string;
  
  availableCommands: string;
  commandStart: string;
  commandMyAlerts: string;
  commandDeleteAlert: string;
  commandAqi: string;
  commandAqiCity: string;
  commandHelp: string;
  commandLanguage: string;
  quickTips: string;
  allCommandsWork: string;
  multipleAlerts: string;
  alertsChecked: string;
  alertsAutoRemoved: string;
  
  aboutAqiTitle: string;
  supportedCities: string;
  howAlertsWork: string;
  setThresholdAqi: string;
  botChecksAqi: string;
  instantNotification: string;
  alertAutoRemoved: string;
  directionDetection: string;
  thresholdAboveCurrent: string;
  thresholdBelowCurrent: string;
  
  tipsTitle: string;
  settingGoodAlerts: string;
  useHealthLevels: string;
  checkRegularly: string;
  dontSetTooMany: string;
  powerUserTips: string;
  useAqiCommand: string;
  checkAlertsRegularly: string;
  deleteOldAlerts: string;
  bestPractices: string;
  keepNotifications: string;
  setActionLevels: string;
  useInHealthPlanning: string;
  
  faqTitle: string;
  questionAccuracy: string;
  answerAccuracy: string;
  questionMultiple: string;
  answerMultiple: string;
  questionAfterTrigger: string;
  answerAfterTrigger: string;
  questionCancel: string;
  answerCancel: string;
  questionFree: string;
  answerFree: string;
  questionSpeed: string;
  answerSpeed: string;
  
  alertTriggered: string;
  reached: string;
  
  somethingWentWrong: string;
  tryAgain: string;
  unableToIdentify: string;
  invalidCity: string;
  supportedCitiesList: string;
  
  time: string;
  
  yes: string;
  no: string;
  back: string;
  next: string;
  done: string;
  
  healthImplication: string;
  recommendation: string;
}

export const translations: Record<Language, Translations> = {
  uzb: {
    selectLanguage: "Tilni tanlang / Выберите язык / Select Language",
    languageSelected: "O'zbek tili tanlandi ✅",
    languageChanged: "Til muvaffaqiyatli o'zgartirildi!",
    
    welcome: "Xush kelibsiz! Havo sifati ogohlantirishi o'rnatish uchun shaharni tanlang:",
    chooseCity: "Havo sifati ogohlantirishi o'rnatish uchun shaharni tanlang:",
    
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
    
    citySelected: "Siz tanladingiz:",
    currentAirQuality: "Joriy havo sifati:",
    aqiLevel: "AQI darajasi:",
    mainPollutant: "Asosiy ifloslovchi:",
    temperature: "Harorat:",
    humidity: "Namlik:",
    lastUpdated: "Yangilangan:",
    
    setAlert: "Ogohlantirish o'rnatish",
    sendThresholdAqi: "Men sizni xabardor qilishim kerak bo'lgan AQI darajasini yuboring.",
    thresholdExample: "Misol: 100",
    invalidThreshold: "Noto'g'ri AQI formati. Iltimos, 0 dan 500 gacha bo'lgan raqam yuboring.",
    settingUpAlert: "⏳ Ogohlantirishingizni o'rnatyapman...",
    alertSet: "✅ Ogohlantirish o'rnatildi! Men sizni xabardor qilaman",
    notifyWhenAqi: "AQI darajasi",
    currentAqi: "Joriy AQI:",
    failedToSave: "❌ Ogohlantirishni saqlashda xatolik. Iltimos, qayta urinib ko'ring.",
    unableToFetchAqi: "⚠️ Joriy havo sifatini olishda xatolik. Keyinroq urinib ko'ring.",
    
    above: "yuqoriga",
    below: "pastga",
    risesAbove: "ko'tarilganda",
    fallsBelow: "tushganda",
    
    yourActiveAlerts: "📊 Sizning Faol Ogohlantirishlaringiz",
    noActiveAlerts: "📭 Sizda faol ogohlantirishlar yo'q.",
    createFirstAlert: "Birinchi ogohlantirishni yaratish uchun /start buyrug'ini ishlating!",
    fetchingAlerts: "⏳ Ogohlantirishlaringiz va joriy AQI darajalarni olayapman...",
    away: "uzoqlikda",
    created: "Yaratilgan:",
    useDeleteAlert: "💡 Ogohlantirishlarni o'chirish uchun /delete_alert dan foydalaning",
    useCheckAqi: "📊 Joriy havo sifatini tekshirish uchun /aqi dan foydalaning",
    
    deleteAlerts: "🗑️ Ogohlantirishlarni O'chirish",
    selectAlertToDelete: "O'chirish uchun ogohlantirishni tanlang:",
    deleteAllAlerts: "🗑️ Barcha Ogohlantirishlarni O'chirish",
    cancel: "❌ Bekor qilish",
    confirmDeleteAll: "⚠️ Barchasini O'chirishni Tasdiqlang",
    confirmDeleteAllText: "Barcha ogohlantirishlaringizni o'chirishga ishonchingiz komilmi?\nBu amalni qaytarib bo'lmaydi.",
    yesDeleteAll: "✅ Ha, Barchasini O'chir",
    allAlertsDeleted: "✅ Barcha Ogohlantirishlar O'chirildi",
    successfullyDeleted: "muvaffaqiyatli o'chirildi",
    alertDeleted: "✅ Ogohlantirish O'chirildi",
    useMyAlerts: "Qolgan ogohlantirishlarni ko'rish uchun /my_alerts dan foydalaning.",
    
    quickAqiCheck: "💨 Havo Sifatini Tekshirish",
    selectCityForAqi: "Joriy havo sifatini olish uchun shaharni tanlang:",
    showAllCities: "📊 Barcha Shaharlarni Ko'rish",
    currentAqiLevels: "📊 Joriy Havo Sifati Darajalari",
    unavailable: "❌ Mavjud emas",
    setAlertForAqi: "💡 Bu daraja uchun ogohlantirish o'rnatish uchun /start dan foydalaning",
    fetchingAqi: "ning havo sifatini olayapman...",
    unableToFetchCityAqi: "ning havo sifatini olishda xatolik. Keyinroq urinib ko'ring.",
    
    helpCenter: "🤖 Toza Havo Yordam Markazi",
    welcomeToAssistant: "Shaxsiy havo sifati kuzatuv yordamchingizga xush kelibsiz!",
    selectTopic: "Ko'proq bilish uchun mavzuni tanlang:",
    gettingStarted: "🚀 Boshlash",
    commands: "📊 Buyruqlar",
    aboutAqi: "💨 Havo Sifati Haqida",
    tipsTricks: "💡 Maslahatlar va Hiylalar",
    faq: "❓ Tez-tez So'raladigan Savollar",
    backToHelp: "← Bosh Menyusiga Qaytish",
    
    gettingStartedTitle: "🚀 Boshlash",
    step1: "1-qadam: Boshlash uchun /start yuboring",
    step2: "2-qadam: Shaharingizni tanlang",
    step3: "3-qadam: AQI chegarangizni kiriting",
    step4: "4-qadam: Havo sifati chegarangizga yetganda xabar oling!",
    exampleTitle: "Misol:",
    exampleStep1: "• Toshkentni tanlang",
    exampleStep2: "• 100 ni kiriting",
    exampleStep3: "• Agar joriy AQI 80 bo'lsa, AQI 100 dan yuqoriga ko'tarilganda xabar olasiz",
    thatsIt: "Shuncha!",
    autoDetection: "Bot avtomatik ravishda siz joriy AQI dan yuqori yoki pastroq ogohlantirish xohlashingizni aniqlaydi.",
    
    availableCommands: "📊 Mavjud Buyruqlar",
    commandStart: "/start - Yangi havo sifati ogohlantirishini yaratish",
    commandMyAlerts: "/my_alerts - Barcha faol ogohlantirishlaringizni ko'rish",
    commandDeleteAlert: "/delete_alert - Muayyan ogohlantirishlarni o'chirish",
    commandAqi: "/aqi - Joriy havo sifati darajalarini olish",
    commandAqiCity: "/aqi Toshkent - Muayyan shahar AQI sini olish",
    commandHelp: "/help - Ushbu yordam menyusini ko'rsatish",
    commandLanguage: "/language - Tilni o'zgartirish",
    quickTips: "Tez Maslahatlar:",
    allCommandsWork: "• Barcha buyruqlar darhol ishlaydi",
    multipleAlerts: "• Siz bir nechta ogohlantirishni faol qilishingiz mumkin",
    alertsChecked: "• Ogohlantirishlar har 10 daqiqada tekshiriladi",
    alertsAutoRemoved: "• Ogohlantirishlar ishga tushgandan keyin avtomatik o'chiriladi",
    
    aboutAqiTitle: "💨 Havo Sifati Indeksi Haqida",
    supportedCities: "Qo'llab-quvvatlanadigan Shaharlar:",
    howAlertsWork: "Ogohlantirishlar Qanday Ishlaydi:",
    setThresholdAqi: "• Chegara AQI darajangizni belgilang",
    botChecksAqi: "• Bot har 10 daqiqada havo sifatini tekshiradi",
    instantNotification: "• Chegara yetilganda darhol xabar oling",
    alertAutoRemoved: "• Ogohlantirish ishga tushgandan keyin avtomatik o'chiriladi",
    directionDetection: "Yo'nalishni Aniqlash:",
    thresholdAboveCurrent: "• Chegara > Joriy AQI = AQI yuqoriga ketganda ogohlantirish",
    thresholdBelowCurrent: "• Chegara < Joriy AQI = AQI pastga tushganda ogohlantirish",
    
    tipsTitle: "💡 Maslahatlar va Hiylalar",
    settingGoodAlerts: "🎯 Yaxshi Ogohlantirishlar O'rnatish:",
    useHealthLevels: "• Sog'liq darajalariga asoslangan chegara belgilang (50, 100, 150)",
    checkRegularly: "• Havo sifatini muntazam tekshiring",
    dontSetTooMany: "• Juda ko'p ogohlantirishlarni bir-biriga yaqin o'rnatmang",
    powerUserTips: "⚡ Kuchli Foydalanuvchi Maslahatlari:",
    useAqiCommand: "• Ogohlantirishlar o'rnatishdan oldin joriy darajalarni ko'rish uchun /aqi dan foydalaning",
    checkAlertsRegularly: "• Ogohlantirishlaringizni boshqarish uchun /my_alerts ni muntazam tekshiring",
    deleteOldAlerts: "• Endi tegishli bo'lmagan eski ogohlantirishlarni o'chiring",
    bestPractices: "📱 Eng Yaxshi Amaliyotlar:",
    keepNotifications: "• Telefon bildirishnomalarini yoqib qo'ying",
    setActionLevels: "• Harakat qilishni rejalashtirgan darajalarda ogohlantirishlar o'rnating",
    useInHealthPlanning: "• Botdan sog'ligingizni rejalashtirish uchun foydalaning",
    
    faqTitle: "❓ Tez-tez So'raladigan Savollar",
    questionAccuracy: "S: Ma'lumotlar qanchalik aniq?",
    answerAccuracy: "J: Ma'lumotlar IQAir API dan olinadi, dunyo bo'ylab aniqlik uchun ishonchli manba.",
    questionMultiple: "S: Men bir nechta ogohlantirish o'rnatishim mumkinmi?",
    answerMultiple: "J: Ha! Turli shaharlar va AQI darajalari uchun kerakli miqdorda ogohlantirish o'rnating.",
    questionAfterTrigger: "S: Ogohlantirish ishga tushgandan keyin nima bo'ladi?",
    answerAfterTrigger: "J: Siz darhol xabar olasiz va ogohlantirish avtomatik o'chiriladi.",
    questionCancel: "S: Ogohlantirishni bekor qilishim mumkinmi?",
    answerCancel: "J: Ha, muayyan ogohlantirishlarni yoki barchasini bir vaqtda o'chirish uchun /delete_alert dan foydalaning.",
    questionFree: "S: Bot bepulmi?",
    answerFree: "J: Ha, butunlay bepul foydalanish!",
    questionSpeed: "S: Bildirishnomalar qanchalik tez?",
    answerSpeed: "J: Ogohlantirishlar har 10 daqiqada tekshiriladi, chegara yetilgandan bir necha daqiqa ichida xabar olasiz.",
    
    alertTriggered: "🔔 Ogohlantirish Ishga Tushdi!",
    reached: "ga yetdi",
    
    somethingWentWrong: "❌ Nimadir noto'g'ri ketdi. Iltimos, qayta urinib ko'ring.",
    tryAgain: "Iltimos, qayta urinib ko'ring.",
    unableToIdentify: "❌ Foydalanuvchini aniqlab bo'lmadi. Iltimos, qayta urinib ko'ring.",
    invalidCity: "❌ Noto'g'ri shahar:",
    supportedCitiesList: "Qo'llab-quvvatlanadigan shaharlar:",
    
    time: "Vaqt:",
    
    yes: "Ha",
    no: "Yo'q",
    back: "Orqaga",
    next: "Keyingi",
    done: "Tayyor",
    
    healthImplication: "Sog'liq ta'siri:",
    recommendation: "Tavsiya:"
  },

  rus: {
    selectLanguage: "Tilni tanlang / Выберите язык / Select Language",
    languageSelected: "Русский язык выбран ✅",
    languageChanged: "Язык успешно изменён!",
    
    welcome: "Добро пожаловать! Выберите город для установки оповещения о качестве воздуха:",
    chooseCity: "Выберите город для установки оповещения о качестве воздуха:",
    
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
    
    citySelected: "Вы выбрали:",
    currentAirQuality: "Текущее качество воздуха:",
    aqiLevel: "Уровень AQI:",
    mainPollutant: "Основной загрязнитель:",
    temperature: "Температура:",
    humidity: "Влажность:",
    lastUpdated: "Обновлено:",
    
    setAlert: "Установить оповещение",
    sendThresholdAqi: "Отправьте уровень AQI, при котором я должен вас уведомить.",
    thresholdExample: "Пример: 100",
    invalidThreshold: "Неверный формат AQI. Пожалуйста, отправьте число от 0 до 500.",
    settingUpAlert: "⏳ Настраиваю ваше оповещение...",
    alertSet: "✅ Оповещение установлено! Я уведомлю вас, когда",
    notifyWhenAqi: "уровень AQI",
    currentAqi: "Текущий AQI:",
    failedToSave: "❌ Не удалось сохранить оповещение. Попробуйте ещё раз.",
    unableToFetchAqi: "⚠️ Не удалось получить текущее качество воздуха. Попробуйте позже.",
    
    above: "выше",
    below: "ниже",
    risesAbove: "поднимется выше",
    fallsBelow: "упадёт ниже",
    
    yourActiveAlerts: "📊 Ваши Активные Оповещения",
    noActiveAlerts: "📭 У вас нет активных оповещений.",
    createFirstAlert: "Используйте /start для создания первого оповещения!",
    fetchingAlerts: "⏳ Получаю ваши оповещения и текущие уровни AQI...",
    away: "до порога",
    created: "Создано:",
    useDeleteAlert: "💡 Используйте /delete_alert для удаления оповещений",
    useCheckAqi: "📊 Используйте /aqi для проверки текущего качества воздуха",
    
    deleteAlerts: "🗑️ Удалить Оповещения",
    selectAlertToDelete: "Выберите оповещение для удаления:",
    deleteAllAlerts: "🗑️ Удалить Все Оповещения",
    cancel: "❌ Отмена",
    confirmDeleteAll: "⚠️ Подтвердите Удаление Всех",
    confirmDeleteAllText: "Вы уверены, что хотите удалить ВСЕ ваши оповещения?\nЭто действие нельзя отменить.",
    yesDeleteAll: "✅ Да, Удалить Все",
    allAlertsDeleted: "✅ Все Оповещения Удалены",
    successfullyDeleted: "успешно удалено",
    alertDeleted: "✅ Оповещение Удалено",
    useMyAlerts: "Используйте /my_alerts для просмотра оставшихся оповещений.",
    
    quickAqiCheck: "💨 Проверка Качества Воздуха",
    selectCityForAqi: "Выберите город для получения текущего качества воздуха:",
    showAllCities: "📊 Показать Все Города",
    currentAqiLevels: "📊 Текущие Уровни Качества Воздуха",
    unavailable: "❌ Недоступно",
    setAlertForAqi: "💡 Используйте /start для установки оповещения на этот уровень",
    fetchingAqi: "Получаю качество воздуха для",
    unableToFetchCityAqi: "Не удалось получить качество воздуха для. Попробуйте позже.",
    
    helpCenter: "🤖 Центр Помощи Toza Havo",
    welcomeToAssistant: "Добро пожаловать к вашему личному помощнику мониторинга качества воздуха!",
    selectTopic: "Выберите тему для получения дополнительной информации:",
    gettingStarted: "🚀 Начало Работы",
    commands: "📊 Команды",
    aboutAqi: "💨 О Качестве Воздуха",
    tipsTricks: "💡 Советы и Хитрости",
    faq: "❓ Часто Задаваемые Вопросы",
    backToHelp: "← Назад к Меню Помощи",
    
    gettingStartedTitle: "🚀 Начало Работы",
    step1: "Шаг 1: Отправьте /start для начала",
    step2: "Шаг 2: Выберите ваш город",
    step3: "Шаг 3: Введите пороговый уровень AQI",
    step4: "Шаг 4: Получите уведомление, когда качество воздуха достигнет порога!",
    exampleTitle: "Пример:",
    exampleStep1: "• Выберите Ташкент",
    exampleStep2: "• Введите 100",
    exampleStep3: "• Если текущий AQI 80, вы получите уведомление, когда AQI поднимется выше 100",
    thatsIt: "Вот и всё!",
    autoDetection: "Бот автоматически определяет, хотите ли вы оповещения выше или ниже текущего AQI.",
    
    availableCommands: "📊 Доступные Команды",
    commandStart: "/start - Создать новое оповещение о качестве воздуха",
    commandMyAlerts: "/my_alerts - Просмотреть все активные оповещения",
    commandDeleteAlert: "/delete_alert - Удалить определённые оповещения",
    commandAqi: "/aqi - Получить текущие уровни качества воздуха",
    commandAqiCity: "/aqi Ташкент - Получить AQI определённого города",
    commandHelp: "/help - Показать это меню помощи",
    commandLanguage: "/language - Изменить язык",
    quickTips: "Быстрые Советы:",
    allCommandsWork: "• Все команды работают мгновенно",
    multipleAlerts: "• Вы можете иметь несколько активных оповещений",
    alertsChecked: "• Оповещения проверяются каждые 10 минут",
    alertsAutoRemoved: "• Оповещения автоматически удаляются после срабатывания",
    
    aboutAqiTitle: "💨 Об Индексе Качества Воздуха",
    supportedCities: "Поддерживаемые Города:",
    howAlertsWork: "Как Работают Оповещения:",
    setThresholdAqi: "• Установите пороговый уровень AQI",
    botChecksAqi: "• Бот проверяет качество воздуха каждые 10 минут",
    instantNotification: "• Получите мгновенное уведомление при достижении порога",
    alertAutoRemoved: "• Оповещение автоматически удаляется после срабатывания",
    directionDetection: "Определение Направления:",
    thresholdAboveCurrent: "• Порог > Текущий AQI = Оповещение при росте AQI выше",
    thresholdBelowCurrent: "• Порог < Текущий AQI = Оповещение при падении AQI ниже",
    
    tipsTitle: "💡 Советы и Хитрости",
    settingGoodAlerts: "🎯 Установка Хороших Оповещений:",
    useHealthLevels: "• Устанавливайте пороги на основе уровней здоровья (50, 100, 150)",
    checkRegularly: "• Регулярно проверяйте качество воздуха",
    dontSetTooMany: "• Не устанавливайте слишком много оповещений близко друг к другу",
    powerUserTips: "⚡ Советы для Продвинутых Пользователей:",
    useAqiCommand: "• Используйте /aqi перед установкой оповещений для просмотра текущих уровней",
    checkAlertsRegularly: "• Регулярно проверяйте /my_alerts для управления оповещениями",
    deleteOldAlerts: "• Удаляйте старые оповещения, которые больше не актуальны",
    bestPractices: "📱 Лучшие Практики:",
    keepNotifications: "• Держите уведомления телефона включёнными",
    setActionLevels: "• Устанавливайте оповещения на уровнях, где планируете действовать",
    useInHealthPlanning: "• Используйте бота для планирования здоровья",
    
    faqTitle: "❓ Часто Задаваемые Вопросы",
    questionAccuracy: "В: Насколько точны данные?",
    answerAccuracy: "О: Данные получаются из IQAir API, надёжного источника для точности по всему миру.",
    questionMultiple: "В: Могу ли я установить несколько оповещений?",
    answerMultiple: "О: Да! Устанавливайте столько оповещений, сколько нужно для разных городов и уровней AQI.",
    questionAfterTrigger: "В: Что происходит после срабатывания оповещения?",
    answerAfterTrigger: "О: Вы получаете мгновенное уведомление, и оповещение автоматически удаляется.",
    questionCancel: "В: Могу ли я отменить оповещение?",
    answerCancel: "О: Да, используйте /delete_alert для удаления определённых оповещений или всех сразу.",
    questionFree: "В: Бот бесплатный?",
    answerFree: "О: Да, полностью бесплатный в использовании!",
    questionSpeed: "В: Насколько быстрые уведомления?",
    answerSpeed: "О: Оповещения проверяются каждые 10 минут, поэтому вы получите уведомление в течение минут после достижения порога.",
    
    alertTriggered: "🔔 Оповещение Сработало!",
    reached: "достиг",
    
    somethingWentWrong: "❌ Что-то пошло не так. Попробуйте ещё раз.",
    tryAgain: "Попробуйте ещё раз.",
    unableToIdentify: "❌ Не удалось идентифицировать пользователя. Попробуйте ещё раз.",
    invalidCity: "❌ Неверный город:",
    supportedCitiesList: "Поддерживаемые города:",
    
    time: "Время:",
    
    yes: "Да",
    no: "Нет",
    back: "Назад",
    next: "Далее",
    done: "Готово",
    
    healthImplication: "Влияние на здоровье:",
    recommendation: "Рекомендация:"
  },

  eng: {
    selectLanguage: "Tilni tanlang / Выберите язык / Select Language",
    languageSelected: "English language selected ✅",
    languageChanged: "Language successfully changed!",
    
    welcome: "Welcome! Choose a city to set an air quality alert:",
    chooseCity: "Choose a city to set an air quality alert:",
    
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
    
    citySelected: "You selected:",
    currentAirQuality: "Current air quality:",
    aqiLevel: "AQI level:",
    mainPollutant: "Main pollutant:",
    temperature: "Temperature:",
    humidity: "Humidity:",
    lastUpdated: "Last updated:",
    
    setAlert: "Set alert",
    sendThresholdAqi: "Send the AQI level at which you want me to notify you.",
    thresholdExample: "Example: 100",
    invalidThreshold: "Invalid AQI format. Please send a number between 0 and 500.",
    settingUpAlert: "⏳ Setting up your alert...",
    alertSet: "✅ Alert set! I'll notify you when",
    notifyWhenAqi: "AQI level",
    currentAqi: "Current AQI:",
    failedToSave: "❌ Failed to save your alert. Please try again.",
    unableToFetchAqi: "⚠️ Unable to fetch current air quality. Please try again later.",
    
    above: "above",
    below: "below",
    risesAbove: "rises above",
    fallsBelow: "falls below",
    
    yourActiveAlerts: "📊 Your Active Alerts",
    noActiveAlerts: "📭 You have no active alerts.",
    createFirstAlert: "Use /start to create your first alert!",
    fetchingAlerts: "⏳ Fetching your alerts and current AQI levels...",
    away: "away",
    created: "Created:",
    useDeleteAlert: "💡 Use /delete_alert to remove alerts",
    useCheckAqi: "📊 Use /aqi to check current air quality",
    
    deleteAlerts: "🗑️ Delete Alerts",
    selectAlertToDelete: "Select an alert to delete:",
    deleteAllAlerts: "🗑️ Delete All Alerts",
    cancel: "❌ Cancel",
    confirmDeleteAll: "⚠️ Confirm Delete All",
    confirmDeleteAllText: "Are you sure you want to delete ALL your alerts?\nThis action cannot be undone.",
    yesDeleteAll: "✅ Yes, Delete All",
    allAlertsDeleted: "✅ All Alerts Deleted",
    successfullyDeleted: "successfully deleted",
    alertDeleted: "✅ Alert Deleted",
    useMyAlerts: "Use /my_alerts to view remaining alerts.",
    
    quickAqiCheck: "💨 Quick Air Quality Check",
    selectCityForAqi: "Select a city to get current air quality:",
    showAllCities: "📊 Show All Cities",
    currentAqiLevels: "📊 Current Air Quality Levels",
    unavailable: "❌ Unavailable",
    setAlertForAqi: "💡 Use /start to set an alert for this level",
    fetchingAqi: "Fetching air quality for",
    unableToFetchCityAqi: "Unable to fetch air quality for. Please try again later.",
    
    helpCenter: "🤖 Toza Havo Help Center",
    welcomeToAssistant: "Welcome to your personal air quality monitoring assistant!",
    selectTopic: "Select a topic below to learn more:",
    gettingStarted: "🚀 Getting Started",
    commands: "📊 Commands",
    aboutAqi: "💨 About Air Quality",
    tipsTricks: "💡 Tips & Tricks",
    faq: "❓ FAQ",
    backToHelp: "← Back to Help Menu",
    
    gettingStartedTitle: "🚀 Getting Started",
    step1: "Step 1: Send /start to begin",
    step2: "Step 2: Choose your city",
    step3: "Step 3: Enter your threshold AQI level",
    step4: "Step 4: Get notified when air quality hits your threshold!",
    exampleTitle: "Example:",
    exampleStep1: "• Choose Tashkent",
    exampleStep2: "• Enter 100",
    exampleStep3: "• If current AQI is 80, you'll get alerted when AQI rises above 100",
    thatsIt: "That's it!",
    autoDetection: "The bot automatically detects if you want alerts above or below current AQI.",
    
    availableCommands: "📊 Available Commands",
    commandStart: "/start - Create a new air quality alert",
    commandMyAlerts: "/my_alerts - View all your active alerts",
    commandDeleteAlert: "/delete_alert - Remove specific alerts",
    commandAqi: "/aqi - Get current air quality levels",
    commandAqiCity: "/aqi Tashkent - Get AQI for specific city",
    commandHelp: "/help - Show this help menu",
    commandLanguage: "/language - Change language",
    quickTips: "Quick Tips:",
    allCommandsWork: "• All commands work instantly",
    multipleAlerts: "• You can have multiple alerts active",
    alertsChecked: "• Alerts are checked every 10 minutes",
    alertsAutoRemoved: "• Alerts are automatically removed after triggering",
    
    aboutAqiTitle: "💨 About Air Quality Index",
    supportedCities: "Supported Cities:",
    howAlertsWork: "How Alerts Work:",
    setThresholdAqi: "• Set your threshold AQI level",
    botChecksAqi: "• Bot checks air quality every 10 minutes",
    instantNotification: "• Get instant notification when threshold is hit",
    alertAutoRemoved: "• Alert is automatically removed after triggering",
    directionDetection: "Direction Detection:",
    thresholdAboveCurrent: "• Threshold > Current AQI = Alert when AQI goes above",
    thresholdBelowCurrent: "• Threshold < Current AQI = Alert when AQI goes below",
    
    tipsTitle: "💡 Tips & Tricks",
    settingGoodAlerts: "🎯 Setting Good Alerts:",
    useHealthLevels: "• Set thresholds based on health levels (50, 100, 150)",
    checkRegularly: "• Check air quality regularly",
    dontSetTooMany: "• Don't set too many alerts too close together",
    powerUserTips: "⚡ Power User Tips:",
    useAqiCommand: "• Use /aqi before setting alerts to see current levels",
    checkAlertsRegularly: "• Check /my_alerts regularly to manage your alerts",
    deleteOldAlerts: "• Delete old alerts that are no longer relevant",
    bestPractices: "📱 Best Practices:",
    keepNotifications: "• Keep your phone notifications enabled",
    setActionLevels: "• Set alerts at levels where you plan to take action",
    useInHealthPlanning: "• Use the bot for health planning",
    
    faqTitle: "❓ Frequently Asked Questions",
    questionAccuracy: "Q: How accurate is the data?",
    answerAccuracy: "A: Data is from IQAir API, a trusted source for worldwide accuracy.",
    questionMultiple: "Q: Can I set multiple alerts?",
    answerMultiple: "A: Yes! Set as many alerts as you need for different cities and AQI levels.",
    questionAfterTrigger: "Q: What happens after an alert triggers?",
    answerAfterTrigger: "A: You get an instant notification and the alert is automatically removed.",
    questionCancel: "Q: Can I cancel an alert?",
    answerCancel: "A: Yes, use /delete_alert to remove specific alerts or all at once.",
    questionFree: "Q: Is the bot free?",
    answerFree: "A: Yes, completely free to use!",
    questionSpeed: "Q: How fast are notifications?",
    answerSpeed: "A: Alerts are checked every 10 minutes, so you'll get notified within minutes of your threshold being hit.",
    
    alertTriggered: "🔔 Alert Triggered!",
    reached: "reached",
    
    somethingWentWrong: "❌ Something went wrong. Please try again.",
    tryAgain: "Please try again.",
    unableToIdentify: "❌ Unable to identify user. Please try again.",
    invalidCity: "❌ Invalid city:",
    supportedCitiesList: "Supported cities:",
    
    time: "Time:",
    
    yes: "Yes",
    no: "No",
    back: "Back",
    next: "Next",
    done: "Done",
    
    healthImplication: "Health implication:",
    recommendation: "Recommendation:"
  }
};

export function getTranslation(lang: Language): Translations {
  return translations[lang] || translations.uzb;
}

