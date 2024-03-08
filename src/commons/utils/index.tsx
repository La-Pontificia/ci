'use client'

import React from 'react'
import { Toaster } from 'sonner'

// import { CategoryScale } from 'chart.js'
// import Chartt from 'chart.js/auto'
// Chartt.register(CategoryScale)

export const ToastContainer = (text: string) => (
  <div className="bg-white mx-auto flex justify-center text-center text-black rounded-md shadow-lg text-base font-semibold p-3 px-4">
    {text}
  </div>
)

function SonnerClient() {
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
