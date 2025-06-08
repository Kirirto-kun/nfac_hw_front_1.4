"use client"

import { useAppStore } from "@/lib/store"
import { FeedbackForm } from "@/components/feedback-form"
import { FeedbackList } from "@/components/feedback-list"
import { FeedbackFilters } from "@/components/feedback-filters"
import { EditFeedbackModal } from "@/components/edit-feedback-modal"
import { StatsAndActions } from "@/components/stats-and-actions"
import { useEffect } from "react"

export function FeedbackBoard() {
  const { feedbackItems, activeCategory, sortOption, editingItem } = useAppStore()

  // This effect ensures the theme is applied on initial client-side render
  useEffect(() => {
    const theme = useAppStore.getState().theme
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [])

  const filteredItems = feedbackItems.filter((item) => activeCategory === "All" || item.category === activeCategory)

  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortOption === "votes") {
      return b.votes - a.votes
    }
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  })

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-8">
      <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h1 className="text-3xl font-bold text-neon-green-400">Product Feedback Board</h1>
          <FeedbackForm />
          <FeedbackFilters />
          <FeedbackList items={sortedItems} />
        </div>
        <aside className="space-y-6">
          <StatsAndActions />
        </aside>
      </div>
      {editingItem && <EditFeedbackModal />}
    </div>
  )
}
