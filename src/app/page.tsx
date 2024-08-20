import Footer from 'components/home/footer'
import LoginButton from 'components/home/login-button'

export default function Home() {
  return (
    <main className="flex flex-col min-h-svh bg-black">
      <span
        style={{
          backgroundImage: 'url(/noise.png)'
        }}
        className="fixed pointer-events-none opacity-20 z-20 inset-0"
      />
      <span className="grid z-10 -none place-content-center absolute pointer-events-none inset-x-0">
        <span className="w-[1px] animate-fade-in-down bg-stone-200 h-[150px] [animation-delay:700ms]"></span>
      </span>
      <div className="flex-grow z-[1] ">
        <div className="relative">
          <div
            style={{
              backgroundImage: 'url("/optimize/background2.webp")'
            }}
            className="absolute h-full z-[0] bg-center w-full pointer-events-none select-none bg-no-repeat bg-cover"
          >
            <span className="bg-gradient-to-b from-black/20 via-black/70 to-black absolute inset-0" />
          </div>
          <section className="relative z-[1] max-w-7xl mx-auto py-36 max-lg:pb-4 pb-16 w-full flex flex-col">
            <article className="h-full p-5 flex w-full max-w-7xl mx-auto items-center justify-center">
              <div className="text-center max-lg:text-left p-5 max-sm:p-2 justify-center">
                <h1
                  title="Centro de Información La Pontificia"
                  className="relative animate-fade-in-down font-canela text-8xl max-md:text-7xl text-white drop-shadow-md leading-[1] tracking-tight"
                >
                  Centro de Información La Pontificia
                </h1>
                <p className="pt-6 animate-fade-in-down [animation-delay:500ms] text-white font-sans font-semibold max-lg:text-sm max-lg:mx-0 text-lg max-w-2xl mx-auto">
                  Este servicio esta dirigido a estudiantes y docentes, pueden
                  emplear las computadoras y/o mesas por 2 horas diarias o más.
                </p>
              </div>
            </article>
          </section>
          <section className="grid z-[1] max-w-7xl relative pb-10 mx-auto w-full divide-x divide-stone-800 max-lg:divide-none grid-cols-2 max-lg:grid-cols-1">
            <span></span>
            <article className="text-left text-white py-14 p-5">
              <h2
                title="Centro de Información La Pontificia"
                className="font-canela animate-fade-in-up [animation-delay:200ms] relative text-4xl leading-[1]"
              >
                Iniciar sesión
              </h2>
              <p className="pt-3 [animation-delay:200ms] font-sans animate-fade-in-down font-semibold max-w-2xl mx-auto max-lg:mx-0">
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
        </div>
      </div>
      <Footer />
    </main>
  )
}
