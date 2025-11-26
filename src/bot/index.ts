import { Telegraf } from 'telegraf';
import { handleStart } from './handlers/start';
import { handleCitySelection } from './handlers/city';
import { handleThresholdInput } from './handlers/threshold';
import { handleMyAlerts } from './handlers/myAlerts';
import { handleDeleteAlert, handleDeleteAlertCallback } from './handlers/deleteAlert';
import { handleAqiCheck, handleAqiCallback } from './handlers/aqiCheck';
import { handleHelp, handleHelpCallback } from './handlers/help';
import { handleLanguageCommand, handleLanguageCallback } from './handlers/language';

export function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);

  bot.command('start', handleStart);
  bot.command('my_alerts', handleMyAlerts);
  bot.command('delete_alert', handleDeleteAlert);
  bot.command('aqi', handleAqiCheck);
  bot.command('help', handleHelp);
  bot.command('language', handleLanguageCommand);
  
  bot.action(/^city_/, handleCitySelection);
  bot.action(/^delete_/, handleDeleteAlertCallback);
  bot.action(/^aqi_/, handleAqiCallback);
  bot.action(/^help_/, handleHelpCallback);
  bot.action(/^lang_/, handleLanguageCallback);
  
  bot.on('text', handleThresholdInput);

  bot.catch((err, ctx) => {
    console.error('Bot error:', err);
    ctx.reply('An unexpected error occurred. Please try again.');
  });

  return bot;
}

