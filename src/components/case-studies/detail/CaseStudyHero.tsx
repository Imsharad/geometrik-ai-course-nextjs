"use client"

import { useState, useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Users, Calendar, Clock, Sparkles } from "lucide-react"
import type { CaseStudy } from "@/lib/case-studies"
import { getDomainClasses } from "./constants"

interface CaseStudyHeroProps {
  caseStudy: CaseStudy
}

export function CaseStudyHero({ caseStudy }: CaseStudyHeroProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax effect for hero image
  const heroImageY = useTransform(scrollY, [0, 500], [0, 120])
  const springImageY = useSpring(heroImageY, { damping: 15, stiffness: 100 })

  // Get the appropriate color classes for the domain
  const domainClasses = getDomainClasses(caseStudy.domain)

  return (
    <div className="relative" ref={heroRef}>
      <div className="relative h-[65vh] min-h-[500px] w-full overflow-hidden">
        {/* Background image with enhanced overlay and parallax */}
        <motion.div
          style={{ y: springImageY }}
          className="absolute inset-0 h-[120%] -top-[10%] w-full"
        >
          <Image
            src={caseStudy.image || "/placeholder.svg?height=600&width=1200&query=abstract technology background"}
            alt={caseStudy.title}
            fill
            className={`object-cover transition-opacity duration-1000 ${imageLoaded ? "opacity-100" : "opacity-0"}`}
            onLoadingComplete={() => setImageLoaded(true)}
            priority
          />
        </motion.div>

        {/* Enhanced gradient overlay with subtle pattern */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.04] mix-blend-soft-light" />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/10 to-transparent opacity-70"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="container max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-3xl"
            >
              <div className="flex gap-3 items-center mb-6">
                {caseStudy.featured && (
                  <Badge
                    className="bg-primary/95 text-primary-foreground backdrop-blur-md font-semibold px-3.5 py-1.5 shadow-md flex items-center gap-1.5 border border-primary/40 text-xs rounded-md"
                  >
                    <Sparkles className="mr-1 h-3.5 w-3.5" />
                    Featured Case Study
                  </Badge>
                )}
                
                <Badge className={`${domainClasses.badge} px-3.5 py-1.5 backdrop-blur-sm text-xs rounded-md shadow-sm border border-white/10`}>
                  {caseStudy.domain}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tighter">
                {caseStudy.title}
              </h1>

              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl leading-relaxed">
                {caseStudy.summary}
              </p>

              <div className="flex flex-wrap gap-3 text-sm text-white/80 mb-2">
                <motion.div 
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3.5 py-2 shadow-sm border border-white/10"
                >
                  <Users className="mr-2 h-4 w-4 text-white/70" />
                  {caseStudy.student}
                </motion.div>
                <motion.div 
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3.5 py-2 shadow-sm border border-white/10"
                >
                  <Calendar className="mr-2 h-4 w-4 text-white/70" />
                  Cohort {caseStudy.cohort}
                </motion.div>
                <motion.div 
                  whileHover={{ y: -3, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3.5 py-2 shadow-sm border border-white/10"
                >
                  <Clock className="mr-2 h-4 w-4 text-white/70" />
                  {caseStudy.readTime || "5 min read"}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 