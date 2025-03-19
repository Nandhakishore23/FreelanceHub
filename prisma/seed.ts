import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const adminPassword = await bcrypt.hash("admin123", 10)
  const admin = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      hashedPassword: adminPassword,
      role: "admin",
      profile: {
        create: {
          title: "System Administrator",
        },
      },
    },
  })

  // Create client user
  const clientPassword = await bcrypt.hash("client123", 10)
  const client = await prisma.user.upsert({
    where: { email: "client@example.com" },
    update: {},
    create: {
      email: "client@example.com",
      name: "Client User",
      hashedPassword: clientPassword,
      role: "client",
      profile: {
        create: {
          title: "Project Manager",
          location: "New York, USA",
        },
      },
    },
  })

  // Create freelancer user
  const freelancerPassword = await bcrypt.hash("freelancer123", 10)
  const freelancer = await prisma.user.upsert({
    where: { email: "freelancer@example.com" },
    update: {},
    create: {
      email: "freelancer@example.com",
      name: "Freelancer User",
      hashedPassword: freelancerPassword,
      role: "freelancer",
      profile: {
        create: {
          title: "Full Stack Developer",
          bio: "Experienced developer with 5+ years of experience in web development.",
          skills: ["React", "Node.js", "MongoDB", "TypeScript"],
          hourlyRate: 50,
          location: "San Francisco, USA",
        },
      },
    },
  })

  // Create sample job
  const job = await prisma.job.create({
    data: {
      clientId: client.id,
      title: "Build a Freelancing hello motto Platform",
      description: "Looking for a skilled developer to build a freelancing hello motto Platform platform.",
      category: "web-development",
      type: "fixed",
      budgetMin: 3000,
      budgetMax: 5000,
      duration: "2-4-weeks",
      skills: ["React", "Node.js", "MongoDB", "Next.js"],
      experienceLevel: "intermediate",
    },
  })

  console.log({ admin, client, freelancer, job })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

