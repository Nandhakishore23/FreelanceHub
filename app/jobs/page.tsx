// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Slider } from "@/components/ui/slider"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Checkbox } from "@/components/ui/checkbox"
// import { BookmarkPlus, Clock, DollarSign, MapPin, Search } from "lucide-react"
// import Link from "next/link"

// // Mock data - would be fetched from API in a real application
// const jobs = [
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
//   {
//     id: "5",
//     title: "Social Media Manager for Startup",
//     company: "GrowthHackers",
//     location: "Remote",
//     budget: "$25 - $35 / hr",
//     type: "Hourly",
//     postedAt: "2 days ago",
//     skills: ["Social Media", "Content Creation", "Analytics", "Marketing"],
//     description:
//       "We need a creative social media manager to develop and implement a comprehensive social media strategy for our growing startup.",
//   },
//   {
//     id: "6",
//     title: "Mobile App Developer (React Native)",
//     company: "AppInnovations",
//     location: "Remote",
//     budget: "$4,000 - $6,000",
//     type: "Fixed Price",
//     postedAt: "5 days ago",
//     skills: ["React Native", "JavaScript", "iOS", "Android"],
//     description:
//       "Looking for a skilled React Native developer to build a cross-platform mobile app with complex features and integrations.",
//   },
// ]

// export default function JobsPage() {
//   const [searchTerm, setSearchTerm] = useState("")
//   const [filters, setFilters] = useState({
//     category: "",
//     jobType: "",
//     experienceLevel: "",
//     budget: [0, 10000],
//     skills: [] as string[],
//   })

//   // Filter jobs based on search term and filters
//   const filteredJobs = jobs.filter((job) => {
//     // Search term filter
//     if (
//       searchTerm &&
//       !job.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
//       !job.description.toLowerCase().includes(searchTerm.toLowerCase())
//     ) {
//       return false
//     }

//     // Budget filter
//     const jobBudget = job.budget
//       .replace(/[^0-9]/g, " ")
//       .trim()
//       .split(/\s+/)
//     const minBudget = Number.parseInt(jobBudget[0])
//     if (minBudget < filters.budget[0]) {
//       return false
//     }

//     // Job type filter
//     if (filters.jobType && !job.type.toLowerCase().includes(filters.jobType.toLowerCase())) {
//       return false
//     }

//     return true
//   })

//   return (
//     <div className="container py-12">
//       <h1 className="text-3xl font-bold mb-6">Find Work</h1>

//       {/* Search and Filters */}
//       <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
//         <div className="space-y-6">
//           <Card>
//             <CardHeader>
//               <CardTitle>Filters</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <h3 className="text-sm font-medium">Category</h3>
//                 <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
//                   <SelectTrigger>
//                     <SelectValue placeholder="All Categories" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="all">All Categories</SelectItem>
//                     <SelectItem value="web-development">Web Development</SelectItem>
//                     <SelectItem value="mobile-development">Mobile Development</SelectItem>
//                     <SelectItem value="design">Design & Creative</SelectItem>
//                     <SelectItem value="writing">Writing & Translation</SelectItem>
//                     <SelectItem value="admin-support">Admin Support</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-sm font-medium">Job Type</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="fixed"
//                       checked={filters.jobType === "Fixed Price"}
//                       onCheckedChange={() =>
//                         setFilters({ ...filters, jobType: filters.jobType === "Fixed Price" ? "" : "Fixed Price" })
//                       }
//                     />
//                     <label htmlFor="fixed" className="text-sm cursor-pointer">
//                       Fixed Price
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox
//                       id="hourly"
//                       checked={filters.jobType === "Hourly"}
//                       onCheckedChange={() =>
//                         setFilters({ ...filters, jobType: filters.jobType === "Hourly" ? "" : "Hourly" })
//                       }
//                     />
//                     <label htmlFor="hourly" className="text-sm cursor-pointer">
//                       Hourly Rate
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-2">
//                 <h3 className="text-sm font-medium">Experience Level</h3>
//                 <div className="space-y-2">
//                   <div className="flex items-center space-x-2">
//                     <Checkbox id="entry" />
//                     <label htmlFor="entry" className="text-sm cursor-pointer">
//                       Entry Level
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox id="intermediate" />
//                     <label htmlFor="intermediate" className="text-sm cursor-pointer">
//                       Intermediate
//                     </label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Checkbox id="expert" />
//                     <label htmlFor="expert" className="text-sm cursor-pointer">
//                       Expert
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex justify-between">
//                   <h3 className="text-sm font-medium">Budget Range</h3>
//                   <span className="text-sm">
//                     ${filters.budget[0]} - ${filters.budget[1]}
//                   </span>
//                 </div>
//                 <Slider
//                   defaultValue={[0, 10000]}
//                   max={10000}
//                   min={0}
//                   step={100}
//                   onValueChange={(value) => setFilters({ ...filters, budget: value })}
//                 />
//               </div>
//             </CardContent>
//           </Card>
//         </div>

