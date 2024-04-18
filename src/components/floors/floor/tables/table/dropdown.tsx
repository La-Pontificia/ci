'use client'

import React from 'react'
import { cn } from 'utils'
import { DropDown, DropDownItem } from 'commons/drop-down'
import { MoreHorizonralIcon } from 'icons'
import axios from 'axios'
import { useTables, type NewTypeTable } from 'stores/tables/tables.store'
import { toast } from 'sonner'
import AddOrEditPable from '../../add-or-edit'

function DropDownTable({ table }: { table: NewTypeTable }) {
  const tables = useTables((store) => store.tables)
  const setTables = useTables((store) => store.setTables)

  const onDelete = async () => {
    try {
      await axios.delete(
        `/api/floors/${table.floor._id.toString()}/tables/${table._id}`
      )
      setTables(tables.filter((e) => e._id !== table._id))
      toast.success('Cubículo eliminado')
    } catch (error) {
      console.log(error)
    }
  }

  const onToggleEnabled = async () => {
    try {
      await axios.patch(
        `/api/floors/${table.floor._id.toString()}/tables/${table._id}`,
        {
          status: !table.status
        }
      )
      setTables(
        tables.map((t) => {
          if (t._id === table._id) {
            return {
              ...t,
              status: !table.status
            }
          }
          return t
        })
      )
      toast.success('Estado cambiado del Cubículo')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <DropDown
      triggerButton={({ open }) => (
        <button
          className={cn(
            'w-[30px] h-[30px] group-hover:opacity-100 opacity-0 text-neutral-700 p-1 bg-white shadow-xl rounded-full',
            open && 'text-black opacity-100'
          )}
        >
          <MoreHorizonralIcon />
        </button>
      )}
    >
      <AddOrEditPable
        initial={table}
        trigger={<DropDownItem sencible>Editar</DropDownItem>}
      />
      <DropDownItem sencible>Historial</DropDownItem>
      <DropDownItem sencible onClick={onToggleEnabled}>
        {table.status ? 'Deshabilitar' : 'Habilitar'}
      </DropDownItem>
      <DropDownItem sencible onClick={onDelete}>
        Eliminar
      </DropDownItem>
    </DropDown>
  )
}

export default DropDownTable
