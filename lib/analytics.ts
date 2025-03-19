import prisma from "@/lib/prisma"

export async function trackPageView(userId: string | null, page: string, referrer: string | null) {
  try {
    await prisma.pageView.create({
      data: {
        userId,
        page,
        referrer,
        userAgent: typeof window !== "undefined" ? window.navigator.userAgent : null,
      },
    })
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

export async function trackEvent(userId: string | null, eventType: string, eventData: Record<string, any>) {
  try {
    await prisma.event.create({
      data: {
        userId,
        eventType,
        eventData,
      },
    })
  } catch (error) {
    console.error("Error tracking event:", error)
  }
}

export async function getUserStats(userId: string) {
  try {
    // For freelancers
    const freelancerStats = await prisma.user.findUnique({
      where: { id: userId, role: "freelancer" },
      select: {
        _count: {
          select: {
            proposals: true,
            contracts: true,
            receivedPayments: true,
          },
        },
        receivedPayments: {
          where: {
            status: "completed",
          },
          select: {
            amount: true,
            createdAt: true,
          },
        },
        reviews: {
          select: {
            rating: true,
          },
        },
      },
    })

    // For clients
    const clientStats = await prisma.user.findUnique({
      where: { id: userId, role: "client" },
      select: {
        _count: {
          select: {
            jobs: true,
            contracts: true,
            payments: true,
          },
        },
        jobs: {
          select: {
            _count: {
              select: {
                proposals: true,
              },
            },
          },
        },
        payments: {
          where: {
            status: "completed",
          },
          select: {
            amount: true,
            createdAt: true,
          },
        },
      },
    })

    // Calculate earnings/spending by month
    const monthlyData = freelancerStats
      ? calculateMonthlyData(freelancerStats.receivedPayments)
      : calculateMonthlyData(clientStats?.payments || [])

    // Calculate average rating
    const averageRating =
      freelancerStats && freelancerStats.reviews.length > 0
        ? freelancerStats.reviews.reduce((sum, review) => sum + review.rating, 0) / freelancerStats.reviews.length
        : null

    return {
      freelancerStats: freelancerStats
        ? {
            proposalCount: freelancerStats._count.proposals,
            contractCount: freelancerStats._count.contracts,
            paymentCount: freelancerStats._count.receivedPayments,
            totalEarnings: freelancerStats.receivedPayments.reduce((sum, payment) => sum + payment.amount, 0),
            averageRating,
            monthlyEarnings: monthlyData,
          }
        : null,
      clientStats: clientStats
        ? {
            jobCount: clientStats._count.jobs,
            contractCount: clientStats._count.contracts,
            paymentCount: clientStats._count.payments,
            totalSpending: clientStats.payments.reduce((sum, payment) => sum + payment.amount, 0),
            totalProposalsReceived: clientStats.jobs.reduce((sum, job) => sum + job._count.proposals, 0),
            monthlySpending: monthlyData,
          }
        : null,
    }
  } catch (error) {
    console.error("Error getting user stats:", error)
    return { freelancerStats: null, clientStats: null }
  }
}

function calculateMonthlyData(payments: { amount: number; createdAt: Date }[]) {
  const monthlyData: Record<string, number> = {}

  payments.forEach((payment) => {
    const date = new Date(payment.createdAt)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`

    if (!monthlyData[monthYear]) {
      monthlyData[monthYear] = 0
    }

    monthlyData[monthYear] += payment.amount
  })

  // Convert to array and sort by date
  return Object.entries(monthlyData)
    .map(([date, amount]) => ({ date, amount }))
    .sort((a, b) => a.date.localeCompare(b.date))
}

