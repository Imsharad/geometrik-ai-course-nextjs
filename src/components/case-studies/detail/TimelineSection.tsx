"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Calendar } from "lucide-react"
import { getDomainClasses } from "./constants"

interface TimelineSectionProps {
  timeline: {
    start?: string
    end?: string
    duration?: string
  }
  domain: string
}

export function TimelineSection({ timeline, domain }: TimelineSectionProps) {
  if (!timeline || (!timeline.start && !timeline.end && !timeline.duration)) return null

  const domainClasses = getDomainClasses(domain)
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="p-6 rounded-xl border shadow-sm bg-card text-card-foreground relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
      
      {/* Animated accent on hover */}
      <div className={`absolute top-0 left-0 w-0 h-1 ${domainClasses.accent} group-hover:w-full transition-all duration-500 ease-out`}></div>
      
      <h3 className="text-lg font-bold mb-4 flex items-center group">
        <Calendar className={`h-4 w-4 mr-2 text-primary/80 group-hover:scale-110 transition-transform duration-300`} />
        <span className="relative">
          Project Timeline
          <span className={`absolute -bottom-px left-0 w-0 h-px ${domainClasses.accent} group-hover:w-full transition-all duration-500 ease-out`}></span>
        </span>
      </h3>
      
      <div className="space-y-3.5 text-sm">
        {timeline.start && (
          <motion.div 
            className="flex justify-between items-center py-1.5 border-b border-border/40 group/item"
            whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 10 } }}
          >
            <span className="text-muted-foreground font-medium">Start Date:</span>
            <span className="font-semibold group-hover/item:text-primary transition-colors">{timeline.start}</span>
          </motion.div>
        )}
        {timeline.end && (
          <motion.div 
            className="flex justify-between items-center py-1.5 border-b border-border/40 group/item"
            whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 10 } }}
          >
            <span className="text-muted-foreground font-medium">End Date:</span>
            <span className="font-semibold group-hover/item:text-primary transition-colors">{timeline.end}</span>
          </motion.div>
        )}
        {timeline.duration && (
          <motion.div 
            className="flex justify-between items-center py-1.5 group/item"
            whileHover={{ x: 3, transition: { type: "spring", stiffness: 400, damping: 10 } }}
          >
            <span className="text-muted-foreground font-medium">Duration:</span>
            <span className="font-semibold text-primary">{timeline.duration}</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
} 