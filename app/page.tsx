import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { Analytics } from "@/components/utils/analytics"

// Import all section components from the sections directory
import { CurriculumSection } from "@/components/sections/curriculum-section"
import { EnrollmentSection } from "@/components/sections/enrollment-section"
import { EnhancedFaqSection } from "@/components/sections/enhanced-faq-section"
import { HeroSection } from "@/components/sections/hero-section"
import { TrustSection } from "@/components/sections/trust-section"
import { ValueSection } from "@/components/sections/value-section"
import { InstructorSection } from "@/components/sections/instructor-section"
import { PricingSection } from "@/components/sections/pricing-section"
import { StudentSuccessStoriesSection } from "@/components/sections/student-success-stories-section"
import { CommunitySection } from "@/components/sections/community-section"
import { PromptEngineeringSection } from "@/components/sections/prompt-engineering-section"
import { MetaphoricalJourneySection } from "@/components/sections/metaphorical-journey-section"
import { DarkModeToggle } from "@/components/sections/dark-mode-toggle"

// Add the FloatingStudentAvatars component import
import { FloatingStudentAvatars } from "@/components/shared/floating-student-avatars"

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
          {/* <MetaphoricalJourneySection /> */}
          {/* <PromptEngineeringSection /> */}
          <CurriculumSection />
          {/* <StudentSuccessStoriesSection /> */}
          <InstructorSection />
          <CommunitySection />
          <PricingSection />
          <EnhancedFaqSection />
          <EnrollmentSection />
        </main>
        <SiteFooter />
      </div>
      <FloatingStudentAvatars />
      <DarkModeToggle />
    </>
  )
}

