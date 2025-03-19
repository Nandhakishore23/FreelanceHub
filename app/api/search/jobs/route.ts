import { NextResponse } from "next/server"
import { searchJobs } from "@/lib/search"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse search parameters
    const query = searchParams.get("query") || undefined
    const category = searchParams.get("category") || undefined
    const type = searchParams.get("type") || undefined
    const experienceLevel = searchParams.get("experienceLevel") || undefined
    const minBudget = searchParams.get("minBudget") ? Number(searchParams.get("minBudget")) : undefined
    const maxBudget = searchParams.get("maxBudget") ? Number(searchParams.get("maxBudget")) : undefined
    const skills = searchParams.get("skills") ? searchParams.get("skills")?.split(",") : undefined
    const page = Number(searchParams.get("page") || "1")
    const limit = Number(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc"

    const results = await searchJobs({
      query,
      category,
      type,
      experienceLevel,
      minBudget,
      maxBudget,
      skills,
      page,
      limit,
      sortBy,
      sortOrder,
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching jobs:", error)
    return NextResponse.json({ error: "Failed to search jobs" }, { status: 500 })
  }
}

