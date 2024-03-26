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
      <Suspense>
        <RecordsReports searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