//         <div className="space-y-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
//               <Input
//                 placeholder="Search jobs by title or keyword"
//                 className="pl-10"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//             <Select defaultValue="newest">
//               <SelectTrigger className="w-[180px]">
//                 <SelectValue placeholder="Sort by" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="newest">Newest First</SelectItem>
//                 <SelectItem value="oldest">Oldest First</SelectItem>
//                 <SelectItem value="budget-high">Budget: High to Low</SelectItem>
//                 <SelectItem value="budget-low">Budget: Low to High</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="text-sm text-muted-foreground">
//             Showing {filteredJobs.length} of {jobs.length} jobs
//           </div>

//           <div className="space-y-4">
//             {filteredJobs.map((job) => (
//               <Card key={job.id}>
//                 <CardHeader className="pb-2">
//                   <div className="flex justify-between items-start">
//                     <div>
//                       <CardTitle className="text-xl">
//                         <Link href={`/jobs/${job.id}`} className="hover:underline">
//                           {job.title}
//                         </Link>
//                       </CardTitle>
//                       <div className="text-sm text-muted-foreground">{job.company}</div>
//                     </div>
//                     <Button variant="ghost" size="icon" className="h-8 w-8">
//                       <BookmarkPlus className="h-4 w-4" />
//                       <span className="sr-only">Save job</span>
//                     </Button>
//                   </div>
//                 </CardHeader>
//                 <CardContent className="pb-2">
//                   <div className="flex flex-col gap-4">
//                     <div className="flex flex-wrap gap-4 text-sm">
//                       <div className="flex items-center gap-1">
//                         <MapPin className="h-4 w-4 text-muted-foreground" />
//                         <span>{job.location}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <DollarSign className="h-4 w-4 text-muted-foreground" />
//                         <span>{job.budget}</span>
//                       </div>
//                       <div className="flex items-center gap-1">
//                         <Clock className="h-4 w-4 text-muted-foreground" />
//                         <span>Posted {job.postedAt}</span>
//                       </div>
//                       <Badge variant="outline">{job.type}</Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground">{job.description}</p>
//                     <div className="flex flex-wrap gap-2">
//                       {job.skills.map((skill) => (
//                         <Badge key={skill} variant="secondary">
//                           {skill}
//                         </Badge>
//                       ))}
//                     </div>
//                   </div>
//                 </CardContent>
//                 <CardFooter>
//                   <div className="flex gap-2 w-full justify-end">
//                     <Button variant="outline" asChild>
//                       <Link href={`/jobs/${job.id}`}>View Details</Link>
//                     </Button>
//                     <Button asChild>
//                       <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
//                     </Button>
//                   </div>
//                 </CardFooter>
//               </Card>
//             ))}

