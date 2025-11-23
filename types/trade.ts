// Trade-related types

export type OrderSide = 'buy' | 'sell';
export type OrderType = 'market' | 'limit';
export type OrderStatus = 'pending' | 'open' | 'filled' | 'cancelled' | 'expired';

export interface Trade {
  id: string;
  userId: string;
  marketId: string;
  outcomeId: string;
  
  // Order details
  side: OrderSide;
  type: OrderType;
  status: OrderStatus;
  
  // Pricing
  price: number;
  size: number;
  filledSize: number;
  averagePrice: number;
  
  // Fees & costs
  fee: number;
  totalCost: number;
  
  // Timestamps
  createdAt: string;
  updatedAt: string;
  filledAt?: string;
  cancelledAt?: string;
  
  // Metadata
  notes?: string;
}

export interface Position {
  id: string;
  userId: string;
  marketId: string;
  outcomeId: string;
  
  // Position details
  size: number;
  averageEntryPrice: number;
  currentPrice: number;
  
  // P&L
  unrealizedPnL: number;
  realizedPnL: number;
  totalPnL: number;
  pnlPercentage: number;
  
  // Timestamps
  openedAt: string;
  updatedAt: string;
}

export interface TradeRequest {
  marketId: string;
  outcomeId: string;
  side: OrderSide;
  type: OrderType;
  size: number;
  price?: number; // Required for limit orders
  slippage?: number; // Max acceptable slippage for market orders
  stopLoss?: number;
  takeProfit?: number;
}

export interface TradeHistory {
  trades: Trade[];
  positions: Position[];
  totalPnL: number;
  winRate: number;
  totalTrades: number;
  avgWin: number;
  avgLoss: number;
}

export interface PortfolioSummary {
  totalValue: number;
  cashBalance: number;
  positionsValue: number;
  unrealizedPnL: number;
  realizedPnL: number;
  totalPnL: number;
  pnlPercentage: number;
  activePositions: number;
  todayPnL: number;
}

