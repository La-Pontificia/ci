import React from 'react'

import { TablesSelect } from './tables'
import { DateRangeNav } from './date-range'
import { TenantSelect } from './tenant'
export function Nav() {
  return (
    <div className="pb-2 flex items-center gap-2">
      <DateRangeNav />
      <TablesSelect />
      <TenantSelect />
    </div>
  )
}
