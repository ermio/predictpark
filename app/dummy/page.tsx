'use client';

import { useState } from 'react';
import SwipeCard from '@/components/trading/swipe-card';
import SwipeOverlay from '@/components/trading/swipe-overlay';
import { ProtectedRoute } from '@/components/auth/protected-route';
import { AuthButton } from '@/components/auth/auth-button';
import { Market } from '@/types';

// Dummy market data
const DUMMY_MARKETS: Market[] = [
  {
    id: '1',
    slug: 'btc-50k-dec',
    title: 'Will Bitcoin hit $50,000?',
    description: 'Bitcoin (BTC) will trade above $50,000 by December 31, 2024 at 11:59 PM ET',
    type: 'crypto',
    status: 'active',
    outcomes: [
      {
        id: '1-up',
        name: 'Yes',
        type: 'up',
        probability: 0.68,
        price: 0.68,
        volume24h: 125000,
        lastTradePrice: 0.68,
        bestBid: 0.67,
        bestAsk: 0.69,
      },
      {
        id: '1-down',
        name: 'No',
        type: 'down',
        probability: 0.32,
        price: 0.32,
        volume24h: 85000,
        lastTradePrice: 0.32,
        bestBid: 0.31,
        bestAsk: 0.33,
      },
    ],
    volume24h: 210000,
    volumeTotal: 1560000,
    liquidity: 450000,
    createdAt: '2024-01-15T10:00:00Z',
    closesAt: '2024-12-31T23:59:00Z',
    tags: ['crypto', 'bitcoin', 'price'],
    cryptoAsset: 'BTC',
    imageUrl: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  },
  {
    id: '2',
    slug: 'eth-4k-dec',
    title: 'Will Ethereum reach $4,000?',
    description: 'Ethereum (ETH) will trade above $4,000 by December 31, 2024 at 11:59 PM ET',
    type: 'crypto',
    status: 'active',
    outcomes: [
      {
        id: '2-up',
        name: 'Yes',
        type: 'up',
        probability: 0.55,
        price: 0.55,
        volume24h: 98000,
        lastTradePrice: 0.55,
        bestBid: 0.54,
        bestAsk: 0.56,
      },
      {
        id: '2-down',
        name: 'No',
        type: 'down',
        probability: 0.45,
        price: 0.45,
        volume24h: 72000,
        lastTradePrice: 0.45,
        bestBid: 0.44,
        bestAsk: 0.46,
      },
    ],
    volume24h: 170000,
    volumeTotal: 980000,
    liquidity: 320000,
    createdAt: '2024-01-20T14:00:00Z',
    closesAt: '2024-12-31T23:59:00Z',
    tags: ['crypto', 'ethereum', 'price'],
    cryptoAsset: 'ETH',
    imageUrl: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
  },
  {
    id: '3',
    slug: 'sol-100-dec',
    title: 'Will Solana hit $100?',
    description: 'Solana (SOL) will trade above $100 by December 31, 2024 at 11:59 PM ET',
    type: 'crypto',
    status: 'active',
    outcomes: [
      {
        id: '3-up',
        name: 'Yes',
        type: 'up',
        probability: 0.72,
        price: 0.72,
        volume24h: 156000,
        lastTradePrice: 0.72,
        bestBid: 0.71,
        bestAsk: 0.73,
      },
      {
        id: '3-down',
        name: 'No',
        type: 'down',
        probability: 0.28,
        price: 0.28,
        volume24h: 94000,
        lastTradePrice: 0.28,
        bestBid: 0.27,
        bestAsk: 0.29,
      },
    ],
    volume24h: 250000,
    volumeTotal: 1820000,
    liquidity: 580000,
    createdAt: '2024-02-01T09:00:00Z',
    closesAt: '2024-12-31T23:59:00Z',
    tags: ['crypto', 'solana', 'price'],
    cryptoAsset: 'SOL',
    imageUrl: 'https://cryptologos.cc/logos/solana-sol-logo.png',
  },
  {
    id: '4',
    slug: 'matic-1-dec',
    title: 'Will Polygon reach $1?',
    description: 'Polygon (MATIC) will trade above $1 by December 31, 2024 at 11:59 PM ET',
    type: 'crypto',
    status: 'active',
    outcomes: [
      {
        id: '4-up',
        name: 'Yes',
        type: 'up',
        probability: 0.48,
        price: 0.48,
        volume24h: 67000,
        lastTradePrice: 0.48,
        bestBid: 0.47,
        bestAsk: 0.49,
      },
      {
        id: '4-down',
        name: 'No',
        type: 'down',
        probability: 0.52,
        price: 0.52,
        volume24h: 71000,
        lastTradePrice: 0.52,
        bestBid: 0.51,
        bestAsk: 0.53,
      },
    ],
    volume24h: 138000,
    volumeTotal: 645000,
    liquidity: 210000,
    createdAt: '2024-02-05T11:00:00Z',
    closesAt: '2024-12-31T23:59:00Z',
    tags: ['crypto', 'polygon', 'price'],
    cryptoAsset: 'MATIC',
    imageUrl: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
  },
  {
    id: '5',
    slug: 'avax-50-dec',
    title: 'Will Avalanche hit $50?',
    description: 'Avalanche (AVAX) will trade above $50 by December 31, 2024 at 11:59 PM ET',
    type: 'crypto',
    status: 'active',
    outcomes: [
      {
        id: '5-up',
        name: 'Yes',
        type: 'up',
        probability: 0.61,
        price: 0.61,
        volume24h: 89000,
        lastTradePrice: 0.61,
        bestBid: 0.60,
        bestAsk: 0.62,
      },
      {
        id: '5-down',
        name: 'No',
        type: 'down',
        probability: 0.39,
        price: 0.39,
        volume24h: 58000,
        lastTradePrice: 0.39,
        bestBid: 0.38,
        bestAsk: 0.40,
      },
    ],
    volume24h: 147000,
    volumeTotal: 782000,
    liquidity: 298000,
    createdAt: '2024-02-10T13:00:00Z',
    closesAt: '2024-12-31T23:59:00Z',
    tags: ['crypto', 'avalanche', 'price'],
    cryptoAsset: 'AVAX',
    imageUrl: 'https://cryptologos.cc/logos/avalanche-avax-logo.png',
  },
];

