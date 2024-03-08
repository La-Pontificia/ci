import { getUserByIdentifier } from 'libs/server'
import { cookies } from 'next/headers'
import React from 'react'
import SetAuth from './setAuth'
import Page404 from 'components/404'
import Unathorizate from 'components/401'

type Props = {
  children?: React.ReactNode
}

async function LayoutMeInclude({ children }: Props) {
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
      {children}
    </>
  )
}

export default LayoutMeInclude
