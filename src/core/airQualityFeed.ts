import dotenv from 'dotenv';
import axios from 'axios';
import { AirQualityData, UzbekistanCity, UZBEKISTAN_CITIES } from '../types/AirQuality';
import { airQualityDb } from '../db';

dotenv.config();

interface IQAirResponse {
  status: string;
  data: {
    city: string;
    state?: string;
    country: string;
    location: {
      type: string;
      coordinates: [number, number];
    };
    current: {
      pollution: {
        ts: string;
        aqius: number;
        mainus: string;
        aqicn: number;
        maincn: string;
      };
      weather: {
        ts: string;
        tp: number;
        pr: number;
        hu: number;
        ws: number;
        wd: number;
        ic: string;
      };
    };
  };
}

class AirQualityFeedService {
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.airvisual.com/v2';
  private readonly retryAttempts = 3;
  private readonly retryDelay = 1000;
  private requestCount = 0;
  private readonly maxRequestsPerHour = 50;
  private lastResetTime = Date.now();

  constructor() {
    this.apiKey = process.env.IQAIR_API_KEY || '';
    if (!this.apiKey) {
      console.warn('⚠️ IQAIR_API_KEY not found in environment variables');
    }
  }

  private checkRateLimit(): boolean {
    const now = Date.now();
    const hourInMs = 60 * 60 * 1000;
    
    if (now - this.lastResetTime > hourInMs) {
      this.requestCount = 0;
      this.lastResetTime = now;
    }
    
    if (this.requestCount >= this.maxRequestsPerHour) {
      console.warn('⚠️ API rate limit reached, using cached data');
      return false;
    }
    
    return true;
  }

