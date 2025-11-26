# Quick Start Guide - Toza Havo Bot

## Prerequisites

1. Get your bot token from [@BotFather](https://t.me/botfather)
2. Get IQAir API key from [IQAir](https://www.iqair.com/air-pollution-data-api)

## Local Development Setup (5 minutes)

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Create `.env` file:

```bash
cp .env.example .env
```

Edit `.env` and add your tokens:

```env
BOT_TOKEN=your_bot_token_here
IQAIR_API_KEY=your_iqair_api_key_here
```

### 3. Start PostgreSQL with Docker

```bash
docker-compose up postgres -d
```

### 4. Run the Bot

```bash
npm run dev
```

Your bot is now running! Open Telegram and send `/start` to your bot.

## Docker Deployment (Recommended)

### 1. Configure Environment

Edit `.env` with your tokens.

### 2. Start Everything

```bash
docker-compose up --build
```

That's it! Your bot is running in containers with PostgreSQL.

## Features to Try

1. **Check Air Quality**
   - Send `/aqi`
   - Choose a city or view all
   - See AQI, pollutants, temperature, and health recommendations

2. **Change Language**
   - Send `/language`
   - Choose Uzbek, Russian, or English

3. **Get Help**
   - Send `/help`
   - Browse different topics

## Caching

The bot caches air quality data for 30 minutes per city:
- First request fetches from API 🌐
- Subsequent requests use cache ⚡
- After 30 minutes, fresh data is fetched
- This reduces API calls and improves speed

## Admin Bot (Optional)

If you want to monitor statistics:

1. Create another bot with @BotFather
2. Add `BOT_TOKEN_ADMIN` to `.env`
3. Restart the bot
4. Send `/stats` or `/users` to your admin bot

## Production Deployment

See [README.md](README.md) for detailed Heroku deployment instructions.

## Troubleshooting

**Bot not responding?**
- Check your BOT_TOKEN is correct
- Make sure PostgreSQL is running
- Check logs: `docker-compose logs -f`

**Can't get air quality data?**
- Verify your IQAIR_API_KEY is valid
- Free tier has 50 requests/hour limit
- Data is cached for 30 minutes

**Need help?**
Check the [README.md](README.md) for detailed documentation.
