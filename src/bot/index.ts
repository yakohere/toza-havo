import { Telegraf } from 'telegraf';
import { handleStart } from './handlers/start';
import { handleAqiCheck, handleAqiCallback } from './handlers/aqiCheck';
import { handleHelp, handleHelpCallback } from './handlers/help';
import { handleLanguageCommand, handleLanguageCallback } from './handlers/language';
import { handleSubscriptions, handleSubscriptionCallback } from './handlers/subscriptions';

export function createBot(token: string): Telegraf {
  const bot = new Telegraf(token);

  bot.command('start', handleStart);
  bot.command('aqi', handleAqiCheck);
  bot.command('subscriptions', handleSubscriptions);
  bot.command('help', handleHelp);
  bot.command('language', handleLanguageCommand);
  
  bot.action(/^aqi_/, handleAqiCallback);
  bot.action(/^sub_/, handleSubscriptionCallback);
  bot.action(/^help_/, handleHelpCallback);
  bot.action(/^lang_/, handleLanguageCallback);

  bot.catch((err, ctx) => {
    console.error('Bot error:', err);
    ctx.reply('An unexpected error occurred. Please try again.');
  });

  return bot;
}

