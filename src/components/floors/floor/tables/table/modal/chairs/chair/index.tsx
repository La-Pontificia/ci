import { Button } from 'commons/button'
import { AddCircleIcon } from 'icons'
import React from 'react'
import { type TableCurrentUser } from 'types/table'
import RemainingTime from './remaining-time'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { getUserProfile } from 'utils'
import Image from 'next/image'
import { useChair } from './hook'
import { useModalTable } from '../../state'

export type Props = {
  table: NewTypeTable
  currentUser?: TableCurrentUser
  index: number
}

export type TypeForm = {
  from: string
  to: string
}

function Chair(props: Props) {
  const { currentUser, onRemove } = useChair(props)

  return (
    <div
      className={`relative z-[1] ${
        props.table.type === 'pc'
          ? 'w-[450px] h-[250px]'
          : 'w-[190px] aspect-square'
      }`}
    >
      {currentUser && (
        <Button
          variant="black"
          isFilled
          onClick={onRemove}
          className="absolute text-sm top-2 left-[50%] rounded-xl translate-x-[-50%] z-[2]"
        >
          Remover {props.table.accept_mutiple && 'usuario y acompañantes'}
        </Button>
      )}
      <Button
        onClick={() => {
          if (currentUser) return
          useModalTable.getState().setPage('search')
          useModalTable.getState().setChairSelected(props.index)
        }}
        data-occupied={!!currentUser}
        className={
          'h-full z-[1] w-full data-[occupied=true]:cursor-default data-[occupied=true]:bg-green-400/40 dark:data-[occupied=true]:bg-green-300/20 grid place-content-center relative bg-neutral-200/80 dark:bg-neutral-700/80 hover:dark:bg-neutral-700 hover:border-neutral-800 border border-transparent rounded-2xl'
        }
        variant="none"
      >
        <div className="absolute text-sm tracking-tight top-3 left-3 text-neutral-800 dark:text-neutral-200 font-medium">
          {props.index}
        </div>
        {currentUser ? (
          <>
            <span className="absolute top-4 right-4 w-[10px] animate-ping h-[10px] bg-green-600 rounded-full"></span>
            <span className="absolute top-4 right-4 w-[10px] h-[10px] bg-green-600 rounded-full"></span>
            <div>
              <div
                className={
                  'w-[70px] h-[70px] mx-auto relative z-10 overflow-hidden rounded-full'
                }
              >
                <Image
                  width={70}
                  height={70}
                  className="w-full h-full object-cover"
                  src={getUserProfile(currentUser?.user.image)}
                  alt={currentUser?.user.names}
                />
              </div>
              <p className="text-base line-clamp-2 leading-5 text-center pt-2 capitalize block">
                {currentUser.user.names.toLowerCase()}
              </p>
              <span className="text-xs text-center opacity-80 block">
                {currentUser.user.email}
              </span>
            </div>
            <RemainingTime currentUser={currentUser} />
          </>
        ) : (
          <div className="text-neutral-800 dark:text-neutral-300">
            <AddCircleIcon className="w-10" />
          </div>
        )}
      </Button>
    </div>
  )
}

export default Chair
