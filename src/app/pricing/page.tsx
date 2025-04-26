import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { PricingSection } from "@/components/sections/pricing-section"
import { Analytics } from "@/components/utils/analytics"

export default function PricingPage() {
  return (
    <>
      <Analytics />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Pricing & Plans</h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Choose the plan that fits your needs and budget. All plans include lifetime access
                to course materials and updates. Flexible payment options are available.
              </p>
            </div>
          </section>
          <PricingSection />
        </main>
        <SiteFooter />
      </div>
    </>
  )
} 