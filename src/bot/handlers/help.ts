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

    const message = `${translations.helpCenter}\n\n${translations.welcomeToAssistant}\n\n${translations.selectTopic}`;

    await ctx.reply(message, { reply_markup: keyboard });

  } catch (error) {
    console.error('Error in help handler:', error);
    await ctx.reply('Something went wrong. Please try again.');
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
      message = `${translations.gettingStartedTitle}\n\n` +
        `${translations.step1}\n` +
        `${translations.step2}\n` +
        `${translations.step3}\n` +
        `${translations.step4}\n\n` +
        `${translations.exampleTitle}\n` +
        `${translations.exampleStep1}\n` +
        `${translations.exampleStep2}\n` +
        `${translations.exampleStep3}\n\n` +
        `${translations.thatsIt}\n\n` +
        `${translations.autoDetection}`;
    }
    else if (callbackData === 'help_commands') {
      message = `${translations.availableCommands}\n\n` +
        `${translations.commandStart}\n` +
        `${translations.commandMyAlerts}\n` +
        `${translations.commandDeleteAlert}\n` +
        `${translations.commandAqi}\n` +
        `${translations.commandAqiCity}\n` +
        `${translations.commandHelp}\n` +
        `${translations.commandLanguage}\n\n` +
        `${translations.quickTips}\n` +
        `${translations.allCommandsWork}\n` +
        `${translations.multipleAlerts}\n` +
        `${translations.alertsChecked}\n` +
        `${translations.alertsAutoRemoved}`;
    }
    else if (callbackData === 'help_about_aqi') {
      const cities = Object.keys(UZBEKISTAN_CITIES) as UzbekistanCity[];
      const cityList = cities.map(city => translations.cities[city]).join(', ');

      message = `${translations.aboutAqiTitle}\n\n` +
        `${translations.supportedCities}\n${cityList}\n\n` +
        `${translations.howAlertsWork}\n` +
        `${translations.setThresholdAqi}\n` +
        `${translations.botChecksAqi}\n` +
        `${translations.instantNotification}\n` +
        `${translations.alertAutoRemoved}\n\n` +
        `${translations.directionDetection}\n` +
        `${translations.thresholdAboveCurrent}\n` +
        `${translations.thresholdBelowCurrent}`;
    }
    else if (callbackData === 'help_tips') {
      message = `${translations.tipsTitle}\n\n` +
        `${translations.settingGoodAlerts}\n` +
        `${translations.useHealthLevels}\n` +
        `${translations.checkRegularly}\n` +
        `${translations.dontSetTooMany}\n\n` +
        `${translations.powerUserTips}\n` +
        `${translations.useAqiCommand}\n` +
        `${translations.checkAlertsRegularly}\n` +
        `${translations.deleteOldAlerts}\n\n` +
        `${translations.bestPractices}\n` +
        `${translations.keepNotifications}\n` +
        `${translations.setActionLevels}\n` +
        `${translations.useInHealthPlanning}`;
    }
    else if (callbackData === 'help_faq') {
      message = `${translations.faqTitle}\n\n` +
        `${translations.questionAccuracy}\n${translations.answerAccuracy}\n\n` +
        `${translations.questionMultiple}\n${translations.answerMultiple}\n\n` +
        `${translations.questionAfterTrigger}\n${translations.answerAfterTrigger}\n\n` +
        `${translations.questionCancel}\n${translations.answerCancel}\n\n` +
        `${translations.questionFree}\n${translations.answerFree}\n\n` +
        `${translations.questionSpeed}\n${translations.answerSpeed}`;
    }

    if (message) {
      await ctx.editMessageText(message, { reply_markup: backButton });
    }

  } catch (error) {
    console.error('Error in help callback:', error);
    await ctx.answerCbQuery('Error loading help content');
  }
}

