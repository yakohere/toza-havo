import { Pool, PoolClient } from 'pg';
import { AirQualityAlert, UzbekistanCity } from '../types/AirQuality';

class AirQualityDatabase {
  private pool: Pool;
  private initPromise: Promise<void>;

  constructor() {
    const databaseUrl = process.env.DATABASE_URL || process.env.POSTGRES_URL;
    
    if (!databaseUrl) {
      console.warn('⚠️ DATABASE_URL not found - using local PostgreSQL');
      this.pool = new Pool({
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
        database: process.env.POSTGRES_DB || 'postgres',
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres'
      });
    } else {
      this.pool = new Pool({
        connectionString: databaseUrl,
        ssl: {
          rejectUnauthorized: false
        }
      });
    }

    this.initPromise = this.initTables();
  }

  private async initTables(): Promise<void> {
    let client: PoolClient | null = null;
    try {
      client = await this.pool.connect();
      
      await client.query(`
        CREATE TABLE IF NOT EXISTS air_quality_alerts (
          id TEXT PRIMARY KEY,
          chatId BIGINT NOT NULL,
          city TEXT NOT NULL,
          thresholdAqi INTEGER NOT NULL,
          direction TEXT CHECK(direction IN ('above', 'below')) NOT NULL,
          createdAt TIMESTAMP NOT NULL
        )
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS user_sessions (
          chatId BIGINT PRIMARY KEY,
          step TEXT CHECK(step IN ('waiting_city', 'waiting_threshold')) NOT NULL,
          selectedCity TEXT,
          lastActivity TIMESTAMP NOT NULL
        )
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS user_preferences (
          chatId BIGINT PRIMARY KEY,
          language TEXT CHECK(language IN ('uzb', 'rus', 'eng')) DEFAULT 'uzb',
          favoriteCity TEXT,
          createdAt TIMESTAMP NOT NULL,
          updatedAt TIMESTAMP NOT NULL
        )
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS analytics (
          id SERIAL PRIMARY KEY,
          eventType TEXT NOT NULL,
          chatId BIGINT,
          city TEXT,
          metadata TEXT,
          createdAt TIMESTAMP NOT NULL
        )
      `);

      await client.query(`
        CREATE TABLE IF NOT EXISTS air_quality_cache (
          city TEXT PRIMARY KEY,
          aqi INTEGER NOT NULL,
          mainPollutant TEXT NOT NULL,
          temperature INTEGER,
          humidity INTEGER,
          lastUpdated TIMESTAMP NOT NULL
        )
      `);

      await client.query('CREATE INDEX IF NOT EXISTS idx_alerts_chatid ON air_quality_alerts(chatId)');
      await client.query('CREATE INDEX IF NOT EXISTS idx_alerts_city ON air_quality_alerts(city)');
      await client.query('CREATE INDEX IF NOT EXISTS idx_user_sessions_activity ON user_sessions(lastActivity)');
      await client.query('CREATE INDEX IF NOT EXISTS idx_analytics_chatid ON analytics(chatId)');
      await client.query('CREATE INDEX IF NOT EXISTS idx_analytics_eventtype ON analytics(eventType)');
      await client.query('CREATE INDEX IF NOT EXISTS idx_analytics_createdat ON analytics(createdAt)');
      await client.query('CREATE INDEX IF NOT EXISTS idx_cache_updated ON air_quality_cache(lastUpdated)');

      console.log('✅ PostgreSQL database initialized successfully with indexes');
    } catch (error) {
      console.error('❌ Failed to initialize PostgreSQL database:', error);
      throw error;
    } finally {
      if (client) client.release();
    }
  }

  private async ensureInit(): Promise<void> {
    await this.initPromise;
  }

