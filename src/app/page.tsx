import Footer from 'components/home/footer'
import Header from 'components/home/header'
import LoginButton from 'components/home/login-button'

export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      <section className=" pb-40 relative w-full h-full flex flex-col">
        <span className="absolute inset-0">
          <span className="bg-gradient-to-b from-neutral-900/60 via-neutral-900/90 to-neutral-900 absolute inset-0" />
          <img src="/bg.png" className="w-full h-full object-cover" alt="" />
        </span>
        <Header />
        <div className="h-full flex w-full max-w-7xl mx-auto items-center justify-center">
          <div className="text-center p-5 justify-center">
            <div className="relative">
              <h1 className="text-center font-medium relative text-[150px] max-900:text-[100px] max-500:text-[60px] text-stone-200 leading-[1] tracking-tight">
                {/* Lee, Conecta, y Enseña. */}
                Libros abiertos, mentes abiertas.
                {/* Descubre, reserva, disfruta. */}
              </h1>
              <p className="pt-6 text-neutral-400 text-lg font-medium max-w-2xl mx-auto">
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
