import { Context } from 'telegraf';
import { localizationService } from '../../localization/localizationService';
import { handleLanguageSelection } from './language';
import { UZBEKISTAN_CITIES, UzbekistanCity } from '../../types/AirQuality';
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
    
    const cities = Object.keys(UZBEKISTAN_CITIES) as UzbekistanCity[];
    const keyboard = {
      inline_keyboard: [
        [
          { text: translations.cities['Tashkent'], callback_data: 'city_Tashkent' },
          { text: translations.cities['Samarkand'], callback_data: 'city_Samarkand' }
        ],
        [
          { text: translations.cities['Bukhara'], callback_data: 'city_Bukhara' },
          { text: translations.cities['Namangan'], callback_data: 'city_Namangan' }
        ],
        [
          { text: translations.cities['Andijan'], callback_data: 'city_Andijan' },
          { text: translations.cities['Fergana'], callback_data: 'city_Fergana' }
        ],
        [
          { text: translations.cities['Nukus'], callback_data: 'city_Nukus' },
          { text: translations.cities['Karshi'], callback_data: 'city_Karshi' }
        ],
        [
          { text: translations.cities['Urgench'], callback_data: 'city_Urgench' }
        ]
      ]
    };

    await ctx.reply(translations.welcome, { reply_markup: keyboard });
    
  } catch (error) {
    console.error('Error in start handler:', error);
    await ctx.reply('Sorry, something went wrong. Please try again.');
  }
}

