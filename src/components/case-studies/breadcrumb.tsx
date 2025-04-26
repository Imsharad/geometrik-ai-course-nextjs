"use client"

import Link from "next/link"
import { ChevronRight, Download, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CaseStudyBreadcrumbProps {
  title: string
}

export function Breadcrumb({ title }: CaseStudyBreadcrumbProps) {
  return (
    <div className="flex justify-between items-center mb-8 border-b pb-4">
      <div className="flex items-center text-sm text-muted-foreground">
        <Link href="/case-studies" className="hover:text-foreground transition-colors">
          Case Studies
        </Link>
        <ChevronRight className="h-4 w-4 mx-2" />
        <span className="text-foreground font-medium">{title}</span>
      </div>

      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="gap-1">
          <Download className="h-4 w-4" />
          <span className="hidden sm:inline">PDF</span>
        </Button>
        <Button variant="outline" size="sm" className="gap-1">
          <Share2 className="h-4 w-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
      </div>
    </div>
  )
} 