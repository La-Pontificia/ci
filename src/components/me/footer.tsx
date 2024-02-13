import { DevIconIcon } from 'icons'
import Link from 'next/link'
import React from 'react'

function Footer() {
  const classname = 'hover:underline flex justify-center gap-1'
  const props = {
    className: classname,
    target: '_blank'
  }
  return (
    <footer className="p-10">
      <div className="mx-auto text-center space-y-3 w-full text-neutral-900 text-sm">
        <p className="flex justify-center space-x-5 flex-wrap">
          <Link href="https://ilp.edu.pe" {...props}>
            Instituto
          </Link>
          <Link href="https://elp.edu.pe" {...props}>
            Escuela
          </Link>
          <Link href="https://www.continualp.edu.pe/" {...props}>
            Educación Continua
          </Link>
          <Link href="https://www.idiomaslp.edu.pe/" {...props}>
            Idiomas
          </Link>
          <Link href="/home" {...props} target="">
            Landing
          </Link>
          <Link href="/home/#termn" {...props} target="">
            Términos de uso
          </Link>
          <Link href="https://daustinn.com" {...props}>
            <DevIconIcon className="w-4 text-black" />
            Daustinn
          </Link>
        </p>
        <p>© 2024 Escuela La Ponitifica - Centro de Información</p>
      </div>
    </footer>
  )
}

export default Footer
