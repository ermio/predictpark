# Polymarket API Integration Guide

Based on the [Polymarket Developer Quickstart](https://docs.polymarket.com/quickstart/introduction/main)

## 🔗 Official Documentation

- **Main Docs**: https://docs.polymarket.com/quickstart/introduction/main
- **API Reference**: https://docs.polymarket.com/api
- **SDK Examples**: https://docs.polymarket.com/examples

## 🚀 Quick Start

### 1. Authentication

Polymarket uses API keys for authentication. You'll need to:

1. Create an account on [Polymarket](https://polymarket.com)
2. Generate API credentials
3. Add them to your `.env.local`:

```env
POLYMARKET_API_KEY=your_api_key_here
POLYMARKET_SECRET_KEY=your_secret_key_here
POLYMARKET_API_URL=https://api.polymarket.com/v1
```

### 2. Install Polymarket SDK

```bash
yarn add @polymarket/sdk
```

### 3. Initialize Client

Create `lib/polymarket/client.ts`:

```typescript
import { PolymarketClient } from '@polymarket/sdk';

export const polymarketClient = new PolymarketClient({
  apiKey: process.env.POLYMARKET_API_KEY!,
  secretKey: process.env.POLYMARKET_SECRET_KEY!,
});
```

## 📊 Fetching Markets

### Get All Markets

```typescript
// lib/polymarket/markets.ts
export async function fetchMarkets() {
  const response = await fetch(
    'https://api.polymarket.com/v1/markets',
    {
      headers: {
        'Authorization': `Bearer ${process.env.POLYMARKET_API_KEY}`,
      },
    }
  );
  
  return await response.json();
}
```

### Filter Crypto Markets

```typescript
export async function getCryptoMarkets() {
  const markets = await fetchMarkets();
  
  // Filter for crypto-related binary markets
  return markets.filter(market => {
    const isCrypto = market.tags?.includes('crypto') || 
                     market.question.toLowerCase().includes('bitcoin') ||
                     market.question.toLowerCase().includes('ethereum') ||
                     // Add more crypto keywords
                     
    const isBinary = market.outcomes.length === 2;
    const isActive = market.active && !market.closed;
    
    return isCrypto && isBinary && isActive;
  });
}
```

## 💰 Placing Trades

### Execute Trade

```typescript
// lib/polymarket/trading.ts
export async function placeTrade(params: {
  marketId: string;
  outcomeId: string;
  side: 'buy' | 'sell';
  amount: number;
  price?: number;
}) {
  const { marketId, outcomeId, side, amount, price } = params;
  
  const order = {
    market: marketId,
    outcome: outcomeId,
    side,
    size: amount,
    ...(price && { price }), // Limit order if price specified
  };
  
  // Use Polymarket SDK or REST API
  const response = await polymarketClient.createOrder(order);
  
  return response;
}
```

## 🔄 Real-Time Updates (WebSocket)

### Connect to WebSocket

```typescript
// lib/polymarket/websocket.ts
import { io } from 'socket.io-client';

export function connectPolymarketWebSocket() {
  const socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
    auth: {
      token: process.env.POLYMARKET_API_KEY,
    },
  });
  
  // Subscribe to market updates
  socket.on('market_update', (data) => {
    console.log('Market updated:', data);
  });
  
  // Subscribe to order updates
  socket.on('order_update', (data) => {
    console.log('Order updated:', data);
  });
  
  return socket;
}
```

### Use in React Component

```typescript
'use client';

import { useEffect, useState } from 'react';
import { connectPolymarketWebSocket } from '@/lib/polymarket/websocket';

export function useMarketUpdates(marketId: string) {
  const [market, setMarket] = useState(null);
  
  useEffect(() => {
    const socket = connectPolymarketWebSocket();
    
    socket.emit('subscribe', { markets: [marketId] });
    
    socket.on('market_update', (data) => {
      if (data.marketId === marketId) {
        setMarket(data);
      }
    });
    
    return () => {
      socket.emit('unsubscribe', { markets: [marketId] });
      socket.disconnect();
    };
  }, [marketId]);
  
  return market;
}
```

## 📋 Common API Endpoints

### Markets

```bash
# Get all markets
GET /v1/markets

# Get single market
GET /v1/markets/:id

# Get market order book
GET /v1/markets/:id/orderbook
```

### Trading

```bash
# Create order
POST /v1/orders

# Get order status
GET /v1/orders/:id

# Cancel order
DELETE /v1/orders/:id
```

### Account

```bash
# Get account balance
GET /v1/account/balance

# Get positions
GET /v1/account/positions

# Get trade history
GET /v1/account/trades
```

## 🔧 Implementation Steps for PredictPark

### Step 1: Create API Route for Markets

Update `app/api/markets/crypto/route.ts`:

```typescript
import { getCryptoMarkets } from '@/lib/polymarket/markets';

export async function GET(request: NextRequest) {
  try {
    const markets = await getCryptoMarkets();
    
    return NextResponse.json({
      success: true,
      data: markets,
      total: markets.length,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch markets' },
      { status: 500 }
    );
  }
}
```

### Step 2: Create Trading API Route

Create `app/api/trades/execute/route.ts`:

```typescript
import { placeTrade } from '@/lib/polymarket/trading';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = await placeTrade(body);
    
    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Trade failed' },
      { status: 500 }
    );
  }
}
```

### Step 3: Update Swipe Handler

In `app/dummy/page.tsx`:

```typescript
const handleSwipe = async (direction: 'left' | 'right') => {
  setSwipeDirection(direction);
  
  // Determine outcome based on swipe
  const outcome = direction === 'right' ? 
    currentMarket.outcomes.find(o => o.type === 'up') :
    currentMarket.outcomes.find(o => o.type === 'down');
  
  try {
    // Execute trade via API
    const response = await fetch('/api/trades/execute', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        marketId: currentMarket.id,
        outcomeId: outcome.id,
        side: 'buy',
        amount: 10, // Default amount
      }),
    });
    
    const result = await response.json();
    
    if (result.success) {
      // Show success feedback
      setTimeout(() => {
        setCurrentIndex((prev) => prev + 1);
        setSwipeDirection(null);
      }, 400);
    } else {
      // Show error
      console.error('Trade failed:', result.error);
      setSwipeDirection(null);
    }
  } catch (error) {
    console.error('Trade error:', error);
    setSwipeDirection(null);
  }
};
```

## 🛡️ Best Practices

### 1. Rate Limiting

Implement rate limiting to avoid hitting API limits:

```typescript
// lib/polymarket/rate-limiter.ts
export class RateLimiter {
  private requests: number[] = [];
  private maxRequests: number;
  private windowMs: number;
  
  constructor(maxRequests = 100, windowMs = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }
  
  async checkLimit(): Promise<boolean> {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.windowMs);
    
    if (this.requests.length >= this.maxRequests) {
      return false;
    }
    
    this.requests.push(now);
    return true;
  }
}
```

### 2. Error Handling

```typescript
try {
  const result = await placeTrade(params);
  return { success: true, data: result };
} catch (error) {
  if (error.code === 'INSUFFICIENT_BALANCE') {
    return { success: false, error: 'Insufficient balance' };
  } else if (error.code === 'MARKET_CLOSED') {
    return { success: false, error: 'Market is closed' };
  } else {
    return { success: false, error: 'Unknown error' };
  }
}
```

### 3. Caching

Cache market data to reduce API calls:

```typescript
// Use Next.js caching
export async function getCryptoMarkets() {
  const response = await fetch(
    'https://api.polymarket.com/v1/markets',
    { 
      next: { 
        revalidate: 60, // Cache for 60 seconds
      } 
    }
  );
  
  return response.json();
}
```

## 📚 Additional Resources

- **Polymarket Discord**: Join for developer support
- **GitHub Examples**: Check official examples repository
- **API Status**: Monitor API uptime and status
- **Rate Limits**: Check current rate limits in documentation

## ⚠️ Important Notes

1. **Test on Testnet First**: Always test with testnet before going live
2. **Secure API Keys**: Never expose keys in client-side code
3. **Handle Errors**: Markets can close, balance can be insufficient
4. **Gas Fees**: Account for blockchain transaction fees
5. **Slippage**: Prices can change between swipe and execution

---

For the latest information, always refer to the [official Polymarket documentation](https://docs.polymarket.com/quickstart/introduction/main).

