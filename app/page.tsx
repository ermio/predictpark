'use client';

import Link from 'next/link';
import { AuthButton } from '@/components/auth/auth-button';
import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
  const { authenticated } = usePrivy();

  return (
    <main className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Header with Auth */}
      <header className="px-6 py-6 flex items-center justify-between backdrop-blur-sm bg-white/50 border-b border-gray-100">
        <h2 className="text-2xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
          PredictPark
        </h2>
        <AuthButton />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-6 relative">
            {/* Decorative elements */}
            <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl -z-10"></div>
            
            <div className="text-7xl mb-4">🎯</div>
            <h1 className="text-6xl sm:text-7xl font-black bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
              PredictPark
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 font-medium">
              Swipe to trade crypto predictions
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                Live Markets
              </span>
              <span>•</span>
              <span>Secure Trading</span>
            </div>
          </div>

          <div className="space-y-6 pt-8">
            {authenticated ? (
              <Link
                href="/dummy"
                className="group block w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200 relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                <span className="relative flex items-center justify-center gap-2">
                  Start Trading
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 font-medium">Sign in to start trading</p>
                <div className="flex justify-center">
                  <AuthButton />
                </div>
              </div>
            )}

            <div className="pt-6 space-y-3">
              <p className="text-sm font-semibold text-gray-700 mb-3">How it works:</p>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 p-4 rounded-xl border border-red-100">
                  <div className="text-3xl mb-2">👈</div>
                  <div className="font-bold text-red-600 mb-1">Swipe Left</div>
                  <div className="text-gray-600 text-xs">Bet on DOWN</div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-xl border border-green-100">
                  <div className="text-3xl mb-2">👉</div>
                  <div className="font-bold text-green-600 mb-1">Swipe Right</div>
                  <div className="text-gray-600 text-xs">Bet on UP</div>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-8 space-y-3">
            <div className="flex items-center justify-center gap-4 text-xs text-gray-400">
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Powered by Polymarket</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>Secured by Privy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

