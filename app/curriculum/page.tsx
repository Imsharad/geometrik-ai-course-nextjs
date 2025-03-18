"use client"

import { useState } from "react"
import { ModuleCard } from "@/components/curriculum/module-card"
import { SkillDevelopment } from "@/components/curriculum/skill-development"
import { LearningOutcomes } from "@/components/curriculum/learning-outcomes"

export default function CurriculumPage() {
  const [activeModule, setActiveModule] = useState<string | null>("foundations")

  const modules = [
    {
      id: "foundations",
      title: "Foundations & Core Concepts",
      description: "Master the essential fundamentals that will serve as the building blocks for advanced topics",
      duration: "4 weeks",
      lessonCount: 12,
      level: "Beginner" as const,
      status: "In Progress" as const,
      updated: true,
      instructor: {
        name: "Dr. Alex Johnson",
        title: "Lead Instructor",
        avatar: "/placeholder.svg?height=80&width=80",
      },
      stats: {
        enrolled: 2451,
        rating: 4.8,
        completion: 92,
        avgTime: "16h",
      },
      progress: {
        completed: 2,
        total: 4,
      },
      estimatedTime: "16-20 hours",
      lessons: [
        {
          id: "lesson-1",
          title: "Introduction to Core Principles",
          duration: "45 min",
          type: "video",
          completed: true,
          preview: true,
        },
        {
          id: "lesson-2",
          title: "Fundamental Techniques & Approaches",
          duration: "1 hr",
          type: "video",
          completed: true,
        },
        {
          id: "lesson-3",
          title: "Setting Up Your Environment",
          duration: "30 min",
          type: "workshop",
        },
        {
          id: "lesson-4",
          title: "Hands-on Project: Foundations",
          duration: "2 hr",
          type: "project",
        },
      ],
    },
    {
      id: "advanced",
      title: "Advanced Implementation Strategies",
      description: "Build upon core concepts with sophisticated techniques for real-world applications",
      duration: "5 weeks",
      lessonCount: 15,
      level: "Intermediate" as const,
      status: "Unlocked" as const,
      instructor: {
        name: "Dr. Alex Johnson",
        title: "Lead Instructor",
        avatar: "/placeholder.svg?height=80&width=80",
      },
      stats: {
        enrolled: 1872,
        rating: 4.9,
        completion: 88,
        avgTime: "22h",
      },
      progress: {
        completed: 0,
        total: 5,
      },
      estimatedTime: "20-25 hours",
      lessons: [
        {
          id: "lesson-1",
          title: "Advanced Methodologies",
          duration: "1 hr",
          type: "video",
        },
        {
          id: "lesson-2",
          title: "Strategic Implementation",
          duration: "1.5 hr",
          type: "workshop",
        },
        {
          id: "lesson-3",
          title: "Performance Optimization",
          duration: "1 hr",
          type: "video",
        },
        {
          id: "lesson-4",
          title: "Case Study Analysis",
          duration: "45 min",
          type: "discussion",
        },
      ],
    },
  ]

  return (
    <div className="container py-12 mx-auto">
      <h1 className="text-3xl font-bold mb-8">Course Curriculum</h1>

      <div className="grid grid-cols-1 gap-8 mb-16">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            {...module}
            isActive={activeModule === module.id}
            onToggle={() => setActiveModule(activeModule === module.id ? null : module.id)}
            onContinue={() => console.log(`Continue learning ${module.id}`)}
          />
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-16">
        <SkillDevelopment />
        <LearningOutcomes />
      </div>
    </div>
  )
}

