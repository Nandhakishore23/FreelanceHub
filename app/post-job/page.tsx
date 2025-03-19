"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"
import { useRouter } from "next/router";

export default function PostJobPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [skill, setSkill] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    type: "fixed",
    budget: {
      min: 500,
      max: 1000,
    },
    duration: "",
    skills: [] as string[],
    experience: "intermediate",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleBudgetChange = (value: number[]) => {
    setFormData((prev) => ({
      ...prev,
      budget: {
        min: value[0],
        max: value[1] || prev.budget.max,
      },
    }))
  }

  const addSkill = () => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skill],
      }))
      setSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((s) => s !== skillToRemove),
    }))
  }

  // async function postJob(formData: { title: string; description: string; category: string; type: string; budget: { min: number; max: number }; duration: string; skills: string[]; experience: string }) {
  //   const response = await fetch('/api/jobs', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(formData),
  //   })
  
  //   if (!response.ok) {
  //     throw new Error('Failed to post job')
  //   }
  
  //   return response.json()
  // }


  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   setIsLoading(true)

  //   try {
  //     // Simulate API call
  //     // await new Promise((resolve) => setTimeout(resolve, 1500))

  //     // In a real app, you would call your job posting API here
  //     const response = await postJob(formData)
      

  //     toast({
  //       title: "Job posted successfully",
  //       description: "Your job has been posted and is now visible to freelancers.",
  //     })

  //     // Redirect to job listing or dashboard
  //     // router.push('/jobs/my-jobs')
  //   } catch (error) {
  //     toast({
  //       title: "Failed to post job",
  //       description: "There was a problem posting your job. Please try again.",
  //       variant: "destructive",
  //     })
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to post job");

      toast({ title: "Job posted successfully", description: "Your job is now live." });
      const router = useRouter();
      router.push("/jobs/my-jobs");
    } catch (error) {
      toast({ title: "Error", description: "Could not post job. Try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Post a New Job</h1>
        <Card>
          <CardHeader>
            <CardTitle>Job Details</CardTitle>
            <CardDescription>
              Provide detailed information about your project to attract the right freelancers
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Job Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="e.g., Full Stack Developer for E-commerce Website"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe your project, requirements, and expectations in detail..."
                  rows={6}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="design">Design & Creative</SelectItem>
                    <SelectItem value="writing">Writing & Translation</SelectItem>
                    <SelectItem value="admin-support">Admin Support</SelectItem>
                    <SelectItem value="customer-service">Customer Service</SelectItem>
                    <SelectItem value="marketing">Sales & Marketing</SelectItem>
                    <SelectItem value="accounting">Accounting & Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Project Type</Label>
                <RadioGroup
                  value={formData.type}
                  onValueChange={(value) => handleRadioChange("type", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <Label htmlFor="fixed" className="cursor-pointer">
                      Fixed Price
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourly" id="hourly" />
                    <Label htmlFor="hourly" className="cursor-pointer">
                      Hourly Rate
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label>Budget Range</Label>
                  <span className="text-sm">
                    ${formData.budget.min} - ${formData.budget.max}
                  </span>
                </div>
                <Slider
                  defaultValue={[formData.budget.min, formData.budget.max]}
                  max={10000}
                  min={50}
                  step={50}
                  onValueChange={handleBudgetChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Expected Duration</Label>
                <Select
                  value={formData.duration}
                  onValueChange={(value) => handleSelectChange("duration", value)}
                  disabled={isLoading}
                >
                  <SelectTrigger id="duration">
                    <SelectValue placeholder="Select expected duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="less-than-1-week">Less than 1 week</SelectItem>
                    <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                    <SelectItem value="2-4-weeks">2-4 weeks</SelectItem>
                    <SelectItem value="1-3-months">1-3 months</SelectItem>
                    <SelectItem value="3-6-months">3-6 months</SelectItem>
                    <SelectItem value="more-than-6-months">More than 6 months</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Required Skills</Label>
                <div className="flex gap-2">
                  <Input
                    id="skills"
                    placeholder="e.g., React, Node.js, UI Design"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                    disabled={isLoading}
                  />
                  <Button type="button" onClick={addSkill} variant="secondary" disabled={isLoading || !skill}>
                    Add
                  </Button>
                </div>
                {formData.skills.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.skills.map((s) => (
                      <Badge key={s} variant="secondary" className="flex items-center gap-1">
                        {s}
                        <button
                          type="button"
                          onClick={() => removeSkill(s)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                          <span className="sr-only">Remove {s}</span>
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Experience Level</Label>
                <RadioGroup
                  value={formData.experience}
                  onValueChange={(value) => handleRadioChange("experience", value)}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entry" id="entry" />
                    <Label htmlFor="entry" className="cursor-pointer">
                      Entry Level
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <Label htmlFor="intermediate" className="cursor-pointer">
                      Intermediate
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expert" id="expert" />
                    <Label htmlFor="expert" className="cursor-pointer">
                      Expert
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" disabled={isLoading}>
                Save as Draft
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Posting..." : "Post Job"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

async function postJob(formData: { title: string; description: string; category: string; type: string; budget: { min: number; max: number }; duration: string; skills: string[]; experience: string }) {
  const response = await fetch('/api/jobs', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  })

  if (!response.ok) {
    throw new Error('Failed to post job')
  }

  return response.json()
}

