# Components

React components organized by feature and functionality.

## Directory Structure

### `/ui`
Base UI components (buttons, inputs, cards, modals, etc.)
- **Reusable** across the entire application
- **Styled** with Tailwind CSS
- **Accessible** following ARIA guidelines
- **Type-safe** with TypeScript

### `/markets`
Market-specific components
- Market cards and lists
- Market details and statistics
- Market filters and search
- Order book visualization

### `/trading`
Trading interface components
- Trade entry forms
- Position cards
- Order confirmation modals
- Trade history tables

### `/charts`
Data visualization components
- Price charts (candlestick, line)
- Probability charts
- Portfolio performance charts
- P&L visualization

### `/layout`
Layout and navigation components
- Header with wallet connection
- Sidebar navigation
- Footer
- Mobile navigation

## Component Guidelines

### 1. Server vs Client Components

```typescript
// Server Component (default in Next.js 15)
export default function MarketList({ markets }: Props) {
  return <div>...</div>;
}

// Client Component (when needed)
'use client';
export default function TradeForm() {
  const [amount, setAmount] = useState(0);
  return <form>...</form>;
}
```

Use Client Components only when you need:
- Event handlers (onClick, onChange, etc.)
- React hooks (useState, useEffect, etc.)
- Browser APIs (localStorage, WebSocket, etc.)

### 2. Component Composition

```typescript
// Good: Small, composable components
<MarketCard>
  <MarketCard.Header />
  <MarketCard.Body />
  <MarketCard.Footer />
</MarketCard>

// Avoid: Large, monolithic components
```

### 3. TypeScript Props

```typescript
// Always define explicit prop types
interface MarketCardProps {
  market: Market;
  onTrade?: (marketId: string) => void;
  className?: string;
}

export function MarketCard({ market, onTrade, className }: MarketCardProps) {
  // ...
}
```

### 4. Styling

Use Tailwind CSS with the `clsx` utility for conditional classes:

```typescript
import { clsx } from 'clsx';

<button
  className={clsx(
    'px-4 py-2 rounded-lg',
    variant === 'primary' && 'bg-blue-500 text-white',
    variant === 'secondary' && 'bg-gray-200 text-gray-900',
    disabled && 'opacity-50 cursor-not-allowed'
  )}
>
  {children}
</button>
```

## Example Components

### Market Card
```typescript
import { Market } from '@/types';
import { formatCurrency, formatProbability } from '@/lib/utils';

interface MarketCardProps {
  market: Market;
}

export function MarketCard({ market }: MarketCardProps) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition">
      <h3 className="font-semibold text-lg">{market.title}</h3>
      <div className="mt-2 flex justify-between">
        <span>Volume: {formatCurrency(market.volume24h)}</span>
        <span>Prob: {formatProbability(market.outcomes[0].probability)}</span>
      </div>
    </div>
  );
}
```

### Trade Button
```typescript
'use client';

import { useState } from 'react';
import { useTrade } from '@/hooks/use-trades';

interface TradeButtonProps {
  marketId: string;
  outcomeId: string;
}

export function TradeButton({ marketId, outcomeId }: TradeButtonProps) {
  const [loading, setLoading] = useState(false);
  const { executeTrade } = useTrade();

  const handleTrade = async () => {
    setLoading(true);
    try {
      await executeTrade({ marketId, outcomeId, side: 'buy', size: 10 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleTrade} disabled={loading}>
      {loading ? 'Trading...' : 'Trade'}
    </button>
  );
}
```

