import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Star } from "lucide-react"
import Link from "next/link"

// Mock data - would be fetched from API in a real application
const topFreelancers = [
  {
    id: "1",
    name: "Alex Johnson",
    title: "Full Stack Developer",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviews: 127,
    hourlyRate: "$65",
    skills: ["React", "Node.js", "TypeScript", "MongoDB"],
    bio: "Experienced full stack developer with 8+ years building scalable web applications and e-commerce solutions.",
  },
  {
    id: "2",
    name: "Sarah Williams",
    title: "UI/UX Designer",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.8,
    reviews: 93,
    hourlyRate: "$70",
    skills: ["Figma", "UI Design", "User Research", "Prototyping"],
    bio: "Award-winning designer creating intuitive and beautiful interfaces for web and mobile applications.",
  },
  {
    id: "3",
    name: "Michael Chen",
    title: "DevOps Engineer",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.9,
    reviews: 85,
    hourlyRate: "$80",
    skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
    bio: "DevOps specialist focused on building robust infrastructure and deployment pipelines for startups and enterprises.",
  },
  {
    id: "4",
    name: "Emily Rodriguez",
    title: "Content Strategist",
    avatar: "/placeholder.svg?height=100&width=100",
    rating: 4.7,
    reviews: 64,
    hourlyRate: "$55",
    skills: ["Content Strategy", "SEO", "Copywriting", "Marketing"],
    bio: "Content expert helping brands tell their story and connect with audiences through strategic content creation.",
  },
]

export default function TopFreelancers() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {topFreelancers.map((freelancer) => (
        <Card key={freelancer.id} className="flex flex-col">
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            <Avatar className="h-12 w-12">
              <AvatarImage src={freelancer.avatar} alt={freelancer.name} />
              <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="font-medium">{freelancer.name}</div>
              <div className="text-sm text-muted-foreground">{freelancer.title}</div>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex items-center gap-1 mb-3">
              <Star className="h-4 w-4 fill-primary text-primary" />
              <span className="text-sm font-medium">{freelancer.rating}</span>
              <span className="text-sm text-muted-foreground">({freelancer.reviews} reviews)</span>
              <span className="ml-auto text-sm font-medium">{freelancer.hourlyRate}/hr</span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">{freelancer.bio}</p>
            <div className="flex flex-wrap gap-2">
              {freelancer.skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {freelancer.skills.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{freelancer.skills.length - 3}
                </Badge>
              )}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full" variant="outline">
              <Link href={`/freelancers/${freelancer.id}`}>View Profile</Link>
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

