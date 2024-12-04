import React, { Suspense } from 'react'
import SearchUser from './search'
import Users from 'components/users'
import { PortraitUserIcon } from 'icons'
import Filters from './Filters'
import { ImportDialog } from 'components/users/import-dialog'

export type Props = {
  searchParams: {
    q: string | undefined
    tenant: string | undefined
    type: string | undefined
    status: string | undefined
  }
}

export const metadata = {
  title: 'Usuarios | Centro de Informacion La Pontificia'
}

function UsersPage(props: Props) {
  const {
    searchParams: { q }
  } = props
  return (
    <div className=" p-10 w-full">
      <SearchUser placeholder="Buscar por correo, nombres ..." searchParams />
      <div className="py-2 flex items-center gap-2">
        <div className="flex-grow">
          <Filters searchParams={props.searchParams} />
        </div>
        <ImportDialog />
      </div>
      <Suspense
        key={`query-${q}`}
        fallback={
          <div className="h-full p-20 mt-20">
            <PortraitUserIcon className="w-10 animate-rotational-wave mx-auto" />
            <h2 className="text-lg opacity-70 font-semibold block text-center">
              Cargando contenido
            </h2>
          </div>
        }
      >
        <Users searchParams={props.searchParams} />
      </Suspense>
    </div>
  )
}

export default UsersPage
