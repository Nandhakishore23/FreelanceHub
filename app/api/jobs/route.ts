import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import { z } from "zod"

// Schema for job creation
const jobSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  category: z.string(),
  type: z.enum(["fixed", "hourly"]),
  budgetMin: z.number().positive(),
  budgetMax: z.number().positive(),
  duration: z.string().optional(),
  skills: z.array(z.string()),
  experienceLevel: z.enum(["entry", "intermediate", "expert"]),
})

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "client") {
      return NextResponse.json({ error: "Only clients can post jobs" }, { status: 403 })
    }

    const body = await request.json()
    console.log("Creating job:", body);
    // const validatedData = jobSchema.parse(body)
    // console.log("Validated job:", validatedData); 
    const budgetMin = body.budget?.min ? Number(body.budget.min) : null;
    const budgetMax = body.budget?.max ? Number(body.budget.max) : null;

    if (budgetMin === null || budgetMax === null || isNaN(budgetMin) || isNaN(budgetMax)) {
      return NextResponse.json({ error: "budgetMin and budgetMax must be valid numbers" }, { status: 400 });
    }


    const job = await prisma.job.create({
      // data: {
      //   clientId: user.id,
      //   ...validatedData,
      // },

      data: {

        clientId: user.id,
        title: body.title || "Default Title",
        description: body.description || "Default Description",
        category: body.category || "Default Category",
        type: body.type || "fixed",
        budgetMin,
        budgetMax,
        duration: body.duration || "Not specified",
        skills: body.skills || [],
        experienceLevel: body.experienceLevel || "entry",
      },
    })

    return NextResponse.json(job, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const category = searchParams.get("category")
    const type = searchParams.get("type")
    const experienceLevel = searchParams.get("experienceLevel")
    const minBudget = searchParams.get("minBudget") ? Number(searchParams.get("minBudget")) : undefined
    const search = searchParams.get("search")
    const page = Number(searchParams.get("page") || "1")
    const limit = Number(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build filter object
    const where: any = { status: "open" }

    if (category) where.category = category
    if (type) where.type = type
    if (experienceLevel) where.experienceLevel = experienceLevel
    if (minBudget) where.budgetMin = { gte: minBudget }
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
      ]
    }

    // Get jobs with pagination
    const jobs = await prisma.job.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            image: true,
          },
        },
        _count: {
          select: { proposals: true },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    })

    // Get total count for pagination
    const total = await prisma.job.count({ where })

    return NextResponse.json({
      jobs,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    })
  } catch (error) {
    console.error("Error fetching jobs:", error)
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 })
  }
}

