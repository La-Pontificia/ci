/* eslint-disable valid-typeof */
'use client'

import { Button } from 'commons/button'
import { PlusIcon, ReloadIcon } from 'icons'
import React from 'react'
import { useUpload } from './use-upload'

export function UploadFile() {
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
    <div className="my-2">
      <label
        aria-disabled={isPending}
        className="cursor-pointer aria-disabled:pointer-events-none aria-disabled:opacity-50 group"
      >
        <div className="w-full h-32 grid place-content-center group-hover:border-black text-neutral-500 rounded-2xl border-2 border-dashed">
          <div className="text-center space-y-2">
            <input
              type="file"
              className="hidden"
              accept=".json"
              onChange={handleChange}
            />
            <svg
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-8 mx-auto"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6 2.984V2h-.09c-.313 0-.616.062-.909.185a2.33 2.33 0 0 0-.775.53 2.23 2.23 0 0 0-.493.753v.001a3.542 3.542 0 0 0-.198.83v.002a6.08 6.08 0 0 0-.024.863c.012.29.018.58.018.869 0 .203-.04.393-.117.572v.001a1.504 1.504 0 0 1-.765.787 1.376 1.376 0 0 1-.558.115H2v.984h.09c.195 0 .38.04.556.121l.001.001c.178.078.329.184.455.318l.002.002c.13.13.233.285.307.465l.001.002c.078.18.117.368.117.566 0 .29-.006.58-.018.869-.012.296-.004.585.024.87v.001c.033.283.099.558.197.824v.001c.106.273.271.524.494.753.223.23.482.407.775.53.293.123.596.185.91.185H6v-.984h-.09c-.2 0-.387-.038-.563-.115a1.613 1.613 0 0 1-.457-.32 1.659 1.659 0 0 1-.309-.467c-.074-.18-.11-.37-.11-.573 0-.228.003-.453.011-.672.008-.228.008-.45 0-.665a4.639 4.639 0 0 0-.055-.64 2.682 2.682 0 0 0-.168-.609A2.284 2.284 0 0 0 3.522 8a2.284 2.284 0 0 0 .738-.955c.08-.192.135-.393.168-.602.033-.21.051-.423.055-.64.008-.22.008-.442 0-.666-.008-.224-.012-.45-.012-.678a1.47 1.47 0 0 1 .877-1.354 1.33 1.33 0 0 1 .563-.121H6zm4 10.032V14h.09c.313 0 .616-.062.909-.185.293-.123.552-.3.775-.53.223-.23.388-.48.493-.753v-.001c.1-.266.165-.543.198-.83v-.002c.028-.28.036-.567.024-.863-.012-.29-.018-.58-.018-.869 0-.203.04-.393.117-.572v-.001a1.502 1.502 0 0 1 .765-.787 1.38 1.38 0 0 1 .558-.115H14v-.984h-.09c-.196 0-.381-.04-.557-.121l-.001-.001a1.376 1.376 0 0 1-.455-.318l-.002-.002a1.415 1.415 0 0 1-.307-.465v-.002a1.405 1.405 0 0 1-.118-.566c0-.29.006-.58.018-.869a6.174 6.174 0 0 0-.024-.87v-.001a3.537 3.537 0 0 0-.197-.824v-.001a2.23 2.23 0 0 0-.494-.753 2.331 2.331 0 0 0-.775-.53 2.325 2.325 0 0 0-.91-.185H10v.984h.09c.2 0 .387.038.562.115.174.082.326.188.457.32.127.134.23.29.309.467.074.18.11.37.11.573 0 .228-.003.452-.011.672-.008.228-.008.45 0 .665.004.222.022.435.055.64.033.214.089.416.168.609a2.285 2.285 0 0 0 .738.955 2.285 2.285 0 0 0-.738.955 2.689 2.689 0 0 0-.168.602c-.033.21-.051.423-.055.64a9.15 9.15 0 0 0 0 .666c.008.224.012.45.012.678a1.471 1.471 0 0 1-.877 1.354 1.33 1.33 0 0 1-.563.121H10z"
              ></path>
            </svg>
            {file ? (
              <div className="space-x-2">
                <span>Archivo seleccionado: </span>
                <span className="text-black">
                  <b>{file.name}</b>
                </span>
              </div>
            ) : (
              <span className="text-black">
                Importar usuarios <b>.json</b>
              </span>
            )}
          </div>
        </div>
      </label>
      <Button
        isFilled
        variant="black"
        className="rounded-lg mt-2 py-2"
        onClick={onDownloadTemplate}
      >
        Descargar plantilla
      </Button>
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
  )
}
