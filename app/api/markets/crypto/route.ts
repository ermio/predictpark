import { NextRequest, NextResponse } from 'next/server';
import { Market, MarketFilters } from '@/types';

/**
 * GET /api/markets/crypto
 * 
 * Fetches crypto-related prediction markets from Polymarket
 * Filters for up/down binary markets only
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Parse query parameters
    const filters: MarketFilters = {
      cryptoAsset: searchParams.get('asset')?.split(',') || undefined,
      minVolume: Number(searchParams.get('minVolume')) || 1000,
      minLiquidity: Number(searchParams.get('minLiquidity')) || 500,
      search: searchParams.get('search') || undefined,
      status: ['active'] as const,
      type: ['crypto'] as const,
    };

    // TODO: Implement actual Polymarket API call
    // const markets = await fetchCryptoMarkets(filters);
    
    // Mock data for now
    const mockMarkets: Market[] = [
      {
        id: '1',
        slug: 'btc-above-50k',
        title: 'Will Bitcoin be above $50,000 on Dec 31?',
        description: 'Resolves to YES if BTC price is above $50,000 at 23:59 UTC on December 31, 2024',
        type: 'crypto',
        status: 'active',
        outcomes: [
          {
            id: '1-yes',
            name: 'Yes',
            type: 'up',
            probability: 0.65,
            price: 0.65,
            volume24h: 12500,
            lastTradePrice: 0.65,
            bestBid: 0.64,
            bestAsk: 0.66,
          },
          {
            id: '1-no',
            name: 'No',
            type: 'down',
            probability: 0.35,
            price: 0.35,
            volume24h: 8500,
            lastTradePrice: 0.35,
            bestBid: 0.34,
            bestAsk: 0.36,
          },
        ],
        volume24h: 21000,
        volumeTotal: 156000,
        liquidity: 45000,
        createdAt: '2024-01-15T10:00:00Z',
        closesAt: '2024-12-31T23:59:00Z',
        tags: ['crypto', 'bitcoin', 'price'],
        cryptoAsset: 'BTC',
        imageUrl: 'https://assets.polymarket.com/btc-icon.png',
      },
      {
        id: '2',
        slug: 'eth-above-3k',
        title: 'Will Ethereum be above $3,000 on Dec 31?',
        description: 'Resolves to YES if ETH price is above $3,000 at 23:59 UTC on December 31, 2024',
        type: 'crypto',
        status: 'active',
        outcomes: [
          {
            id: '2-yes',
            name: 'Yes',
            type: 'up',
            probability: 0.58,
            price: 0.58,
            volume24h: 9800,
            lastTradePrice: 0.58,
            bestBid: 0.57,
            bestAsk: 0.59,
          },
          {
            id: '2-no',
            name: 'No',
            type: 'down',
            probability: 0.42,
            price: 0.42,
            volume24h: 7200,
            lastTradePrice: 0.42,
            bestBid: 0.41,
            bestAsk: 0.43,
          },
        ],
        volume24h: 17000,
        volumeTotal: 98000,
        liquidity: 32000,
        createdAt: '2024-01-20T14:00:00Z',
        closesAt: '2024-12-31T23:59:00Z',
        tags: ['crypto', 'ethereum', 'price'],
        cryptoAsset: 'ETH',
        imageUrl: 'https://assets.polymarket.com/eth-icon.png',
      },
    ];

    // Filter markets based on search params
    let filteredMarkets = mockMarkets;
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredMarkets = filteredMarkets.filter(m => 
        m.title.toLowerCase().includes(searchLower) ||
        m.description.toLowerCase().includes(searchLower) ||
        m.cryptoAsset?.toLowerCase().includes(searchLower)
      );
    }

    if (filters.cryptoAsset && filters.cryptoAsset.length > 0) {
      filteredMarkets = filteredMarkets.filter(m => 
        filters.cryptoAsset?.includes(m.cryptoAsset || '')
      );
    }

    if (filters.minVolume) {
      filteredMarkets = filteredMarkets.filter(m => 
        m.volume24h >= (filters.minVolume || 0)
      );
    }

    return NextResponse.json({
      success: true,
      data: filteredMarkets,
      total: filteredMarkets.length,
      filters,
    });

  } catch (error) {
    console.error('Error fetching crypto markets:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch markets',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