//             {filteredJobs.length === 0 && (
//               <div className="text-center py-12">
//                 <h3 className="text-lg font-medium">No jobs found</h3>
//                 <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { BookmarkPlus, Clock, DollarSign, MapPin, Search } from "lucide-react"
import Link from "next/link"

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    category: "",
    jobType: "",
    experienceLevel: "",
    budget: [0, 10000],
    skills: [] as string[],
  })
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    total: 0,
    pages: 0,
    page: 1,
    limit: 10,
  })
  const [sortBy, setSortBy] = useState("newest")

  // Fetch jobs from API
  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true)
      try {
        // Build query parameters based on filters
        const params = new URLSearchParams()
        
        if (searchTerm) params.append("search", searchTerm)
        if (filters.category) params.append("category", filters.category)
        if (filters.jobType) params.append("type", filters.jobType.toLowerCase() === "fixed price" ? "fixed" : "hourly")
        if (filters.experienceLevel) params.append("experienceLevel", filters.experienceLevel)
        if (filters.budget[0] > 0) params.append("minBudget", filters.budget[0].toString())
        
        params.append("page", pagination.page.toString())
        params.append("limit", pagination.limit.toString())
        
        const response = await fetch(`/api/jobs?${params.toString()}`)
        if (!response.ok) throw new Error("Failed to fetch jobs")
        
        const data = await response.json()
        
        // Transform API response to match component's expected format
        const formattedJobs: Job[] = data.jobs.map((job: any) => ({
          id: job.id,
          title: job.title,
          company: job.client?.name || "Anonymous",
          location: "Remote", // Assuming remote as default - modify if your API includes location
          budget: `$${job.budgetMin} - $${job.budgetMax}`,
          type: job.type === "fixed" ? "Fixed Price" : "Hourly",
          postedAt: formatDate(job.createdAt),
          skills: job.skills || [],
          description: job.description,
          proposalCount: job._count?.proposals || 0
        }))
        
        setJobs(formattedJobs)
        setPagination(data.pagination)
      } catch (error) {
        console.error("Error fetching jobs:", error)
        setJobs([])
      } finally {
        setLoading(false)
      }
    }
    
    fetchJobs()
  }, [searchTerm, filters, pagination.page, pagination.limit, sortBy])

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
    proposalCount: number;
  }

  interface Pagination {
    total: number;
    pages: number;
    page: number;
    limit: number;
  }

  interface Filters {
    category: string;
    jobType: string;
    experienceLevel: string;
    budget: number[];
    skills: string[];
  }

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  }

  // Filter jobs based on client-side filters
  // (For more complex filtering, adjust your API call instead)
  const filteredJobs = jobs.filter((job) => {
    // Budget filter - additional client-side filtering if needed
    const jobBudget = job.budget
      .replace(/[^0-9]/g, " ")
      .trim()
      .split(/\s+/)
    const minBudget = Number.parseInt(jobBudget[0])
    if (minBudget < filters.budget[0]) {
      return false
    }

    return true
  })

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Find Work</h1>

      {/* Search and Filters */}
      <div className="grid gap-6 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr]">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Category</h3>
                <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="design">Design & Creative</SelectItem>
                    <SelectItem value="writing">Writing & Translation</SelectItem>
                    <SelectItem value="admin-support">Admin Support</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Job Type</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="fixed"
                      checked={filters.jobType === "Fixed Price"}
                      onCheckedChange={() =>
                        setFilters({ ...filters, jobType: filters.jobType === "Fixed Price" ? "" : "Fixed Price" })
                      }
                    />
                    <label htmlFor="fixed" className="text-sm cursor-pointer">
                      Fixed Price
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hourly"
                      checked={filters.jobType === "Hourly"}
                      onCheckedChange={() =>
                        setFilters({ ...filters, jobType: filters.jobType === "Hourly" ? "" : "Hourly" })
                      }
                    />
                    <label htmlFor="hourly" className="text-sm cursor-pointer">
                      Hourly Rate
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Experience Level</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="entry" 
                      checked={filters.experienceLevel === "entry"}
                      onCheckedChange={() =>
                        setFilters({ ...filters, experienceLevel: filters.experienceLevel === "entry" ? "" : "entry" })
                      }
                    />
                    <label htmlFor="entry" className="text-sm cursor-pointer">
                      Entry Level
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="intermediate"
                      checked={filters.experienceLevel === "intermediate"}
                      onCheckedChange={() =>
                        setFilters({ ...filters, experienceLevel: filters.experienceLevel === "intermediate" ? "" : "intermediate" })
                      }
                    />
                    <label htmlFor="intermediate" className="text-sm cursor-pointer">
                      Intermediate
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="expert"
                      checked={filters.experienceLevel === "expert"}
                      onCheckedChange={() =>
                        setFilters({ ...filters, experienceLevel: filters.experienceLevel === "expert" ? "" : "expert" })
                      }
                    />
                    <label htmlFor="expert" className="text-sm cursor-pointer">
                      Expert
                    </label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">Budget Range</h3>
                  <span className="text-sm">
                    ${filters.budget[0]} - ${filters.budget[1]}
                  </span>
                </div>
                <Slider
                  defaultValue={[0, 10000]}
                  max={10000}
                  min={0}
                  step={100}
                  onValueChange={(value) => setFilters({ ...filters, budget: value })}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search jobs by title or keyword"
                className="pl-10"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  // Reset to page 1 when search changes
                  if (pagination.page !== 1) {
                    setPagination({...pagination, page: 1})
                  }
                }}
              />
            </div>
            <Select 
              value={sortBy} 
              onValueChange={(value) => setSortBy(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="budget-high">Budget: High to Low</SelectItem>
                <SelectItem value="budget-low">Budget: Low to High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredJobs.length} of {pagination.total} jobs
          </div>

          {loading ? (
            <div className="text-center py-12">
              <p>Loading jobs...</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">
                          <Link href={`/jobs/${job.id}`} className="hover:underline">
                            {job.title}
                          </Link>
                        </CardTitle>
                        <div className="text-sm text-muted-foreground">{job.company}</div>
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
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span>{job.budget}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>Posted {job.postedAt}</span>
                        </div>
                        <Badge variant="outline">{job.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{job.description}</p>
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
              ))}

              {filteredJobs.length === 0 && !loading && (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium">No jobs found</h3>
                  <p className="text-muted-foreground mt-2">Try adjusting your search or filters</p>
                </div>
              )}

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  <Button
                    variant="outline"
                    onClick={() => setPagination({...pagination, page: Math.max(1, pagination.page - 1)})}
                    disabled={pagination.page === 1}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <Button
                    variant="outline"
                    onClick={() => setPagination({...pagination, page: Math.min(pagination.pages, pagination.page + 1)})}
                    disabled={pagination.page === pagination.pages}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}