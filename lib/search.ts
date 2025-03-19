import prisma from "@/lib/prisma"

export interface SearchParams {
  query?: string
  category?: string
  type?: string
  experienceLevel?: string
  minBudget?: number
  maxBudget?: number
  skills?: string[]
  location?: string
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: "asc" | "desc"
}

export async function searchJobs(params: SearchParams) {
  const {
    query,
    category,
    type,
    experienceLevel,
    minBudget,
    maxBudget,
    skills,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    sortOrder = "desc",
  } = params

  const skip = (page - 1) * limit

  // Build where clause
  const where: any = { status: "open" }

  if (query) {
    where.OR = [
      { title: { contains: query, mode: "insensitive" } },
      { description: { contains: query, mode: "insensitive" } },
    ]
  }

  if (category) where.category = category
  if (type) where.type = type
  if (experienceLevel) where.experienceLevel = experienceLevel
  if (minBudget) where.budgetMin = { gte: minBudget }
  if (maxBudget) where.budgetMax = { lte: maxBudget }

  if (skills && skills.length > 0) {
    where.skills = { hasSome: skills }
  }

  // Build order by
  const orderBy: any = {}
  orderBy[sortBy] = sortOrder

  // Execute query
  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      include: {
        client: {
          select: {
            id: true,
            name: true,
            image: true,
            profile: {
              select: {
                location: true,
              },
            },
          },
        },
        _count: {
          select: { proposals: true },
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.job.count({ where }),
  ])

  return {
    jobs,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit,
    },
  }
}

export async function searchFreelancers(params: SearchParams) {
  const { query, skills, location, page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc" } = params

  const skip = (page - 1) * limit

  // Build where clause
  const where: any = { role: "freelancer" }

  if (query) {
    where.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { profile: { bio: { contains: query, mode: "insensitive" } } },
      { profile: { title: { contains: query, mode: "insensitive" } } },
    ]
  }

  if (skills && skills.length > 0) {
    where.profile = {
      ...where.profile,
      skills: { hasSome: skills },
    }
  }

  if (location) {
    where.profile = {
      ...where.profile,
      location: { contains: location, mode: "insensitive" },
    }
  }

  // Build order by
  const orderBy: any = {}

  if (sortBy === "rating") {
    // For MongoDB, we need a different approach for aggregation
    // This is a simplified version - in a real app, you might need to use MongoDB's aggregation pipeline
    orderBy.reviews = { rating: sortOrder }
  } else {
    orderBy[sortBy] = sortOrder
  }

  // Execute query
  const [freelancers, total] = await Promise.all([
    prisma.user.findMany({
      where,
      include: {
        profile: {
          select: {
            title: true,
            bio: true,
            skills: true,
            hourlyRate: true,
            location: true,
          },
        },
        _count: {
          select: {
            contracts: true,
            reviews: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.user.count({ where }),
  ])

  // Calculate average rating for each freelancer
  const freelancersWithRating = freelancers.map((freelancer) => {
    const totalRating = freelancer.reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = freelancer.reviews.length > 0 ? totalRating / freelancer.reviews.length : 0

    return {
      ...freelancer,
      averageRating,
      totalReviews: freelancer.reviews.length,
      // Remove the raw reviews data
      reviews: undefined,
    }
  })

  return {
    freelancers: freelancersWithRating,
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      page,
      limit,
    },
  }
}

