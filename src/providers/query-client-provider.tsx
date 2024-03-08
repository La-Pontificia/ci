'use client'

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderPrimitive
} from '@tanstack/react-query'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const queryClient = new QueryClient()

export function QueryClientProvider({ children }: Props) {
  return (
    <QueryClientProviderPrimitive client={queryClient}>
      {children}
    </QueryClientProviderPrimitive>
  )
}
