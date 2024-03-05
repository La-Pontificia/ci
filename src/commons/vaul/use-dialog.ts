'use client'

import { useState } from 'react'

export const useDialog = (init: boolean | undefined = false) => {
  const [open, setOpen] = useState(init)
  const onOpen = () => setOpen(true)
  const onClose = () => setOpen(false)
  const toggle = () => setOpen(!open)
  return {
    open,
    onOpen,
    onClose,
    setOpen,
    toggle
  }
}
