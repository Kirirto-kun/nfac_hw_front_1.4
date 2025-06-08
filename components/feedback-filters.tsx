"use client"

import { useAppStore } from "@/lib/store"
import type { Category, SortOption } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ListFilter, ArrowUpDown } from "lucide-react"

const categories: (Category | "All")[] = ["All", "UI", "UX", "Performance", "Feature", "Bug"]

export function FeedbackFilters() {
  const { activeCategory, setCategory, sortOption, setSortOption } = useAppStore()

  return (
    <div className="flex flex-col sm:flex-row gap-4 justify-between items-center p-4 rounded-lg border border-neon-green-800 bg-gray-900/50">
      <div className="flex items-center gap-2">
        <ListFilter className="w-5 h-5 text-neon-green-400" />
        <span className="font-bold">Filter by:</span>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setCategory(cat)}
              className={
                activeCategory === cat
                  ? "bg-neon-green-600 hover:bg-neon-green-500 text-black"
                  : "border-neon-green-700 hover:bg-neon-green-900/50 hover:text-neon-green-300"
              }
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <ArrowUpDown className="w-5 h-5 text-neon-green-400" />
        <Select value={sortOption} onValueChange={(v: SortOption) => setSortOption(v)}>
          <SelectTrigger className="w-[180px] bg-gray-950 border-neon-green-800 focus:ring-neon-green-500">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent className="bg-gray-950 border-neon-green-700 text-foreground">
            <SelectItem value="date">Newest</SelectItem>
            <SelectItem value="votes">Most Votes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
