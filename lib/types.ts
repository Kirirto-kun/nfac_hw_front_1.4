export type Category = "UI" | "UX" | "Performance" | "Feature" | "Bug"

export type FeedbackItem = {
  id: string
  text: string
  category: Category
  votes: number
  createdAt: string
}

export type SortOption = "date" | "votes"

export type AppState = {
  feedbackItems: FeedbackItem[]
  activeCategory: Category | "All"
  sortOption: SortOption
  editingItem: FeedbackItem | null
  theme: "light" | "dark"
}

export type AppActions = {
  addFeedback: (item: Omit<FeedbackItem, "id" | "votes" | "createdAt">) => void
  deleteFeedback: (id: string) => void
  editFeedback: (id: string, updatedItem: Partial<FeedbackItem>) => void
  vote: (id: string, type: "up" | "down") => void
  setCategory: (category: Category | "All") => void
  setSortOption: (option: SortOption) => void
  setEditingItem: (item: FeedbackItem | null) => void
  toggleTheme: () => void
  importState: (newState: Partial<AppState>) => void
}

export type AppStore = AppState & AppActions
