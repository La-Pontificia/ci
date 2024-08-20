'use client'

import { Button } from 'commons/button'
import { Dialog } from 'commons/dialog'
import { FiArrowDownCircle } from 'react-icons/fi'
import { useDropzone } from 'react-dropzone'
import * as ExcelJS from 'exceljs'
import { User } from 'types'
import { useState } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'
import { IoReload } from 'react-icons/io5'
import { usePending } from 'hooks/usePending'
import axios from 'axios'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { LineLoading } from 'commons/loading/line'

type Item = {
  email: string
  names: string
  dni: string
  career: string
  type: User['type_user']
  sex: string
}

export function ImportDialog() {
  const { end, isPending, start } = usePending()
  const router = useRouter()
  const [data, setData] = useState<Item[]>([])

  const handleFileChange = async (file: File) => {
    const workbook = new ExcelJS.Workbook()
    await workbook.xlsx.load(await file.arrayBuffer())

    const worksheet = workbook.worksheets[0]
    const jsonData: Array<Record<string, any>> = []

    worksheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return

      const rowValues: Record<string, any> = {}
      row.eachCell((cell, colNumber) => {
        const header =
          worksheet.getRow(1).getCell(colNumber).value?.toString() || ''
        rowValues[header] = cell.value
      })

      jsonData.push(rowValues)
    })

    setData(
      jsonData.map((obj) => {
        const item: Item = {
          email: obj['CORREO INSTITUCIONAL'].toString(),
          names: obj['APELLIDOS Y NOMBRES'].toString(),
          dni: obj.DNI.toString(),
          career: obj.CARRERA.toString(),
          type:
            obj.TIPO.toString() === 'D'
              ? 'teacher'
              : obj.TIPO.toString() === 'A'
              ? 'student'
              : 'executive',
          sex: obj.SEXO.toString()
        }
        return item
      })
    )
  }

  const { getRootProps, open, isDragActive } = useDropzone({
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': [
        '.xlsx'
      ]
    },
    onDropAccepted: (files) => {
      handleFileChange(files[0])
    }
  })

  const downloadTemplate = async () => {
    const uri = '/templates/users-template.xlsx'

    const response = await fetch(uri)
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'users.xlsx'
    a.click()
  }

  const onSubmit = async (t: 'upload' | 'update') => {
    start()
    try {
      if (t === 'update') {
        await axios.patch('/api/import/users', {
          users: data
        })
      } else {
        await axios.post('/api/import/users', {
          users: data
        })
      }
      toast.success(
        `${t === 'update' ? 'Actualizados' : 'Agregados'} correctamente`,
        {
          description: `'Los usuarios han sido ${
            t === 'update' ? 'actualizados' : 'agregados'
          } correctamente'`
        }
      )
      setData([])
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Error al importar usuarios')
    } finally {
      end()
    }
  }

  return (
    <Dialog
      trigger={
        <Button
          variant="none"
          className="p-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-xl text-base flex items-center justify-center gap-2"
        >
          <FiArrowDownCircle size={20} />
          Importar
        </Button>
      }
      className="w-[700px]"
    >
      <div className="space-y-4 flex flex-col overflow-y-auto">
        {isPending && (
          <div className="absolute z-10 backdrop-blur-sm dark:bg-[#171717dd] bg-white/80 inset-0 grid place-content-center">
            <div className="mx-auto pb-3">
              <LineLoading className="w-10" />
            </div>
            <p className="text-center max-w-[25ch] text-sm mx-auto">
              Estamos procesando la información, por favor espere unos segundos.
            </p>
          </div>
        )}
        <h1 className="text-center text-xl font-semibold">Importar usuarios</h1>
        {data.length ? (
          <div className="flex flex-col overflow-y-auto">
            <h2 className="pb-2 text-lg border-b dark:border-neutral-700 mb-2">
              Total de usuarios encontrados: <b>{data.length}</b>
            </h2>
            <div className="max-h-[400px] overflow-y-auto">
              {data.map((item, index) => (
                <div key={index} className="flex p-1 items-center gap-2">
                  <span className="font-semibold block flex-grow text-ellipsis overflow-hidden text-nowrap">
                    {item.names}
                  </span>
                  <span>{item.dni}</span>
                </div>
              ))}
            </div>
            <div className="pt-4 flex items-center gap-3">
              <Button
                variant="none"
                disabled={isPending}
                className="p-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-xl text-base flex items-center justify-center gap-2"
                onClick={open}
              >
                Elejir otro archivo
              </Button>
              <Button
                variant="none"
                disabled={isPending}
                className="p-2.5 bg-blue-500 ml-auto dark:bg-blue-600 text-white rounded-xl text-base flex items-center justify-center gap-2"
                onClick={() => onSubmit('upload')}
              >
                <AiOutlinePlus size={15} />
                Agregar usuarios
              </Button>
              <Button
                variant="none"
                disabled={isPending}
                className="p-2.5 bg-blue-500 dark:bg-blue-600 text-white rounded-xl text-base flex items-center justify-center gap-2"
                onClick={() => onSubmit('update')}
              >
                <IoReload size={15} />
                Actualizar usuarios
              </Button>
            </div>
          </div>
        ) : (
          <div
            {...getRootProps()}
            data-drag={isDragActive}
            className="w-full hover:border-blue-500 data-[drag=true]:border-blue-500 cursor-pointer grid place-content-center min-h-52 border border-neutral-500/50 border-dashed rounded-2xl"
          >
            Suelte aquí o arrastra un archivo XLSX
          </div>
        )}
        <footer>
          <Button
            onClick={downloadTemplate}
            variant="none"
            className="p-2.5 bg-neutral-200 dark:bg-neutral-700 rounded-xl text-base flex items-center justify-center gap-2"
          >
            <FiArrowDownCircle size={20} className="rotate-180" />
            Descargar plantilla
          </Button>
        </footer>
      </div>
    </Dialog>
  )
}
