"use client"

import { useEffect, useState, ReactNode } from "react"

interface ClientOnlyProps {
  children: ReactNode
}

/**
 * Component that only renders its children on the client, not during server-side rendering.
 * This helps avoid hydration errors with components that must be client-side only.
 */
export function ClientOnly({ children }: ClientOnlyProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
}
