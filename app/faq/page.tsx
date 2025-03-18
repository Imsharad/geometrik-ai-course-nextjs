import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { EnhancedFaqSection } from "@/components/sections/enhanced-faq-section"
import { Analytics } from "@/components/utils/analytics"

export default function FaqPage() {
  return (
    <>
      <Analytics />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Find answers to your questions about course content, enrollment, payment options,
                and more. If you can't find what you're looking for, feel free to contact us.
              </p>
            </div>
          </section>
          <EnhancedFaqSection />
        </main>
        <SiteFooter />
      </div>
    </>
  )
} 