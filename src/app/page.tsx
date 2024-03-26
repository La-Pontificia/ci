import Footer from 'components/home/footer'
import Header from 'components/home/header'
import LoginButton from 'components/home/login-button'
import { ArrowDownIcon } from 'icons'
import { cn } from 'utils'

export default function Home() {
  return (
    <main className={cn('flex flex-col min-h-svh bg-neutral-200')}>
      <Header />
      <span
        style={{
          backgroundImage: 'url(/noise.png)'
        }}
        className="fixed pointer-events-none dark:opacity-30 opacity-80 z-10 inset-0"
      />
      <div
        style={{
          backgroundImage: 'url("/optimize/background.webp")'
        }}
        className="absolute w-full pointer-events-none select-none bg-no-repeat bg-cover h-[900px]"
      >
        <span className="bg-gradient-to-b from-black/20 via-black/70 to-black absolute inset-0" />
      </div>
      <span className="grid -none place-content-center absolute pointer-events-none inset-x-0">
        <span className="w-[1px] animate-fade-in-down bg-white h-[150px] [animation-delay:700ms]"></span>
      </span>
      <div className="flex-grow z-[1] ">
        <section className="relative  max-w-7xl mx-auto py-36 max-700:pb-4 pb-16 w-full flex flex-col">
          <article className="h-full p-5 flex w-full max-w-7xl mx-auto items-center justify-center">
            <div className="text-center max-700:text-left p-5 max-500:p-2 justify-center">
              <h1
                title="Centro de Información La Pontificia"
                className="relative animate-fade-in-down font-canela text-8xl text-white drop-shadow-md leading-[1] tracking-tight"
              >
                Centro de Información La Pontificia
              </h1>
              <p className="pt-6 animate-fade-in-down [animation-delay:500ms] text-white font-sans font-semibold max-700:text-sm text-lg max-w-2xl mx-auto">
                Este servicio esta dirigido a estudiantes y docentes, pueden
                emplear las computadoras y/o mesas por 2 horas diarias o más.
              </p>
            </div>
          </article>
        </section>
        <section className="grid max-w-7xl pb-10 mx-auto w-full divide-x divide-stone-800 max-700:divide-none grid-cols-2 max-700:grid-cols-1">
          <span></span>
          <article className="text-left text-white py-14 p-5">
            <h2
              title="Centro de Información La Pontificia"
              className="font-canela animate-fade-in-up [animation-delay:200ms] relative text-4xl leading-[1]"
            >
              Iniciar sesión
            </h2>
            <p className="pt-3 [animation-delay:200ms] font-sans animate-fade-in-down font-semibold max-w-2xl mx-auto">
              Tus datos ya estan vinculados a tu cuenta intitucional de{' '}
              <a
                href="https://microsoft.com"
                target="_blank"
                rel="noreferrer"
                className="font-semibold underline"
              >
                Microsoft
              </a>
              , accede con tu correo e inicia tus reservas de mesas y/o
              computadoras.
            </p>
            <LoginButton />
          </article>
        </section>
        {/* <section className="max-w-4xl items-center gap-10 py-10 p-5 mx-auto grid grid-cols-2 max-700:grid-cols-1 w-full">
          <div className="grid grid-cols-2 h-[400px] max-500:h-[200px]">
            <picture>
              <img
                className="object-cover w-full h-full hover:grayscale-0 duration-700 opacity-90 transition-all block"
                src="/cubicle.webp"
              />
            </picture>
            <picture>
              <img
                className="object-cover w-full h-full hover:grayscale-0 duration-700 opacity-90 transition-all block"
                src="/computers.webp"
              />
            </picture>
          </div>
          <div className="space-y-4">
            <h1 className="font-semibold text-4xl">
              Computadoras y Mesas grupales de estudio
            </h1>
            <p>
              Tenemos más de 100 computadoras disponibles para trabajos,
              evaluaciones y proyectos académicos, con conexión de fibra óptica
              de más de 400 Mbps.
            </p>
            <p>
              Además, contamos con 9 mesas grupales, cada una con capacidad para
              4 a 8 personas, diseñadas específicamente para trabajos en equipo
              en un entorno propicio para el estudio.
            </p>
          </div>
        </section> */}
        <section
          id="termn"
          className="max-w-4xl grid space-x-4 grid-cols-2 max-700:grid-cols-1 divide-x divide-neutral-400 max-700:divide-none py-10 pt-20 p-5 mx-auto w-full"
        >
          <article className="">
            <header>
              <h1 className="font-canela text-4xl">
                Término de uso del Sitio web.
              </h1>
            </header>
            <div className="p-5">
              <ul className="list-disc space-y-3 text-sm">
                <li>
                  Los servicios del Centro de Información pueden ser utilizados
                  por un período de hasta 1 hora, con un límite máximo de 2
                  horas.
                </li>

                <li>
                  Se recomienda realizar la reserva con suficiente antelación
                  para evitar posibles contratiempos.
                </li>

                <li>
                  Se permitirá un margen de tolerancia de 10 minutos para su
                  reserva; en caso de no hacer uso de la misma dentro de este
                  período, la reserva será cancelada automáticamente.
                </li>
              </ul>
            </div>
          </article>
          <article className="pl-4 max-700:pl-0">
            <header>
              <h1 className="text-4xl font-canela">Horario de servicio</h1>
            </header>
            <div className="py-5 text-sm">
              <p>
                Nuestro horario de atención es de lunes a sábado, desde las 8:00
                a. m. hasta las 8:00 p. m.
              </p>
            </div>
            <div className="space-y-5 text-sm">
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
                  <h3 className=" font-semibold">
                    Sede Jazmines: Pabellón S-201
                  </h3>
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
                  <h3 className=" font-semibold">
                    Sede Alameda: Pabellón D-101
                  </h3>
                  <p className="text-xs">
                    Av. Carmen Alto 390 - Alameda de La Independencia (Ex
                    Alameda Valdelirios)
                  </p>
                </div>
              </a>
            </div>
          </article>
        </section>
      </div>
      <Footer />
    </main>
  )
}
