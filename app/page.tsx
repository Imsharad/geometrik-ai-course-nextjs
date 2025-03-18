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
          
          {/* Curriculum Summary Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Curriculum Overview</h2>
                    <p className="text-gray-600 max-w-2xl">Our comprehensive curriculum is designed to take you from basics to advanced techniques.</p>
                  </div>
                  <Link href="/curriculum" className="mt-4 md:mt-0">
                    <Button variant="outline" className="group">
                      View Curriculum
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-lg">Course modules preview</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Instructor Summary Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Your Instructor</h2>
                    <p className="text-gray-600 max-w-2xl">Learn from industry experts with years of real-world experience.</p>
                  </div>
                  <Link href="/instructor" className="mt-4 md:mt-0">
                    <Button variant="outline" className="group">
                      Meet the Instructor
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-lg">Instructor profile preview</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Community Summary Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Join Our Community</h2>
                    <p className="text-gray-600 max-w-2xl">Connect with fellow learners and accelerate your growth through collaborative learning.</p>
                  </div>
                  <Link href="/community" className="mt-4 md:mt-0">
                    <Button variant="outline" className="group">
                      Explore Community
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-lg">Community features preview</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* Pricing Summary Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Pricing & Plans</h2>
                    <p className="text-gray-600 max-w-2xl">Choose the plan that fits your needs and budget with our flexible pricing options.</p>
                  </div>
                  <Link href="/pricing" className="mt-4 md:mt-0">
                    <Button variant="outline" className="group">
                      View Pricing
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-lg">Pricing plans preview</p>
                </div>
              </div>
            </div>
          </section>
          
          {/* FAQ Summary Section */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">Frequently Asked Questions</h2>
                    <p className="text-gray-600 max-w-2xl">Find answers to common questions about our course, support, and enrollment process.</p>
                  </div>
                  <Link href="/faq" className="mt-4 md:mt-0">
                    <Button variant="outline" className="group">
                      Browse FAQ
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                </div>
                <div className="h-[250px] bg-gray-100 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500 text-lg">FAQ categories preview</p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </div>
      <FloatingStudentAvatars />
      <DarkModeToggle />
    </>
  )
}

