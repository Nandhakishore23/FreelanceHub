import type { Server as NetServer } from "http"
import type { NextApiRequest } from "next"
import { Server as ServerIO } from "socket.io"
import type { NextApiResponseServerIO } from "@/types/socket"
import { getToken } from "next-auth/jwt"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const config = {
  api: {
    bodyParser: false,
  },
}

const initSocket = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    const httpServer: NetServer = res.socket.server as any
    const io = new ServerIO(httpServer, {
      path: "/api/socket",
      addTrailingSlash: false,
    })

    // Add authentication middleware
    io.use(async (socket, next) => {
      const token = socket.handshake.auth.token

      if (!token) {
        return next(new Error("Authentication error"))
      }

      try {
        // Verify token using NextAuth
        const user = await getToken({ req: { cookies: { "next-auth.session-token": token } } as any })

        if (!user) {
          return next(new Error("Authentication error"))
        }

        // Attach user data to socket
        socket.data.user = user
        next()
      } catch (error) {
        next(new Error("Authentication error"))
      }
    })

    // Socket event handlers
    io.on("connection", (socket) => {
      console.log(`User connected: ${socket.data.user.email}`)

      // Join user's personal room for notifications
      socket.join(`user:${socket.data.user.id}`)

      // Join conversation rooms
      socket.on("join-conversation", (conversationId) => {
        socket.join(`conversation:${conversationId}`)
      })

      // Leave conversation rooms
      socket.on("leave-conversation", (conversationId) => {
        socket.leave(`conversation:${conversationId}`)
      })

      // Handle new messages
      socket.on("send-message", async (data) => {
        const { conversationId, receiverId, content, attachments = [] } = data

        try {
          // Save message to database
          const message = await prisma.message.create({
            data: {
              conversationId,
              senderId: socket.data.user.id,
              receiverId,
              content,
              attachments,
            },
            include: {
              sender: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
            },
          })

          // Emit message to conversation room
          io.to(`conversation:${conversationId}`).emit("new-message", message)

          // Emit notification to receiver if not in the conversation
          io.to(`user:${receiverId}`).emit("notification", {
            type: "message",
            title: "New Message",
            content: `${socket.data.user.name}: ${content.substring(0, 50)}${content.length > 50 ? "..." : ""}`,
            link: `/messages/${conversationId}`,
          })

          // Create notification in database
          await prisma.notification.create({
            data: {
              userId: receiverId,
              type: "message",
              title: "New Message",
              content: `${socket.data.user.name}: ${content.substring(0, 50)}${content.length > 50 ? "..." : ""}`,
              link: `/messages/${conversationId}`,
            },
          })
        } catch (error) {
          console.error("Error sending message:", error)
          socket.emit("error", { message: "Failed to send message" })
        }
      })

      // Handle read receipts
      socket.on("mark-as-read", async (messageId) => {
        try {
          const message = await prisma.message.update({
            where: { id: messageId },
            data: { readAt: new Date() },
          })

          io.to(`conversation:${message.conversationId}`).emit("message-read", messageId)
        } catch (error) {
          console.error("Error marking message as read:", error)
        }
      })

      // Handle typing indicators
      socket.on("typing", (conversationId) => {
        socket.to(`conversation:${conversationId}`).emit("user-typing", {
          userId: socket.data.user.id,
          name: socket.data.user.name,
        })
      })

      socket.on("stop-typing", (conversationId) => {
        socket.to(`conversation:${conversationId}`).emit("user-stop-typing", {
          userId: socket.data.user.id,
        })
      })

      socket.on("disconnect", () => {
        console.log(`User disconnected: ${socket.data.user.email}`)
      })
    })

    res.socket.server.io = io
  }

  res.end()
}

export default initSocket

