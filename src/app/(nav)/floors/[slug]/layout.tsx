import Footer from 'components/floors/floor/footer'
import FloorNav from 'components/floors/floor/nav'
import React, { Suspense } from 'react'

type Props = {
  params: { slug: string }
  children: React.ReactNode
}

function Layout({ params, children }: Props) {
  return (
    <>
      <FloorNav slug={params.slug} />
      {children}
      <Suspense>
        <Footer slug={params.slug} />
      </Suspense>
    </>
  )
}

export default Layout
