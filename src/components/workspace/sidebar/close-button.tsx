'use client'

import { Button } from 'commons/button'
import { XmarkIcon } from 'icons'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

function CloseButton() {
  const router = useRouter()
  const pathaname = usePathname()
  const isHome = pathaname === '/workspace'

  if (isHome) return null
  return (
    <div className="fixed z-10 left-2 top-2">
      <Button
        onClick={() => {
          router.push('/workspace')
        }}
        className="w-10 p-2 rounded-full bg-neutral-200 hover:bg-neutral-300"
        variant="none"
      >
        <XmarkIcon />
      </Button>
    </div>
  )
}

export default CloseButton
