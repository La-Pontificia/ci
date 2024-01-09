import { FaceboolIcon, ThreadsIcon, XIcon } from 'icons'
import React from 'react'

function Footer() {
  return (
    <footer className="bg-neutral-900 h-[200px]">
      <section className="max-w-7xl mx-auto p-8 h-full w-full">
        <div className="flex  items-end h-full">
          <div className="text-neutral-400 text-sm flex flex-col">
            <span>© 2023 The president and members of La pontificia</span>
            <span className="opacity-60">
              Developed by{' '}
              <a
                href="https://daustinn.com/"
                target="_blank"
                rel="noreferrer"
                className="hover:underline text-stone-200"
              >
                Daustinn
              </a>
            </span>
          </div>
          <div className="mx-auto md:mx-1">
            {/* <span className="w-[140px] block">
            <img src="elp.png" alt="" />
          </span> */}
          </div>
          <div className="md:w-full">
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
