// User-related types

export interface User {
  id: string;
  walletAddress: string;
  username?: string;
  email?: string;
  
  // Trading preferences
  preferences: UserPreferences;
  
  // Account info
  accountBalance: number;
  availableBalance: number;
  lockedBalance: number;
  
  // Statistics
  stats: UserStats;
  
  // Timestamps
  createdAt: string;
  lastLoginAt: string;
}

export interface UserPreferences {
  defaultSlippage: number;
  defaultPositionSize: number;
  riskLevel: 'conservative' | 'moderate' | 'aggressive';
  notifications: NotificationPreferences;
  theme: 'light' | 'dark' | 'auto';
  currency: 'USD' | 'EUR' | 'GBP';
}

export interface NotificationPreferences {
  email: boolean;
  push: boolean;
  orderFilled: boolean;
  priceAlerts: boolean;
  positionUpdates: boolean;
  marketResolved: boolean;
}

export interface UserStats {
  totalTrades: number;
  totalVolume: number;
  winRate: number;
  averageWin: number;
  averageLoss: number;
  totalPnL: number;
  bestTrade: number;
  worstTrade: number;
  currentStreak: number; // Positive for wins, negative for losses
  longestWinStreak: number;
  longestLossStreak: number;
}

export interface WalletConnection {
  address: string;
  isConnected: boolean;
  chainId: number;
  provider?: string; // e.g., 'metamask', 'walletconnect'
}

