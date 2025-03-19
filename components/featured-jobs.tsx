// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
// import Link from "next/link"
// import { BookmarkPlus, Clock, DollarSign, MapPin } from "lucide-react"

// // Mock data - would be fetched from API in a real application
// const featuredJobs = [
//   {
//     id: "1",
//     title: "Full Stack Developer for E-commerce Platform",
//     company: "TechSolutions Inc.",
//     location: "Remote",
//     budget: "$3,000 - $5,000",
//     type: "Fixed Price",
//     postedAt: "2 days ago",
//     skills: ["React", "Node.js", "MongoDB", "AWS"],
//     description:
//       "Looking for an experienced full stack developer to build a modern e-commerce platform with React frontend and Node.js backend.",
//   },
//   {
//     id: "2",
//     title: "UI/UX Designer for Mobile App",
//     company: "DesignWorks",
//     location: "Remote",
//     budget: "$50 - $70 / hr",
//     type: "Hourly",
//     postedAt: "1 day ago",
//     skills: ["Figma", "UI Design", "Mobile Design", "User Testing"],
//     description:
//       "We need a talented UI/UX designer to create an intuitive and engaging mobile app interface. Experience with user testing and iterative design is essential.",
//   },
//   {
//     id: "3",
//     title: "Content Writer for Technology Blog",
//     company: "TechInsights",
//     location: "Remote",
//     budget: "$30 - $40 / hr",
//     type: "Hourly",
//     postedAt: "3 days ago",
//     skills: ["Content Writing", "SEO", "Technology", "Research"],
//     description:
//       "Seeking a knowledgeable content writer to create engaging articles about the latest technology trends, software reviews, and industry insights.",
//   },
//   {
//     id: "4",
//     title: "WordPress Developer for Corporate Website",
//     company: "CorpSolutions",
//     location: "Remote",
//     budget: "$2,000 - $3,500",
//     type: "Fixed Price",
//     postedAt: "4 days ago",
//     skills: ["WordPress", "PHP", "JavaScript", "Responsive Design"],
//     description:
//       "We are looking for a WordPress developer to redesign our corporate website with modern design, improved performance, and enhanced security features.",
//   },
// ]

// export default function FeaturedJobs() {
//   return (
//     <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//       {featuredJobs.map((job) => (
//         <Card key={job.id} className="flex flex-col">
//           <CardHeader>
//             <div className="flex justify-between items-start">
//               <CardTitle className="text-xl">{job.title}</CardTitle>
//               <Button variant="ghost" size="icon" className="h-8 w-8">
//                 <BookmarkPlus className="h-4 w-4" />
//                 <span className="sr-only">Save job</span>
//               </Button>
//             </div>
//             <div className="text-sm text-muted-foreground">{job.company}</div>
//           </CardHeader>
//           <CardContent className="flex-1">
//             <div className="flex flex-col gap-4">
//               <div className="flex items-center gap-2 text-sm">
//                 <MapPin className="h-4 w-4 text-muted-foreground" />
//                 <span>{job.location}</span>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 <span>{job.budget}</span>
//                 <Badge variant="outline" className="ml-2">
//                   {job.type}
//                 </Badge>
//               </div>
//               <div className="flex items-center gap-2 text-sm">
//                 <Clock className="h-4 w-4 text-muted-foreground" />
//                 <span>Posted {job.postedAt}</span>
//               </div>
//               <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {job.skills.map((skill) => (
//                   <Badge key={skill} variant="secondary">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           </CardContent>
//           <CardFooter>
//             <Button asChild className="w-full">
//               <Link href={`/jobs/${job.id}`}>View Details</Link>
//             </Button>
//           </CardFooter>
//         </Card>
//       ))}
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookmarkPlus, Clock, DollarSign, MapPin } from "lucide-react"

export default function FeaturedJobs() {
  const [featuredJobs, setFeaturedJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedJobs = async () => {
      setLoading(true)
      try {
        // We'll fetch featured jobs with a limit of 4
        // You might want to add a "featured" parameter if your API supports it
        const params = new URLSearchParams()
        params.append("limit", "4")  // Limit to 4 featured jobs
        
        const response = await fetch(`/api/jobs?${params.toString()}`)
        if (!response.ok) throw new Error("Failed to fetch featured jobs")
        
        const data = await response.json()
        
        // Transform API response to match component's expected format
        interface ApiJob {
          id: string;
          title: string;
          client?: {
            name?: string;
          };
          budgetMin: number;
          budgetMax: number;
          type: string;
          createdAt: string;
          skills?: string[];
          description: string;
        }

        interface FormattedJob {
          id: string;
          title: string;
          company: string;
          location: string;
          budget: string;
          type: string;
          postedAt: string;
          skills: string[];
          description: string;
        }

        const formattedJobs: FormattedJob[] = data.jobs.map((job: ApiJob) => ({
          id: job.id,
          title: job.title,
          company: job.client?.name || "Anonymous",
          location: "Remote", // Assuming remote as default - modify if your API includes location
          budget: `$${job.budgetMin} - $${job.budgetMax}`,
          type: job.type === "fixed" ? "Fixed Price" : "Hourly",
          postedAt: formatDate(job.createdAt),
          skills: job.skills || [],
          description: job.description
        }));
        
        setFeaturedJobs(formattedJobs)
      } catch (error) {
        console.error("Error fetching featured jobs:", error)
        setFeaturedJobs([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchFeaturedJobs()
  }, [])

  // Format date to "X days ago"
  interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    budget: string;
    type: string;
    postedAt: string;
    skills: string[];
    description: string;
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 2));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="flex flex-col">
            <CardHeader>
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse mt-2"></div>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-col gap-4">
                <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                <div className="h-16 bg-gray-200 rounded w-full animate-pulse"></div>
                <div className="flex gap-2">
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-16 animate-pulse"></div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-gray-200 rounded w-full animate-pulse"></div>
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {featuredJobs.map((job) => (
        <Card key={job.id} className="flex flex-col">
          <CardHeader>
            <div className="flex justify-between items-start">
              <CardTitle className="text-xl">{job.title}</CardTitle>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <BookmarkPlus className="h-4 w-4" />
                <span className="sr-only">Save job</span>
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">{job.company}</div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{job.budget}</span>
                <Badge variant="outline" className="ml-2">
                  {job.type}
                </Badge>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Posted {job.postedAt}</span>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">{job.description}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {job.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link href={`/jobs/${job.id}`}>View Details</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}

      {featuredJobs.length === 0 && !loading && (
        <div className="col-span-full text-center py-8">
          <h3 className="text-lg font-medium">No featured jobs available</h3>
          <p className="text-muted-foreground mt-2">Check back soon for new opportunities</p>
        </div>
      )}
    </div>
  )
}