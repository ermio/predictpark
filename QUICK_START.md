# ⚡ Quick Start Guide

Get PredictPark running in 3 minutes!

## 1️⃣ Install Dependencies

```bash
yarn
```

This installs all required packages including Next.js 15, React 19, TypeScript, and Tailwind CSS.

## 2️⃣ Start Development Server

```bash
yarn dev
```

The app will start at **http://localhost:3000**

## 3️⃣ Try the Swipe Interface

Open your browser and go to:

### **http://localhost:3000/dummy**

This is a hidden page with the full swipe interface and dummy data.

## 🎮 How to Use

### Desktop
- Click and drag cards left or right
- Use the buttons at the bottom

### Mobile
- Swipe cards with your finger
- Tap the buttons at the bottom

### Actions
- 👉 **Swipe Right** → Bet on price going **UP** ✅
- 👈 **Swipe Left** → Bet on price going **DOWN** ❌
- ↩️ **Undo** → Go back to previous card
- ℹ️ **Info** → View market details (coming soon)

## 📱 Test on Mobile

1. Make sure your phone and computer are on the same network
2. Find your computer's IP address:
   ```bash
   # macOS/Linux
   ifconfig | grep "inet "
   
   # Or just run the dev server and it will show the network URL
   ```
3. On your phone, visit: `http://YOUR_IP:3000/dummy`
4. Start swiping!

## 📋 What's Included

### 5 Dummy Crypto Markets
1. **Bitcoin** - Will BTC hit $50,000?
2. **Ethereum** - Will ETH reach $4,000?
3. **Solana** - Will SOL hit $100?
4. **Polygon** - Will MATIC reach $1?
5. **Avalanche** - Will AVAX hit $50?

Each market shows:
- Crypto icon and name
- Market question
- Probability of YES
- YES/NO prices
- 24h trading volume
- Liquidity

## 🎨 UI Features

✨ **Smooth Animations**
- Card rotation during swipe
- Fade-in indicators
- Spring-back if swipe is too short

🎯 **Visual Feedback**
- Green "UP 📈" badge on right swipe
- Red "DOWN 📉" badge on left swipe
- Card stack showing next market

📊 **Information Display**
- Large, readable probabilities
- Color-coded price boxes
- Gradient backgrounds
- Mobile-optimized layout

## 🛠️ Development Tips

### Hot Reload
The dev server has hot reload enabled. Any changes you make to the code will instantly appear in the browser.

### View Components
- **Main page**: `app/dummy/page.tsx`
- **Swipe card**: `components/trading/swipe-card.tsx`
- **Styles**: `app/globals.css`

### Modify Dummy Data
Edit the `DUMMY_MARKETS` array in `app/dummy/page.tsx` to change the markets.

### Change Colors
Update `tailwind.config.ts` to customize the color scheme.

## 🔧 Common Issues

### Port 3000 Already in Use
```bash
# Use a different port
yarn dev --port 3001
```

### TypeScript Errors
```bash
# Check for errors
yarn type-check
```

### Styling Not Working
```bash
# Make sure Tailwind CSS is properly configured
# Check that globals.css is imported in layout.tsx
```

### Images Not Loading
The crypto logos come from `cryptologos.cc`. If they don't load:
1. Check your internet connection
2. The images will show a 🪙 coin emoji as fallback

## 📚 Learn More

- **Swipe UI Details**: See `SWIPE_UI_GUIDE.md`
- **Polymarket API**: See `POLYMARKET_API.md`
- **Project Structure**: See `PROJECT_STRUCTURE.md`
- **Full Setup**: See `GETTING_STARTED.md`

## 🎯 Next Steps

Once you're comfortable with the dummy interface:

1. **Get Polymarket API keys**
   - Sign up at polymarket.com
   - Generate API credentials

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your API keys to .env.local
   ```

3. **Implement real API calls**
   - Replace dummy data with live markets
   - Connect trade execution
   - Add WebSocket for real-time updates

4. **Deploy to Vercel**
   ```bash
   yarn build
   vercel
   ```

## ✅ Checklist

- [ ] Installed dependencies with `yarn`
- [ ] Started dev server with `yarn dev`
- [ ] Opened `/dummy` in browser
- [ ] Tried swiping on desktop
- [ ] Tested on mobile device
- [ ] Explored the code structure
- [ ] Read the documentation files

---

**Need help?** Check the other `.md` files in the root directory for detailed guides.

**Ready to build?** Start editing `app/dummy/page.tsx` and see your changes instantly!

🎯 Happy coding!

