import { Context } from 'telegraf';

export async function handleAdminHelp(ctx: Context): Promise<void> {
  try {
    const message = '🔐 *Toza Havo Admin Panel*\n\n' +
      '*Available Commands:*\n\n' +
      '/stats - View comprehensive statistics\n' +
      '/users - View user statistics\n' +
      '/alerts - View active alerts overview\n' +
      '/help - Show this help message\n\n' +
      '*Features:*\n' +
      '• Real-time monitoring\n' +
      '• User analytics\n' +
      '• Alert tracking\n' +
      '• Activity reports\n\n' +
      'Use these commands to monitor and manage the Toza Havo bot.';

    await ctx.reply(message, { parse_mode: 'Markdown' });

  } catch (error) {
    console.error('Error in admin help handler:', error);
    await ctx.reply('❌ Failed to display help. Please try again.');
  }
}

