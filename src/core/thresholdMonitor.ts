import { Telegraf } from 'telegraf';
import { airQualityDb } from '../db';
import { airQualityFeed } from './airQualityFeed';
import { UZBEKISTAN_CITIES, UzbekistanCity, getAQILevel } from '../types/AirQuality';
import { telegramRateLimiter } from './rateLimiter';
import { localizationService } from '../localization/localizationService';

const AQI_THRESHOLDS = [50, 100, 150, 200, 250, 300];

class ThresholdMonitor {
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
      console.log('⚠️ Threshold monitor is already running');
      return;
    }

    this.isRunning = true;
    console.log('🔄 Threshold monitor service starting...');
    console.log(`⏰ Will check thresholds every ${this.checkInterval/1000} seconds (${this.checkInterval/60000} minutes)`);
    console.log(`📊 Monitoring thresholds: ${AQI_THRESHOLDS.join(', ')}`);
    
    this.checkThresholds().catch(error => {
      console.error('Error in initial threshold check:', error);
    });
    
    this.intervalId = setInterval(() => {
      this.checkThresholds().catch(error => {
        console.error('Error in threshold checking cycle:', error);
      });
    }, this.checkInterval);
    
    console.log('✅ Threshold monitor service started successfully');
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
    console.log('Threshold monitor service stopped');
  }

  private async checkThresholds(): Promise<void> {
    try {
      const now = Date.now();
      if (!this.lastHeartbeat || now - this.lastHeartbeat > 30000) {
        console.log(`💓 Threshold monitor heartbeat - ${new Date().toISOString()}`);
        this.lastHeartbeat = now;
      }

      const cities = Object.keys(UZBEKISTAN_CITIES) as UzbekistanCity[];
      
      for (const city of cities) {
        try {
          await this.checkCityThresholds(city);
          await new Promise(resolve => setTimeout(resolve, 2000));
        } catch (error) {
          console.error(`Error checking thresholds for ${city}:`, error);
        }
      }
      
      console.log(`✅ Threshold check completed for ${cities.length} cities`);
      
    } catch (error) {
      console.error('Error during threshold checking:', error);
    }
  }

  private async checkCityThresholds(city: UzbekistanCity): Promise<void> {
    const subscribers = await airQualityDb.getSubscribersForCity(city);
    
    if (subscribers.length === 0) {
      return;
    }

    const airQualityData = await airQualityFeed.getAirQualityForCity(city);
    
    if (!airQualityData) {
      console.warn(`No air quality data available for ${city}`);
      return;
    }

    const currentAqi = airQualityData.current.pollution.aqius;
    const previousState = await airQualityDb.getThresholdState(city);

    if (!previousState) {
      const initialThreshold = this.getCurrentThreshold(currentAqi);
      await airQualityDb.updateThresholdState(city, currentAqi, initialThreshold);
      console.log(`📊 Initialized threshold state for ${city}: AQI ${currentAqi} (threshold ${initialThreshold})`);
      return;
    }

    const currentThreshold = this.getCurrentThreshold(currentAqi);
    const previousThreshold = previousState.lastThresholdCrossed;

    if (currentThreshold !== previousThreshold) {
      console.log(`🔔 Threshold crossed for ${city}: ${previousThreshold} → ${currentThreshold} (AQI: ${currentAqi})`);
      
      await this.notifySubscribers(city, subscribers, currentAqi, currentThreshold, airQualityData.current.pollution.mainus);
      
      await airQualityDb.updateThresholdState(city, currentAqi, currentThreshold);
    } else {
      await airQualityDb.updateThresholdState(city, currentAqi, currentThreshold);
    }
  }

  private getCurrentThreshold(aqi: number): number {
    for (let i = AQI_THRESHOLDS.length - 1; i >= 0; i--) {
      if (aqi >= AQI_THRESHOLDS[i]) {
        return AQI_THRESHOLDS[i];
      }
    }
    return 0;
  }

  private async notifySubscribers(
    city: string, 
    subscribers: number[], 
    currentAqi: number, 
    threshold: number,
    mainPollutant: string
  ): Promise<void> {
    console.log(`📢 Notifying ${subscribers.length} subscribers for ${city} (AQI: ${currentAqi}, threshold: ${threshold})`);

    const aqiLevel = getAQILevel(currentAqi);

    for (const chatId of subscribers) {
      try {
        const message = await this.formatNotificationMessage(chatId, city, currentAqi, threshold, mainPollutant, aqiLevel);
        await this.sendTelegramMessage(chatId, message);
        
        await airQualityDb.trackEvent('threshold_notification', chatId, city, { aqi: currentAqi, threshold });
        
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`Failed to notify subscriber ${chatId}:`, error);
      }
    }
  }

  private async formatNotificationMessage(
    chatId: number,
    city: string,
    currentAqi: number,
    threshold: number,
    mainPollutant: string,
    aqiLevel: any
  ): Promise<string> {
    const translations = await localizationService.getTranslations(chatId);
    const lang = await localizationService.getUserLanguage(chatId);

    let thresholdMsg = '';
    if (threshold === 50) {
      thresholdMsg = translations.reachedModerate;
    } else if (threshold === 100) {
      thresholdMsg = translations.reachedUnhealthySensitive;
    } else if (threshold === 150) {
      thresholdMsg = translations.reachedUnhealthy;
    } else if (threshold === 200 || threshold === 250) {
      thresholdMsg = translations.reachedVeryUnhealthy;
    } else if (threshold === 300) {
      thresholdMsg = translations.reachedHazardous;
    }

    return `${translations.thresholdAlert} ${aqiLevel.color} ${translations.cities[city]}\n\n` +
      `${thresholdMsg}\n\n` +
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

  public getStatus(): { isRunning: boolean; checkInterval: number; thresholds: number[] } {
    return {
      isRunning: this.isRunning,
      checkInterval: this.checkInterval,
      thresholds: AQI_THRESHOLDS
    };
  }
}

export default ThresholdMonitor;

