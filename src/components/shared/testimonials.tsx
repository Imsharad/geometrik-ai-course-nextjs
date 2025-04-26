"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, MessageSquare, Star } from "lucide-react"
import { cn } from "@/lib/utils"

export interface TestimonialMetric {
  icon: React.ReactNode
  label: string
  value: string
}

export interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  image: string
  quote: string
  rating?: number
  metrics?: TestimonialMetric[]
  tags?: string[]
  featured?: boolean
}

interface TestimonialsProps {
  testimonials: Testimonial[]
  title?: string
  subtitle?: string
  variant?: "carousel" | "grid" | "simple"
  className?: string
}

// Update the example testimonials in the shared component
// This is just an example update - the actual testimonials will be passed as props
const exampleTestimonials = [
  {
    id: 1,
    name: "Jennifer K.",
    role: "Senior Developer",
    company: "EnterpriseX",
    image:
      "https://sjc.microlink.io/oeea5MBHysQn7-jgqn2gA9vyt72f9rLLGeXet61DYNyzV1p3JYZmWbstC2ASSyAEoU7yicl3e87fDtk2C5vpZQ.jpeg",
    quote:
      "Dr. Johnson's teaching style made complex concepts understandable and practical. The way they break down advanced topics and relate them to real-world scenarios helped me implement solutions that increased our system performance by 40%.",
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "CTO",
    company: "StartupFusion",
    image: "https://cdn.midjourney.com/10579840-a472-4a8a-bf81-4a21d5b4b184/0_0.png",
    quote:
      "Beyond just theory, Dr. Johnson provides insights from their extensive industry experience that you can't find in textbooks. Their guidance helped me transform our company's approach to development.",
    rating: 5,
  },
]

export function Testimonials({
  testimonials,
  title = "Student Testimonials",
  subtitle,
  variant = "carousel",
  className,
}: TestimonialsProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

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

  // Auto-advance slides for carousel
  useEffect(() => {
    if (variant === "carousel") {
      intervalRef.current = setInterval(goToNext, 8000)
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current)
      }
    }
  }, [variant])

  const currentTestimonial = testimonials[currentIndex]

  if (variant === "simple") {
    return (
      <div className={cn("space-y-6", className)}>
        {title && <h3 className="text-2xl font-bold tracking-tight mb-6 text-center">{title}</h3>}
        {subtitle && <p className="text-muted-foreground text-center mb-8">{subtitle}</p>}

        <div className="grid gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6 bg-card border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
              <p className="italic text-muted-foreground mb-3">"{testimonial.quote}"</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (variant === "grid") {
    return (
      <div className={cn("", className)}>
        {title && <h3 className="text-2xl font-bold tracking-tight mb-6 text-center">{title}</h3>}
        {subtitle && <p className="text-muted-foreground text-center mb-8">{subtitle}</p>}

        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-6 bg-card border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="h-12 w-12 border-2 border-primary/20">
                  <AvatarImage src={testimonial.image} alt={testimonial.name} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </p>
                  {testimonial.rating && (
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < testimonial.rating! ? "text-amber-400 fill-amber-400" : "text-muted"}`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <p className="italic text-muted-foreground mb-3">"{testimonial.quote}"</p>

              {testimonial.metrics && testimonial.metrics.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  {testimonial.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 bg-muted/50 rounded-lg">
                      <div className="text-primary">{metric.icon}</div>
                      <div>
                        <div className="text-xs text-muted-foreground">{metric.label}</div>
                        <div className="font-bold">{metric.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {testimonial.tags && testimonial.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {testimonial.tags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="rounded-full">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  }

  // Default carousel view
  return (
    <div className={cn("", className)}>
      {title && (
        <h3 className="text-2xl font-bold tracking-tight mb-6 flex items-center">
          <MessageSquare className="h-5 w-5 mr-2 text-primary" />
          {title}
        </h3>
      )}
      {subtitle && <p className="text-muted-foreground mb-8">{subtitle}</p>}

      <div className="relative overflow-hidden rounded-xl border">
        {/* Navigation buttons */}
        <Button
          onClick={goToPrev}
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <Button
          onClick={goToNext}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 rounded-full bg-background/80 backdrop-blur-sm"
          aria-label="Next testimonial"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>

        {/* Testimonial content */}
        <div className="p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left column - Avatar and info */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentTestimonial.id}-left`}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.4 }}
                className="md:col-span-3 flex flex-col items-center md:items-start"
              >
                <div className="relative mb-4">
                  <div className="absolute -top-2 -left-4 text-4xl text-gray-200 font-serif">"</div>
                  <Avatar className="h-24 w-24 border-4 border-background">
                    <AvatarImage src={currentTestimonial.image} alt={currentTestimonial.name} />
                    <AvatarFallback>{currentTestimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                </div>

                <h3 className="font-bold text-lg">{currentTestimonial.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </p>

                {currentTestimonial.rating && (
                  <div className="flex mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < currentTestimonial.rating! ? "text-amber-400 fill-amber-400" : "text-muted"}`}
                      />
                    ))}
                  </div>
                )}

                {/* Metrics */}
                {currentTestimonial.metrics && (
                  <div className="space-y-3 w-full">
                    {currentTestimonial.metrics.map((metric, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                          {metric.icon}
                        </div>
                        <div className="flex-1">
                          <span className="text-muted-foreground">{metric.label}:</span>
                        </div>
                        <span className="font-bold">{metric.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Right column - Quote and tags */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentTestimonial.id}-right`}
                initial={{ opacity: 0, x: direction * 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -20 }}
                transition={{ duration: 0.4 }}
                className="md:col-span-9"
              >
                <p className="text-lg md:text-xl italic text-muted-foreground mb-8 leading-relaxed">
                  "{currentTestimonial.quote}"
                </p>

                {currentTestimonial.tags && currentTestimonial.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {currentTestimonial.tags.map((tag, idx) => (
                      <Badge key={idx} variant="secondary" className="rounded-full px-3 py-1">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Pagination dots */}
        <div className="flex justify-center gap-2 pb-6">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={cn(
                "w-2 h-2 rounded-full transition-all",
                idx === currentIndex ? "w-6 bg-primary" : "bg-muted hover:bg-primary/50",
              )}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

