# Toza Havo - Air Quality Monitoring Bot for Uzbekistan

A production-ready Telegram bot that provides real-time air quality information and automatic threshold alerts for cities in Uzbekistan. Built with TypeScript, Node.js, and designed for containerized deployment.

## 🚀 Features

- **Real-time Air Quality Data**: Check AQI levels for 9 major cities in Uzbekistan
- **Automatic Threshold Alerts**: Get notified when AQI crosses critical thresholds (50, 100, 150, 200, 250, 300)
- **City Subscriptions**: Subscribe to specific cities you care about
- **Smart Caching System**: 30-minute cache per city to reduce API calls and improve performance
- **Multi-language Support**: Full support for Uzbek, Russian, and English
- **Comprehensive Information**: AQI levels, main pollutants, temperature, humidity
- **Health Recommendations**: Get health implications and recommendations based on AQI levels
- **Persistent Storage**: PostgreSQL database for caching, subscriptions, and analytics
- **Background Monitoring**: Automatic threshold checking every 10 minutes
- **Production Ready**: Docker containerization with health checks
- **Heroku Deployment**: Ready for cloud deployment with container registry
- **Admin Dashboard**: Separate admin bot for monitoring and analytics
- **Analytics Tracking**: Comprehensive user activity tracking

## 🛠 Tech Stack

- **Backend**: Node.js + TypeScript
- **Bot Framework**: Telegraf (Telegram Bot API)
- **HTTP Client**: Axios
- **Air Quality API**: IQAir API
- **Database**: PostgreSQL
- **Configuration**: dotenv
- **Containerization**: Docker + Docker Compose
- **Deployment**: Heroku Container Registry

## 📋 Prerequisites

