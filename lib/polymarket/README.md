# Polymarket Integration

This directory contains the Polymarket API integration layer.

## Files

- **client.ts** - Main API client with authentication and request handling
- **markets.ts** - Market data fetching and filtering (crypto up/down markets only)
- **trading.ts** - Trade execution, order placement, and cancellation
- **websocket.ts** - Real-time market data via WebSocket
- **types.ts** - TypeScript types for Polymarket API responses

## Usage Example

```typescript
import { PolymarketClient } from '@/lib/polymarket/client';
import { getCryptoMarkets } from '@/lib/polymarket/markets';

// Initialize client
const client = new PolymarketClient({
  apiKey: process.env.POLYMARKET_API_KEY,
  secretKey: process.env.POLYMARKET_SECRET_KEY,
});

// Fetch crypto up/down markets
const markets = await getCryptoMarkets(client);

// Filter for active markets only
const activeMarkets = markets.filter(m => m.active && m.volume24h > 1000);
```

## Key Features

1. **Market Filtering**: Automatically filters for crypto-related binary (up/down) markets
2. **Authentication**: Handles API key management and request signing
3. **Rate Limiting**: Built-in rate limiting to respect API quotas
4. **Error Handling**: Comprehensive error handling with retries
5. **WebSocket**: Real-time price updates for active positions

