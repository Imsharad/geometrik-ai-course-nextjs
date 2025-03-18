"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Clock, ArrowRight, Sparkles, Users, BookOpen, Network } from "lucide-react"

export function PremiumOffer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section ref={ref} className="py-24 relative overflow-hidden isolate">
      {/* Glowing background effects */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Subtle gradient base */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>

        {/* Colorful diffused glows */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/10 blur-[120px] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-400/10 blur-[100px] opacity-50"></div>
        <div className="absolute top-2/3 left-1/3 w-[400px] h-[400px] rounded-full bg-teal-400/10 blur-[80px] opacity-40"></div>

        {/* Fine grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), 
                            linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container max-w-4xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-black text-white text-xs font-medium mb-6">
            <Sparkles className="h-3.5 w-3.5 mr-2" /> Exclusive Offer
          </span>

          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Get Exclusive Access to Our Community Portal
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Join our vibrant community of learners and professionals. Connect, collaborate, and accelerate your growth
            with premium resources, expert guidance, and networking opportunities.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-8 mb-12"
        >
          {[
            {
              icon: <Users className="h-5 w-5" />,
              title: "Global Network",
              description: "Connect with over 2,500 professionals from 65+ countries",
            },
            {
              icon: <BookOpen className="h-5 w-5" />,
              title: "Premium Resources",
              description: "Access exclusive templates, guides, and learning materials",
            },
            {
              icon: <Network className="h-5 w-5" />,
              title: "Expert Guidance",
              description: "Regular workshops and Q&A sessions with industry leaders",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all"
            >
              <div className="p-2 w-10 h-10 rounded-full bg-black/5 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-medium text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.description}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white/90 backdrop-blur-md rounded-2xl p-8 border border-gray-100 shadow-lg"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-full bg-black/5">
              <Clock className="h-5 w-5 text-black" />
            </div>
            <h3 className="font-semibold text-xl">Limited Time Offer: First Month Free</h3>
          </div>

          <p className="text-gray-600 mb-8 md:text-lg">
            Experience the full benefits of our premium community for 30 days at no cost. After your trial period,
            continue for just $29/month or $290/year (save $58).
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <Button
                asChild
                className="relative overflow-hidden group w-full sm:w-auto bg-black hover:bg-gray-800 text-white px-8 py-6 text-base"
              >
                <Link href="#claim-offer">
                  <span className="relative z-10 flex items-center">
                    Claim Your Free Month
                    <ArrowRight
                      className={`ml-2 h-4 w-4 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
                    />
                  </span>
                  <span className="absolute inset-0 bg-white/10 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Link>
              </Button>
            </motion.div>

            <Button
              variant="outline"
              asChild
              className="w-full sm:w-auto px-8 py-6 text-base border-gray-300 hover:bg-gray-50"
            >
              <Link href="#pricing">View All Pricing Options</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mt-8 text-sm text-gray-500"
        >
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            30-day money-back guarantee
          </span>
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            No credit card required
          </span>
          <span className="flex items-center">
            <svg className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Cancel anytime
          </span>
        </motion.div>
      </div>
    </section>
  )
}

