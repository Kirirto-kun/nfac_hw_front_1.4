"use client"

import type React from "react"

import { useState } from "react"
import { useAppStore } from "@/lib/store"
import type { Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PlusCircle } from "lucide-react"

const categories: Category[] = ["UI", "UX", "Performance", "Feature", "Bug"]

export function FeedbackForm() {
  const [text, setText] = useState("")
  const [category, setCategory] = useState<Category>("Feature")
  const addFeedback = useAppStore((s) => s.addFeedback)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!text.trim()) return
    addFeedback({ text, category })
    setText("")
  }

  return (
    <Card className="border-neon-green-700 bg-gray-900/50">
      <CardHeader>
        <CardTitle className="text-neon-green-400 flex items-center gap-2">
          <PlusCircle className="w-5 h-5" />
          Add New Feedback
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your idea or report an issue..."
            className="bg-gray-950 border-neon-green-800 focus:ring-neon-green-500"
            rows={4}
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={category} onValueChange={(v: Category) => setCategory(v)}>
              <SelectTrigger className="w-full sm:w-[180px] bg-gray-950 border-neon-green-800 focus:ring-neon-green-500">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-gray-950 border-neon-green-700 text-foreground">
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-neon-green-600 hover:bg-neon-green-500 text-black font-bold"
            >
              Submit
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
