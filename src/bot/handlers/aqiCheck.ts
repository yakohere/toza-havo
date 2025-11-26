import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { airQualityFeed } from '../../core/airQualityFeed';
import { UZBEKISTAN_CITIES, UzbekistanCity, getAQILevel } from '../../types/AirQuality';
import { analyticsService } from '../../core/analyticsService';

export async function handleAqiCheck(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.reply('❌ Unable to identify user.');
      return;
    }

    analyticsService.trackUserCommand(chatId, 'aqi');

    const translations = await localizationService.getTranslations(chatId);
    
    const cities = Object.keys(UZBEKISTAN_CITIES) as UzbekistanCity[];
    const buttons = [];
    
    for (let i = 0; i < cities.length; i += 2) {
      const row = [
        { text: translations.cities[cities[i]], callback_data: `aqi_${cities[i]}` }
      ];
      if (i + 1 < cities.length) {
        row.push({ text: translations.cities[cities[i + 1]], callback_data: `aqi_${cities[i + 1]}` });
      }
      buttons.push(row);
    }

    buttons.push([{ text: translations.showAllCities, callback_data: 'aqi_all' }]);

    const keyboard = { inline_keyboard: buttons };

    await ctx.reply(`${translations.quickAqiCheck}\n\n${translations.selectCityForAqi}`, { reply_markup: keyboard });

  } catch (error) {
    console.error('Error in AQI check handler:', error);
    await ctx.reply('Something went wrong. Please try again.');
  }
}

export async function handleAqiCallback(ctx: Context): Promise<void> {
  try {
    const callbackData = (ctx as any).callbackQuery?.data;
    if (!callbackData || !callbackData.startsWith('aqi_')) {
      return;
    }

    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.answerCbQuery('Unable to identify user');
      return;
    }

    const translations = await localizationService.getTranslations(chatId);
    const lang = await localizationService.getUserLanguage(chatId);

    if (callbackData === 'aqi_all') {
      await ctx.answerCbQuery();
      await ctx.editMessageText(`${translations.fetchingAqi}...`);

      const cities = Object.keys(UZBEKISTAN_CITIES) as UzbekistanCity[];
      let message = `${translations.currentAqiLevels}\n\n`;

      for (const city of cities) {
        try {
          const data = await airQualityFeed.getAirQualityForCity(city);
          if (data) {
            const aqi = data.current.pollution.aqius;
            const aqiLevel = getAQILevel(aqi);
            message += `${aqiLevel.color} ${translations.cities[city]}: ${aqi} ${aqiLevel.emoji}\n`;
            analyticsService.trackAqiCheck(chatId, city);
          }
        } catch (error) {
          message += `❌ ${translations.cities[city]}: ${translations.unavailable}\n`;
        }
      }

      message += `\n${translations.setAlertForAqi}`;
      await ctx.editMessageText(message);
      return;
    }

    const city = callbackData.replace('aqi_', '') as UzbekistanCity;

    if (!airQualityFeed.validateCity(city)) {
      await ctx.answerCbQuery('Invalid city');
      return;
    }

    await ctx.answerCbQuery();
    await ctx.editMessageText(`⏳ ${translations.fetchingAqi} ${translations.cities[city]}...`);

    const data = await airQualityFeed.getAirQualityForCity(city);

    if (!data) {
      await ctx.editMessageText(`${translations.unableToFetchCityAqi} ${translations.cities[city]}`);
      return;
    }

    analyticsService.trackAqiCheck(chatId, city);

    const aqi = data.current.pollution.aqius;
    const aqiLevel = getAQILevel(aqi);

    const message = `${aqiLevel.color} ${translations.cities[city]}\n\n` +
      `${translations.aqiLevel} ${aqi} ${aqiLevel.emoji}\n` +
      `${translations.mainPollutant} ${data.current.pollution.mainus}\n` +
      `${translations.temperature} ${data.current.weather.tp}°C\n` +
      `${translations.humidity} ${data.current.weather.hu}%\n\n` +
      `${translations.healthImplication}\n${aqiLevel.healthImplication[lang]}\n\n` +
      `${translations.recommendation}\n${aqiLevel.cautionaryStatement[lang]}\n\n` +
      `${translations.setAlertForAqi}`;

    await ctx.editMessageText(message);

  } catch (error) {
    console.error('Error in AQI callback:', error);
    await ctx.answerCbQuery('Error fetching AQI');
  }
}

