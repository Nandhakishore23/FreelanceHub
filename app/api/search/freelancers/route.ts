import { NextResponse } from "next/server"
import { searchFreelancers } from "@/lib/search"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse search parameters
    const query = searchParams.get("query") || undefined
    const skills = searchParams.get("skills") ? searchParams.get("skills")?.split(",") : undefined
    const location = searchParams.get("location") || undefined
    const page = Number(searchParams.get("page") || "1")
    const limit = Number(searchParams.get("limit") || "10")
    const sortBy = searchParams.get("sortBy") || "createdAt"
    const sortOrder = (searchParams.get("sortOrder") || "desc") as "asc" | "desc"

    const results = await searchFreelancers({
      query,
      skills,
      location,
      page,
      limit,
      sortBy,
      sortOrder,
    })

    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching freelancers:", error)
    return NextResponse.json({ error: "Failed to search freelancers" }, { status: 500 })
  }
}

