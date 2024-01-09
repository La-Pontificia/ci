import React from 'react'
import DropDownUser from './user-dropdown'

function Sidebar() {
  return (
    <div className="fixed h-[80px]">
      <div className="flex gap-3 h-full w-full p-3">
        <DropDownUser />
      </div>
    </div>
  )
}

export default Sidebar
