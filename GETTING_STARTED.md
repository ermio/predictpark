# Getting Started with PredictPark

Welcome to PredictPark! This guide will help you get your prediction market trading app up and running.

## 📋 Prerequisites

Before you begin, ensure you have:

- ✅ Node.js 18+ installed
- ✅ npm 9+ installed
- ✅ Polymarket API credentials (sign up at [polymarket.com](https://polymarket.com))
- ✅ Git installed

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- Next.js 15
- React 19
- TypeScript
- Tailwind CSS
- TanStack Query for data fetching
- Zustand for state management
- And more...

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Copy the example file
cp .env.example .env.local
```

Then edit `.env.local` with your actual values:

```env
POLYMARKET_API_KEY=your_actual_api_key_here
POLYMARKET_SECRET_KEY=your_actual_secret_key_here
POLYMARKET_API_URL=https://api.polymarket.com/v1

NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=wss://api.polymarket.com/ws
```

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure Overview

```
predictpark/
├── app/              # Next.js 15 App Router
│   ├── api/         # API routes (backend endpoints)
│   ├── dashboard/   # Dashboard page
│   ├── markets/     # Markets listing page
│   └── trades/      # Trading interface
├── components/       # React components
│   ├── ui/          # Base UI components
│   ├── markets/     # Market-related components
│   ├── trading/     # Trading components
│   └── charts/      # Data visualization
├── lib/             # Core business logic
│   ├── polymarket/  # Polymarket API integration
│   ├── trading/     # Trading strategies & execution
│   └── utils/       # Utility functions
├── types/           # TypeScript type definitions
├── hooks/           # Custom React hooks
├── services/        # External service integrations
└── config/          # Configuration files
```

## 🔧 Next Steps

### Step 1: Implement Polymarket Client

Create the Polymarket API client in `lib/polymarket/client.ts`:

```typescript
// lib/polymarket/client.ts
export class PolymarketClient {
  private apiKey: string;
  private secretKey: string;
  private baseUrl: string;

  constructor(config: PolymarketConfig) {
    this.apiKey = config.apiKey;
    this.secretKey = config.secretKey;
    this.baseUrl = config.baseUrl || 'https://api.polymarket.com/v1';
  }

  async fetchMarkets() {
    // Implementation here
  }

  async executeTrade(order: TradeRequest) {
    // Implementation here
  }
}
```

### Step 2: Create Your First Page

Edit `app/page.tsx` to create your home page:

```typescript
// app/page.tsx
export default function Home() {
  return (
    <main className="container mx-auto p-6">
      <h1 className="text-4xl font-bold">Welcome to PredictPark</h1>
      <p className="mt-4 text-gray-600">
        Trade crypto prediction markets with confidence
      </p>
    </main>
  );
}
```

### Step 3: Build Market List Component

Create a market listing page in `app/markets/page.tsx`:

```typescript
'use client';

import { useMarkets } from '@/hooks/use-markets';
import { MarketCard } from '@/components/markets/market-card';

export default function MarketsPage() {
  const { markets, isLoading } = useMarkets({
    filters: { cryptoAsset: ['BTC', 'ETH', 'SOL'] }
  });

  if (isLoading) return <div>Loading markets...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {markets.map(market => (
        <MarketCard key={market.id} market={market} />
      ))}
    </div>
  );
}
```

### Step 4: Add Trading Functionality

Implement trading in `lib/trading/execution.ts`:

```typescript
import { TradeRequest } from '@/types';

export async function executeTrade(request: TradeRequest) {
  // Validate the trade
  validateTradeRequest(request);
  
  // Check risk limits
  checkRiskLimits(request);
  
  // Execute via Polymarket API
  const result = await polymarketClient.trade(request);
  
  return result;
}
```

## 🎨 Styling with Tailwind

All components use Tailwind CSS. Example:

```tsx
<div className="bg-white rounded-lg shadow-card p-6 hover:shadow-card-hover transition">
  <h3 className="text-lg font-semibold text-gray-900">Market Title</h3>
  <p className="mt-2 text-sm text-gray-600">Market description...</p>
</div>
```

## 🔍 Key Features to Implement

### Priority 1: Core Functionality
- [ ] Polymarket API integration
- [ ] Market data fetching (crypto markets only)
- [ ] Basic UI for market listing
- [ ] Trade execution

### Priority 2: Enhanced Features
- [ ] Real-time WebSocket updates
- [ ] Position tracking
- [ ] P&L calculations
- [ ] Trade history

### Priority 3: Advanced Features
- [ ] Automated trading strategies
- [ ] Risk management tools
- [ ] Advanced charts
- [ ] Notifications

## 📚 Useful Resources

- **Next.js 15 Docs**: https://nextjs.org/docs
- **Polymarket API**: https://docs.polymarket.com
- **Tailwind CSS**: https://tailwindcss.com/docs
- **TanStack Query**: https://tanstack.com/query/latest
- **TypeScript**: https://www.typescriptlang.org/docs

## 🐛 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
npm run dev -- -p 3001
```

### TypeScript Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### API Connection Issues

1. Verify your API keys in `.env.local`
2. Check Polymarket API status
3. Review network requests in browser DevTools
4. Check server logs for error messages

## 🚀 Deploy to Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables (same as `.env.local`)
5. Deploy!

Alternatively, use the Vercel CLI:

```bash
npm install -g vercel
vercel
```

## 💡 Tips

- **Development**: Use `npm run dev` for hot-reload during development
- **Type Safety**: Run `npm run type-check` before committing
- **Code Quality**: Run `npm run lint` to catch issues
- **API Testing**: Use tools like Postman or curl to test API routes
- **State Management**: Consider Zustand for complex state needs

## 🤝 Need Help?

- Check the [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed architecture info
- Review example code in `/lib`, `/components`, and `/hooks` directories
- Read component-specific README files in each major directory

## ⚠️ Important Notes

1. **Security**: Never commit `.env.local` to version control
2. **API Limits**: Be aware of Polymarket API rate limits
3. **Trading Risk**: This is real money - test thoroughly before live trading
4. **Data Validation**: Always validate user input before trading
5. **Error Handling**: Implement comprehensive error handling for API calls

---

Happy coding! 🎯 Build something amazing with PredictPark!

