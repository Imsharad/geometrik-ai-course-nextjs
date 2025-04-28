"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface SectionTitleProps {
  icon?: React.ReactNode
  title: string
  className?: string
  accentClass?: string
}

export function SectionTitle({
  icon,
  title,
  className,
  accentClass = "bg-primary",
}: SectionTitleProps) {
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
          className={`absolute inset-0 ${accentClass}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: '100%' } : { width: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        ></motion.div>
      </div>
    </div>
  )
} 