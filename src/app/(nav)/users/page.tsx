import React, { Suspense } from 'react'
import SearchUser from './search'
import Users from 'components/users'
import { UploadFile } from 'components/users/upload'
import { PortraitUserIcon } from 'icons'

export type Props = {
  searchParams: {
    q: string | undefined
    tenant: string | undefined
    type: string | undefined
    status: string | undefined
  }
}

function UsersPage(props: Props) {
  const {
    searchParams: { q }
  } = props
  return (
    <div className=" p-10 w-full">
      <SearchUser placeholder="Buscar por correo, nombres ..." searchParams />
      <UploadFile searchParams={props.searchParams} />
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
