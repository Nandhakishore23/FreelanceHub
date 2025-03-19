"use client"

import type React from "react"

import { createContext, useContext, useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"

interface AnalyticsContextType {
  trackEvent: (eventType: string, eventData?: Record<string, any>) => void
}

const AnalyticsContext = createContext<AnalyticsContextType | null>(null)

export function useAnalytics() {
  const context = useContext(AnalyticsContext)
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider")
  }
  return context
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { data: session } = useSession()

  // Track page views
  useEffect(() => {
    if (!pathname) return

    const trackPageView = async () => {
      try {
        await fetch("/api/analytics", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventType: "pageView",
            page: pathname,
            referrer: document.referrer || null,
          }),
        })
      } catch (error) {
        console.error("Failed to track page view:", error)
      }
    }

    trackPageView()
  }, [pathname, searchParams])

  // Track events
  const trackEvent = async (eventType: string, eventData: Record<string, any> = {}) => {
    try {
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventType,
          eventData: {
            ...eventData,
            path: pathname,
          },
        }),
      })
    } catch (error) {
      console.error(`Failed to track event ${eventType}:`, error)
    }
  }

  return <AnalyticsContext.Provider value={{ trackEvent }}>{children}</AnalyticsContext.Provider>
}

