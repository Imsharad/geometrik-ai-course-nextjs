import { Metadata } from "next"
import { SiteHeader } from "@/components/layout/site-header"
import { EnrollmentSection } from "@/components/sections/enrollment-section"

export const metadata: Metadata = {
  title: "Enroll Now | Geometrik AI Course",
  description: "Complete your enrollment in the #1 AI Career Program. Join 2,500+ students transforming their careers.",
}

export default function EnrollPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Simplified header for enrollment page */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <a href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">Geometrik.ai</span>
          </a>
          <div className="text-sm text-muted-foreground">
            Secure Checkout • 30-Day Guarantee
          </div>
        </div>
      </header>

      <main className="container max-w-7xl mx-auto px-4 py-8">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-2 text-sm">
            <span className="text-muted-foreground">Course Selection</span>
            <span className="text-muted-foreground">→</span>
            <span className="font-medium text-primary">Account Setup</span>
            <span className="text-muted-foreground">→</span>
            <span className="text-muted-foreground">Confirmation</span>
          </div>
        </div>

        <EnrollmentSection />
      </main>
    </div>
  )
} 