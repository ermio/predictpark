# Trading Logic

This directory contains core trading functionality and strategy implementation.

## Files

- **strategy.ts** - Trading strategy implementations
- **risk-management.ts** - Position sizing, stop-loss, take-profit calculations
- **position-manager.ts** - Track and manage open positions
- **execution.ts** - Order execution and order book interaction

## Trading Strategies

### 1. Trend Following
- Monitor price momentum
- Enter positions based on probability shifts
- Exit on reversal signals

### 2. Mean Reversion
- Identify overextended probabilities
- Enter counter-trend positions
- Target return to equilibrium

### 3. Manual Trading
- User-driven order placement
- Risk checks and validations
- Position size recommendations

## Risk Management

```typescript
import { calculatePositionSize, checkRiskLimits } from '@/lib/trading/risk-management';

// Calculate safe position size based on account balance
const positionSize = calculatePositionSize({
  accountBalance: 10000,
  riskPerTrade: 0.02, // 2% risk per trade
  stopLossDistance: 0.15, // 15% stop loss
});

// Validate trade against risk limits
const isValid = checkRiskLimits({
  currentPositions: [...],
  newPosition: {...},
  maxExposure: 0.25, // Max 25% account exposure
});
```

## Position Tracking

- Real-time P&L calculation
- Position aggregation
- Performance metrics
- Trade history logging

