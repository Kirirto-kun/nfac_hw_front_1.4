import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { v4 as uuidv4 } from "uuid"
import type { AppStore, FeedbackItem } from "./types"

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      // State
      feedbackItems: [],
      activeCategory: "All",
      sortOption: "date",
      editingItem: null,
      theme: "dark",

      // Actions
      addFeedback: (item) => {
        const newFeedback: FeedbackItem = {
          ...item,
          id: uuidv4(),
          votes: 0,
          createdAt: new Date().toISOString(),
        }
        set((state) => ({
          feedbackItems: [newFeedback, ...state.feedbackItems],
        }))
      },
      deleteFeedback: (id) => {
        set((state) => ({
          feedbackItems: state.feedbackItems.filter((item) => item.id !== id),
        }))
      },
      editFeedback: (id, updatedItem) => {
        set((state) => ({
          feedbackItems: state.feedbackItems.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)),
          editingItem: null,
        }))
      },
      vote: (id, type) => {
        set((state) => ({
          feedbackItems: state.feedbackItems.map((item) =>
            item.id === id ? { ...item, votes: item.votes + (type === "up" ? 1 : -1) } : item,
          ),
        }))
      },
      setCategory: (category) => set({ activeCategory: category }),
      setSortOption: (option) => set({ sortOption: option }),
      setEditingItem: (item) => set({ editingItem: item }),
      toggleTheme: () => {
        const newTheme = get().theme === "light" ? "dark" : "light"
        set({ theme: newTheme })
        document.documentElement.classList.toggle("dark", newTheme === "dark")
      },
      importState: (newState) => {
        set(newState)
      },
    }),
    {
      name: "feedback-board-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle("dark", state.theme === "dark")
        }
      },
    },
  ),
)
