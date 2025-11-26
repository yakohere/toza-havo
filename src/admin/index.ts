import { Telegraf } from 'telegraf';
import { handleStats } from './handlers/stats';
import { handleUsers } from './handlers/users';
import { handleAlerts } from './handlers/alerts';
import { handleAdminHelp } from './handlers/help';

export function createAdminBot(token: string): Telegraf {
  const adminBot = new Telegraf(token);

  adminBot.command('stats', handleStats);
  adminBot.command('users', handleUsers);
  adminBot.command('alerts', handleAlerts);
  adminBot.command('help', handleAdminHelp);
  adminBot.command('start', handleAdminHelp);

  adminBot.catch((err, ctx) => {
    console.error('Admin bot error:', err);
    ctx.reply('An unexpected error occurred in admin bot. Please try again.');
  });

  return adminBot;
}

