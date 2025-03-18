import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { InstructorSection } from "@/components/sections/instructor-section"
import { Analytics } from "@/components/utils/analytics"

export default function InstructorPage() {
  return (
    <>
      <Analytics />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Meet Your Instructor</h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Learn from an industry expert with years of real-world experience.
                Our instructor brings practical knowledge and insights to every lesson.
              </p>
            </div>
          </section>
          <InstructorSection />
        </main>
        <SiteFooter />
      </div>
    </>
  )
} 