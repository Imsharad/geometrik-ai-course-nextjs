"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  BookOpen,
  Clock,
  FileText,
  Play,
  Lightbulb,
  Zap,
  BarChart,
  FileCode,
  Network,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Lock,
  Star,
  Sparkles,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useInView } from "react-intersection-observer"

// Types
interface Topic {
  id: string
  title: string
  duration: string
  type: "video" | "workshop" | "project" | "discussion" | "assessment" | "quiz"
  preview?: boolean
  completed?: boolean
  locked?: boolean
}

interface Module {
  id: number
  title: string
  description: string
  duration: string
  lessons: number
  topics: Topic[]
  color: string
  icon: any
  completed?: number
  unlocked?: boolean
}

// Data
const modules: Module[] = [
  {
    id: 1,
    title: "Foundations & Core Concepts",
    description: "Master the essential fundamentals that will serve as the building blocks for advanced topics",
    duration: "4 weeks",
    lessons: 12,
    color: "from-emerald-500 to-teal-500",
    icon: Lightbulb,
    completed: 2,
    unlocked: true,
    topics: [
      {
        id: "1.1",
        title: "Introduction to Core Principles",
        duration: "45 min",
        type: "video",
        preview: true,
        completed: true,
      },
      {
        id: "1.2",
        title: "Fundamental Techniques & Approaches",
        duration: "1 hr",
        type: "video",
        completed: true,
      },
      {
        id: "1.3",
        title: "Setting Up Your Environment",
        duration: "30 min",
        type: "workshop",
      },
      {
        id: "1.4",
        title: "Hands-on Project: Foundations",
        duration: "2 hr",
        type: "project",
      },
    ],
  },
  {
    id: 2,
    title: "Advanced Implementation Strategies",
    description: "Build upon core concepts with sophisticated techniques for real-world applications",
    duration: "5 weeks",
    lessons: 15,
    color: "from-blue-500 to-indigo-500",
    icon: BarChart,
    unlocked: true,
    completed: 0,
    topics: [
      {
        id: "2.1",
        title: "Advanced Methodologies",
        duration: "1 hr",
        type: "video",
      },
      {
        id: "2.2",
        title: "Strategic Implementation",
        duration: "1.5 hr",
        type: "workshop",
      },
      {
        id: "2.3",
        title: "Performance Optimization",
        duration: "1 hr",
        type: "video",
      },
      {
        id: "2.4",
        title: "Case Study Analysis",
        duration: "45 min",
        type: "discussion",
      },
    ],
  },
  {
    id: 3,
    title: "Specialized Applications & Mastery",
    description: "Refine your expertise with industry-specific applications and complex problem-solving",
    duration: "6 weeks",
    lessons: 18,
    color: "from-purple-500 to-violet-500",
    icon: Network,
    topics: [
      {
        id: "3.1",
        title: "Industry-Specific Implementations",
        duration: "1 hr",
        type: "video",
        locked: true,
      },
      {
        id: "3.2",
        title: "Advanced Problem Solving",
        duration: "2 hr",
        type: "workshop",
        locked: true,
      },
      {
        id: "3.3",
        title: "Integration & Ecosystem Development",
        duration: "1.5 hr",
        type: "video",
        locked: true,
      },
      {
        id: "3.4",
        title: "Capstone Project",
        duration: "4 hr",
        type: "project",
        locked: true,
      },
    ],
  },
  {
    id: 4,
    title: "Professional Application & Career Growth",
    description: "Translate your skills into career advancement with strategic implementation",
    duration: "3 weeks",
    lessons: 9,
    color: "from-amber-500 to-orange-500",
    icon: Star,
    topics: [
      {
        id: "4.1",
        title: "Portfolio Development",
        duration: "1 hr",
        type: "workshop",
        locked: true,
      },
      {
        id: "4.2",
        title: "Industry Best Practices",
        duration: "1 hr",
        type: "video",
        locked: true,
      },
      {
        id: "4.3",
        title: "Career Strategy & Growth",
        duration: "45 min",
        type: "discussion",
        locked: true,
      },
      {
        id: "4.4",
        title: "Final Assessment & Certification",
        duration: "2 hr",
        type: "assessment",
        locked: true,
      },
    ],
  },
]

