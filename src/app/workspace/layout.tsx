import SetAuth from 'app/(me)/setAuth'
import Sidebar from 'components/workspace/sidebar'
import { getUserByIdentifier } from 'libs/server'
import { type Metadata } from 'next'
import { cookies } from 'next/headers'
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
  const storeCookie = cookies()
  const id = storeCookie.get('uft-ln')?.value ?? ''
  const user = await getUserByIdentifier(id)
  if (!user) return null

  return (
    <>
      <SetAuth
        user={{
          ...user,
          _id: user._id.toString()
        }}
      />
      <Sidebar />
      {children}
    </>
  )
}

export default LayoutWorkspace
