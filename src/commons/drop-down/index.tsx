/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/await-thenable */
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
import { type DropDownItemProps } from './item'
export * from './item'

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

export function DropDown({
  triggerButton,
  popoverTriggerProps,
  popoverContentProps,
  children
}: DropDownProps) {
  const childArray = React.Children.toArray(children)
  const [open, setOpen] = useState(false)

  if (childArray.length === 0) {
    return null
  }

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
          className="outline-none flex flex-col divide-y divide-neutral-700 min-w-[170px] shadow-xl z-[200] bg-neutral-900 rounded-2xl border border-neutral-700"
          {...popoverContentProps}
        >
          {childArray.map((child, index) =>
            React.isValidElement<DropDownItemProps>(child)
              ? React.cloneElement<DropDownItemProps>(child, {
                  key: index,
                  onClick: async (event: any) => {
                    await child.props.onClick?.(event)
                    child.props.closeDropDownOnclick && setOpen(false)
                  }
                })
              : null
          )}
        </Content>
      </Portal>
    </Root>
  )
}
