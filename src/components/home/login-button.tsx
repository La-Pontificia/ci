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
          className="bg-stone-200 max-md:w-full aria-hidden:animate-pulse aria-hidden:opacity-50 text-black transition-all border divide-x relative overflow-hidden rounded-xl justify-center flex items-center p-3 px-4 gap-4 font-bold tracking-tight"
        >
          {auth ? (
            <div>
              <h2>Ir a mi cuenta</h2>
            </div>
          ) : (
            <div className="flex gap-2">
              <MicrosoftIcon className="w-6" />
              <h2>Iniciar sesión</h2>
            </div>
          )}
        </button>
      </div>
      {error && <div className="text-red-500 text-sm pt-3">{errorMessage}</div>}
    </>
  )
}

export default LoginButton
