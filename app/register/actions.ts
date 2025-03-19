"use server"

import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { z } from "zod"

const prisma = new PrismaClient()

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  userType: z.enum(["freelancer", "client"]),
})

export async function registerUser(formData: FormData) {
  try {
    const validatedFields = registerSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      userType: formData.get("userType"),
    })

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: validatedFields.email },
    })

    if (existingUser) {
      return { error: "Email already in use" }
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedFields.password, 10)

    // Create user
    const user = await prisma.user.create({
      data: {
        name: validatedFields.name,
        email: validatedFields.email,
        hashedPassword,
        role: validatedFields.userType,
        profile: {
          create: {
            title: validatedFields.userType === "freelancer" ? "Freelancer" : "Client",
          },
        },
      },
    })

    return { success: true, userId: user.id }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { error: error.errors[0].message }
    }

    return { error: "Registration failed. Please try again." }
  }
}

