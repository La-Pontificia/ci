'use client'

import { type NewTypeUser, useAuth } from 'stores'

type Props = {
  user: NewTypeUser
}

function SetAuth({ user }: Props) {
  const set = useAuth((store) => store.setSession)
  set(user)
  return null
}

export default SetAuth
