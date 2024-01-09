'use client'

import ReactDOM from 'react-dom'

export type PortalProps = {
  children?: React.ReactNode
  isVisible?: boolean
}

export const Portal = ({ children, isVisible }: PortalProps) => {
  if (typeof document !== 'undefined') {
    const portal: HTMLElement | null = document.querySelector('body')
    if (!portal) return null
    if (!isVisible) return null
    return ReactDOM.createPortal(children, portal)
  }
}
