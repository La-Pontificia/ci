'use client'

import React, { useEffect } from 'react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { type AuthErrorNextAuth } from 'types'
import { handleErrorNextAuth } from 'utils'
import { toast } from 'sonner'
import { ToastContainer } from 'commons/sonner'
import { MicrosoftIcon } from 'icons'
import { usePending } from 'hooks/usePending'

function LoginButton() {
  const { isPending, start } = usePending(false)
  const searchParams = useSearchParams()

  const signInFetch = async () => {
    start()
    try {
      await signIn('azure-ad')
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    const error = searchParams.get('error') as AuthErrorNextAuth
    const errorMessage = handleErrorNextAuth(error)
    if (error) {
      toast(ToastContainer(errorMessage))
    }
  }, [searchParams])

  return (
    <div className="w-[400px] mx-auto mt-5">
      <button
        disabled={isPending}
        onClick={signInFetch}
        aria-hidden={isPending}
        className="border-neutral-400 aria-hidden:animate-pulse aria-hidden:opacity-50 text-neutral-300 transition-all border divide-x divide-neutral-400 relative overflow-hidden rounded-full w-full justify-center flex items-center p-3 py-2 gap-4 font-medium px-3"
      >
        <div className="flex items-center">
          <span className="w-10">
            <Image width={55} height={55} src="/only-logo.png" alt="logo-elp" />
          </span>
          <span className="px-2">+</span>
          <MicrosoftIcon className="w-10" />
        </div>
        <div className="text-left pl-4">
          <span className="text-sm opacity-70">Inicia sesión con tu </span>
          <h2>Cuenta institucional</h2>
        </div>
      </button>
    </div>
  )
}

export default LoginButton
