"use client"

// This file provides a fix for the framer-motion positionalValues error
// Re-exporting all components needed throughout the project
import { 
  motion, 
  useScroll, 
  useTransform,
  AnimatePresence,
  useMotionValue,
  useInView,
  HTMLMotionProps,
  SVGMotionProps,
} from "framer-motion"

export { 
  motion, 
  useScroll, 
  useTransform,
  AnimatePresence,
  useMotionValue,
  useInView,
}

// Export types with 'export type' for isolatedModules
export type { HTMLMotionProps, SVGMotionProps } 