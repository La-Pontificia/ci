import React from 'react'
import Logout from './logout'

async function Page404() {
  return (
    <div className="h-svh bg-stone-200 w-full text-center text-black grid place-content-center">
      <img
        width={200}
        className="mx-auto"
        src="/optimize/homero-401.webp"
        alt="Homero molesto"
      />
      <h3 className="text-3xl">OOPS 🛡️, ocurrio un problema</h3>
      <p className="pb-10 pt-5 text-stone-500">
        Intenta iniciar sesion nuevamente
      </p>
      <Logout />
    </div>
  )
}

export default Page404
