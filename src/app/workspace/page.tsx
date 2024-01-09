import Floors from 'components/workspace/floors'
import CreateFloor from 'components/workspace/floors/create'
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
          <h2 className="text-4xl font-medium">
            Centro de información | La Pontificia
          </h2>
          <p className="text-sm text-neutral-400">Administracion del sistema</p>
        </div>
        <div className="flex gap-5 lg:justify-center max-800:[&>button]:w-full max-800:[&>a]:w-full flex-wrap">
          <CreateFloor />
          <Floors />
        </div>
      </div>
    </div>
  )
}

export default WorksSpacePage
