import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldAlert } from "lucide-react"

export default function UnauthorizedPage() {
  return (
    <div className="container flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] py-12 text-center">
      <ShieldAlert className="h-24 w-24 text-destructive mb-6" />
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-md">You don't have permission to access this page.</p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">Go Home</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Go to Dashboard</Link>
        </Button>
      </div>
    </div>
  )
}

