"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Box } from "lucide-react"
import { getDomainClasses } from "./constants"

interface CtaSectionProps {
  domain: string
}

export function CtaSection({ domain }: CtaSectionProps) {
  const domainClasses = getDomainClasses(domain)

  return (
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
                className={`${domainClasses.button} rounded-full shadow-md px-6 relative overflow-hidden`}
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
  )
} 