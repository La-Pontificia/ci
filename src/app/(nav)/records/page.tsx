import { Records } from 'components/records'
import { Nav } from 'components/records/nav'
import { Chart2Icon } from 'icons'
import { Suspense } from 'react'

export default function page({
  searchParams
}: {
  searchParams: {
    from: string
    to: string
    cubicle: string
    tenant: string
  }
}) {
  return (
    <div className="p-7">
      <h2 className="text-3xl font-semibold pb-4">
        Reporte y gráficas de registros de asistencia
      </h2>
      <Nav />
      <Suspense
        key={`query-${searchParams.from}-${searchParams.to}-${searchParams.cubicle}-${searchParams.tenant}`}
        fallback={
          <div className="h-full p-20 mt-20">
            <Chart2Icon className="w-10 animate-rotational-wave mx-auto" />
            <h2 className="text-lg opacity-70 font-semibold block text-center">
              Cargando contenido
            </h2>
          </div>
        }
      >
        <Records searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
