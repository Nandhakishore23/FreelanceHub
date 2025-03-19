import { NextResponse } from "next/server"
import { headers } from "next/headers"
import stripe from "@/lib/stripe"
import prisma from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = headers().get("stripe-signature") as string

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 })
    }

    // Verify webhook signature
    const event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET as string)

    // Handle different event types
    switch (event.type) {
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object)
        break
      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object)
        break
      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Error processing webhook:", error)
    return NextResponse.json({ error: "Webhook error" }, { status: 400 })
  }
}

async function handlePaymentSucceeded(paymentIntent: any) {
  const { contractId, clientId, freelancerId } = paymentIntent.metadata

  // Update payment status in database
  const payment = await prisma.payment.update({
    where: {
      stripePaymentId: paymentIntent.id,
    },
    data: {
      status: "completed",
    },
  })

  // Create notification for freelancer
  await prisma.notification.create({
    data: {
      userId: freelancerId,
      type: "payment",
      title: "Payment Received",
      content: `You have received a payment of $${(paymentIntent.amount / 100).toFixed(2)}`,
      link: `/payments/${payment.id}`,
    },
  })

  // Create notification for client
  await prisma.notification.create({
    data: {
      userId: clientId,
      type: "payment",
      title: "Payment Completed",
      content: `Your payment of $${(paymentIntent.amount / 100).toFixed(2)} has been completed`,
      link: `/payments/${payment.id}`,
    },
  })

  // Check if this is the final payment for a fixed-price contract
  const contract = await prisma.contract.findUnique({
    where: { id: contractId },
    include: {
      job: true,
      payments: true,
    },
  })

  if (contract?.job.type === "fixed") {
    const totalPaid = contract.payments.filter((p) => p.status === "completed").reduce((sum, p) => sum + p.amount, 0)

    const proposedBudget = await prisma.proposal.findUnique({
      where: { id: contract.proposalId },
      select: { proposedBudget: true },
    })

    // If total paid matches or exceeds the proposed budget, mark contract as completed
    if (proposedBudget && totalPaid >= proposedBudget.proposedBudget) {
      await prisma.contract.update({
        where: { id: contractId },
        data: { status: "completed" },
      })

      await prisma.job.update({
        where: { id: contract.jobId },
        data: { status: "completed" },
      })
    }
  }
}

async function handlePaymentFailed(paymentIntent: any) {
  const { contractId, clientId, freelancerId } = paymentIntent.metadata

  // Update payment status in database
  const payment = await prisma.payment.update({
    where: {
      stripePaymentId: paymentIntent.id,
    },
    data: {
      status: "failed",
    },
  })

  // Create notification for freelancer
  await prisma.notification.create({
    data: {
      userId: freelancerId,
      type: "payment",
      title: "Payment Failed",
      content: `A payment of $${(paymentIntent.amount / 100).toFixed(2)} has failed`,
      link: `/payments/${payment.id}`,
    },
  })

  // Create notification for client
  await prisma.notification.create({
    data: {
      userId: clientId,
      type: "payment",
      title: "Payment Failed",
      content: `Your payment of $${(paymentIntent.amount / 100).toFixed(2)} has failed. Please try again.`,
      link: `/payments/${payment.id}`,
    },
  })
}

