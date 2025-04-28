"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { CaseStudySummary } from "@/lib/case-studies"
import { getDomainClasses } from "./constants"

interface NavigationSectionProps {
  navigation: {
    prev: CaseStudySummary | null
    next: CaseStudySummary | null
  }
  domain: string
}

export function NavigationSection({ navigation, domain }: NavigationSectionProps) {
  if (!navigation.prev && !navigation.next) return null

  const domainClasses = getDomainClasses(domain)
  
  return (
    <div className="space-y-4 mt-10">
      {navigation.prev && (
        <Link
          href={`/case-studies/${navigation.prev.slug}`}
          className="flex items-center p-4 rounded-lg border bg-card hover:bg-muted/70 transition-all duration-300 shadow-sm group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-0 group-hover:opacity-[0.02] transition-opacity duration-300 pointer-events-none mix-blend-soft-light" />
          <div className={`absolute top-0 left-0 w-0 h-1 ${domainClasses.accent} group-hover:w-full transition-all duration-500 ease-out`}></div>
          
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
          <div className={`absolute top-0 left-0 w-0 h-1 ${domainClasses.accent} group-hover:w-full transition-all duration-500 ease-out`}></div>
          
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
  )
} 