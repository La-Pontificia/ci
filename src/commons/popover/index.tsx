'use client'

import React, { useState } from 'react'
import {
  Root,
  Trigger,
  Portal,
  Content,
  type PopoverContentProps,
  type PopoverTriggerProps
} from '@radix-ui/react-popover'
type TriggerButtonProps = {
  open?: boolean
}

export type DropDownProps = {
  triggerButton?:
    | React.ReactNode
    | ((props: TriggerButtonProps) => React.ReactNode)
  popoverTriggerProps?: PopoverTriggerProps
  popoverContentProps?: PopoverContentProps
  children?: React.ReactNode
}

export function Popover({
  triggerButton,
  popoverTriggerProps,
  popoverContentProps,
  children
}: DropDownProps) {
  const [open, setOpen] = useState(false)

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild {...popoverTriggerProps}>
        {typeof triggerButton === 'function'
          ? triggerButton({ open })
          : triggerButton}
      </Trigger>
      <Portal>
        <Content
          alignOffset={5}
          sideOffset={5}
          align="end"
          className="outline-none p-2 flex flex-col divide-y divide-neutral-700 min-w-[170px] shadow-xl z-[200] bg-neutral-900 rounded-2xl border border-neutral-700"
          {...popoverContentProps}
        >
          {children}
        </Content>
      </Portal>
    </Root>
  )
}
