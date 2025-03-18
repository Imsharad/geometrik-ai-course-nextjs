"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote, Star, TrendingUp, Award, Clock, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { studentImages } from "@/components/student-images"

interface TestimonialMetric {
  icon: React.ReactNode
  label: string
  value: string
  color?: string
}

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  quote: string
  rating: number
  metrics: TestimonialMetric[]
  tags: string[]
  featured?: boolean
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Jennifer K.",
    role: "Senior Developer",
    company: "EnterpriseX",
    image: studentImages.jennifer || "https://thispersondoesnotexist.com/?img=1",
    quote:
      "Dr. Johnson's teaching style made complex concepts understandable and practical. The way they break down advanced topics and relate them to real-world scenarios helped me implement solutions that increased our system performance by 40%. Their mentorship has been invaluable to my career growth.",
    rating: 5,
    metrics: [
      {
        icon: <TrendingUp className="h-4 w-4" />,
        label: "Performance Improvement",
        value: "40%",
        color: "from-blue-500 to-cyan-400",
      },
      {
        icon: <Award className="h-4 w-4" />,
        label: "Promotion Timeline",
        value: "6 months",
        color: "from-emerald-500 to-teal-400",
      },
    ],
    tags: ["System Performance", "Career Growth", "Mentorship"],
    featured: true,
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "CTO",
    company: "StartupFusion",
    image: studentImages.marcus || "https://thispersondoesnotexist.com/?img=2",
    quote:
      "Beyond just theory, Dr. Johnson provides insights from their extensive industry experience that you can't find in textbooks. Their guidance helped me transform our company's approach to development and scale our operations effectively. This course has the perfect balance of theory and practical application.",
    rating: 5,
    metrics: [
      {
        icon: <TrendingUp className="h-4 w-4" />,
        label: "Business Growth",
        value: "3x",
        color: "from-purple-500 to-indigo-400",
      },
      {
        icon: <Clock className="h-4 w-4" />,
        label: "Implementation Time",
        value: "4 months",
        color: "from-amber-500 to-orange-400",
      },
    ],
    tags: ["Scaling Operations", "Industry Insights", "Leadership"],
    featured: true,
  },
  {
    id: 3,
    name: "Sophia R.",
    role: "Product Manager",
    company: "InnovateTech",
    image: studentImages.sophia || "https://thispersondoesnotexist.com/?img=3",
    quote:
      "The strategic frameworks taught in this course revolutionized how I approach product development. Within months of applying these techniques, our user engagement increased by 52% and our feature adoption rate doubled. The ROI on this course has been exceptional.",
    rating: 5,
    metrics: [
      {
        icon: <TrendingUp className="h-4 w-4" />,
        label: "User Engagement",
        value: "+52%",
        color: "from-rose-500 to-pink-400",
      },
      {
        icon: <MessageSquare className="h-4 w-4" />,
        label: "Feature Adoption",
        value: "2x",
        color: "from-amber-500 to-yellow-400",
      },
    ],
    tags: ["Product Strategy", "User Engagement", "ROI"],
    featured: false,
  },
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Mouse parallax effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return

    const { left, top, width, height } = containerRef.current.getBoundingClientRect()
    const x = (e.clientX - left) / width - 0.5
    const y = (e.clientY - top) / height - 0.5

    setMousePosition({ x, y })
  }

  const rotateX = useTransform(useMotionValue(mousePosition.y), [-0.5, 0.5], [1, -1])

  const rotateY = useTransform(useMotionValue(mousePosition.x), [-0.5, 0.5], [-1, 1])

  const translateX = useTransform(useMotionValue(mousePosition.x), [-0.5, 0.5], [-5, 5])

  const translateY = useTransform(useMotionValue(mousePosition.y), [-0.5, 0.5], [-5, 5])

  const goToNext = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Auto-advance slides
  useEffect(() => {
    if (isHovering) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    intervalRef.current = setInterval(goToNext, 8000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isHovering])

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section
      className="py-24 relative overflow-hidden"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gray-50 via-white to-gray-50" />

      {/* Subtle pattern */}
      <div className="absolute inset-0 -z-10 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0yLTJoMXYxaC0xdi0xem0tMiAyaC0xdjFoMXYtMXptLTItMmgxdjFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMi0yaDEiLz48L2c+PC9nPjwvc3ZnPg==')]" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 opacity-10 blur-3xl -z-10"
        style={{ x: translateX, y: translateY }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-400 opacity-10 blur-3xl -z-10"
        style={{
          x: useTransform(useMotionValue(mousePosition.x), [-0.5, 0.5], [5, -5]),
          y: useTransform(useMotionValue(mousePosition.y), [-0.5, 0.5], [5, -5]),
        }}
      />

      <div className="container px-4 max-w-6xl mx-auto">
        <div className="flex items-center mb-12">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent to-gray-200"></div>
          <h2 className="text-3xl font-bold px-6 flex items-center gap-2">
            <MessageSquare className="h-6 w-6 text-blue-500" />
            Featured Student Testimonials
          </h2>
          <div className="h-px flex-grow bg-gradient-to-l from-transparent to-gray-200"></div>
        </div>

        <div ref={containerRef} className="relative overflow-hidden rounded-2xl border shadow-sm bg-white">
          {/* Navigation buttons */}
          <Button
            onClick={goToPrev}
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <Button
            onClick={goToNext}
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-white/80 backdrop-blur-sm shadow-sm border border-gray-100 hover:bg-white hover:shadow-md transition-all duration-300"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          {/* Testimonial content */}
          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial.id}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                style={{
                  perspective: 1000,
                  transformStyle: "preserve-3d",
                }}
              >
                {/* Left column - Avatar and info */}
                <motion.div
                  className="md:col-span-3 flex flex-col items-center md:items-start"
                  style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                  }}
                >
                  <div className="relative mb-4 group">
                    <div className="absolute -top-2 -left-4 text-5xl text-gray-200 font-serif z-10">
                      <Quote />
                    </div>

                    <div className="relative">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 opacity-20 blur-md group-hover:opacity-30 transition-opacity duration-300" />

                      <Avatar className="h-24 w-24 border-4 border-white shadow-md relative z-10">
                        <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.name} />
                        <AvatarFallback>{currentTestimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      {/* Decorative elements */}
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 z-0"
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                        }}
                      />
                    </div>
                  </div>

                  <h3 className="font-bold text-lg text-gray-900">{currentTestimonial.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {currentTestimonial.role}, <span className="text-blue-600">{currentTestimonial.company}</span>
                  </p>

                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < currentTestimonial.rating ? "text-amber-400 fill-amber-400" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Metrics */}
                  <div className="space-y-3 w-full">
                    {currentTestimonial.metrics.map((metric, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2 rounded-lg bg-gray-50 border border-gray-100 hover:shadow-sm transition-shadow"
                      >
                        <div
                          className={`w-8 h-8 rounded-full bg-gradient-to-br ${metric.color} flex items-center justify-center text-white`}
                        >
                          {metric.icon}
                        </div>
                        <div className="flex-1">
                          <div className="text-xs text-gray-500">{metric.label}:</div>
                          <div className="font-bold text-gray-900">{metric.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Right column - Quote and tags */}
                <motion.div
                  className="md:col-span-9 relative"
                  style={{
                    rotateX: useTransform(rotateX, (v) => v * 0.5),
                    rotateY: useTransform(rotateY, (v) => v * 0.5),
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* Decorative quote marks */}
                  <div className="absolute top-0 left-0 text-9xl text-gray-100 font-serif -z-10 -mt-8 -ml-4 opacity-80">
                    "
                  </div>
                  <div className="absolute bottom-0 right-0 text-9xl text-gray-100 font-serif -z-10 -mb-32 -mr-4 opacity-80 transform rotate-180">
                    "
                  </div>

                  <div className="relative z-10">
                    <p className="text-lg md:text-xl text-gray-700 italic leading-relaxed mb-8">
                      "{currentTestimonial.quote}"
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {currentTestimonial.tags.map((tag, idx) => (
                        <Badge
                          key={idx}
                          variant="secondary"
                          className="rounded-full px-3 py-1 bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Decorative line */}
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-6" />
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Pagination dots */}
          <div className="flex justify-center gap-2 pb-6">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  idx === currentIndex
                    ? "w-8 bg-gradient-to-r from-blue-500 to-purple-500"
                    : "bg-gray-300 hover:bg-gray-400",
                )}
                aria-label={`Go to testimonial ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

