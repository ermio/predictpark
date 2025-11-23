'use client';

import Link from 'next/link';
import { AuthButton } from '@/components/auth/auth-button';
import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
  const { authenticated } = usePrivy();

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header with Auth */}
      <header className="px-6 py-4 flex items-center justify-between">
        <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          PredictPark
        </h2>
        <AuthButton />
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center">
          <div className="space-y-4">
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PredictPark
            </h1>
            <p className="text-xl text-gray-600">
              Swipe to trade crypto predictions
            </p>
          </div>

          <div className="space-y-4 pt-8">
            {authenticated ? (
              <Link
                href="/dummy"
                className="block w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                Start Trading
              </Link>
            ) : (
              <div className="space-y-3">
                <p className="text-gray-500 text-sm">Sign in to start trading</p>
                <div className="flex justify-center">
                  <AuthButton />
                </div>
              </div>
            )}

            <div className="text-sm text-gray-500 pt-4">
              <p>👈 Swipe left for DOWN</p>
              <p>👉 Swipe right for UP</p>
            </div>
          </div>

          <div className="pt-8 space-y-2">
            <p className="text-xs text-gray-400">Powered by Polymarket</p>
            <p className="text-xs text-gray-400">Secured by Privy</p>
          </div>
        </div>
      </div>
    </main>
  );
}

