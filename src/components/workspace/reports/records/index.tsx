import { getRecords } from 'libs/server/record'
import React from 'react'
import { RecordReportClient } from './client'
import { getWekRange } from 'utils'

export async function RecordsReports({
  searchParams
}: {
  searchParams: {
    from: string
    to: string
    cubicle: string
    tenant: string
  }
}) {
  const { from, to, cubicle, tenant } = searchParams
  const [startOfWeek, endOfWeek] = getWekRange()
  if (!from && !to) {
    const records = await getRecords(
      startOfWeek.toDateString(),
      endOfWeek.toDateString(),
      cubicle,
      tenant
    )

    return (
      <div className="pt-0">
        <RecordReportClient recordsStringify={JSON.stringify(records)} />
      </div>
    )
  }
  const records = await getRecords(from, to, cubicle, tenant)
  return (
    <div className="pt-0">
      <RecordReportClient recordsStringify={JSON.stringify(records)} />
    </div>
  )
}
