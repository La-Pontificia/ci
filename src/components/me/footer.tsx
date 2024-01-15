import React from 'react'

function Footer() {
  return (
    <div className="w-full mt-auto">
      <footer className="p-3 border-t border-neutral-700 bg-neutral-800">
        <div className="flex mx-auto max-w-xl w-full text-neutral-400 text-sm">
          <p>
            <a href="https://elp.edu.pe" target="_blank" rel="noreferrer">
              La pontificia
            </a>
          </p>
          <p className="ml-auto flex gap-2">
            Developed in{' '}
            <a
              href="https://Nextjs.org"
              target="_blank"
              className="hover:underline font-semibold text-neutral-200"
              rel="noreferrer"
            >
              Nextjs
            </a>{' '}
            by{' '}
            <a
              href="https://daustinn.com"
              target="_blank"
              className="hover:underline flex gap-1 items-center font-semibold text-neutral-200"
              rel="noreferrer"
            >
              <span className="w-[20px] block rounded-full overflow-hidden h-[20px]">
                <img
                  className="w-full h-full object-cover"
                  src="https://daustinn.com/_next/image?url=%2Fdaustinn.webp&w=48&q=75"
                  alt=""
                />
              </span>
              Daustinn
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Footer
