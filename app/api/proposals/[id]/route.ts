import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import prisma from "@/lib/prisma"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const proposalId = params.id

    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        job: {
          select: {
            id: true,
            title: true,
            description: true,
            budgetMin: true,
            budgetMax: true,
            type: true,
            clientId: true,
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
                bio: true,
              },
            },
          },
        },
      },
    })

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 })
    }

    // Check if user has permission to view this proposal
    if (proposal.freelancerId !== user.id && proposal.job.clientId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "You don't have permission to view this proposal" }, { status: 403 })
    }

    return NextResponse.json(proposal)
  } catch (error) {
    console.error("Error fetching proposal:", error)
    return NextResponse.json({ error: "Failed to fetch proposal" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const proposalId = params.id
    const body = await request.json()

    // Check if proposal exists
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
      include: {
        job: {
          select: {
            clientId: true,
            status: true,
          },
        },
      },
    })

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 })
    }

    // Check permissions based on action
    if (body.status === "accepted") {
      // Only job owner can accept proposals
      if (proposal.job.clientId !== user.id) {
        return NextResponse.json({ error: "Only the job owner can accept proposals" }, { status: 403 })
      }

      // Check if job is still open
      if (proposal.job.status !== "open") {
        return NextResponse.json({ error: "This job is no longer accepting proposals" }, { status: 400 })
      }

      // For MongoDB, we need to use a session for transactions
      const session = await prisma.$transaction(async (tx) => {
        // Update proposal status
        const updatedProposal = await tx.proposal.update({
          where: { id: proposalId },
          data: { status: "accepted" },
        })

        // Update job status
        await tx.job.update({
          where: { id: proposal.job.id },
          data: { status: "in-progress" },
        })

        // Reject all other proposals for this job
        await tx.proposal.updateMany({
          where: {
            jobId: proposal.job.id,
            id: { not: proposalId },
          },
          data: { status: "rejected" },
        })

        // Create contract
        const contract = await tx.contract.create({
          data: {
            jobId: proposal.job.id,
            proposalId: proposalId,
            clientId: proposal.job.clientId,
            freelancerId: proposal.freelancerId,
            terms: `Contract for proposal ${proposalId} with budget ${proposal.proposedBudget}`,
          },
        })

        return contract
      })

      // Create notification for freelancer
      await prisma.notification.create({
        data: {
          userId: proposal.freelancerId,
          type: "contract",
          title: "Proposal Accepted",
          content: `Your proposal has been accepted! A new contract has been created.`,
          link: `/contracts/${session.id}`,
        },
      })

      return NextResponse.json({
        success: true,
        proposal: { ...proposal, status: "accepted" },
        contract: session,
      })
    } else if (body.status === "rejected") {
      // Only job owner can reject proposals
      if (proposal.job.clientId !== user.id) {
        return NextResponse.json({ error: "Only the job owner can reject proposals" }, { status: 403 })
      }

      // Update proposal
      const updatedProposal = await prisma.proposal.update({
        where: { id: proposalId },
        data: { status: "rejected" },
      })

      // Create notification for freelancer
      await prisma.notification.create({
        data: {
          userId: proposal.freelancerId,
          type: "proposal",
          title: "Proposal Rejected",
          content: `Your proposal for a job has been rejected.`,
          link: `/proposals/${proposalId}`,
        },
      })

      return NextResponse.json({
        success: true,
        proposal: updatedProposal,
      })
    } else {
      // For other updates, only the proposal owner can update
      if (proposal.freelancerId !== user.id) {
        return NextResponse.json({ error: "You don't have permission to update this proposal" }, { status: 403 })
      }

      // Update proposal
      const updatedProposal = await prisma.proposal.update({
        where: { id: proposalId },
        data: body,
      })

      return NextResponse.json(updatedProposal)
    }
  } catch (error) {
    console.error("Error updating proposal:", error)
    return NextResponse.json({ error: "Failed to update proposal" }, { status: 500 })
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const proposalId = params.id

    // Check if proposal exists and belongs to the user
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposalId },
    })

    if (!proposal) {
      return NextResponse.json({ error: "Proposal not found" }, { status: 404 })
    }

    if (proposal.freelancerId !== user.id && user.role !== "admin") {
      return NextResponse.json({ error: "You don't have permission to delete this proposal" }, { status: 403 })
    }

    // Delete proposal
    await prisma.proposal.delete({
      where: { id: proposalId },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting proposal:", error)
    return NextResponse.json({ error: "Failed to delete proposal" }, { status: 500 })
  }
}

