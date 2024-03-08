import { NavReports } from 'components/workspace/reports/nav'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function layout({ children }: Props) {
  return (
    <div className="w-full h-full flex-grow">
      <NavReports />
      <div className="mx-auto w-full flex-grow overflow-y-auto">{children}</div>
    </div>
  )
}
