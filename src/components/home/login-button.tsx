'use client'

import React from 'react'
import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'
import { type AuthErrorNextAuth } from 'types'
import { handleErrorNextAuth } from 'utils'
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

  const error = searchParams.get('error') as AuthErrorNextAuth
  const errorMessage = handleErrorNextAuth(error)

  return (
    <>
      <div className="justify-center max-700:flex-col items-center flex gap-3 mt-5">
        <button
          disabled={isPending}
          onClick={signInFetch}
          aria-hidden={isPending}
          className="border-neutral-400 max-700:w-full w-[400px] aria-hidden:animate-pulse aria-hidden:opacity-50 text-neutral-300 transition-all border divide-x divide-neutral-400 relative overflow-hidden rounded-full justify-center flex items-center p-3 py-2 gap-4 font-medium px-3"
        >
          <div className="flex items-center">
            <MicrosoftIcon className="w-10" />
          </div>
          <div className="text-left pl-4">
            <span className="text-sm opacity-70">Inicia sesión con tu </span>
            <h2>Cuenta institucional</h2>
          </div>
        </button>
      </div>
      {error && <div className="text-red-500 text-sm pt-3">{errorMessage}</div>}
    </>
  )
}

export default LoginButton
