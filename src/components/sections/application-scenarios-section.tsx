// Move from components/application-scenarios-section.tsx
"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

const scenarios = [
  {
    id: "beginner",
    title: "Beginners",
    description:
      "Starting with fundamentals, you'll build a strong foundation with step-by-step guidance. Our structured approach ensures you don't feel overwhelmed and can progress at a comfortable pace.",
    benefits: [
      "Guided projects with detailed explanations",
      "Core concepts explained in simple terms",
      "Extra support through community and office hours",
    ],
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description:
      "Build upon your existing knowledge with advanced techniques and specialized applications. You'll bridge gaps in your understanding while expanding your skill set significantly.",
    benefits: [
      "Advanced implementation techniques",
      "Performance optimization strategies",
      "Real-world case studies and solutions",
    ],
  },
  {
    id: "advanced",
    title: "Advanced",
    description:
      "Master cutting-edge techniques and industry best practices. Our advanced modules will challenge you and help you develop specialized expertise in your field.",
    benefits: [
      "Specialized topics and emerging trends",
      "System architecture and optimization",
      "Leadership and mentoring techniques",
    ],
  },
]

export function ApplicationScenariosSection() {
  const [activeTab, setActiveTab] = useState("beginner")
  const activeScenario = scenarios.find((s) => s.id === activeTab) || scenarios[0]

  return (
    <section className="py-16 bg-background" id="application-scenarios">
      <div className="container px-4 max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <h2 className="text-2xl font-bold tracking-tight mb-3">Practical Application Scenarios</h2>
          <p className="text-muted-foreground mb-6">Tailored learning paths designed for every experience level</p>
        </div>

        <div className="max-w-3xl mx-auto border rounded-lg overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => setActiveTab(scenario.id)}
                className={cn(
                  "flex-1 py-3 text-sm font-medium transition-colors",
                  activeTab === scenario.id ? "bg-white" : "bg-muted hover:bg-muted/80",
                )}
              >
                {scenario.title}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 bg-white"
            >
              <h3 className="text-lg font-medium mb-4">For {activeScenario.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">{activeScenario.description}</p>

              <ul className="space-y-3 mb-6">
                {activeScenario.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Button size="sm">Start Your Journey</Button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

