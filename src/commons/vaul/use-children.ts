import React from 'react'
import {
  type VaulProps,
  type VaulContentProps,
  type VaulTriggerProps,
  type VaulHandlerProps,
  type VaulOverlayProps
} from './types'
import { content, trigger, handler, overlay } from '.'

export const useChildren = (props: VaulProps) => {
  let triggerProps: VaulTriggerProps = {}
  let triggerAsChild: React.ReactElement | undefined
  let contentChildProps: VaulContentProps = {}
  let handlerChildProps: VaulHandlerProps = {}
  let overlayChildProps: VaulOverlayProps = {}

  React.Children.forEach(props.children, (child) => {
    if (!React.isValidElement(child)) return

    if (child.type === trigger) {
      triggerProps = child.props as VaulTriggerProps
      triggerAsChild = triggerProps.children as React.ReactElement
    }

    if (child.type === content) {
      contentChildProps = child.props as VaulContentProps
    }

    if (child.type === overlay) {
      overlayChildProps = child.props as VaulOverlayProps
    }

    if (child.type === handler) {
      handlerChildProps = child.props as VaulHandlerProps
    }
  })

  return {
    triggerProps,
    triggerAsChild,
    contentChildProps,
    handlerChildProps,
    overlayChildProps
  }
}
