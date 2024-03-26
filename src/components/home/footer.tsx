import { FaceboolIcon, ThreadsIcon, XIcon } from 'icons'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-stone-950 flex-none relative z-[1]">
      <section className="max-w-5xl mx-auto p-4 h-full w-full">
        <div className="flex max-700:flex-col max-700:justify-center max-700:items-center items-end h-full">
          <div className="text-neutral-200 flex flex-col">
            <p className="font-canela">
              © 2024 Escuela Superior La Pontificia | Grupo La Pontificia
            </p>
            <span className="text-xs font-normal">
              Developed and maintained by{' '}
              <a
                href="https://daustinn.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-amber-500"
              >
                Daustinn
              </a>
            </span>
          </div>
          <div className="md:w-full ml-auto max-700:ml-0 max-700:pt-10">
            <ul className="flex gap-5 text-neutral-200">
              <li>
                <a
                  className="hover:underline hover:text-white"
                  href="https://www.facebook.com/EscuelaSuperiorLaPontificia/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaceboolIcon className="w-6" />
                </a>
              </li>
              <li>
                <a
                  className="hover:underline hover:text-white"
                  href="https://twitter.com/ELP_Ayacucho"
                  target="_blank"
                  rel="noreferrer"
                >
                  <XIcon className="w-6" />
                </a>
              </li>
              <li>
                <a
                  className="hover:underline hover:text-white"
                  href="https://www.instagram.com/escuelasuperiorlapontificia/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <ThreadsIcon className="w-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer
