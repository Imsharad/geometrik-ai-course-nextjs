"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "@/app/fix-framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Sparkles,
  ChevronRight,
  Play,
  CheckCircle,
  Info,
  Download,
  ExternalLink,
  Lightbulb,
  Brain,
  Zap,
  Star,
  TrendingUp,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { LeadCaptureForm } from "@/components/marketing/lead-capture-form"

// Enhanced iteration tracking system
const ITERATIONS = {
  INITIAL: {
    version: "1.0.0",
    date: "2023-06-01",
    features: ["Basic layout", "Simple image display", "Text content"],
  },
  TYPOGRAPHY: {
    version: "1.1.0",
    date: "2023-06-15",
    features: [
      "Improved font hierarchy",
      "Gradient text effects",
      "Optimized line heights and spacing",
      "Enhanced readability with proper contrast",
    ],
  },
  COLOR_SCHEME: {
    version: "1.2.0",
    date: "2023-07-01",
    features: ["Cohesive color palette", "Gradient backgrounds", "Subtle glow effects", "Dark theme optimization"],
  },
  LAYOUT: {
    version: "1.3.0",
    date: "2023-07-15",
    features: [
      "Improved component spacing",
      "Better visual hierarchy",
      "Added statistics section",
      "Floating quote element",
    ],
  },
  RESPONSIVENESS: {
    version: "1.4.0",
    date: "2023-08-01",
    features: [
      "Mobile-optimized layout",
      "Responsive typography",
      "Adaptive spacing",
      "Touch-friendly interactive elements",
    ],
  },
  ANIMATIONS: {
    version: "1.5.0",
    date: "2023-08-15",
    features: ["Smooth transitions", "Scroll-based animations", "Hover effects", "Loading states"],
  },
  INTERACTIVITY: {
    version: "1.6.0",
    date: "2023-09-01",
    features: ["Tabbed interface", "Video modal", "Interactive image", "Progress tracking"],
  },
  ACCESSIBILITY: {
    version: "1.7.0",
    date: "2023-09-15",
    features: ["ARIA labels", "Keyboard navigation", "Screen reader support", "Sufficient color contrast"],
  },
  PERFORMANCE: {
    version: "1.8.0",
    date: "2023-10-01",
    features: ["Optimized animations", "Lazy loading", "Code splitting", "Reduced bundle size"],
  },
  FINAL_POLISH: {
    version: "2.0.0",
    date: "2023-10-15",
    features: ["Micro-interactions", "Visual refinements", "Content improvements", "Final QA and testing"],
  },
}

// Current iteration being implemented
const CURRENT_ITERATION = "FINAL_POLISH"

// Helper function to check if an iteration is implemented
const isImplemented = (iteration: string) => {
  const iterations = Object.keys(ITERATIONS)
  const currentIndex = iterations.indexOf(CURRENT_ITERATION)
  const iterationIndex = iterations.indexOf(iteration)
  return iterationIndex <= currentIndex
}

