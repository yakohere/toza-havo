import { airQualityDb } from '../db';

export interface AnalyticsSummary {
  overview: {
    totalUsers: number;
    activeUsers30Days: number;
    activeUsers7Days: number;
    totalAlerts: number;
    totalAlertsTriggeredAllTime: number;
  };
  alerts: {
    total: number;
    byCity: Array<{ city: string; count: number }>;
    byDirection: Array<{ direction: string; count: number }>;
  };
  users: {
    byLanguage: Array<{ language: string; count: number }>;
    newThisMonth: number;
    newThisYear: number;
  };
  activity: {
    last24Hours: any[];
    last7Days: any[];
    last30Days: any[];
  };
}

class AnalyticsService {
  public async getComprehensiveStats(): Promise<AnalyticsSummary> {
    const totalUsers = await airQualityDb.getTotalUsers();
    const activeUsers30Days = await airQualityDb.getActiveUsers(30);
    const activeUsers7Days = await airQualityDb.getActiveUsers(7);
    const alerts = await airQualityDb.getAllAlerts();
    
    const triggeredCount = await this.getTriggeredAlertsCount();
    
    const byCity = this.groupByCity(alerts);
    const byDirection = this.groupByDirection(alerts);
    
    return {
      overview: {
        totalUsers,
        activeUsers30Days,
        activeUsers7Days,
        totalAlerts: alerts.length,
        totalAlertsTriggeredAllTime: triggeredCount
      },
      alerts: {
        total: alerts.length,
        byCity,
        byDirection
      },
      users: {
        byLanguage: [],
        newThisMonth: 0,
        newThisYear: 0
      },
      activity: {
        last24Hours: await this.getRecentActivity(1),
        last7Days: await this.getRecentActivity(7),
        last30Days: await this.getRecentActivity(30)
      }
    };
  }

  private groupByCity(alerts: any[]): Array<{ city: string; count: number }> {
    const grouped: Record<string, number> = {};
    alerts.forEach(alert => {
      grouped[alert.city] = (grouped[alert.city] || 0) + 1;
    });
    return Object.entries(grouped).map(([city, count]) => ({ city, count }));
  }

  private groupByDirection(alerts: any[]): Array<{ direction: string; count: number }> {
    const grouped: Record<string, number> = {};
    alerts.forEach(alert => {
      grouped[alert.direction] = (grouped[alert.direction] || 0) + 1;
    });
    return Object.entries(grouped).map(([direction, count]) => ({ direction, count }));
  }

  private async getTriggeredAlertsCount(): Promise<number> {
    try {
      const events = await airQualityDb.getAnalytics();
      return events.filter((e: any) => 
        e.eventType === 'alert_triggered' || e.eventtype === 'alert_triggered'
      ).length;
    } catch (error) {
      return 0;
    }
  }

  private async getRecentActivity(days: number): Promise<any[]> {
    try {
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
      const events = await airQualityDb.getAnalytics(cutoffDate);
      
      const grouped: any = {};
      events.forEach((event: any) => {
        const eventType = event.eventType || event.eventtype;
        if (!grouped[eventType]) {
          grouped[eventType] = 0;
        }
        grouped[eventType]++;
      });
      
      return Object.entries(grouped).map(([eventType, count]) => ({
        eventType,
        count
      }));
    } catch (error) {
      return [];
    }
  }

  public trackAlertCreated(chatId: number, city: string, thresholdAqi: number, direction: string): void {
    airQualityDb.trackEvent('alert_created', chatId, city, { thresholdAqi, direction });
  }

  public trackAlertTriggered(chatId: number, city: string, thresholdAqi: number): void {
    airQualityDb.trackEvent('alert_triggered', chatId, city, { thresholdAqi });
  }

  public trackAlertDeleted(chatId: number, city: string): void {
    airQualityDb.trackEvent('alert_deleted', chatId, city);
  }

  public trackUserCommand(chatId: number, command: string): void {
    airQualityDb.trackEvent('command_used', chatId, undefined, { command });
  }

  public trackAqiCheck(chatId: number, city: string): void {
    airQualityDb.trackEvent('aqi_checked', chatId, city);
  }
}

export const analyticsService = new AnalyticsService();
export default AnalyticsService;

