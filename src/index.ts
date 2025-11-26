import dotenv from 'dotenv';
import { createBot } from './bot';
import { createAdminBot } from './admin';
import AirQualityChecker from './core/airQualityChecker';
import { airQualityDb } from './db';

if (process.env.NODE_ENV !== 'production') {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
}

dotenv.config();

const isDevelopment = process.env.NODE_ENV !== 'production';
const BOT_TOKEN = isDevelopment 
  ? (process.env.BOT_TOKEN_DEVELOPMENT || process.env.BOT_TOKEN)
  : process.env.BOT_TOKEN;

const BOT_TOKEN_ADMIN = process.env.BOT_TOKEN_ADMIN;

const PORT = parseInt(process.env.PORT || '8080');

if (!BOT_TOKEN) {
  console.error('BOT_TOKEN is required in environment variables');
  console.error('For development, set BOT_TOKEN_DEVELOPMENT or BOT_TOKEN');
  process.exit(1);
}

console.log(`🔧 Environment: ${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'}`);
console.log(`🤖 Using bot token: ${BOT_TOKEN.substring(0, 10)}...`);
if (BOT_TOKEN_ADMIN) {
  console.log(`🔐 Admin bot token: ${BOT_TOKEN_ADMIN.substring(0, 10)}...`);
} else {
  console.log('⚠️ Admin bot token not configured (BOT_TOKEN_ADMIN)');
}

async function startApplication(): Promise<void> {
  try {
    console.log('Starting Toza Havo Bot...');

    const bot = createBot(BOT_TOKEN!);

    const airQualityChecker = new AirQualityChecker(bot);

    console.log('🔄 Starting air quality checker service...');
    airQualityChecker.start();
    console.log('✅ Air quality checker started - monitoring every 10 minutes');

    console.log('🚀 Launching Telegram bot...');
    
    bot.launch()
      .then(() => {
        console.log('✅ Bot launched successfully');
      })
      .catch((error) => {
        console.error('❌ Failed to launch Telegram bot:', error);
        console.log('⚠️ Attempting to continue anyway...');
      });
    
    console.log('⏳ Bot launch initiated in background');

    let adminBot: any = null;
    if (BOT_TOKEN_ADMIN) {
      console.log('🔐 Launching Admin bot...');
      adminBot = createAdminBot(BOT_TOKEN_ADMIN);
      adminBot.launch()
        .then(() => {
          console.log('✅ Admin bot launched successfully');
        })
        .catch((error: any) => {
          console.error('❌ Failed to launch Admin bot:', error);
          console.log('⚠️ Continuing without admin bot...');
        });
    }

    const express = require('express');
    const app = express();

    app.get('/', async (req: any, res: any) => {
      const { apiRateLimiter, telegramRateLimiter } = require('./core/rateLimiter');
      const { airQualityFeed } = require('./core/airQualityFeed');

      const alerts = await airQualityDb.getAllAlerts();

      res.json({
        status: 'running',
        bot: 'Toza Havo',
        description: 'Air Quality Monitoring Bot for Uzbekistan',
        airQualityChecker: airQualityChecker.getStatus(),
        performance: {
          totalAlerts: alerts.length,
          rateLimits: {
            api: apiRateLimiter.getStats(),
            telegram: telegramRateLimiter.getStats(),
            iqair: airQualityFeed.getRateLimitStatus()
          },
          memory: {
            used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + ' MB',
            total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + ' MB'
          },
          uptime: Math.round(process.uptime()) + ' seconds'
        }
      });
    });

    app.get('/health', (req: any, res: any) => {
      res.json({ status: 'healthy', timestamp: new Date().toISOString() });
    });

    app.get('/stats', async (req: any, res: any) => {
      const { analyticsService } = require('./core/analyticsService');

      try {
        const stats = await analyticsService.getComprehensiveStats();
        
        res.json({
          type: 'comprehensive',
          data: stats,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        console.error('Error generating stats:', error);
        res.status(500).json({
          error: 'Failed to generate statistics',
          message: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    });

    app.listen(PORT, () => {
      console.log(`✅ Health server running on port ${PORT}`);
      console.log('🎯 App startup completed successfully');
    });

    const gracefulShutdown = (signal: string) => {
      console.log(`Received ${signal}, shutting down gracefully...`);

      airQualityChecker.stop();
      bot.stop(signal);
      if (adminBot) {
        adminBot.stop(signal);
      }
      airQualityDb.close();

      console.log('Application shut down complete');
      process.exit(0);
    };

    process.once('SIGINT', () => gracefulShutdown('SIGINT'));
    process.once('SIGTERM', () => gracefulShutdown('SIGTERM'));

  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

startApplication().catch(error => {
  console.error('Unhandled error during startup:', error);
  process.exit(1);
});

