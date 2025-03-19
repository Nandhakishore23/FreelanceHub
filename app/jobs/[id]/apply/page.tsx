// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { useToast } from "@/components/ui/use-toast"
// import { ArrowLeft, Upload } from "lucide-react"
// import Link from "next/link"

// export default function ApplyJobPage({ params }: { params: { id: string } }) {
//   const { toast } = useToast()
//   const [isLoading, setIsLoading] = useState(false)
//   const [formData, setFormData] = useState({
//     coverLetter: "",
//     proposedBudget: "",
//     estimatedDuration: "",
//     attachments: [] as File[],
//     paymentType: "fixed",
//   })

//   // Mock job data - would be fetched from API in a real application
//   const job = {
//     id: params.id,
//     title: "Full Stack Developer for E-commerce Platform",
//     company: "TechSolutions Inc.",
//     budget: "$3,000 - $5,000",
//     type: "Fixed Price",
//   }

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleRadioChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, paymentType: value }))
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files)
//       setFormData((prev) => ({
//         ...prev,
//         attachments: [...prev.attachments, ...newFiles],
//       }))
//     }
//   }

//   const removeFile = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       attachments: prev.attachments.filter((_, i) => i !== index),
//     }))
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)

//     try {
//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 1500))

//       // In a real app, you would call your proposal submission API here
//       // const response = await submitProposal(job.id, formData)

//       toast({
//         title: "Proposal submitted successfully",
//         description: "Your proposal has been sent to the client. You'll be notified if they respond.",
//       })

//       // Redirect to proposals page
//       // router.push('/proposals')
//     } catch (error) {
//       toast({
//         title: "Failed to submit proposal",
//         description: "There was a problem submitting your proposal. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="container py-12">
//       <div className="max-w-3xl mx-auto">
//         <div className="mb-6">
//           <Link
//             href={`/jobs/${job.id}`}
//             className="flex items-center text-sm text-muted-foreground hover:text-foreground"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to job details
//           </Link>
//         </div>

//         <h1 className="text-3xl font-bold mb-2">Apply for Job</h1>
//         <p className="text-muted-foreground mb-6">
//           Submit your proposal for "{job.title}" at {job.company}
//         </p>

//         <Card>
//           <CardHeader>
//             <CardTitle>Your Proposal</CardTitle>
//             <CardDescription>
//               Make a strong impression by highlighting your relevant skills and experience
//             </CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="coverLetter">Cover Letter</Label>
//                 <Textarea
//                   id="coverLetter"
//                   name="coverLetter"
//                   placeholder="Introduce yourself and explain why you're a good fit for this project..."
//                   rows={8}
//                   required
//                   value={formData.coverLetter}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Explain your relevant experience, approach to the project, and why you're the best candidate.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label>Payment Type</Label>
//                 <RadioGroup
//                   value={formData.paymentType}
//                   onValueChange={handleRadioChange}
//                   className="flex flex-col space-y-1"
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="fixed" id="fixed" />
//                     <Label htmlFor="fixed" className="cursor-pointer">
//                       Fixed Price
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="hourly" id="hourly" />
//                     <Label htmlFor="hourly" className="cursor-pointer">
//                       Hourly Rate
//                     </Label>
//                   </div>
//                 </RadioGroup>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="proposedBudget">
//                   {formData.paymentType === "fixed" ? "Proposed Budget" : "Hourly Rate"}
//                 </Label>
//                 <Input
//                   id="proposedBudget"
//                   name="proposedBudget"
//                   placeholder={formData.paymentType === "fixed" ? "e.g., $4,000" : "e.g., $50/hour"}
//                   required
//                   value={formData.proposedBudget}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   {formData.paymentType === "fixed"
//                     ? "Client budget: " + job.budget
//                     : "Propose a competitive hourly rate based on your experience and skills."}
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="estimatedDuration">Estimated Duration</Label>
//                 <Input
//                   id="estimatedDuration"
//                   name="estimatedDuration"
//                   placeholder="e.g., 3 weeks, 2 months"
//                   required
//                   value={formData.estimatedDuration}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="attachments">Attachments (Optional)</Label>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => document.getElementById("file-upload")?.click()}
//                     disabled={isLoading}
//                   >
//                     <Upload className="mr-2 h-4 w-4" />
//                     Upload Files
//                   </Button>
//                   <Input
//                     id="file-upload"
//                     type="file"
//                     multiple
//                     className="hidden"
//                     onChange={handleFileChange}
//                     disabled={isLoading}
//                   />
//                   <span className="text-sm text-muted-foreground">Max 5 files (PDF, DOC, JPG, PNG)</span>
//                 </div>

