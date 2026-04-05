import { useState } from 'react'

export default function useLocalStorage(key, initialValue) {

  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key)
    if (item) {
      return JSON.parse(item)
    }
    return initialValue
  })

  const setValue = (value) => {
    setStoredValue(value)
    localStorage.setItem(key, JSON.stringify(value))
  }

  return [storedValue, setValue]
}