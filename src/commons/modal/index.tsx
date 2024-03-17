'use client'

import { Dialog, type DialogProps } from 'commons/dialog'
import Content from './content'
import { type ButtonProps } from 'commons/button'

export interface ModalProps extends DialogProps {
  title?: string
  className?: string

  width?: number | 'screen'
  heigth?: number | 'screen'
  onDone?: () => void
  onDoneText?: string
  onDoneProps?: ButtonProps
  onCancel?: () => void
  onCancelText?: string
  onCancelProps?: ButtonProps
  isPending?: boolean

  hiddenFooter?: boolean
  hiddenHeader?: boolean
  hiddenCloseButton?: boolean

  onlyIcon?: boolean
}

export const Modal = (props: ModalProps) => {
  return (
    <Dialog
      classNamePortal="fixed  overflow-y-auto max-h-[90svh] max-900:w-full max-900:inset-0 max-900:translate-x-[-0%] max-900:translate-y-[0%]"
      {...props}
    >
      <Content {...props} />
    </Dialog>
  )
}
