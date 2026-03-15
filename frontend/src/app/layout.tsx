import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth" className={`${inter.variable} ${outfit.variable} scroll-smooth`}>
      <head>
        <title>Elite BMW Cycling - Ride the Night</title>
        <meta name="description" content="Premium night cycling experience in Mumbai. Book your ride today." />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased text-white bg-[#050505]">
        <div suppressHydrationWarning>
          {children}
        </div>
        <div suppressHydrationWarning>
          <Toaster 
            position="bottom-right" 
            toastOptions={{
              style: { background: '#111', color: '#fff', border: '1px solid #333' }
            }} 
          />
        </div>
      </body>
    </html>
  );
}