// Component to display iteration information (for development purposes)
const IterationInfo = ({ showDetails = false }) => {
  if (!showDetails) return null

  return (
    <div className="fixed top-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
      <h3 className="font-bold text-sm mb-2">Current Iteration: {CURRENT_ITERATION}</h3>
      <p className="text-xs text-gray-500 mb-2">Version: {ITERATIONS[CURRENT_ITERATION].version}</p>
      <div className="text-xs">
        <strong>Features:</strong>
        <ul className="list-disc pl-4 mt-1">
          {ITERATIONS[CURRENT_ITERATION].features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export function MetaphoricalJourneySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeTab, setActiveTab] = useState(0)
  const [showVideo, setShowVideo] = useState(false)
  const [currentProgress, setCurrentProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [showIterationInfo, setShowIterationInfo] = useState(false)
  const [activeView, setActiveView] = useState("journey")
  const [hasInteracted, setHasInteracted] = useState(false)

  // Mouse parallax effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    if (windowSize.width > 0) {
      mouseX.set(mousePosition.x / windowSize.width)
      mouseY.set(mousePosition.y / windowSize.height)
    }
  }, [mousePosition, windowSize, mouseX, mouseY])

  const rotateX = useTransform(mouseY, [0, 1], [2, -2])
  const rotateY = useTransform(mouseX, [0, 1], [-2, 2])
  const translateX = useTransform(mouseX, [0, 1], [-5, 5])
  const translateY = useTransform(mouseY, [0, 1], [-5, 5])

  // Simulate progress loading
  useEffect(() => {
    if (isInView && currentProgress < 100) {
      const timer = setTimeout(() => {
        setCurrentProgress((prev) => {
          const next = prev + 1
          return next > 100 ? 100 : next
        })
      }, 50)
      return () => clearTimeout(timer)
    }
  }, [isInView, currentProgress])

  // Toggle iteration info with keyboard shortcut (Ctrl+Shift+I)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "I") {
        e.preventDefault()
        setShowIterationInfo((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  const transformationSteps = [
    {
      title: "Awareness",
      description:
        "Recognize the limitations of traditional approaches and become aware of AI's transformative potential.",
      icon: <Lightbulb className="h-5 w-5" />,
      color: "from-amber-500 to-orange-500",
      stats: { completion: 85, students: 2450, rating: 4.8 },
    },
    {
      title: "Unlearning",
      description: "Shed outdated mental models and preconceptions about what's possible with technology.",
      icon: <Brain className="h-5 w-5" />,
      color: "from-blue-500 to-indigo-500",
      stats: { completion: 78, students: 2100, rating: 4.7 },
    },
    {
      title: "Exploration",
      description: "Venture into new territories of AI capabilities and applications with guided expertise.",
      icon: <Zap className="h-5 w-5" />,
      color: "from-purple-500 to-violet-500",
      stats: { completion: 72, students: 1850, rating: 4.9 },
    },
    {
      title: "Mastery",
      description: "Emerge with powerful new skills and the ability to harness AI for creative and practical purposes.",
      icon: <Star className="h-5 w-5" />,
      color: "from-emerald-500 to-teal-500",
      stats: { completion: 68, students: 1650, rating: 4.9 },
    },
  ]

  const resources = [
    { title: "Transformation Guide", type: "PDF", size: "2.4 MB", icon: <Download className="h-4 w-4" /> },
    { title: "Case Studies", type: "ZIP", size: "8.7 MB", icon: <Download className="h-4 w-4" /> },
    { title: "Video Tutorials", type: "MP4", size: "245 MB", icon: <Play className="h-4 w-4" /> },
    { title: "Research Papers", type: "PDF", size: "5.2 MB", icon: <ExternalLink className="h-4 w-4" /> },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 15, duration: 0.6 },
    },
  }

  return (
    <section
      ref={ref}
      className="py-24 md:py-32 relative overflow-hidden"
      id="journey"
      aria-label="Transformation Journey Section"
    >
      {/* Development-only iteration info */}
      <IterationInfo showDetails={showIterationInfo} />

      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950"></div>
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Animated gradient orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        />

        {/* Animated lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(139, 92, 246, 0.5)" />
              <stop offset="50%" stopColor="rgba(59, 130, 246, 0.5)" />
              <stop offset="100%" stopColor="rgba(139, 92, 246, 0.5)" />
            </linearGradient>
          </defs>
          <motion.path
            key="animated-path-1"
            d="M0,100 C150,200 350,0 500,100 C650,200 850,0 1000,100"
            stroke="url(#lineGradient)"
            strokeWidth="0.5"
            fill="none"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: isInView ? 0.3 : 0,
            }}
            transition={{
              duration: 2.5,
              ease: "easeInOut",
              delay: 0.3,
            }}
          />
        </svg>
      </div>

      <motion.div
        className="container px-4 sm:px-6 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Badge className="mb-4 px-3 py-1.5 bg-gradient-to-r from-purple-500 to-blue-500 text-white border-none">
            <Sparkles className="mr-2 h-3.5 w-3.5" /> Transformation Journey
          </Badge>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 text-white bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-100 to-blue-100">
            Unravel the Mysteries of AI
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            Like shedding old limitations, embrace the transformative power of AI knowledge to evolve your capabilities.
          </p>

          {/* View selector tabs */}
          <div className="mt-8 inline-flex bg-white/5 backdrop-blur-sm p-1 rounded-full">
            {["journey", "resources", "testimonials"].map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeView === view ? "bg-white/10 text-white" : "text-white/60 hover:text-white/80"
                }`}
              >
                {view.charAt(0).toUpperCase() + view.slice(1)}
              </button>
            ))}
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            {activeView === "journey" && (
              <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                <motion.div
                  variants={itemVariants}
                  className="relative order-2 lg:order-1"
                  style={{
                    perspective: 1000,
                  }}
                >
                  {/* Enhanced image presentation with 3D effect */}
                  <motion.div
                    className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-blue-600 to-violet-600 rounded-lg blur opacity-30 group-hover:opacity-40 transition duration-1000 group-hover:duration-200 animate-gradient-x"
                    style={{
                      rotateX,
                      rotateY,
                    }}
                  />
                  <motion.div
                    className="relative aspect-square overflow-hidden rounded-lg group"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    style={{
                      rotateX,
                      rotateY,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    <div className="absolute inset-0 bg-black/50 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20"
                        onClick={() => {
                          setShowVideo(true)
                          setHasInteracted(true)
                        }}
                      >
                        <Play className="h-6 w-6 text-white" />
                        <span className="sr-only">Watch transformation video</span>
                      </Button>
                    </div>
                    <Image
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AKSns6o5ehtPZ5GMHrIBn41qJk7YXw.png"
                      alt="Transformation metaphor"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent"></div>

                    {/* Interactive hotspots */}
                    {isImplemented("INTERACTIVITY") && (
                      <>
                        {[
                          { top: "20%", left: "20%", label: "Awareness", color: "bg-amber-500" },
                          { top: "40%", left: "70%", label: "Unlearning", color: "bg-blue-500" },
                          { top: "70%", left: "30%", label: "Exploration", color: "bg-purple-500" },
                        ].map((spot, index) => (
                          <TooltipProvider key={index}>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <motion.div
                                  className={`absolute w-3 h-3 ${spot.color} rounded-full cursor-pointer z-20`}
                                  style={{ top: spot.top, left: spot.left }}
                                  whileHover={{ scale: 1.5 }}
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.7, 1, 0.7],
                                  }}
                                  transition={{
                                    duration: 2,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                  }}
                                  onClick={() => {
                                    setActiveTab(index)
                                    setHasInteracted(true)
                                  }}
                                />
                              </TooltipTrigger>
                              <TooltipContent side="top" className="bg-gray-900 text-white border-gray-800">
                                <p>{spot.label} Phase</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        ))}
                      </>
                    )}
                  </motion.div>

                  {/* Floating quote with enhanced styling */}
                  <motion.div
                    className="absolute -bottom-6 -right-6 md:bottom-8 md:right-8 max-w-xs bg-black/80 backdrop-blur-md p-4 rounded-lg border border-white/10 shadow-xl transform rotate-2 hidden md:block"
                    initial={{ opacity: 0, y: 20, rotate: 5 }}
                    animate={{ opacity: 1, y: 0, rotate: 2 }}
                    transition={{ delay: 0.5, duration: 0.8, type: "spring" }}
                    style={{
                      boxShadow: "0 0 30px rgba(139, 92, 246, 0.2)",
                    }}
                  >
                    <p className="text-white/90 text-sm italic">
                      "The snake sheds its skin to grow, just as we must shed our limitations to evolve."
                    </p>
                    <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-blue-500 mt-2"></div>
                  </motion.div>

                  {/* Progress indicator */}
                  {isImplemented("INTERACTIVITY") && (
                    <div className="absolute -bottom-10 left-0 right-0 flex items-center gap-3">
                      <div className="text-xs text-white/60">Progress</div>
                      <div className="flex-1">
                        <Progress
                          value={currentProgress}
                          className="h-1.5 bg-white/10"
                          indicatorClassName="bg-gradient-to-r from-purple-500 to-blue-500"
                        />
                      </div>
                      <div className="text-xs font-medium text-white">{currentProgress}%</div>
                    </div>
                  )}
                </motion.div>

                <motion.div variants={itemVariants} className="space-y-8 text-white order-1 lg:order-2">
                  <h3 className="text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                    Break Free From Limitations
                  </h3>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    Just as a snake sheds its skin to grow, our course helps you shed outdated knowledge and embrace new
                    capabilities. The journey of mastering AI is one of continuous transformation and evolution.
                  </p>

                  {/* Interactive tabs for transformation steps */}
                  <div className="space-y-6">
                    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
                      {transformationSteps.map((step, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setActiveTab(index)
                            setHasInteracted(true)
                          }}
                          className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                            activeTab === index
                              ? `bg-gradient-to-r ${step.color} text-white`
                              : "bg-white/10 text-white/70 hover:bg-white/20"
                          }`}
                        >
                          <span className="mr-2 inline-flex">{step.icon}</span>
                          {step.title}
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
                      >
                        <h4 className="text-xl font-semibold mb-2 flex items-center">
                          <span className="inline-flex mr-2">{transformationSteps[activeTab].icon}</span>
                          <span>{transformationSteps[activeTab].title}</span>
                        </h4>
                        <p className="text-gray-300 mb-4">{transformationSteps[activeTab].description}</p>

                        {/* Stats for current step */}
                        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              {transformationSteps[activeTab].stats.completion}%
                            </div>
                            <div className="text-xs text-gray-400">Completion</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              {transformationSteps[activeTab].stats.students.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-400">Students</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">
                              {transformationSteps[activeTab].stats.rating}
                            </div>
                            <div className="text-xs text-gray-400">Rating</div>
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="pt-4">
                    <Button
                      asChild
                      className="group bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white border-none shadow-lg shadow-purple-900/20"
                      onClick={() => setHasInteracted(true)}
                    >
                      <Link href="#enroll">
                        Begin Your Transformation
                        <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                    <p className="text-gray-400 text-sm mt-3">
                      Join 2,500+ professionals who have already transformed their careers
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {activeView === "resources" && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Transformation Resources</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {resources.map((resource, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-4 hover:bg-white/10 transition-colors group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-white/10 text-white">{resource.icon}</div>
                        <div>
                          <h4 className="font-medium text-white mb-1">{resource.title}</h4>
                          <div className="flex items-center gap-3 text-sm text-gray-400">
                            <span>{resource.type}</span>
                            <span>•</span>
                            <span>{resource.size}</span>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-auto rounded-full h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
                          onClick={() => setHasInteracted(true)}
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download {resource.title}</span>
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-full bg-amber-500/20 text-amber-400">
                      <Info className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white text-sm mb-1">Premium Resources</h4>
                      <p className="text-sm text-gray-400">
                        Access our complete library of transformation resources when you enroll in the course.
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-auto whitespace-nowrap text-white border-white/20 hover:bg-white/10"
                      onClick={() => setHasInteracted(true)}
                    >
                      View All
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {activeView === "testimonials" && (
              <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-6">Transformation Stories</h3>

                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      name: "Sarah K.",
                      role: "AI Product Manager",
                      company: "TechVision",
                      image: "/placeholder.svg?height=80&width=80",
                      quote:
                        "The transformation journey completely changed how I approach product development. The metaphorical framework helped me understand complex AI concepts in an intuitive way.",
                      before: "Junior Product Analyst",
                      after: "AI Product Manager",
                      improvement: "+65% salary increase",
                    },
                    {
                      name: "Michael R.",
                      role: "ML Engineer",
                      company: "DataSphere",
                      image: "/placeholder.svg?height=80&width=80",
                      quote:
                        "Shedding my old mental models about AI was challenging but incredibly rewarding. This course provided the perfect structure to guide that transformation.",
                      before: "Software Developer",
                      after: "ML Engineer",
                      improvement: "3 promotions in 18 months",
                    },
                  ].map((testimonial, index) => (
                    <motion.div
                      key={index}
                      className="bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 p-5 hover:bg-white/10 transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden border-2 border-white/20">
                          <Image
                            src={testimonial.image || "/placeholder.svg"}
                            alt={testimonial.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{testimonial.name}</h4>
                          <p className="text-sm text-gray-400">
                            {testimonial.role}, {testimonial.company}
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-300 italic mb-4 text-sm">"{testimonial.quote}"</p>

                      <div className="flex items-center justify-between text-sm border-t border-white/10 pt-4">
                        <div>
                          <div className="text-gray-400">Before</div>
                          <div className="text-white">{testimonial.before}</div>
                        </div>
                        <div className="text-center">
                          <div className="text-gray-400">After</div>
                          <div className="text-white">{testimonial.after}</div>
                        </div>
                        <div className="text-right">
                          <div className="text-gray-400">Result</div>
                          <div className="text-emerald-400">{testimonial.improvement}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 text-center">
                  <Button
                    variant="outline"
                    className="text-white border-white/20 hover:bg-white/10"
                    onClick={() => setHasInteracted(true)}
                  >
                    View All Transformation Stories
                  </Button>
                </div>
              </div>
            )}

            {/* Add Lead Magnet for Retargeting */}
            <motion.div
              variants={itemVariants}
              className="mt-16 max-w-md mx-auto"
            >
              <LeadCaptureForm
                title="Free: AI Career Roadmap" 
                description="Get our 10-page playbook used by 2,500+ graduates to land top tech roles"
                actionLabel="Download Free Career Guide"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Stats section */}
        <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20 text-center">
          {[
            { value: "94%", label: "Report career advancement", icon: <TrendingUp className="h-5 w-5" /> },
            { value: "4.8/5", label: "Student satisfaction", icon: <Star className="h-5 w-5" /> },
            { value: "3x", label: "Average skill growth", icon: <Zap className="h-5 w-5" /> },
            { value: "6 weeks", label: "Average time to mastery", icon: <CheckCircle className="h-5 w-5" /> },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10"
              whileHover={{ y: -5, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded-full bg-white/10 text-white">{stat.icon}</div>
              </div>
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Engagement prompt - only shows if user hasn't interacted */}
        <AnimatePresence>
          {!hasInteracted && isInView && (
            <motion.div
              className="fixed bottom-24 right-6 bg-white/10 backdrop-blur-md rounded-lg p-4 border border-white/20 shadow-xl max-w-xs z-40"
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ delay: 3, duration: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                  <Info className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm mb-1">Explore the Journey</h4>
                  <p className="text-xs text-gray-300 mb-3">
                    Click on the transformation steps or hotspots to learn more about your AI journey.
                  </p>
                  <Button
                    size="sm"
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white"
                    onClick={() => setHasInteracted(true)}
                  >
                    Got it
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Video modal with enhanced styling */}
      <AnimatePresence>
        {showVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full aspect-video"
            >
              <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black/50 to-transparent z-10 flex items-center justify-between px-4">
                <h3 className="text-white font-medium">Transformation Journey</h3>
                <button
                  onClick={() => setShowVideo(false)}
                  className="bg-white/10 text-white p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close video"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <div className="text-center p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/10 mb-4">
                    <Play className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Transformation Journey Video</h3>
                  <p className="text-gray-400">
                    This video would showcase the complete transformation journey from awareness to mastery.
                  </p>
                </div>
              </div>

              {/* Video controls */}
              <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-black/50 to-transparent z-10 flex items-center px-4">
                <div className="flex-1 mx-4">
                  <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="text-white text-sm">1:24 / 4:12</div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}

