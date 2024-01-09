'use client'

import { Portal } from '../portal'
import { useEffect } from 'react'
import { cn } from 'utils'
// import { motion } from 'framer-motion'

export interface DialogProps {
  open?: true | false
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
  trigger?: React.ReactNode
  classNames?: classNames
  defaultOpen?: boolean
  classNamePortal?: string
  classNameOutline?: string
  staticBackdrop?: boolean
  backdropBlur?: boolean
  z?: number
}
type classNames = {
  overlay?: string
  content?: string
}

function disableScroll() {
  document.body.style.overflow = 'hidden'
  document.body.style.position = 'sticky'
}

function enableScroll() {
  document.body.style.overflow = 'visible'
  document.body.style.position = 'static'
}

export const Dialog = (props: DialogProps) => {
  const {
    children,
    onOpenChange,
    classNamePortal,
    classNameOutline,
    open,
    z,
    trigger,
    staticBackdrop,
    backdropBlur
  } = props

  useEffect(() => {
    if (open) disableScroll()
    return () => enableScroll()
  }, [open])

  return (
    <>
      {trigger}
      {open && (
        <Portal isVisible={open}>
          <>
            <div
              onClick={() => {
                onOpenChange?.(false)
              }}
              aria-disabled={staticBackdrop}
              data-blur={backdropBlur}
              className={cn(
                'inset-0 fixed aria-disabled:pointer-events-none data-[blur=true]:backdrop-blur-sm bg-neutral-950/90',
                classNameOutline
              )}
            />

            <div
              role="dialog"
              autoFocus
              style={{
                zIndex: z ? z + 202 : 202
              }}
              className={cn(
                'pointer-events-auto max-h-[100svh] max-w-[100vw] fixed left-[50%] translate-x-[-50%] translate-y-[-50%] top-[50%]',
                classNamePortal
              )}
            >
              {children}
            </div>
          </>
        </Portal>
      )}
    </>
  )
}
