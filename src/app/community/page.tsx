import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
import { CommunitySection } from "@/components/sections/community-section"
import { Analytics } from "@/components/utils/analytics"

export default function CommunityPage() {
  return (
    <>
      <Analytics />
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex-1">
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl font-bold mb-4">Our Community</h1>
              <p className="text-lg text-gray-600 max-w-3xl">
                Connect with fellow learners, share insights, and accelerate your learning through
                our vibrant and supportive community. Join discussion forums, attend events, and build
                valuable connections.
              </p>
            </div>
          </section>
          <CommunitySection />
        </main>
        <SiteFooter />
      </div>
    </>
  )
} 