'use client'

import { Button } from 'commons/button'
import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
  const logout = async () => {
    await signOut()
    window.location.href = '/'
  }

  return (
    <Button
      isFilled
      variant="black"
      className="p-3 rounded-xl"
      onClick={logout}
    >
      Cerrar sesión
    </Button>
  )
}

export default Logout
