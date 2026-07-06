import { useState, useEffect, useRef, useCallback } from 'react'

/**
 * useQuizTimer — countdown timer for quizzes.
 * @param {number}   initialSeconds  — how long for this question (default 30s)
 * @param {Function} onExpire        — called when timer hits 0
 */
export function useQuizTimer(initialSeconds = 30, onExpire) {
  const [timeLeft, setTimeLeft]   = useState(initialSeconds)
  const [isRunning, setIsRunning] = useState(true)
  const intervalRef               = useRef(null)
  const onExpireRef               = useRef(onExpire)

  // Keep callback ref up to date without restarting timer
  useEffect(() => { onExpireRef.current = onExpire }, [onExpire])

  useEffect(() => {
    if (!isRunning) return

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          setIsRunning(false)
          onExpireRef.current?.()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [isRunning])

  /** Reset timer to initial value and restart */
  const reset = useCallback((newSeconds = initialSeconds) => {
    clearInterval(intervalRef.current)
    setTimeLeft(newSeconds)
    setIsRunning(true)
  }, [initialSeconds])

  /** Pause the timer */
  const pause = useCallback(() => {
    setIsRunning(false)
    clearInterval(intervalRef.current)
  }, [])

  /** Resume the timer */
  const resume = useCallback(() => {
    if (timeLeft > 0) setIsRunning(true)
  }, [timeLeft])

  // Percentage remaining for progress ring
  const percentage = Math.round((timeLeft / initialSeconds) * 100)

  // Color coding: green → yellow → red
  const color =
    percentage > 60 ? '#00ff88' :
    percentage > 30 ? '#ffd700' :
                      '#ff3860'

  return { timeLeft, percentage, color, reset, pause, resume, isRunning }
}
