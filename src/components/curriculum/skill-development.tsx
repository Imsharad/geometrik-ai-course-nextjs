"use client"

import { useEffect, useState } from "react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"
import { ArrowUpRight, Sparkles, TrendingUp } from "lucide-react"

interface SkillDevelopmentProps {
  className?: string
}

interface Skill {
  id: number
  name: string
  level: number
  category: "technical" | "soft" | "business"
  status?: "trending" | "in-demand"
  percentile?: number
}

const skills: Skill[] = [
  {
    id: 1,
    name: "Core Principles",
    level: 90,
    category: "technical",
    status: "in-demand",
    percentile: 19,
  },
  {
    id: 2,
    name: "Technical Implementation",
    level: 85,
    category: "technical",
    status: "trending",
    percentile: 23,
  },
  {
    id: 3,
    name: "Strategic Applications",
    level: 80,
    category: "business",
    status: "in-demand",
    percentile: 28,
  },
  {
    id: 4,
    name: "Performance Optimization",
    level: 75,
    category: "technical",
    status: "trending",
    percentile: 32,
  },
  {
    id: 5,
    name: "System Integration",
    level: 70,
    category: "technical",
    percentile: 37,
  },
]

export function SkillDevelopment({ className }: SkillDevelopmentProps) {
  const [animatedLevels, setAnimatedLevels] = useState<Record<number, number>>({})

  // Animate progress bars
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialLevels: Record<number, number> = {}
      skills.forEach((skill) => {
        initialLevels[skill.id] = 0
      })
      setAnimatedLevels(initialLevels)

      skills.forEach((skill) => {
        const interval = setInterval(() => {
          setAnimatedLevels((prev) => {
            if (prev[skill.id] >= skill.level) {
              clearInterval(interval)
              return prev
            }
            return {
              ...prev,
              [skill.id]: Math.min(prev[skill.id] + 2, skill.level),
            }
          })
        }, 20)
      })
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className={cn("w-full", className)}>
      <h3 className="text-lg font-medium mb-6">Skill Development</h3>

      <div className="space-y-8">
        {skills.map((skill) => {
          const animatedLevel = animatedLevels[skill.id] || 0

          return (
            <div key={skill.id} className="group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{skill.name}</span>
                  {skill.status === "trending" && (
                    <div className="flex items-center text-xs text-blue-600 gap-0.5">
                      <TrendingUp className="h-3 w-3" />
                      <span>Trending</span>
                    </div>
                  )}
                  {skill.status === "in-demand" && (
                    <div className="flex items-center text-xs text-amber-600 gap-0.5">
                      <Sparkles className="h-3 w-3" />
                      <span>In Demand</span>
                    </div>
                  )}
                </div>
                <span className="text-sm font-medium">{animatedLevel}%</span>
              </div>

              <div className="relative mb-1">
                <Progress
                  value={animatedLevel}
                  className="h-1.5 bg-gray-100"
                  indicatorClassName={cn(
                    skill.status === "trending"
                      ? "bg-blue-500"
                      : skill.status === "in-demand"
                        ? "bg-amber-500"
                        : "bg-black",
                  )}
                />
              </div>

              {/* Skill details */}
              <div className="text-xs text-gray-500 mt-1">Top {skill.percentile}% of professionals</div>
            </div>
          )
        })}
      </div>

      <div className="mt-8">
        <button className="group flex items-center text-sm font-medium hover:text-blue-600 transition-colors">
          View Full Curriculum
          <ArrowUpRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </div>
  )
}

