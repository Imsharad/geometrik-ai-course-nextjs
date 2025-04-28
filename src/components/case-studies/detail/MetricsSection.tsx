"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { BarChart4 } from "lucide-react"
import { SectionTitle } from "./SectionTitle"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getDomainClasses } from "./constants"

interface Metric {
  value: string
  unit?: string
  label: string
  comparison?: string
  image?: string
  category?: string
}

interface MetricsSectionProps {
  metrics: Metric[]
  domain: string
}

export function MetricsSection({ metrics, domain }: MetricsSectionProps) {
  if (!metrics || metrics.length === 0) return null

  const domainClasses = getDomainClasses(domain)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="pt-6"
    >
      <SectionTitle 
        icon={<BarChart4 className={`h-7 w-7 ${domainClasses.accentText}`} />}
        title="Key Results" 
        className="mb-8"
        accentClass={domainClasses.accent}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -8,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)",
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            className="relative"
          >
            {/* Background blob effect on hover */}
            <div className="absolute -inset-[40%] bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
            
            <Card className="overflow-hidden rounded-xl shadow-md border-border/50 relative h-full group bg-gradient-to-br from-background to-card backdrop-blur-sm">
              <div className={`h-2 ${domainClasses.accent} group-hover:h-3 transition-all duration-300`} />
              <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] group-hover:opacity-[0.04] pointer-events-none mix-blend-soft-light transition-opacity duration-500" />
              <CardContent className="p-8">
                {metric.image ? (
                  <div className="relative h-16 w-16 mb-4 overflow-hidden rounded-lg">
                    <Image
                      src={metric.image}
                      alt={`${metric.label} illustration`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : metric.category ? (
                  <div className="relative h-16 w-16 mb-4 overflow-hidden rounded-lg">
                    <PlaceholderImage
                      fill
                      category={metric.category === 'people' ? 'people' : 'tech'}
                      keywords={`${metric.category},${metric.label},visualization`}
                      className="object-cover"
                      alt={`${metric.label} visualization`}
                    />
                  </div>
                ) : null}
                <motion.h3 
                  className="text-5xl lg:text-6xl font-bold mb-3 tracking-tighter"
                  initial={{ background: "linear-gradient(to right, currentColor 0%, currentColor 100%)" }}
                  whileHover={{ 
                    background: `linear-gradient(to right, currentColor 0%, ${domainClasses.accentText.replace('text-', 'var(--')}500) 100%)`,
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  {metric.value}
                  {metric.unit && <span className="text-2xl text-muted-foreground/70 font-medium ml-1">{metric.unit}</span>}
                </motion.h3>
                <p className="text-muted-foreground/90 text-base group-hover:text-foreground transition-colors duration-300">
                  {metric.label}
                  {metric.comparison && (
                    <span className="text-emerald-500 text-sm ml-2">
                      {metric.comparison.startsWith('+') ? metric.comparison : `+${metric.comparison}`}
                    </span>
                  )}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
} 