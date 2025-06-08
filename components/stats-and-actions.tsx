"use client"

import type React from "react"

import { useAppStore } from "@/lib/store"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Sun, Moon, BarChart2, Download, Upload } from "lucide-react"
import { useMemo, useRef } from "react"

export function StatsAndActions() {
  const { feedbackItems, theme, toggleTheme, importState } = useAppStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const stats = useMemo(() => {
    const totalVotes = feedbackItems.reduce((sum, item) => sum + item.votes, 0)
    const ideasLast7Days = feedbackItems.filter(
      (item) => new Date(item.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    ).length
    return {
      totalIdeas: feedbackItems.length,
      totalVotes,
      ideasLast7Days,
    }
  }, [feedbackItems])

  const handleExport = () => {
    const state = useAppStore.getState()
    const stateToExport = {
      feedbackItems: state.feedbackItems,
      activeCategory: state.activeCategory,
      sortOption: state.sortOption,
      theme: state.theme,
    }
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(stateToExport, null, 2))
    const downloadAnchorNode = document.createElement("a")
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "feedback-board-state.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const text = e.target?.result
          if (typeof text === "string") {
            const importedState = JSON.parse(text)
            importState(importedState)
          }
        } catch (error) {
          console.error("Error parsing JSON file:", error)
          alert("Invalid JSON file.")
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-neon-green-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-neon-green-400 flex items-center gap-2">
            <BarChart2 className="w-5 h-5" />
            Stats
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2 text-neon-green-300">
          <div className="flex justify-between">
            <span>Total Ideas:</span> <span className="font-bold">{stats.totalIdeas}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Votes:</span> <span className="font-bold">{stats.totalVotes}</span>
          </div>
          <div className="flex justify-between">
            <span>New this week:</span> <span className="font-bold">{stats.ideasLast7Days}</span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-neon-green-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-neon-green-400">Actions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4">
          <Button onClick={toggleTheme} variant="outline" className="border-neon-green-700 hover:bg-neon-green-900/50">
            {theme === "dark" ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
            {theme === "dark" ? "Light" : "Dark"} Mode
          </Button>
          <Button onClick={handleExport} variant="outline" className="border-neon-green-700 hover:bg-neon-green-900/50">
            <Download className="w-4 h-4 mr-2" /> Export
          </Button>
          <Button
            onClick={handleImportClick}
            variant="outline"
            className="col-span-2 border-neon-green-700 hover:bg-neon-green-900/50"
          >
            <Upload className="w-4 h-4 mr-2" /> Import JSON
          </Button>
          <input type="file" ref={fileInputRef} onChange={handleFileChange} accept=".json" className="hidden" />
        </CardContent>
      </Card>
    </div>
  )
}
