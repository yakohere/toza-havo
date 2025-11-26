import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { UZBEKISTAN_CITIES, UzbekistanCity } from '../../types/AirQuality';
import { analyticsService } from '../../core/analyticsService';

export async function handleHelp(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.reply('❌ Unable to identify user.');
      return;
    }

    analyticsService.trackUserCommand(chatId, 'help');

    const translations = await localizationService.getTranslations(chatId);

    const keyboard = {
      inline_keyboard: [
        [
          { text: translations.gettingStarted, callback_data: 'help_getting_started' }
        ],
        [
          { text: translations.commands, callback_data: 'help_commands' }
        ],
        [
          { text: translations.aboutAqi, callback_data: 'help_about_aqi' }
        ],
        [
          { text: translations.tipsTricks, callback_data: 'help_tips' }
        ],
        [
          { text: translations.faq, callback_data: 'help_faq' }
        ]
      ]
    };

    const message = `${translations.helpCenter}\n\n${translations.welcomeToBot}\n\n${translations.selectTopic}`;

    await ctx.reply(message, { reply_markup: keyboard });

  } catch (error) {
    console.error('Error in help handler:', error);
    const translations = await localizationService.getTranslations(ctx.chat?.id || 0);
    await ctx.reply(translations.somethingWentWrong);
  }
}

export async function handleHelpCallback(ctx: Context): Promise<void> {
  try {
    const callbackData = (ctx as any).callbackQuery?.data;
    if (!callbackData || !callbackData.startsWith('help_')) {
      return;
    }

    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.answerCbQuery('Unable to identify user');
      return;
    }

    const translations = await localizationService.getTranslations(chatId);

    const backButton = {
      inline_keyboard: [[{ text: translations.backToHelp, callback_data: 'help_back' }]]
    };

    if (callbackData === 'help_back') {
      await handleHelp(ctx);
      await ctx.answerCbQuery();
      return;
    }

    await ctx.answerCbQuery();

    let message = '';

    if (callbackData === 'help_getting_started') {
      message = `${translations.gettingStartedTitle}\n\n${translations.gettingStartedText}`;
    }
    else if (callbackData === 'help_commands') {
      message = translations.commandsText;
    }
    else if (callbackData === 'help_about_aqi') {
      message = `${translations.aboutAqiTitle}\n\n` +
        `${translations.supportedCities}\n\n` +
        `${translations.aqiLevelsTitle}\n` +
        `${translations.aqiGood}\n` +
        `${translations.aqiModerate}\n` +
        `${translations.aqiUnhealthySensitive}\n` +
        `${translations.aqiUnhealthy}\n` +
        `${translations.aqiVeryUnhealthy}\n` +
        `${translations.aqiHazardous}` +
        `${translations.cacheInfo}`;
    }
    else if (callbackData === 'help_tips') {
      message = `${translations.tipsTitle}\n\n${translations.tipsText}`;
    }
    else if (callbackData === 'help_faq') {
      message = translations.faqText;
    }

    if (message) {
      await ctx.editMessageText(message, { reply_markup: backButton });
    }

  } catch (error) {
    console.error('Error in help callback:', error);
    const translations = await localizationService.getTranslations(ctx.chat?.id || 0);
    await ctx.answerCbQuery(translations.somethingWentWrong);
  }
}

