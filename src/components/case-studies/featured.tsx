"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { CaseStudyCard } from "./card"
import type { CaseStudySummary } from "@/lib/case-studies"

interface FeaturedCaseStudiesProps {
  caseStudies: CaseStudySummary[]
  title?: string
  subtitle?: string
  limit?: number
  showViewAllButton?: boolean
}

export function Featured({
  caseStudies,
  title = "Student Success Stories",
  subtitle = "See how our students are applying AI concepts to solve real-world problems",
  limit = 3,
  showViewAllButton = true,
}: FeaturedCaseStudiesProps) {
  // Filter featured case studies first, then sort by date
  const sortedCaseStudies = [...caseStudies]
    .sort((a, b) => {
      // First by featured status
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1

      // Then by date (newest first)
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      }
      // Handle cases where dates might be missing
      if (a.date && !b.date) return -1
      if (!a.date && b.date) return 1
      return 0
    })
    .slice(0, limit)

  return (
    <section className="py-16">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </div>

          {showViewAllButton && (
            <Link href="/case-studies" className="mt-4 md:mt-0">
              <Button variant="outline" className="group">
                View all case studies
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedCaseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
          ))}
        </div>

        {showViewAllButton && sortedCaseStudies.length > 0 && (
          <div className="flex justify-center mt-12 md:hidden">
            <Link href="/case-studies">
              <Button variant="outline" className="group">
                View all case studies
                <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
} 