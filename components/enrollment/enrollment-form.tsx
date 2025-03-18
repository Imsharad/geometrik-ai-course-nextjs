"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export interface Plan {
  id: string
  name: string
  price: string
  description: string
  recommended?: boolean
}

interface EnrollmentFormProps {
  plans: Plan[]
  onSubmit: (e: React.FormEvent) => void
  selectedPlan: string
  setSelectedPlan: (value: string) => void
}

export function EnrollmentForm({ plans, onSubmit, selectedPlan, setSelectedPlan }: EnrollmentFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-6">
      <div className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" required />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required />
        </div>
      </div>

      <div className="space-y-4">
        <Label>Select Your Plan</Label>
        <RadioGroup defaultValue={selectedPlan} onValueChange={setSelectedPlan}>
          <div className="space-y-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`flex items-center space-x-2 rounded-lg border p-4 cursor-pointer hover:bg-muted ${
                  plan.recommended ? "border-primary" : ""
                }`}
              >
                <RadioGroupItem value={plan.id} id={plan.id} />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <Label htmlFor={plan.id} className="font-medium cursor-pointer">
                      {plan.name}
                      {plan.recommended && (
                        <span className="ml-2 text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                    </Label>
                    <span className="font-bold">{plan.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                </div>
              </div>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox id="terms" required />
        <div className="grid gap-1.5 leading-none">
          <Label
            htmlFor="terms"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            I agree to the{" "}
            <Link href="#terms" className="text-primary underline">
              terms and conditions
            </Link>
          </Label>
          <p className="text-sm text-muted-foreground">
            By enrolling, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Complete Enrollment <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

