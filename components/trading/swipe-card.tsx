'use client';

import { useState, useRef, useEffect } from 'react';
import { Market } from '@/types';
import { formatCompactCurrency, formatProbability } from '@/lib/utils/formatters';
import Image from 'next/image';

interface SwipeCardProps {
  market: Market;
  onSwipe: (direction: 'left' | 'right') => void;
  swipeDirection?: 'left' | 'right' | null;
}

export default function SwipeCard({ market, onSwipe, swipeDirection }: SwipeCardProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const upOutcome = market.outcomes.find(o => o.type === 'up') || market.outcomes[0];
  const downOutcome = market.outcomes.find(o => o.type === 'down') || market.outcomes[1];

  useEffect(() => {
    if (swipeDirection) {
      setPosition({ x: 0, y: 0 });
      setIsDragging(false);
    }
  }, [swipeDirection]);

  const handleStart = (clientX: number, clientY: number) => {
    setIsDragging(true);
    setStartPos({ x: clientX, y: clientY });
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging) return;

    const deltaX = clientX - startPos.x;
    const deltaY = clientY - startPos.y;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);

    // Threshold for swipe (150px)
    if (Math.abs(position.x) > 150) {
      onSwipe(position.x > 0 ? 'right' : 'left');
    } else {
      // Snap back
      setPosition({ x: 0, y: 0 });
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    handleMove(touch.clientX, touch.clientY);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX, e.clientY);
  };

  const rotation = position.x / 15;
  const opacity = 1 - Math.abs(position.x) / 300;
  const scale = isDragging ? 1.05 : 1;

  const showUpIndicator = position.x > 50;
  const showDownIndicator = position.x < -50;

  return (
    <div
      ref={cardRef}
      className={`
        w-full h-full touch-feedback no-select
        ${swipeDirection === 'left' ? 'swipe-left' : ''}
        ${swipeDirection === 'right' ? 'swipe-right' : ''}
      `}
      style={{
        transform: `translateX(${position.x}px) translateY(${position.y}px) rotate(${rotation}deg) scale(${scale})`,
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={isDragging ? handleMouseMove : undefined}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
    >
      <div className="relative w-full h-full bg-gradient-to-br from-white via-white to-gray-50 rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Swipe Indicators */}
        {showUpIndicator && (
          <div 
            className="absolute top-6 right-6 z-10 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl transform rotate-12 border-4 border-white"
            style={{ opacity: Math.min(position.x / 150, 1) }}
          >
            <span className="drop-shadow-lg">UP 📈</span>
          </div>
        )}
        
        {showDownIndicator && (
          <div 
            className="absolute top-6 left-6 z-10 bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-2xl shadow-2xl transform -rotate-12 border-4 border-white"
            style={{ opacity: Math.min(Math.abs(position.x) / 150, 1) }}
          >
            <span className="drop-shadow-lg">DOWN 📉</span>
          </div>
        )}

        {/* Crypto Icon */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-24 h-24 bg-gradient-to-br from-white to-gray-50 rounded-full shadow-xl flex items-center justify-center border-4 border-white ring-2 ring-gray-100">
            {market.imageUrl ? (
              <Image 
                src={market.imageUrl} 
                alt={market.cryptoAsset || 'Crypto'} 
                width={64}
                height={64}
                className="w-16 h-16"
                unoptimized
              />
            ) : (
              <span className="text-4xl">🪙</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full pt-36 px-8 pb-8">
          {/* Crypto Asset Badge */}
          <div className="inline-flex items-center gap-2 self-start px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-lg">
            <span className="text-sm font-bold text-white tracking-wide">{market.cryptoAsset}</span>
          </div>

          {/* Question */}
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4 leading-tight">
            {market.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base mb-6 line-clamp-2 leading-relaxed">
            {market.description}
          </p>

          {/* Probability Display */}
          <div className="flex-1 flex items-center justify-center my-6">
            <div className="text-center relative">
              {/* Decorative circles */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-2xl"></div>
              </div>
              
              <div className="text-8xl font-black bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 tracking-tight drop-shadow-sm">
                {formatProbability(upOutcome.probability)}
              </div>
              <div className="text-base text-gray-500 font-semibold uppercase tracking-wider">
                Probability
              </div>
              <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-xs font-medium text-gray-600">Live</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-emerald-50 to-green-50 rounded-2xl p-4 border border-green-100 shadow-sm">
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-500/5 rounded-full -mr-10 -mt-10"></div>
              <div className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">YES Price</div>
              <div className="text-2xl font-black text-green-600">
                ${upOutcome.price.toFixed(2)}
              </div>
            </div>
            
            <div className="relative overflow-hidden bg-gradient-to-br from-red-50 via-pink-50 to-red-50 rounded-2xl p-4 border border-red-100 shadow-sm">
              <div className="absolute top-0 right-0 w-20 h-20 bg-red-500/5 rounded-full -mr-10 -mt-10"></div>
              <div className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">NO Price</div>
              <div className="text-2xl font-black text-red-600">
                ${downOutcome.price.toFixed(2)}
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-50 rounded-2xl p-4 border border-blue-100 shadow-sm">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 rounded-full -mr-10 -mt-10"></div>
              <div className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">24h Volume</div>
              <div className="text-xl font-black text-blue-600">
                {formatCompactCurrency(market.volume24h)}
              </div>
            </div>

            <div className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-violet-50 to-purple-50 rounded-2xl p-4 border border-purple-100 shadow-sm">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 rounded-full -mr-10 -mt-10"></div>
              <div className="text-xs text-gray-500 mb-1.5 font-medium uppercase tracking-wide">Liquidity</div>
              <div className="text-xl font-black text-purple-600">
                {formatCompactCurrency(market.liquidity)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

