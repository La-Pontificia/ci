/* eslint-disable @typescript-eslint/no-unsafe-argument */
'use client'

import { Portal } from 'commons/portal'
import { AnimatePresence, type Transition, motion } from 'framer-motion'
import React from 'react'
// import { Eclipse } from 'commons/button'
// import { XmarkIcon } from 'icons'
import { type VaulProps } from './types'
import { useVaul } from './use-vaul'
import { useChildren } from './use-children'
import { cn } from 'utils'
import { XmarkIcon } from 'icons'
import { Button } from 'commons/button'

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
                  !props.resetStyles &&
                    'fixed inset-0 bg-stone-800/60 dark:bg-black/70 z-20',
                  overlayChildProps.className
                )}
                {...overlayProps}
              />

              <motion.div
                data-content-cosmoui
                role="dialog"
                ref={contentRef}
                className={cn(
                  'fixed shadow-lg max-h-[80vh] rounded-t-xl bottom-0 inset-x-0 bg-white w-full z-20 flex flex-col dark:bg-stone-900',
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
                    !props.resetStyles &&
                      'select-none px-2 py-5 dark:border-stone-700',
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
                    <>
                      <div className="flex-shrink-0 rounded-full mx-auto w-16 h-1.5 bg-gray-300 dark:bg-stone-700" />
                      <div className="absolute max-md:hidden top-4 z-[1] right-4">
                        <Button
                          className="bg-stone-300 border-0 text-stone-800 p-0.5 w-[35px] aspect-square dark:bg-stone-600 dark:hover:bg-stone-700 dark:text-black"
                          onClick={onClose}
                        >
                          <XmarkIcon />
                        </Button>
                      </div>
                    </>
                  )}
                </motion.div>
                {finalChild}
              </motion.div>
            </>
          </Portal>
        )}
      </AnimatePresence>
    </>
  )
}

export { Root }

// <div className="overflow-y-auto flex-grow p-4 pt-0">
//                     {childFinal}
//                   </div>
//                   {footFinal && (
//                     <footer className="border-t dark:border-stone-700 p-4">
//                       {footFinal}
//                     </footer>
//                   )}

// const childFinal =
// typeof children === 'function'
//   ? children({
//       open,
//       onClose,
//       onOpen
//     })
//   : children

// const footFinal =

// const isX = position === 'left' || position === 'right'
// const isY = position === 'top' || position === 'bottom'

// isX && 'my-auto w-1.5 mx-3 h-20',
// isY && 'mx-auto w-20 my-3 h-1.5'

// position === 'left' &&
//   'left-0 flex-row-reverse rounded-r-[20px]',
// position === 'right' && 'right-0 flex-row rounded-l-[20px]',
// position === 'top' &&
//   'flex-col-reverse top-0 rounded-b-[20px]',
// position === 'bottom' && 'bottom-0 rounded-t-[20px]',
// isX && 'inset-y-0 h-full max-w-[90svw]',
// isY && 'inset-x-0 w-full max-h-[90svh]'

// <Drawer.Root
//   direction={position}
//   // dismissible
//   // nested
//   fixed
//   // fixed
//   // modal
//   // scrollLockTimeout={0}
//   // snapPoints={[0]}
//   // preventScrollRestoration
//   open={open}
//   onOpenChange={setOpen}
// >
//   <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>
//   <Drawer.Portal>
//     <Drawer.Overlay className="fixed inset-0 bg-black/40 dark:bg-black/70 z-20" />
//     <Drawer.Content
//       className={cn(
//         'bg-white z-20 flex flex-col fixed dark:bg-stone-900',
//         className,
//         position === 'left' && 'left-0 flex-row-reverse rounded-r-[20px]',
//         position === 'right' && 'right-0 flex-row rounded-l-[20px]',
//         position === 'top' && 'flex-col-reverse top-0 rounded-b-[20px]',
//         position === 'bottom' && 'bottom-0 rounded-t-[20px]',
//         isX && 'inset-y-0 h-full max-w-[90svw]',
//         isY && 'inset-x-0 w-full max-h-[90svh]'
//       )}
//     >
//       <div className="absolute top-4 z-[1] right-4">
//         <Eclipse
//           className="bg-stone-200 dark:bg-stone-600 dark:hover:bg-stone-700 dark:text-black"
//           onClick={onClose}
//           size="sm"
//           icon={<XmarkIcon className="p-0.5" />}
//         />
//       </div>
//       <div
//         className={cn(
//           'flex-shrink-0 rounded-full bg-gray-300 dark:bg-stone-700',
//           isX && 'my-auto w-1.5 mx-3 h-20',
//           isY && 'mx-auto w-20 my-3 h-1.5'
//         )}
//       />
//       <div className="flex z-[0] flex-col h-full overflow-y-auto">
//         <div className="pb-4 mx-2 border-b dark:border-stone-700">
//           {title && (
//             <h1 className="text-center font-semibold text-lg">{title}</h1>
//           )}
//         </div>
//         <div className="overflow-y-auto flex-grow p-4 pt-0">
//           {childFinal}
//         </div>
//         {footFinal && (
//           <footer className="border-t dark:border-stone-700 p-4">
//             {footFinal}
//           </footer>
//         )}
//       </div>
//     </Drawer.Content>
//   </Drawer.Portal>
// </Drawer.Root>
