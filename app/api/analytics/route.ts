import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import clientPromise from "@/lib/mongodb"
import { z } from "zod"

// Schema for analytics event
const eventSchema = z.object({
  eventType: z.string(),
  eventData: z.record(z.any()).optional(),
  page: z.string().optional(),
  referrer: z.string().optional().nullable(),
})

export async function GET(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user || user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const period = searchParams.get("period") || "30d" // Default to last 30 days

    // Calculate date range based on period
    const now = new Date()
    let startDate: Date

    switch (period) {
      case "7d":
        startDate = new Date(now.setDate(now.getDate() - 7))
        break
      case "30d":
        startDate = new Date(now.setDate(now.getDate() - 30))
        break
      case "90d":
        startDate = new Date(now.setDate(now.getDate() - 90))
        break
      case "1y":
        startDate = new Date(now.setFullYear(now.getFullYear() - 1))
        break
      default:
        startDate = new Date(now.setDate(now.getDate() - 30))
    }

    const client = await clientPromise
    const db = client.db()

    // Using MongoDB's aggregation pipeline for analytics
    const [pageViews, events, newUsers, newJobs, newContracts, completedPayments] = await Promise.all([
      // Page views
      db
        .collection("PageView")
        .aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          { $group: { _id: "$page", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
          { $project: { page: "$_id", _id: 0, count: 1 } },
        ])
        .toArray(),

      // Events
      db
        .collection("Event")
        .aggregate([
          { $match: { createdAt: { $gte: startDate } } },
          { $group: { _id: "$eventType", count: { $sum: 1 } } },
          { $sort: { count: -1 } },
          { $limit: 10 },
          { $project: { eventType: "$_id", _id: 0, count: 1 } },
        ])
        .toArray(),

      // New users
      db
        .collection("User")
        .countDocuments({ createdAt: { $gte: startDate } }),

      // New jobs
      db
        .collection("Job")
        .countDocuments({ createdAt: { $gte: startDate } }),

      // New contracts
      db
        .collection("Contract")
        .countDocuments({ createdAt: { $gte: startDate } }),

      // Completed payments
      db
        .collection("Payment")
        .aggregate([
          { $match: { status: "completed", createdAt: { $gte: startDate } } },
          { $group: { _id: null, total: { $sum: "$amount" }, count: { $sum: 1 } } },
        ])
        .toArray(),
    ])

    return NextResponse.json({
      pageViews,
      events,
      newUsers,
      newJobs,
      newContracts,
      payments: {
        count: completedPayments.length > 0 ? completedPayments[0].count : 0,
        totalAmount: completedPayments.length > 0 ? completedPayments[0].total : 0,
      },
    })
  } catch (error) {
    console.error("Error fetching analytics:", error)
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 })
  }
}

