'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export function PrivyAuthProvider({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    console.error('NEXT_PUBLIC_PRIVY_APP_ID is required. Please add it to your .env.local file.');
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Configuration Error</h2>
          <p className="text-gray-700 mb-4">
            Missing <code className="bg-gray-100 px-2 py-1 rounded">NEXT_PUBLIC_PRIVY_APP_ID</code>
          </p>
          <p className="text-sm text-gray-600">
            Please add your Privy App ID to <code className="bg-gray-100 px-1 rounded">.env.local</code>
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Get your App ID from:{' '}
            <a 
              href="https://dashboard.privy.io" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              dashboard.privy.io
            </a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        // Appearance
        appearance: {
          theme: 'light',
          accentColor: '#3B82F6',
          logo: 'https://your-logo-url.com/logo.png', // Optional: Add your logo
        },
        
        // Login methods - configure what you want to support
        loginMethods: ['email', 'wallet', 'google', 'twitter', 'discord'],
        
        // Embedded wallet configuration
        embeddedWallets: {
          createOnLogin: 'users-without-wallets', // Auto-create wallet for users
          requireUserPasswordOnCreate: false,
        },
        
        // Supported chains for wallet interactions
        supportedChains: [
          // Ethereum Mainnet
          { id: 1, name: 'Ethereum', network: 'mainnet', rpcUrls: ['https://eth.llamarpc.com'] },
          // Polygon
          { id: 137, name: 'Polygon', network: 'mainnet', rpcUrls: ['https://polygon-rpc.com'] },
          // Base
          { id: 8453, name: 'Base', network: 'mainnet', rpcUrls: ['https://mainnet.base.org'] },
          // Arbitrum
          { id: 42161, name: 'Arbitrum', network: 'mainnet', rpcUrls: ['https://arb1.arbitrum.io/rpc'] },
        ],
        
        // Legal and compliance
        legal: {
          termsAndConditionsUrl: 'https://your-site.com/terms',
          privacyPolicyUrl: 'https://your-site.com/privacy',
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

