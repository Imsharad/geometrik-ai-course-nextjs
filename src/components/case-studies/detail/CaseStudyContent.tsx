"use client"

import { Lightbulb, TrendingUp } from "lucide-react"
import { CaseStudy } from "@/lib/case-studies"
import { KeyOutcomesSection } from "./KeyOutcomesSection"
import { ContentSection } from "./ContentSection"
import { MarkdownContent } from "./MarkdownContent"
import { MetricsSection } from "./MetricsSection"
import { CtaSection } from "./CtaSection"

interface CaseStudyContentProps {
  caseStudy: CaseStudy
}

export function CaseStudyContent({ caseStudy }: CaseStudyContentProps) {
  return (
    <div className="lg:col-span-8 space-y-16">
      {/* Key Outcomes/Highlights */}
      {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
        <KeyOutcomesSection 
          outcomes={caseStudy.outcomes} 
          domain={caseStudy.domain} 
        />
      )}

      {/* Challenge Section */}
      {caseStudy.challenge && (
        <ContentSection
          title="Challenge"
          content={caseStudy.challenge}
          icon={<Lightbulb className="h-6 w-6" />}
          domain={caseStudy.domain}
          accentBorder={true}
        />
      )}

      {/* Solution Section */}
      {caseStudy.solution && (
        <ContentSection
          title="Solution"
          content={caseStudy.solution}
          icon={<TrendingUp className="h-6 w-6" />}
          domain={caseStudy.domain}
          accentBorder={false}
        />
      )}

      {/* Other Sections */}
      {caseStudy.sections &&
        caseStudy.sections.map((section, index) => (
          <ContentSection
            key={index}
            title={section.title}
            content={section.content}
            domain={caseStudy.domain}
            accentBorder={index % 2 === 0}
            className={index % 2 === 0 ? "bg-card/50" : ""}
          />
        ))}

      {/* Original Markdown content */}
      {caseStudy.content && (
        <MarkdownContent content={caseStudy.content} />
      )}

      {/* Metrics Section */}
      {caseStudy.metrics && caseStudy.metrics.length > 0 && (
        <MetricsSection 
          metrics={caseStudy.metrics} 
          domain={caseStudy.domain} 
        />
      )}

      {/* CTA Section */}
      <CtaSection domain={caseStudy.domain} />
    </div>
  )
} 