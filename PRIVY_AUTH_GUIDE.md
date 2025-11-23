# 🔐 Privy Authentication Guide

PredictPark uses [Privy](https://docs.privy.io) for secure, user-friendly authentication with built-in wallet support.

## 📚 Official Documentation

- **Privy Docs**: https://docs.privy.io/recipes/overview
- **Dashboard**: https://dashboard.privy.io

## 🚀 Features

- ✅ Email/Social login (Google, Twitter, Discord)
- ✅ Wallet connection (MetaMask, WalletConnect, etc.)
- ✅ Embedded wallets (auto-created for users without wallets)
- ✅ Multi-chain support (Ethereum, Polygon, Base, Arbitrum)
- ✅ Session management
- ✅ Protected routes

## 🔧 Setup Instructions

### 1. Get Your Privy App ID

1. Go to [dashboard.privy.io](https://dashboard.privy.io)
2. Sign up or log in
3. Click **"Create New App"**
4. Copy your **App ID**

### 2. Add to Environment Variables

Create `.env.local` in the root directory:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_app_id_here
```

**⚠️ Important**: The file `.env.local` is already in `.gitignore` and will NOT be committed to Git.

### 3. Install Dependencies

```bash
yarn install
```

This will install:
- `@privy-io/react-auth` - Client-side authentication
- `@privy-io/server-auth` - Server-side verification

### 4. Start the App

```bash
yarn dev
```

Visit `http://localhost:3000` and click **"Sign In"**!

## 📁 File Structure

### Core Authentication Files

```
lib/providers/
└── privy-provider.tsx       # Privy configuration wrapper

components/auth/
├── auth-button.tsx          # Login/Logout button component
└── protected-route.tsx      # Route protection wrapper

app/
├── layout.tsx               # Root layout with Privy provider
├── page.tsx                 # Home page with auth
└── dummy/
    └── page.tsx            # Protected trading page
```

## 🎨 Components

### 1. AuthButton Component

Shows login/logout based on authentication state.

```tsx
import { AuthButton } from '@/components/auth/auth-button';

<AuthButton />
```

**Features**:
- Loading state while Privy initializes
- Shows user email/wallet when authenticated
- Logout button for authenticated users
- Beautiful gradient sign-in button

### 2. ProtectedRoute Component

Wraps pages that require authentication.

```tsx
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content requires login!</div>
    </ProtectedRoute>
  );
}
```

**Features**:
- Auto-redirect to login if not authenticated
- Custom fallback UI
- Loading states

### 3. PrivyAuthProvider

Global provider that wraps the entire app.

```tsx
// Already set up in app/layout.tsx
<PrivyAuthProvider>
  {children}
</PrivyAuthProvider>
```

## 💻 Usage Examples

### Get User Data

```tsx
'use client';

import { usePrivy } from '@privy-io/react-auth';

export function UserProfile() {
  const { user, authenticated } = usePrivy();

  if (!authenticated) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <p>Email: {user.email?.address}</p>
      <p>Wallet: {user.wallet?.address}</p>
      <p>User ID: {user.id}</p>
    </div>
  );
}
```

### Manual Login/Logout

```tsx
'use client';

import { usePrivy } from '@privy-io/react-auth';

export function MyComponent() {
  const { login, logout, authenticated } = usePrivy();

  return authenticated ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={login}>Login</button>
  );
}
```

### Check Authentication State

```tsx
'use client';

import { usePrivy } from '@privy-io/react-auth';

export function MyPage() {
  const { ready, authenticated, user } = usePrivy();

  if (!ready) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    return <div>Please sign in</div>;
  }

  return <div>Welcome, {user.email?.address}!</div>;
}
```

### Server-Side Authentication

For API routes that need authentication:

```typescript
// app/api/protected/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrivyClient } from '@privy-io/server-auth';

const privy = new PrivyClient(
  process.env.NEXT_PUBLIC_PRIVY_APP_ID!,
  process.env.PRIVY_APP_SECRET! // Add this to .env.local
);

export async function GET(request: NextRequest) {
  const authToken = request.headers.get('authorization')?.replace('Bearer ', '');
  
  if (!authToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await privy.verifyAuthToken(authToken);
    
    // User is authenticated!
    return NextResponse.json({ 
      success: true, 
      userId: user.userId 
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}
```

## ⚙️ Configuration Options

The Privy provider in `lib/providers/privy-provider.tsx` supports many options:

### Login Methods

```typescript
loginMethods: [
  'email',      // Email magic link
  'wallet',     // Connect external wallet
  'google',     // Google OAuth
  'twitter',    // Twitter OAuth
  'discord',    // Discord OAuth
  'github',     // GitHub OAuth
  'apple',      // Apple Sign In
  'sms',        // SMS verification
]
```

### Appearance

```typescript
appearance: {
  theme: 'light' | 'dark',
  accentColor: '#3B82F6',
  logo: 'https://your-logo-url.com/logo.png',
}
```

### Embedded Wallets

```typescript
embeddedWallets: {
  createOnLogin: 'users-without-wallets', // Auto-create for users
  requireUserPasswordOnCreate: false,     // Don't require password
}
```

### Supported Chains

Already configured for:
- Ethereum Mainnet
- Polygon
- Base
- Arbitrum

Add more in `privy-provider.tsx`:

```typescript
supportedChains: [
  { 
    id: 1, 
    name: 'Ethereum', 
    rpcUrls: ['https://eth.llamarpc.com'] 
  },
  // Add more chains...
]
```

## 🔒 Security Best Practices

### 1. Environment Variables

✅ **DO**:
- Store API keys in `.env.local`
- Use `NEXT_PUBLIC_` prefix only for client-side vars
- Never commit `.env.local` to Git

❌ **DON'T**:
- Hardcode API keys in code
- Commit `.env` files
- Share keys in screenshots/chat

### 2. Protected Routes

Always wrap sensitive pages:

```tsx
export default function TradingPage() {
  return (
    <ProtectedRoute>
      {/* Your trading interface */}
    </ProtectedRoute>
  );
}
```

### 3. Server-Side Verification

For API routes, always verify the auth token:

```typescript
const user = await privy.verifyAuthToken(authToken);
```

## 🐛 Troubleshooting

### "NEXT_PUBLIC_PRIVY_APP_ID is required"

**Solution**: 
1. Create `.env.local` in root directory
2. Add: `NEXT_PUBLIC_PRIVY_APP_ID=your_app_id`
3. Restart dev server: `yarn dev`

### Login Modal Not Appearing

**Check**:
1. Privy provider is wrapping your app in `layout.tsx`
2. App ID is valid
3. No console errors
4. Browser cookies are enabled

### "Cross-origin request blocked"

**Solution**: Add your localhost URL to allowed origins in Privy dashboard:
1. Go to dashboard.privy.io
2. Select your app
3. Settings → Allowed origins
4. Add `http://localhost:3000`

### User Data Not Available

**Check**:
1. Component is wrapped in `'use client'`
2. Using `usePrivy()` hook correctly
3. User is actually authenticated
4. Privy is ready: `ready === true`

## 📊 Implementation in PredictPark

### Home Page (`/`)
- Shows AuthButton in header
- Displays "Sign in to start trading" if not authenticated
- Shows "Start Trading" button if authenticated

### Dummy/Trading Page (`/dummy`)
- Protected with `ProtectedRoute`
- Requires authentication to access
- Shows AuthButton in header with user info

### Future: Portfolio Page
```tsx
export default function PortfolioPage() {
  return (
    <ProtectedRoute>
      <YourPortfolioComponent />
    </ProtectedRoute>
  );
}
```

## 🚀 Next Steps

1. ✅ Get Privy App ID from dashboard
2. ✅ Add to `.env.local`
3. ✅ Run `yarn install`
4. ✅ Test authentication flow
5. 🔜 Connect user wallet for trading
6. 🔜 Link user ID to trade history
7. 🔜 Implement server-side auth for API routes

## 📚 Additional Resources

- **Privy Recipes**: https://docs.privy.io/recipes/overview
- **Wallet Integration**: https://docs.privy.io/guide/frontend/wallets/overview
- **Server Auth**: https://docs.privy.io/guide/server/getting-started
- **Trading Apps Guide**: https://docs.privy.io/recipes/trading-apps-homepage

---

**Security Note**: All sensitive data is protected in `.gitignore`. Keep it that way! 🔒

