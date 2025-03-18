"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface CurriculumStat {
  icon: React.ElementType
  value: string
  label: string
  color?: string
}

interface CurriculumStatsProps {
  stats: CurriculumStat[]
}

export function CurriculumStats({ stats }: CurriculumStatsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon

        return (
          <motion.div
            key={index}
            className={cn("flex flex-col items-center justify-center p-6 rounded-lg border", stat.color || "bg-card")}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{
              y: -5,
              boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Icon className="h-8 w-8 mb-3" />
            <div className="text-3xl font-bold mb-1">{stat.value}</div>
            <div className="text-sm text-muted-foreground text-center">{stat.label}</div>
          </motion.div>
        )
      })}
    </div>
  )
}

