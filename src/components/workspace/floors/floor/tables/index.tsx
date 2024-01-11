import React, { useEffect } from 'react'
import { useFloor } from 'stores'
import { useTables } from 'stores/tables/tables.store'
import Table from './table'
import HiddenChairs from './hidden'

function Tables() {
  const floor = useFloor((store) => store.floor)
  if (!floor) return null
  const unsuscribte = useTables((store) => store.subscribeToApi)
  const tables = useTables((store) => store.tables)
  if (!floor) return null

  useEffect(() => {
    const unsubscribeFromApi = unsuscribte(floor._id)
    return () => {
      unsubscribeFromApi()
    }
  }, [])

  return tables.map((table) => {
    return (
      <>
        <HiddenChairs table={table} />
        <Table table={table} key={table._id} />
      </>
    )
  })
}

export default Tables
