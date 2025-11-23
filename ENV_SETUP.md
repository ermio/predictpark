# 🔐 Environment Variables Setup

## ⚠️ SECURITY WARNING

**NEVER commit `.env.local` or any file containing real API keys to Git!**

All sensitive data is protected in `.gitignore`. Keep it that way.

## Required Environment Variables

Create a file named `.env.local` in the root directory with these variables:

```bash
# Privy Authentication (https://docs.privy.io)
# Get your keys from: https://dashboard.privy.io
NEXT_PUBLIC_PRIVY_APP_ID=cmibn1om901nlkw0cenuwvtyn

# Polymarket API Configuration
POLYMARKET_API_KEY=your_polymarket_api_key_here
POLYMARKET_SECRET_KEY=your_polymarket_secret_key_here
POLYMARKET_API_URL=https://api.polymarket.com/v1

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_WS_URL=wss://api.polymarket.com/ws

# Trading Configuration
NEXT_PUBLIC_MAX_POSITION_SIZE=1000
NEXT_PUBLIC_DEFAULT_SLIPPAGE=0.01

# Feature Flags
NEXT_PUBLIC_ENABLE_AUTO_TRADE=false
NEXT_PUBLIC_ENABLE_NOTIFICATIONS=true
```

## Getting Your API Keys

### 1. Privy (Authentication)
1. Go to [Privy Dashboard](https://dashboard.privy.io)
2. Create an account or sign in
3. Create a new app
4. Copy your **App ID**
5. Add it to `NEXT_PUBLIC_PRIVY_APP_ID`

### 2. Polymarket (Trading)
1. Go to [Polymarket](https://polymarket.com)
2. Sign up for API access
3. Generate API credentials
4. Add them to `POLYMARKET_API_KEY` and `POLYMARKET_SECRET_KEY`

## Optional Variables

For production deployments:

```bash
# Database (for trade history)
DATABASE_URL=postgresql://user:password@localhost:5432/predictpark

# Vercel (auto-populated)
VERCEL_URL=
VERCEL_ENV=

# Security (generate strong random strings)
SESSION_SECRET=generate_a_strong_random_string
NEXTAUTH_SECRET=generate_a_strong_random_string
NEXTAUTH_URL=https://your-production-url.com
```

## Quick Setup

```bash
# 1. Copy the template
cat > .env.local << 'EOF'
NEXT_PUBLIC_PRIVY_APP_ID=
POLYMARKET_API_KEY=
POLYMARKET_SECRET_KEY=
POLYMARKET_API_URL=https://api.polymarket.com/v1
NEXT_PUBLIC_APP_URL=http://localhost:3000
EOF

# 2. Edit with your actual values
nano .env.local

# 3. Verify it's ignored by git
git status  # Should NOT show .env.local
```

## Security Checklist

- [ ] `.env.local` is NOT tracked by git
- [ ] Never share API keys in chat, email, or screenshots
- [ ] Use different keys for development and production
- [ ] Rotate keys if they're ever exposed
- [ ] Never commit `.env` files to GitHub
- [ ] Use environment variables in Vercel dashboard for production

## Verifying Setup

```bash
# Check if env vars are loaded
yarn dev

# You should see Privy initialized in the console
# No errors about missing NEXT_PUBLIC_PRIVY_APP_ID
```

## Troubleshooting

### "NEXT_PUBLIC_PRIVY_APP_ID is required"
- Make sure `.env.local` exists in root directory
- Variable name must start with `NEXT_PUBLIC_` for client access
- Restart dev server after adding env vars

### "API Key Invalid"
- Double-check you copied the entire key
- Make sure there are no spaces or quotes
- Verify key is active in the provider dashboard

### Changes not taking effect
```bash
# Restart the dev server
# Stop with Ctrl+C, then:
yarn dev
```

## Production Deployment (Vercel)

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all variables from `.env.local`
4. Deploy!

**Never** add production keys to your code or `.env.local` file in the repo.

