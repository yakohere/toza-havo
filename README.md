# Toza Havo - Air Quality Monitoring Bot for Uzbekistan

A production-ready Telegram bot that provides real-time air quality alerts for cities in Uzbekistan. Built with TypeScript, Node.js, and designed for containerized deployment.

## 🚀 Features

- **Real-time Air Quality Monitoring**: Track AQI levels for 9 major cities in Uzbekistan
- **Intelligent Alert System**: Set custom AQI thresholds with automatic direction detection
- **Multi-language Support**: Full support for Uzbek, Russian, and English
- **Persistent Storage**: PostgreSQL database for reliable data storage
- **Background Monitoring**: Continuous air quality checking every 10 minutes
- **Health Recommendations**: Get health implications and recommendations based on AQI levels
- **Production Ready**: Docker containerization with health checks
- **Heroku Deployment**: Ready for cloud deployment with container registry
- **Admin Dashboard**: Separate admin bot for monitoring and analytics
- **Analytics Tracking**: Comprehensive user and alert tracking

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

### Manual Docker Build

```bash
# Build image
docker build -t toza-havo .

# Run container
docker run -d \
  --name toza-havo-bot \
  -p 8080:8080 \
  -e BOT_TOKEN="your_bot_token" \
  -e IQAIR_API_KEY="your_api_key" \
  -e DATABASE_URL="your_postgres_url" \
  -e PORT=8080 \
  toza-havo
```

## ☁️ Heroku Deployment

### Prerequisites

- Heroku CLI installed
- Docker installed
- Heroku account

### Deployment Steps

