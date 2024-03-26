'use client'

import React from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import { type AuthErrorNextAuth } from 'types'
import { handleErrorNextAuth } from 'utils'
import { MicrosoftIcon } from 'icons'
import { usePending } from 'hooks/usePending'

function LoginButton() {
  const session = useSession()
  const router = useRouter()
  const { isPending, start } = usePending(false)
  const searchParams = useSearchParams()

  const auth = session.status === 'authenticated'

  const signInFetch = async () => {
    if (auth) return router.push('/me')
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
      <div className="flex gap-3 [animation-delay:500ms] animate-fade-in-right mt-5 ">
        <button
          disabled={isPending}
          onClick={signInFetch}
          aria-hidden={isPending}
          className="border-neutral-700 max-700:w-full px-6 aria-hidden:animate-pulse aria-hidden:opacity-50 text-white transition-all border divide-x divide-neutral-400 relative overflow-hidden rounded-full justify-center flex items-center p-3 py-2 gap-4 font-medium"
        >
          {auth ? (
            <div>
              <h2>Ir a mi cuenta</h2>
            </div>
          ) : (
            <div className="flex gap-2">
              <MicrosoftIcon className="w-4" />
              <h2>Iniciar sesión</h2>
              {/* <div className="flex items-center">
                <MicrosoftIcon className="w-10" />
              </div>
              <div className="text-left pl-4">
                <span className="text-sm opacity-70">
                  Inicia sesión con tu{' '}
                </span>
                <h2>Cuenta institucional</h2>
              </div> */}
            </div>
          )}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm pt-3">{errorMessage}</div>}
    </>
  )
}

export default LoginButton
