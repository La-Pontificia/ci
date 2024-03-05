import { useState, useEffect } from 'react'

function useUniqueId(): string {
  const [uniqueId, setUniqueId] = useState<string>('')
  useEffect(() => {
    const generateUniqueId = (): string => {
      const characters: string =
        'AeBdDJLP6RrSaFbKcfOh1jTUVg2YNCiZpklIm9nWoEGHqMst7Quvwxyz034X58'
      let id: string = ''
      const idLength: number = 5
      for (let i = 0; i < idLength; i++) {
        const randomIndex: number = Math.floor(
          Math.random() * characters.length
        )
        id += characters[randomIndex]
      }
      return `cosmoui-:${id}`
    }
    setUniqueId(generateUniqueId())
  }, [])
  return uniqueId
}
export { useUniqueId }
