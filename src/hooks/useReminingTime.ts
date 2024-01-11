import { useState, useEffect } from 'react'

export const useRemainingTime = (startTime: string, endTime: string) => {
  const [remainingTime, setRemainingTime] = useState<string>('') // Format "Xh Ym"
  const [active, setActive] = useState<boolean>(true)

  useEffect(() => {
    const calculateRemainingTime = () => {
      const now = new Date()
      const end = new Date(now.toDateString() + ' ' + endTime)

      if (now < end) {
        const difference = end.getTime() - now.getTime()
        const hours = Math.floor(difference / (1000 * 60 * 60))
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        )

        if (hours > 0) {
          setRemainingTime(`${hours}h ${minutes}m`)
        } else {
          setRemainingTime(`${minutes}m`)
        }

        setActive(true)
      } else {
        setRemainingTime('0m')
        setActive(false)
      }
    }

    const interval = setInterval(calculateRemainingTime, 1000)
    calculateRemainingTime()
    return () => clearInterval(interval)
  }, [startTime, endTime])

  return { remainingTime, active }
}
