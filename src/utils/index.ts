/* eslint-disable @typescript-eslint/member-delimiter-style */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { ERRORS_NEXT_AUTH } from '../constants'
import { type User, type AuthErrorNextAuth, type Floor } from 'types'
import axios from 'axios'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const generateDateRange = (): { min: string; max: string } => {
  const today = new Date()
  const minDate = new Date(today)
  const maxDate = new Date(today)
  minDate.setDate(today.getDate() + 1)
  maxDate.setDate(today.getDate() + 4)
  const formattedMin = minDate.toISOString().split('T')[0]
  const formattedMax = maxDate.toISOString().split('T')[0]
  return { min: formattedMin, max: formattedMax }
}

export const isDateInRange = (dateToCheck: Date): boolean => {
  const today = new Date()
  const minDate = new Date(today)
  const maxDate = new Date(today)
  minDate.setDate(today.getDate() + 1)
  minDate.setHours(0, 0, 0, 0)
  maxDate.setDate(today.getDate() + 4)
  maxDate.setHours(23, 59, 59, 999)
  return dateToCheck >= minDate && dateToCheck <= maxDate
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseTimeStringToDate(timeString: string, da: Date): Date {
  const [hours, minutes] = timeString.split(':').map(Number)
  const date = new Date(da)
  date.setHours(hours)
  date.setMinutes(minutes)
  return date
}

export function getRandomUserProfile(): string {
  const words = [
    '/default-profiles/0001.png',
    '/default-profiles/0002.png',
    '/default-profiles/0003.png',
    '/default-profiles/0004.png',
    '/default-profiles/0005.png',
    '/default-profiles/0006.png'
  ]
  const randomIndex = Math.floor(Math.random() * words.length)
  return words[randomIndex]
}

export const divideAndGroupByHeadquarter = (floors: Floor[]) => {
  const alamedaFloors = floors.filter(
    (floor) => floor.headquarder === 'alameda'
  )
  const jazminesFloors = floors.filter(
    (floor) => floor.headquarder === 'jazmines'
  )

  const groupedFloors = {
    alameda: alamedaFloors,
    jazmines: jazminesFloors
  }

  return groupedFloors
}

export function createMinuteArrayIntervalFive(): string[] {
  const minutes: string[] = []

  for (let hour = 7; hour < 22; hour++) {
    for (let minute = 0; minute < 60; minute += 10) {
      const formattedHour = hour.toString().padStart(2, '0')
      const formattedMinute = minute.toString().padStart(2, '0')
      minutes.push(`${formattedHour}:${formattedMinute}`)
    }
  }

  return minutes
}

export const validateNumber = (v: any) => {
  const n = v.toString().replace(/,/g, '')
  return !isNaN(parseFloat(n)) ? parseFloat(n.toString()) : 0
}

export async function delay(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms))
}

export const validImage = (f: File) => {
  return f.type.split('/')[0] === 'image'
}

export function createHourArray(): string[] {
  const hours: string[] = []

  for (let hour = 0; hour < 13; hour++) {
    const formattedHour = hour.toString().padStart(2, '0')
    hours.push(formattedHour)
  }

  return hours
}

export function createMinuteArray(): string[] {
  const minutes: string[] = []

  for (let minute = 0; minute < 60; minute += 1) {
    const formattedMinute = minute.toString().padStart(2, '0')
    minutes.push(formattedMinute)
  }

  return minutes
}

export function splitTimeString(timeString: string): {
  hour: string
  minute: string
  period: string
} | null {
  if (timeString) {
    const [hourPart, minutePart] = timeString?.split(' ')
    const [hour, minute] = hourPart.split(':')
    const period = minutePart
    return { hour, minute, period }
  }
  return null
}

/**
 * Handles authentication errors and returns the corresponding error message.
 *
 * @param errorType - The type of authentication error.
 * @returns The error message associated with the provided error type.
 */
export function handleErrorNextAuth(errorType: AuthErrorNextAuth): string {
  // Look up the error message from the ERRORS_NEXT_AUTH object based on the errorType.
  // If the errorType is not found in ERRORS_NEXT_AUTH, it will return the default error message.
  const errorMessage = ERRORS_NEXT_AUTH[errorType] ?? ERRORS_NEXT_AUTH.Default

  return errorMessage
}

export function disableScrollbar() {
  document.body.style.overflow = 'hidden'
}

