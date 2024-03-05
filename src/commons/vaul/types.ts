export interface VaulProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'title'> {
  trigger?: React.ReactNode
  defaultOpen?: boolean
  footer?: React.ReactNode | ((d: VaulChildReturn) => React.ReactNode)
  position?: 'left' | 'right' | 'top' | 'bottom'
  title?: React.ReactNode
  children?: React.ReactNode
  resetStyles?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
}
export interface VaulChildReturn {
  open?: boolean
  onOpen?: () => void
  onClose?: () => void
}

export interface UseVaulProps {
  props: VaulProps
  handlerRef: React.RefObject<HTMLDivElement>
  contentRef: React.RefObject<HTMLDivElement>
}

export interface VaulTriggerProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
}

export interface VaulContentProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  children?: React.ReactNode | ((d: VaulChildReturn) => React.ReactNode)
}

export interface VaulOverlayProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export interface VaulHandlerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: React.ReactNode
}
