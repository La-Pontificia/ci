'use client'

import React from 'react'
import { cn } from 'utils'
import { motion, AnimatePresence } from 'framer-motion'
import { Portal } from '../portal'
import { XmarkIcon } from 'icons'

type ReturnTypeChild = {
  open: boolean
  setOpen: (open: boolean) => void
  onClose: () => void
  onOpen: () => void
}
type Props = Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> & {
  children?: React.ReactNode | ((r: ReturnTypeChild) => React.ReactNode)
  trigger: React.ReactNode | ((r: ReturnTypeChild) => React.ReactNode)
  empty?: boolean
  backdrop_blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  parentClassName?: string
  backdropClassName?: string
  onOpen?: () => void
  onClose?: () => void
  disabled?: boolean
  open?: boolean
}

export const Dialog = ({
  children,
  trigger,
  className,
  empty,
  parentClassName,
  backdropClassName,
  onOpen,
  disabled,
  onClose,
  backdrop_blur = 'none',
  open: openExternal,
  ...props
}: Props) => {
  const [open, setOpen] = React.useState<boolean>(false)

  const handleOpen = () => {
    if (disabled) return
    setOpen(true)
    onOpen?.()
  }

  const handleClose = () => {
    setOpen(false)
  }

  const finalChild =
    typeof children === 'function'
      ? children({
          open,
          setOpen,
          onClose: handleClose,
          onOpen: handleOpen
        })
      : children

  const finalTrigger =
    typeof trigger === 'function'
      ? trigger({ open, setOpen, onClose: handleClose, onOpen: handleOpen })
      : trigger

  return (
    <React.Fragment>
      {finalTrigger &&
        React.cloneElement(finalTrigger as React.ReactElement, {
          onClick: handleOpen
        })}
      <AnimatePresence onExitComplete={onClose}>
        {(openExternal || open) && (
          <Portal isVisible>
            <React.Fragment>
              <motion.div
                initial={{
                  opacity: 0
                }}
                animate={{
                  opacity: 1
                }}
                exit={{
                  opacity: 0
                }}
                transition={{
                  // type: 'spring',
                  // stiffness: 300,
                  // damping: 30
                  duration: 0.2
                }}
                className={cn(
                  'dark:bg-black/50 bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-20',
                  backdrop_blur === 'sm' && 'backdrop-blur-sm',
                  backdrop_blur === 'md' && 'backdrop-blur-md',
                  backdrop_blur === 'lg' && 'backdrop-blur-lg',
                  backdrop_blur === 'xl' && 'backdrop-blur-xl',
                  backdropClassName
                )}
                onClick={handleClose}
              />
              <motion.div
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.9
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  scale: 0.9
                }}
                transition={{
                  duration: 0.2
                }}
                className={cn(
                  'fixed inset-0 grid pointer-events-none place-content-center z-20',
                  parentClassName
                )}
              >
                <div
                  role="dialog"
                  className={cn(
                    'pointer-events-auto max-h-[99vh] max-w-[99vh]',
                    !empty &&
                      'rounded-2xl relative overflow-y-auto dark:text-white text-black bg-white dark:bg-neutral-900 p-[25px] dark:shadow-[0px_4px_16px_rgba(0,0,0,0.2),_0px_8px_24px_rgba(0,0,0,0.2),_0px_16px_56px_rgba(0,0,0,0.2)] shadow-[0px_4px_16px_rgba(0,0,0,0.04),_0px_8px_24px_rgba(0,0,0,0.04),_0px_16px_56px_rgba(0,0,0,0.04)]',
                    className
                  )}
                  onClick={(e) => e.stopPropagation()}
                  {...props}
                >
                  {finalChild}
                  {!empty && (
                    <button
                      onClick={handleClose}
                      className="absolute z-[1] top-2 right-2 dark:text-black dark:bg-neutral-600 hover:dark:bg-neutral-500 bg-neutral-200 hover:bg-neutral-100 rounded-full p-1"
                    >
                      <XmarkIcon className="w-7" />
                    </button>
                  )}
                </div>
              </motion.div>
            </React.Fragment>
          </Portal>
        )}
      </AnimatePresence>
    </React.Fragment>
  )
}
