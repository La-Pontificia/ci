import { useEffect, useState, type ChangeEvent } from 'react'

export function useDebouncedInput(initialValue?: string, delay?: number) {
  const [value, setValue] = useState<string | null>(initialValue ?? null)
  const [debouncedValue, setDebouncedValue] = useState<string | null>(null)

  useEffect(() => {
    if (value !== initialValue) {
      const timeout: NodeJS.Timeout = setTimeout(() => {
        setDebouncedValue(value)
      }, delay)

      return () => {
        clearTimeout(timeout)
      }
    }
  }, [value, delay])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  return { value, debouncedValue, onChange: handleInputChange }
}
