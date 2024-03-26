import React from 'react'
import ModalMenu from './modal'
import Image from 'next/image'

function Header() {
  return (
    <header className="flex fixed pointer-events-none inset-x-0 z-10 w-full mx-auto">
      <picture className="p-5 pointer-events-auto">
        <div className="w-[140px]">
          <Image
            placeholder="empty"
            src="/white-logo.png"
            loading="lazy"
            className="opacity-80 w-full h-full"
            alt="Escuela nega Superior La Pontificia - Logo"
            height={60}
            width={140}
          />
        </div>
      </picture>
      <nav className="flex ml-auto pointer-events-auto bg-black p-2">
        <ModalMenu />
      </nav>
    </header>
  )
}

export default Header
