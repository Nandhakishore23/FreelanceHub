"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, DollarSign, CalendarDays, Clock, Building, Link as LinkIcon, Download } from "lucide-react"
import Link from "next/link"

interface JobData {
  id: string;
  title: string;
  company: string;
  type: string;
  description: string;
  budgetMin: number;
  budgetMax: number;
}

interface ProposalData {
  id: string;
  jobId: string;
  coverLetter: string;
  proposedBudget: number;
  estimatedDuration: string;
  status: string;
  createdAt: string;
  attachments: string[];
  job: JobData;
}

export default function ProposalDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = React.use(params);
  const proposalId = resolvedParams.id;
  
  const { toast } = useToast()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [proposal, setProposal] = useState<ProposalData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check authentication
    if (status === "unauthenticated") {
      toast({
        title: "Authentication required",
        description: "Please sign in to view proposal details",
        variant: "destructive",
      })
      router.push(`/signin?callbackUrl=/proposals/${proposalId}`)
      return
    }

    // Fetch proposal details
    const fetchProposal = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/proposals/${proposalId}`)
        
        if (!response.ok) {
          throw new Error("Failed to fetch proposal details")
        }
        
        const data = await response.json()
        setProposal(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load proposal details. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (status === "authenticated" && proposalId) {
      fetchProposal()
    }
  }, [proposalId, status, router, toast])

  // Helper function to format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  // Function to determine badge color based on status
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'accepted':
        return 'bg-green-100 text-green-800'
      case 'rejected':
        return 'bg-red-100 text-red-800'
      case 'in progress':
        return 'bg-blue-100 text-blue-800'
      case 'completed':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (isLoading) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <p>Loading proposal details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!proposal) {
    return (
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Proposal not found</h2>
            <p className="text-muted-foreground mb-6">The proposal you're looking for doesn't exist or you don't have permission to view it.</p>
            <Button asChild>
              <Link href="/proposals/my-proposals">Back to My Proposals</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            href="/proposals/my-proposals"
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to my proposals
          </Link>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Proposal Details</h1>
            <p className="text-muted-foreground">
              Submitted on {formatDate(proposal.createdAt)}
            </p>
          </div>
          <Badge className={getStatusColor(proposal.status)}>
            {proposal.status}
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Budget</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <DollarSign className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{formatCurrency(proposal.proposedBudget)}</p>
                  <p className="text-sm text-muted-foreground">
                    {proposal.job.type === "fixed" ? "Fixed Price" : "Hourly Rate"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Duration</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <CalendarDays className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{proposal.estimatedDuration}</p>
                  <p className="text-sm text-muted-foreground">Estimated timeline</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Job Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start">
                <Building className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                <div>
                  <p className="text-lg font-semibold">{proposal.job.company}</p>
                  <p className="text-sm text-muted-foreground">
                    Budget: {formatCurrency(proposal.job.budgetMin)} - {formatCurrency(proposal.job.budgetMax)}
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/jobs/${proposal.jobId}`}>
                  View Full Job Posting
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
                <CardDescription>{proposal.job.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: proposal.job.description }} />
                </div>
              </CardContent>
            </Card>
  
            <Card>
              <CardHeader>
                <CardTitle>Cover Letter</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-sm max-w-none whitespace-pre-wrap">
                  {proposal.coverLetter}
                </div>
              </CardContent>
            </Card>
  
            {proposal.attachments && proposal.attachments.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Attachments</CardTitle>
                  <CardDescription>
                    Documents you included with this proposal
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {proposal.attachments.map((attachment, index) => {
                      const fileName = attachment.split('/').pop() || `Attachment ${index + 1}`;
                      return (
                        <li key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-md">
                          <div className="flex items-center">
                            <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span className="text-sm">{fileName}</span>
                          </div>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <span className="sr-only">Download file</span>
                            <Download className="h-4 w-4" />
                          </Button>
                        </li>
                      );
                    })}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {proposal.status === "pending" && (
          <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/proposals/${proposal.id}/edit`)}
            >
              Edit Proposal
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                // Handle withdraw functionality
                if (confirm("Are you sure you want to withdraw this proposal? This action cannot be undone.")) {
                  // API call to withdraw
                  toast({
                    title: "Proposal withdrawn",
                    description: "Your proposal has been successfully withdrawn.",
                  });
                  router.push("/proposals/my-proposals");
                }
              }}
            >
              Withdraw Proposal
            </Button>
          </div>
        )}
      </div>
  )
}