  private async delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  private async makeRequest(url: string): Promise<IQAirResponse> {
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        const response = await axios.get(url, {
          timeout: 15000,
          headers: {
            'User-Agent': 'Toza-Havo-Bot/1.0'
          }
        });

        if (response.status === 200 && response.data && response.data.status === 'success') {
          this.requestCount++;
          return response.data;
        }
        
        throw new Error(`API returned status: ${response.data?.status || 'unknown'}`);
      } catch (error: any) {
        console.error(`API request attempt ${attempt} failed:`, error.message);
        
        if (error.response?.status === 429) {
          console.error('Rate limit exceeded');
          throw new Error('Rate limit exceeded');
        }
        
        if (attempt < this.retryAttempts) {
          await this.delay(this.retryDelay * attempt);
          continue;
        }
        
        throw error;
      }
    }
    
    throw new Error('Max retry attempts exceeded');
  }

  public async getAirQualityByCoordinates(lat: number, lon: number): Promise<AirQualityData | null> {
    try {
      if (!this.apiKey) {
        throw new Error('API key not configured');
      }

      if (!this.checkRateLimit()) {
        return null;
      }
      
      const url = `${this.baseUrl}/nearest_city?lat=${lat}&lon=${lon}&key=${this.apiKey}`;
      
      const result = await this.makeRequest(url);
      
      if (!result.data) {
        throw new Error('No data returned from API');
      }

      const airQualityData: AirQualityData = {
        city: result.data.city,
        country: result.data.country,
        state: result.data.state,
        location: result.data.location,
        current: result.data.current
      };

      console.log(`Fetched air quality for ${airQualityData.city}: AQI ${airQualityData.current.pollution.aqius}`);
      
      await airQualityDb.cacheAirQuality(
        airQualityData.city,
        airQualityData.current.pollution.aqius,
        airQualityData.current.pollution.mainus,
        airQualityData.current.weather.tp,
        airQualityData.current.weather.hu
      );
      
      return airQualityData;
      
    } catch (error: any) {
      console.error(`Error fetching air quality for coordinates (${lat}, ${lon}):`, error.message);
      return null;
    }
  }

  public async getAirQualityForCity(city: UzbekistanCity): Promise<AirQualityData | null> {
    try {
      // Always check cache first (30 minutes)
      const cached = await airQualityDb.getCachedAirQuality(city, 30);
      if (cached) {
        console.log(`✅ Using cached air quality data for ${city} (age: ${Math.round((Date.now() - new Date(cached.lastupdated).getTime()) / 60000)} minutes)`);
        return {
          city: cached.city,
          country: 'Uzbekistan',
          current: {
            pollution: {
              ts: cached.lastupdated,
              aqius: cached.aqi,
              mainus: cached.mainpollutant,
              aqicn: cached.aqi,
              maincn: cached.mainpollutant
            },
            weather: {
              ts: cached.lastupdated,
              tp: cached.temperature || 0,
              pr: 1013,
              hu: cached.humidity || 0,
              ws: 0,
              wd: 0,
              ic: '01d'
            }
          }
        };
      }

      console.log(`🌐 Fetching fresh air quality data for ${city} (cache expired or not found)`);

      const cityData = UZBEKISTAN_CITIES[city];
      if (!cityData) {
        throw new Error(`Unsupported city: ${city}`);
      }

      const freshData = await this.getAirQualityByCoordinates(cityData.lat, cityData.lon);
      
      if (freshData) {
        console.log(`💾 Cached fresh data for ${city} (valid for 30 minutes)`);
      }
      
      return freshData;
      
    } catch (error: any) {
      console.error(`Error fetching air quality for ${city}:`, error.message);
      
      // If API fails, try to return stale cache (up to 2 hours old) as fallback
      const staleCache = await airQualityDb.getCachedAirQuality(city, 120);
      if (staleCache) {
        console.log(`⚠️ Using stale cache for ${city} due to API error`);
        return {
          city: staleCache.city,
          country: 'Uzbekistan',
          current: {
            pollution: {
              ts: staleCache.lastupdated,
              aqius: staleCache.aqi,
              mainus: staleCache.mainpollutant,
              aqicn: staleCache.aqi,
              maincn: staleCache.mainpollutant
            },
            weather: {
              ts: staleCache.lastupdated,
              tp: staleCache.temperature || 0,
              pr: 1013,
              hu: staleCache.humidity || 0,
              ws: 0,
              wd: 0,
              ic: '01d'
            }
          }
        };
      }
      
      return null;
    }
  }

  public async getMultipleCities(cities: UzbekistanCity[]): Promise<Map<string, AirQualityData>> {
    const dataMap = new Map<string, AirQualityData>();
    
    // Check cache for all cities first
    const cachedCities: string[] = [];
    const citiesToFetch: UzbekistanCity[] = [];
    
    for (const city of cities) {
      const cached = await airQualityDb.getCachedAirQuality(city, 30);
      if (cached) {
        cachedCities.push(city);
        dataMap.set(city, {
          city: cached.city,
          country: 'Uzbekistan',
          current: {
            pollution: {
              ts: cached.lastupdated,
              aqius: cached.aqi,
              mainus: cached.mainpollutant,
              aqicn: cached.aqi,
              maincn: cached.mainpollutant
            },
            weather: {
              ts: cached.lastupdated,
              tp: cached.temperature || 0,
              pr: 1013,
              hu: cached.humidity || 0,
              ws: 0,
              wd: 0,
              ic: '01d'
            }
          }
        });
      } else {
        citiesToFetch.push(city);
      }
    }
    
    console.log(`📦 Using cache for ${cachedCities.length} cities: ${cachedCities.join(', ')}`);
    
    if (citiesToFetch.length > 0) {
      console.log(`🌐 Fetching fresh data for ${citiesToFetch.length} cities: ${citiesToFetch.join(', ')}`);
    }
    
    // Only fetch cities that are not in cache
    for (const city of citiesToFetch) {
      try {
        const data = await this.getAirQualityForCity(city);
        if (data) {
          dataMap.set(city, data);
        }
        // Add delay only between API calls
        if (citiesToFetch.indexOf(city) < citiesToFetch.length - 1) {
          await this.delay(2000);
        }
      } catch (error) {
        console.error(`Failed to fetch air quality for ${city}:`, error);
      }
    }

    return dataMap;
  }

  public validateCity(city: string): city is UzbekistanCity {
    return city in UZBEKISTAN_CITIES;
  }

  public getRateLimitStatus(): { current: number; max: number; resetsIn: number } {
    const now = Date.now();
    const hourInMs = 60 * 60 * 1000;
    const resetsIn = Math.max(0, hourInMs - (now - this.lastResetTime));
    
    return {
      current: this.requestCount,
      max: this.maxRequestsPerHour,
      resetsIn: Math.floor(resetsIn / 1000 / 60)
    };
  }
}

export const airQualityFeed = new AirQualityFeedService();
export default AirQualityFeedService;

