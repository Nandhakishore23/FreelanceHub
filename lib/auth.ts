import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getSession() {
  return await getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getSession()

  if (!session?.user?.email) {
    return null
  }

  return session.user
}

export async function isAuthenticated() {
  const session = await getSession()
  return !!session
}

export async function hasRole(role: string | string[]) {
  const session = await getSession()

  if (!session?.user?.role) {
    return false
  }

  if (Array.isArray(role)) {
    return role.includes(session.user.role)
  }

  return session.user.role === role
}

