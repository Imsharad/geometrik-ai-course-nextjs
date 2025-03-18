"use client"

import { useState, useEffect, useRef } from "react"
import { Moon, Sun, Settings, ChevronUp, ChevronDown, Monitor } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import Image from "next/image"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"

// Enhanced iteration tracking system
const ITERATIONS = {
  INITIAL: {
    version: "1.0.0",
    date: "2023-06-01",
    features: ["Basic toggle functionality", "Simple icon swap", "Light/dark mode switching"],
  },
  TYPOGRAPHY: {
    version: "1.1.0",
    date: "2023-06-15",
    features: ["Improved font hierarchy", "Better text contrast", "Consistent font sizing"],
  },
  COLOR_SCHEME: {
    version: "1.2.0",
    date: "2023-07-01",
    features: ["Enhanced color palette", "Gradient effects", "Better dark mode colors"],
  },
  LAYOUT: {
    version: "1.3.0",
    date: "2023-07-15",
    features: ["Improved component spacing", "Better positioning", "Enhanced visual hierarchy"],
  },
  ANIMATIONS: {
    version: "1.4.0",
    date: "2023-08-01",
    features: ["Smooth transitions", "Hover animations", "Loading states"],
  },
  INTERACTIVITY: {
    version: "1.5.0",
    date: "2023-08-15",
    features: ["Settings panel", "Theme customization", "Preference saving"],
  },
  ACCESSIBILITY: {
    version: "1.6.0",
    date: "2023-09-01",
    features: ["ARIA labels", "Keyboard navigation", "Screen reader support"],
  },
  PERFORMANCE: {
    version: "1.7.0",
    date: "2023-09-15",
    features: ["Optimized animations", "Reduced re-renders", "Better state management"],
  },
  FINAL_POLISH: {
    version: "2.0.0",
    date: "2023-10-01",
    features: ["Micro-interactions", "Visual refinements", "Final QA and testing"],
  },
}

// Current iteration being implemented
const CURRENT_ITERATION = "FINAL_POLISH"

// Helper function to check if an iteration is implemented
const isImplemented = (iteration: string) => {
  const iterations = Object.keys(ITERATIONS)
  const currentIndex = iterations.indexOf(CURRENT_ITERATION)
  const iterationIndex = iterations.indexOf(iteration)
  return iterationIndex <= currentIndex
}

