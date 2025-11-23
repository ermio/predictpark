# 📱 Swipe UI Guide - PredictPark

## Overview

PredictPark features a **Tinder-like swipe interface** for trading crypto prediction markets. This mobile-first design makes trading intuitive and fun!

## 🎯 How It Works

### Swipe Gestures
- **👉 Swipe Right**: Bet on **UP** (price increase) - "YES" outcome
- **👈 Swipe Left**: Bet on **DOWN** (price decrease) - "NO" outcome
- **↩️ Undo**: Tap the undo button to go back to the previous market

### Visual Feedback
- Green indicator appears when swiping right (UP)
- Red indicator appears when swiping left (DOWN)
- Card rotates and moves with your finger/mouse
- Smooth animations on swipe completion

## 📄 Pages

### Home Page (`/`)
- Landing page with branding
- "Start Trading" button leads to `/dummy`
- Simple instructions on how to swipe

### Dummy Page (`/dummy`)
- **Hidden route** for testing (not linked in production nav)
- Full swipe interface with 5 dummy crypto markets:
  - Bitcoin (BTC) - $50K target
  - Ethereum (ETH) - $4K target
  - Solana (SOL) - $100 target
  - Polygon (MATIC) - $1 target
  - Avalanche (AVAX) - $50 target

## 🎨 UI Components

### SwipeCard Component
**Location**: `components/trading/swipe-card.tsx`

**Features**:
- Draggable with touch and mouse support
- Real-time rotation based on drag
- Shows crypto icon, probability, prices, volume
- Auto-swipes when threshold (150px) is reached
- Spring-back animation if swipe is too short

**Card Information Display**:
- Crypto asset badge (BTC, ETH, etc.)
- Market question
- Description
- Large probability display (chance of YES)
- YES/NO prices
- 24h volume
- Liquidity

### SwipeOverlay Component
**Location**: `components/trading/swipe-overlay.tsx`

Subtle gradient hints on left (red) and right (green) sides to guide users.

## 🎮 Action Buttons

Located at the bottom of `/dummy` page:

| Button | Action | Style |
|--------|--------|-------|
| ↩️ Undo | Go back one card | Gray circle |
| ❌ Down | Swipe left (DOWN bet) | Red-pink gradient |
| ✓ Up | Swipe right (UP bet) | Green gradient |
| ℹ️ Info | View market details | Gray circle |

## 📱 Mobile-First Design

### Responsive Features
- Works perfectly on mobile devices
- Touch-optimized (no hover states)
- Prevents text selection during swipe
- Viewport locked to prevent zoom
- Safe area support for iPhone notches

### Performance
- GPU-accelerated animations
- Smooth 60fps transitions
- No janky scrolling
- Instant touch response

## 🎨 Design System

### Colors
```css
/* Up/Yes/Positive */
Green: from-green-500 to-emerald-500
Background: from-green-50 to-emerald-50

/* Down/No/Negative */
Red: from-red-500 to-pink-500
Background: from-red-50 to-pink-50

/* Primary */
Blue-Purple: from-blue-600 to-purple-600

/* Neutral */
Gray backgrounds with subtle gradients
```

### Typography
- **Headers**: Bold, 3xl-7xl font sizes
- **Body**: Regular, 16px base
- **Numbers**: Bold for emphasis
- **Font**: Inter (system fallback)

### Spacing
- Cards: 32px padding
- Buttons: 64px (large), 56px (medium)
- Safe areas respected on mobile

## 🔧 Technical Details

### Card Stack
- Shows 2 cards at a time (current + next)
- Next card appears at 95% scale, 50% opacity
- Creates depth perception

### Swipe Detection
```typescript
// Threshold for successful swipe
if (Math.abs(position.x) > 150) {
  onSwipe(position.x > 0 ? 'right' : 'left');
}
```

### Animations
```css
/* In globals.css */
@keyframes swipe-left { /* 0.4s smooth exit */ }
@keyframes swipe-right { /* 0.4s smooth exit */ }
```

## 📊 Dummy Data

5 realistic crypto markets with:
- Market questions
- Probabilities (45-72% range)
- Prices matching probabilities
- Realistic 24h volumes ($138K-$250K)
- Liquidity data ($210K-$580K)
- Crypto logos from cryptologos.cc

## 🚀 Next Steps (When API is Ready)

### 1. Replace Dummy Data
Update `/dummy/page.tsx`:
```typescript
// Replace DUMMY_MARKETS with:
const { markets } = useMarkets({
  filters: { cryptoAsset: ['BTC', 'ETH', 'SOL'] }
});
```

### 2. Implement Trade Execution
When user swipes, execute actual trade:
```typescript
const handleSwipe = async (direction: 'left' | 'right') => {
  const outcome = direction === 'right' ? upOutcome : downOutcome;
  
  await executeTrade({
    marketId: market.id,
    outcomeId: outcome.id,
    side: 'buy',
    size: 10, // Default bet size
  });
};
```

### 3. Add Position Sizing
Before `/dummy` becomes production, add a modal to set bet amount:
```typescript
<BetSizeModal 
  onConfirm={(amount) => handleSwipe(direction, amount)}
/>
```

### 4. Polymarket Integration
According to [Polymarket docs](https://docs.polymarket.com/quickstart/introduction/main):
- Set up authentication
- Use their REST API for market data
- WebSocket for real-time updates
- Execute trades through their API

### 5. Add Features
- [ ] Filters (volume, asset type)
- [ ] Portfolio view
- [ ] Trade history
- [ ] Notifications on market resolution
- [ ] Social sharing of predictions

## 🎨 Customization Guide

### Change Swipe Threshold
```typescript
// In swipe-card.tsx, line ~70
if (Math.abs(position.x) > 150) { // Change this number
```

### Adjust Animation Speed
```typescript
// In dummy/page.tsx, line ~120
setTimeout(() => {
  setCurrentIndex((prev) => prev + 1);
}, 400); // Change this duration (milliseconds)
```

### Modify Card Design
Edit `components/trading/swipe-card.tsx`:
- Change gradients
- Adjust spacing
- Add/remove stats
- Modify typography

## 🐛 Known Limitations

1. **Image Loading**: Crypto logos from external CDN may fail to load
2. **Mouse Events**: Desktop mouse swipe works but not as smooth as touch
3. **No Bet Confirmation**: Currently swipes immediately (should add confirmation)
4. **No Amount Selection**: Fixed bet size (needs modal)
5. **No Error Handling**: Assumes all swipes succeed

## ✅ Testing Checklist

- [ ] Test on iOS Safari
- [ ] Test on Android Chrome
- [ ] Test with slow network (images)
- [ ] Test rapid swiping
- [ ] Test undo functionality
- [ ] Verify animations are smooth
- [ ] Check safe area insets on notched phones
- [ ] Test landscape orientation
- [ ] Verify touch targets are 44px minimum

## 📈 Future Enhancements

1. **Haptic Feedback** - Vibration on swipe
2. **Sound Effects** - Optional audio cues
3. **Tutorial Overlay** - First-time user guide
4. **Filters** - Filter markets by asset, volume, time
5. **Search** - Find specific markets
6. **Favorites** - Save markets to review later
7. **Streak Counter** - Gamification
8. **Leaderboard** - Compare with other users

---

**Access the swipe UI**: Run `yarn dev` and visit `http://localhost:3000/dummy`

🎯 Have fun swiping!

