/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { Portal } from 'commons/portal'
import { AnimatePresence, type Transition, motion } from 'framer-motion'
import React from 'react'

import { type VaulProps } from './types'
import { useVaul } from './use-vaul'
import { useChildren } from './use-children'
import { cn } from 'utils'

const transition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.2
}

const Root = (props: VaulProps) => {
  const handlerRef = React.useRef<HTMLDivElement>(null)
  const contentRef = React.useRef<HTMLDivElement>(null)
  const triggerRef = React.useRef<HTMLElement>(null)

  const {
    contentChildProps,
    handlerChildProps,
    overlayChildProps
    // triggerAsChild,
    // triggerProps
  } = useChildren(props)

  const {
    describedby,
    dragControls,
    id,
    offsetHeight,
    overlayProps,
    open,
    onClose,
    isAsChild,
    triggerAsChild,
    triggerProps,
    onOpen
    // contentChildProps
  } = useVaul({
    props,
    contentRef,
    handlerRef
  })

  const trigger =
    isAsChild && triggerAsChild ? (
      React.cloneElement(triggerAsChild, {
        ...triggerProps,
        ref: triggerRef,
        'aria-haspopup': 'dialog'
      })
    ) : (
      <button {...triggerProps} ref={triggerRef} aria-haspopup="dialog" />
    )

  const finalChild =
    typeof contentChildProps.children === 'function'
      ? contentChildProps.children({
          open,
          onClose,
          onOpen
        })
      : contentChildProps.children

  return (
    <>
      {trigger}
      <AnimatePresence>
        {open && (
          <Portal isVisible>
            <>
              <motion.div
                data-overlay-cosmoui
                className={cn(
                  !props.resetStyles && 'fixed inset-0 z-20 bg-stone-800/60',
                  overlayChildProps.className
                )}
                {...overlayProps}
              />

              <motion.div
                data-content-cosmoui
                role="dialog"
                ref={contentRef}
                className={cn(
                  'fixed shadow-lg max-h-[80vh] rounded-t-xl bottom-0 inset-x-0 bg-white w-full z-20 flex flex-col',
                  contentChildProps?.className
                )}
                initial={{
                  y: '100%'
                }}
                id={id}
                aria-describedby={describedby}
                animate={{
                  y: 0
                }}
                exit={{
                  y: '100%'
                }}
                drag="y"
                dragConstraints={{
                  top: 0
                }}
                dragListener={false}
                dragControls={dragControls}
                dragTransition={{
                  bounceDamping: 20,
                  max: 10
                }}
                dragElastic={{
                  top: 0.05,
                  bottom: 1
                }}
                transition={transition}
                whileTap={{ boxShadow: '0px 0px 15px rgba(0,0,0,0.2)' }}
                onDragEnd={(e, a) => {
                  if (a.offset.y > offsetHeight / 3) {
                    onClose()
                  }
                }}
              >
                <motion.div
                  data-handler-cosmoui
                  className={cn(
                    'select-none',
                    !props.resetStyles && 'select-none px-2 py-5',
                    handlerChildProps.className
                    // handlerChildProps.title && 'border-b dark:border-stone-700'
                  )}
                  ref={handlerRef}
                  style={{
                    touchAction: 'none',
                    ...handlerChildProps.style
                  }}
                  draggable="false"
                  onPointerDown={(event) => dragControls.start(event)}
                >
                  {handlerChildProps.children ?? (
                    <div className="flex-shrink-0 rounded-full mx-auto w-16 h-1.5 bg-gray-300 " />
                  )}
                </motion.div>
                <div className="flex-grow overflow-y-auto">{finalChild}</div>
              </motion.div>
            </>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}

export { Root }
