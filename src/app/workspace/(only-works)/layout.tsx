import SetAuth from 'app/(me)/setAuth'
import Unathorizate from 'components/401'
import Page404 from 'components/404'
import Footer from 'components/me/footer'
import Tabs from 'components/workspace/tabs'
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
  if (!user) return <Page404 />
  if (!user.is_active) return <Unathorizate user={user} />

  return (
    <>
      <SetAuth
        user={{
          ...user,
          _id: user._id.toString()
        }}
      />
      <div className="flex min-h-screen flex-col">
        <div className="flex-grow">
          <Tabs />
          {children}
        </div>
        <Footer />
      </div>
    </>
  )
}

export default LayoutWorkspace
