'use client'

import { useState } from 'react'

export const useModal = () => {
  const [open, setOpen] = useState(false)
  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)
  return {
    open,
    onOpenModal,
    onCloseModal,
    setOpen
  }
}
