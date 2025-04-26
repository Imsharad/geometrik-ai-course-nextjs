"use client"

import type React from "react"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

export interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  className?: string
  variants?: any
}

export function FeatureCard({ icon, title, description, className, variants }: FeatureCardProps) {
  const Component = variants ? motion.div : "div"

  return (
    <Component
      className={cn("flex items-start gap-4 p-5 bg-muted rounded-lg", className)}
      {...(variants ? { variants } : {})}
    >
      <div className="p-2.5 bg-primary/10 text-primary rounded-md shrink-0">{icon}</div>
      <div>
        <h4 className="font-medium mb-2">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Component>
  )
}

