"use client"

import { useState } from "react"
import { Check, Quote } from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface LearningOutcomesProps {
  className?: string
}

interface Outcome {
  id: string
  title: string
  description: string
  relevance: string
  skills: string[]
}

const outcomes: Outcome[] = [
  {
    id: "technical",
    title: "Technical Proficiency",
    description: "Master advanced techniques and implement complex solutions with confidence",
    relevance: "Essential in software development, data science, and IT operations",
    skills: ["Problem Solving", "System Design", "Implementation", "Debugging"],
  },
  {
    id: "strategic",
    title: "Strategic Application",
    description: "Apply principles strategically to solve business challenges and drive results",
    relevance: "Essential for managers, team leads, and strategic roles",
    skills: ["Business Analysis", "Strategic Planning", "Resource Allocation", "Decision Making"],
  },
  {
    id: "optimization",
    title: "Optimization Expertise",
    description: "Identify performance bottlenecks and implement efficient solutions",
    relevance: "Critical for performance engineers and systems architects",
    skills: ["Performance Tuning", "Resource Optimization", "Efficiency Analysis", "Benchmarking"],
  },
]

export function LearningOutcomes({ className }: LearningOutcomesProps) {
  const [activeOutcome, setActiveOutcome] = useState<string>("technical")

  const currentOutcome = outcomes.find((outcome) => outcome.id === activeOutcome) || outcomes[0]

  return (
    <div className={cn("w-full", className)}>
      <h3 className="text-lg font-medium mb-6">Learning Outcomes</h3>

      <div className="flex border-b mb-6">
        {outcomes.map((outcome) => (
          <button
            key={outcome.id}
            className={cn(
              "px-4 py-2 text-sm font-medium relative transition-colors",
              activeOutcome === outcome.id ? "text-black" : "text-gray-500 hover:text-gray-800",
            )}
            onClick={() => setActiveOutcome(outcome.id)}
          >
            {outcome.title}
            {activeOutcome === outcome.id && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-black" />}
          </button>
        ))}
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-xl font-medium mb-2">{currentOutcome.title}</h4>
          <p className="text-gray-600 mb-4">{currentOutcome.description}</p>
          <p className="text-sm text-gray-500 mb-6">{currentOutcome.relevance}</p>

          <div className="space-y-2">
            {currentOutcome.skills.map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-black/5 flex items-center justify-center">
                  <Check className="h-3 w-3 text-black" />
                </div>
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t">
          <div className="flex items-start gap-4">
            <Quote className="h-6 w-6 text-gray-300 flex-shrink-0 mt-1" />
            <div>
              <p className="text-gray-600 italic text-sm">
                "The curriculum structure helped me master complex concepts step by step, making the learning journey
                both challenging and rewarding."
              </p>
              <div className="flex items-center mt-4">
                <Avatar className="h-8 w-8 mr-3">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Sarah K." />
                  <AvatarFallback>SK</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">Sarah K.</p>
                  <p className="text-xs text-gray-500">Senior Developer</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

