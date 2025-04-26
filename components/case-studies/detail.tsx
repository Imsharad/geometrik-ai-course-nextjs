"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  ChevronRight,
  Clock,
  Download,
  Lightbulb,
  Share2,
  TrendingUp,
  Users,
  Award,
  Zap,
  BarChart4,
  Box,
  Code2,
  Sparkles,
} from "lucide-react"
import type { CaseStudy, CaseStudySummary } from "@/lib/case-studies"
import { cn } from "@/lib/utils"
import { PlaceholderImage } from "@/components/shared/placeholder-image"

interface SimplifiedCaseStudyDetailProps {
  caseStudy: CaseStudy
  navigation: {
    prev: CaseStudySummary | null
    next: CaseStudySummary | null
  }
}

// Domain color mapping to actual tailwind classes
const domainBadgeClasses: Record<string, string> = {
  Healthcare: "bg-blue-600 hover:bg-blue-700",
  Manufacturing: "bg-amber-600 hover:bg-amber-700",
  Finance: "bg-emerald-600 hover:bg-emerald-700",
  Retail: "bg-purple-600 hover:bg-purple-700",
  Education: "bg-pink-600 hover:bg-pink-700",
  "Customer Service": "bg-indigo-600 hover:bg-indigo-700",
  Logistics: "bg-cyan-600 hover:bg-cyan-700",
  Security: "bg-red-600 hover:bg-red-700",
  // Default
  default: "bg-slate-600 hover:bg-slate-700",
}

const domainIconBgClasses: Record<string, string> = {
  Healthcare: "bg-blue-100 text-blue-700",
  Manufacturing: "bg-amber-100 text-amber-700",
  Finance: "bg-emerald-100 text-emerald-700",
  Retail: "bg-purple-100 text-purple-700",
  Education: "bg-pink-100 text-pink-700",
  "Customer Service": "bg-indigo-100 text-indigo-700",
  Logistics: "bg-cyan-100 text-cyan-700",
  Security: "bg-red-100 text-red-700",
  // Default
  default: "bg-slate-100 text-slate-700",
}

const domainButtonClasses: Record<string, string> = {
  Healthcare: "bg-blue-600 hover:bg-blue-700",
  Manufacturing: "bg-amber-600 hover:bg-amber-700",
  Finance: "bg-emerald-600 hover:bg-emerald-700",
  Retail: "bg-purple-600 hover:bg-purple-700",
  Education: "bg-pink-600 hover:bg-pink-700",
  "Customer Service": "bg-indigo-600 hover:bg-indigo-700",
  Logistics: "bg-cyan-600 hover:bg-cyan-700",
  Security: "bg-red-600 hover:bg-red-700",
  // Default
  default: "bg-slate-600 hover:bg-slate-700",
}

const domainAccentClasses: Record<string, string> = {
  Healthcare: "bg-blue-600",
  Manufacturing: "bg-amber-600",
  Finance: "bg-emerald-600",
  Retail: "bg-purple-600",
  Education: "bg-pink-600",
  "Customer Service": "bg-indigo-600",
  Logistics: "bg-cyan-600",
  Security: "bg-red-600",
  // Default
  default: "bg-slate-600",
}

// Domain gradients for section backgrounds
const domainGradients: Record<string, string> = {
  Healthcare: "from-blue-400/10 to-cyan-400/10 border-blue-300/30",
  Manufacturing: "from-orange-400/10 to-amber-400/10 border-orange-300/30",
  Finance: "from-green-400/10 to-emerald-400/10 border-green-300/30",
  Retail: "from-purple-400/10 to-violet-400/10 border-purple-300/30",
  "Customer Service": "from-indigo-400/10 to-blue-400/10 border-indigo-300/30",
  Education: "from-pink-400/10 to-rose-400/10 border-pink-300/30",
  Security: "from-red-400/10 to-rose-400/10 border-red-300/30",
  Logistics: "from-teal-400/10 to-cyan-400/10 border-teal-300/30",
  default: "from-gray-400/10 to-slate-400/10 border-gray-300/30",
}