export function enableScrollbar() {
  document.body.style.overflow = 'auto' // O 'scroll' si deseas que el scrollbar esté siempre visible
}

export const capitalizeWords = (text: string): string => {
  return text
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

// GENERATE RANDOMS

export function generateRandomNumberExcluding(
  excludeArray: number[],
  minInit?: number,
  maxInit?: number
): number | null {
  const min: number = minInit ?? 101
  const max: number = maxInit ?? 135
  const possibleNumbers: number[] = []

  for (let i: number = min; i <= max; i++) {
    if (!excludeArray.includes(i)) {
      possibleNumbers.push(i)
    }
  }

  if (possibleNumbers.length === 0) {
    return null // No available numbers within the range after excluding the provided ones
  }

  const randomIndex: number = Math.floor(Math.random() * possibleNumbers.length)
  return possibleNumbers[randomIndex]
}

export const getUserByDni = async (dni: string) => {
  try {
    const res = await axios(`/api/user/${dni}`)
    const data = res.data as Partial<User>
    return data
  } catch (error) {
    console.log(error)
  }
}

// MOMENTS UTILS
export const generateHourList = () => {
  const now = new Date()
  const currentHour = now.getHours()
  const currentMinutes = now.getMinutes()

  let startHour

  if (currentMinutes > 45) {
    // Si los minutos actuales son mayores que 45, avanzar a la próxima hora
    startHour = currentHour + 1
  } else {
    // En caso contrario, usar la hora actual
    startHour = currentHour
  }

  // Ajustar la hora de inicio a las 7:00 am si es menor
  startHour = Math.max(startHour, 7)

  // Generar la lista de horas cada 15 minutos
  const hourList = []
  for (let hour = startHour; hour <= 22; hour++) {
    for (let minutes = 0; minutes < 60; minutes += 15) {
      const formattedHour = `${hour.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
      hourList.push(formattedHour)
    }
  }

  return hourList
}

export const generateFullDayHourList = (start?: string | null) => {
  let startHour = 7
  let startMinutes = 0

  if (start) {
    const parsedStart = new Date(`2000-01-01T${start}`)
    startHour = parsedStart.getHours()
    startMinutes = parsedStart.getMinutes()
  }

  startHour = Math.max(Math.min(startHour, 22), 7)

  const hourList = []

  for (let hour = startHour; hour <= 22; hour++) {
    let initialMinutes = 0

    if (hour === startHour) {
      // Si estamos en la misma hora que la proporcionada, ajustamos los minutos iniciales
      initialMinutes = Math.ceil(startMinutes / 15) * 15
    }

    for (let minutes = initialMinutes; minutes < 60; minutes += 15) {
      const formattedHour = `${hour.toString().padStart(2, '0')}:${minutes
        .toString()
        .padStart(2, '0')}`
      if (!(hour === startHour && minutes === initialMinutes)) {
        // Agregamos a la lista solo si no es la hora exacta proporcionada
        hourList.push(formattedHour)
      }
    }
  }

  return hourList
}

export function converterForma12Hour(hora24: string): string {
  const [hours, minutes] = hora24.split(':')
  let hours12 = parseInt(hours, 10)
  const ampm = hours12 >= 12 ? 'PM' : 'AM'
  hours12 = hours12 % 12 || 12
  const formattedHour12 = hours12.toString().padStart(2, '0')
  const hour12 = `${formattedHour12}:${minutes} ${ampm}`
  return hour12
}

export function calculateDuration(startTime: string, endTime: string): string {
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)
  const totalMinutes = (endHour - startHour) * 60 + (endMinute - startMinute)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60
  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  return `${formattedHours}:${formattedMinutes}`
}

export const calculateTimeMargin = (startTime: Date, endTime: Date) => {
  const difference = endTime.getTime() - startTime.getTime()
  const hours = Math.floor(difference / (1000 * 60 * 60))
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
  const displayTime = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`
  const time = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`

  return { displayTime, time }
}

export const addMinutes = (
  originalTime: string,
  minutesToAdd: number
): string => {
  const [hours, minutes] = originalTime.split(':').map(Number)
  const totalMinutes = hours * 60 + minutes + minutesToAdd
  const newHours = Math.floor(totalMinutes / 60)
  const newMinutes = totalMinutes % 60
  const formattedTime = `${newHours.toString().padStart(2, '0')}:${newMinutes
    .toString()
    .padStart(2, '0')}`
  return formattedTime
}
