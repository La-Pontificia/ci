import React from 'react'

function Footer() {
  return (
    <div className="w-full mt-auto">
      <footer className="p-3 border-t border-neutral-700 bg-neutral-800">
        <div className="flex mx-auto max-w-xl w-full text-neutral-400 text-sm">
          <p>
            Made with ❤️ by{' '}
            <a href="https://elp.edu.pe" target="_blank" rel="noreferrer">
              La pontificia
            </a>
          </p>
          <p className="ml-auto">
            Developed by{' '}
            <a
              href="https://daustinn.com"
              target="_blank"
              className="hover:underline"
              rel="noreferrer"
            >
              Daustinn
            </a>
          </p>
        </div>
        <span className="py-2 block w-full"></span>
        <div className="mx-auto max-w-xl w-full my-3 text-neutral-400">
          <p className="text-xs">
            Este sitio fue implementada para realizar reservas de un lugar en la
            biblioteca virtual La Pontificia.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
