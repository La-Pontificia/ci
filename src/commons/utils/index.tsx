'use client'

import React from 'react'
import { Toaster } from 'sonner'
// import AOS from 'aos'

export const ToastContainer = (text: string) => (
  <div className="bg-white mx-auto flex justify-center text-center text-black rounded-md shadow-lg text-base font-semibold p-3 px-4">
    {text}
  </div>
)

function SonnerClient() {
  // useEffect(() => {
  //   AOS.init()
  // }, [])

  return (
    <Toaster
      theme="light"
      position="bottom-center"
      toastOptions={{
        style: {
          zIndex: '999',
          border: 0,
          margin: 0,
          boxShadow: 'none',
          backgroundColor: 'transparent',
          padding: 0
        }
      }}
    />
  )
}

export default SonnerClient
