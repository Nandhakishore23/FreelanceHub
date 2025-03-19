import { Card, CardContent } from "@/components/ui/card"
import { Code, PenTool, BarChart, Smartphone, Globe, Camera, Headphones, FileText } from "lucide-react"
import Link from "next/link"

// Mock data - would be fetched from API in a real application
const categories = [
  {
    id: "1",
    name: "Web Development",
    icon: Globe,
    count: 1243,
    color: "bg-blue-100 dark:bg-blue-900",
  },
  {
    id: "2",
    name: "Design & Creative",
    icon: PenTool,
    count: 865,
    color: "bg-purple-100 dark:bg-purple-900",
  },
  {
    id: "3",
    name: "Mobile Development",
    icon: Smartphone,
    count: 752,
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    id: "4",
    name: "Programming & Tech",
    icon: Code,
    count: 1432,
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    id: "5",
    name: "Business & Marketing",
    icon: BarChart,
    count: 643,
    color: "bg-red-100 dark:bg-red-900",
  },
  {
    id: "6",
    name: "Photography & Video",
    icon: Camera,
    count: 421,
    color: "bg-indigo-100 dark:bg-indigo-900",
  },
  {
    id: "7",
    name: "Audio & Music",
    icon: Headphones,
    count: 327,
    color: "bg-pink-100 dark:bg-pink-900",
  },
  {
    id: "8",
    name: "Writing & Translation",
    icon: FileText,
    count: 589,
    color: "bg-orange-100 dark:bg-orange-900",
  },
]

export default function CategoryList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {categories.map((category) => (
        <Link key={category.id} href={`/categories/${category.id}`}>
          <Card className="h-full transition-all hover:shadow-md">
            <CardContent className="flex flex-col items-center justify-center p-6 text-center">
              <div className={`p-3 rounded-full ${category.color} mb-4`}>
                <category.icon className="h-6 w-6" />
              </div>
              <h3 className="font-medium mb-1">{category.name}</h3>
              <p className="text-sm text-muted-foreground">{category.count} jobs</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

