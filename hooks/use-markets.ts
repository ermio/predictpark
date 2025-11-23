'use client';

import { useQuery } from '@tanstack/react-query';
import { Market, MarketFilters } from '@/types';

interface UseMarketsOptions {
  filters?: MarketFilters;
  enabled?: boolean;
  refetchInterval?: number;
}

interface MarketsResponse {
  success: boolean;
  data: Market[];
  total: number;
  filters: MarketFilters;
}

/**
 * Custom hook for fetching crypto prediction markets
 * 
 * @example
 * ```tsx
 * function MarketsList() {
 *   const { markets, isLoading, error } = useMarkets({
 *     filters: { cryptoAsset: ['BTC', 'ETH'] }
 *   });
 * 
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *   
 *   return markets.map(market => <MarketCard key={market.id} market={market} />);
 * }
 * ```
 */
export function useMarkets(options: UseMarketsOptions = {}) {
  const { filters, enabled = true, refetchInterval = 10000 } = options;

  const query = useQuery<MarketsResponse, Error>({
    queryKey: ['markets', 'crypto', filters],
    queryFn: async () => {
      const params = new URLSearchParams();
      
      if (filters?.cryptoAsset) {
        params.set('asset', filters.cryptoAsset.join(','));
      }
      if (filters?.minVolume) {
        params.set('minVolume', filters.minVolume.toString());
      }
      if (filters?.minLiquidity) {
        params.set('minLiquidity', filters.minLiquidity.toString());
      }
      if (filters?.search) {
        params.set('search', filters.search);
      }

      const url = `/api/markets/crypto${params.toString() ? `?${params}` : ''}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Failed to fetch markets');
      }

      return response.json();
    },
    enabled,
    refetchInterval, // Auto-refresh every 10 seconds
    staleTime: 5000, // Data considered stale after 5 seconds
  });

  return {
    markets: query.data?.data || [],
    total: query.data?.total || 0,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}

/**
 * Hook for fetching a single market by ID
 */
export function useMarket(marketId: string | undefined) {
  const { markets, ...rest } = useMarkets({
    enabled: !!marketId,
  });

  const market = markets.find(m => m.id === marketId);

  return {
    market,
    ...rest,
  };
}

