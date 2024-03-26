'use client'

import { Button } from 'commons/button'
import { CAREERS } from '../../../../../constants'
import { format } from 'date-fns'
import React from 'react'
import { type NewRecord, useRecords } from 'stores'

import * as XLSX from 'xlsx'
import { calculateDurationByDates } from 'utils'

const getMapping = (records: NewRecord[]) =>
  records.map((record, i) => {
    const turno =
      new Date(record.current.from).getHours() >= 8 &&
      new Date(record.current.from).getHours() < 12
        ? 'TM'
        : 'TT'
    const time = calculateDurationByDates(
      new Date(record.current.from),
      new Date(record.created_at)
    )

    return {
      'N°': i + 1,
      Fecha: format(record.created_at, 'dd/MM/yyyy'),
      Encargado: record.responsible?.nick_name ?? '-',
      Codigo: record.current.user.dni,
      Nombre: record.current.user.names,
      Carrera: record.current.user.career
        ? `${record.current.user.career}:${CAREERS[record.current.user.career]}`
        : '-',
      Seccion: '-',
      Ciclo: '-',
      Periodo: '-',
      Institucion: record.current.user.tenant.toLocaleUpperCase(),
      'Correo institucional': record.current.user.email,
      Celular: '-',
      'Tipo de Cliente':
        record.current.user.type_user === 'executive'
          ? 'Ejecutivo'
          : record.current.user.type_user === 'student'
          ? 'Estudiante'
          : 'Docente',
      Sede: record.table.floor.name,
      'Tipo de servicio':
        record.table.type === 'pc' ? 'Computadora' : 'Mesa Grupal',
      'Numero de maquina':
        record.current.type_of_use === 'companion'
          ? 'Acompañante'
          : record.table.name,
      'Hora de Ingreso': format(record.current.from, 'HH:mm a'),
      'Hora de Salida': format(record.current.to, 'HH:mm a'),

      Turno: turno,
      'Tiempo de uso': time
    }
  })

export function ExportExcel() {
  const records = useRecords((store) => store.records)

  const onExport = () => {
    const exportRecords = getMapping(records)
    const ws = XLSX.utils.json_to_sheet(exportRecords)
    const wb = XLSX.utils.book_new()
    ws['!cols'] = [{ level: 1 }] // Set the width of the columns to 15 and enable auto width for justification
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencias')
    XLSX.writeFile(
      wb,
      `Asistencias ${format(new Date(), 'dd-MM-yyyy')}` + '.xlsx'
    )
  }

  return (
    <Button
      onClick={onExport}
      isFilled
      className="rounded-xl flex items-center gap-2 justify-center p-1.5 px-5"
      variant="black"
    >
      <svg className="w-5" viewBox="0 0 24 24" fill="none">
        <path
          d="M7 19.63C6.00797 19.6274 5.05718 19.2328 4.35478 18.5323C3.65237 17.8318 3.25527 16.882 3.25 15.89V13.39C3.24998 13.1902 3.32868 12.9984 3.46905 12.8561C3.60942 12.7139 3.80017 12.6326 4 12.63C4.19811 12.6326 4.38737 12.7124 4.52747 12.8525C4.66756 12.9926 4.74741 13.1819 4.75 13.38V15.88C4.75522 16.4751 4.99395 17.0444 5.41478 17.4652C5.83561 17.8861 6.40488 18.1248 7 18.13H17C17.295 18.13 17.5871 18.0717 17.8595 17.9585C18.132 17.8453 18.3793 17.6795 18.5875 17.4704C18.7956 17.2613 18.9604 17.0132 19.0724 16.7403C19.1843 16.4674 19.2413 16.175 19.24 15.88V13.38C19.2344 13.2778 19.2501 13.1756 19.2861 13.0797C19.322 12.9839 19.3775 12.8966 19.4489 12.8233C19.5203 12.75 19.6062 12.6923 19.701 12.6539C19.7959 12.6154 19.8977 12.5971 20 12.6C20.0988 12.5958 20.1973 12.6121 20.2895 12.6476C20.3817 12.6832 20.4656 12.7374 20.536 12.8068C20.6063 12.8763 20.6617 12.9594 20.6985 13.0512C20.7353 13.1429 20.7528 13.2412 20.75 13.34V15.84C20.7526 16.3337 20.6575 16.823 20.4701 17.2797C20.2827 17.7364 20.0068 18.1515 19.6582 18.5011C19.3095 18.8506 18.8952 19.1277 18.4389 19.3163C17.9827 19.5049 17.4937 19.6013 17 19.6H7V19.63Z"
          fill="currentColor"
        ></path>
        <path
          d="M12 16.12C11.8019 16.1174 11.6126 16.0376 11.4725 15.8975C11.3324 15.7574 11.2526 15.5681 11.25 15.37V6.37C11.2487 6.27114 11.2671 6.17301 11.3044 6.08141C11.3416 5.9898 11.3968 5.90659 11.4667 5.83668C11.5366 5.76676 11.6198 5.71157 11.7114 5.67435C11.803 5.63714 11.9011 5.61866 12 5.62C12.1972 5.61999 12.3865 5.69763 12.5268 5.83613C12.6672 5.97462 12.7474 6.16283 12.75 6.36V15.36C12.75 15.5598 12.6713 15.7517 12.531 15.8939C12.3906 16.0361 12.1998 16.1174 12 16.12Z"
          fill="currentColor"
        ></path>
        <path
          d="M7.74 10.13C7.59381 10.1254 7.45206 10.0787 7.33175 9.99554C7.21143 9.91237 7.11767 9.79626 7.06172 9.66112C7.00577 9.52599 6.98999 9.37758 7.0163 9.2337C7.0426 9.08983 7.10986 8.95659 7.21 8.85L11.44 4.59C11.5836 4.4513 11.7754 4.37378 11.975 4.37378C12.1746 4.37378 12.3664 4.4513 12.51 4.59L16.76 8.82C16.9005 8.96062 16.9793 9.15125 16.9793 9.35C16.9793 9.54875 16.9005 9.73937 16.76 9.88C16.6194 10.0204 16.4288 10.0993 16.23 10.0993C16.0313 10.0993 15.8406 10.0204 15.7 9.88L12 6.18L8.28 9.9C8.20974 9.97222 8.12581 10.0297 8.0331 10.0692C7.9404 10.1087 7.84077 10.1294 7.74 10.13Z"
          fill="currentColor"
        ></path>
      </svg>
      Exportar {records.length} registros
    </Button>
  )
}
