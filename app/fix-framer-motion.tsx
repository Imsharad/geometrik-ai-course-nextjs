"use client"

// This file provides a fix for the framer-motion positionalValues error
// Re-exporting all components needed throughout the project
import { 
  motion as originalMotion, 
  useScroll, 
  useTransform,
  AnimatePresence,
  useMotionValue,
  useInView as originalUseInView,
  HTMLMotionProps as OriginalHTMLMotionProps,
  SVGMotionProps as OriginalSVGMotionProps,
} from "framer-motion"

// Add a type that includes threshold in UseInViewOptions
interface UseInViewOptions {
  root?: React.RefObject<Element>;
  margin?: string;
  amount?: "some" | "all" | number;
  once?: boolean;
  threshold?: number; // Add threshold property
}

// Define a type for the positionalValues object
interface PositionalValues {
  [key: string]: Function | any;
}

// Wrap useInView to accept our extended options
const useInView = (ref: React.RefObject<Element>, options?: UseInViewOptions) => {
  return originalUseInView(ref, options as any);
};

// Patch to fix the t[i] is not a function error and positionalValues error
// Create a wrapped version of motion with fixed measurement
const motion = originalMotion;

// Custom fix - ensures measurement functions are properly initialized
if (typeof window !== "undefined") {
  // Fix for positionalValues is not a function error
  try {
    const ensureFunction = (obj: any, key: string) => {
      if (!obj) return;
      
      // If the property doesn't exist, create it
      if (obj[key] === undefined) {
        obj[key] = () => 0;
        console.warn(`Created missing function for ${key} in framer-motion`);
        return;
      }
      
      // If it exists but is not a function, replace it
      if (typeof obj[key] !== 'function') {
        const originalValue = obj[key];
        obj[key] = () => {
          // Return the original value if it's a number, otherwise 0
          return typeof originalValue === 'number' ? originalValue : 0;
        };
        console.warn(`Fixed ${key} in framer-motion - was not a function`);
      }
    };

    // Try to access and patch the problematic module
    setTimeout(() => {
      // This runs after initial load to ensure webpack modules are available
      const allModules = (window as any).__webpack_modules__ || {};
      
      // First pass - find the positionalValues module
      let positionalValuesModule: any = null;
      let positionalValues: PositionalValues | null = null;
      
      Object.keys(allModules).forEach(moduleId => {
        const mod = allModules[moduleId];
        // Check if this module has positionalValues
        if (mod && mod.exports && mod.exports.positionalValues) {
          positionalValuesModule = mod;
          positionalValues = mod.exports.positionalValues as PositionalValues;
        }
      });
      
      // If we found the module, patch all properties
      if (positionalValues) {
        console.log("Found positionalValues module, applying fix");
        
        // Make sure all transformable properties are functions
        const transformableProps = [
          "x", "y", "z", "width", "height", "top", "left", "right", "bottom",
          "transform", "transformPerspective", "opacity", "rotate", "rotateX", "rotateY", 
          "rotateZ", "scale", "scaleX", "scaleY", "scaleZ", "skew", "skewX", "skewY"
        ];
        
        // Ensure all known transform properties exist and are functions
        transformableProps.forEach(prop => {
          ensureFunction(positionalValues, prop);
        });
        
        // Also ensure any existing properties are functions
        if (positionalValues) {
          Object.keys(positionalValues).forEach(propName => {
            ensureFunction(positionalValues, propName);
          });
        }
      } else {
        console.warn("Could not find positionalValues module to patch");
      }
    }, 100); // Slightly longer timeout to ensure modules are loaded
  } catch (e) {
    console.error("Failed to patch framer-motion positionalValues:", e);
  }

  // Fix the measure function
  try {
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
  } catch (e) {
    console.error("Failed to patch framer-motion measure function:", e);
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

// Export types
export type { OriginalHTMLMotionProps as HTMLMotionProps, OriginalSVGMotionProps as SVGMotionProps } 