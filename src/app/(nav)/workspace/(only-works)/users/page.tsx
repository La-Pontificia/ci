import React, { Suspense } from 'react'
import SearchUser from './search'
import Users from 'components/workspace/users'
import Filters from './Filters'
import { LineLoading } from 'commons/loading/line'
import { UploadFile } from 'components/workspace/users/upload'

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
    <div className="max-w-7xl mx-auto px-3 py-2 w-full">
      <SearchUser placeholder="Correo, dni, nombres" searchParams />
      <Filters searchParams={props.searchParams} />
      <UploadFile />
      <Suspense
        key={`query-${q}`}
        fallback={
          <div className="grid place-content-center p-20">
            <LineLoading className="text-black" size={20} />
          </div>
        }
      >
        <Users searchParams={props.searchParams} />
      </Suspense>
    </div>
  )
}

export default UsersPage
