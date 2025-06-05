"use client"

import { motion } from "framer-motion"
import type { CaseStudy, CaseStudySummary } from "@/lib/case-studies"
import { CaseStudyHero } from "./detail/CaseStudyHero"
import { CaseStudyHeaderActions } from "./detail/CaseStudyHeaderActions"
import { CaseStudyContent } from "./detail/CaseStudyContent"
import { CaseStudySidebar } from "./detail/CaseStudySidebar"

interface SimplifiedCaseStudyDetailProps {
  caseStudy: CaseStudy
  navigation: {
    prev: CaseStudySummary | null
    next: CaseStudySummary | null
  }
}

export function Detail({ caseStudy, navigation }: SimplifiedCaseStudyDetailProps) {
  return (
    <motion.article 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="pb-24"
    >
      {/* Hero Section */}
      <CaseStudyHero caseStudy={caseStudy} />

      {/* Main Content */}
      <div className="container max-w-6xl mx-auto px-4 mt-12">
        {/* Breadcrumb and Actions */}
        <CaseStudyHeaderActions title={caseStudy.title} />

        {/* Two-column layout with content and sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-10 gap-y-16 relative">
          {/* Decorative divider between content and sidebar */}
          <div className="absolute top-0 bottom-0 hidden lg:block lg:left-2/3 w-px bg-gradient-to-b from-transparent via-border/50 to-transparent"></div>
          
          {/* Main content column */}
          <CaseStudyContent caseStudy={caseStudy} />

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <CaseStudySidebar 
              caseStudy={caseStudy}
              navigation={navigation}
            />
          </div>
        </div>
      </div>
    </motion.article>
  )
} 