/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/await-thenable */
'use client'

import React, { useState } from 'react'
import { Slot } from '@radix-ui/react-slot'

import {
  Root,
  Trigger,
  Portal,
  Content,
  type PopoverContentProps,
  type PopoverTriggerProps
} from '@radix-ui/react-popover'
import { cn } from 'utils'

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

function DropDown({
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
          className="outline-none dark:text-neutral-100 flex flex-col min-w-[170px] shadow-xl z-40 bg-white  rounded-2xl border border-neutral-200 dark:border-neutral-600 p-1.5 dark:bg-[#2b2b2b]"
          {...popoverContentProps}
        >
          {React.Children.map(children, (child: any) =>
            React.cloneElement(child as React.ReactElement, {
              onClick: (e: any) => {
                child.props.sencible && setOpen(false)
                child.props.onClick?.(e)
              }
            })
          )}
        </Content>
      </Portal>
    </Root>
  )
}

export interface DropDownItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  icon?: React.ReactNode
  sencible?: boolean
}

function DropDownItem({
  children,
  className,
  asChild,
  icon,
  ...props
}: DropDownItemProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      role="tab"
      className={cn(
        'w-full flex items-center gap-2 justify-start text-sm font-medium p-1.5 hover:bg-blue-500/80 hover:text-white focus:outline-none focus-visible:bg-blue-500/80 focus-visible:text-white rounded-md dark:text-white text-black',
        className
      )}
      {...props}
    >
      <span role="img" aria-hidden className="w-5 block p-0.5">
        {icon}
      </span>
      {children}
    </Comp>
  )
}

export { DropDown, DropDownItem }
