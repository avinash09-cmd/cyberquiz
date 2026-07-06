import { useState, useCallback } from 'react'

/**
 * useLocalStorage — drop-in replacement for useState that persists to LocalStorage.
 * @param {string} key      — the localStorage key
 * @param {*}      initial  — default value if key doesn't exist
 */
export function useLocalStorage(key, initial) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : initial
    } catch {
      return initial
    }
  })

  const setValue = useCallback(
    (value) => {
      try {
        const toStore = value instanceof Function ? value(storedValue) : value
        setStoredValue(toStore)
        localStorage.setItem(key, JSON.stringify(toStore))
      } catch (error) {
        console.warn(`useLocalStorage: could not save key "${key}"`, error)
      }
    },
    [key, storedValue]
  )

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initial)
    } catch {
      // ignore
    }
  }, [key, initial])

  return [storedValue, setValue, removeValue]
}
