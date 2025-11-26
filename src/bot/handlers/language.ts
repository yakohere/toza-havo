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
    await ctx.reply("Tilni tanlang / Выберите язык / Select Language");
  }
}

export async function handleLanguageCommand(ctx: Context): Promise<void> {
  try {
    await handleLanguageSelection(ctx);
  } catch (error) {
    console.error('Error in language command:', error);
    const translations = await localizationService.getTranslations(ctx.chat?.id || 0);
    await ctx.reply(translations.somethingWentWrong);
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
      const translations = await localizationService.getTranslations(0);
      await ctx.answerCbQuery(translations.unableToIdentify);
      return;
    }

    const langCode = callbackData.replace('lang_', '') as Language;
    
    if (!localizationService.isValidLanguage(langCode)) {
      const translations = await localizationService.getTranslations(chatId);
      await ctx.answerCbQuery(translations.somethingWentWrong);
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
    const translations = await localizationService.getTranslations(ctx.chat?.id || 0);
    await ctx.answerCbQuery(translations.somethingWentWrong);
  }
}

