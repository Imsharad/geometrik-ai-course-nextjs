"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Code2 } from "lucide-react"
import { getDomainClasses } from "./constants"

interface TechnologiesSectionProps {
  technologies: string[]
  domain: string
}

export function TechnologiesSection({ technologies, domain }: TechnologiesSectionProps) {
  if (!technologies || technologies.length === 0) return null

  const domainClasses = getDomainClasses(domain)
  
  return (
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
      <div className={`absolute top-0 left-0 w-0 h-1 ${domainClasses.accent} group-hover:w-full transition-all duration-500 ease-out`}></div>
      
      <h3 className="text-lg font-bold mb-4 flex items-center group">
        <Code2 className={`h-4 w-4 mr-2 text-primary/80 group-hover:scale-110 transition-transform duration-300`} />
        <span className="relative">
          Technologies Used
          <span className={`absolute -bottom-px left-0 w-0 h-px ${domainClasses.accent} group-hover:w-full transition-all duration-500 ease-out`}></span>
        </span>
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {technologies.map((tech, index) => (
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
  )
} 