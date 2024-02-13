import React from 'react'
import User from './user'
import { getUsers } from 'libs/server'
import { type Props } from 'app/workspace/(only-works)/users/page'

async function Users({ searchParams }: Props) {
  const { q, status, tenant, type } = searchParams
  const users = await getUsers(
    q,
    q ? 20 : 4,
    tenant,
    type,
    status === 'active' ? true : status === 'inactive' ? false : undefined
  )
  return (
    <div className="max-w-3xl mx-auto py-5 w-full">
      <div className="flex flex-col">
        {users.length > 0 ? (
          <div>
            {users.map((user) => (
              <User
                user={{ ...user, _id: user._id.toString() }}
                key={user._id.toString()}
              />
            ))}
            <p className="p-2 text-sm">
              Por favor escribe en el formulario de busqueda si desea ver un
              usuario en específico
            </p>
          </div>
        ) : (
          <div className="text-neutral-800 p-20 grid place-content-center">
            No hay nada que mostrar
          </div>
        )}
      </div>
    </div>
  )
}

export default Users
