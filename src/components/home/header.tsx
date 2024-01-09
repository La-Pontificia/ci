import React from 'react'
import ModalMenu from './modal'
import Image from 'next/image'

function Header() {
  return (
    <header className="flex relative w-full mx-auto">
      <picture className="p-5">
        <div className="w-[140px]">
          <Image
            placeholder="empty"
            src="/white-logo.png"
            loading="lazy"
            className="opacity-80 w-full h-full"
            alt="Escuela Superior La Pontificia - Logo"
            height={60}
            width={140}
          />
        </div>
      </picture>
      <nav className="flex ml-auto bg-black p-2">
        <ModalMenu />
      </nav>
    </header>
  )
}

export default Header
