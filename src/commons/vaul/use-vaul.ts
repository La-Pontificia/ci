import { useDialog } from './use-dialog'
import { useUniqueId } from './user-unique-id'

import { type Transition, useDragControls } from 'framer-motion'
import React, { useEffect } from 'react'
import {
  type VaulTriggerProps,
  type UseVaulProps,
  type VaulContentProps
} from './types'
import { trigger, content } from './partials'

const transition: Transition = {
  type: 'tween',
  ease: 'easeInOut',
  duration: 0.3
}

export const useVaul = ({ contentRef, handlerRef, props }: UseVaulProps) => {
  const { children, open: openExternal, onOpenChange } = props

  const { onClose, open: openInternal, toggle, onOpen } = useDialog(false)

  const open = openExternal ?? openInternal

  useEffect(() => {
    if (openExternal !== undefined) {
      onOpenChange?.(openInternal)
    }
  }, [openInternal])

  const dragControls = useDragControls()
  const [offsetHeight, setOffsetHeight] = React.useState(0)

  const id = useUniqueId()
  const overlayId = useUniqueId()
  const describedby = useUniqueId()
  const triggerId = useUniqueId()

  React.useEffect(() => {
    if (contentRef.current) {
      setOffsetHeight(contentRef.current.offsetHeight)
    }
  }, [open])

  let triggerResolver: any = null
  let triggerAsChild: any = null
  let contentChildProps: VaulContentProps | undefined

  React.Children.forEach(children, (child) => {
    if (!React.isValidElement(child)) return
    if (child.type === trigger) {
      triggerResolver = child as React.ReactElement<VaulTriggerProps>
      triggerAsChild = triggerResolver.props.children
    }
    if (child.type === content) {
      contentChildProps = child.props as VaulContentProps
    }
  })

  const isAsChild = triggerResolver?.props.asChild

  const triggerNoChildProps = {
    onClick: (e: any) => {
      toggle()
      !triggerResolver.noClick && triggerResolver?.props.onClick?.(e)
    },
    id: triggerId,
    'aria-expanded': open,
    'data-state': open ? 'open' : 'closed',
    ...triggerResolver?.props
  }

  const {
    asChild,
    children: triggChild,
    ...triggerChildProps
  } = triggerNoChildProps

  const triggerProps = isAsChild ? triggerChildProps : triggerNoChildProps

  const overlayProps = {
    onClick: onClose,
    initial: {
      opacity: 0
    },
    id: overlayId,
    animate: {
      opacity: 1
    },
    exit: {
      opacity: 0
    },
    transition
  }

  return {
    overlayProps,
    describedby,
    id,
    dragControls,
    offsetHeight,
    triggerResolver,
    triggerAsChild,
    triggerProps,
    isAsChild,
    open,
    contentChildProps,
    onClose,
    onOpen
  }
}

// onDrag={(e, a) => {
//   const opacity = 1 - a.offset.y / offsetHeight
//   setOpacity(Math.max(0, Math.min(1, opacity)))
// }}
