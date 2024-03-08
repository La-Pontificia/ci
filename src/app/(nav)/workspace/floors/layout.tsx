import { type Metadata } from 'next'
import type React from 'react'

type Props = {
  children?: React.ReactNode
}

export function metadata(): Metadata {
  return {
    title: 'Workspace | Centro de Informacion La Pontificia',
    description: 'Workspace | Centro de Informacion La Pontificia'
  }
}

function LayoutSlug({ children }: Props) {
  return children
}

export default LayoutSlug
