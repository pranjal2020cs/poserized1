import type { Metadata, Viewport } from 'next'
import { ThemeProvider } from './providers'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { SkipToMain } from '@/components/skip-to-main'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://blog-platform.vercel.app'),
  title: {
    default: 'Modern Blog Platform',
    template: '%s | Modern Blog Platform',
  },
  description: 'A production-ready Next.js blog platform with dark/light theme support, optimized performance, and accessibility features.',
  keywords: [
    'blog',
    'next.js',
    'react',
    'typescript',
    'tailwind',
    'dark mode',
  ],
  authors: [{ name: 'Your Name' }],
  creator: 'Blog Platform Team',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blog-platform.vercel.app',
    siteName: 'Modern Blog Platform',
    title: 'Modern Blog Platform',
    description: 'A production-ready Next.js blog platform with dark/light theme support.',
    images: [
      {
        url: 'https://blog-platform.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Blog Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Modern Blog Platform',
    description: 'A production-ready Next.js blog platform.',
    images: ['https://blog-platform.vercel.app/og-image.jpg'],
  },
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
    google: 'google-site-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect to external resources for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* JSON-LD structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Modern Blog Platform',
              description: 'A production-ready Next.js blog platform',
              url: 'https://blog-platform.vercel.app',
            }),
          }}
        />
      </head>
      <body className="flex flex-col min-h-screen bg-background text-foreground">
        <ThemeProvider>
          <SkipToMain />
          <Navigation />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
