import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { airQualityDb } from '../../db';
import { airQualityFeed } from '../../core/airQualityFeed';
import { AirQualityAlert, UzbekistanCity } from '../../types/AirQuality';
import { v4 as uuidv4 } from 'uuid';
import { analyticsService } from '../../core/analyticsService';

export async function handleThresholdInput(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    const text = (ctx as any).message?.text;

    if (!chatId || !text) {
      return;
    }

    const userState = await airQualityDb.getUserState(chatId);
    
    if (!userState || userState.step !== 'waiting_threshold' || !userState.selectedCity) {
      return;
    }

    const translations = await localizationService.getTranslations(chatId);

    const thresholdAqi = parseFloat(text.trim());

    if (isNaN(thresholdAqi) || thresholdAqi < 0 || thresholdAqi > 500) {
      await ctx.reply(translations.invalidThreshold);
      return;
    }

    await ctx.reply(translations.settingUpAlert);

    const airQualityData = await airQualityFeed.getAirQualityForCity(userState.selectedCity as UzbekistanCity);
    
    if (!airQualityData) {
      await ctx.reply(translations.unableToFetchAqi);
      await airQualityDb.clearUserState(chatId);
      return;
    }

    const currentAqi = airQualityData.current.pollution.aqius;
    const direction: 'above' | 'below' = thresholdAqi > currentAqi ? 'above' : 'below';

    const alert: AirQualityAlert = {
      id: uuidv4(),
      chatId,
      city: userState.selectedCity as UzbekistanCity,
      thresholdAqi,
      direction,
      createdAt: new Date().toISOString()
    };

    const saved = await airQualityDb.addAlert(alert);

    if (!saved) {
      await ctx.reply(translations.failedToSave);
      await airQualityDb.clearUserState(chatId);
      return;
    }

    analyticsService.trackAlertCreated(chatId, alert.city, thresholdAqi, direction);

    const directionText = direction === 'above' ? translations.risesAbove : translations.fallsBelow;
    
    const message = `${translations.alertSet} ${translations.cities[alert.city]} ${translations.notifyWhenAqi} ${directionText} ${thresholdAqi}\n\n` +
      `${translations.currentAqi} ${currentAqi}`;

    await ctx.reply(message);
    await airQualityDb.clearUserState(chatId);

  } catch (error) {
    console.error('Error in threshold input handler:', error);
    const chatId = ctx.chat?.id;
    if (chatId) {
      await airQualityDb.clearUserState(chatId);
    }
    await ctx.reply('Something went wrong. Please try again with /start');
  }
}

