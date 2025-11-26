import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { Language } from '../../localization/translations';

export async function handleLanguageSelection(ctx: Context): Promise<void> {
  try {
    const translations = await localizationService.getTranslations(ctx.chat?.id || 0);
    
    const keyboard = {
      inline_keyboard: [
        [
          { text: `${localizationService.getLanguageFlag('uzb')} O'zbek`, callback_data: 'lang_uzb' },
          { text: `${localizationService.getLanguageFlag('rus')} Русский`, callback_data: 'lang_rus' }
        ],
        [
          { text: `${localizationService.getLanguageFlag('eng')} English`, callback_data: 'lang_eng' }
        ]
      ]
    };

    await ctx.reply(translations.selectLanguage, { reply_markup: keyboard });
  } catch (error) {
    console.error('Error in language selection:', error);
    await ctx.reply('Please select your language / Tilni tanlang / Выберите язык');
  }
}

export async function handleLanguageCommand(ctx: Context): Promise<void> {
  try {
    await handleLanguageSelection(ctx);
  } catch (error) {
    console.error('Error in language command:', error);
    await ctx.reply('Something went wrong. Please try again.');
  }
}

export async function handleLanguageCallback(ctx: Context): Promise<void> {
  try {
    const callbackData = (ctx as any).callbackQuery?.data;
    if (!callbackData || !callbackData.startsWith('lang_')) {
      return;
    }

    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.answerCbQuery('Unable to identify user');
      return;
    }

    const langCode = callbackData.replace('lang_', '') as Language;
    
    if (!localizationService.isValidLanguage(langCode)) {
      await ctx.answerCbQuery('Invalid language selection');
      return;
    }

    await localizationService.setUserLanguage(chatId, langCode);
    const translations = await localizationService.getTranslations(chatId);

    await ctx.answerCbQuery(translations.languageSelected);
    await ctx.editMessageText(translations.languageChanged);

    setTimeout(async () => {
      const { handleStart } = require('./start');
      await handleStart(ctx);
    }, 500);

  } catch (error) {
    console.error('Error in language callback:', error);
    await ctx.answerCbQuery('Error setting language');
  }
}

