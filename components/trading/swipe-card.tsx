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
        transition: isDragging ? 'none' : 'all 0.3s ease-out',
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
      <div className="relative w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Swipe Indicators */}
        {showUpIndicator && (
          <div 
            className="absolute top-8 right-8 z-10 bg-green-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg transform rotate-12"
            style={{ opacity: Math.min(position.x / 150, 1) }}
          >
            UP 📈
          </div>
        )}
        
        {showDownIndicator && (
          <div 
            className="absolute top-8 left-8 z-10 bg-red-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg transform -rotate-12"
            style={{ opacity: Math.min(Math.abs(position.x) / 150, 1) }}
          >
            DOWN 📉
          </div>
        )}

        {/* Crypto Icon */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="w-20 h-20 bg-white rounded-full shadow-lg flex items-center justify-center">
            {market.imageUrl ? (
              <Image 
                src={market.imageUrl} 
                alt={market.cryptoAsset || 'Crypto'} 
                width={56}
                height={56}
                className="w-14 h-14"
                unoptimized
              />
            ) : (
              <span className="text-3xl">🪙</span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col h-full pt-32 px-8 pb-8">
          {/* Crypto Asset Badge */}
          <div className="inline-flex items-center gap-2 self-start px-4 py-2 bg-blue-100 rounded-full mb-4">
            <span className="text-sm font-bold text-blue-700">{market.cryptoAsset}</span>
          </div>

          {/* Question */}
          <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
            {market.title}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-base mb-8 line-clamp-3">
            {market.description}
          </p>

          {/* Probability Display */}
          <div className="flex-1 flex items-center justify-center my-8">
            <div className="text-center">
              <div className="text-7xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                {formatProbability(upOutcome.probability)}
              </div>
              <div className="text-lg text-gray-500 font-medium">
                Chance of YES
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 mt-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-4">
              <div className="text-sm text-gray-600 mb-1">YES Price</div>
              <div className="text-2xl font-bold text-green-600">
                ${upOutcome.price.toFixed(2)}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-4">
              <div className="text-sm text-gray-600 mb-1">NO Price</div>
              <div className="text-2xl font-bold text-red-600">
                ${downOutcome.price.toFixed(2)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4">
              <div className="text-sm text-gray-600 mb-1">24h Volume</div>
              <div className="text-xl font-bold text-blue-600">
                {formatCompactCurrency(market.volume24h)}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-4">
              <div className="text-sm text-gray-600 mb-1">Liquidity</div>
              <div className="text-xl font-bold text-purple-600">
                {formatCompactCurrency(market.liquidity)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

