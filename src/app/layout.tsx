import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';
import './globals.css';

import ScrollToTop from '@/components/ScrollToTop';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body
        className={cn(
          'min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100 overflow-x-hidden',
          inter.variable,
          'font-sans antialiased'
        )}
      >
        <Providers>
          <div className="relative">
            {/* Background pattern */}
            <div 
              className="fixed inset-0 bg-[url(/grid.svg)] bg-center opacity-20 pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, white, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)'
              }}
            />
            
            {/* Main content */}
            <div className="relative">
              {children}
              <ScrollToTop />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}