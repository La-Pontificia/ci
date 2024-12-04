import Booking from 'components/me/booking'
import { authOptions } from 'libs/next-auth'
import { getServerSession } from 'next-auth'
import React from 'react'

export async function generateMetadata() {
  const session = await getServerSession(authOptions)
  return {
    title:
      session?.account?.names +
      ' - Reservas | Centro de Información La Pontificia',
    icons: session?.account?.image ? [session?.account?.image] : []
  }
}

function MePage() {
  return <Booking />
}

export default MePage
