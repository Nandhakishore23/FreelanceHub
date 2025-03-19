// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import { Card, CardContent } from "@/components/ui/card"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { BookmarkPlus, Clock, DollarSign, MapPin, Share2, Building, Calendar, Award } from "lucide-react"
// import Link from "next/link"

// // This would be a server component in a real app, fetching data based on the job ID
// export default function JobDetailPage({ params }: { params: { id: string } }) {
//   // Mock data - would be fetched from API in a real application
//   const job = {
//     id: params.id,
//     title: "Full Stack Developer for E-commerce Platform",
//     company: "TechSolutions Inc.",
//     companyLogo: "/placeholder.svg?height=100&width=100",
//     location: "Remote",
//     budget: "$3,000 - $5,000",
//     type: "Fixed Price",
//     postedAt: "2 days ago",
//     duration: "2-4 weeks",
//     experienceLevel: "Intermediate",
//     skills: ["React", "Node.js", "MongoDB", "AWS", "TypeScript", "Redux", "Express.js", "REST API"],
//     description: `
//       <p>We are looking for an experienced Full Stack Developer to build a modern e-commerce platform for our client in the fashion industry.</p>
      
//       <h3>Project Overview:</h3>
//       <p>The project involves developing a complete e-commerce solution with a React frontend and Node.js backend. The platform will include product listings, user accounts, shopping cart functionality, payment processing, and an admin dashboard.</p>
      
//       <h3>Key Responsibilities:</h3>
//       <ul>
//         <li>Develop a responsive frontend using React and modern CSS frameworks</li>
//         <li>Build a scalable backend API with Node.js and Express</li>
//         <li>Implement database design and queries using MongoDB</li>
//         <li>Integrate payment gateways and shipping APIs</li>
//         <li>Ensure the application is secure, performant, and follows best practices</li>
//         <li>Write clean, maintainable, and well-documented code</li>
//       </ul>
      
//       <h3>Requirements:</h3>
//       <ul>
//         <li>3+ years of experience with React and Node.js</li>
//         <li>Strong understanding of JavaScript/TypeScript</li>
//         <li>Experience with MongoDB or similar NoSQL databases</li>
//         <li>Familiarity with AWS services</li>
//         <li>Knowledge of e-commerce platforms and payment gateway integration</li>
//         <li>Excellent problem-solving skills and attention to detail</li>
//       </ul>
//     `,
//     client: {
//       name: "TechSolutions Inc.",
//       location: "San Francisco, CA",
//       memberSince: "January 2020",
//       totalJobs: 24,
//       rating: 4.8,
//       reviews: 18,
//       verified: true,
//     },
//   }

//   return (
//     <div className="container py-12">
//       <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px]">
//         <div className="space-y-6">
//           <div className="flex flex-col gap-4">
//             <div className="flex justify-between items-start">
//               <h1 className="text-3xl font-bold">{job.title}</h1>
//               <div className="flex gap-2">
//                 <Button variant="outline" size="icon">
//                   <BookmarkPlus className="h-4 w-4" />
//                   <span className="sr-only">Save job</span>
//                 </Button>
//                 <Button variant="outline" size="icon">
//                   <Share2 className="h-4 w-4" />
//                   <span className="sr-only">Share job</span>
//                 </Button>
//               </div>
//             </div>

