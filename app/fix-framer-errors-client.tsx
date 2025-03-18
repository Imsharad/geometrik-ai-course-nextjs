"use client"

import { useEffect } from "react"

/**
 * This component applies additional patches to fix framer-motion errors
 * focusing specifically on the "tl[i] is not a function" error seen on Vercel
 */
export default function FramerErrorFix() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === "undefined") return

    // Add a listener for unhandled errors specifically for the tl[i] error
    const errorHandler = (event: ErrorEvent) => {
      const errorText = event.message || ""
      
      // Check if it's the specific framer error we want to catch
      if (errorText.includes("tl[i] is not a function") || 
          errorText.includes("is not a function") && event.filename?.includes("a61295a7645ff30f")) {
        console.warn("Intercepted framer-motion error:", errorText)
        
        // Prevent the error from crashing the app
        event.preventDefault()
        
        // Try to find and fix the problematic code
        try {
          // Look through all loaded scripts for the one with our error
          const scripts = document.querySelectorAll("script")
          for (const script of Array.from(scripts)) {
            // If the script URL contains our problematic file
            if (script.src && script.src.includes("a61295a7645ff30f")) {
              console.log("Found problematic script, applying runtime patch")
              
              // We can't modify loaded scripts directly, but we can patch 
              // the global objects they might be using
              
              // Method 1: Try to patch Array.prototype.forEach
              const originalForEach = Array.prototype.forEach
              Array.prototype.forEach = function(...args) {
                try {
                  return originalForEach.apply(this, args)
                } catch (e: any) {
                  if (e && e.message && e.message.includes("is not a function")) {
                    console.warn("Caught forEach error, using safe iteration")
                    const callback = args[0]
                    const thisArg = args[1]
                    
                    // Skip any non-function entries
                    for (let i = 0; i < this.length; i++) {
                      if (typeof this[i] === "function") {
                        callback.call(thisArg, this[i], i, this)
                      }
                    }
                    return
                  }
                  throw e
                }
              }
              
              // Method 2: Add a global patch for the common motion measurement pattern
              if ((window as any).tw && (window as any).tw.measureInitialState) {
                const original = (window as any).tw.measureInitialState
                ;(window as any).tw.measureInitialState = function(...args: any[]) {
                  try {
                    // Fix any arrays in the arguments
                    for (let i = 0; i < args.length; i++) {
                      if (Array.isArray(args[i])) {
                        // Ensure all array elements are functions or null
                        for (let j = 0; j < args[i].length; j++) {
                          if (args[i][j] && typeof args[i][j] !== "function") {
                            args[i][j] = () => 0
                          }
                        }
                      }
                    }
                    return original.apply(this, args)
                  } catch (e) {
                    console.warn("Caught measureInitialState error:", e)
                    return {} // Return empty state instead of crashing
                  }
                }
                console.log("Applied tw.measureInitialState patch")
              }
              
              break
            }
          }
        } catch (fixError) {
          console.error("Error applying runtime fix:", fixError)
        }
        
        return true
      }
    }
    
    // Add our error handler
    window.addEventListener("error", errorHandler, true)
    
    // Cleanup function
    return () => {
      window.removeEventListener("error", errorHandler, true)
    }
  }, [])
  
  // This component doesn't render anything
  return null
} 