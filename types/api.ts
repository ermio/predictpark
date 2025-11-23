// API-related types

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
  timestamp?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
  statusCode?: number;
}

export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedApiResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
}

// Polymarket-specific API types

export interface PolymarketConfig {
  apiKey: string;
  secretKey: string;
  baseUrl?: string;
}

export interface PolymarketMarketResponse {
  id: string;
  question: string;
  description: string;
  outcomes: string[];
  volume: number;
  liquidity: number;
  active: boolean;
  closed: boolean;
  end_date: string;
  // ... other Polymarket-specific fields
}

export interface PolymarketOrderRequest {
  market_id: string;
  outcome_id: string;
  side: 'buy' | 'sell';
  type: 'market' | 'limit';
  size: number;
  price?: number;
}

export interface PolymarketOrderResponse {
  order_id: string;
  status: 'pending' | 'filled' | 'cancelled';
  filled_size: number;
  average_price: number;
  timestamp: string;
}

// WebSocket message types

export interface WebSocketEvent<T = unknown> {
  type: 'subscribe' | 'unsubscribe' | 'update' | 'error' | 'ping' | 'pong';
  channel?: string;
  data?: T;
  timestamp: number;
  id?: string;
}

export interface MarketUpdateEvent {
  marketId: string;
  outcomeId: string;
  price: number;
  probability: number;
  volume24h: number;
  lastTrade: {
    price: number;
    size: number;
    timestamp: number;
  };
}

export interface OrderBookUpdateEvent {
  marketId: string;
  outcomeId: string;
  bids: Array<{ price: number; size: number }>;
  asks: Array<{ price: number; size: number }>;
  timestamp: number;
}

