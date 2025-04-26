"use client"

import { CaseStudyCard } from "./card"
import type { CaseStudySummary } from "@/lib/case-studies"

interface CaseStudyListProps {
  caseStudies: CaseStudySummary[]
}

export function List({ caseStudies }: CaseStudyListProps) {
  // Sort case studies: featured first, then by date
  const displayCaseStudies = [...caseStudies].sort((a, b) => {
    // First by featured status
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1

    // Then by date (newest first)
    if (a.date && b.date) {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
    
    return 0
  })

  return (
    <div className="space-y-8">
      {/* Case Study Grid */}
      {displayCaseStudies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayCaseStudies.map((caseStudy, index) => (
            <CaseStudyCard key={caseStudy.slug} caseStudy={caseStudy} index={index} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-lg font-medium mb-2">No case studies found</h3>
          <p className="text-muted-foreground">
            Check back later for new case studies.
          </p>
        </div>
      )}
    </div>
  )
} 