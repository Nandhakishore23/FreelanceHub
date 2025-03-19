"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  BarChart,
  Bell,
  Briefcase,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  MessageSquare,
  Star,
  Users,
} from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  // Mock user data - would be fetched from API in a real application
  const [userType] = useState<"freelancer" | "client">("freelancer")

  return (
    <div className="container py-12">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Alex!</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
            </Button>
            <Button size="sm" asChild>
              {userType === "freelancer" ? (
                <Link href="/jobs">Find Work</Link>
              ) : (
                <Link href="/post-job">Post a Job</Link>
              )}
            </Button>
          </div>
        </div>

        {userType === "freelancer" ? <FreelancerDashboard /> : <ClientDashboard />}
      </div>
    </div>
  )
}

function FreelancerDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Earnings</p>
              <h3 className="text-2xl font-bold">$4,250</h3>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Jobs</p>
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-xs text-muted-foreground">2 due this week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Proposals</p>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-xs text-muted-foreground">4 awaiting response</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Star className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Rating</p>
              <h3 className="text-2xl font-bold">4.9/5</h3>
              <p className="text-xs text-muted-foreground">From 28 reviews</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Jobs</TabsTrigger>
              <TabsTrigger value="proposals">Proposals</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">E-commerce Website Redesign</h3>
                      <p className="text-sm text-muted-foreground">Fashion Boutique Inc.</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$3,500 Fixed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Due in 12 days</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/messages/123">Message</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/jobs/123/workspace">View Workspace</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Mobile App Development</h3>
                      <p className="text-sm text-muted-foreground">TechStart Inc.</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$65/hr (32 hrs this week)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Ongoing project</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/messages/124">Message</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/jobs/124/workspace">View Workspace</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Content Writing for Blog</h3>
                      <p className="text-sm text-muted-foreground">Marketing Pros LLC</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$45/hr (10 hrs this week)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Due in 5 days</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/messages/125">Message</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/jobs/125/workspace">View Workspace</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="proposals" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">WordPress Website Development</h3>
                      <p className="text-sm text-muted-foreground">Small Business Solutions</p>
                    </div>
                    <Badge variant="outline">Submitted 2 days ago</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>Proposed: $2,800</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Estimated: 3 weeks</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/proposals/126">View Proposal</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Logo Design for Startup</h3>
                      <p className="text-sm text-muted-foreground">InnovateTech</p>
                    </div>
                    <Badge variant="outline">Submitted 5 days ago</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>Proposed: $750</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Estimated: 1 week</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/proposals/127">View Proposal</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">UI/UX Design for Mobile App</h3>
                      <p className="text-sm text-muted-foreground">AppDev Studios</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$4,200 Fixed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Completed on May 15, 2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>5.0 Rating</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Frontend Development</h3>
                      <p className="text-sm text-muted-foreground">WebSolutions Co.</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$3,800 Fixed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Completed on April 28, 2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>4.8 Rating</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Messages</CardTitle>
              <CardDescription>Recent conversations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Williams" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Sarah Williams</p>
                  <p className="text-sm text-muted-foreground truncate">Can you share the latest mockups?</p>
                </div>
                <div className="text-xs text-muted-foreground">2h ago</div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michael Chen" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground truncate">The API integration is complete.</p>
                </div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Emily Rodriguez" />
                  <AvatarFallback>ER</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground truncate">
                    Let's schedule a call to discuss the project.
                  </p>
                </div>
                <div className="text-xs text-muted-foreground">2d ago</div>
              </div>
            </CardContent>
            <div className="px-6 pb-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View All Messages
                </Link>
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Projects due soon</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">E-commerce Website Redesign</p>
                  <p className="text-sm text-muted-foreground">Due in 12 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                  <Clock className="h-4 w-4 text-red-600 dark:text-red-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Content Writing for Blog</p>
                  <p className="text-sm text-muted-foreground">Due in 5 days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-full">
                  <Clock className="h-4 w-4 text-green-600 dark:text-green-300" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Weekly Progress Report</p>
                  <p className="text-sm text-muted-foreground">Due in 2 days</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>Your earnings over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <BarChart className="h-16 w-16 text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Chart visualization would go here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ClientDashboard() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Briefcase className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Active Projects</p>
              <h3 className="text-2xl font-bold">5</h3>
              <p className="text-xs text-muted-foreground">2 need review</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Hired Freelancers</p>
              <h3 className="text-2xl font-bold">12</h3>
              <p className="text-xs text-muted-foreground">3 new this month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Open Jobs</p>
              <h3 className="text-2xl font-bold">3</h3>
              <p className="text-xs text-muted-foreground">8 new proposals</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 flex items-center gap-4">
            <div className="p-2 bg-primary/10 rounded-full">
              <DollarSign className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <h3 className="text-2xl font-bold">$24,500</h3>
              <p className="text-xs text-muted-foreground">$4,200 this month</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-2">
          <Tabs defaultValue="active" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="active">Active Projects</TabsTrigger>
              <TabsTrigger value="proposals">Job Proposals</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>
            <TabsContent value="active" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Company Website Redesign</h3>
                      <p className="text-sm text-muted-foreground">Assigned to: Alex Johnson</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$5,500 Fixed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Due in 15 days</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/messages/123">Message</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/projects/123/workspace">View Project</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Mobile App Development</h3>
                      <p className="text-sm text-muted-foreground">Assigned to: Sarah Williams</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$65/hr (Estimated: $12,000)</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Ongoing project</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link href="/messages/124">Message</Link>
                    </Button>
                    <Button size="sm" asChild>
                      <Link href="/projects/124/workspace">View Project</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="proposals" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Social Media Marketing Campaign</h3>
                      <p className="text-sm text-muted-foreground">8 proposals received</p>
                    </div>
                    <Badge variant="outline">Open</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>Budget: $2,000 - $3,000</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Posted 3 days ago</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" asChild>
                      <Link href="/jobs/126/proposals">View Proposals</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Content Writing for Blog</h3>
                      <p className="text-sm text-muted-foreground">12 proposals received</p>
                    </div>
                    <Badge variant="outline">Open</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>Budget: $30 - $40/hr</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>Posted 5 days ago</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button size="sm" asChild>
                      <Link href="/jobs/127/proposals">View Proposals</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="completed" className="space-y-4 mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">Logo Design</h3>
                      <p className="text-sm text-muted-foreground">Completed by: Michael Chen</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$850 Fixed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Completed on May 10, 2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>5.0 Rating</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">SEO Optimization</h3>
                      <p className="text-sm text-muted-foreground">Completed by: Emily Rodriguez</p>
                    </div>
                    <Badge variant="secondary">Completed</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span>$1,200 Fixed</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                      <span>Completed on April 22, 2023</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      <span>4.9 Rating</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Messages</CardTitle>
              <CardDescription>Recent conversations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-sm text-muted-foreground truncate">I've completed the first milestone.</p>
                </div>
                <div className="text-xs text-muted-foreground">1h ago</div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Williams" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Sarah Williams</p>
                  <p className="text-sm text-muted-foreground truncate">Need your feedback on the latest designs.</p>
                </div>
                <div className="text-xs text-muted-foreground">3h ago</div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michael Chen" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground truncate">The logo files are ready for review.</p>
                </div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
            </CardContent>
            <div className="px-6 pb-4">
              <Button variant="outline" className="w-full" asChild>
                <Link href="/messages">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  View All Messages
                </Link>
              </Button>
            </div>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Top Freelancers</CardTitle>
              <CardDescription>Your most hired talent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Alex Johnson" />
                  <AvatarFallback>AJ</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Alex Johnson</p>
                  <p className="text-sm text-muted-foreground">Full Stack Developer</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm ml-1">4.9</span>
                </div>
              </div>
              <div className="flex items-center gap-3 pb-3 border-b">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Sarah Williams" />
                  <AvatarFallback>SW</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Sarah Williams</p>
                  <p className="text-sm text-muted-foreground">UI/UX Designer</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm ml-1">4.8</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Michael Chen" />
                  <AvatarFallback>MC</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Graphic Designer</p>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm ml-1">5.0</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Spending Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Overview</CardTitle>
          <CardDescription>Your spending over the past 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] flex items-center justify-center">
            <BarChart className="h-16 w-16 text-muted-foreground" />
            <p className="ml-4 text-muted-foreground">Chart visualization would go here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

