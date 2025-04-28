"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronRight, Download, Share2 } from "lucide-react"

interface CaseStudyHeaderActionsProps {
  title: string
}

export function CaseStudyHeaderActions({ title }: CaseStudyHeaderActionsProps) {
  return (
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
        <span className="text-foreground/80 font-medium truncate max-w-[280px] md:max-w-md">{title}</span>
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
  )
} 