"use client"

import { useState } from "react"
import { motion } from "@/app/fix-framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, XCircle, Brain, ArrowRightLeft, BarChart } from "lucide-react"
import Link from "next/link"

interface ValuePropositionProps {
  variant: "problem-solution" | "competitive" | "scenarios"
  variants?: any
}

// Problem-solution data
const problems = [
  {
    id: 1,
    title: "Lack of structured knowledge",
    description: "Random tutorials and fragmented resources don't provide a comprehensive understanding",
    icon: Brain,
  },
  {
    id: 2,
    title: "Theory without application",
    description: "Most courses focus on concepts without practical implementation guidance",
    icon: ArrowRightLeft,
  },
  {
    id: 3,
    title: "Undefined career path",
    description: "Uncertainty about how to leverage skills for career advancement",
    icon: BarChart,
  },
]

const solutions = [
  {
    id: 1,
    title: "Comprehensive curriculum",
    description: "Structured learning path that builds your knowledge systematically",
    icon: Brain,
  },
  {
    id: 2,
    title: "Practical projects",
    description: "Real-world applications and exercises to reinforce every concept",
    icon: ArrowRightLeft,
  },
  {
    id: 3,
    title: "Career roadmap",
    description: "Clear guidance on how to apply skills for professional growth",
    icon: BarChart,
  },
]

// Competitive comparison data
const comparisonFeatures = [
  "Comprehensive Curriculum",
  "Practical Projects",
  "Community Support",
  "Instructor Access",
  "Career Guidance",
  "Lifetime Updates",
  "Certification",
]

// Application scenarios
const scenarios = [
  {
    id: "beginner",
    title: "Beginners",
    description: "Starting from scratch with no prior experience",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Building on existing fundamentals to advance skills",
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Refining expertise and mastering complex techniques",
  },
]

export function ValueProposition({ variant, variants }: ValuePropositionProps) {
  const [activeTab, setActiveTab] = useState("beginner")

  if (variant === "problem-solution") {
    return (
      <motion.div variants={variants} className="md:col-span-3">
        <h3 className="text-lg font-bold mb-6">Problem-Solution Framework</h3>
        <div className="grid grid-cols-1 gap-6">
          {problems.map((problem, index) => {
            const Solution = solutions[index]
            const Icon = problem.icon

            return (
              <div key={problem.id} className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-red-50/50 rounded-lg border border-red-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-red-500">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">{problem.title}</h4>
                      <p className="text-xs text-muted-foreground">{problem.description}</p>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 text-blue-500">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">{Solution.title}</h4>
                      <p className="text-xs text-muted-foreground">{Solution.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </motion.div>
    )
  }

  if (variant === "competitive") {
    return (
      <motion.div className="mb-16" variants={variants}>
        <h3 className="text-lg font-bold mb-6 text-center">Competitive Advantage</h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse rounded-lg overflow-hidden shadow-sm">
            <thead>
              <tr className="bg-muted/70">
                <th className="text-left p-4 font-medium border-b">Feature</th>
                <th className="text-center p-4 font-medium border-b">This Course</th>
                <th className="text-center p-4 font-medium border-b">Others</th>
              </tr>
            </thead>
            <tbody>
              {comparisonFeatures.map((feature, i) => (
                <tr
                  key={i}
                  className={i % 2 === 0 ? "bg-muted/30" : "bg-background"}
                  style={{
                    transition: "all 0.2s ease-in-out",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(var(--primary-rgb), 0.05)"
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = i % 2 === 0 ? "var(--muted)" : "var(--background)"
                  }}
                >
                  <td className="p-4 text-sm border-b">{feature}</td>
                  <td className="p-4 text-center border-b">
                    <div className="flex justify-center">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                  </td>
                  <td className="p-4 text-center border-b">
                    <div className="flex justify-center">
                      {i < 2 ? (
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 opacity-60" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 flex justify-end gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Included</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="h-4 w-4 text-red-500" />
            <span>Not included</span>
          </div>
        </div>
      </motion.div>
    )
  }

  // Default scenarios
  return (
    <motion.div variants={variants}>
      <h3 className="text-lg font-bold mb-6 text-center">Practical Application Scenarios</h3>

      <Tabs defaultValue="beginner" className="max-w-3xl mx-auto">
        <TabsList className="grid grid-cols-3 mb-6 w-full">
          {scenarios.map((scenario) => (
            <TabsTrigger key={scenario.id} value={scenario.id} className="py-2">
              {scenario.title}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="beginner" className="p-6 bg-card rounded-lg border">
          <h4 className="text-base font-medium mb-4">For Beginners</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Starting with fundamentals, you'll build a strong foundation with step-by-step guidance. Our structured
            approach ensures you don't feel overwhelmed and can progress at a comfortable pace.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">Guided projects with detailed explanations</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">Core concepts explained in simple terms</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">Extra support through community and office hours</span>
            </li>
          </ul>
          <Button asChild size="sm">
            <Link href="#enroll">Start Your Journey</Link>
          </Button>
        </TabsContent>

        <TabsContent value="intermediate" className="p-6 bg-card rounded-lg border">
          <h4 className="text-base font-medium mb-4">For Intermediate Learners</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Build upon your existing knowledge with advanced techniques and specialized applications. You'll bridge gaps
            in your understanding while expanding your skill set significantly.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">Advanced implementation techniques</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">Performance optimization strategies</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">Real-world case studies and solutions</span>
            </li>
          </ul>
          <Button asChild size="sm">
            <Link href="#enroll">Enhance Your Skills</Link>
          </Button>
        </TabsContent>

        <TabsContent value="advanced" className="p-6 bg-card rounded-lg border">
          <h4 className="text-base font-medium mb-4">For Advanced Practitioners</h4>
          <p className="text-sm text-muted-foreground mb-6">
            Master cutting-edge techniques and industry best practices. Our advanced modules will challenge you and help
            you develop specialized expertise in your field.
          </p>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">Specialized topics and emerging trends</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">System architecture and optimization</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm">Leadership and mentoring techniques</span>
            </li>
          </ul>
          <Button asChild size="sm">
            <Link href="#enroll">Perfect Your Expertise</Link>
          </Button>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}

