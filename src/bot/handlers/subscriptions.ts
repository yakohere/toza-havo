import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { airQualityDb } from '../../db';
import { UZBEKISTAN_CITIES, UzbekistanCity } from '../../types/AirQuality';
import { analyticsService } from '../../core/analyticsService';

export async function handleSubscriptions(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      const translations = await localizationService.getTranslations(0);
      await ctx.reply(translations.unableToIdentify);
      return;
    }

    analyticsService.trackUserCommand(chatId, 'subscriptions');

    const translations = await localizationService.getTranslations(chatId);
    const subscribedCities = await airQualityDb.getUserSubscriptions(chatId);

    const cities = Object.keys(UZBEKISTAN_CITIES) as UzbekistanCity[];
    const buttons = [];
    
    for (let i = 0; i < cities.length; i += 2) {
      const row = [];
      const city1 = cities[i];
      const isSubscribed1 = subscribedCities.includes(city1);
      row.push({
        text: `${isSubscribed1 ? '✅' : '➕'} ${translations.cities[city1]}`,
        callback_data: `sub_${city1}`
      });
      
      if (i + 1 < cities.length) {
        const city2 = cities[i + 1];
        const isSubscribed2 = subscribedCities.includes(city2);
        row.push({
          text: `${isSubscribed2 ? '✅' : '➕'} ${translations.cities[city2]}`,
          callback_data: `sub_${city2}`
        });
      }
      buttons.push(row);
    }

    const keyboard = { inline_keyboard: buttons };

    const message = subscribedCities.length === 0
      ? `${translations.manageSubscriptions}\n\n` +
        `${translations.noSubscriptions}\n\n` +
        `${translations.selectCitiesForAlerts}\n` +
        `${translations.alertThresholdsInfo}\n\n` +
        `${translations.tapToToggle}`
      : `${translations.yourSubscriptions} (${subscribedCities.length})\n\n` +
        `${translations.subscribed}\n${translations.notSubscribed}\n\n` +
        `${translations.tapToToggle}`;

    await ctx.reply(message, { reply_markup: keyboard });

  } catch (error) {
    console.error('Error in subscriptions handler:', error);
    const translations = await localizationService.getTranslations(ctx.chat?.id || 0);
    await ctx.reply(translations.somethingWentWrong);
  }
}

export async function handleSubscriptionCallback(ctx: Context): Promise<void> {
  try {
    const callbackData = (ctx as any).callbackQuery?.data;
    if (!callbackData || !callbackData.startsWith('sub_')) {
      return;
    }

    const chatId = ctx.chat?.id;
    if (!chatId) {
      const translations = await localizationService.getTranslations(0);
      await ctx.answerCbQuery(translations.unableToIdentify);
      return;
    }

    const city = callbackData.replace('sub_', '') as UzbekistanCity;
    const translations = await localizationService.getTranslations(chatId);

    const subscribedCities = await airQualityDb.getUserSubscriptions(chatId);
    const isSubscribed = subscribedCities.includes(city);

    if (isSubscribed) {
      await airQualityDb.unsubscribeFromCity(chatId, city);
      await ctx.answerCbQuery(`${translations.cities[city]} ${translations.unsubscribedFrom}`);
      analyticsService.trackUserCommand(chatId, 'unsubscribe');
    } else {
      await airQualityDb.subscribeToCity(chatId, city);
      await ctx.answerCbQuery(`${translations.cities[city]} ${translations.subscribedTo}`);
      analyticsService.trackUserCommand(chatId, 'subscribe');
    }

    await handleSubscriptions(ctx);

  } catch (error) {
    console.error('Error in subscription callback:', error);
    const translations = await localizationService.getTranslations(ctx.chat?.id || 0);
    await ctx.answerCbQuery(translations.errorUpdatingSubscription);
  }
}

