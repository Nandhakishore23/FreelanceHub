import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from "crypto"

if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION ||
  !process.env.AWS_BUCKET_NAME
) {
  throw new Error("Missing AWS environment variables")
}

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
})

const BUCKET_NAME = process.env.AWS_BUCKET_NAME

export async function generateUploadURL(fileType: string, folder = "general") {
  const rawBytes = crypto.randomBytes(16)
  const fileName = `${folder}/${rawBytes.toString("hex")}-${Date.now()}.${fileType.split("/")[1]}`

  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
    ContentType: fileType,
  })

  const uploadURL = await getSignedUrl(s3Client, command, { expiresIn: 3600 })

  return {
    uploadURL,
    fileName,
    fileUrl: `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`,
  }
}

export async function deleteFile(fileName: string) {
  const command = new DeleteObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
  })

  return s3Client.send(command)
}

export async function getFileSignedUrl(fileName: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: fileName,
  })

  return getSignedUrl(s3Client, command, { expiresIn: 3600 })
}

