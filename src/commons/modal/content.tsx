'use client'

import React, { useEffect, useRef } from 'react'
import { type ModalProps } from '.'
import { cn } from 'utils'

import './style.css'
import { CheckIcon } from 'icons'

import { Button } from 'commons/button'
import { LineLoading } from 'commons/loading/line'

interface PropsType extends ModalProps {}

export default function Content(props: PropsType) {
  const {
    children,
    heigth,
    width,
    className,
    isPending,
    onOpenChange,
    onDone,
    onCancel,
    onDoneText,
    onCancelText,
    onDoneProps,
    onCancelProps,
    open,
    hiddenFooter,
    hiddenHeader,
    title,
    onlyIcon
  } = props

  const ref = useRef<HTMLDivElement>(null)

  const closeModal = () => onOpenChange?.(false)

  const handleDone = () => {
    if (onDone) onDone()
    else closeModal()
  }
  const handleCancel = () => {
    if (onCancel) onCancel()
    else closeModal()
  }

  useEffect(() => {
    ref?.current?.focus()
  }, [open])
  return (
    <div className="relative h-full">
      {title && !hiddenHeader && (
        <header className="p-2 text-center text-white font-medium text-lg max-900:hidden">
          {title}
        </header>
      )}

      <div
        role="dialog"
        aria-hidden={true}
        ref={ref}
        style={{
          height: heigth === 'screen' ? '100dvh' : '100%',
          width: width === 'screen' ? '100vw' : '100%'
        }}
        data-screen={heigth === 'screen'}
        className={cn(
          'flex flex-col border data-[screen=true]:rounded-none w-full shadow-2xl bg-white overflow-hidden rounded-2xl max-900:rounded-none max-900:border-0 max-900:w-full relative',
          className
        )}
      >
        <header className="p-3 px-5 border-b border-b-neutral-700 max-900:flex items-center w-full space-x-3 hidden relative gap-4">
          {isPending && (
            <div className="absolute justify-center bg-[#101010]/90 inset-0 grid place-content-center z-10">
              <span className="mx-auto">
                <LineLoading className="text-neutral-400" size={35} />
              </span>
            </div>
          )}
          <Button
            onClick={handleCancel}
            isFilled
            className="h-10 gap-2 rounded-xl text-base"
            variant="none"
            {...onCancelProps}
          >
            Cancelar
          </Button>
          <div className="w-full block text-center text-lg font-semibold">
            {title}
          </div>
          <Button
            variant="none"
            className="h-10 text-blue-500 text-center text-base"
            isFilled
            {...onDoneProps}
            onClick={handleDone}
          >
            {onlyIcon ? (
              <CheckIcon className="w-5" />
            ) : (
              onDoneText ?? 'Confimar'
            )}
          </Button>
        </header>
        <div className="overflow-y-auto h-full">
          <div
            style={{
              width: width === 'screen' ? '100%' : width,
              height: heigth === 'screen' ? '100%' : heigth
            }}
            className="modal-content-media h-full"
          >
            {children}
          </div>
        </div>
        {!hiddenFooter && (
          <footer className="font-medium border-t bg-neutral-100 border-neutral-200/80 max-900:hidden relative divide-neutral-700/80 flex">
            <button
              onClick={handleCancel}
              className="w-full disabled:opacity-60 text-neutral-300 p-3"
              {...onCancelProps}
            >
              {onCancelText ?? 'Cancelar'}
            </button>
            <div className="relative w-full">
              {isPending && (
                <div className="absolute z-[1] justify-center bg-neutral-100 backdrop-blur-md inset-0 grid place-content-center">
                  <span className="mx-auto">
                    <LineLoading className="text-neutral-400" size={20} />
                  </span>
                </div>
              )}
              <button
                onClick={handleDone}
                className="w-full z-[0] relative disabled:opacity-60 disabled:text-neutral-500 text-blue-500 p-3 font-semibold"
                {...onDoneProps}
              >
                {onDoneText ?? 'Guardar'}
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  )
}
