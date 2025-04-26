import type React from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

export interface PreparationStep {
  id: number
  title: string
  description: string
  link: string
  icon: React.ReactNode
}

interface SuccessMessageProps {
  preparationSteps: PreparationStep[]
}

export function SuccessMessage({ preparationSteps }: SuccessMessageProps) {
  return (
    <div className="md:col-span-2 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-black/5 flex items-center justify-center mb-6">
        <CheckCircle className="h-8 w-8 text-black" />
      </div>

      <h3 className="text-2xl font-bold tracking-tight mb-3">Enrollment Complete!</h3>
      <p className="text-gray-500 max-w-xl mx-auto mb-10">
        Thank you for enrolling in our course. We're excited to have you join our community of learners. Here are some
        next steps to get you started on your learning journey.
      </p>

      <h4 className="text-xl font-bold mb-6">Prepare for Success</h4>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-10">
        {preparationSteps.map((step) => (
          <Card key={step.id} className="text-left border-0 shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center mb-2">{step.icon}</div>
              <CardTitle className="text-base">{step.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500">{step.description}</p>
            </CardContent>
            <CardFooter>
              <Button variant="link" asChild className="px-0 text-black hover:text-gray-700">
                <Link href={step.link} className="flex items-center">
                  Get Started <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="space-x-4">
        <Button asChild size="lg" className="bg-black hover:bg-gray-800 text-white">
          <Link href="#dashboard">Go to Your Dashboard</Link>
        </Button>
        <Button variant="outline" asChild size="lg">
          <Link href="#start-learning">Begin First Module</Link>
        </Button>
      </div>
    </div>
  )
}

