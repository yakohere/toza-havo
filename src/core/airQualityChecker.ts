import { Telegraf } from 'telegraf';
import { airQualityDb } from '../db';
import { airQualityFeed } from './airQualityFeed';
import { AirQualityAlert, UzbekistanCity, getAQILevel } from '../types/AirQuality';
import { telegramRateLimiter } from './rateLimiter';
import { localizationService } from '../localization/localizationService';
import { analyticsService } from './analyticsService';

class AirQualityChecker {
  private bot: Telegraf;
  private isRunning = false;
  private intervalId: NodeJS.Timeout | null = null;
  private readonly checkInterval = 600000;
  private lastHeartbeat: number = 0;

  constructor(bot: Telegraf) {
    this.bot = bot;
  }

  public start(): void {
    if (this.isRunning) {
      console.log('⚠️ Air quality checker is already running');
      return;
    }

    this.isRunning = true;
    console.log('🔄 Air quality checker service starting...');
    console.log(`⏰ Will check air quality every ${this.checkInterval/1000} seconds (${this.checkInterval/60000} minutes)`);
    
    this.checkAirQuality().catch(error => {
      console.error('Error in initial air quality check:', error);
    });
    
    this.intervalId = setInterval(() => {
      this.checkAirQuality().catch(error => {
        console.error('Error in air quality checking cycle:', error);
      });
    }, this.checkInterval);
    
    console.log('✅ Air quality checker service started successfully');
  }

  public stop(): void {
    if (!this.isRunning) {
      return;
    }

    this.isRunning = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
    console.log('Air quality checker service stopped');
  }

  private async checkAirQuality(): Promise<void> {
    try {
      const alerts = await airQualityDb.getAllAlerts();
      
      const now = Date.now();
      if (!this.lastHeartbeat || now - this.lastHeartbeat > 30000) {
        console.log(`💓 Air quality checker heartbeat - ${new Date().toISOString()}`);
        this.lastHeartbeat = now;
        
        airQualityDb.cleanupInactiveSessions(24);
      }
      
      if (alerts.length === 0) {
        console.log('📊 No active alerts to check');
        return;
      }
      
      console.log(`📊 Checking ${alerts.length} active air quality alerts`);

      const uniqueCities = [...new Set(alerts.map((alert: AirQualityAlert) => alert.city))];
      const validCities = uniqueCities.filter(city => 
        airQualityFeed.validateCity(city)
      ) as UzbekistanCity[];

      if (validCities.length === 0) {
        return;
      }

      for (const city of validCities) {
        try {
          const airQualityData = await airQualityFeed.getAirQualityForCity(city);
          
          if (!airQualityData) {
            console.warn(`No air quality data available for ${city}`);
            continue;
          }

          const currentAqi = airQualityData.current.pollution.aqius;
          const cityAlerts = alerts.filter((alert: AirQualityAlert) => alert.city === city);

          for (const alert of cityAlerts) {
            const shouldTrigger = this.shouldTriggerAlert(alert, currentAqi);
            
            if (shouldTrigger) {
              console.log(`🔔 Alert triggered: ${alert.city} AQI ${alert.direction} ${alert.thresholdAqi} (current: ${currentAqi})`);
              await this.triggerAlert(alert, currentAqi, airQualityData.current.pollution.mainus);
            }
          }

          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(`Error checking ${city}:`, error);
        }
      }
      
    } catch (error) {
      console.error('Error during air quality checking:', error);
    }
  }

  private shouldTriggerAlert(alert: AirQualityAlert, currentAqi: number): boolean {
    if (alert.direction === 'above') {
      return currentAqi >= alert.thresholdAqi;
    } else {
      return currentAqi <= alert.thresholdAqi;
    }
  }

  private async triggerAlert(alert: AirQualityAlert, currentAqi: number, mainPollutant: string): Promise<void> {
    try {
      const message = await this.formatAlertMessage(alert, currentAqi, mainPollutant);
      
      await this.sendTelegramMessage(alert.chatId, message);
      
      const removed = await airQualityDb.removeAlert(alert.id);
      if (removed) {
        console.log(`Alert ${alert.id} triggered and removed successfully`);
        
        analyticsService.trackAlertTriggered(alert.chatId, alert.city, alert.thresholdAqi);
      } else {
        console.warn(`Failed to remove triggered alert ${alert.id}`);
      }
      
    } catch (error) {
      console.error(`Failed to trigger alert ${alert.id}:`, error);
      
      try {
        const translations = await localizationService.getTranslations(alert.chatId);
        await this.sendTelegramMessage(
          alert.chatId, 
          `⚠️ ${translations.somethingWentWrong}`
        );
      } catch (retryError) {
        console.error(`Failed to send error message to chat ${alert.chatId}:`, retryError);
      }
    }
  }

  private async formatAlertMessage(alert: AirQualityAlert, currentAqi: number, mainPollutant: string): Promise<string> {
    const translations = await localizationService.getTranslations(alert.chatId);
    const lang = await localizationService.getUserLanguage(alert.chatId);
    const aqiLevel = getAQILevel(currentAqi);
    
    return `${translations.alertTriggered}\n\n` +
      `${aqiLevel.color} ${translations.cities[alert.city]} ${translations.reached} AQI ${alert.thresholdAqi}\n\n` +
      `${translations.currentAqi} ${currentAqi} ${aqiLevel.emoji}\n` +
      `${translations.mainPollutant} ${mainPollutant}\n\n` +
      `${translations.healthImplication}\n${aqiLevel.healthImplication[lang]}\n\n` +
      `${translations.recommendation}\n${aqiLevel.cautionaryStatement[lang]}`;
  }

  private async sendTelegramMessage(chatId: number, message: string): Promise<void> {
    const maxRetries = 2;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        await telegramRateLimiter.waitForSlot();
        await this.bot.telegram.sendMessage(chatId, message);
        return;
      } catch (error: any) {
        console.error(`Telegram send attempt ${attempt} failed:`, error.message);
        
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          throw error;
        }
      }
    }
  }

  public getStatus(): { isRunning: boolean; checkInterval: number } {
    return {
      isRunning: this.isRunning,
      checkInterval: this.checkInterval
    };
  }
}

export default AirQualityChecker;

