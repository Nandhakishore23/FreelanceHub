import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { generateUploadURL } from "@/lib/s3"
import { z } from "zod"

// Schema for upload request
const uploadSchema = z.object({
  fileType: z.string(),
  folder: z.string().optional(),
})

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = uploadSchema.parse(body)

    // Validate file type
    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
    ]

    if (!allowedTypes.includes(validatedData.fileType)) {
      return NextResponse.json({ error: "File type not allowed" }, { status: 400 })
    }

    // Generate folder path based on user and purpose
    const folder = validatedData.folder || `user-${user.id}`

    // Generate pre-signed URL for upload
    const { uploadURL, fileName, fileUrl } = await generateUploadURL(validatedData.fileType, folder)

    return NextResponse.json({
      uploadURL,
      fileName,
      fileUrl,
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors[0].message }, { status: 400 })
    }

    console.error("Error generating upload URL:", error)
    return NextResponse.json({ error: "Failed to generate upload URL" }, { status: 500 })
  }
}

