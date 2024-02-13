'use client'

import { disableScrollbar, enableScrollbar } from 'utils'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { XmarkIcon, ArrowDownIcon, MenuIcon } from 'icons'

function ModalMenu() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => {
          setOpen(true)
          disableScrollbar()
        }}
        className="flex gap-2 font-sans text-xl hover:bg-white/10 px-5 w-[140px] items-center text-white"
      >
        <MenuIcon className="w-[25px] block" />
        <span>Menu</span>
      </button>
      <div
        role="dialog"
        aria-hidden={!open}
        className="fixed z-50 ease-in-out duration-500 transition-all opacity-100 aria-hidden:opacity-0 aria-hidden:translate-y-[-100%] translate-y-0 flex flex-col bg-[#0e0e0e] inset-0"
      >
        <header className="w-full flex p-5 px-10 items-center">
          <picture className="">
            <a href="/">
              <div className="w-[140px]">
                <Image
                  placeholder="empty"
                  src="/elp.png"
                  loading="lazy"
                  className="w-full opacity-80 h-full"
                  alt="Escuela Superior La Pontificia - Logo"
                  height={60}
                  width={140}
                />
              </div>
            </a>
          </picture>
          <button
            onClick={() => {
              setOpen(false)
              enableScrollbar()
            }}
            className="ml-auto group text-white flex items-center gap-2 text-lg"
          >
            <span>Cerrar</span>
            <span className="border group-hover:border-neutral-400 border-neutral-700 w-9 transition-colors h-9 rounded-full block p-1">
              <XmarkIcon />
            </span>
          </button>
        </header>
        <nav className="p-5 px-10 ">
          <ul
            data-aos="fade-up"
            data-aos-delay="500"
            className="font-serif flex-wrap flex flex-col gap-5 font-medium text-neutral-300 text-6xl"
          >
            <li>
              <Link href="/" className="hover:underline hover:text-white">
                Inicio
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={() => {
                  setOpen(false)
                  enableScrollbar()
                }}
                className="hover:underline hover:text-white"
              >
                Entrar
              </Link>
            </li>
          </ul>
        </nav>
        <footer className="mt-auto p-8 text-lg border-t flex items-center gap-5 border-t-neutral-700 text-neutral-400">
          <h3 className="font-medium">Enlaces rápidos</h3>
          <span className="w-7 block -rotate-90">
            <ArrowDownIcon />
          </span>
          <ul className="font-bold text-neutral-300 flex-wrap flex gap-6 items-center">
            <li>
              <a
                className="hover:opacity-70 transition-colors"
                target="_blank"
                href="https://ilp.edu.pe"
                rel="noreferrer"
              >
                Instituto
              </a>
            </li>
            <li>
              <a
                className="hover:opacity-70 transition-colors"
                target="_blank"
                href="https://elp.edu.pe"
                rel="noreferrer"
              >
                Escuela{' '}
              </a>
            </li>
            <li>
              <a
                className="hover:opacity-70 transition-colors"
                target="_blank"
                href="https://www.continualp.edu.pe/"
                rel="noreferrer"
              >
                Educación Continua
              </a>
            </li>
            <li>
              <a
                className="hover:opacity-70 transition-colors"
                target="_blank"
                href="https://www.idiomaslp.edu.pe/"
                rel="noreferrer"
              >
                Idiomas
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </>
  )
}

export default ModalMenu
