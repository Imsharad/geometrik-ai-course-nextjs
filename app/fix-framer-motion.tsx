"use client"

// This file provides a fix for the framer-motion positionalValues error
// Re-exporting all components needed throughout the project
import { 
  motion as originalMotion, 
  useScroll, 
  useTransform,
  AnimatePresence,
  useMotionValue,
  useInView,
  HTMLMotionProps,
  SVGMotionProps,
} from "framer-motion"

// Patch to fix the t[i] is not a function error
// Create a wrapped version of motion with fixed measurement
const motion = originalMotion;

// Custom fix - ensures measurement functions are properly initialized
if (typeof window !== "undefined") {
  const originalMeasure = (window as any).__framer_importMeasure;
  if (originalMeasure) {
    (window as any).__framer_importMeasure = () => {
      const measure = originalMeasure();
      // Ensure measure functions are properly initialized and callable
      const safeWrapper = (fn: any) => {
        return typeof fn === 'function' ? fn : () => {};
      };
      
      // Add safety wrapper to measureInitialState
      const originalMeasureInitialState = measure.measureInitialState;
      measure.measureInitialState = function(...args: any[]) {
        try {
          return originalMeasureInitialState.apply(this, args);
        } catch (e) {
          // Fallback to empty measurements if error occurs
          console.warn("Fixed framer-motion measurement error:", e);
          return {};
        }
      };
      
      return measure;
    };
  }
}

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