import { formatDistanceToNow } from 'date-fns'

export function convertTimestampToJSDate(timestamp: any): Date {
  return new Date(timestamp._seconds * 1000 + timestamp._nanoseconds / 1000000)
}

export function timeAgo(dateParam: Date | any | null): string | null {
  if (!dateParam) {
    return null
  }

  const date =
    dateParam instanceof Date ? dateParam : convertTimestampToJSDate(dateParam)
  const distance = formatDistanceToNow(date, { addSuffix: true })

  return distance
}
