"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

interface FilterOption {
  id: string
  label: string
}

interface FilterSidebarProps {
  categories?: FilterOption[]
  jobTypes?: FilterOption[]
  experienceLevels?: FilterOption[]
  skills?: FilterOption[] 
  locations?: FilterOption[]
  showBudgetFilter?: boolean
  maxBudget?: number
  className?: string
}

export default function FilterSidebar({
  categories = [],
  jobTypes = [],
  experienceLevels = [],
  skills = [],
  locations = [],
  showBudgetFilter = false,
  maxBudget = 10000,
  className,
}: FilterSidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Parse current filters from URL
  const [filters, setFilters] = useState({
    category: searchParams.get("category") || "",
    type: searchParams.get("type") || "",
    experienceLevel: searchParams.get("experienceLevel") || "",
    skills: searchParams.get("skills") ? searchParams.get("skills")?.split(",") : [],
    location: searchParams.get("location") || "",
    minBudget: searchParams.get("minBudget") ? Number(searchParams.get("minBudget")) : 0,
    maxBudget: searchParams.get("maxBudget") ? Number(searchParams.get("maxBudget")) : maxBudget,
  })

  // Update filters when URL changes
  useEffect(() => {
    setFilters({
      category: searchParams.get("category") || "",
      type: searchParams.get("type") || "",
      experienceLevel: searchParams.get("experienceLevel") || "",
      skills: searchParams.get("skills") ? searchParams.get("skills")?.split(",") : [],
      location: searchParams.get("location") || "",
      minBudget: searchParams.get("minBudget") ? Number(searchParams.get("minBudget")) : 0,
      maxBudget: searchParams.get("maxBudget") ? Number(searchParams.get("maxBudget")) : maxBudget,
    })
  }, [searchParams, maxBudget])

  const handleFilterChange = (filterType: string, value: string | string[] | number[]) => {
    const newFilters = { ...filters, [filterType]: value }
    setFilters(newFilters)
  }

  const applyFilters = () => {
    // Create new URLSearchParams object
    const params = new URLSearchParams(searchParams.toString())

    // Update parameters based on filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value && ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value !== ""))) {
        if (Array.isArray(value)) {
          params.set(key, value.join(","))
        } else if (typeof value === "number") {
          params.set(key, value.toString())
        } else {
          params.set(key, value)
        }
      } else {
        params.delete(key)
      }
    })

    // Reset to page 1 when filtering
    params.set("page", "1")

    // Navigate with updated filters
    router.push(`?${params.toString()}`)
  }

  const resetFilters = () => {
    // Create new URLSearchParams with only the query parameter
    const params = new URLSearchParams()
    if (searchParams.has("query")) {
      params.set("query", searchParams.get("query") || "")
    }

    // Navigate with reset filters
    router.push(`?${params.toString()}`)
  }

  // Count active filters
  const activeFilterCount = Object.entries(filters).reduce((count, [key, value]) => {
    if (key === "minBudget" && value === 0) return count
    if (key === "maxBudget" && value === maxBudget) return count

    if (value && ((Array.isArray(value) && value.length > 0) || (!Array.isArray(value) && value !== ""))) {
      return count + 1
    }
    return count
  }, 0)

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Filters</CardTitle>
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={resetFilters} className="h-8 px-2">
              Clear All
              <Badge variant="secondary" className="ml-2">
                {activeFilterCount}
              </Badge>
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {categories.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Category</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`category-${category.id}`}
                    checked={filters.category === category.id}
                    onCheckedChange={() => {
                      handleFilterChange("category", filters.category === category.id ? "" : category.id)
                    }}
                  />
                  <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                    {category.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {jobTypes.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Job Type</h3>
            <div className="space-y-2">
              {jobTypes.map((type) => (
                <div key={type.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type.id}`}
                    checked={filters.type === type.id}
                    onCheckedChange={() => {
                      handleFilterChange("type", filters.type === type.id ? "" : type.id)
                    }}
                  />
                  <Label htmlFor={`type-${type.id}`} className="text-sm cursor-pointer">
                    {type.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {experienceLevels.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Experience Level</h3>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <div key={level.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`level-${level.id}`}
                    checked={filters.experienceLevel === level.id}
                    onCheckedChange={() => {
                      handleFilterChange("experienceLevel", filters.experienceLevel === level.id ? "" : level.id)
                    }}
                  />
                  <Label htmlFor={`level-${level.id}`} className="text-sm cursor-pointer">
                    {level.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {showBudgetFilter && (
          <div className="space-y-4">
            <div className="flex justify-between">
              <h3 className="text-sm font-medium">Budget Range</h3>
              <span className="text-sm">
                ${filters.minBudget} - ${filters.maxBudget}
              </span>
            </div>
            <Slider
              defaultValue={[filters.minBudget, filters.maxBudget]}
              max={maxBudget}
              min={0}
              step={100}
              onValueChange={(value) => handleFilterChange("budgetRange", value)}
            />
          </div>
        )}

        {skills.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Skills</h3>
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`skill-${skill.id}`}
                    checked={filters.skills.includes(skill.id)}
                    onCheckedChange={(checked) => {
                      const newSkills = checked
                        ? [...filters.skills, skill.id]
                        : filters.skills.filter((s) => s !== skill.id)
                      handleFilterChange("skills", newSkills)
                    }}
                  />
                  <Label htmlFor={`skill-${skill.id}`} className="text-sm cursor-pointer">
                    {skill.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {locations.length > 0 && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Location</h3>
            <div className="space-y-2">
              {locations.map((location) => (
                <div key={location.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location.id}`}
                    checked={filters.location === location.id}
                    onCheckedChange={() => {
                      handleFilterChange("location", filters.location === location.id ? "" : location.id)
                    }}
                  />
                  <Label htmlFor={`location-${location.id}`} className="text-sm cursor-pointer">
                    {location.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={applyFilters} className="w-full">
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  )
}

