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
      <span className="border-b border-neutral-200 w-full block" />
      <section className="h-full max-w-2xl mx-auto w-full">{children}</section>
      <Footer />
    </div>
  )
}
