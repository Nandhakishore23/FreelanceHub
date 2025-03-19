"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"

interface SearchBarProps {
  placeholder?: string
  searchPath: string
  className?: string
}

export default function SearchBar({ placeholder = "Search...", searchPath, className }: SearchBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [searchTerm, setSearchTerm] = useState(searchParams.get("query") || "")

  useEffect(() => {
    setSearchTerm(searchParams.get("query") || "")
  }, [searchParams])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString())

    // Update or remove query parameter
    if (searchTerm) {
      params.set("query", searchTerm)
    } else {
      params.delete("query")
    }

    // Reset to page 1 when searching
    params.set("page", "1")

    // Navigate to search results
    router.push(`${searchPath}?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pr-10"
      />
      <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  )
}

