"use client"

import { useState, useEffect } from "react"
import { useAppStore } from "@/lib/store"
import type { Category } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"

const categories: Category[] = ["UI", "UX", "Performance", "Feature", "Bug"]

export function EditFeedbackModal() {
  const { editingItem, setEditingItem, editFeedback } = useAppStore()
  const [text, setText] = useState("")
  const [category, setCategory] = useState<Category>("Feature")

  useEffect(() => {
    if (editingItem) {
      setText(editingItem.text)
      setCategory(editingItem.category)
    }
  }, [editingItem])

  const handleSave = () => {
    if (editingItem) {
      editFeedback(editingItem.id, { text, category })
    }
  }

  return (
    <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
      <DialogContent className="bg-gray-950 border-neon-green-700 text-foreground">
        <DialogHeader>
          <DialogTitle className="text-neon-green-400">Edit Feedback</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="bg-gray-900 border-neon-green-800 focus:ring-neon-green-500"
            rows={4}
          />
          <Select value={category} onValueChange={(v: Category) => setCategory(v)}>
            <SelectTrigger className="w-full bg-gray-900 border-neon-green-800 focus:ring-neon-green-500">
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
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setEditingItem(null)}
            className="border-neon-green-700 hover:bg-neon-green-900/50"
          >
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-neon-green-600 hover:bg-neon-green-500 text-black font-bold">
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
