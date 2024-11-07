import { Inter } from 'next/font/google';
import { cn } from '../lib/utils';
import './globals.css';
import type { Metadata } from 'next';

import ScrollToTop from '@/components/ScrollToTop';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

// Configuration des métadonnées
export const metadata: Metadata = {
  title: 'Achour Mezdad | Développeur Web',
  description: 'Développeur web passionné par des designs élégants et performants pour des expériences web modernes et immersives',
  keywords: ['développeur web', 'frontend', 'react', 'nextjs', 'Achour Mezdad', 'développeur frontend', 'javascript', 'typescript'],
  authors: [{ name: 'Achour Mezdad' }],
  metadataBase: new URL('https://mezdadachour.vercel.app/'),
  openGraph: {
    title: 'Achour Mezdad | Développeur Web',
    description: 'Développeur web passionné par des designs élégants et performants pour des expériences web modernes et immersives',
    url: 'https://mezdadachour.vercel.app/',
    siteName: 'Achour Mezdad Portfolio',
    images: [
      {
        url: './og-image.png',
        width: 1200,
        height: 630,
        alt: 'Portfolio de Achour Mezdad - Développeur Web',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Achour Mezdad | Développeur Web',
    description: 'Développeur web passionné par des designs élégants et performants pour des expériences web modernes et immersives',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: './favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: './favicon.svg', type: 'image/svg+xml' },
      { url: './favicon.ico', type: 'image/x-icon', sizes: '32x32' },
    ],
    apple: [
      { url: './apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: './safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  manifest: './site.webmanifest',

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'KQcga_yIl5dnG87tqLwk1POTxl27kTriwKfWgqMhI20', // A remplacer par votre code de vérification Google
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <head>
        {/* Ajout des balises de favicon */}
        <link rel="icon" type="image/png" href="./favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="./favicon.svg" />
        <link rel="shortcut icon" href="./favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-title" content="Mezdad Achour" />
        <link rel="manifest" href="./site.webmanifest" />
      </head>
      <body
        className={cn(
          'min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black text-gray-100',
          inter.variable,
          'font-sans antialiased'
        )}
      >
        <Providers>
          {/* Wrapper pour gérer le overflow */}
          <div className="relative w-full overflow-x-hidden">
            {/* Background pattern */}
            <div 
              className="fixed inset-0 bg-[url(/grid.svg)] bg-center opacity-20 pointer-events-none"
              style={{
                maskImage: 'linear-gradient(to bottom, white, transparent)',
                WebkitMaskImage: 'linear-gradient(to bottom, white, transparent)'
              }}
            />
            
            {/* Main content */}
            <main className="relative w-full">
              {children}
              <ScrollToTop />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}