//                 {formData.attachments.length > 0 && (
//                   <div className="mt-2 space-y-2">
//                     {formData.attachments.map((file, index) => (
//                       <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
//                         <span className="text-sm truncate">{file.name}</span>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeFile(index)}
//                           disabled={isLoading}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline" type="button" disabled={isLoading} asChild>
//                 <Link href={`/jobs/${job.id}`}>Cancel</Link>
//               </Button>
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading ? "Submitting..." : "Submit Proposal"}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>
//       </div>
//     </div>
//   )
// }


// "use client"

// import React, { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
// import { useToast } from "@/components/ui/use-toast"
// import { ArrowLeft, Upload } from "lucide-react"
// import Link from "next/link"
// import { useSession } from "next-auth/react"

// interface JobData {
//   id: string;
//   title: string;
//   company: string;
//   budgetMin: number;
//   budgetMax: number;
//   type: string;
//   clientId: string;
//   status: string;
//   description: string;
// }

// export default function ApplyJobPage({ params }: { params: Promise<{ id: string }> }) {
//   // Unwrap the params Promise using React.use()
//   const resolvedParams = React.use(params);
//   const jobId = resolvedParams.id;
  
//   const { toast } = useToast()
//   const router = useRouter()
//   const { data: session, status } = useSession()
//   const [isLoading, setIsLoading] = useState(false)
//   const [job, setJob] = useState<JobData | null>(null)
//   const [formData, setFormData] = useState({
//     coverLetter: "",
//     proposedBudget: "",
//     estimatedDuration: "",
//     attachments: [] as File[],
//     paymentType: "fixed",
//   })

//   useEffect(() => {
//     // Check authentication
//     if (status === "unauthenticated") {
//       toast({
//         title: "Authentication required",
//         description: "Please sign in to apply for jobs",
//         variant: "destructive",
//       })
//       router.push(`/signin?callbackUrl=/jobs/${jobId}/apply`)
//       return
//     }

//     // Fetch job data
//     const fetchJob = async () => {
//       try {
//         const response = await fetch(`/api/jobs/${jobId}`)
//         if (!response.ok) {
//           throw new Error("Failed to fetch job details")
//         }
//         const data = await response.json()
//         setJob(data)
        
//         // Set payment type based on job type
//         setFormData(prev => ({
//           ...prev,
//           paymentType: data.type
//         }))
//       } catch (error) {
//         toast({
//           title: "Error",
//           description: "Failed to load job details. Please try again.",
//           variant: "destructive",
//         })
//       }
//     }

//     if (jobId) {
//       fetchJob()
//     }
//   }, [jobId, status, router, toast])

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({ ...prev, [name]: value }))
//   }

//   const handleRadioChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, paymentType: value }))
//   }

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const newFiles = Array.from(e.target.files)
//       setFormData((prev) => ({
//         ...prev,
//         attachments: [...prev.attachments, ...newFiles],
//       }))
//     }
//   }

//   const removeFile = (index: number) => {
//     setFormData((prev) => ({
//       ...prev,
//       attachments: prev.attachments.filter((_, i) => i !== index),
//     }))
//   }

//   // Function to upload attachments to storage
//   const uploadAttachments = async () => {
//     const uploadedUrls = []
    
//     for (const file of formData.attachments) {
//       // Create a FormData instance for file upload
//       const fileFormData = new FormData()
//       fileFormData.append('file', file)
      
//       // Upload to your storage service
//       const uploadResponse = await fetch('/api/upload', {
//         method: 'POST',
//         body: fileFormData,
//       })
      
//       if (!uploadResponse.ok) {
//         throw new Error(`Failed to upload file: ${file.name}`)
//       }
      
//       const data = await uploadResponse.json()
//       uploadedUrls.push(data.url)
//     }
    
//     return uploadedUrls
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
    
//     if (!job || !session?.user) {
//       toast({
//         title: "Error",
//         description: "Missing job information or user session",
//         variant: "destructive",
//       })
//       return
//     }
    
//     setIsLoading(true)

//     try {
//       // Upload attachments if any
//       let attachmentUrls: string[] = []
//       if (formData.attachments.length > 0) {
//         attachmentUrls = await uploadAttachments()
//       }

