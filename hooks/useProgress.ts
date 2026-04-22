'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'qubx-progress'

export function useProgress() {
  const [visited, setVisited] = useState<Set<string>>(new Set())

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setVisited(new Set(JSON.parse(stored)))
    } catch {
      // localStorage unavailable — proceed with empty set
    }
  }, [])

  const markVisited = useCallback((slug: string) => {
    setVisited((prev) => {
      const next = new Set(prev)
      next.add(slug)
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify([...next]))
      } catch {
        // ignore write errors
      }
      return next
    })
  }, [])

  return { visited, markVisited }
}
