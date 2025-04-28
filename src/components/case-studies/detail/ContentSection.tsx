"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { SectionTitle } from "./SectionTitle"
import { getDomainClasses } from "./constants"

interface ContentSectionProps {
  title: string
  content: string
  icon?: React.ReactNode
  domain: string
  accentBorder?: boolean
  className?: string
}

export function ContentSection({
  title,
  content,
  icon,
  domain,
  accentBorder = true,
  className,
}: ContentSectionProps) {
  const domainClasses = getDomainClasses(domain)

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "relative p-8 rounded-xl overflow-hidden border-l-4",
        accentBorder ? `border-l-primary/30` : "border-l-transparent",
        accentBorder ? "bg-primary/[0.02]" : "bg-accent/30",
        "shadow-sm",
        className
      )}
    >
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
      
      <SectionTitle 
        icon={icon && <div className={`p-2.5 ${domainClasses.iconBg} rounded-lg shadow-sm`}>
          {icon}
        </div>}
        title={title} 
        accentClass={domainClasses.accent}
      />
      
      <div className={cn(
        "prose prose-lg dark:prose-invert max-w-none",
        "prose-headings:font-bold prose-headings:tracking-tight",
        "prose-p:leading-relaxed prose-p:text-muted-foreground/90"
      )}>
        <p className="text-lg leading-relaxed">{content}</p>
      </div>
    </motion.div>
  )
} 