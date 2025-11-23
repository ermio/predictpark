import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PrivyAuthProvider } from '@/lib/providers/privy-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PredictPark - Crypto Prediction Markets',
  description: 'Swipe to trade crypto prediction markets on Polymarket',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyAuthProvider>
          {children}
        </PrivyAuthProvider>
      </body>
    </html>
  );
}

