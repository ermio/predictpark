// Central type exports for the application

export * from './market';
export * from './trade';
export * from './user';
export * from './api';

// Common utility types
export type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

export type AsyncResult<T, E = Error> = Promise<Result<T, E>>;

export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
};

export type WebSocketMessage<T = unknown> = {
  type: 'subscribe' | 'unsubscribe' | 'update' | 'error';
  channel: string;
  data?: T;
  timestamp: number;
};

