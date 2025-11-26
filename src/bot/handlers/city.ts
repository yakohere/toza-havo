import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { airQualityDb } from '../../db';
import { airQualityFeed } from '../../core/airQualityFeed';
import { UzbekistanCity, getAQILevel } from '../../types/AirQuality';

export async function handleCitySelection(ctx: Context): Promise<void> {
  try {
    const callbackData = (ctx as any).callbackQuery?.data;
    if (!callbackData || !callbackData.startsWith('city_')) {
      return;
    }

    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.answerCbQuery('Unable to identify user');
      return;
    }

    const city = callbackData.replace('city_', '') as UzbekistanCity;
    
    if (!airQualityFeed.validateCity(city)) {
      await ctx.answerCbQuery('Invalid city selection');
      return;
    }

    const translations = await localizationService.getTranslations(chatId);
    
    await ctx.answerCbQuery();
    await ctx.editMessageText(`${translations.citySelected} ${translations.cities[city]}\n\n⏳ ${translations.fetchingAqi}...`);

    const airQualityData = await airQualityFeed.getAirQualityForCity(city);
    
    if (!airQualityData) {
      await ctx.reply(translations.unableToFetchAqi);
      return;
    }

    const aqi = airQualityData.current.pollution.aqius;
    const aqiLevel = getAQILevel(aqi);
    const lang = await localizationService.getUserLanguage(chatId);

    const message = `${aqiLevel.color} ${translations.citySelected} ${translations.cities[city]}\n\n` +
      `${translations.currentAirQuality}\n` +
      `${translations.aqiLevel} ${aqi} ${aqiLevel.emoji}\n` +
      `${translations.mainPollutant} ${airQualityData.current.pollution.mainus}\n` +
      `${translations.temperature} ${airQualityData.current.weather.tp}°C\n` +
      `${translations.humidity} ${airQualityData.current.weather.hu}%\n\n` +
      `${translations.healthImplication}\n${aqiLevel.healthImplication[lang]}\n\n` +
      `${translations.recommendation}\n${aqiLevel.cautionaryStatement[lang]}\n\n` +
      `${translations.sendThresholdAqi}\n${translations.thresholdExample}`;

    await ctx.reply(message);

    await airQualityDb.setUserState(chatId, 'waiting_threshold', city);

  } catch (error) {
    console.error('Error in city selection handler:', error);
    await ctx.answerCbQuery('Error selecting city');
  }
}

