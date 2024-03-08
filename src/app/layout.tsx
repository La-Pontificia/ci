import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import SonnerClient from 'commons/utils'
import SessionProviderClient from 'contexts/session-provider'
import { QueryClientProvider } from 'providers/query-client-provider'

const inter = Inter({ subsets: ['latin'] })

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
    images: '/only-logo.png'
  },
  icons: {
    icon: '/only-logo.png'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@ELP_Ayacucho',
    images: ['/only-logo.png'],
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
      <SessionProviderClient>
        <QueryClientProvider>
          <body className={inter.className}>
            <SonnerClient />
            {children}
          </body>
        </QueryClientProvider>
      </SessionProviderClient>
    </html>
  )
}
