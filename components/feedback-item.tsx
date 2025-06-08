"use client"

import { useAppStore } from "@/lib/store"
import type { FeedbackItem } from "@/lib/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Edit, Trash2 } from "lucide-react"

type FeedbackItemProps = {
  item: FeedbackItem
}

export function FeedbackItemCard({ item }: FeedbackItemProps) {
  const { vote, deleteFeedback, setEditingItem } = useAppStore()

  return (
    <Card className="border-neon-green-800 bg-gray-900/50 hover:border-neon-green-600 transition-colors duration-300">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg text-neon-green-300">{item.text}</CardTitle>
          <Badge variant="outline" className="border-neon-green-600 text-neon-green-400">
            {item.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground text-neon-green-600">
          Submitted on: {new Date(item.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => vote(item.id, "up")}
            className="hover:bg-neon-green-900/50"
          >
            <ThumbsUp className="w-4 h-4 text-neon-green-500" />
          </Button>
          <span className="font-bold text-lg text-neon-green-400 w-8 text-center">{item.votes}</span>
          <Button
            size="icon"
            variant="ghost"
            onClick={() => vote(item.id, "down")}
            className="hover:bg-neon-green-900/50"
          >
            <ThumbsDown className="w-4 h-4 text-neon-green-500" />
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={() => setEditingItem(item)}
            className="hover:bg-neon-green-900/50"
          >
            <Edit className="w-4 h-4 text-neon-green-500" />
          </Button>
          <Button size="icon" variant="ghost" onClick={() => deleteFeedback(item.id)} className="hover:bg-red-900/50">
            <Trash2 className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
