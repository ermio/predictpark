# 🔒 Security Guidelines for PredictPark

## ⚠️ CRITICAL: Never Commit Sensitive Data

All API keys, secrets, and sensitive data are protected by `.gitignore` and must NEVER be committed to Git.

## Protected Files

The following files are automatically ignored by Git:

```
.env
.env.local
.env*.local
.env.production
**/*.key
**/*.pem
**/*.secret
.secrets/
secrets.json
```

## ✅ Security Checklist

### Before Every Commit

- [ ] No API keys in code
- [ ] No `.env.local` in commit
- [ ] No hardcoded secrets
- [ ] No private keys or credentials
- [ ] Run `git status` to verify

### Environment Variables

#### ✅ DO:
- Store all secrets in `.env.local`
- Use `NEXT_PUBLIC_` prefix only for non-sensitive client variables
- Rotate keys if they're exposed
- Use different keys for dev/production
- Add keys to Vercel dashboard for production

#### ❌ DON'T:
- Commit `.env` files
- Hardcode API keys in code
- Share keys in screenshots/chat
- Use production keys in development
- Push keys to GitHub

## Required Environment Variables

### Public (Client-Side)
These are safe to use in client code with `NEXT_PUBLIC_` prefix:

```bash
NEXT_PUBLIC_PRIVY_APP_ID=          # Privy authentication
NEXT_PUBLIC_APP_URL=               # Your app URL
NEXT_PUBLIC_WS_URL=                # WebSocket URL
NEXT_PUBLIC_MAX_POSITION_SIZE=     # Trading limits
NEXT_PUBLIC_DEFAULT_SLIPPAGE=      # Trading defaults
```

### Private (Server-Side Only)
These must NEVER be exposed to the client:

```bash
POLYMARKET_API_KEY=                # Polymarket API key
POLYMARKET_SECRET_KEY=             # Polymarket secret
DATABASE_URL=                      # Database connection
SESSION_SECRET=                    # Session encryption
```

## Setting Up Environment Variables

### Development (Local)

1. Create `.env.local` in root directory:
```bash
touch .env.local
```

2. Add your keys (see `ENV_SETUP.md` for values):
```bash
NEXT_PUBLIC_PRIVY_APP_ID=your_app_id
POLYMARKET_API_KEY=your_key
# ... other variables
```

3. **Verify it's ignored**:
```bash
git status  # Should NOT show .env.local
```

### Production (Vercel)

1. Go to Vercel project settings
2. Navigate to **Environment Variables**
3. Add each variable individually
4. Select appropriate environment (Production, Preview, Development)
5. **Never** copy `.env.local` to production

## API Key Management

### Getting API Keys

#### Privy (Authentication)
1. Visit [dashboard.privy.io](https://dashboard.privy.io)
2. Create account and app
3. Copy App ID
4. Store in `NEXT_PUBLIC_PRIVY_APP_ID`

#### Polymarket (Trading)
1. Visit [polymarket.com](https://polymarket.com)
2. Request API access
3. Generate credentials
4. Store in `POLYMARKET_API_KEY` and `POLYMARKET_SECRET_KEY`

### Key Rotation

If a key is ever exposed:

1. **Immediately** deactivate the old key in provider dashboard
2. Generate a new key
3. Update `.env.local`
4. Update Vercel environment variables
5. Restart applications
6. Review logs for unauthorized access

## Code Security Best Practices

### 1. Server-Side API Calls

✅ **Good** - API keys on server:
```typescript
// app/api/markets/route.ts
export async function GET() {
  const apiKey = process.env.POLYMARKET_API_KEY; // Server-side only
  const response = await fetch('...', {
    headers: { Authorization: `Bearer ${apiKey}` }
  });
  return Response.json(await response.json());
}
```

❌ **Bad** - API keys on client:
```typescript
// This exposes your key to everyone!
'use client';
const key = process.env.POLYMARKET_API_KEY; // ❌ NEVER DO THIS
```

### 2. Authentication

✅ **Good** - Use Privy for auth:
```typescript
'use client';
import { usePrivy } from '@privy-io/react-auth';

export function MyComponent() {
  const { authenticated, user } = usePrivy();
  // Safe - no secrets exposed
}
```

❌ **Bad** - Manual token management:
```typescript
// Don't implement your own auth without proper security
localStorage.setItem('secret', 'value'); // ❌ Insecure
```

### 3. Protected Routes

Always use the `ProtectedRoute` component:

```typescript
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function TradingPage() {
  return (
    <ProtectedRoute>
      {/* Protected content */}
    </ProtectedRoute>
  );
}
```

### 4. API Routes

Verify authentication on all protected endpoints:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // Verify user is authenticated
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) {
    return NextResponse.json(
      { error: 'Unauthorized' }, 
      { status: 401 }
    );
  }
  
  // Process authenticated request
  // ...
}
```

## Common Security Issues

### Issue 1: API Key in Client Code

**Problem**: Exposing server-side keys to the client
```typescript
'use client';
const key = process.env.POLYMARKET_API_KEY; // ❌ EXPOSED!
```

**Solution**: Move to API route
```typescript
// app/api/markets/route.ts (server-side)
const key = process.env.POLYMARKET_API_KEY; // ✅ Safe
```

### Issue 2: Committing .env.local

**Problem**: Accidentally committing environment files
```bash
git add .env.local  # ❌ NEVER DO THIS
```

**Solution**: Verify `.gitignore` is working
```bash
git status  # Should not show .env.local
cat .gitignore | grep .env  # Verify it's listed
```

### Issue 3: Hardcoded Credentials

**Problem**: Keys in code
```typescript
const API_KEY = 'sk_live_abc123';  // ❌ NEVER DO THIS
```

**Solution**: Use environment variables
```typescript
const API_KEY = process.env.POLYMARKET_API_KEY;  // ✅ Correct
```

### Issue 4: Logging Sensitive Data

**Problem**: Keys in logs
```typescript
console.log('Using key:', process.env.API_KEY);  // ❌ Exposed in logs
```

**Solution**: Never log secrets
```typescript
console.log('API call initiated');  // ✅ Safe
```

## Deployment Security

### Vercel Environment Variables

1. **Production keys** separate from development
2. **Preview deployments** can use test keys
3. **Sensitive variables** not in Preview environment
4. **Rotate keys** after each deployment if compromised

### Security Headers

Already configured in `next.config.js`:
- `X-Frame-Options: DENY` - Prevents clickjacking
- `X-Content-Type-Options: nosniff` - Prevents MIME sniffing
- `X-XSS-Protection` - Enables XSS filtering

## Monitoring & Auditing

### Regular Checks

- [ ] Review API usage in provider dashboards
- [ ] Check for unauthorized access attempts
- [ ] Monitor rate limits
- [ ] Audit user activity
- [ ] Review Vercel logs for errors

### Incident Response

If you suspect a security breach:

1. **Rotate all API keys immediately**
2. **Review access logs** for unauthorized activity
3. **Notify users** if their data was affected
4. **Update security measures** to prevent recurrence
5. **Document the incident** for future reference

## Additional Resources

- [Privy Security Best Practices](https://docs.privy.io)
- [Next.js Security Headers](https://nextjs.org/docs/app/api-reference/next-config-js/headers)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)

## Questions?

If you're unsure about security:
1. **ASK** before committing
2. **Review** the checklist above
3. **Test** in development first
4. **Rotate keys** if in doubt

---

**Remember**: Security is not optional. When in doubt, ask! 🔒

