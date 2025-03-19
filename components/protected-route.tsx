"use client"

import type React from "react"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { Loader2 } from "lucide-react"

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}: {
  children: React.ReactNode
  allowedRoles?: string[]
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login?callbackUrl=" + encodeURIComponent(window.location.href))
    } else if (
      status === "authenticated" &&
      allowedRoles.length > 0 &&
      !allowedRoles.includes(session?.user?.role as string)
    ) {
      router.push("/unauthorized")
    }
  }, [status, router, session, allowedRoles])

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (
    status === "authenticated" &&
    (allowedRoles.length === 0 || allowedRoles.includes(session?.user?.role as string))
  ) {
    return <>{children}</>
  }

  return null
}

