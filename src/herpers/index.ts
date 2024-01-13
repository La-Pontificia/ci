/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { format, formatDistanceToNow, parse } from 'date-fns'

export function convertTimestampToJSDate(timestamp: any): Date {
  return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000)
}

export function convertFormatHour(input: string): string {
  const formatInput = 'HH:mm'
  const formatOutput = 'hh:mm a'
  const hourDate = parse(input, formatInput, new Date())
  return format(hourDate, formatOutput)
}

export function timeAgo(dateParam: any): string | null {
  if (!dateParam) {
    return null
  }

  const newD = new Date(dateParam)
  const distance = formatDistanceToNow(newD, { addSuffix: true })

  return distance
}
