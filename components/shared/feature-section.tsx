"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { FeatureCard } from "@/components/shared/feature-card"

export interface Feature {
  id: number | string
  title: string
  description: string
  icon: React.ReactNode
}

interface FeatureSectionProps {
  title: string
  subtitle?: string
  features: Feature[]
  className?: string
  variant?: "grid" | "list"
  columns?: 2 | 3 | 4
  motionVariants?: any
}

export function FeatureSection({
  title,
  subtitle,
  features,
  className,
  variant = "grid",
  columns = 3,
  motionVariants,
}: FeatureSectionProps) {
  const gridCols = {
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
  }

  return (
    <motion.div className={className} variants={motionVariants}>
      <h3 className="text-2xl font-bold tracking-tight mb-4">{title}</h3>
      {subtitle && <p className="text-muted-foreground mb-8">{subtitle}</p>}

      <div className={cn(variant === "grid" ? `grid gap-6 ${gridCols[columns]}` : "space-y-6")}>
        {features.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            variants={motionVariants}
          />
        ))}
      </div>
    </motion.div>
  )
}

