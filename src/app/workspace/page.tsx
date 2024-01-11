import Floors from 'components/workspace/floors'
import React from 'react'

function WorksSpacePage() {
  return (
    <div className="flex items-center min-h-screen">
      {/* <div className="border-b bg-neutral-950 border-neutral-700">
        <header className="p-10 max-w-5xl mx-auto flex items-end w-full ">
          <img src="/female_woman.png" className="w-[100px]" alt="" />
          <img src="/woman.png" className="w-[150px] ml-auto" alt="" />
        </header>
      </div> */}
      <div className="max-w-6xl mx-auto w-full p-10 max-700:p-3">
        <div className="border-b py-4 mb-3 border-neutral-700">
          <h2 className="text-xl font-bold">
            Centro de información | La Pontificia
          </h2>
          <p className="text-sm text-neutral-400">Workspace</p>
        </div>
        <Floors />
      </div>
    </div>
  )
}

export default WorksSpacePage
