"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card as UICard, CardContent, CardFooter } from "@/components/ui/card"
import { ChevronRight, Users, TrendingUp, Lightbulb, Clock, Award } from "lucide-react"
import type { CaseStudySummary } from "@/lib/case-studies"
import { cn } from "@/lib/utils"

interface CaseStudyCardProps {
  caseStudy: CaseStudySummary
  index: number
}

export function CaseStudyCard({ caseStudy, index }: CaseStudyCardProps) {
  const domainColors: Record<string, string> = {
    Healthcare: "from-blue-400/20 to-cyan-400/20 border-blue-300/30",
    Manufacturing: "from-orange-400/20 to-amber-400/20 border-orange-300/30",
    Finance: "from-green-400/20 to-emerald-400/20 border-green-300/30",
    Retail: "from-purple-400/20 to-violet-400/20 border-purple-300/30",
    "Customer Service": "from-indigo-400/20 to-blue-400/20 border-indigo-300/30",
    Education: "from-pink-400/20 to-rose-400/20 border-pink-300/30",
    Security: "from-red-400/20 to-rose-400/20 border-red-300/30",
    Logistics: "from-teal-400/20 to-cyan-400/20 border-teal-300/30",
  }

  const gradientClass = domainColors[caseStudy.domain] || "from-gray-400/20 to-slate-400/20 border-gray-300/30"

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="h-full"
    >
      <Link href={`/case-studies/${caseStudy.slug}`} className="block h-full group/card">
        <UICard className={cn(
          "h-full overflow-hidden transition-all duration-350 ease-out",
          "border border-border/50 bg-card rounded-lg",
          "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1",
          "relative group"
        )}>
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br rounded-lg",
              gradientClass,
              "opacity-30 group-hover:opacity-45 transition-opacity duration-350 pointer-events-none"
            )}
          />

          <div className={cn(
            "absolute inset-0 bg-[url('/subtle-pattern.png')] rounded-lg",
            "opacity-[0.02] group-hover:opacity-[0.03] transition-opacity duration-350 pointer-events-none",
            "mix-blend-soft-light"
          )} />

          <div className="relative h-52 overflow-hidden rounded-t-lg">
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent z-10 group-hover:from-black/45 transition-colors duration-350"></div>
            <Image
              src={caseStudy.image || "/placeholder.svg?height=300&width=600&query=AI+visualization"}
              alt={caseStudy.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            />

            <div className="absolute top-3.5 right-3.5 z-10">
              <Badge
                variant="secondary"
                className="bg-background/85 backdrop-blur-md font-medium px-3 py-1 text-[11px] shadow-sm border border-white/20 rounded-md"
              >
                {caseStudy.domain}
              </Badge>
            </div>

            {caseStudy.featured && (
              <div className="absolute top-3.5 left-3.5 z-10">
                <Badge
                  variant="default"
                  className="bg-primary/95 text-primary-foreground backdrop-blur-md font-semibold px-3 py-1 shadow-md flex items-center gap-1.5 border border-primary/40 text-[11px] rounded-md"
                >
                  <Award className="h-3 w-3" />
                  Featured
                </Badge>
              </div>
            )}
          </div>

          <CardContent className="p-5 relative z-10 flex flex-col flex-grow">
            <div className="mb-3.5 flex items-center justify-between text-[11px] text-muted-foreground/70">
              <div className="flex items-center space-x-2.5">
                <div className="flex items-center">
                  <Users className="mr-1 h-3 w-3" />
                  <span className="font-medium text-foreground/90">{caseStudy.student}</span>
                </div>
                <span className="text-muted-foreground/40">•</span>
                <span>{caseStudy.cohort}</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-3 w-3" />
                <span>{caseStudy.readTime || "5 min"} read</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-3 group-hover/card:text-primary transition-colors duration-200 line-clamp-2 tracking-tighter leading-snug">
              {caseStudy.title}
            </h3>

            <p className="text-muted-foreground/90 line-clamp-3 mb-4 text-sm leading-relaxed grow">
              {caseStudy.summary}
            </p>

            {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
              <div className="space-y-2 text-sm mb-5">
                {caseStudy.outcomes.slice(0, 2).map((outcome, i) => (
                  <div key={i} className="flex items-start border border-border/40 hover:border-border/70 transition-colors rounded-lg p-3">
                    {i === 0 ? (
                      <TrendingUp className="h-4 w-4 mt-[1px] mr-2.5 text-primary/90 flex-shrink-0" />
                    ) : (
                      <Lightbulb className="h-4 w-4 mt-[1px] mr-2.5 text-primary/90 flex-shrink-0" />
                    )}
                    <span className="font-medium leading-snug text-foreground/95">{outcome}</span>
                  </div>
                ))}
              </div>
            )}

            {caseStudy.technologies && caseStudy.technologies.length > 0 && (
              <div className="mt-auto pt-4 border-t border-border/50">
                 <h4 className="text-xs font-semibold text-muted-foreground mb-2">Technologies</h4>
                 <div className="flex flex-wrap gap-1.5 items-center">
                  {caseStudy.technologies.slice(0, 3).map((tech, i) => (
                    <Badge key={i} variant="outline" className="border-border/70 bg-transparent hover:border-primary/50 hover:text-primary transition-colors px-2.5 py-0.5 text-[11px] font-normal rounded-md">
                      {tech}
                    </Badge>
                  ))}
                  {caseStudy.technologies.length > 3 && (
                    <Badge variant="outline" className="border-border/70 bg-transparent hover:border-primary/50 hover:text-primary transition-colors px-2.5 py-0.5 text-[11px] font-normal rounded-md">
                      +{caseStudy.technologies.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>

          <CardFooter className="p-4 pt-3 flex justify-end relative z-10 border-t border-border/50">
            <span className="text-sm font-semibold text-primary/90 group-hover/card:text-primary flex items-center group/link">
              View case study
              <ChevronRight className="ml-1 h-4 w-4 transition-transform duration-200 ease-in-out group-hover/link:translate-x-1.5" />
            </span>
          </CardFooter>
        </UICard>
      </Link>
    </motion.div>
  )
} 