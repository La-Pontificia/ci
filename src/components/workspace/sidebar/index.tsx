import React from 'react'
import DropDownUser from './user-dropdown'
import CloseButton from './close-button'

function Sidebar() {
  return (
    <>
      <div className="fixed z-10 right-0 p-3">
        <DropDownUser />
        <CloseButton />
      </div>
    </>
  )
}

export default Sidebar