//       // Convert proposedBudget string to number
//       const cleanedBudget = formData.proposedBudget.replace(/[$,]/g, '');
//       const numericBudget = parseFloat(cleanedBudget);
      
//       // Validate that the budget is a valid number
//       if (isNaN(numericBudget)) {
//         throw new Error("Please enter a valid budget amount");
//       }

//       // Convert estimatedDuration to number if it's numeric
//       let estimatedDuration = formData.estimatedDuration;
//       if (/^\d+$/.test(estimatedDuration)) {
//         estimatedDuration = parseInt(estimatedDuration, 10).toString();
//       }

//       // Prepare proposal data
//       const proposalData = {
//         jobId: job.id,
//         coverLetter: formData.coverLetter,
//         proposedBudget: numericBudget, // Sending as number
//         estimatedDuration: estimatedDuration,
//         attachments: attachmentUrls,
//       }

//       // Submit proposal to API
//       const response = await fetch('/api/proposals', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(proposalData),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.error || 'Failed to submit proposal')
//       }

//       toast({
//         title: "Proposal submitted successfully",
//         description: "Your proposal has been sent to the client. You'll be notified if they respond.",
//       })

//       // Redirect to proposals list page
//       router.push('/proposals')
//     } catch (error: any) {
//       toast({
//         title: "Failed to submit proposal",
//         description: error.message || "There was a problem submitting your proposal. Please try again.",
//         variant: "destructive",
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   if (!job) {
//     return (
//       <div className="container py-12">
//         <div className="max-w-3xl mx-auto text-center">
//           <p>Loading job details...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="container py-12">
//       <div className="max-w-3xl mx-auto">
//         <div className="mb-6">
//           <Link
//             href={`/jobs/${job.id}`}
//             className="flex items-center text-sm text-muted-foreground hover:text-foreground"
//           >
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to job details
//           </Link>
//         </div>

//         <h1 className="text-3xl font-bold mb-2">Apply for Job</h1>
//         <p className="text-muted-foreground mb-6">
//           Submit your proposal for "{job.title}"
//         </p>

//         <Card>
//           <CardHeader>
//             <CardTitle>Your Proposal</CardTitle>
//             <CardDescription>
//               Make a strong impression by highlighting your relevant skills and experience
//             </CardDescription>
//           </CardHeader>
//           <form onSubmit={handleSubmit}>
//             <CardContent className="space-y-6">
//               <div className="space-y-2">
//                 <Label htmlFor="coverLetter">Cover Letter</Label>
//                 <Textarea
//                   id="coverLetter"
//                   name="coverLetter"
//                   placeholder="Introduce yourself and explain why you're a good fit for this project..."
//                   rows={8}
//                   required
//                   value={formData.coverLetter}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   Explain your relevant experience, approach to the project, and why you're the best candidate.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label>Payment Type</Label>
//                 <RadioGroup
//                   value={formData.paymentType}
//                   onValueChange={handleRadioChange}
//                   className="flex flex-col space-y-1"
//                   disabled={true} // Disable changing the payment type as it should match the job
//                 >
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="fixed" id="fixed" />
//                     <Label htmlFor="fixed" className="cursor-pointer">
//                       Fixed Price
//                     </Label>
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <RadioGroupItem value="hourly" id="hourly" />
//                     <Label htmlFor="hourly" className="cursor-pointer">
//                       Hourly Rate
//                     </Label>
//                   </div>
//                 </RadioGroup>
//                 <p className="text-xs text-muted-foreground">
//                   Payment type is determined by the job posting.
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="proposedBudget">
//                   {formData.paymentType === "fixed" ? "Proposed Budget" : "Hourly Rate"}
//                 </Label>
//                 <Input
//                   id="proposedBudget"
//                   name="proposedBudget"
//                   placeholder={formData.paymentType === "fixed" ? "e.g., $4,000" : "e.g., $50/hour"}
//                   required
//                   value={formData.proposedBudget}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                   type="text" // Keep as text for better UX with currency inputs
//                   pattern="^\$?[0-9]+(\.[0-9]{1,2})?$" // Simple pattern for currency
//                   title="Please enter a valid amount (e.g. 100 or 100.50)"
//                 />
//                 <p className="text-xs text-muted-foreground">
//                   {formData.paymentType === "fixed"
//                     ? `Client budget: $${job.budgetMin} - $${job.budgetMax}`
//                     : "Propose a competitive hourly rate based on your experience and skills."}
//                 </p>
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="estimatedDuration">Estimated Duration</Label>
//                 <Input
//                   id="estimatedDuration"
//                   name="estimatedDuration"
//                   placeholder="e.g., 3 weeks, 2 months"
//                   required
//                   value={formData.estimatedDuration}
//                   onChange={handleChange}
//                   disabled={isLoading}
//                 />
//               </div>

//               <div className="space-y-2">
//                 <Label htmlFor="attachments">Attachments (Optional)</Label>
//                 <div className="flex items-center gap-2">
//                   <Button
//                     type="button"
//                     variant="outline"
//                     onClick={() => document.getElementById("file-upload")?.click()}
//                     disabled={isLoading || formData.attachments.length >= 5}
//                   >
//                     <Upload className="mr-2 h-4 w-4" />
//                     Upload Files
//                   </Button>
//                   <Input
//                     id="file-upload"
//                     type="file"
//                     multiple
//                     className="hidden"
//                     onChange={handleFileChange}
//                     disabled={isLoading || formData.attachments.length >= 5}
//                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                   />
//                   <span className="text-sm text-muted-foreground">Max 5 files (PDF, DOC, JPG, PNG)</span>
//                 </div>

//                 {formData.attachments.length > 0 && (
//                   <div className="mt-2 space-y-2">
//                     {formData.attachments.map((file, index) => (
//                       <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
//                         <span className="text-sm truncate">{file.name}</span>
//                         <Button
//                           type="button"
//                           variant="ghost"
//                           size="sm"
//                           onClick={() => removeFile(index)}
//                           disabled={isLoading}
//                         >
//                           Remove
//                         </Button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//             <CardFooter className="flex justify-between">
//               <Button variant="outline" type="button" disabled={isLoading} asChild>
//                 <Link href={`/jobs/${job.id}`}>Cancel</Link>
//               </Button>
//               <Button type="submit" disabled={isLoading}>
//                 {isLoading ? "Submitting..." : "Submit Proposal"}
//               </Button>
//             </CardFooter>
//           </form>
//         </Card>
//       </div>
//     </div>
//   )
// }




"use client"

import React, { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useSession } from "next-auth/react"

interface JobData {
  id: string;
  title: string;
  company: string;
  budgetMin: number;
  budgetMax: number;
  type: string;
  clientId: string;
  status: string;
  description: string;
}

export default function ApplyJobPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap the params Promise using React.use()
  const resolvedParams = React.use(params);
  const jobId = resolvedParams.id;
  
  const { toast } = useToast()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [isLoading, setIsLoading] = useState(false)
  const [job, setJob] = useState<JobData | null>(null)
  const [formData, setFormData] = useState({
    coverLetter: "",
    proposedBudget: "",
    estimatedDuration: "",
    attachments: [] as File[],
    paymentType: "fixed",
  })

  useEffect(() => {
    // Check authentication
    if (status === "unauthenticated") {
      toast({
        title: "Authentication required",
        description: "Please sign in to apply for jobs",
        variant: "destructive",
      })
      router.push(`/signin?callbackUrl=/jobs/${jobId}/apply`)
      return
    }

    // Fetch job data
    const fetchJob = async () => {
      try {
        const response = await fetch(`/api/jobs/${jobId}`)
        if (!response.ok) {
          throw new Error("Failed to fetch job details")
        }
        const data = await response.json()
        setJob(data)
        
        // Set payment type based on job type
        setFormData(prev => ({
          ...prev,
          paymentType: data.type
        }))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load job details. Please try again.",
          variant: "destructive",
        })
      }
    }

    if (jobId) {
      fetchJob()
    }
  }, [jobId, status, router, toast])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentType: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      setFormData((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }))
    }
  }

  const removeFile = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index),
    }))
  }

  // Function to upload attachments to storage
  const uploadAttachments = async () => {
    const uploadedUrls = []
    
    for (const file of formData.attachments) {
      // Create a FormData instance for file upload
      const fileFormData = new FormData()
      fileFormData.append('file', file)
      
      // Upload to your storage service
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: fileFormData,
      })
      
      if (!uploadResponse.ok) {
        throw new Error(`Failed to upload file: ${file.name}`)
      }
      
      const data = await uploadResponse.json()
      uploadedUrls.push(data.url)
    }
    
    return uploadedUrls
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!job || !session?.user) {
      toast({
        title: "Error",
        description: "Missing job information or user session",
        variant: "destructive",
      })
      return
    }
    
    setIsLoading(true)

    try {
      // Upload attachments if any
      let attachmentUrls: string[] = []
      if (formData.attachments.length > 0) {
        attachmentUrls = await uploadAttachments()
      }

      // Convert proposedBudget string to number
      const cleanedBudget = formData.proposedBudget.replace(/[$,]/g, '');
      const numericBudget = parseFloat(cleanedBudget);
      
      // Validate that the budget is a valid number
      if (isNaN(numericBudget)) {
        throw new Error("Please enter a valid budget amount");
      }

      // Convert estimatedDuration to number if it's numeric
      let estimatedDuration = formData.estimatedDuration;
      if (/^\d+$/.test(estimatedDuration)) {
        estimatedDuration = parseInt(estimatedDuration, 10).toString();
      }

      // Prepare proposal data
      const proposalData = {
        jobId: job.id,
        coverLetter: formData.coverLetter,
        proposedBudget: numericBudget, // Sending as number
        estimatedDuration: estimatedDuration,
        attachments: attachmentUrls,
      }

      // Submit proposal to API
      const response = await fetch('/api/proposals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(proposalData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit proposal')
      }

      const result = await response.json()

      toast({
        title: "Proposal submitted successfully",
        description: "Your proposal has been sent to the client. You'll be notified if they respond.",
      })

      // Redirect to my proposals page
      router.push('/proposals/my-proposals')
    } catch (error: any) {
      toast({
        title: "Failed to submit proposal",
        description: error.message || "There was a problem submitting your proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (!job) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <p>Loading job details...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <Link
            href={`/jobs/${job.id}`}
            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to job details
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-2">Apply for Job</h1>
        <p className="text-muted-foreground mb-6">
          Submit your proposal for "{job.title}"
        </p>

        <Card>
          <CardHeader>
            <CardTitle>Your Proposal</CardTitle>
            <CardDescription>
              Make a strong impression by highlighting your relevant skills and experience
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="coverLetter">Cover Letter</Label>
                <Textarea
                  id="coverLetter"
                  name="coverLetter"
                  placeholder="Introduce yourself and explain why you're a good fit for this project..."
                  rows={8}
                  required
                  value={formData.coverLetter}
                  onChange={handleChange}
                  disabled={isLoading}
                />
                <p className="text-xs text-muted-foreground">
                  Explain your relevant experience, approach to the project, and why you're the best candidate.
                </p>
              </div>

              <div className="space-y-2">
                <Label>Payment Type</Label>
                <RadioGroup
                  value={formData.paymentType}
                  onValueChange={handleRadioChange}
                  className="flex flex-col space-y-1"
                  disabled={true} // Disable changing the payment type as it should match the job
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
                <p className="text-xs text-muted-foreground">
                  Payment type is determined by the job posting.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="proposedBudget">
                  {formData.paymentType === "fixed" ? "Proposed Budget" : "Hourly Rate"}
                </Label>
                <Input
                  id="proposedBudget"
                  name="proposedBudget"
                  placeholder={formData.paymentType === "fixed" ? "e.g., $4,000" : "e.g., $50/hour"}
                  required
                  value={formData.proposedBudget}
                  onChange={handleChange}
                  disabled={isLoading}
                  type="text" // Keep as text for better UX with currency inputs
                  pattern="^\$?[0-9]+(\.[0-9]{1,2})?$" // Simple pattern for currency
                  title="Please enter a valid amount (e.g. 100 or 100.50)"
                />
                <p className="text-xs text-muted-foreground">
                  {formData.paymentType === "fixed"
                    ? `Client budget: $${job.budgetMin} - $${job.budgetMax}`
                    : "Propose a competitive hourly rate based on your experience and skills."}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedDuration">Estimated Duration</Label>
                <Input
                  id="estimatedDuration"
                  name="estimatedDuration"
                  placeholder="e.g., 3 weeks, 2 months"
                  required
                  value={formData.estimatedDuration}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attachments">Attachments (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("file-upload")?.click()}
                    disabled={isLoading || formData.attachments.length >= 5}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Files
                  </Button>
                  <Input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isLoading || formData.attachments.length >= 5}
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  />
                  <span className="text-sm text-muted-foreground">Max 5 files (PDF, DOC, JPG, PNG)</span>
                </div>

                {formData.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-muted p-2 rounded-md">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          disabled={isLoading}
                        >
                          Remove
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" type="button" disabled={isLoading} asChild>
                <Link href={`/jobs/${job.id}`}>Cancel</Link>
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Submitting..." : "Submit Proposal"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}