import { ArrowDownIcon } from 'icons'
import React from 'react'

export default function page() {
  return (
    <div className="p-20 max-md:p-8 text-left max-w-3xl">
      <div
        aria-hidden
        className="fixed z-[55] pointer-events-none select-none inset-0 w-full h-full block bg-gradient-to-b from-violet-400/5 to-violet-400/0 dark:from-violet-700/5 dark:to-violet-700/0"
      />
      <h1 className="relative font-canela text-6xl animate-fade-in-down">
        Centro de Información La Pontificia
      </h1>
      <p className="dark:text-neutral-300 mt-3 animate-fade-in-up">
        Este servicio esta dirigido a estudiantes y docentes, pueden emplear las
        computadoras y/o mesas por 2 horas diarias o más.
      </p>
      <div className="mt-10 animate-fade-in-down [animation-delay:400ms]">
        <h1 className="text-4xl">Computadoras y Mesas grupales de estudio</h1>
        <p className="mt-5 dark:text-neutral-300">
          Tenemos más de 100 computadoras disponibles para trabajos,
          evaluaciones y proyectos académicos, con conexión de fibra óptica de
          más de 400 Mbps.
        </p>
        <p className="mt-2 dark:text-neutral-300">
          Además, contamos con 9 mesas grupales, cada una con capacidad para 4 a
          8 personas, diseñadas específicamente para trabajos en equipo en un
          entorno propicio para el estudio.
        </p>
      </div>
      <article className="mt-10 animate-fade-in-down [animation-delay:600ms]">
        <h1 className=" text-4xl">Término de uso del Sitio web.</h1>
        <div className="p-5 mt-5 dark:text-neutral-300">
          <ul className="list-disc space-y-3 text-sm">
            <li>
              Los servicios del Centro de Información pueden ser utilizados por
              un período de hasta 1 hora, con un límite máximo de 2 horas.
            </li>

            <li>
              Se recomienda realizar la reserva con suficiente antelación para
              evitar posibles contratiempos.
            </li>

            <li>
              Se permitirá un margen de tolerancia de 10 minutos para su
              reserva; en caso de no hacer uso de la misma dentro de este
              período, la reserva será cancelada automáticamente.
            </li>
          </ul>
        </div>
      </article>
      <article className="mt-10 animate-fade-in-down [animation-delay:700ms]">
        <header>
          <h1 className="text-4xl ">Horario de servicio</h1>
        </header>
        <div className="py-5 text-sm dark:text-neutral-300">
          <p>
            Nuestro horario de atención es de lunes a sábado, desde las 8:00 a.
            m. hasta las 8:00 p. m.
          </p>
        </div>
        <div className="space-y-5 text-sm dark:text-neutral-300">
          <a
            target="_blank"
            href=" https://maps.app.goo.gl/BYyZoBJWsnNzvBKfA"
            className="group gap-2 flex items-center"
            rel="noreferrer"
          >
            <span className="w-[2.5rem] group-hover:scale-105 group-hover:bg-stone-900 transition-all h-[2.5rem] p-2 text-white bg-stone-600 block rounded-full">
              <ArrowDownIcon className="-rotate-90" />
            </span>
            <div>
              <h3 className=" font-semibold">Sede Jazmines: Pabellón S-201</h3>
              <p className="text-xs">Jr. Los Jazmines 191 - Urb. Jardín</p>
            </div>
          </a>
          <a
            target="_blank"
            href="https://maps.app.goo.gl/9r8smgG9W84nfhKr9"
            className="group gap-2 flex items-center"
            rel="noreferrer"
          >
            <span className="w-[2.5rem] min-w-[2.5rem]  group-hover:scale-105 group-hover:bg-stone-900 transition-all h-[2.5rem] p-2 text-white bg-stone-600 block rounded-full">
              <ArrowDownIcon className="-rotate-90" />
            </span>
            <div>
              <h3 className=" font-semibold">Sede Alameda: Pabellón D-101</h3>
              <p className="text-xs">
                Av. Carmen Alto 390 - Alameda de La Independencia (Ex Alameda
                Valdelirios)
              </p>
            </div>
          </a>
        </div>
      </article>
    </div>
  )
}
