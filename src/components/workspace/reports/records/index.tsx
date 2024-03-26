import { getRecords } from 'libs/server/record'
import React from 'react'
import { RecordReportClient } from './client'

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

  const records = await getRecords(from, to, cubicle, tenant)
  return (
    <div className=" pt-0">
      <RecordReportClient records={records} />
    </div>
  )
}
