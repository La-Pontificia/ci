import Footer from 'components/me/footer'
import Header from 'components/me/header'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function LayoutMe({ children }: Props) {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <section className="flex-grow max-w-xl mx-auto w-full">
        {children}
      </section>
      <Footer />
    </div>
  )
}
