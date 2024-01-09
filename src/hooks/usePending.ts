'use client'

import { useState } from 'react'

export const usePending = (props?: boolean) => {
  const [isPending, setIsPending] = useState(props)
  const start = () => setIsPending(true)
  const end = () => setIsPending(false)
  return { isPending, end, start }
}
