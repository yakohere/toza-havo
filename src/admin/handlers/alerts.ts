import { Context } from 'telegraf';
import { airQualityDb } from '../../db';

export async function handleAlerts(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.reply('❌ Unable to identify user.');
      return;
    }

    await ctx.reply('🔔 Fetching alert information...');

    const alerts = await airQualityDb.getAllAlerts();
    const uniqueCities = await airQualityDb.getUniqueCities();

    if (alerts.length === 0) {
      await ctx.reply('📭 No active alerts in the system.');
      return;
    }

    const byCity: Record<string, number> = {};
    const byDirection: Record<string, number> = { above: 0, below: 0 };

    alerts.forEach(alert => {
      byCity[alert.city] = (byCity[alert.city] || 0) + 1;
      byDirection[alert.direction]++;
    });

    let message = '🔔 *Active Alerts Overview*\n\n';
    message += `Total Alerts: ${alerts.length}\n`;
    message += `Unique Cities: ${uniqueCities.length}\n\n`;

    message += '*By City:*\n';
    Object.entries(byCity).forEach(([city, count]) => {
      message += `📍 ${city}: ${count}\n`;
    });
    message += '\n';

    message += '*By Direction:*\n';
    message += `📈 Above threshold: ${byDirection.above}\n`;
    message += `📉 Below threshold: ${byDirection.below}\n\n`;

    message += `Last updated: ${new Date().toLocaleString()}`;

    await ctx.reply(message, { parse_mode: 'Markdown' });

  } catch (error) {
    console.error('Error in alerts handler:', error);
    await ctx.reply('❌ Failed to fetch alert information. Please try again.');
  }
}

