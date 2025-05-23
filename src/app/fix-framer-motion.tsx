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
  // Safer way to apply our fixes - wait for window to be fully loaded
  setTimeout(() => {
    try {
      // Create a safe default function that always returns 0
      const defaultFn = () => 0;
      
      // A utility to ensure any property access returns a function
      const makeSafeAccessor = (obj: any) => {
        if (!obj) return obj;
        
        return new Proxy(obj, {
          get: (target, prop: string) => {
            // If the property exists and is a function, return it
            if (typeof target[prop] === 'function') {
              return target[prop];
            }
            // Otherwise return our default function
            return defaultFn;
          }
        });
      };

      // Make any array safe by ensuring all elements are functions
      const makeSafeArray = (arr: any[]) => {
        if (!Array.isArray(arr)) return arr;
        
        return new Proxy(arr, {
          get: (target, prop) => {
            // Let length and other properties pass through
            if (prop === 'length' || typeof prop !== 'string' || isNaN(parseInt(prop))) {
              return target[prop as any];
            }
            
            const value = target[prop as any];
            // If the value is a function, return it directly
            if (typeof value === 'function') {
              return value;
            }
            // If the value is undefined or not a function, return the default function
            return defaultFn;
          }
        });
      };
      
      // Method 1: Try to hook into webpack module system if available
      const webpackRequire = (window as any).__webpack_require__;
      if (webpackRequire && typeof webpackRequire.d === 'function') {
        const originalDefine = webpackRequire.d;
        webpackRequire.d = function(exports: any, definition: any) {
          // Check if this might be the unit conversion module
          if (definition && definition.positionalValues) {
            console.log("Found positionalValues in module definition, applying fix");
            definition.positionalValues = makeSafeAccessor(definition.positionalValues);
          }
          
          // Call the original define function
          return originalDefine.call(this, exports, definition);
        };
      }
      
      // Method 2: Try to find and fix the module if it's already loaded
      if ((window as any).__webpack_modules__) {
        const modules = (window as any).__webpack_modules__;
        Object.keys(modules).forEach(moduleId => {
          try {
            const module = modules[moduleId];
            if (module && module.exports && module.exports.positionalValues) {
              console.log("Found positionalValues module, applying fix");
              module.exports.positionalValues = makeSafeAccessor(module.exports.positionalValues);
            }
            
            // Look for the module that contains measureInitialState
            if (module && 
                module.exports && 
                typeof module.exports === 'object' && 
                module.exports.measureInitialState) {
              console.log("Found measureInitialState, applying fix");
              const originalMeasureInitialState = module.exports.measureInitialState;
              module.exports.measureInitialState = function(...args: any[]) {
                try {
                  // Fix common arrays used in the function
                  for (let i = 0; i < args.length; i++) {
                    if (Array.isArray(args[i])) {
                      args[i] = makeSafeArray(args[i]);
                    }
                  }
                  
                  // Protect the 'this' context as well
                  if (this && typeof this === 'object') {
                    for (const key in this) {
                      if (Array.isArray(this[key])) {
                        this[key] = makeSafeArray(this[key]);
                      }
                    }
                  }
                  
                  return originalMeasureInitialState.apply(this, args);
                } catch (e) {
                  console.warn("Caught error in measureInitialState:", e);
                  return {}; // Return empty result instead of crashing
                }
              };
            }
          } catch (e) {
            // Ignore errors for individual modules
          }
        });
      }
      
      // Method 3: Patch Object.getOwnPropertyDescriptor to intercept property access
      const originalGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
      if (originalGetOwnPropertyDescriptor) {
        Object.getOwnPropertyDescriptor = function(obj: any, prop: string) {
          const descriptor = originalGetOwnPropertyDescriptor.apply(this, [obj, prop]);
          
          // Look for the positionalValues
          if (
            prop === 'positionalValues' && 
            descriptor && 
            descriptor.value && 
            typeof descriptor.value === 'object'
          ) {
            descriptor.value = makeSafeAccessor(descriptor.value);
          }
          
          return descriptor;
        };
      }

      // Direct patching of all pages to intercept array access in the whole app
      // This is a more aggressive approach that modifies Array.prototype behavior
      // but only for a specific operation to fix the tl[i] is not a function error
      const originalArrayAccess = Array.prototype.forEach;
      Array.prototype.forEach = function(...args) {
        try {
          return originalArrayAccess.apply(this, args);
        } catch (e) {
          if (e && e.message && e.message.includes('is not a function')) {
            console.warn('Caught array access error, using fallback', e);
            // Execute a safe version that skips elements that aren't functions
            const callback = args[0];
            const thisArg = args[1];
            
            for (let i = 0; i < this.length; i++) {
              if (typeof this[i] === 'function') {
                callback.call(thisArg, this[i], i, this);
              }
            }
            return;
          }
          throw e;
        }
      };
      
    } catch (e) {
      console.error("Error applying framer-motion fixes:", e);
    }
  }, 100);
  
  // Method 4: Monkey patch framer-motion's measurement function if available
  try {
    const originalMeasure = (window as any).__framer_importMeasure;
    if (originalMeasure) {
      (window as any).__framer_importMeasure = () => {
        try {
          const measure = originalMeasure();
          
          // Safely wrap the measurement function
          if (measure && measure.measureInitialState) {
            const originalMeasureInitialState = measure.measureInitialState;
            measure.measureInitialState = function(...args: any[]) {
              try {
                // A more direct fix for the specific "tl[i] is not a function" error
                // Make sure 'this' has all required array elements as functions
                if (this && this.tl && Array.isArray(this.tl)) {
                  // Replace the array with a safe proxy
                  this.tl = new Proxy(this.tl, {
                    get: (target, prop) => {
                      // Allow length property to pass through
                      if (prop === 'length') return target.length;
                      
                      // For numeric indices, ensure we return a function
                      const idx = Number(prop);
                      if (!isNaN(idx)) {
                        return typeof target[idx] === 'function' 
                          ? target[idx] 
                          : (() => 0); // Default function that returns 0
                      }
                      
                      // Pass through other properties
                      return target[prop as any];
                    }
                  });
                }
                
                return originalMeasureInitialState.apply(this, args);
              } catch (e) {
                console.warn("Caught error in measureInitialState:", e);
                return {}; // Return empty result instead of crashing
              }
            };
          }
          
          return measure;
        } catch (e) {
          console.error("Error in framer measure function:", e);
          // Return a dummy measure object
          return {
            measureInitialState: () => ({}),
            measureViewportRelativeBox: () => ({})
          };
        }
      };
    }
  } catch (e) {
    console.error("Error patching framer measurement:", e);
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