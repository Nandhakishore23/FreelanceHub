"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { File, Loader2, Trash2, Upload } from "lucide-react"

interface FileUploadProps {
  onUploadComplete: (fileUrl: string, fileName: string) => void
  onDelete?: (fileUrl: string) => void
  folder?: string
  accept?: string
  maxSize?: number // in MB
  className?: string
}

export default function FileUpload({
  onUploadComplete,
  onDelete,
  folder = "general",
  accept = "image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  maxSize = 10, // 10MB default
  className,
}: FileUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadedFile, setUploadedFile] = useState<{ url: string; name: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "File too large",
        description: `File size must be less than ${maxSize}MB`,
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Get pre-signed URL
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fileType: file.type,
          folder,
        }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to get upload URL")
      }

      const { uploadURL, fileName, fileUrl } = await response.json()

      // Upload file to S3
      const uploadResponse = await fetch(uploadURL, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1))
          setUploadProgress(percentCompleted)
        },
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file")
      }

      // Set uploaded file and call callback
      setUploadedFile({ url: fileUrl, name: file.name })
      onUploadComplete(fileUrl, fileName)

      toast({
        title: "File uploaded",
        description: "Your file has been uploaded successfully",
      })
    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "Failed to upload file",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    }
  }

  const handleDelete = async () => {
    if (!uploadedFile || !onDelete) return

    try {
      onDelete(uploadedFile.url)
      setUploadedFile(null)

      toast({
        title: "File removed",
        description: "The file has been removed",
      })
    } catch (error) {
      console.error("Delete error:", error)
      toast({
        title: "Failed to remove file",
        description: "There was an error removing the file",
        variant: "destructive",
      })
    }
  }

  return (
    <div className={className}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={accept}
        className="hidden"
        disabled={isUploading}
      />

      {!uploadedFile ? (
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Upload File
            </>
          )}
        </Button>
      ) : (
        <div className="flex items-center justify-between p-2 border rounded-md">
          <div className="flex items-center">
            <File className="h-5 w-5 mr-2 text-muted-foreground" />
            <span className="text-sm truncate max-w-[200px]">{uploadedFile.name}</span>
          </div>
          {onDelete && (
            <Button type="button" variant="ghost" size="sm" onClick={handleDelete} className="h-8 w-8 p-0">
              <Trash2 className="h-4 w-4 text-destructive" />
              <span className="sr-only">Remove file</span>
            </Button>
          )}
        </div>
      )}

      {isUploading && (
        <div className="mt-2">
          <Progress value={uploadProgress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 text-right">{uploadProgress}%</p>
        </div>
      )}
    </div>
  )
}

