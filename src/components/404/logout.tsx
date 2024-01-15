'use client'

import { Button } from 'commons/button'
import { signOut } from 'next-auth/react'
import React from 'react'

function Logout() {
  const logout = async () => {
    await signOut()
  }

  return (
    <Button isFilled variant="white" onClick={logout}>
      Cerrar sesión
    </Button>
  )
}

export default Logout
