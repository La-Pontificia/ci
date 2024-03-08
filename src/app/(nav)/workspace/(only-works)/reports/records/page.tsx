import { RecordsReports } from 'components/workspace/reports/records'
import { Nav } from 'components/workspace/reports/records/nav'
import React, { Suspense } from 'react'

export default function Records({
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
    <div className="p-2">
      <Nav />
      <Suspense
        key={`report-${searchParams.from} ${searchParams.to}`}
        fallback={
          <div className="p-4">
            <div className="w-full grid grid-cols-3">
              <div className="bg-stone-200 animate-pulse col-span-3 rounded-2xl h-[250px] " />
            </div>
            <div className="grid-cols-4 max-1500:grid-cols-2 max-900:grid-cols-1 grid pt-4 gap-3">
              <div className="bg-stone-200 animate-pulse rounded-2xl h-[400px] " />
              <div className="bg-stone-200 animate-pulse rounded-2xl h-[400px] " />
              <div className="bg-stone-200 animate-pulse rounded-2xl h-[400px] " />
            </div>
          </div>
        }
      >
        <RecordsReports searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
