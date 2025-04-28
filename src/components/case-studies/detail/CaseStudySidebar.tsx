"use client"

import { CaseStudy, CaseStudySummary } from "@/lib/case-studies"
import { TechnologiesSection } from "./TechnologiesSection"
import { TimelineSection } from "./TimelineSection"
import { StudentInfoSection } from "./StudentInfoSection"
import { NavigationSection } from "./NavigationSection"

interface CaseStudySidebarProps {
  caseStudy: CaseStudy
  navigation: {
    prev: CaseStudySummary | null
    next: CaseStudySummary | null
  }
}

export function CaseStudySidebar({ caseStudy, navigation }: CaseStudySidebarProps) {
  return (
    <div className="lg:sticky lg:top-24 space-y-8 h-min pt-4">
      <TechnologiesSection 
        technologies={caseStudy.technologies || []} 
        domain={caseStudy.domain} 
      />

      <TimelineSection 
        timeline={caseStudy.timeline || {}} 
        domain={caseStudy.domain} 
      />

      <StudentInfoSection 
        student={caseStudy.student} 
        cohort={String(caseStudy.cohort)}
        studentImage={caseStudy.studentImage}
        studentBackground={caseStudy.studentBackground}
        domain={caseStudy.domain}
      />

      <NavigationSection 
        navigation={navigation} 
        domain={caseStudy.domain} 
      />
    </div>
  )
} 