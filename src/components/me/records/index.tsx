import { authOptions } from 'libs/next-auth'
import { getRecordsByUserId } from 'libs/server/record'
import { getServerSession } from 'next-auth'
import React from 'react'
import { Record } from './record'

export async function RecordPage() {
  const session = await getServerSession(authOptions)
  if (!session?.account) return null
  const records = await getRecordsByUserId(session?.account?._id)

  return (
    <div className="p-2 h-full ">
      {records.length > 0 ? (
        <div>
          <h1 className="text-lg font-semibold pb-3">
            Historial de asistencia
          </h1>
          <div className="flex space-y-3 flex-col">
            {records.map((record) => (
              <Record key={record._id.toString()} record={record} />
            ))}
          </div>
        </div>
      ) : (
        <div className="h-full grid place-content-center text-center">
          <h1 className="text-lg font-semibold pb-3">
            Hola, {session.account.nick_name.split(' ')[0]}
          </h1>
          <p className="text-sm max-w-[35ch]">
            Aun no cuenta con un historial de asistencia a los centros de
            información. 🪶
          </p>
        </div>
      )}
    </div>
  )
}
