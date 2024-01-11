'use client'

import { useRemainingTime } from 'hooks/useReminingTime'
import React from 'react'
import { type TableCurrentUser } from 'types/table'

type Props = {
  currentUser: TableCurrentUser
}

function RemainingTime({ currentUser }: Props) {
  const { remainingTime } = useRemainingTime(currentUser.from, currentUser.to)

  return (
    <>
      <div className="absolute mx-auto left-[50%] translate-x-[-50%] bottom-1">
        <p className="text-center text-xs text-neutral-400 font-medium pt-2">
          {remainingTime}
        </p>
      </div>
    </>
  )
}

export default RemainingTime
