/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { format, formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

export function convertTimestampToJSDate(timestamp: any): Date {
  return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000)
}

export function convertFormatHour(date: Date): string {
  const formatOutput = 'hh:mm a'
  return format(date, formatOutput)
}

export function formatSpanishDate(date: Date): string {
  const formatoFecha = 'EEE MMM dd yyyy'
  return format(date, formatoFecha, { locale: es })
}

export function timeAgo(dateParam: any): string | null {
  if (!dateParam) {
    return null
  }

  const newD = new Date(dateParam)
  const distance = formatDistanceToNow(newD, { addSuffix: true, locale: es })

  return distance
}

// crea una funcion que me devuelva la fecha y la hora en español y recibe un parametro de date en formato Date
export function formatSpanishDateAndTime(date: Date): string {
  const formatHour = 'hh:mm a'
  return `${format(date, formatHour)}`
}
