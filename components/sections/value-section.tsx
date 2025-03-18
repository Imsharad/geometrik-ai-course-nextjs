"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence } from "@/app/fix-framer-motion"
import { ValueProposition } from "@/components/shared/value-proposition"
import { BadgeDollarSign, Calculator, HelpCircle, Lightbulb, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 15, duration: 0.6 },
  },
}

export function ValueSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-white to-gray-50" id="value">
      <motion.div
        className="container px-4 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="max-w-3xl mx-auto text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
            Transformative Value for Your Career
          </h2>
          <p className="text-gray-600 text-lg">
            Understand how our course addresses your challenges and provides concrete solutions for your professional
            growth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-10 mb-20">
          {/* Problem-Solution Framework - 3 columns */}
          <motion.div className="md:col-span-3 space-y-8" variants={itemVariants}>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                <Lightbulb className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold">Problem-Solution Framework</h3>
            </div>

            <ProblemSolutionFramework />
          </motion.div>

          {/* ROI Calculator - 2 columns */}
          <motion.div className="md:col-span-2" variants={itemVariants}>
            <ROICalculator />
          </motion.div>
        </div>

        {/* Additional value propositions */}
        <motion.div variants={itemVariants}>
          <ValueProposition variant="competitive" variants={itemVariants} />
        </motion.div>
      </motion.div>
    </section>
  )
}

function ProblemSolutionFramework() {
  // Problem-solution pairs
  const pairs = [
    {
      problem: {
        title: "Lack of structured knowledge",
        description: "Random tutorials and fragmented resources don't provide a comprehensive understanding",
        icon: <HelpCircle className="h-4 w-4" />,
      },
      solution: {
        title: "Comprehensive curriculum",
        description: "Structured learning path that builds your knowledge systematically",
        icon: <CheckCircle className="h-4 w-4" />,
      },
    },
    {
      problem: {
        title: "Theory without application",
        description: "Most courses focus on concepts without practical implementation guidance",
        icon: <HelpCircle className="h-4 w-4" />,
      },
      solution: {
        title: "Practical projects",
        description: "Real-world applications and exercises to reinforce every concept",
        icon: <CheckCircle className="h-4 w-4" />,
      },
    },
    {
      problem: {
        title: "Undefined career path",
        description: "Uncertainty about how to leverage skills for career advancement",
        icon: <HelpCircle className="h-4 w-4" />,
      },
      solution: {
        title: "Career roadmap",
        description: "Clear guidance on how to apply skills for professional growth",
        icon: <CheckCircle className="h-4 w-4" />,
      },
    },
  ]

  return (
    <div className="space-y-6">
      {pairs.map((pair, index) => (
        <motion.div
          key={index}
          className="grid grid-cols-2 gap-4"
          variants={itemVariants}
          custom={index}
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <div className="p-5 bg-red-50 rounded-xl border border-red-100 h-full">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-red-500 bg-white p-1.5 rounded-full">{pair.problem.icon}</div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-red-800">{pair.problem.title}</h4>
                <p className="text-xs text-red-700/80">{pair.problem.description}</p>
              </div>
            </div>
          </div>

          <div className="p-5 bg-blue-50 rounded-xl border border-blue-100 h-full">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-blue-500 bg-white p-1.5 rounded-full">{pair.solution.icon}</div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-blue-800">{pair.solution.title}</h4>
                <p className="text-xs text-blue-700/80">{pair.solution.description}</p>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

function ROICalculator() {
  // State for input values
  const [currentSalary, setCurrentSalary] = useState(60000)
  const [percentageIncrease, setPercentageIncrease] = useState(20)
  const [courseInvestment] = useState(999)

  // State for calculated values
  const [potentialIncrease, setPotentialIncrease] = useState(0)
  const [roi, setRoi] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  // Calculate values when inputs change
  useEffect(() => {
    setIsCalculating(true)

    const timer = setTimeout(() => {
      // Calculate potential annual increase
      const increase = (currentSalary * percentageIncrease) / 100
      setPotentialIncrease(increase)

      // Calculate ROI (return on investment)
      const calculatedRoi = increase / courseInvestment
      setRoi(calculatedRoi)

      setIsCalculating(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [currentSalary, percentageIncrease, courseInvestment])

  // Handle salary input change
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setCurrentSalary(value)
    }
  }

  // Handle slider change
  const handleSliderChange = (value: number[]) => {
    setPercentageIncrease(value[0])
  }

  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <div className="h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 rounded-full bg-emerald-50 text-emerald-600">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">ROI Calculator</h3>
          <Badge variant="outline" className="mt-1 bg-amber-50 text-amber-600 border-amber-100 text-xs">
            Interactive
          </Badge>
        </div>
      </div>

      <motion.div
        className="border rounded-xl p-6 bg-white shadow-sm h-[calc(100%-3rem)]"
        variants={itemVariants}
        whileHover={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" }}
      >
        <div className="space-y-6">
          {/* Current Annual Salary */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-1">
              <span>Current Annual Salary</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Enter your current annual salary before taxes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="relative">
              <BadgeDollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <input
                type="number"
                value={currentSalary}
                min={0}
                step={1000}
                className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50 transition-all"
                onChange={handleSalaryChange}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>$0</span>
              <span>$50k</span>
              <span>$100k</span>
              <span>$150k+</span>
            </div>
          </div>

          {/* Potential Salary Increase */}
          <div className="space-y-3">
            <label className="text-sm font-medium flex items-center gap-1">
              <span>Potential Salary Increase (%)</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Average salary increase after completing the course</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Slider
                  value={[percentageIncrease]}
                  min={5}
                  max={50}
                  step={1}
                  className="w-full"
                  onValueChange={(value) => handleSliderChange(value)}
                />
              </div>
              <div className="w-16 h-10 rounded-lg bg-gray-50 border border-gray-200 flex items-center justify-center text-sm font-medium">
                {percentageIncrease}%
              </div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 px-1">
              <span>5%</span>
              <span>20%</span>
              <span>35%</span>
              <span>50%</span>
            </div>
          </div>

          {/* Results Section */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentSalary}-${percentageIncrease}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="mt-6 p-5 rounded-xl bg-gray-50 border border-gray-100"
            >
              <div className="space-y-4">
                {/* Course Investment */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Course Investment</span>
                  <span className="text-sm font-medium">{formatCurrency(courseInvestment)}</span>
                </div>

                {/* Potential Annual Increase */}
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Potential Annual Increase</span>
                  <span className="text-sm font-medium text-emerald-600">{formatCurrency(potentialIncrease)}</span>
                </div>

                {/* ROI */}
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">ROI (1st year)</span>
                    <span className="text-base font-bold text-emerald-600">{roi.toFixed(1)}x return</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Pro Tip */}
          <div className="pt-2">
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex items-start gap-3">
              <Info className="h-4 w-4 text-blue-500 mt-0.5 shrink-0" />
              <p className="text-xs text-gray-700">
                <span className="font-medium text-gray-900">Pro Tip:</span> Most students report recovering their course
                investment within 1-3 months through salary increases or new job opportunities.
              </p>
            </div>
          </div>

          {/* Reset Button */}
          <div className="flex justify-center pt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs h-8"
              onClick={() => {
                setCurrentSalary(60000)
                setPercentageIncrease(20)
              }}
            >
              <Calculator className="h-3 w-3 mr-1" />
              <span>Reset Calculator</span>
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

