# PredictPark - Project Structure

## Overview
Prediction market trading app for Polymarket crypto markets (Up/Down only)
Stack: Next.js 15, TypeScript, Vercel

## Directory Structure

```
predictpark/
├── app/                          # Next.js 15 App Router
│   ├── api/                      # API Routes
│   │   ├── polymarket/          # Polymarket API integration endpoints
│   │   │   ├── markets/         # Fetch markets
│   │   │   ├── prices/          # Real-time price data
│   │   │   └── auth/            # Authentication with Polymarket
│   │   ├── trades/              # Trading execution endpoints
│   │   │   ├── execute/         # Place trades
│   │   │   ├── history/         # Trade history
│   │   │   └── cancel/          # Cancel orders
│   │   ├── markets/             # Market data endpoints
│   │   │   ├── crypto/          # Crypto-specific markets
│   │   │   └── filters/         # Filter up/down markets
│   │   └── webhooks/            # Webhook handlers
│   ├── dashboard/               # Dashboard pages
│   │   ├── page.tsx            # Main dashboard
│   │   ├── layout.tsx          # Dashboard layout
│   │   └── loading.tsx         # Loading states
│   ├── markets/                 # Markets pages
│   │   ├── page.tsx            # Markets list
│   │   ├── [id]/               # Individual market page
│   │   └── layout.tsx
│   ├── trades/                  # Trading interface
│   │   ├── page.tsx            # Active trades
│   │   ├── history/            # Trade history
│   │   └── layout.tsx
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   ├── error.tsx                # Error boundary
│   ├── loading.tsx              # Loading states
│   └── globals.css              # Global styles
│
├── components/                   # React Components
│   ├── ui/                      # Reusable UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── modal.tsx
│   │   ├── toast.tsx
│   │   └── skeleton.tsx
│   ├── markets/                 # Market-related components
│   │   ├── market-card.tsx
│   │   ├── market-list.tsx
│   │   ├── market-filters.tsx
│   │   └── market-details.tsx
│   ├── trading/                 # Trading components
│   │   ├── trade-form.tsx
│   │   ├── order-book.tsx
│   │   ├── position-card.tsx
│   │   ├── trade-history.tsx
│   │   └── trade-confirmation.tsx
│   ├── charts/                  # Chart components
│   │   ├── price-chart.tsx
│   │   ├── probability-chart.tsx
│   │   └── portfolio-chart.tsx
│   └── layout/                  # Layout components
│       ├── header.tsx
│       ├── sidebar.tsx
│       ├── footer.tsx
│       └── navigation.tsx
│
├── lib/                         # Core libraries & utilities
│   ├── polymarket/              # Polymarket SDK integration
│   │   ├── client.ts           # API client
│   │   ├── markets.ts          # Market queries
│   │   ├── trading.ts          # Trading functions
│   │   ├── websocket.ts        # Real-time updates
│   │   └── types.ts            # Polymarket types
│   ├── trading/                 # Trading logic
│   │   ├── strategy.ts         # Trading strategies
│   │   ├── risk-management.ts  # Risk calculations
│   │   ├── position-manager.ts # Position tracking
│   │   └── execution.ts        # Order execution logic
│   └── utils/                   # Utility functions
│       ├── formatters.ts       # Data formatters
│       ├── validators.ts       # Input validation
│       ├── calculations.ts     # Math utilities
│       └── constants.ts        # App constants
│
├── types/                       # TypeScript type definitions
│   ├── market.ts               # Market types
│   ├── trade.ts                # Trade types
│   ├── user.ts                 # User types
│   ├── api.ts                  # API response types
│   └── index.ts                # Type exports
│
├── hooks/                       # Custom React hooks
│   ├── use-markets.ts          # Market data hook
│   ├── use-trades.ts           # Trading hook
│   ├── use-websocket.ts        # WebSocket hook
│   ├── use-portfolio.ts        # Portfolio data hook
│   └── use-toast.ts            # Toast notifications
│
├── services/                    # External service integrations
│   ├── polymarket/             # Polymarket service layer
│   │   ├── api.ts             # API service
│   │   ├── cache.ts           # Caching layer
│   │   └── middleware.ts      # Request middleware
│   └── trading/                # Trading services
│       ├── execution-service.ts
│       ├── market-data-service.ts
│       └── notification-service.ts
│
├── config/                      # Configuration files
│   ├── markets.ts              # Market configuration
│   ├── trading.ts              # Trading parameters
│   ├── api.ts                  # API configuration
│   └── site.ts                 # Site metadata
│
├── public/                      # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── .env.local                   # Local environment variables
├── .env.example                # Environment variables template
├── next.config.js              # Next.js configuration
├── tsconfig.json               # TypeScript configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── package.json                # Dependencies
└── README.md                   # Project documentation
```

## Key Features by Directory

### `/app` - Next.js 15 App Router
- Server-side rendering and API routes
- File-based routing
- Server components by default

### `/lib/polymarket`
- Polymarket API client wrapper
- Market fetching (filtered for crypto up/down only)
- Trade execution
- WebSocket for real-time price updates

### `/lib/trading`
- Trading strategy implementation
- Risk management (position sizing, stop-loss)
- P&L calculations
- Order management

### `/components`
- Reusable UI components
- Market visualization
- Trading interface
- Charts and analytics

### `/services`
- Business logic layer
- API integrations
- Caching and optimization
- Error handling

## Environment Variables Needed

```env
# Polymarket API
POLYMARKET_API_KEY=
POLYMARKET_SECRET_KEY=
POLYMARKET_API_URL=

# App Configuration
NEXT_PUBLIC_APP_URL=
NEXT_PUBLIC_WS_URL=

# Database (if needed)
DATABASE_URL=

# Vercel
VERCEL_URL=
```

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context / Zustand
- **Data Fetching**: React Server Components + SWR/TanStack Query
- **WebSocket**: Socket.io / native WebSocket
- **Deployment**: Vercel
- **API Integration**: Polymarket API

## Next Steps

1. Initialize Next.js 15 project
2. Set up TypeScript and ESLint
3. Configure Tailwind CSS
4. Implement Polymarket API client
5. Build market filtering (crypto up/down only)
6. Create trading interface
7. Add real-time updates via WebSocket
8. Deploy to Vercel

