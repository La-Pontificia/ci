import type { Metadata } from 'next'
import './globals.css'
import SonnerClient from 'commons/utils'
import SessionProviderClient from 'contexts/session-provider'
import { QueryClientProvider } from 'providers/query-client-provider'

export const metadata: Metadata = {
  title: 'Centro de información - Escuela Superior La Pontificia',
  description:
    'Centro de información | Escuela Superior La Pontifica (ELP) | Instituto La Pontifica (ILP)',
  keywords: [
    'La pontificia',
    'Instituto La Pontificia',
    'Escuela Superior La Pontificia',
    'Ayacucho',
    'ELP Ayacucho',
    'Escuela Peru',
    'Centro de información La Pontificia'
  ],
  authors: {
    name: 'David Bendezú (Daustinn)',
    url: 'https://daustinn.com'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Centro de información - La Pontificia',
    description: 'Centro de información - Escuela Superior La Pontificia',
    siteName: 'Centro de información - La Pontificia',
    url: 'https://ci.ilp.edu.pe',
    images: '/favicon.svg'
  },
  icons: {
    icon: '/favicon.svg'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ELP_Ayacucho',
    images: ['/favicon.svg'],
    site: '@ELP_Ayacucho',
    title: 'Bilblioteca virtual - La Pontificia',
    description: 'Bilblioteca virtual - Escuela Superior La Pontificia'
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-Black.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-BlackItalic.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-BoldItalic.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-Light.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-LightItalic.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-Medium.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-MediumItalic.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-RegularItalic.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-Thin.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="/fonts/canela/Canela-ThinItalic.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <SessionProviderClient>
        <QueryClientProvider>
          <body>
            <SonnerClient />
            {children}
          </body>
        </QueryClientProvider>
      </SessionProviderClient>
    </html>
  )
}
