'use client'

import React from 'react'
import { SessionProvider } from 'next-auth/react'
type Props = {
  children: React.ReactNode
}

export default function SessionProviderClient({ children }: Props) {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  )
}
