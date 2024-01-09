'use client'

import { useAuth } from 'stores'
import { type User } from 'types'

type Props = {
  user: User
}

function SetAuth({ user }: Props) {
  const set = useAuth((store) => store.setSession)
  set(user)
  return null
}

export default SetAuth
