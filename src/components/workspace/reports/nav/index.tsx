import React from 'react'
import { NavItem } from './item'
import { History2Icon } from 'icons'

export function NavReports() {
  return (
    <nav className="border-b p-2 flex items-center gap-1 text-base font-medium">
      <NavItem
        href="/workspace/reports/records"
        title="Atenciones"
        icon={<History2Icon />}
      />
    </nav>
  )
}
