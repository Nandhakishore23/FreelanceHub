"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookmarkPlus, Clock, DollarSign, MapPin } from "lucide-react"
import Link from "next/link"

export default function JobList() {
  const [jobs, setJobs] = useState<{ id: string; title: string; client: { name: string; profile?: { location?: string } }; budgetMin: number; budgetMax: number; createdAt: string; type: string; description: string; skills: string[] }[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/jobs?${searchParams.toString()}`)

        if (!response.ok) {
          throw new Error("Failed to fetch jobs")
        }

        const data = await response.json()
        setJobs(data.jobs)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError("An unknown error occurred")
        }
      } finally {
        setLoading(false)
      }
    }

    fetchJobs()
  }, [searchParams])

  if (loading) {
    return <div>Loading jobs...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No jobs found</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
        </div>
      ) : (
        jobs.map((job) => (
          <Card key={job.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">
                    <Link href={`/jobs/${job.id}`} className="hover:underline">
                      {job.title}
                    </Link>
                  </CardTitle>
                  <div className="text-sm text-muted-foreground">{job.client.name}</div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <BookmarkPlus className="h-4 w-4" />
                  <span className="sr-only">Save job</span>
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col gap-4">
                <div className="flex flex-wrap gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{job.client.profile?.location || "Remote"}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span>
                      ${job.budgetMin} - ${job.budgetMax}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                  </div>
                  <Badge variant="outline">{job.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{job.description.substring(0, 200)}...</p>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="flex gap-2 w-full justify-end">
                <Button variant="outline" asChild>
                  <Link href={`/jobs/${job.id}`}>View Details</Link>
                </Button>
                <Button asChild>
                  <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  )
}

