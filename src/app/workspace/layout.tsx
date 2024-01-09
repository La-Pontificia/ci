import SetAuth from 'app/(me)/setAuth'
import Sidebar from 'components/workspace/sidebar'
import { getUserById } from 'libs/server'
import { cookies } from 'next/headers'
import React from 'react'

type Props = {
  children?: React.ReactNode
}

async function LayoutWorkspace({ children }: Props) {
  const storeCookie = cookies()
  const id = storeCookie.get('user_id')?.value ?? ''
  const user = await getUserById(id)
  if (!user) return null

  return (
    <>
      <SetAuth
        user={{
          ...user,
          created_at: new Date()
        }}
      />
      <Sidebar />
      {children}
    </>
  )
}

export default LayoutWorkspace
