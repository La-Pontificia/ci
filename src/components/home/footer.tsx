import { FaceboolIcon, ThreadsIcon, XIcon } from 'icons'
import React from 'react'

function Footer() {
  const links = [
    {
      name: 'Facebook',
      url: 'https://www.facebook.com/EscuelaSuperiorLaPontificia/',
      icon: FaceboolIcon
    },
    {
      name: 'Twitter',
      url: 'https://twitter.com/ELP_Ayacucho',
      icon: XIcon
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/escuelasuperiorlapontificia/',
      icon: ThreadsIcon
    }
  ]
  return (
    <footer className="flex-none relative z-[1]">
      <section className="max-w-5xl min-h-[300px] mx-auto text-neutral-400 text-center p-4 h-full grid place-content-center w-full">
        <p className="">
          © 2024 Escuela Superior La Pontificia | Grupo La Pontificia
        </p>
        <span className="text-xs font-normal">
          Developed and maintained by{' '}
          <a
            href="https://daustinn.com/"
            target="_blank"
            rel="noreferrer"
            className="hover:underline text-white"
          >
            Daustinn
          </a>
        </span>
        <ul className="flex gap-5 mt-10 justify-center text-neutral-300">
          {links.map((link) => (
            <li key={link.name}>
              <a
                className="hover:underline hover:text-white"
                href={link.url}
                target="_blank"
                rel="noreferrer"
              >
                <span>
                  <link.icon className="w-7" />
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </footer>
  )
}

export default Footer
