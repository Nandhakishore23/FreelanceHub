"use client"

import { useEffect, useState } from "react"
import { io, type Socket } from "socket.io-client"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const { data: session } = useSession()
  const { toast } = useToast()

  useEffect(() => {
    if (!session?.user) return

    const socketInstance = io({
      path: "/api/socket",
      auth: {
        token: document.cookie.split("next-auth.session-token=")[1]?.split(";")[0],
      },
    })

    socketInstance.on("connect", () => {
      console.log("Socket connected")
      setIsConnected(true)
    })

    socketInstance.on("disconnect", () => {
      console.log("Socket disconnected")
      setIsConnected(false)
    })

    socketInstance.on("error", (error) => {
      console.error("Socket error:", error)
      toast({
        title: "Connection Error",
        description: error.message || "Failed to connect to messaging service",
        variant: "destructive",
      })
    })

    socketInstance.on("notification", (notification) => {
      toast({
        title: notification.title,
        description: notification.content,
        action: notification.link ? (
          <a href={notification.link} className="underline">
            View
          </a>
        ) : undefined,
      })
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [session, toast])

  return { socket, isConnected }
}

