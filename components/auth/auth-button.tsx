'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';

export function AuthButton() {
  const { ready, authenticated, user, login, logout } = usePrivy();
  const router = useRouter();

  // Show loading state while Privy initializes
  if (!ready) {
    return (
      <button 
        disabled 
        className="px-6 py-3 bg-gray-300 text-gray-500 rounded-full font-semibold cursor-not-allowed"
      >
        Loading...
      </button>
    );
  }

  // User is authenticated - show profile/logout
  if (authenticated && user) {
    return (
      <div className="flex items-center gap-3">
        {/* User info */}
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-sm font-medium text-gray-900">
            {user.email?.address || user.wallet?.address.slice(0, 6) + '...' + user.wallet?.address.slice(-4)}
          </span>
          <span className="text-xs text-gray-500">
            {user.wallet?.address ? '🔗 Wallet Connected' : '📧 Email Login'}
          </span>
        </div>

        {/* Logout button */}
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full font-medium transition-all"
        >
          Logout
        </button>
      </div>
    );
  }

  // User is not authenticated - show login button
  return (
    <button
      onClick={login}
      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
    >
      Sign In
    </button>
  );
}

