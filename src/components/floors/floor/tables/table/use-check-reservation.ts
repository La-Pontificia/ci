import React from 'react'
import { checkReservations } from 'utils'

export const useCheckReservation = (dateReservations: [Date, Date][]) => {
  const [isReserved, setIsReserved] = React.useState<boolean>(false)

  React.useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date()
      const is = checkReservations(dateReservations, now)
      setIsReserved(is !== false)
    }

    const interval = setInterval(calculateRemainingTime, 10000)
    calculateRemainingTime()
    return () => clearInterval(interval)
  }, [])

  return {
    isReserved
  }
}
