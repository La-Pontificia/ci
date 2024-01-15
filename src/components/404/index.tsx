import React from 'react'
import Logout from './logout'

function Page404() {
  return (
    <div className="h-screen w-full text-center text-neutral-400 grid place-content-center">
      <h3 className=" font-semibold">OPS, ocurrio un problema</h3>
      <p className="pb-10">Intenta iniciar sesion nuevamente</p>
      <Logout />
    </div>
  )
}

export default Page404