function DummyPageContent() {
  const [markets, setMarkets] = useState(DUMMY_MARKETS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  const currentMarket = markets[currentIndex];

  const handleSwipe = (direction: 'left' | 'right') => {
    setSwipeDirection(direction);
    
    // Wait for animation to complete
    setTimeout(() => {
      setCurrentIndex((prev) => prev + 1);
      setSwipeDirection(null);
    }, 400);
  };

  const handleUndo = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (currentIndex >= markets.length) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="text-center space-y-4">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800">All Done!</h2>
          <p className="text-gray-600">You've reviewed all available markets</p>
          <button
            onClick={() => setCurrentIndex(0)}
            className="mt-6 px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Start Over
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="safe-area-top px-6 py-5 flex items-center justify-between backdrop-blur-md bg-white/80 border-b border-gray-100 sticky top-0 z-50">
        <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          PredictPark
        </h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
            <span className="font-bold text-blue-600">{currentIndex + 1}</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 font-medium">{markets.length}</span>
          </div>
          <div className="hidden sm:block">
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Main Card Area */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 pb-32 relative">
        <SwipeOverlay />
        
        {/* Card Stack - show current and next card */}
        <div className="relative w-full max-w-md h-[600px]">
          {/* Next card (background) */}
          {currentIndex + 1 < markets.length && (
            <div className="absolute inset-0 transform scale-95 opacity-50">
              <SwipeCard 
                market={markets[currentIndex + 1]} 
                onSwipe={() => {}}
              />
            </div>
          )}
          
          {/* Current card */}
          <div className="absolute inset-0">
            <SwipeCard 
              market={currentMarket} 
              onSwipe={handleSwipe}
              swipeDirection={swipeDirection}
            />
          </div>
        </div>

        {/* Swipe Instructions */}
        <div className="mt-8 flex items-center justify-center gap-6">
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-2xl border border-red-100 shadow-sm">
            <span className="text-3xl">👈</span>
            <div className="text-left">
              <div className="text-xs text-gray-500 font-medium">Swipe Left</div>
              <div className="font-bold text-red-600">DOWN</div>
            </div>
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gray-300 to-transparent" />
          <div className="flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-sm">
            <div className="text-right">
              <div className="text-xs text-gray-500 font-medium">Swipe Right</div>
              <div className="font-bold text-green-600">UP</div>
            </div>
            <span className="text-3xl">👉</span>
          </div>
        </div>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 safe-area-bottom bg-white/90 backdrop-blur-xl border-t border-gray-200 px-6 py-6 shadow-2xl">
        <div className="max-w-md mx-auto flex items-center justify-center gap-4">
          {/* Undo Button */}
          <button
            onClick={handleUndo}
            disabled={currentIndex === 0}
            className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 border border-gray-300"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
            </svg>
          </button>

          {/* Down Button */}
          <button
            onClick={() => handleSwipe('left')}
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-500 via-red-600 to-pink-500 text-white flex items-center justify-center shadow-2xl hover:shadow-red-500/50 transform hover:scale-110 transition-all active:scale-95 ring-4 ring-red-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
            <svg className="w-10 h-10 relative z-10 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Up Button */}
          <button
            onClick={() => handleSwipe('right')}
            className="relative w-20 h-20 rounded-full bg-gradient-to-br from-green-500 via-green-600 to-emerald-500 text-white flex items-center justify-center shadow-2xl hover:shadow-green-500/50 transform hover:scale-110 transition-all active:scale-95 ring-4 ring-green-100"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full"></div>
            <svg className="w-10 h-10 relative z-10 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </button>

          {/* Info Button */}
          <button
            className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center shadow-lg hover:shadow-xl transition-all active:scale-95 border border-gray-300"
          >
            <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DummyPage() {
  return (
    <ProtectedRoute>
      <DummyPageContent />
    </ProtectedRoute>
  );
}

