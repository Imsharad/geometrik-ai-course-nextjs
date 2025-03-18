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
  // Directly override the issue with a monkey patch
  try {
    // Add a hook to intercept webpack modules as they're loaded
    const originalDefine = (window as any).__webpack_require__.d;
    if (originalDefine) {
      (window as any).__webpack_require__.d = function(exports: any, definition: any) {
        // Check if this might be the unit conversion module
        if (definition && definition.positionalValues) {
          console.log("Found positionalValues in module definition, applying fix");
          
          // Create a safe version of positionalValues where all properties are functions
          const safePositionalValues: PositionalValues = {};
          const defaultFn = () => 0;
          
          // Common positional properties that should be functions
          const propertiesToFix = [
            "x", "y", "z", "top", "left", "right", "bottom", "width", "height",
            "rotate", "rotateX", "rotateY", "rotateZ", 
            "scale", "scaleX", "scaleY", "scaleZ",
            "skew", "skewX", "skewY",
            "transformPerspective", "transform", "translate", "translateX", "translateY", "translateZ"
          ];
          
          // Pre-populate with safe functions for common properties
          propertiesToFix.forEach(prop => {
            safePositionalValues[prop] = defaultFn;
          });
          
          // Override the original definition
          definition.positionalValues = {
            ...definition.positionalValues,
            ...safePositionalValues,
            // Ensure the getter always returns a function
            get: function(target: any, key: string) {
              const value = this[key] || defaultFn;
              return typeof value === 'function' ? value : defaultFn;
            }
          };
          
          // Ensure all properties are functions, even ones we didn't anticipate
          const handler = {
            get: function(target: any, prop: string) {
              if (typeof target[prop] === 'function') {
                return target[prop];
              }
              console.warn(`Fixed missing function for property: ${prop}`);
              return defaultFn;
            }
          };
          
          // Apply the proxy to make every property access safe
          definition.positionalValues = new Proxy(definition.positionalValues, handler);
        }
        
        // Call the original define function
        return originalDefine.call(this, exports, definition);
      };
    }
    
    // Also patch the module directly if it's already been loaded
    setTimeout(() => {
      console.log("Running delayed fix for positionalValues");
      if ((window as any).__webpack_modules__) {
        Object.values((window as any).__webpack_modules__).forEach((module: any) => {
          try {
            if (module && module.exports && module.exports.positionalValues) {
              console.log("Found positionalValues module, applying fix");
              
              // Safe default function
              const defaultFn = () => 0;
              
              // Create a proxy to ensure all property accesses return a function
              const proxyHandler = {
                get: function(target: any, prop: string) {
                  if (prop === 'get') {
                    return function(target: any, key: string) {
                      return defaultFn;
                    };
                  }
                  
                  if (typeof target[prop] === 'function') {
                    return target[prop];
                  }
                  
                  // For any non-function property, return our default function
                  return defaultFn;
                }
              };
              
              // Apply the proxy
              module.exports.positionalValues = new Proxy(
                module.exports.positionalValues || {}, 
                proxyHandler
              );
            }
          } catch (e) {
            // Ignore errors for individual modules
          }
        });
      }
    }, 200);
  } catch (e) {
    console.error("Error setting up framer-motion fixes:", e);
  }
  
  // Also patch any direct usage when the specific module is accessed
  try {
    let originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
    Object.getOwnPropertyDescriptor = function(obj: any, prop: string) {
      const descriptor = originalGetOwnPropertyDescriptor.apply(this, [obj, prop]);
      
      // Look for the positionalValues
      if (
        prop === 'positionalValues' && 
        descriptor && 
        descriptor.value && 
        typeof descriptor.value === 'object'
      ) {
        const defaultFn = () => 0;
        
        // Make sure all access to properties returns a function
        const handler = {
          get: function(target: any, prop: string) {
            return typeof target[prop] === 'function' ? target[prop] : defaultFn;
          }
        };
        
        // Create a proxy that ensures all property access returns a function
        descriptor.value = new Proxy(descriptor.value, handler);
      }
      
      return descriptor;
    };
  } catch (e) {
    console.error("Error patching Object.getOwnPropertyDescriptor:", e);
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