// Micro-components
const ModuleIcon = ({ module, isActive }: { module: Module; isActive: boolean }) => {
  const Icon = module.icon

  return (
    <motion.div
      className={cn(
        "relative w-12 h-12 rounded-full flex items-center justify-center z-10",
        isActive ? `bg-gradient-to-br ${module.color} shadow-md` : "bg-muted border",
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
    >
      <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-muted-foreground")} />

      {module.completed && module.completed > 0 && (
        <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-background flex items-center justify-center">
          <span className="text-[10px] font-bold text-white">{module.completed}</span>
        </div>
      )}

      {!module.unlocked && (
        <div className="absolute inset-0 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center">
          <Lock className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${module.color} blur-md opacity-20`} />
        </motion.div>
      )}
    </motion.div>
  )
}

const TopicItem = ({ topic, moduleColor }: { topic: Topic; moduleColor: string }) => {
  const [isHovered, setIsHovered] = useState(false)
  const itemRef = useRef<HTMLLIElement>(null)
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, left: 0, top: 0, width: 0, height: 0 })

  useEffect(() => {
    if (isHovered && itemRef.current) {
      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = itemRef.current
      setHoverStyle({
        opacity: 1,
        left: 0,
        top: 0,
        width: offsetWidth,
        height: offsetHeight,
      })
    } else {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [isHovered])

  let Icon = FileText
  if (topic.type === "video") Icon = Play
  if (topic.type === "workshop") Icon = Zap
  if (topic.type === "project") Icon = FileCode
  if (topic.type === "discussion") Icon = Network
  if (topic.type === "assessment") Icon = BarChart

  return (
    <motion.li
      ref={itemRef}
      className={cn("flex items-start gap-3 p-3 rounded-lg transition-all relative", topic.locked ? "opacity-60" : "")}
      whileHover={{ x: topic.locked ? 0 : 3 }}
      onMouseEnter={() => !topic.locked && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover background effect */}
      {!topic.locked && (
        <div
          className="absolute inset-0 bg-muted/50 rounded-lg transition-all duration-300 ease-out pointer-events-none"
          style={{
            opacity: hoverStyle.opacity,
            left: hoverStyle.left,
            top: hoverStyle.top,
            width: hoverStyle.width,
            height: hoverStyle.height,
          }}
        />
      )}

      <div
        className={cn(
          "p-1.5 rounded-md relative z-10",
          topic.completed ? `bg-gradient-to-br ${moduleColor} text-white` : "bg-muted",
        )}
      >
        {topic.completed ? <CheckCircle className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
      </div>

      <div className="flex-1 relative z-10">
        <div className="flex flex-wrap justify-between gap-2">
          <div className="font-medium flex items-center gap-2">
            {topic.title}
            {topic.locked && <Lock className="h-3 w-3 text-red-500" />}
            {topic.completed && <CheckCircle className="h-3 w-3 text-emerald-500" />}
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {topic.duration}
          </div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge
            variant="outline"
            className={cn(
              "text-xs capitalize",
              topic.type === "video"
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : topic.type === "workshop"
                  ? "border-purple-200 bg-purple-50 text-purple-700"
                  : topic.type === "project"
                    ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                    : topic.type === "discussion"
                      ? "border-amber-200 bg-amber-50 text-amber-700"
                      : "border-gray-200 bg-gray-50 text-gray-700",
            )}
          >
            {topic.type}
          </Badge>
          {topic.preview && (
            <Badge variant="secondary" className="text-xs bg-amber-100 text-amber-700 border-amber-200">
              Free Preview
            </Badge>
          )}
        </div>
      </div>

      {!topic.locked && isHovered && (
        <motion.div className="self-center relative z-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <Button variant="ghost" size="icon" className="h-7 w-7 bg-primary/10 hover:bg-primary/20">
            <Play className="h-3.5 w-3.5 text-primary" />
          </Button>
        </motion.div>
      )}
    </motion.li>
  )
}

const ModuleProgressBar = ({ module }: { module: Module }) => {
  const completedCount = module.topics.filter((t) => t.completed).length
  const totalCount = module.topics.length
  const percentage = (completedCount / totalCount) * 100

  return (
    <div className="mt-2 space-y-1">
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">
          {completedCount} of {totalCount} completed
        </span>
        <span className="font-medium">{percentage.toFixed(0)}%</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${module.color}`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8 }}
        />
      </div>
    </div>
  )
}

// Main component
export function LearningPathway() {
  const [expandedModule, setExpandedModule] = useState<number | null>(1)
  const [hoveredModule, setHoveredModule] = useState<number | null>(null)
  const moduleRefs = useRef<(HTMLDivElement | null)[]>([])
  const ref = useRef(null)
  const [isInView, inViewRef] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const toggleModule = (moduleId: number) => {
    setExpandedModule(expandedModule === moduleId ? null : moduleId)
  }

  return (
    <div ref={ref} className="relative max-w-5xl mx-auto">
      <motion.div
        className="absolute top-0 left-0 right-0 h-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="w-1 bg-gradient-to-b from-transparent via-muted to-transparent" />
      </motion.div>

      <motion.div
        className="relative z-10 mb-10 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="text-2xl font-bold">Your Learning Journey</h3>
        <p className="text-muted-foreground mt-2">Follow your personalized path to mastery</p>
      </motion.div>

      <div className="space-y-8">
        {modules.map((module, index) => {
          const isActive = expandedModule === module.id
          const isHovered = hoveredModule === module.id

          return (
            <motion.div
              key={module.id}
              className="relative"
              ref={(el) => (moduleRefs.current[index] = el)}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredModule(module.id)}
              onMouseLeave={() => setHoveredModule(null)}
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="md:w-16 flex items-start justify-center">
                  <ModuleIcon module={module} isActive={isActive || isHovered} />
                </div>

                <motion.div
                  className={cn(
                    "flex-1 bg-card rounded-lg border p-6 relative overflow-hidden transition-all",
                    isActive ? "shadow-md" : "",
                  )}
                >
                  {/* Hover background effect */}
                  <div
                    className="absolute inset-0 bg-primary/5 rounded-lg transition-all duration-300 ease-out pointer-events-none"
                    style={{
                      opacity: isHovered ? 1 : 0,
                    }}
                  />

                  <div className="flex flex-wrap gap-3 mb-3 relative z-10">
                    <Badge variant="outline" className="bg-muted/50 py-1 px-3 gap-1 text-sm">
                      <Clock className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-foreground">{module.duration}</span>
                    </Badge>
                    <Badge variant="outline" className="bg-muted/50 py-1 px-3 gap-1 text-sm">
                      <BookOpen className="mr-1 h-3.5 w-3.5 text-muted-foreground" />
                      <span className="text-foreground">{module.lessons} Lessons</span>
                    </Badge>

                    {module.unlocked && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="outline"
                              className="bg-emerald-50 text-emerald-700 border-emerald-200 py-1 px-3 gap-1 text-sm"
                            >
                              <Sparkles className="mr-1 h-3.5 w-3.5" /> Unlocked
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">This module is available for you to start learning</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}

                    {!module.unlocked && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Badge
                              variant="outline"
                              className="bg-red-50 text-red-500 border-red-200 py-1 px-3 gap-1 text-sm"
                            >
                              <Lock className="mr-1 h-3.5 w-3.5" /> Locked
                            </Badge>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="text-xs">Complete previous modules to unlock</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                  </div>

                  <h4 className="text-xl font-bold mb-2 flex items-center gap-2 relative z-10">
                    <span>{module.title}</span>
                    {module.completed && module.completed > 0 && (
                      <Badge className="bg-emerald-100 text-emerald-700 border-none">
                        <CheckCircle className="mr-1 h-3 w-3" /> In Progress
                      </Badge>
                    )}
                  </h4>

                  <p className="text-muted-foreground mb-4 relative z-10">{module.description}</p>

                  {module.completed !== undefined && <ModuleProgressBar module={module} />}

                  <div className="mt-4 relative z-10">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn("gap-2 transition-all", isActive ? "text-primary" : "text-muted-foreground")}
                      onClick={() => toggleModule(module.id)}
                    >
                      {isActive ? (
                        <>
                          <ChevronUp className="h-4 w-4" />
                          <span>Hide Lessons</span>
                        </>
                      ) : (
                        <>
                          <ChevronDown className="h-4 w-4" />
                          <span>View Lessons</span>
                        </>
                      )}
                    </Button>
                  </div>

                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden relative z-10"
                      >
                        <motion.ul
                          className="space-y-3 pt-4 border-t mt-4"
                          initial="hidden"
                          animate="visible"
                          variants={{
                            hidden: {},
                            visible: {
                              transition: {
                                staggerChildren: 0.05,
                              },
                            },
                          }}
                        >
                          {module.topics.map((topic) => (
                            <motion.div
                              key={topic.id}
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: { opacity: 1, y: 0 },
                              }}
                            >
                              <TopicItem topic={topic} moduleColor={module.color} />
                            </motion.div>
                          ))}
                        </motion.ul>

                        {module.unlocked && (
                          <motion.div
                            className="mt-6 flex justify-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                          >
                            <Button className={cn("bg-gradient-to-r text-white border-none", module.color)}>
                              {module.completed && module.completed > 0 ? "Continue Learning" : "Start Module"}
                            </Button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Subtle gradient indicator at the bottom */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 right-0 h-1 opacity-0 transition-opacity duration-300",
                      isActive || isHovered ? "opacity-100" : "",
                    )}
                  >
                    <div className={`h-full bg-gradient-to-r ${module.color}`}></div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )
        })}
      </div>

      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Button size="lg" className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-none">
          Explore Full Curriculum
        </Button>
      </motion.div>
    </div>
  )
}

