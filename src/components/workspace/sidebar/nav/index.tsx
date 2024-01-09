import React from 'react'
import { ItemNav } from './item'
import { BuildingIcon, ChairIcon, HomeIcon, PointOnMapIcon } from 'icons'

export function Nav() {
  return (
    <nav className="flex flex-col gap-5 my-auto">
      <ItemNav title="Inicio" Icon={<HomeIcon />} href={'/workspace'} />
      <ItemNav
        title="Sedes"
        Icon={<PointOnMapIcon />}
        href={'/workspace/headquarters'}
      />
      <ItemNav
        title="Pisos"
        Icon={<BuildingIcon />}
        href={'/workspace/floors'}
      />
      <ItemNav title="Mesas" Icon={<ChairIcon />} href={'/workspace/chairs'} />

      {/* <ItemNav
          title="Mesas"
          Icon={IconChair()}
          href={`/dash/${flour?._id ?? ''}`}
        />
        <ItemNav
          title="Reservas"
          Icon={IconLibrary('p-[2px]')}
          href={`/dash/bookings${flour?._id ? `/${flour?._id}` : ''}`}
        />
        <ItemNav
          title="Reporte"
          Icon={IconReport('p-[2px]')}
          href={`/dash/report${flour?._id ? `/${flour?._id}` : ''}`}
        />
        <ItemNav
          title="Usuarios"
          Icon={IconUser('p-[2px]')}
          href={'/dash/users'}
        /> */}
      {/* <button
        onClick={toggle}
        aria-checked={open}
        className="relative aria-checked:my-5 transition-all bg-white/80 rounded-lg py-3 my-2 w-full justify-center text-neutral-500 group-hover:text-black"
      >
        <div
          aria-checked={open}
          className="flex aria-checked:rotate-180 mx-auto justify-center"
        >
          <span className="w-[15px] h-[3px] rounded-full bg-current block -rotate-[30deg] mr-[-2px]" />
          <span className="w-[15px] h-[3px] rounded-full bg-current block rotate-[30deg] ml-[-2px]" />
        </div>
      </button> */}
    </nav>
  )
}

export default Nav
