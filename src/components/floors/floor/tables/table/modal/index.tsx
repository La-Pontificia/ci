import React from 'react'
import { type NewTypeTable } from 'stores/tables/tables.store'
import { useModalTable } from './state'
import Chairs from './chairs'
import SearchUser from './search-user'
import { ArroLeftIcon, BroomIcon } from 'icons'
import Configure from './configure'
import { AddNewUser } from './add-new-user'
import { Button } from 'commons/button'
import { useChairs } from './use-chairs'

type Props = { table: NewTypeTable; isReserved: boolean }

export default function ModalContent({ table, isReserved }: Props) {
  const page = useModalTable((store) => store.page)
  const chair = useModalTable((store) => store.chairSelected)
  const isCompanion = useModalTable((store) => store.isCompanion)
  const back = () => {
    useModalTable
      .getState()
      .setPage(
        page === 'search'
          ? 'home'
          : page === 'configure'
          ? 'search'
          : page === 'create'
          ? 'search'
          : 'home'
      )
    page === 'search' && useModalTable.getState().setChairSelected(null)
    isCompanion && useModalTable.getState().setIsCompanion(false)
  }

  const { onRemoveAll } = useChairs({
    table
  })

  const hasUsers = table.current_users.length > 0

  return (
    <React.Fragment>
      {page === 'home' && hasUsers && table.type === 'table' && (
        <Button
          variant="none"
          isFilled
          onClick={onRemoveAll}
          className="absolute flex gap-1 items-center dark:bg-red-700 bg-red-600 text-white hover:dark:bg-red-600 p-2 pr-3 border-0 text-sm top-2 left-2 rounded-full z-[2]"
        >
          <BroomIcon className="w-5" />
          Limpiar mesa
        </Button>
      )}
      {page !== 'home' && (
        <button
          onClick={back}
          className="absolute z-[1] top-2 left-2 dark:text-black dark:bg-neutral-600 hover:dark:bg-neutral-500 bg-neutral-200 hover:bg-neutral-100 rounded-full p-1"
        >
          <ArroLeftIcon className="w-7" />
        </button>
      )}
      <div className="w-full relative h-full flex flex-col divide-neutral-800">
        {isReserved && (
          <div className="absolute z-[1] inset-0 bg-white/60 dark:bg-neutral-900/80 font-semibold text-xl grid place-content-center">
            Mesa/Pc reservado
          </div>
        )}
        <h2 className="text-center pb-4 pt-1 text-lg font-semibold">
          {table.name}
          {chair && !isCompanion ? ` - Silla ${chair}` : ''}
          {isCompanion && ' - Acompañante'}
          <span className="opacity-60">
            {table.room && page === 'home' && ' - Sala'}
            {table.accept_mutiple && page === 'home' && ' - Usuarios multiples'}
            {page === 'search' && ' - Buscar usuario'}
            {page === 'configure' && ' - Configurar Tiempo'}
            {page === 'create' && ' - Crear usuario'}
          </span>
        </h2>
        {page === 'home' && <Chairs table={table} />}
        {page === 'search' && <SearchUser />}
        {page === 'configure' && <Configure table={table} />}
        {page === 'create' && <AddNewUser />}
      </div>
    </React.Fragment>
  )
}
