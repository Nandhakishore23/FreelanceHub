"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useSocket } from "@/hooks/use-socket"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Paperclip, Send } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface Message {
  id: string
  senderId: string
  content: string
  attachments: string[]
  readAt: Date | null
  createdAt: Date
  sender: {
    id: string
    name: string
    image: string
  }
}

interface ChatProps {
  conversationId: string
  receiverId: string
  initialMessages: Message[]
}

export default function Chat({ conversationId, receiverId, initialMessages = [] }: ChatProps) {
  const { data: session } = useSession()
  const { socket, isConnected } = useSocket()
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [typingUsers, setTypingUsers] = useState<{ [key: string]: string }>({})
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!socket || !isConnected) return

    // Join conversation room
    socket.emit("join-conversation", conversationId)

    // Listen for new messages
    socket.on("new-message", (message: Message) => {
      setMessages((prev) => [...prev, message])

      // Mark message as read if it's not from current user
      if (message.senderId !== session?.user?.id) {
        socket.emit("mark-as-read", message.id)
      }
    })

    // Listen for read receipts
    socket.on("message-read", (messageId: string) => {
      setMessages((prev) => prev.map((msg) => (msg.id === messageId ? { ...msg, readAt: new Date() } : msg)))
    })

    // Listen for typing indicators
    socket.on("user-typing", ({ userId, name }) => {
      setTypingUsers((prev) => ({ ...prev, [userId]: name }))
    })

    socket.on("user-stop-typing", ({ userId }) => {
      setTypingUsers((prev) => {
        const newTypingUsers = { ...prev }
        delete newTypingUsers[userId]
        return newTypingUsers
      })
    })

    return () => {
      // Leave conversation room
      socket.emit("leave-conversation", conversationId)
      socket.off("new-message")
      socket.off("message-read")
      socket.off("user-typing")
      socket.off("user-stop-typing")
    }
  }, [socket, isConnected, conversationId, session?.user?.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Mark initial unread messages as read
  useEffect(() => {
    if (!socket || !isConnected || !session?.user?.id) return

    const unreadMessages = initialMessages.filter((msg) => !msg.readAt && msg.senderId !== session.user.id)

    unreadMessages.forEach((msg) => {
      socket.emit("mark-as-read", msg.id)
    })
  }, [socket, isConnected, initialMessages, session?.user?.id])

  const handleSendMessage = () => {
    if (!socket || !newMessage.trim()) return

    socket.emit("send-message", {
      conversationId,
      receiverId,
      content: newMessage.trim(),
    })

    setNewMessage("")

    // Stop typing indicator
    handleStopTyping()
  }

  const handleTyping = () => {
    if (!socket) return

    setIsTyping(true)
    socket.emit("typing", conversationId)

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(handleStopTyping, 3000)
  }

  const handleStopTyping = () => {
    if (!socket) return

    setIsTyping(false)
    socket.emit("stop-typing", conversationId)

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current)
      typingTimeoutRef.current = null
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.senderId === session?.user?.id ? "justify-end" : "justify-start"}`}
          >
            <div className="flex items-start gap-2 max-w-[80%]">
              {message.senderId !== session?.user?.id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.sender.image} alt={message.sender.name} />
                  <AvatarFallback>{message.sender.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              )}
              <div className="flex flex-col">
                <Card
                  className={`${
                    message.senderId === session?.user?.id ? "bg-primary text-primary-foreground" : "bg-muted"
                  }`}
                >
                  <CardContent className="p-3">
                    <p className="whitespace-pre-wrap">{message.content}</p>
                    {message.attachments.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.attachments.map((attachment, index) => (
                          <a
                            key={index}
                            href={attachment}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block text-sm underline"
                          >
                            Attachment {index + 1}
                          </a>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
                <div className="flex items-center text-xs text-muted-foreground mt-1 gap-2">
                  <span>{formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}</span>
                  {message.senderId === session?.user?.id && <span>{message.readAt ? "Read" : "Delivered"}</span>}
                </div>
              </div>
              {message.senderId === session?.user?.id && (
                <Avatar className="h-8 w-8">
                  <AvatarImage src={session.user.image || ""} alt={session.user.name || ""} />
                  <AvatarFallback>{session.user.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
              )}
            </div>
          </div>
        ))}

        {Object.keys(typingUsers).length > 0 && (
          <div className="flex items-center text-sm text-muted-foreground">
            <div className="typing-indicator">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="ml-2">
              {Object.values(typingUsers).join(", ")} {Object.keys(typingUsers).length === 1 ? "is" : "are"} typing...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onInput={handleTyping}
            onBlur={handleStopTyping}
            placeholder="Type a message..."
            className="min-h-[60px] resize-none"
          />
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="icon" type="button" className="h-8 w-8">
              <Paperclip className="h-4 w-4" />
              <span className="sr-only">Attach file</span>
            </Button>
            <Button size="icon" type="button" onClick={handleSendMessage} className="h-8 w-8">
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
        {!isConnected && (
          <p className="text-sm text-destructive mt-2">Disconnected from messaging service. Trying to reconnect...</p>
        )}
      </div>
    </div>
  )
}

