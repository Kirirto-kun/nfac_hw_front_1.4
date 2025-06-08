"use client"

import { FeedbackItemCard } from "@/components/feedback-item"
import type { FeedbackItem } from "@/lib/types"
import { AnimatePresence, motion } from "framer-motion"

type FeedbackListProps = {
  items: FeedbackItem[]
}

export function FeedbackList({ items }: FeedbackListProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed border-neon-green-800 rounded-lg">
        <p className="text-muted-foreground text-neon-green-600">No feedback yet.</p>
        <p className="text-sm text-neon-green-700">Be the first to share an idea!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <FeedbackItemCard item={item} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