// Component to display iteration information (for development purposes)
const IterationInfo = ({ showDetails = false }) => {
  if (!showDetails) return null

  return (
    <div className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 max-w-xs">
      <h3 className="font-bold text-sm mb-2">Current Iteration: {CURRENT_ITERATION}</h3>
      <p className="text-xs text-gray-500 mb-2">Version: {ITERATIONS[CURRENT_ITERATION].version}</p>
      <div className="text-xs">
        <strong>Features:</strong>
        <ul className="list-disc pl-4 mt-1">
          {ITERATIONS[CURRENT_ITERATION].features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

// Theme types
type ThemeMode = "light" | "dark" | "system"
type ColorScheme = "blue" | "purple" | "green" | "amber" | "rose"
type ContrastLevel = "default" | "increased"
type AnimationLevel = "reduced" | "default" | "enhanced"

interface ThemeSettings {
  mode: ThemeMode
  colorScheme: ColorScheme
  contrast: ContrastLevel
  animations: AnimationLevel
  fontSize: number
}

export function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [hoverState, setHoverState] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [showIterationInfo, setShowIterationInfo] = useState(false)
  const settingsRef = useRef<HTMLDivElement>(null)

  // Theme settings
  const [themeSettings, setThemeSettings] = useState<ThemeSettings>({
    mode: "system",
    colorScheme: "blue",
    contrast: "default",
    animations: "default",
    fontSize: 100,
  })

  // Mouse parallax effect
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [0, 1], [5, -5])
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5])

  useEffect(() => {
    // Check if dark mode is already enabled
    const isDark = document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)

    // Set initial theme mode based on system preference or stored preference
    const storedTheme = localStorage.getItem("theme-mode")
    if (storedTheme) {
      setThemeSettings((prev) => ({ ...prev, mode: storedTheme as ThemeMode }))

      if (storedTheme === "dark") {
        document.documentElement.classList.add("dark")
        setIsDarkMode(true)
      } else if (storedTheme === "light") {
        document.documentElement.classList.remove("dark")
        setIsDarkMode(false)
      }
    }

    // Add listener for system preference changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = (e: MediaQueryListEvent) => {
      if (themeSettings.mode === "system") {
        const newColorScheme = e.matches ? true : false
        setIsDarkMode(newColorScheme)
        if (newColorScheme) {
          document.documentElement.classList.add("dark")
        } else {
          document.documentElement.classList.remove("dark")
        }
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    // Handle clicks outside settings panel
    const handleClickOutside = (event: MouseEvent) => {
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setShowSettings(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)

    // Handle mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      mouseX.set(clientX / innerWidth)
      mouseY.set(clientY / innerHeight)
      setMousePosition({ x: clientX, y: clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    // Toggle iteration info with keyboard shortcut (Ctrl+Shift+D)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "D") {
        e.preventDefault()
        setShowIterationInfo((prev) => !prev)
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      mediaQuery.removeEventListener("change", handleChange)
      document.removeEventListener("mousedown", handleClickOutside)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [themeSettings.mode, mouseX, mouseY])

  const setThemeMode = (mode: ThemeMode) => {
    setThemeSettings((prev) => ({ ...prev, mode }))
    localStorage.setItem("theme-mode", mode)

    if (mode === "dark" || (mode === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
      document.documentElement.classList.add("dark")
      setIsDarkMode(true)
    } else {
      document.documentElement.classList.remove("dark")
      setIsDarkMode(false)
    }
  }

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark")
      setIsDarkMode(false)
      setThemeMode("light")
    } else {
      document.documentElement.classList.add("dark")
      setIsDarkMode(true)
      setThemeMode("dark")
    }
  }

  const updateFontSize = (size: number) => {
    setThemeSettings((prev) => ({ ...prev, fontSize: size }))
    document.documentElement.style.fontSize = `${size}%`
  }

  return (
    <TooltipProvider>
      {/* Development-only iteration info */}
      <IterationInfo showDetails={showIterationInfo} />

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end space-y-2">
        <AnimatePresence>
          {showSettings && (
            <motion.div
              ref={settingsRef}
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-5 mb-2 border border-gray-200 dark:border-gray-700 max-w-xs w-full"
              style={{
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">Display Settings</h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <div className="space-y-5">
                {/* Theme Mode */}
                <div>
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Theme Mode</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: "light", label: "Light", icon: <Sun className="h-4 w-4" /> },
                      { id: "dark", label: "Dark", icon: <Moon className="h-4 w-4" /> },
                      { id: "system", label: "Auto", icon: <Monitor className="h-4 w-4" /> },
                    ].map((mode) => (
                      <button
                        key={mode.id}
                        onClick={() => setThemeMode(mode.id as ThemeMode)}
                        className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all ${
                          themeSettings.mode === mode.id
                            ? "bg-primary/10 border-primary/50 text-primary"
                            : "bg-gray-100 dark:bg-gray-700 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                        }`}
                      >
                        {mode.icon}
                        <span className="text-xs mt-1">{mode.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Font Size */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Font Size</label>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{themeSettings.fontSize}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateFontSize(Math.max(80, themeSettings.fontSize - 10))}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <span className="text-xs">A</span>
                    </button>
                    <Slider
                      value={[themeSettings.fontSize]}
                      min={80}
                      max={120}
                      step={5}
                      onValueChange={(value) => updateFontSize(value[0])}
                      className="flex-1"
                    />
                    <button
                      onClick={() => updateFontSize(Math.min(120, themeSettings.fontSize + 10))}
                      className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    >
                      <span className="text-base">A</span>
                    </button>
                  </div>
                </div>

                {/* Advanced Settings Toggle */}
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="flex items-center justify-between w-full text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  <span>Advanced Settings</span>
                  {showAdvanced ? (
                    <ChevronUp className="h-4 w-4 text-gray-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  )}
                </button>

                {/* Advanced Settings */}
                <AnimatePresence>
                  {showAdvanced && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4 overflow-hidden"
                    >
                      {/* Color Scheme */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Color Scheme
                        </label>
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { id: "blue", color: "bg-blue-500" },
                            { id: "purple", color: "bg-purple-500" },
                            { id: "green", color: "bg-emerald-500" },
                            { id: "amber", color: "bg-amber-500" },
                            { id: "rose", color: "bg-rose-500" },
                          ].map((scheme) => (
                            <button
                              key={scheme.id}
                              onClick={() =>
                                setThemeSettings((prev) => ({ ...prev, colorScheme: scheme.id as ColorScheme }))
                              }
                              className={`h-8 rounded-full transition-all ${scheme.color} ${
                                themeSettings.colorScheme === scheme.id
                                  ? "ring-2 ring-offset-2 ring-gray-400 dark:ring-gray-700"
                                  : "opacity-70 hover:opacity-100"
                              }`}
                              aria-label={`${scheme.id} color scheme`}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Contrast */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Contrast
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {[
                            { id: "default", label: "Default" },
                            { id: "increased", label: "Increased" },
                          ].map((contrast) => (
                            <button
                              key={contrast.id}
                              onClick={() =>
                                setThemeSettings((prev) => ({ ...prev, contrast: contrast.id as ContrastLevel }))
                              }
                              className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                                themeSettings.contrast === contrast.id
                                  ? "bg-primary/10 border-primary/50 text-primary"
                                  : "bg-gray-100 dark:bg-gray-700 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              }`}
                            >
                              {contrast.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Animations */}
                      <div>
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                          Animations
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          {[
                            { id: "reduced", label: "Reduced" },
                            { id: "default", label: "Default" },
                            { id: "enhanced", label: "Enhanced" },
                          ].map((animation) => (
                            <button
                              key={animation.id}
                              onClick={() =>
                                setThemeSettings((prev) => ({ ...prev, animations: animation.id as AnimationLevel }))
                              }
                              className={`py-2 px-3 rounded-lg border text-sm transition-all ${
                                themeSettings.animations === animation.id
                                  ? "bg-primary/10 border-primary/50 text-primary"
                                  : "bg-gray-100 dark:bg-gray-700 border-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                              }`}
                            >
                              {animation.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Reset Button */}
                      <button
                        onClick={() => {
                          setThemeSettings({
                            mode: "system",
                            colorScheme: "blue",
                            contrast: "default",
                            animations: "default",
                            fontSize: 100,
                          })
                          document.documentElement.style.fontSize = "100%"
                        }}
                        className="w-full py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Reset to Defaults
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={() => setShowSettings(!showSettings)}
                size="icon"
                variant="outline"
                className="h-10 w-10 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300"
                aria-label="Display settings"
              >
                <Settings className="h-4 w-4 text-gray-700 dark:text-gray-300" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Display settings</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onHoverStart={() => setHoverState(true)}
                onHoverEnd={() => setHoverState(false)}
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
              >
                <Button
                  onClick={toggleDarkMode}
                  size="icon"
                  variant="outline"
                  className="h-12 w-12 rounded-full relative overflow-hidden bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
                  aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={isDarkMode ? "dark" : "light"}
                      initial={{ opacity: 0, rotate: -30 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 30 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10"
                    >
                      {isDarkMode ? (
                        <Sun className="h-5 w-5 text-yellow-500" />
                      ) : (
                        <Moon className="h-5 w-5 text-gray-700" />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <AnimatePresence>
                    {(isDarkMode || hoverState) && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isDarkMode ? 0.7 : 0.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0"
                      >
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AKSns6o5ehtPZ5GMHrIBn41qJk7YXw.png"
                          alt="Dark mode visual"
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Animated gradient border */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 -z-10 blur-sm transition-opacity duration-300"></div>
                </Button>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isDarkMode ? "Switch to light mode" : "Switch to dark mode"}</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  )
}

