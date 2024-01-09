import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bilblioteca virtual - La Pontificia',
  description:
    'Bilblioteca virtual | Escuela Superior La Pontifica (ELP) | Instituto La Pontifica (ILP)'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
