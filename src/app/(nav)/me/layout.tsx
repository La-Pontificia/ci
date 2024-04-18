// import Footer from 'components/me/footer'
import Header from 'components/me/header'
import Nav from 'components/me/nav'
import React from 'react'

type Props = {
  children: React.ReactNode
}

export default function LayoutMe({ children }: Props) {
  return (
    <div className="z-10 px-5 h-full py-10 w-full gap-4">
      <div className="max-w-6xl flex max-lg:flex-col mx-auto w-full">
        <Header />
        <div className="flex-grow max-w-[42rem] max-lg:max-w-full mx-auto max-lg:mx-0 flex-col px-10 max-lg:px-0">
          <Nav />
          {children}
        </div>
      </div>
    </div>
  )
}
