import React from 'react'

function ReportPage() {
  return (
    <div className="p-10 h-full grid place-content-center">
      <span className="inline-flex gap-2 text-neutral-400">
        Estamos construyendo esta pagina{' '}
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
        </a>
      </span>
    </div>
  )
}

export default ReportPage
