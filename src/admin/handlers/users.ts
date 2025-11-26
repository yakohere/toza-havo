import { Context } from 'telegraf';
import { airQualityDb } from '../../db';

export async function handleUsers(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.reply('❌ Unable to identify user.');
      return;
    }

    await ctx.reply('👥 Fetching user information...');

    const totalUsers = await airQualityDb.getTotalUsers();
    const activeUsers30 = await airQualityDb.getActiveUsers(30);
    const activeUsers7 = await airQualityDb.getActiveUsers(7);
    const activeUsers1 = await airQualityDb.getActiveUsers(1);

    const message = '👥 *User Statistics*\n\n' +
      `Total Users: ${totalUsers}\n` +
      `Active (1 day): ${activeUsers1}\n` +
      `Active (7 days): ${activeUsers7}\n` +
      `Active (30 days): ${activeUsers30}\n\n` +
      `Retention Rate (7d): ${totalUsers > 0 ? ((activeUsers7 / totalUsers) * 100).toFixed(1) : 0}%\n` +
      `Retention Rate (30d): ${totalUsers > 0 ? ((activeUsers30 / totalUsers) * 100).toFixed(1) : 0}%`;

    await ctx.reply(message, { parse_mode: 'Markdown' });

  } catch (error) {
    console.error('Error in users handler:', error);
    await ctx.reply('❌ Failed to fetch user information. Please try again.');
  }
}

