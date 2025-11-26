import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { airQualityDb } from '../../db';
import { analyticsService } from '../../core/analyticsService';

export async function handleDeleteAlert(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.reply('❌ Unable to identify user.');
      return;
    }

    analyticsService.trackUserCommand(chatId, 'delete_alert');

    const translations = await localizationService.getTranslations(chatId);
    const alerts = await airQualityDb.getAlertsByChatId(chatId);

    if (alerts.length === 0) {
      await ctx.reply(`${translations.noActiveAlerts}\n\n${translations.createFirstAlert}`);
      return;
    }

    const buttons = alerts.map(alert => [{
      text: `${translations.cities[alert.city]} (AQI ${alert.direction} ${alert.thresholdAqi})`,
      callback_data: `delete_${alert.id}`
    }]);

    buttons.push([
      { text: translations.deleteAllAlerts, callback_data: 'delete_all' }
    ]);
    buttons.push([
      { text: translations.cancel, callback_data: 'delete_cancel' }
    ]);

    const keyboard = { inline_keyboard: buttons };

    await ctx.reply(`${translations.deleteAlerts}\n\n${translations.selectAlertToDelete}`, { reply_markup: keyboard });

  } catch (error) {
    console.error('Error in delete alert handler:', error);
    await ctx.reply('Something went wrong. Please try again.');
  }
}

export async function handleDeleteAlertCallback(ctx: Context): Promise<void> {
  try {
    const callbackData = (ctx as any).callbackQuery?.data;
    if (!callbackData || !callbackData.startsWith('delete_')) {
      return;
    }

    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.answerCbQuery('Unable to identify user');
      return;
    }

    const translations = await localizationService.getTranslations(chatId);

    if (callbackData === 'delete_cancel') {
      await ctx.answerCbQuery();
      await ctx.editMessageText(translations.cancel);
      return;
    }

    if (callbackData === 'delete_all') {
      const keyboard = {
        inline_keyboard: [
          [
            { text: translations.yesDeleteAll, callback_data: 'delete_confirm_all' },
            { text: translations.cancel, callback_data: 'delete_cancel' }
          ]
        ]
      };

      await ctx.editMessageText(
        `${translations.confirmDeleteAll}\n\n${translations.confirmDeleteAllText}`,
        { reply_markup: keyboard }
      );
      await ctx.answerCbQuery();
      return;
    }

    if (callbackData === 'delete_confirm_all') {
      const count = await airQualityDb.removeAllAlertsByChatId(chatId);
      await ctx.answerCbQuery(translations.allAlertsDeleted);
      await ctx.editMessageText(`${translations.allAlertsDeleted}\n\n${count} ${translations.successfullyDeleted}`);
      return;
    }

    const alertId = callbackData.replace('delete_', '');
    const alerts = await airQualityDb.getAlertsByChatId(chatId);
    const alert = alerts.find(a => a.id === alertId);

    if (!alert) {
      await ctx.answerCbQuery('Alert not found');
      return;
    }

    const removed = await airQualityDb.removeAlert(alertId);

    if (removed) {
      analyticsService.trackAlertDeleted(chatId, alert.city);
      await ctx.answerCbQuery(translations.alertDeleted);
      await ctx.editMessageText(`${translations.alertDeleted}\n\n${translations.cities[alert.city]} (AQI ${alert.thresholdAqi})\n\n${translations.useMyAlerts}`);
    } else {
      await ctx.answerCbQuery('Failed to delete alert');
    }

  } catch (error) {
    console.error('Error in delete alert callback:', error);
    await ctx.answerCbQuery('Error deleting alert');
  }
}

