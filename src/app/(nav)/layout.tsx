import Nav from 'components/nav'
import { authOptions } from 'libs/next-auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import SetAuth from './setAuth'
import Page404 from 'components/404'

type Props = { children: React.ReactNode }

export default async function layout({ children }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.account) return <Page404 />

  return (
    <main className="h-full flex flex-col">
      <SetAuth
        user={{
          ...session.account,
          _id: session.account._id.toString()
        }}
      />
      <Nav />
      <div className="flex-grow z-10 mt-16 h-full">{children}</div>
    </main>
  )
}
