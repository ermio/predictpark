'use client';

import { usePrivy } from '@privy-io/react-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * Wrapper component to protect routes that require authentication
 * Usage: Wrap any page content that requires login
 */
export function ProtectedRoute({ children, fallback }: ProtectedRouteProps) {
  const { ready, authenticated, login } = usePrivy();
  const router = useRouter();

  useEffect(() => {
    // If Privy is ready and user is not authenticated, redirect to login
    if (ready && !authenticated) {
      // Optionally auto-trigger login modal
      // login();
    }
  }, [ready, authenticated]);

  // Show loading state while checking auth
  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // User is not authenticated
  if (!authenticated) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-3xl font-bold text-gray-900">Authentication Required</h2>
          <p className="text-gray-600">
            Please sign in to access this page and start trading.
          </p>
          <button
            onClick={login}
            className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            Sign In to Continue
          </button>
          <button
            onClick={() => router.push('/')}
            className="w-full px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl font-medium transition-all"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  // User is authenticated - show protected content
  return <>{children}</>;
}

