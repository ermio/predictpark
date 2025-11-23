# PredictPark 🎯

A Next.js 15 application for trading crypto prediction markets on Polymarket. Focus on up/down binary markets for cryptocurrency assets.

## 🚀 Features

- **🎯 Tinder-Style Swipe Interface**: Swipe right for UP, left for DOWN
- **📱 Mobile-First Design**: Optimized for touch and gesture controls
- **Real-time Market Data**: Live updates from Polymarket API
- **Crypto-Focused**: Filtered to show only crypto up/down markets
- **Trading Interface**: Execute trades directly from the dashboard
- **Position Management**: Track P&L and manage open positions
- **Risk Management**: Built-in position sizing and risk controls
- **Real-time Updates**: WebSocket integration for live price feeds
- **Responsive Design**: Beautiful gradient UI with smooth animations

## 📁 Project Structure

See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation of the folder organization.

```
predictpark/
├── app/              # Next.js 15 App Router
├── components/       # React components
├── lib/             # Core libraries (Polymarket, trading logic)
├── types/           # TypeScript definitions
├── hooks/           # Custom React hooks
├── services/        # External service integrations
├── config/          # Configuration files
└── public/          # Static assets
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand / React Context
- **Data Fetching**: TanStack Query / SWR
- **API Integration**: Polymarket API
- **Real-time**: WebSocket / Socket.io
- **Deployment**: Vercel

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- yarn 1.22+
- Privy App ID ([Get it here](https://dashboard.privy.io))
- Polymarket API credentials

### 🔐 Security First

**⚠️ All API keys must be stored in `.env.local` - NEVER commit sensitive data!**

See [SECURITY.md](./SECURITY.md) for comprehensive security guidelines.

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/predictpark.git
cd predictpark
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:

Create `.env.local` in the root directory:
```bash
touch .env.local
```

Add your API keys (see [ENV_SETUP.md](./ENV_SETUP.md) for detailed instructions):
```env
# Privy Authentication (REQUIRED)
NEXT_PUBLIC_PRIVY_APP_ID=your_privy_app_id

# Polymarket API (for live trading)
POLYMARKET_API_KEY=your_api_key
POLYMARKET_SECRET_KEY=your_secret_key
POLYMARKET_API_URL=https://api.polymarket.com/v1

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

**⚠️ IMPORTANT**: Never commit `.env.local` to Git! It's already in `.gitignore`.

4. Run the development server:
```bash
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

6. Try the swipe interface at [http://localhost:3000/dummy](http://localhost:3000/dummy)

## 🔧 Development

### Project Scripts

```bash
yarn dev             # Start development server
yarn build           # Build for production
yarn start           # Start production server
yarn lint            # Run ESLint
yarn type-check      # TypeScript type checking
```

### Try the Swipe UI

Visit `/dummy` to test the Tinder-like swipe interface with dummy data:
- 👉 **Swipe Right** = Bet on price going UP
- 👈 **Swipe Left** = Bet on price going DOWN
- See `SWIPE_UI_GUIDE.md` for detailed documentation

### Key Directories

- **`/app`**: Next.js 15 app router pages and API routes
- **`/lib/polymarket`**: Polymarket API client and market data
- **`/lib/trading`**: Trading strategies and execution logic
- **`/components`**: Reusable React components
- **`/types`**: TypeScript type definitions

## 📊 Trading Features

### Market Filtering
- Automatically filters for crypto-related markets
- Shows only up/down binary markets
- Configurable volume and liquidity thresholds

### Risk Management
- Position size limits
- Maximum account exposure controls
- Stop-loss and take-profit support
- Slippage protection

### Order Types
- Market orders (instant execution)
- Limit orders (price-specific)

## 🔐 Security

- API keys stored in environment variables
- Server-side API calls only
- No sensitive data in client bundles
- Rate limiting on API routes

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

```bash
# Or use Vercel CLI
npm install -g vercel
vercel
```

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `POLYMARKET_API_KEY` | Polymarket API key | Yes |
| `POLYMARKET_SECRET_KEY` | Polymarket secret key | Yes |
| `POLYMARKET_API_URL` | Polymarket API endpoint | Yes |
| `NEXT_PUBLIC_APP_URL` | Your app URL | No |
| `DATABASE_URL` | Database connection string | No |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT License - see LICENSE file for details

## 🔗 Resources

- [Polymarket API Documentation](https://docs.polymarket.com)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## ⚠️ Disclaimer

This is a trading application. Always trade responsibly and never risk more than you can afford to lose. This software is provided "as is" without warranty of any kind.