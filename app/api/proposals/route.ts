import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Schema for proposal creation
const proposalSchema = z.object({
  jobId: z.string(),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  proposedBudget: z.number().positive(),
  estimatedDuration: z.string().optional(),
  attachments: z.array(z.string()).optional(),
})

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "freelancer") {
      return NextResponse.json({ error: "Only freelancers can submit proposals" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = proposalSchema.parse(body)

    // Check if job exists
    const job = await prisma.job.findUnique({
      where: { id: validatedData.jobId },
    })

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 })
    }

    // Check if user already submitted a proposal for this job
    const existingProposal = await prisma.proposal.findFirst({
      where: {
        jobId: validatedData.jobId,
        freelancerId: user.id,
      },
    })

    if (existingProposal) {
      return NextResponse.json({ error: "You have already submitted a proposal for this job" }, { status: 400 })
    }

    // Create proposal
    const proposal = await prisma.proposal.create({
      data: {
        ...validatedData,
        freelancerId: user.id,
      },
    })

    // Create notification for job owner
    await prisma.notification.create({
      data: {
        userId: job.clientId,
        type: "proposal",
        title: "New Proposal",
        content: `You received a new proposal for "${job.title}"`,
        link: `/jobs/${job.id}/proposals`,
      },
    })

    return NextResponse.json(proposal, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error("Error creating proposal:", error)
    return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get("jobId")
    const status = searchParams.get("status")
    const page = Number(searchParams.get("page") || "1")
    const limit = Number(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = {}

    if (user.role === "freelancer") {
      where.freelancerId = user.id
    } else if (user.role === "client") {
      where.job = {
        clientId: user.id,
      }
    }

    if (jobId) where.jobId = jobId
    if (status) where.status = status

    // Get proposals with pagination
    const proposals = await prisma.proposal.findMany({
      where,
      include: {
        job: {
          select: {
            id: true,
            title: true,
            status: true,
            client: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
        freelancer: {
          select: {
            id: true,
            name: true,
            image: true,
            profile: {
              select: {
                title: true,
                skills: true,
                hourlyRate: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await prisma.proposal.count({ where })

    return NextResponse.json({
      proposals,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching proposals:", error)
    return NextResponse.json({ error: "Failed to fetch proposals" }, { status: 500 })
  }
}

