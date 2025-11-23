// Market-related types

export type MarketType = 'crypto' | 'binary';
export type MarketStatus = 'active' | 'closed' | 'resolved' | 'paused';
export type OutcomeType = 'up' | 'down' | 'yes' | 'no';

export interface Market {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: MarketType;
  status: MarketStatus;
  
  // Outcomes (for binary markets)
  outcomes: Outcome[];
  
  // Trading data
  volume24h: number;
  volumeTotal: number;
  liquidity: number;
  
  // Timestamps
  createdAt: string;
  closesAt: string;
  resolvedAt?: string;
  
  // Metadata
  tags: string[];
  cryptoAsset?: string; // e.g., "BTC", "ETH"
  imageUrl?: string;
}

export interface Outcome {
  id: string;
  name: string;
  type: OutcomeType;
  probability: number; // 0-1
  price: number; // Current market price
  volume24h: number;
  lastTradePrice: number;
  bestBid?: number;
  bestAsk?: number;
}

export interface MarketFilters {
  status?: MarketStatus[];
  type?: MarketType[];
  cryptoAsset?: string[];
  minVolume?: number;
  minLiquidity?: number;
  search?: string;
  tags?: string[];
}

export interface MarketOrderBook {
  marketId: string;
  outcomeId: string;
  bids: OrderBookLevel[];
  asks: OrderBookLevel[];
  spread: number;
  timestamp: number;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number; // Cumulative size
}

