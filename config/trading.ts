export const tradingConfig = {
  // Position sizing
  maxPositionSize: Number(process.env.NEXT_PUBLIC_MAX_POSITION_SIZE) || 1000,
  minPositionSize: 1,
  defaultPositionSize: 100,
  
  // Risk management
  maxAccountRisk: 0.25, // Max 25% of account in positions
  maxPositionRisk: 0.05, // Max 5% risk per position
  defaultStopLoss: 0.15, // 15% stop loss
  defaultTakeProfit: 0.30, // 30% take profit
  
  // Slippage
  defaultSlippage: Number(process.env.NEXT_PUBLIC_DEFAULT_SLIPPAGE) || 0.01, // 1%
  maxSlippage: 0.05, // 5%
  
  // Market filters
  minMarketVolume: 1000, // Minimum 24h volume in USD
  minLiquidity: 500, // Minimum liquidity in USD
  
  // Order parameters
  orderTypes: ["market", "limit"] as const,
  maxOpenOrders: 20,
  orderExpiryHours: 24,
  
  // WebSocket
  reconnectAttempts: 5,
  reconnectDelay: 3000, // 3 seconds
  heartbeatInterval: 30000, // 30 seconds
  
  // Refresh intervals (in milliseconds)
  marketDataRefresh: 10000, // 10 seconds
  positionRefresh: 5000, // 5 seconds
  portfolioRefresh: 15000, // 15 seconds
  
  // Trading hours (24/7 for crypto)
  tradingEnabled: true,
  
  // Market categories to focus on
  cryptoAssets: [
    "BTC",
    "ETH",
    "SOL",
    "MATIC",
    "AVAX",
    "ARB",
    "OP",
  ] as const,
  
  // Fee estimates
  estimatedTakerFee: 0.002, // 0.2%
  estimatedMakerFee: 0.001, // 0.1%
  estimatedGasFee: 0.5, // $0.50 per trade
  
} as const;

export type TradingConfig = typeof tradingConfig;
export type CryptoAsset = (typeof tradingConfig.cryptoAssets)[number];

