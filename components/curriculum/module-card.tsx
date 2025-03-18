"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bookmark, ChevronDown, ChevronUp, Clock, Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface Lesson {
  id: string
  title: string
  duration: string
  type: "video" | "workshop" | "project" | "discussion" | "assessment" | "quiz"
  completed?: boolean
  preview?: boolean
}

export interface Module {
  id: string | number
  title: string
  description: string
  duration: string
  lessonCount: number
  level: "Beginner" | "Intermediate" | "Advanced"
  status: "Locked" | "Unlocked" | "In Progress" | "Completed"
  updated?: boolean
  instructor: {
    name: string
    title: string
    avatar?: string
  }
  stats: {
    enrolled: number
    rating: number
    completion: number
    avgTime: string
  }
  progress?: {
    completed: number
    total: number
  }
  estimatedTime: string
  lessons: Lesson[]
  onContinue?: () => void
  isActive?: boolean
  onToggle?: () => void
  colorScheme?: string
}

export function ModuleCard({
  title,
  description,
  duration,
  lessonCount,
  level,
  status,
  updated,
  instructor,
  stats,
  progress = { completed: 0, total: 1 },
  estimatedTime,
  lessons = [],
  onContinue,
  isActive,
  onToggle,
  colorScheme = "blue",
}: Module) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [hoveredLessonIndex, setHoveredLessonIndex] = useState<number | null>(null)
  const lessonRefs = useRef<(HTMLDivElement | null)[]>([])

  // Helper function to get background color with opacity based on color scheme
  const getColorWithOpacity = (scheme: string, opacity: number) => {
    const colors: Record<string, string> = {
      green: `rgba(16, 185, 129, ${opacity})`,
      blue: `rgba(59, 130, 246, ${opacity})`,
      purple: `rgba(139, 92, 246, ${opacity})`,
      amber: `rgba(245, 158, 11, ${opacity})`,
      rose: `rgba(244, 63, 94, ${opacity})`,
    }

    return colors[scheme] || colors.blue
  }

  // Helper function to get highlight class for the lesson number indicator
  const getHighlightClass = (scheme: string) => {
    switch (scheme) {
      case "green":
        return "bg-emerald-100 text-emerald-600"
      case "blue":
        return "bg-blue-100 text-blue-600"
      case "purple":
        return "bg-purple-100 text-purple-600"
      case "amber":
        return "bg-amber-100 text-amber-600"
      case "rose":
        return "bg-rose-100 text-rose-600"
      default:
        return "bg-blue-100 text-blue-600"
    }
  }

  const progressPercentage = progress ? (progress.completed / progress.total) * 100 : 0

  const getTypeColor = (type: Lesson["type"]) => {
    switch (type) {
      case "video":
        return "text-blue-600"
      case "workshop":
        return "text-purple-600"
      case "project":
        return "text-emerald-600"
      default:
        return "text-gray-600"
    }
  }

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "text-emerald-600"
      case "intermediate":
        return "text-blue-600"
      case "advanced":
        return "text-purple-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "in progress":
        return "text-blue-600"
      case "completed":
        return "text-emerald-600"
      case "unlocked":
        return "text-blue-600"
      case "locked":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300">
      {/* Top metadata row */}
      <div className="p-7">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="font-normal text-xs px-3 py-0.5 rounded-full border-none bg-gray-100">
              {duration}
            </Badge>
            <Badge variant="outline" className="font-normal text-xs px-3 py-0.5 rounded-full border-none bg-gray-100">
              {lessonCount} Lessons
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "font-normal text-xs px-3 py-0.5 rounded-full border-none bg-gray-100",
                getLevelColor(level),
              )}
            >
              {level}
            </Badge>
            <Badge
              variant="outline"
              className={cn(
                "font-normal text-xs px-3 py-0.5 rounded-full border-none bg-gray-100",
                getStatusColor(status),
              )}
            >
              {status}
            </Badge>
            {updated && (
              <Badge
                variant="outline"
                className="font-normal text-xs px-3 py-0.5 rounded-full border-none bg-gray-100 text-amber-600"
              >
                Updated
              </Badge>
            )}
          </div>

          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="text-gray-400 hover:text-black transition-colors"
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
          >
            <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-black text-black")} />
          </button>
        </div>

        {/* Title and description */}
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        <p className="text-gray-500 text-sm mb-8">{description}</p>

        {/* Instructor */}
        {instructor && (
          <div className="flex items-center gap-3 mb-8">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={instructor.avatar} alt={instructor.name} />
              <AvatarFallback>{instructor.name?.[0] || "?"}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium text-sm">{instructor.name}</div>
              <div className="text-xs text-gray-500">{instructor.title}</div>
            </div>
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-4 gap-8 mb-8">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold">{stats.enrolled?.toLocaleString() || 0}</div>
              <div className="text-xs text-gray-500 mt-1">Enrolled</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold">{stats.rating || 0}</div>
              <div className="text-xs text-gray-500 mt-1">Rating</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold">{stats.completion || 0}%</div>
              <div className="text-xs text-gray-500 mt-1">Completion</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-xl font-bold">{stats.avgTime || "0h"}</div>
              <div className="text-xs text-gray-500 mt-1">Avg. Time</div>
            </div>
          </div>
        )}

        {/* Progress */}
        {progress && (
          <div className="mb-6">
            <div className="flex justify-between text-xs mb-2">
              <span>
                {progress.completed} of {progress.total} completed
              </span>
              <span className="font-medium">{progressPercentage.toFixed(0)}%</span>
            </div>
            <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-black"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, ease: "easeOut" }}
              ></motion.div>
            </div>

            {/* Progress milestones */}
            <div className="flex justify-between mt-2">
              <div className="text-[10px] text-gray-400">25%</div>
              <div className="text-[10px] text-gray-400">50%</div>
              <div className="text-[10px] text-gray-400">75%</div>
              <div className="text-[10px] text-gray-400">100%</div>
            </div>
          </div>
        )}

        {/* Estimated time */}
        {estimatedTime && (
          <div className="flex items-center text-xs text-gray-500 mb-2">
            <Clock className="h-3 w-3 mr-1.5" />
            Estimated time to complete: {estimatedTime}
          </div>
        )}
      </div>

      {/* Lessons toggle */}
      <div className="px-7 py-3 border-t border-gray-100 flex justify-between items-center bg-gray-50">
        <Button variant="ghost" size="sm" className="gap-1.5 text-sm font-medium p-0 h-auto" onClick={onToggle}>
          {isActive ? (
            <>
              <ChevronUp className="h-4 w-4" />
              Hide Lessons
            </>
          ) : (
            <>
              <ChevronDown className="h-4 w-4" />
              Show Lessons
            </>
          )}
        </Button>

        <div className="text-xs text-gray-500">
          {progress?.completed || 0}/{progress?.total || 0} • {duration}
        </div>
      </div>

      {/* Lessons list */}
      <AnimatePresence>
        {isActive && lessons && lessons.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-gray-100 bg-white">
              {lessons.map((lesson, index) => (
                <motion.div
                  key={lesson.id}
                  ref={(el) => (lessonRefs.current[index] = el)}
                  className={cn(
                    "flex items-center gap-4 px-7 py-5 transition-colors relative z-10 hover:bg-gray-50",
                    index !== lessons.length - 1 && "border-b border-gray-100",
                  )}
                  onMouseEnter={() => setHoveredLessonIndex(index)}
                  onMouseLeave={() => setHoveredLessonIndex(null)}
                >
                  {/* Lesson number/completion indicator */}
                  <div
                    className={cn(
                      "w-6 h-6 rounded-full flex items-center justify-center text-xs transition-colors",
                      lesson.completed
                        ? "bg-emerald-100 text-emerald-600"
                        : hoveredLessonIndex === index
                          ? getHighlightClass(colorScheme)
                          : "bg-gray-100 text-gray-500",
                    )}
                  >
                    {index + 1}
                  </div>

                  {/* Lesson details */}
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm mb-1">{lesson.title}</div>
                    <div className="flex items-center gap-4">
                      <span className={cn("text-xs capitalize", getTypeColor(lesson.type))}>{lesson.type}</span>

                      {lesson.preview && <span className="text-xs text-amber-600">Free Preview</span>}

                      <span className="text-xs text-gray-500">{lesson.duration}</span>
                    </div>
                  </div>

                  {/* Play button */}
                  <Button size="icon" variant="ghost" className="h-8 w-8 rounded-full hover:bg-gray-100">
                    <Play className="h-4 w-4 text-gray-500" />
                  </Button>
                </motion.div>
              ))}
            </div>

            {/* Continue button */}
            <div className="p-7 flex justify-center border-t border-gray-100 bg-gray-50">
              <Button
                onClick={onContinue}
                className="px-10 py-6 rounded-full bg-black text-white hover:bg-gray-800 transition-colors"
              >
                Continue Learning
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

