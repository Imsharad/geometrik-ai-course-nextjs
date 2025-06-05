"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Check, HelpCircle, X } from "lucide-react"
import Link from "next/link"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export interface PlanFeature {
  id: number
  name: string
  included: boolean
  tooltip?: string
}

export interface PricingPlan {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  features: PlanFeature[]
  mostPopular?: boolean
  customOption?: boolean
  ctaText: string
}

interface PricingGuarantee {
  id: number
  title: string
  description: string
}

interface PricingFAQ {
  id: number
  question: string
  answer: string
}

interface PricingSectionProps {
  plans: PricingPlan[]
  guarantees?: PricingGuarantee[]
  faqs?: PricingFAQ[]
  showGuarantees?: boolean
  showFAQs?: boolean
  variants?: any
}

export function PricingSection({
  plans,
  guarantees = [],
  faqs = [],
  showGuarantees = true,
  showFAQs = true,
  variants,
}: PricingSectionProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [isYearly, setIsYearly] = useState(false)

  return (
    <div ref={ref}>
      <motion.div
        className="flex items-center justify-center mt-8 mb-12"
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex items-center space-x-2">
          <Label htmlFor="billing-toggle" className={`text-sm ${!isYearly ? "font-medium" : ""}`}>
            Monthly
          </Label>
          <Switch id="billing-toggle" checked={isYearly} onCheckedChange={setIsYearly} />
          <div className="flex items-center">
            <Label htmlFor="billing-toggle" className={`text-sm ${isYearly ? "font-medium" : ""}`}>
              Annual
            </Label>
            <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">Save 10%</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="grid md:grid-cols-3 gap-6 mb-16"
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {plans.map((plan) => {
          const price = isYearly ? plan.yearlyPrice : plan.monthlyPrice

          return (
            <TooltipProvider key={plan.id}>
              <Card className={`relative overflow-hidden ${plan.mostPopular ? "border-primary shadow-lg" : ""}`}>
                {plan.mostPopular && (
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium z-10">
                    Most Popular
                  </div>
                )}

                <CardHeader className="relative z-10">
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-4xl font-bold">${price}</span>
                    {!plan.customOption && <span className="text-muted-foreground ml-2">one-time payment</span>}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 relative z-10">
                  <div className="space-y-2">
                    {plan.features.map((feature) => (
                      <div
                        key={feature.id}
                        className="flex items-start p-2 rounded-md transition-colors duration-200 hover:bg-muted/50"
                      >
                        {feature.included ? (
                          <div className="h-5 w-5 bg-emerald-100 rounded-full flex items-center justify-center mr-2 shrink-0">
                            <Check className="h-3.5 w-3.5 text-emerald-600" />
                          </div>
                        ) : (
                          <div className="h-5 w-5 bg-red-100 rounded-full flex items-center justify-center mr-2 shrink-0">
                            <X className="h-3.5 w-3.5 text-red-600" />
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <span className={feature.included ? "" : "text-muted-foreground"}>{feature.name}</span>

                          {feature.tooltip && (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <HelpCircle className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="max-w-xs text-xs">{feature.tooltip}</p>
                              </TooltipContent>
                            </Tooltip>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="relative z-10">
                  <Button
                    asChild
                    className="w-full transition-all duration-300"
                    variant={plan.mostPopular ? "default" : "outline"}
                  >
                    <Link href="/enroll">{plan.ctaText}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </TooltipProvider>
          )
        })}
      </motion.div>

      {showGuarantees && guarantees.length > 0 && (
        <motion.div variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-12">
          <h3 className="text-2xl font-bold tracking-tight mb-6 text-center">Our Guarantees</h3>

          <div className="grid sm:grid-cols-3 gap-6">
            {guarantees.map((guarantee) => (
              <div key={guarantee.id} className="text-center p-4">
                <h4 className="font-bold mb-2">{guarantee.title}</h4>
                <p className="text-sm text-muted-foreground">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {showFAQs && faqs.length > 0 && (
        <motion.div variants={variants} initial="hidden" animate={isInView ? "visible" : "hidden"} className="mb-12">
          <h3 className="text-2xl font-bold tracking-tight mb-6 text-center">Frequently Asked Questions</h3>

          <div className="grid gap-4 max-w-3xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.id} className="p-4 bg-muted rounded-lg">
                <h4 className="font-bold mb-2">{faq.question}</h4>
                <p className="text-sm text-muted-foreground">{faq.answer}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <motion.div
        variants={variants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="text-center"
      >
        <p className="text-muted-foreground mb-4">Need a custom solution for your team or organization?</p>
        <Button asChild variant="outline">
          <Link href="#contact">Contact Our Sales Team</Link>
        </Button>
      </motion.div>
    </div>
  )
}

