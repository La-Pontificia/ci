/* eslint-disable valid-typeof */
'use client'

import { Button } from 'commons/button'
import { PlusIcon, ReloadIcon } from 'icons'
import React from 'react'
import { useUpload } from './use-upload'
import Filters from 'app/(nav)/users/Filters'
import { type Props } from 'app/(nav)/users/page'

export function UploadFile(props: Props) {
  const {
    file,
    handleChange,
    invalidObjets,
    isPending,
    onDownloadTemplate,
    onSubmit,
    validObjets
  } = useUpload()
  return (
    <div className="my-2 w-full">
      <div className="flex gap-2 items-center flex-wrap w-full">
        <Filters searchParams={props.searchParams} />
        <label className="rounded-full cursor-pointer bg-transparent border-neutral-500 border-2 border-dashed text-black dark:text-neutral-200 ml-auto px-4 py-3">
          <input
            type="file"
            className="hidden"
            accept=".json"
            onChange={handleChange}
          />
          Importar
        </label>
        <Button
          isFilled
          variant="black"
          className="rounded-full px-4 py-4"
          onClick={onDownloadTemplate}
        >
          Descargar plantilla
        </Button>
      </div>
      {file && (
        <div className="p-3 w-[300px] mt-4 rounded-xl dark:bg-neutral-800 bg-neutral-100">
          <span>Archivo seleccionado: </span>
          <span className="">
            <b>{file.name}</b>
          </span>
          {file && validObjets.length > 0 && (
            <div className="mt-2 flex gap-2 w-full">
              <Button
                loading={isPending}
                onClick={async () => await onSubmit('upload')}
                variant="black"
                className="rounded-xl flex items-center justify-center gap-2 p-4 w-full text-sm"
                isFilled
              >
                <PlusIcon className="w-5" />
                <span>Agregar: {validObjets.length} Usuarios</span>
              </Button>
              <Button
                loading={isPending}
                onClick={async () => await onSubmit('update')}
                variant="white-secondary"
                className="rounded-xl flex items-center justify-center gap-2 p-4 w-full text-sm"
                isFilled
              >
                <ReloadIcon className="w-5" />
                <span>Actualizar: {validObjets.length} Usuarios</span>
              </Button>
            </div>
          )}
          {invalidObjets.length > 0 && (
            <div className="mt-2 max-h-56 p-2 border border-red-600/50 bg-red-700/10 rounded-2xl overflow-y-auto  text-xs">
              <h3 className="text-black">
                Usuarios no válidos: <b>{invalidObjets.length}</b>
              </h3>
              <ul className="space-y-2 text-red-500">
                {invalidObjets.map((obj, index) => (
                  <li key={index} className="text-red-500">
                    <pre>{JSON.stringify(obj, null, 2)}</pre>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
