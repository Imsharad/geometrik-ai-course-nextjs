"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { BadgeDollarSign, Calculator, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"

export function ROICalculator() {
  // State for input values
  const [currentSalary, setCurrentSalary] = useState(60000)
  const [percentageIncrease, setPercentageIncrease] = useState(20)
  const [courseInvestment] = useState(999)

  // State for calculated values
  const [potentialIncrease, setPotentialIncrease] = useState(0)
  const [roi, setRoi] = useState(0)

  // Calculate values when inputs change
  useEffect(() => {
    // Calculate potential annual increase
    const increase = (currentSalary * percentageIncrease) / 100
    setPotentialIncrease(increase)

    // Calculate ROI (return on investment)
    const calculatedRoi = increase / courseInvestment
    setRoi(calculatedRoi)
  }, [currentSalary, percentageIncrease, courseInvestment])

  // Handle salary input change
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setCurrentSalary(value)
    }
  }

  // Handle percentage input change
  const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value) && value >= 5 && value <= 50) {
      setPercentageIncrease(value)
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
      <h3 className="text-lg font-bold mb-6">
        ROI Calculator{" "}
        <Badge variant="outline" className="ml-2 bg-amber-50 text-amber-500 border-amber-100 text-xs">
          Interactive
        </Badge>
      </h3>

      <div className="border rounded-lg p-6 bg-white h-[calc(100%-3rem)]">
        <div className="space-y-6">
          {/* Current Annual Salary */}
          <div className="space-y-2">
            <label className="text-xs font-medium flex items-center gap-1">
              <span>Current Annual Salary</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Enter your current annual salary before taxes</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="relative">
              <BadgeDollarSign className="absolute left-2 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                type="number"
                value={currentSalary}
                min={0}
                step={1000}
                className="w-full pl-7 pr-4 py-2 text-sm rounded-md border bg-background"
                onChange={handleSalaryChange}
              />
            </div>
            <div className="flex justify-between text-[10px] text-muted-foreground">
              <span>$0</span>
              <span>$50k</span>
              <span>$100k</span>
              <span>$150k+</span>
            </div>
          </div>

          {/* Potential Salary Increase */}
          <div className="space-y-2">
            <label className="text-xs font-medium flex items-center gap-1">
              <span>Potential Salary Increase (%)</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-3 w-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">Average salary increase after completing the course</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </label>
            <div className="relative">
              <input
                type="number"
                value={percentageIncrease}
                min={5}
                max={50}
                className="w-full px-3 py-2 text-sm rounded-md border bg-background"
                onChange={handlePercentageChange}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">%</div>
            </div>
            <div className="pt-2">
              <Slider
                value={[percentageIncrease]}
                min={5}
                max={50}
                step={1}
                className="w-full"
                onValueChange={(value) => handleSliderChange(value)}
              />
            </div>
          </div>

          {/* Results Section */}
          <div className="space-y-3 pt-2">
            {/* Course Investment */}
            <div className="flex justify-between items-center py-1">
              <span className="text-xs">Course Investment</span>
              <span className="text-xs font-medium">{formatCurrency(courseInvestment)}</span>
            </div>

            {/* Potential Annual Increase */}
            <div className="flex justify-between items-center py-1">
              <span className="text-xs">Potential Annual Increase</span>
              <span className="text-xs font-medium text-primary">{formatCurrency(potentialIncrease)}</span>
            </div>

            {/* ROI */}
            <div className="flex justify-between items-center py-1 border-t pt-3">
              <span className="text-xs font-medium">ROI (1st year)</span>
              <span className="text-sm font-bold text-primary">{roi.toFixed(1)}x return</span>
            </div>
          </div>

          {/* Pro Tip */}
          <div className="pt-2">
            <div className="bg-blue-50 rounded-md p-3 border border-blue-100 text-xs text-muted-foreground">
              <p>
                <span className="font-medium text-foreground">Pro Tip:</span> Most students report recovering their
                course investment within 1-3 months through salary increases or new job opportunities.
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
      </div>
    </div>
  )
}

