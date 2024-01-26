import { FaceboolIcon, ThreadsIcon, XIcon } from 'icons'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-neutral-900 h-[200px]">
      <section className="max-w-7xl mx-auto  p-8 h-full w-full">
        <div className="flex max-700:flex-col max-700:justify-center max-700:items-center items-end h-full">
          <div className="text-neutral-400 text-sm flex flex-col">
            <span>© 2024 Escuela Superior La Pontificia</span>
            <span className="">
              Desarrollado por{' '}
              <a
                href="https://daustinn.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-blue-500"
              >
                Daustinn
              </a>
            </span>
          </div>
          <div className="md:w-full ml-auto max-700:ml-0 max-700:pt-10">
            <ul className="flex gap-5 text-neutral-400">
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
