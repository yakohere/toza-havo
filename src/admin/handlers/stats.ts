import { Context } from 'telegraf';
import { analyticsService } from '../../core/analyticsService';
import { airQualityDb } from '../../db';

export async function handleStats(ctx: Context): Promise<void> {
  try {
    const chatId = ctx.chat?.id;
    if (!chatId) {
      await ctx.reply('❌ Unable to identify user.');
      return;
    }

    await ctx.reply('📊 Generating statistics...');

    const stats = await analyticsService.getComprehensiveStats();
    const alerts = await airQualityDb.getAllAlerts();

    let message = '📊 *Toza Havo Statistics*\n\n';
    
    message += '*Overview:*\n';
    message += `👥 Total Users: ${stats.overview.totalUsers}\n`;
    message += `🟢 Active (30 days): ${stats.overview.activeUsers30Days}\n`;
    message += `🟢 Active (7 days): ${stats.overview.activeUsers7Days}\n`;
    message += `🔔 Total Alerts: ${stats.overview.totalAlerts}\n`;
    message += `✅ Alerts Triggered: ${stats.overview.totalAlertsTriggeredAllTime}\n\n`;

    message += '*Alerts by City:*\n';
    if (stats.alerts.byCity.length > 0) {
      stats.alerts.byCity.forEach(item => {
        message += `📍 ${item.city}: ${item.count}\n`;
      });
    } else {
      message += 'No alerts\n';
    }
    message += '\n';

    message += '*Alerts by Direction:*\n';
    if (stats.alerts.byDirection.length > 0) {
      stats.alerts.byDirection.forEach(item => {
        const emoji = item.direction === 'above' ? '📈' : '📉';
        message += `${emoji} ${item.direction}: ${item.count}\n`;
      });
    } else {
      message += 'No alerts\n';
    }
    message += '\n';

    message += '*Activity (Last 24h):*\n';
    if (stats.activity.last24Hours.length > 0) {
      stats.activity.last24Hours.forEach((item: any) => {
        message += `• ${item.eventType}: ${item.count}\n`;
      });
    } else {
      message += 'No activity\n';
    }

    await ctx.reply(message, { parse_mode: 'Markdown' });

  } catch (error) {
    console.error('Error in stats handler:', error);
    await ctx.reply('❌ Failed to generate statistics. Please try again.');
  }
}

