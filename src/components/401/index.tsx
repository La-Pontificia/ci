import Logout from 'components/404/logout'
import React from 'react'
import { type User } from 'types'

type Props = {
  user: User
}

function Unathorizate({ user }: Props) {
  return (
    <div className="h-screen text-center grid place-content-center">
      <div className="w-[100px] h-[100px] rounded-full overflow-hidden mx-auto">
        <img src={user.image} alt="" className="w-full h-full object-cover" />
      </div>
      <h2 className="text-lg font-semibold pt-3">Hola {user.nick_name}</h2>
      <p className="text-sm">Tu cuenta se encuentra inactiva</p>
      <Logout />
    </div>
  )
}

export default Unathorizate
