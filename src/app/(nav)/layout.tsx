import Nav from 'components/nav'
import { authOptions } from 'libs/next-auth'
import { getServerSession } from 'next-auth'
import React from 'react'
import SetAuth from './setAuth'
import Page404 from 'components/404'
import { ThemeProvider } from 'providers/theme'
import { Footer } from 'components/footer'

type Props = { children: React.ReactNode }

export default async function layout({ children }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.account) return <Page404 />

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="h-full flex flex-col">
        <SetAuth
          user={{
            ...session.account,
            _id: session.account._id.toString()
          }}
        />
        <Nav />
        <div className="flex-grow flex flex-col pl-[--sidebar-width] max-md:pl-0 max-md:pb-[90px] dark:bg-black/80 bg-neutral-50 z-10 min-h-svh">
          <div className="flex-grow w-full">{children}</div>
          <Footer />
        </div>
      </main>
    </ThemeProvider>
  )
}
