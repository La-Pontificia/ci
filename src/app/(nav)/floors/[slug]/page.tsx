import React, { Suspense } from 'react'
import { Fetch } from './fetch'

type Props = { params: { slug: string } }

export default function page({ params }: Props) {
  return (
    <Suspense
      key={params.slug}
      fallback={
        <div className="h-screen grid place-content-center">
          <div className="grid place-content-center h-full w-full">
            Cargando...
          </div>
        </div>
      }
    >
      <Fetch params={params} />
    </Suspense>
  )
}