  public async addAlert(alert: AirQualityAlert): Promise<boolean> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        `INSERT INTO air_quality_alerts (id, chatId, city, thresholdAqi, direction, createdAt)
         VALUES ($1, $2, $3, $4, $5, $6)`,
        [alert.id, alert.chatId, alert.city, alert.thresholdAqi, alert.direction, alert.createdAt]
      );
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Failed to add alert:', error);
      return false;
    }
  }

  public async getAllAlerts(): Promise<AirQualityAlert[]> {
    await this.ensureInit();
    try {
      const result = await this.pool.query('SELECT * FROM air_quality_alerts ORDER BY createdAt DESC');
      return result.rows.map(row => ({
        id: row.id,
        chatId: Number(row.chatid),
        city: row.city,
        thresholdAqi: parseInt(row.thresholdaqi),
        direction: row.direction,
        createdAt: row.createdat.toISOString()
      }));
    } catch (error) {
      console.error('Failed to get alerts:', error);
      return [];
    }
  }

  public async getAlertsByCity(city: string): Promise<AirQualityAlert[]> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        'SELECT * FROM air_quality_alerts WHERE city = $1 ORDER BY createdAt DESC',
        [city]
      );
      return result.rows.map(row => ({
        id: row.id,
        chatId: Number(row.chatid),
        city: row.city,
        thresholdAqi: parseInt(row.thresholdaqi),
        direction: row.direction,
        createdAt: row.createdat.toISOString()
      }));
    } catch (error) {
      console.error('Failed to get alerts by city:', error);
      return [];
    }
  }

  public async getAlertsByChatId(chatId: number): Promise<AirQualityAlert[]> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        'SELECT * FROM air_quality_alerts WHERE chatId = $1 ORDER BY createdAt DESC',
        [chatId]
      );
      return result.rows.map(row => ({
        id: row.id,
        chatId: Number(row.chatid),
        city: row.city,
        thresholdAqi: parseInt(row.thresholdaqi),
        direction: row.direction,
        createdAt: row.createdat.toISOString()
      }));
    } catch (error) {
      console.error('Failed to get alerts by chatId:', error);
      return [];
    }
  }

  public async removeAlert(id: string): Promise<boolean> {
    await this.ensureInit();
    try {
      const result = await this.pool.query('DELETE FROM air_quality_alerts WHERE id = $1', [id]);
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Failed to remove alert:', error);
      return false;
    }
  }

  public async removeAllAlertsByChatId(chatId: number): Promise<number> {
    await this.ensureInit();
    try {
      const result = await this.pool.query('DELETE FROM air_quality_alerts WHERE chatId = $1', [chatId]);
      return result.rowCount || 0;
    } catch (error) {
      console.error('Failed to remove all alerts:', error);
      return 0;
    }
  }

  public async getUniqueCities(): Promise<string[]> {
    await this.ensureInit();
    try {
      const result = await this.pool.query('SELECT DISTINCT city FROM air_quality_alerts');
      return result.rows.map(row => row.city);
    } catch (error) {
      console.error('Failed to get unique cities:', error);
      return [];
    }
  }

  public async setUserState(chatId: number, step: string, selectedCity?: string): Promise<boolean> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        `INSERT INTO user_sessions (chatId, step, selectedCity, lastActivity)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (chatId) DO UPDATE SET
         step = $2, selectedCity = $3, lastActivity = $4`,
        [chatId, step, selectedCity || null, new Date().toISOString()]
      );
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Failed to set user state:', error);
      return false;
    }
  }

  public async getUserState(chatId: number): Promise<{ step: string; selectedCity?: string } | null> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        'SELECT step, selectedCity FROM user_sessions WHERE chatId = $1',
        [chatId]
      );
      const row = result.rows[0];
      if (!row) return null;
      return {
        step: row.step,
        selectedCity: row.selectedcity || undefined
      };
    } catch (error) {
      console.error('Failed to get user state:', error);
      return null;
    }
  }

  public async clearUserState(chatId: number): Promise<boolean> {
    await this.ensureInit();
    try {
      const result = await this.pool.query('DELETE FROM user_sessions WHERE chatId = $1', [chatId]);
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Failed to clear user state:', error);
      return false;
    }
  }

  public async cleanupInactiveSessions(hoursOld: number = 24): Promise<number> {
    await this.ensureInit();
    try {
      const cutoffTime = new Date(Date.now() - hoursOld * 60 * 60 * 1000).toISOString();
      const result = await this.pool.query(
        'DELETE FROM user_sessions WHERE lastActivity < $1',
        [cutoffTime]
      );
      const count = result.rowCount || 0;
      if (count > 0) {
        console.log(`Cleaned up ${count} inactive user sessions`);
      }
      return count;
    } catch (error) {
      console.error('Failed to cleanup inactive sessions:', error);
      return 0;
    }
  }

  public async setUserLanguage(chatId: number, language: string): Promise<boolean> {
    await this.ensureInit();
    try {
      const now = new Date().toISOString();
      const result = await this.pool.query(
        `INSERT INTO user_preferences (chatId, language, createdAt, updatedAt)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (chatId) DO UPDATE SET
         language = $2, updatedAt = $4`,
        [chatId, language, now, now]
      );
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Failed to set user language:', error);
      return false;
    }
  }

  public async getUserLanguage(chatId: number): Promise<string | null> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        'SELECT language FROM user_preferences WHERE chatId = $1',
        [chatId]
      );
      return result.rows[0]?.language || null;
    } catch (error) {
      console.error('Failed to get user language:', error);
      return null;
    }
  }

  public async setFavoriteCity(chatId: number, city: string): Promise<boolean> {
    await this.ensureInit();
    try {
      const now = new Date().toISOString();
      const result = await this.pool.query(
        `INSERT INTO user_preferences (chatId, favoriteCity, language, createdAt, updatedAt)
         VALUES ($1, $2, 'uzb', $3, $4)
         ON CONFLICT (chatId) DO UPDATE SET
         favoriteCity = $2, updatedAt = $4`,
        [chatId, city, now, now]
      );
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Failed to set favorite city:', error);
      return false;
    }
  }

  public async getFavoriteCity(chatId: number): Promise<string | null> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        'SELECT favoriteCity FROM user_preferences WHERE chatId = $1',
        [chatId]
      );
      return result.rows[0]?.favoritecity || null;
    } catch (error) {
      console.error('Failed to get favorite city:', error);
      return null;
    }
  }

  public async trackEvent(eventType: string, chatId?: number, city?: string, metadata?: any): Promise<boolean> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        `INSERT INTO analytics (eventType, chatId, city, metadata, createdAt)
         VALUES ($1, $2, $3, $4, $5)`,
        [eventType, chatId || null, city || null, metadata ? JSON.stringify(metadata) : null, new Date().toISOString()]
      );
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Failed to track event:', error);
      return false;
    }
  }

  public async getAnalytics(startDate?: string, endDate?: string): Promise<any[]> {
    await this.ensureInit();
    try {
      let query = 'SELECT * FROM analytics';
      const params: string[] = [];
      
      if (startDate && endDate) {
        query += ' WHERE createdAt >= $1 AND createdAt <= $2';
        params.push(startDate, endDate);
      } else if (startDate) {
        query += ' WHERE createdAt >= $1';
        params.push(startDate);
      }
      
      query += ' ORDER BY createdAt DESC';
      
      const result = await this.pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Failed to get analytics:', error);
      return [];
    }
  }

  public async getTotalUsers(): Promise<number> {
    await this.ensureInit();
    try {
      const result = await this.pool.query('SELECT COUNT(DISTINCT chatId) as count FROM user_preferences');
      return parseInt(result.rows[0]?.count || '0');
    } catch (error) {
      console.error('Failed to get total users:', error);
      return 0;
    }
  }

  public async getActiveUsers(days: number = 30): Promise<number> {
    await this.ensureInit();
    try {
      const cutoffDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
      const result = await this.pool.query(
        'SELECT COUNT(DISTINCT chatId) as count FROM analytics WHERE createdAt >= $1',
        [cutoffDate]
      );
      return parseInt(result.rows[0]?.count || '0');
    } catch (error) {
      console.error('Failed to get active users:', error);
      return 0;
    }
  }

  public async cacheAirQuality(city: string, aqi: number, mainPollutant: string, temperature?: number, humidity?: number): Promise<boolean> {
    await this.ensureInit();
    try {
      const result = await this.pool.query(
        `INSERT INTO air_quality_cache (city, aqi, mainPollutant, temperature, humidity, lastUpdated)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (city) DO UPDATE SET
         aqi = $2, mainPollutant = $3, temperature = $4, humidity = $5, lastUpdated = $6`,
        [city, aqi, mainPollutant, temperature || null, humidity || null, new Date().toISOString()]
      );
      return (result.rowCount || 0) > 0;
    } catch (error) {
      console.error('Failed to cache air quality:', error);
      return false;
    }
  }

  public async getCachedAirQuality(city: string, maxAgeMinutes: number = 30): Promise<any | null> {
    await this.ensureInit();
    try {
      const cutoffTime = new Date(Date.now() - maxAgeMinutes * 60 * 1000).toISOString();
      const result = await this.pool.query(
        'SELECT * FROM air_quality_cache WHERE city = $1 AND lastUpdated >= $2',
        [city, cutoffTime]
      );
      return result.rows[0] || null;
    } catch (error) {
      console.error('Failed to get cached air quality:', error);
      return null;
    }
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export const airQualityDb = new AirQualityDatabase();
export default AirQualityDatabase;

