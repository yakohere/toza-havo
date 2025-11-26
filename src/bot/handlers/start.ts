import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { handleLanguageSelection } from './language';
import { analyticsService } from '../../core/analyticsService';

export async function handleStart(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.reply('❌ Unable to identify user. Please try again.');
      return;
    }

    analyticsService.trackUserCommand(chatId, 'start');

    const userLanguage = await localizationService.getUserLanguage(chatId);
    
    if (!userLanguage) {
      await handleLanguageSelection(ctx);
      return;
    }

    const translations = await localizationService.getTranslations(chatId);
    
    const message = `${translations.welcome}\n\n` +
      `${translations.availableCommands}\n\n` +
      `${translations.commandAqi}\n` +
      `${translations.commandSubscriptions}\n` +
      `${translations.commandHelp}\n` +
      `${translations.commandLanguage}\n\n` +
      `${translations.subscribeInfo}`;

    await ctx.reply(message);
    
  } catch (error) {
    console.error('Error in start handler:', error);
    const translations = await localizationService.getTranslations(ctx.chat?.id || 0);
    await ctx.reply(translations.somethingWentWrong);
  }
}

