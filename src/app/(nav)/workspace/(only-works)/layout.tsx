import Sidebar from 'components/workspace/sidebar'
import { type Metadata } from 'next'
import React from 'react'

type Props = {
  children?: React.ReactNode
}

export function metadata(): Metadata {
  return {
    title: 'Workspace | Centro de Informacion La Pontificia',
    description: 'Workspace | Centro de Informacion La Pontificia'
  }
}

async function LayoutWorkspace({ children }: Props) {
  return (
    <div className="flex flex-grow h-full">
      <Sidebar />
      <div className="flex-grow ml-28 flex flex-col"> {children}</div>
    </div>
  )
}

export default LayoutWorkspace