- Node.js 20+
- Docker & Docker Compose (for containerized deployment)
- Telegram Bot Token ([Get from @BotFather](https://t.me/botfather))
- IQAir API Key ([Get from IQAir](https://www.iqair.com/air-pollution-data-api))
- PostgreSQL (included in Docker Compose)

## 🔧 Installation & Setup

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd toza-havo
npm install
```

### 2. Environment Configuration

Create a `.env` file from the example:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
BOT_TOKEN=your_telegram_bot_token_here
BOT_TOKEN_DEVELOPMENT=your_development_bot_token_here
BOT_TOKEN_ADMIN=your_admin_bot_token_here
IQAIR_API_KEY=your_iqair_api_key_here
PORT=8080
NODE_ENV=development

# PostgreSQL
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_DB=postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
```

### 3. Build the Application

```bash
npm run build
```

## 🚀 Running the Application

### Local Development

```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

### Docker Development

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d --build

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 🤖 Bot Usage

### User Commands

- `/start` - Welcome message and available commands
- `/aqi` - Check current air quality levels for cities
- `/subscriptions` - Manage your city alert subscriptions
- `/help` - Show comprehensive help menu
- `/language` - Change language (Uzbek, Russian, English)

### Admin Commands (Admin Bot)

- `/stats` - View comprehensive statistics
- `/users` - View user statistics
- `/help` - Show admin help

### Usage Flow

1. **Start the bot**: Send `/start` command
2. **Select language**: Choose your preferred language (first time only)
3. **Subscribe to cities**: Send `/subscriptions` and tap cities to subscribe
4. **Get automatic alerts**: Receive notifications when AQI crosses thresholds
5. **Check current AQI**: Send `/aqi` anytime to check current air quality

### Example Interaction

```
User: /start
Bot: Welcome!
     
     Available Commands:
     
     /aqi - Check current air quality
     /subscriptions - Manage city alerts
     /help - Show this help menu
     /language - Change language
     
     🔔 Subscribe to cities to get automatic notifications when AQI crosses
     thresholds (50, 100, 150, 200, 250, 300)

User: /subscriptions
Bot: 🔔 Select cities for alerts
     
     You'll receive notifications when AQI crosses thresholds
     (50, 100, 150, 200, 250, 300)
     
     Tap cities to subscribe/unsubscribe:
     [➕ 🏛️ Tashkent] [➕ 🕌 Samarkand]
     [➕ 🕌 Bukhara] [➕ 🏔️ Namangan]
     ...

User: *clicks Tashkent*
Bot: Subscribed to 🏛️ Tashkent ✅

*Later when AQI crosses threshold in Tashkent*
Bot: 🚨 🟠 🏛️ Tashkent
     
     Unhealthy for Sensitive Groups
     
     Current AQI: 105 😷
     Main pollutant: p2
     
     Health implication:
     Sensitive people may experience health effects
     
     Recommendation:
     Reduce prolonged outdoor exertion

User: /aqi
Bot: 💨 Quick Air Quality Check
     
     Select a city to get current air quality:
     [🏛️ Tashkent] [🕌 Samarkand]
     ...
```

## 🏗 Project Structure

```
src/
├── admin/                    # Admin bot functionality
│   ├── handlers/
│   │   ├── stats.ts         # Statistics handler
│   │   ├── users.ts         # Users handler
│   │   └── help.ts          # Help handler
│   └── index.ts             # Admin bot initialization
├── bot/                      # User bot functionality
│   ├── handlers/
│   │   ├── start.ts         # Start command handler
│   │   ├── language.ts      # Language selection
│   │   ├── subscriptions.ts # City subscription management
│   │   ├── aqiCheck.ts      # Check AQI
│   │   └── help.ts          # Help system
│   └── index.ts             # Bot initialization
├── core/                     # Core services
│   ├── thresholdMonitor.ts  # Threshold monitoring & alerts
│   ├── airQualityFeed.ts    # IQAir API integration with caching
│   ├── analyticsService.ts  # Analytics tracking
│   └── rateLimiter.ts       # Rate limiting
├── db/
│   └── index.ts             # PostgreSQL database layer
├── localization/
│   ├── translations.ts      # Translations (UZB, RUS, ENG)
│   └── localizationService.ts # Language service
├── types/
│   └── AirQuality.ts        # TypeScript interfaces
└── index.ts                 # Application entry point
```

## 🌍 Supported Cities

- 🏛️ Tashkent (Toshkent/Ташкент)
- 🕌 Samarkand (Samarqand/Самарканд)
- 🕌 Bukhara (Buxoro/Бухара)
- 🏔️ Namangan (Namangan/Наманган)
- 🏔️ Andijan (Andijon/Андижан)
- 🏔️ Fergana (Farg'ona/Фергана)
- 🏜️ Nukus (Nukus/Нукус)
- 🌾 Karshi (Qarshi/Карши)
- 🏜️ Urgench (Urganch/Ургенч)

## 📊 AQI Levels & Alert Thresholds

The bot monitors and alerts at these AQI thresholds:

- **50** - Good → Moderate 🟡
- **100** - Moderate → Unhealthy for Sensitive Groups 🟠
- **150** - Unhealthy for Sensitive Groups → Unhealthy 🔴
- **200** - Unhealthy → Very Unhealthy 🟣
- **250** - Very Unhealthy 🟣
- **300** - Very Unhealthy → Hazardous 🟤

### AQI Categories:
- **Good (0-50)**: Air quality is satisfactory 🟢 😊
- **Moderate (51-100)**: Air quality is acceptable 🟡 😐
- **Unhealthy for Sensitive Groups (101-150)**: Sensitive groups may experience health effects 🟠 😷
- **Unhealthy (151-200)**: Everyone may begin to experience health effects 🔴 😨
- **Very Unhealthy (201-300)**: Health alert 🟣 😱
- **Hazardous (301+)**: Health warning ☠️ 🟤

## 🔔 How Threshold Alerts Work

1. **Subscribe to Cities**: Use `/subscriptions` to select cities you want to monitor
2. **Background Monitoring**: Bot checks AQI every 10 minutes for all cities
3. **Threshold Detection**: When AQI crosses a threshold (e.g., from 95 to 105), the system detects it
4. **Smart Notifications**: Only sends alerts when crossing thresholds, not on every check
5. **All Subscribers Notified**: Everyone subscribed to that city receives the alert

### Example Scenarios:

**Scenario 1: AQI Rising**
- Previous check: AQI 95 (threshold 50)
- Current check: AQI 105 (threshold 100)
- ✅ Alert sent: "Tashkent reached Unhealthy for Sensitive Groups"

**Scenario 2: AQI Within Same Range**
- Previous check: AQI 105 (threshold 100)
- Current check: AQI 120 (threshold 100)
- ❌ No alert (still in same threshold range)

**Scenario 3: AQI Crossing Multiple Thresholds**
- Previous check: AQI 95 (threshold 50)
- Current check: AQI 155 (threshold 150)
- ✅ Alert sent: "Reached Unhealthy level"

## 💾 Caching System

The bot implements an intelligent caching system to optimize API usage:

- **Cache Duration**: 30 minutes per city
- **Automatic Refresh**: Data is automatically fetched when cache expires
- **Fallback System**: If API fails, uses stale cache (up to 2 hours) as fallback
- **Efficient Multi-City Requests**: Checks cache first, only fetches missing data
- **Rate Limit Protection**: Respects IQAir API limits (50 requests/hour on free tier)

### How Caching Works with Alerts

1. Threshold monitor runs every 10 minutes
2. For each city with subscribers:
   - Check cache (< 30 minutes old)
   - If fresh, use cached data ⚡
   - If stale, fetch from API 🌐
   - Update cache for 30 minutes 💾
3. Compare with previous threshold state
4. Send notifications if threshold crossed

This ensures timely alerts while minimizing API usage.

## 🔍 Monitoring & Health Checks

### Health Endpoints

- `GET /` - Application status, performance metrics, and subscriber count
- `GET /health` - Simple health check for monitoring
- `GET /stats` - Comprehensive statistics

### Docker Health Check

The container includes automatic health checks that verify the application is responding correctly.

### Logs

```bash
# Docker Compose logs
docker-compose logs -f

# Heroku logs
heroku logs --tail -a your-app-name

# Local logs
npm start
```

## 🛡 Error Handling

The bot includes comprehensive error handling for:

- **API failures**: Automatic retry with fallback to stale cache
- **Database errors**: Self-healing table creation
- **Telegram API errors**: Retry mechanism for message delivery
- **Network issues**: Graceful degradation and user notification
- **Rate limiting**: Automatic caching and rate limit management
- **Failed notifications**: Logs errors but continues with other subscribers

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `BOT_TOKEN` | Telegram Bot Token from @BotFather | Yes | - |
| `IQAIR_API_KEY` | IQAir API Key | Yes | - |
| `BOT_TOKEN_ADMIN` | Admin Bot Token (optional) | No | - |
| `PORT` | Server port (Heroku sets this automatically) | No | 8080 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `DATABASE_URL` | PostgreSQL connection string | No | Uses POSTGRES_* vars |
| `POSTGRES_HOST` | PostgreSQL host | No | localhost |
| `POSTGRES_PORT` | PostgreSQL port | No | 5432 |
| `POSTGRES_DB` | PostgreSQL database | No | postgres |
| `POSTGRES_USER` | PostgreSQL user | No | postgres |
| `POSTGRES_PASSWORD` | PostgreSQL password | No | postgres |

## 🚨 Troubleshooting

### Common Issues

1. **Bot not responding**
   - Check BOT_TOKEN is correct
   - Verify bot is started with `/start` command
   - Check Heroku logs for errors

2. **Not receiving alerts**
   - Make sure you've subscribed to cities using `/subscriptions`
   - Verify threshold monitor is running (check logs)
   - Check if AQI is actually crossing thresholds
   - Ensure Telegram notifications are enabled on your device

3. **Air quality data not available**
   - Verify IQAIR_API_KEY is valid
   - Check API rate limits (50 requests/hour on free tier)
   - Check if cache is working properly

4. **Database errors**
   - Check PostgreSQL connection
   - Verify DATABASE_URL or POSTGRES_* variables
   - Review database initialization logs

## 📝 Development

### Available Scripts

```bash
npm run build     # Compile TypeScript
npm run start     # Run production build
npm run dev       # Development mode with ts-node
npm run watch     # Watch mode for development
npm run clean     # Remove build artifacts
```

### Testing Threshold Alerts Locally

1. Subscribe to a city: `/subscriptions`
2. Manually adjust threshold state in database to test:
   ```sql
   UPDATE aqi_threshold_state SET lastThresholdCrossed = 0 WHERE city = 'Tashkent';
   ```
3. Wait for next check cycle (10 minutes) or restart bot

## 📄 License

MIT License - see LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For issues and questions:
- Create an issue in the repository
- Check existing documentation
- Review logs for error details

---

**Toza Havo** - Stay informed about air quality in Uzbekistan! 🇺🇿🌍
