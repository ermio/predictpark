export const siteConfig = {
  name: "PredictPark",
  description: "Trade crypto prediction markets on Polymarket with confidence",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  
  links: {
    github: "https://github.com/yourusername/predictpark",
    docs: "https://docs.predictpark.com",
    polymarket: "https://polymarket.com",
  },
  
  features: {
    autoTrading: process.env.NEXT_PUBLIC_ENABLE_AUTO_TRADE === "true",
    notifications: process.env.NEXT_PUBLIC_ENABLE_NOTIFICATIONS === "true",
    realTimeUpdates: true,
    advancedCharts: true,
  },
  
  theme: {
    colors: {
      primary: "#3B82F6", // blue-500
      success: "#10B981", // green-500
      danger: "#EF4444", // red-500
      warning: "#F59E0B", // amber-500
    },
  },
} as const;

export type SiteConfig = typeof siteConfig;