export function Detail({ caseStudy, navigation }: SimplifiedCaseStudyDetailProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  
  // Parallax effect for hero image
  const heroImageY = useTransform(scrollY, [0, 500], [0, 120])
  const springImageY = useSpring(heroImageY, { damping: 15, stiffness: 100 })

  // Get the appropriate color classes for the domain
  const badgeClasses = domainBadgeClasses[caseStudy.domain] || domainBadgeClasses.default
  const iconBgClasses = domainIconBgClasses[caseStudy.domain] || domainIconBgClasses.default
  const buttonClasses = domainButtonClasses[caseStudy.domain] || domainButtonClasses.default
  const accentClasses = domainAccentClasses[caseStudy.domain] || domainAccentClasses.default
  const gradientClasses = domainGradients[caseStudy.domain] || domainGradients.default
  
  // Derive text color from accent class for text highlights
  const accentTextClass = accentClasses.replace("bg-", "text-")

  // Styled Section Title component with animated accent
  const SectionTitle = ({ icon, title, className }: { icon?: React.ReactNode, title: string, className?: string }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    
    return (
      <div ref={ref} className={cn("mb-6", className)}>
        <h2 className="text-3xl font-bold tracking-tight flex items-center group">
          {icon && <div className="mr-4">{icon}</div>}
          {title}
        </h2>
        <div className="relative h-1.5 w-24 mt-3 overflow-hidden rounded-full">
          <div className="absolute inset-0 bg-muted/50"></div>
          <motion.div 
            className={`absolute inset-0 ${accentClasses}`}
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : { width: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          ></motion.div>
        </div>
      </div>
    )
  }

  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-24"
    >
      {/* Hero Section with improved gradient overlay, animation and parallax effect */}
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
                  
                  <Badge className={`${badgeClasses} px-3.5 py-1.5 backdrop-blur-sm text-xs rounded-md shadow-sm border border-white/10`}>
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

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 mt-12">
        {/* Breadcrumb with enhanced visual design */}
        <div className="flex justify-between items-center mb-10 border-b border-border/60 pb-5">
          <div className="flex items-center text-sm text-muted-foreground">
            <Link href="/case-studies" className="hover:text-foreground transition-colors font-medium group flex items-center">
              <motion.span 
                whileHover={{ x: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                Case Studies
              </motion.span>
            </Link>
            <ChevronRight className="h-3.5 w-3.5 mx-2 text-muted-foreground/50" />
            <span className="text-foreground/80 font-medium truncate max-w-[280px] md:max-w-md">{caseStudy.title}</span>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1.5 rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:scale-105 transition-all shadow-sm">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs font-medium">PDF</span>
            </Button>
            <Button variant="outline" size="sm" className="gap-1.5 rounded-full border-border/60 hover:border-primary/40 hover:bg-primary/5 hover:scale-105 transition-all shadow-sm">
              <Share2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline text-xs font-medium">Share</span>
            </Button>
          </div>
        </div>

        {/* Two-column layout with improved spacing and layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16 relative">
          {/* Decorative divider between content and sidebar */}
          <div className="absolute top-0 bottom-0 hidden lg:block lg:left-2/3 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent"></div>
          
          {/* Main column */}
          <div className="lg:col-span-8 space-y-16">
            {/* Key Highlights with enhanced styling and animations */}
            {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "p-8 rounded-xl border shadow-sm overflow-hidden relative",
                  "bg-gradient-to-br",
                  gradientClasses
                )}
              >
                <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/[0.02] to-transparent"></div>
                
                <SectionTitle 
                  icon={<Zap className={`h-6 w-6 ${accentTextClass}`} />}
                  title="Key Outcomes" 
                  className="mb-8"
                />
                
                <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
                  {caseStudy.outcomes.map((outcome, index) => (
                    <motion.div 
                      key={index}
                      initial={{ opacity: 0, x: 10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      className="flex items-start group"
                    >
                      <div
                        className={`mr-4 mt-1 h-8 w-8 rounded-full ${iconBgClasses} flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110`}
                      >
                        <div className={`h-2.5 w-2.5 rounded-full ${accentClasses}`}></div>
                      </div>
                      <span className="text-base md:text-lg font-medium leading-snug">{outcome}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Challenge Section with enhanced styling */}
            {caseStudy.challenge && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-8 rounded-xl overflow-hidden border-l-4 border-l-primary/30 bg-primary/[0.02] shadow-sm"
              >
                <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
                
                <SectionTitle 
                  icon={<div className={`p-2.5 ${iconBgClasses} rounded-lg shadow-sm`}>
                    <Lightbulb className="h-6 w-6" />
                  </div>}
                  title="Challenge" 
                />
                
                <div className={cn(
                  "prose prose-lg dark:prose-invert max-w-none",
                  "prose-headings:font-bold prose-headings:tracking-tight",
                  "prose-p:leading-relaxed prose-p:text-muted-foreground/90"
                )}>
                  <p className="text-lg leading-relaxed">{caseStudy.challenge}</p>
                </div>
              </motion.div>
            )}

            {/* Solution Section with enhanced styling */}
            {caseStudy.solution && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative p-8 rounded-xl overflow-hidden border-l-4 border-l-primary/30 bg-accent/30 shadow-sm"
              >
                <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
                
                <SectionTitle 
                  icon={<div className={`p-2.5 ${iconBgClasses} rounded-lg shadow-sm`}>
                    <TrendingUp className="h-6 w-6" />
                  </div>}
                  title="Solution" 
                />
                
                <div className={cn(
                  "prose prose-lg dark:prose-invert max-w-none",
                  "prose-headings:font-bold prose-headings:tracking-tight",
                  "prose-p:leading-relaxed prose-p:text-muted-foreground/90"
                )}>
                  <p className="text-lg leading-relaxed">{caseStudy.solution}</p>
                </div>
              </motion.div>
            )}

            {/* Other Sections with enhanced styling and image galleries */}
            {caseStudy.sections &&
              caseStudy.sections.map((section, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className={cn(
                    "relative p-8 rounded-xl overflow-hidden",
                    index % 2 === 0 ? "bg-card/50" : ""
                  )}
                >
                  {index % 2 === 0 && (
                    <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
                  )}
                  
                  <SectionTitle title={section.title} />
                  
                  <div className={cn(
                    "prose prose-lg dark:prose-invert max-w-none mb-8",
                    "prose-headings:font-bold prose-headings:tracking-tight",
                    "prose-p:leading-relaxed prose-p:text-muted-foreground/90",
                    "prose-blockquote:border-l-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-md",
                    "prose-li:my-1"
                  )}>
                    <p className="text-lg leading-relaxed">{section.content}</p>
                  </div>

                  {section.images && section.images.length > 0 && (
                    <div className="grid gap-6 mt-8 grid-cols-1 md:grid-cols-2">
                      {section.images.map((image, imgIndex) => (
                        <motion.div 
                          key={imgIndex}
                          whileHover={{ y: -5, scale: 1.02, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
                          transition={{ type: "spring", stiffness: 300, damping: 20 }}
                          className="relative h-72 rounded-xl overflow-hidden border shadow-md group"
                        >
                          <Image
                            src={image || `/placeholder.svg?height=300&width=600&query=${encodeURIComponent(section.title || 'AI visualization')}`}
                            alt={`${section.title} illustration ${imgIndex + 1}`}
                            fill
                            className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                            <span className="text-white text-sm font-medium backdrop-blur-sm bg-black/30 px-3 py-1 rounded-full">
                              {section.title} {imgIndex + 1}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}

            {/* Original content rendered from Markdown with styled container */}
            {caseStudy.content && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={cn(
                  "prose prose-lg dark:prose-invert max-w-none",
                  "prose-headings:font-bold prose-headings:tracking-tight",
                  "prose-p:leading-relaxed prose-p:text-muted-foreground/90",
                  "prose-a:text-primary prose-a:no-underline hover:prose-a:underline",
                  "prose-img:rounded-xl prose-img:shadow-md",
                  "prose-blockquote:border-l-primary/50 prose-blockquote:bg-muted/30 prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-md",
                  "prose-code:text-primary prose-code:bg-muted/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm",
                  "prose-li:my-1"
                )} 
                dangerouslySetInnerHTML={{ __html: caseStudy.content }} 
              />
            )}

            {/* Metrics with modern card design and enhanced animation */}
            {caseStudy.metrics && caseStudy.metrics.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="pt-6"
              >
                <SectionTitle 
                  icon={<BarChart4 className={`h-7 w-7 ${accentTextClass}`} />}
                  title="Key Results" 
                  className="mb-8"
                />
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {caseStudy.metrics.map((metric, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      whileHover={{ 
                        y: -8,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
                        transition: { type: "spring", stiffness: 300, damping: 20 }
                      }}
                      className="relative"
                    >
                      {/* Background blob effect on hover */}
                      <div className="absolute -inset-[40%] bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                      
                      <Card className="overflow-hidden rounded-xl shadow-md border-border/50 relative h-full group bg-gradient-to-br from-background to-card backdrop-blur-sm">
                        <div className={`h-2 ${accentClasses} group-hover:h-3 transition-all duration-300`} />
                        <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] group-hover:opacity-[0.04] pointer-events-none mix-blend-soft-light transition-opacity duration-500" />
                        <CardContent className="p-8">
                          {metric.image ? (
                            <div className="relative h-16 w-16 mb-4 overflow-hidden rounded-lg">
                              <Image
                                src={metric.image}
                                alt={`${metric.label} illustration`}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : metric.category ? (
                            <div className="relative h-16 w-16 mb-4 overflow-hidden rounded-lg">
                              <PlaceholderImage
                                fill
                                category={metric.category === 'people' ? 'people' : 'tech'}
                                keywords={`${metric.category},${metric.label},visualization`}
                                className="object-cover"
                                alt={`${metric.label} visualization`}
                              />
                            </div>
                          ) : null}
                          <motion.h3 
                            className="text-5xl lg:text-6xl font-bold mb-3 tracking-tighter"
                            initial={{ background: "linear-gradient(to right, currentColor 0%, currentColor 100%)" }}
                            whileHover={{ 
                              background: `linear-gradient(to right, currentColor 0%, ${accentTextClass.replace('text-', 'var(--')}500) 100%)`,
                              backgroundClip: "text",
                              WebkitBackgroundClip: "text",
                              WebkitTextFillColor: "transparent"
                            }}
                          >
                            {metric.value}
                            {metric.unit && <span className="text-2xl text-muted-foreground/70 font-medium ml-1">{metric.unit}</span>}
                          </motion.h3>
                          <p className="text-muted-foreground/90 text-base group-hover:text-foreground transition-colors duration-300">
                            {metric.label}
                            {metric.comparison && (
                              <span className="text-emerald-500 text-sm ml-2">
                                {metric.comparison.startsWith('+') ? metric.comparison : `+${metric.comparison}`}
                              </span>
                            )}
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* CTA with enhanced design and animation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="p-10 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 border dark:from-gray-800/60 dark:to-gray-900 dark:border-gray-800/60 shadow-lg relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.03] pointer-events-none mix-blend-soft-light" />
              
              {/* Animated gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
              {/* Subtle moving particle effect */}
              <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
                <div className="absolute h-4 w-4 rounded-full bg-primary/80 blur-xl top-1/4 left-1/4 animate-pulse"></div>
                <div className="absolute h-6 w-6 rounded-full bg-primary/80 blur-xl top-3/4 left-3/4 animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute h-3 w-3 rounded-full bg-primary/80 blur-xl top-1/2 left-1/2 animate-pulse" style={{ animationDelay: "2s" }}></div>
              </div>
              
              <div className="relative flex flex-col md:flex-row md:items-center gap-8">
                <div className="flex-1 space-y-6">
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight">Ready to build your own AI project?</h3>
                  <p className="text-lg text-muted-foreground/90 max-w-2xl">
                    Join our comprehensive AI course and learn the skills needed to create impactful solutions like this
                    one.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        size="lg" 
                        className={`${buttonClasses} rounded-full shadow-md px-6 relative overflow-hidden`}
                      >
                        {/* Moving gradient effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 group-hover:translate-x-full transition-all duration-700 ease-in-out"></div>
                        Apply Now <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="rounded-full shadow-sm border-border/60 px-6 hover:bg-primary/5 hover:border-primary/30"
                      >
                        View Curriculum
                      </Button>
                    </motion.div>
                  </div>
                </div>
                <motion.div 
                  className="hidden lg:flex items-center justify-center"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse"></div>
                    <Box className="h-20 w-20 text-primary/70 relative" />
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar with enhanced styling and sticky behavior */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24 space-y-8 h-min pt-4">
              {/* Technologies with enhanced card design */}
              {caseStudy.technologies && caseStudy.technologies.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className={cn(
                    "p-6 rounded-xl border shadow-sm overflow-hidden relative",
                    "bg-card text-card-foreground group"
                  )}
                >
                  <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
                  
                  {/* Animated accent on hover */}
                  <div className={`absolute top-0 left-0 w-0 h-1 ${accentClasses} group-hover:w-full transition-all duration-500 ease-out`}></div>
                  
                  <h3 className="text-lg font-bold mb-4 flex items-center group">
                    <Code2 className={`h-4 w-4 mr-2 text-primary/80 group-hover:scale-110 transition-transform duration-300`} />
                    <span className="relative">
                      Technologies Used
                      <span className={`absolute -bottom-px left-0 w-0 h-px ${accentClasses} group-hover:w-full transition-all duration-500 ease-out`}></span>
                    </span>
                  </h3>
                  
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.technologies.map((tech, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 0.2 + (index * 0.05) }}
                      >
                        <Badge 
                          variant="secondary" 
                          className="font-medium text-xs bg-secondary/50 hover:bg-primary/10 hover:text-primary transition-all duration-200 py-1.5 px-3 rounded-md hover:scale-105"
                        >
                          {tech}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Timeline with enhanced card design */}
              {caseStudy.timeline && (caseStudy.timeline.start || caseStudy.timeline.duration) && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="p-6 rounded-xl border shadow-sm bg-card text-card-foreground relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
                  
                  {/* Animated accent on hover */}
                  <div className={`absolute top-0 left-0 w-0 h-1 ${accentClasses} group-hover:w-full transition-all duration-500 ease-out`}></div>
                  
                  <h3 className="text-lg font-bold mb-4 flex items-center group">
                    <Calendar className={`h-4 w-4 mr-2 text-primary/80 group-hover:scale-110 transition-transform duration-300`} />
                    <span className="relative">
                      Project Timeline
                      <span className={`absolute -bottom-px left-0 w-0 h-px ${accentClasses} group-hover:w-full transition-all duration-500 ease-out`}></span>
                    </span>
                  </h3>
                  
                  <div className="space-y-3.5 text-sm">
                    {caseStudy.timeline.start && (
                      <motion.div 
                        className="flex justify-between items-center py-1.5 border-b border-border/40 group/item"
                        whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                      >
                        <span className="text-muted-foreground font-medium">Start Date:</span>
                        <span className="font-semibold group-hover/item:text-primary transition-colors">{caseStudy.timeline.start}</span>
                      </motion.div>
                    )}
                    {caseStudy.timeline.end && (
                      <motion.div 
                        className="flex justify-between items-center py-1.5 border-b border-border/40 group/item"
                        whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                      >
                        <span className="text-muted-foreground font-medium">End Date:</span>
                        <span className="font-semibold group-hover/item:text-primary transition-colors">{caseStudy.timeline.end}</span>
                      </motion.div>
                    )}
                    {caseStudy.timeline.duration && (
                      <motion.div 
                        className="flex justify-between items-center py-1.5 group/item"
                        whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                      >
                        <span className="text-muted-foreground font-medium">Duration:</span>
                        <span className="font-semibold text-primary">{caseStudy.timeline.duration}</span>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Student Info with enhanced card design */}
              {caseStudy.studentBackground && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
                  className="p-6 rounded-xl border shadow-sm bg-card text-card-foreground relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
                  
                  {/* Animated accent on hover */}
                  <div className={`absolute top-0 left-0 w-0 h-1 ${accentClasses} group-hover:w-full transition-all duration-500 ease-out`}></div>
                  
                  <h3 className="text-lg font-bold mb-5 flex items-center group">
                    <Users className={`h-4 w-4 mr-2 text-primary/80 group-hover:scale-110 transition-transform duration-300`} />
                    <span className="relative">
                      About the Student
                      <span className={`absolute -bottom-px left-0 w-0 h-px ${accentClasses} group-hover:w-full transition-all duration-500 ease-out`}></span>
                    </span>
                  </h3>
                  
                  <div className="flex items-start space-x-4 mb-5">
                    {/* Student image with polished styling */}
                    <motion.div 
                      className="relative h-16 w-16 rounded-full overflow-hidden border shadow-md group/avatar"
                      whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    >
                      {caseStudy.studentImage ? (
                        <Image
                          src={caseStudy.studentImage}
                          alt={caseStudy.student || "Student"}
                          fill
                          className="object-cover group-hover/avatar:scale-110 transition-transform duration-700"
                        />
                      ) : (
                        <PlaceholderImage
                          alt={caseStudy.student || "Student"}
                          fill
                          className="object-cover group-hover/avatar:scale-110 transition-transform duration-700"
                          category="people"
                          seed={caseStudy.student ? encodeURIComponent(caseStudy.student) : undefined}
                          keywords={`profile,professional,${caseStudy.domain.toLowerCase()}`}
                        />
                      )}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-base">{caseStudy.student}</h4>
                      <p className="text-sm text-muted-foreground">Cohort {caseStudy.cohort}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground/90 leading-relaxed border-t border-border/40 pt-4 group-hover:text-muted-foreground transition-colors duration-300">{caseStudy.studentBackground}</p>
                </motion.div>
              )}

              {/* Navigation with enhanced styling */}
              <div className="space-y-4 mt-10">
                {navigation.prev && (
                  <Link
                    href={`/case-studies/${navigation.prev.slug}`}
                    className="flex items-center p-4 rounded-lg border bg-card hover:bg-muted/70 transition-all duration-300 shadow-sm group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none mix-blend-soft-light" />
                    <div className={`absolute top-0 left-0 w-0 h-1 ${accentClasses} group-hover:w-full transition-all duration-500 ease-out`}></div>
                    
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: -3, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    >
                      <ArrowLeft className="mr-3.5 h-5 w-5 text-muted-foreground/70 group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                    </motion.div>
                    <div className="flex-1 overflow-hidden">
                      <div className="text-xs text-muted-foreground mb-1">Previous Case Study</div>
                      <div className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-300">{navigation.prev.title}</div>
                    </div>
                  </Link>
                )}

                {navigation.next && (
                  <Link
                    href={`/case-studies/${navigation.next.slug}`}
                    className="flex items-center p-4 rounded-lg border bg-card hover:bg-muted/70 transition-all duration-300 shadow-sm group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none mix-blend-soft-light" />
                    <div className={`absolute top-0 left-0 w-0 h-1 ${accentClasses} group-hover:w-full transition-all duration-500 ease-out`}></div>
                    
                    <div className="flex-1 overflow-hidden text-right">
                      <div className="text-xs text-muted-foreground mb-1">Next Case Study</div>
                      <div className="font-medium text-sm truncate group-hover:text-primary transition-colors duration-300">{navigation.next.title}</div>
                    </div>
                    <motion.div
                      initial={{ x: 0 }}
                      whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 10 } }}
                    >
                      <ArrowRight className="ml-3.5 h-5 w-5 text-muted-foreground/70 group-hover:text-primary transition-colors duration-300 flex-shrink-0" />
                    </motion.div>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
} 