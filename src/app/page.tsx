import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Analytics } from "@/components/utils/analytics"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Import all section components from the sections directory
import { HeroSection } from "@/components/sections/hero-section"
import { TrustSection } from "@/components/sections/trust-section"
import { ValueSection } from "@/components/sections/value-section"

// Add the FloatingStudentAvatars component import
import { FloatingStudentAvatars } from "@/components/shared/floating-student-avatars"
import { DarkModeToggle } from "@/components/sections/dark-mode-toggle"

// Update the HomePage component to include the new PromptEngineeringSection
export default function HomePage() {
  return (
    <>
      <Analytics />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <HeroSection />
          <TrustSection />
          <ValueSection />
        </main>
        <SiteFooter />
      </div>
      <FloatingStudentAvatars />
      <DarkModeToggle />
    </>
  )
}

