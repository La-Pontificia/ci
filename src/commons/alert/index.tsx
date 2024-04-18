'use client'

import { type ButtonProps } from 'commons/button'
import { Dialog } from 'commons/dialog'
import { LineLoading } from 'commons/loading/line'
import React, { useState, type MouseEvent } from 'react'

export interface AlertProps<T extends React.ReactElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  trigger?: T
  triggerProps?: React.HTMLAttributes<HTMLElement>
  title?: React.ReactNode
  description?: React.ReactNode

  onOk?: () => Promise<void>
  onOkText?: string
  onOkProps?: ButtonProps
  onCancel?: () => void
  onCancelText?: string
  onCancelProps?: ButtonProps
  onFinished?: () => void
  onError?: (err: Error) => void
  loading?: boolean
  z?: number
}

export const Alert = <T extends React.ReactElement>({
  onOpenChange,
  trigger,
  triggerProps,
  onOk,
  onOkText,
  onOkProps,
  onCancel,
  onCancelText,
  onCancelProps,
  onError,
  onFinished,
  loading,
  title,
  description
}: AlertProps<T>) => {
  const [loader, setLoader] = useState(loading)

  const onClose = () => {
    onOpenChange?.(false)
    onCancel?.()
  }

  const onTriggerClick = (event: MouseEvent<HTMLElement>) => {
    triggerProps?.onClick?.(event)
  }

  const handleOk = async () => {
    setLoader(true)
    try {
      await onOk?.()
      onClose()
      onFinished?.()
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error on handleOk:', err.message)
        onError?.(err)
      }
    } finally {
      setLoader(false)
    }
  }

  const cancelButtonProps = {
    ...onCancelProps,
    onClick: () => onCancel?.() ?? onClose()
  }
  const okButtonProps = {
    ...onOkProps,
    onClick: async () => (onOk ? await handleOk() : onClose())
  }

  return (
    <Dialog
      trigger={
        trigger &&
        React.cloneElement(trigger as React.ReactElement<any>, {
          ...triggerProps,
          onClick: onTriggerClick
        })
      }
    >
      <div className="bg-neutral-950 border border-neutral-800 w-[380px] max-500:w-full max-400:min-w-full overflow-hidden rounded-3xl divide-y divide-neutral-700/50 border-neutral-700/80">
        <div className="flex flex-col p-5 gap-1">
          <h2 className="text-center text-lg font-semibold">
            {title ?? 'Title alert'}
          </h2>
          <p className="text-neutral-400 font-light text-base text-center">
            {description ?? 'Description alert'}
          </p>
        </div>
        <footer className="font-medium bg-neutral-900/50 relative divide-y divide-neutral-700/50 flex flex-col justify-between">
          <div className="relative">
            {loader && (
              <div className="absolute justify-center bg-neutral-800/90 backdrop-blur-md inset-0 grid place-content-center z-10">
                <span className="mx-auto">
                  <LineLoading size={30} />
                </span>
              </div>
            )}
            <button
              className="w-full disabled:text-neutral-500 text-blue-500 p-3 font-semibold"
              {...okButtonProps}
            >
              {onOkText ?? 'Confirmar'}
            </button>
          </div>
          <button
            className="w-full font-light text-neutral-400 p-3"
            {...cancelButtonProps}
          >
            {onCancelText ?? 'Cancelar'}
          </button>
        </footer>
      </div>
    </Dialog>
  )
}
