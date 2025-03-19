import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"
import stripe from "@/lib/stripe"
import { z } from "zod"

// Schema for payment intent creation
const paymentIntentSchema = z.object({
  contractId: z.string(),
  amount: z.number().positive(),
  description: z.string(),
  type: z.enum(["milestone", "hourly", "bonus"]),
})

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    if (user.role !== "client") {
      return NextResponse.json({ error: "Only clients can make payments" }, { status: 403 })
    }

    const body = await request.json()
    const validatedData = paymentIntentSchema.parse(body)

    // Check if contract exists and belongs to the user
    const contract = await prisma.contract.findUnique({
      where: {
        id: validatedData.contractId,
        clientId: user.id,
      },
      include: {
        freelancer: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        job: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    })

    if (!contract) {
      return NextResponse.json({ error: "Contract not found or you don't have permission" }, { status: 404 })
    }

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(validatedData.amount * 100), // Convert to cents
      currency: "usd",
      metadata: {
        contractId: validatedData.contractId,
        jobId: contract.job.id,
        jobTitle: contract.job.title,
        clientId: user.id,
        freelancerId: contract.freelancer.id,
        paymentType: validatedData.type,
      },
      description: validatedData.description,
    })

    // Create payment record in database
    const payment = await prisma.payment.create({
      data: {
        contractId: validatedData.contractId,
        clientId: user.id,
        freelancerId: contract.freelancer.id,
        amount: validatedData.amount,
        type: validatedData.type,
        description: validatedData.description,
        stripePaymentId: paymentIntent.id,
      },
    })

    // Create notification for freelancer
    await prisma.notification.create({
      data: {
        userId: contract.freelancer.id,
        type: "payment",
        title: "Payment Initiated",
        content: `A payment of $${validatedData.amount} has been initiated for your work on "${contract.job.title}"`,
        link: `/contracts/${contract.id}`,
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error("Error creating payment intent:", error)
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 })
  }
}

