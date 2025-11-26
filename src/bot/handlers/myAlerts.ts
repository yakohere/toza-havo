import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { airQualityDb } from '../../db';
import { airQualityFeed } from '../../core/airQualityFeed';
import { UzbekistanCity } from '../../types/AirQuality';
import { analyticsService } from '../../core/analyticsService';

export async function handleMyAlerts(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.reply('❌ Unable to identify user.');
      return;
    }

    analyticsService.trackUserCommand(chatId, 'my_alerts');

    const translations = await localizationService.getTranslations(chatId);
    
    await ctx.reply(translations.fetchingAlerts);

    const alerts = await airQualityDb.getAlertsByChatId(chatId);

    if (alerts.length === 0) {
      await ctx.reply(`${translations.noActiveAlerts}\n\n${translations.createFirstAlert}`);
      return;
    }

    let message = `${translations.yourActiveAlerts}\n\n`;

    for (const alert of alerts) {
      try {
        const airQualityData = await airQualityFeed.getAirQualityForCity(alert.city as UzbekistanCity);
        const currentAqi = airQualityData?.current.pollution.aqius || 0;
        const diff = Math.abs(currentAqi - alert.thresholdAqi);
        const directionText = alert.direction === 'above' ? translations.above : translations.below;
        
        message += `📍 ${translations.cities[alert.city]}\n`;
        message += `   AQI ${directionText} ${alert.thresholdAqi}\n`;
        message += `   ${translations.currentAqi} ${currentAqi}\n`;
        message += `   ${diff} ${translations.away}\n`;
        message += `   ${translations.created} ${new Date(alert.createdAt).toLocaleDateString()}\n\n`;
      } catch (error) {
        console.error(`Error fetching data for ${alert.city}:`, error);
      }
    }

    message += `\n${translations.useDeleteAlert}\n${translations.useCheckAqi}`;

    await ctx.reply(message);

  } catch (error) {
    console.error('Error in my alerts handler:', error);
    await ctx.reply('Something went wrong. Please try again.');
  }
}