1. **Login to Heroku**
   ```bash
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Add PostgreSQL Add-on**
   ```bash
   heroku addons:create heroku-postgresql:mini -a your-app-name
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set BOT_TOKEN="your_telegram_bot_token" -a your-app-name
   heroku config:set IQAIR_API_KEY="your_iqair_api_key" -a your-app-name
   heroku config:set BOT_TOKEN_ADMIN="your_admin_bot_token" -a your-app-name
   ```

5. **Enable Container Registry**
   ```bash
   heroku container:login
   ```

6. **Deploy Container**
   ```bash
   # Push and release in one command
   heroku container:push web -a your-app-name
   heroku container:release web -a your-app-name
   ```

7. **Verify Deployment**
   ```bash
   heroku logs --tail -a your-app-name
   heroku open -a your-app-name
   ```

### Alternative: Git-based Deployment

If you prefer Git deployment, ensure `heroku.yml` is in your repository:

```bash
heroku stack:set container -a your-app-name
git push heroku main
```

## 🤖 Bot Usage

### User Commands

- `/start` - Initialize the bot and select a city
- `/my_alerts` - View all your active alerts
- `/delete_alert` - Remove specific alerts
- `/aqi` - Check current air quality levels
- `/help` - Show help menu
- `/language` - Change language

### Admin Commands (Admin Bot)

- `/stats` - View comprehensive statistics
- `/users` - View user statistics
- `/alerts` - View active alerts overview
- `/help` - Show admin help

### Flow

1. **Start the bot**: Send `/start` command
2. **Select language**: Choose your preferred language (first time only)
3. **Select city**: Choose from 9 major cities in Uzbekistan
4. **View current AQI**: See current air quality and health recommendations
5. **Set threshold**: Enter your desired AQI threshold
6. **Receive alerts**: Get notified when AQI reaches your threshold

### Example Interaction

```
User: /start
Bot: Tilni tanlang / Выберите язык / Select Language
     [🇺🇿 O'zbek] [🇷🇺 Русский] [🇺🇸 English]

User: *clicks English*
Bot: Welcome! Choose a city to set an air quality alert:
     [🏛️ Tashkent] [🕌 Samarkand]
     [🕌 Bukhara] [🏔️ Namangan]
     ...

User: *clicks Tashkent*
Bot: You selected: 🏛️ Tashkent
     
     Current air quality:
     AQI level: 85 😐
     Main pollutant: p2
     Temperature: 25°C
     Humidity: 45%
     
     Health implication: Air quality is acceptable
     
     Send the AQI level at which you want me to notify you.
     Example: 100

User: 100
Bot: ✅ Alert set! I'll notify you when 🏛️ Tashkent AQI level rises above 100
     
     Current AQI: 85

*Later when AQI hits 100*
Bot: 🔔 Alert Triggered!
     
     🟠 🏛️ Tashkent reached AQI 100
     
     Current AQI: 102 😷
     Main pollutant: p2
     
     Health implication: Unhealthy for sensitive groups
     
     Recommendation: Sensitive people may experience health effects
```

## 🏗 Project Structure

```
src/
├── admin/                    # Admin bot functionality
│   ├── handlers/
│   │   ├── stats.ts         # Statistics handler
│   │   ├── users.ts         # Users handler
│   │   ├── alerts.ts        # Alerts handler
│   │   └── help.ts          # Help handler
│   └── index.ts             # Admin bot initialization
├── bot/                      # User bot functionality
│   ├── handlers/
│   │   ├── start.ts         # Start command handler
│   │   ├── language.ts      # Language selection
│   │   ├── city.ts          # City selection
│   │   ├── threshold.ts     # Threshold input
│   │   ├── myAlerts.ts      # View alerts
│   │   ├── deleteAlert.ts   # Delete alerts
│   │   ├── aqiCheck.ts      # Check AQI
│   │   └── help.ts          # Help system
│   └── index.ts             # Bot initialization
├── core/                     # Core services
│   ├── airQualityChecker.ts # Background monitoring
│   ├── airQualityFeed.ts    # IQAir API integration
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

## 📊 AQI Levels

- **Good (0-50)**: Air quality is satisfactory 🟢 😊
- **Moderate (51-100)**: Air quality is acceptable 🟡 😐
- **Unhealthy for Sensitive Groups (101-150)**: Sensitive groups may experience health effects 🟠 😷
- **Unhealthy (151-200)**: Everyone may begin to experience health effects 🔴 😨
- **Very Unhealthy (201-300)**: Health alert 🟣 😱
- **Hazardous (301+)**: Health warning ☠️ 🟤

## 🔍 Monitoring & Health Checks

### Health Endpoints

- `GET /` - Application status and checker info
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

- **Invalid AQI inputs**: Asks user to retry with correct format
- **API failures**: Automatic retry with exponential backoff
- **Database errors**: Self-healing table creation
- **Telegram API errors**: Retry mechanism for message delivery
- **Network issues**: Graceful degradation and user notification
- **Rate limiting**: Automatic caching and rate limit management

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

2. **Air quality alerts not triggering**
   - Verify IQAIR_API_KEY is valid
   - Check API rate limits
   - Ensure background service is running

3. **Database errors**
   - Check PostgreSQL connection
   - Verify DATABASE_URL or POSTGRES_* variables
   - Review database initialization logs

4. **Heroku deployment issues**
   - Ensure container registry is enabled
   - Check environment variables are set
   - Verify Docker build completes successfully

### Debug Commands

```bash
# Check container status
docker ps

# View container logs
docker logs toza-havo-bot

# Connect to running container
docker exec -it toza-havo-bot sh

# Test health endpoint
curl http://localhost:8080/health
```

## 📝 Development

### Available Scripts

```bash
npm run build     # Compile TypeScript
npm run start     # Run production build
npm run dev       # Development mode with ts-node
npm run watch     # Watch mode for development
npm run clean     # Remove build artifacts
```

### Code Style

- Follow TypeScript strict mode
- Use meaningful variable names
- Add error handling for all async operations
- Include logging for debugging
- Write self-documenting code with minimal comments

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

**Toza Havo** - Your reliable air quality monitoring companion for Uzbekistan! 🇺🇿🌍

