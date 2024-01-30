import Footer from 'components/home/footer'
import Header from 'components/home/header'
import LoginButton from 'components/home/login-button'

export default function Home() {
  return (
    <main className="flex flex-col h-[100svh]">
      <section className="relative bg-hero w-full h-full flex flex-col">
        <span className="absolute inset-0">
          <span className="bg-gradient-to-b from-neutral-900/60 via-neutral-900/90 to-neutral-900 absolute inset-0" />
        </span>
        <Header />
        <div className="h-full flex w-full max-w-7xl mx-auto items-center justify-center">
          <div className="text-center p-5 max-500:p-2 justify-center">
            <div className="relative">
              <h1
                title="Centro de Información La Pontificia"
                data-aos="fade-down"
                className="text-center font-serif font-medium relative text-3xl text-stone-200 max-500:text-[20px] leading-[1] tracking-tight"
              >
                Centro de Información
              </h1>
              <h1
                title="Libros abiertos, mentes abiertas."
                data-aos="fade-down"
                className="text-center font-medium max-500:pt-5 relative text-[150px] max-900:text-[100px] max-500:text-[40px] text-stone-200 leading-[1] tracking-tight"
              >
                Libros abiertos, mentes abiertas.
              </h1>
              <p className="pt-6 text-neutral-400 max-700:text-sm text-lg font-medium max-w-2xl mx-auto">
                En La Pontificia , ofrecemos una experiencia educativa única y
                un lugar para aprender, socializar y estudiar. ¡Reserva un lugar
                y únete a nosotros!
              </p>
              <LoginButton />
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  )
}
