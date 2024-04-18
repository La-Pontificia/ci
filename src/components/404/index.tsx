import React from 'react'
import Logout from './logout'

async function Page404() {
  return (
    <div className="h-svh bg-black text-white w-full text-center grid place-content-center">
      <h3 className="text-sm">Ocurrio un problema ⚠️</h3>
      <p className="py-2 text-neutral-400">Intenta iniciar sesion nuevamente</p>
      <Logout />
    </div>
  )
}

export default Page404