//             <div className="flex flex-wrap gap-4 text-sm">
//               <div className="flex items-center gap-1">
//                 <Building className="h-4 w-4 text-muted-foreground" />
//                 <span>{job.company}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <MapPin className="h-4 w-4 text-muted-foreground" />
//                 <span>{job.location}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <DollarSign className="h-4 w-4 text-muted-foreground" />
//                 <span>{job.budget}</span>
//               </div>
//               <div className="flex items-center gap-1">
//                 <Clock className="h-4 w-4 text-muted-foreground" />
//                 <span>Posted {job.postedAt}</span>
//               </div>
//               <Badge variant="outline">{job.type}</Badge>
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {job.skills.map((skill) => (
//                 <Badge key={skill} variant="secondary">
//                   {skill}
//                 </Badge>
//               ))}
//             </div>
//           </div>

//           <Tabs defaultValue="description" className="w-full">
//             <TabsList className="grid w-full grid-cols-2">
//               <TabsTrigger value="description">Description</TabsTrigger>
//               <TabsTrigger value="company">About the Client</TabsTrigger>
//             </TabsList>
//             <TabsContent value="description" className="space-y-4 mt-6">
//               <div className="grid grid-cols-3 gap-4">
//                 <Card>
//                   <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//                     <DollarSign className="h-8 w-8 text-primary mb-2" />
//                     <h3 className="font-medium">Budget</h3>
//                     <p className="text-sm text-muted-foreground">{job.budget}</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//                     <Calendar className="h-8 w-8 text-primary mb-2" />
//                     <h3 className="font-medium">Duration</h3>
//                     <p className="text-sm text-muted-foreground">{job.duration}</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//                     <Award className="h-8 w-8 text-primary mb-2" />
//                     <h3 className="font-medium">Experience</h3>
//                     <p className="text-sm text-muted-foreground">{job.experienceLevel}</p>
//                   </CardContent>
//                 </Card>
//               </div>

//               <div
//                 className="prose prose-sm dark:prose-invert max-w-none"
//                 dangerouslySetInnerHTML={{ __html: job.description }}
//               />
//             </TabsContent>
//             <TabsContent value="company" className="space-y-4 mt-6">
//               <div className="flex items-center gap-4">
//                 <Avatar className="h-16 w-16">
//                   <AvatarImage src={job.companyLogo} alt={job.client.name} />
//                   <AvatarFallback>{job.client.name.charAt(0)}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h3 className="text-xl font-medium">{job.client.name}</h3>
//                   <p className="text-sm text-muted-foreground">{job.client.location}</p>
//                 </div>
//               </div>

//               <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
//                 <Card>
//                   <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//                     <h3 className="font-medium">Member Since</h3>
//                     <p className="text-sm text-muted-foreground">{job.client.memberSince}</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//                     <h3 className="font-medium">Jobs Posted</h3>
//                     <p className="text-sm text-muted-foreground">{job.client.totalJobs}</p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//                     <h3 className="font-medium">Rating</h3>
//                     <p className="text-sm text-muted-foreground">
//                       {job.client.rating}/5 ({job.client.reviews} reviews)
//                     </p>
//                   </CardContent>
//                 </Card>
//                 <Card>
//                   <CardContent className="p-4 flex flex-col items-center justify-center text-center">
//                     <h3 className="font-medium">Verification</h3>
//                     <p className="text-sm text-muted-foreground">{job.client.verified ? "Verified" : "Unverified"}</p>
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>
//           </Tabs>
//         </div>

//         <div className="space-y-6">
//           <Card>
//             <CardContent className="p-6 space-y-4">
//               <h3 className="text-xl font-medium">Apply for this Job</h3>
//               <p className="text-sm text-muted-foreground">
//                 Submit a proposal to work on this project and start earning.
//               </p>
//               <Button asChild className="w-full">
//                 <Link href={`/jobs/${job.id}/apply`}>Apply Now</Link>
//               </Button>
//             </CardContent>
//           </Card>

//           <Card>
//             <CardContent className="p-6 space-y-4">
//               <h3 className="text-lg font-medium">Similar Jobs</h3>
//               <div className="space-y-4">
//                 <div className="border-b pb-4">
//                   <h4 className="font-medium hover:underline">
//                     <Link href="/jobs/2">React Developer for SaaS Dashboard</Link>
//                   </h4>
//                   <div className="flex justify-between text-sm mt-1">
//                     <span className="text-muted-foreground">$2,500 - $4,000</span>
//                     <span className="text-muted-foreground">1 day ago</span>
//                   </div>
//                 </div>
//                 <div className="border-b pb-4">
//                   <h4 className="font-medium hover:underline">
//                     <Link href="/jobs/3">MERN Stack Developer Needed</Link>
//                   </h4>
//                   <div className="flex justify-between text-sm mt-1">
//                     <span className="text-muted-foreground">$40 - $60 / hr</span>
//                     <span className="text-muted-foreground">3 days ago</span>
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-medium hover:underline">
//                     <Link href="/jobs/4">Full Stack Engineer for Startup</Link>
//                   </h4>
//                   <div className="flex justify-between text-sm mt-1">
//                     <span className="text-muted-foreground">$4,000 - $6,000</span>
//                     <span className="text-muted-foreground">5 days ago</span>
//                   </div>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }



import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BookmarkPlus, Clock, DollarSign, MapPin, Share2, Building, Calendar, Award } from "lucide-react"
import Link from "next/link"
import { headers } from "next/headers"

// Get job data from API
interface Job {
  id: string;
  title: string;
  client: {
    name: string;
    image?: string;
    createdAt: string;
    _count: {
      jobs: number;
    };
    _avg?: {
      receivedReviews?: {
        rating: number;
      };
    };
  };
  budgetMin: number;
  budgetMax: number;
  type: string;
  createdAt: string;
  duration?: string;
  experienceLevel: string;
  skills: string[];
  description: string;
  category: string;
  _count: {
    proposals: number;
  };
}

async function getJobById(id: string): Promise<Job | null> {
  // Get the base URL from headers (works server-side)
  const headersList = await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  const res = await fetch(`${protocol}://${host}/api/jobs/${id}`, {
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

// Get similar jobs based on category and skills
interface SimilarJob {
  id: string;
  title: string;
  budgetMin: number;
  budgetMax: number;
  createdAt: string;
}

interface GetSimilarJobsResponse {
  jobs: SimilarJob[];
}

async function getSimilarJobs(id: string, category: string, skills: string[], limit = 3): Promise<SimilarJob[]> {
  // Get the base URL from headers (works server-side)
  const headersList =await headers();
  const host = headersList.get('host') || 'localhost:3000';
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
  
  const params = new URLSearchParams({
    category,
    limit: limit.toString(),
    exclude: id,
  });
  
  const res = await fetch(`${protocol}://${host}/api/jobs?${params}`, {
    cache: "no-store",
    headers: {
      'Content-Type': 'application/json',
    },
  });
  
  if (!res.ok) {
    return [];
  }
  
  const data: GetSimilarJobsResponse = await res.json();
  return data.jobs;
}

export default async function JobDetailPage({ params }: { params: { id: string } }) {
  const job = await getJobById(params.id);
  
  if (!job) {
    notFound();
  }
  
  // Format job data for display
  const formattedJob = {
    id: job.id,
    title: job.title,
    company: job.client.name || "Company",
    companyLogo: job.client.image || "/placeholder.svg?height=100&width=100",
    location: "Remote", // Add location field to your job model if needed
    budget: `$${job.budgetMin.toLocaleString()} - $${job.budgetMax.toLocaleString()}`,
    type: job.type === "fixed" ? "Fixed Price" : "Hourly",
    postedAt: formatDate(job.createdAt),
    duration: job.duration || "Not specified",
    experienceLevel: capitalizeFirstLetter(job.experienceLevel),
    skills: job.skills,
    description: job.description,
    client: {
      name: job.client.name,
      location: "Location", // Add to client profile if needed
      memberSince: formatDate(job.client.createdAt),
      totalJobs: job.client._count?.jobs || 0,
      rating: job.client._avg?.receivedReviews?.rating || 0,
      reviews: job._count?.proposals || 0,
      verified: true, // Add verification field if needed
    },
  };
  
  // Get similar jobs
  const similarJobs = await getSimilarJobs(job.id, job.category, job.skills);

  return (
    <div className="container py-12">
      <div className="grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_350px]">
        <div className="space-y-6">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{formattedJob.title}</h1>
              <div className="flex gap-2">
                <Button variant="outline" size="icon">
                  <BookmarkPlus className="h-4 w-4" />
                  <span className="sr-only">Save job</span>
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                  <span className="sr-only">Share job</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span>{formattedJob.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{formattedJob.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span>{formattedJob.budget}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>Posted {formattedJob.postedAt}</span>
              </div>
              <Badge variant="outline">{formattedJob.type}</Badge>
            </div>

            <div className="flex flex-wrap gap-2">
              {formattedJob.skills.map((skill) => (
                <Badge key={skill} variant="secondary">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="description">Description</TabsTrigger>
              <TabsTrigger value="company">About the Client</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="space-y-4 mt-6">
              <div className="grid grid-cols-3 gap-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <DollarSign className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Budget</h3>
                    <p className="text-sm text-muted-foreground">{formattedJob.budget}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Calendar className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Duration</h3>
                    <p className="text-sm text-muted-foreground">{formattedJob.duration}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <Award className="h-8 w-8 text-primary mb-2" />
                    <h3 className="font-medium">Experience</h3>
                    <p className="text-sm text-muted-foreground">{formattedJob.experienceLevel}</p>
                  </CardContent>
                </Card>
              </div>

              <div
                className="prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: formattedJob.description }}
              />
            </TabsContent>
            <TabsContent value="company" className="space-y-4 mt-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={formattedJob.companyLogo} alt={formattedJob.client.name} />
                  <AvatarFallback>{formattedJob.client.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-medium">{formattedJob.client.name}</h3>
                  <p className="text-sm text-muted-foreground">{formattedJob.client.location}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <h3 className="font-medium">Member Since</h3>
                    <p className="text-sm text-muted-foreground">{formattedJob.client.memberSince}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <h3 className="font-medium">Jobs Posted</h3>
                    <p className="text-sm text-muted-foreground">{formattedJob.client.totalJobs}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <h3 className="font-medium">Rating</h3>
                    <p className="text-sm text-muted-foreground">
                      {formattedJob.client.rating}/5 ({formattedJob.client.reviews} reviews)
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <h3 className="font-medium">Verification</h3>
                    <p className="text-sm text-muted-foreground">{formattedJob.client.verified ? "Verified" : "Unverified"}</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-xl font-medium">Apply for this Job</h3>
              <p className="text-sm text-muted-foreground">
                Submit a proposal to work on this project and start earning.
              </p>
              <Button asChild className="w-full">
                <Link href={`/jobs/${formattedJob.id}/apply`}>Apply Now</Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 space-y-4">
              <h3 className="text-lg font-medium">Similar Jobs</h3>
              <div className="space-y-4">
                {similarJobs.length > 0 ? (
                  similarJobs.map((similarJob) => (
                    <div key={similarJob.id} className="border-b pb-4 last:border-b-0">
                      <h4 className="font-medium hover:underline">
                        <Link href={`/jobs/${similarJob.id}`}>{similarJob.title}</Link>
                      </h4>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-muted-foreground">
                          ${similarJob.budgetMin.toLocaleString()} - ${similarJob.budgetMax.toLocaleString()}
                        </span>
                        <span className="text-muted-foreground">{formatDate(similarJob.createdAt)}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No similar jobs found</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper functions
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays < 7) {
    return `${diffDays} days ago`;
  } else if (diffDays < 30) {
    return `${Math.floor(diffDays / 7)} weeks ago`;
  } else {
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }
}

function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}