"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Zap } from "lucide-react"
import { SectionTitle } from "./SectionTitle"
import { getDomainClasses } from "./constants"

interface KeyOutcomesSectionProps {
  domain: string
  outcomes: string[]
}

export function KeyOutcomesSection({ domain, outcomes }: KeyOutcomesSectionProps) {
  if (!outcomes || outcomes.length === 0) return null

  const domainClasses = getDomainClasses(domain)
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={cn(
        "p-8 rounded-xl border shadow-sm overflow-hidden relative",
        "bg-gradient-to-br",
        domainClasses.gradient
      )}
    >
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-black/[0.02] to-transparent"></div>
      
      <SectionTitle 
        icon={<Zap className={`h-6 w-6 ${domainClasses.accentText}`} />}
        title="Key Outcomes" 
        className="mb-8"
        accentClass={domainClasses.accent}
      />
      
      <div className="grid sm:grid-cols-2 gap-x-8 gap-y-5">
        {outcomes.map((outcome, index) => (
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
              className={`mr-4 mt-1 h-8 w-8 rounded-full ${domainClasses.iconBg} flex items-center justify-center flex-shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-110`}
            >
              <div className={`h-2.5 w-2.5 rounded-full ${domainClasses.accent}`}></div>
            </div>
            <span className="text-base md:text-lg font-medium leading-snug">{outcome}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 