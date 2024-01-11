import { LineLoading } from 'commons/loading/line'
import React from 'react'

function Loading() {
  return (
    <div className="h-screen grid place-content-center">
      <div className="grid place-content-center h-full w-full">
        <LineLoading size={20} className="text-neutral-300" />
      </div>
    </div>
  )
}

export default Loading
