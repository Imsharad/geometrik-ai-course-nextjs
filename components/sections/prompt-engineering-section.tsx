"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, ArrowRight, Lightbulb, Palette, Zap, TrendingUp } from "lucide-react"
import Link from "next/link"

export function PromptEngineeringSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 15 },
    },
  }

  const features = [
    {
      icon: <Lightbulb className="h-5 w-5" />,
      title: "Creative Concept Development",
      description: "Learn to craft prompts that generate innovative visual concepts for your brand",
    },
    {
      icon: <Palette className="h-5 w-5" />,
      title: "Visual Style Mastery",
      description: "Master techniques to control aesthetic styles, colors, and visual tone",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Rapid Iteration",
      description: "Generate dozens of creative options in minutes instead of days or weeks",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      title: "Marketing Performance",
      description: "Create scroll-stopping visuals that boost engagement and conversion rates",
    },
  ]

  return (
    <section ref={ref} className="py-24 relative overflow-hidden" id="prompt-engineering">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>

        {/* Subtle pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRoNHYxaC00di0xem0wLTJoMXY0aC0xdi00em0yLTJoMXYxaC0xdi0xem0tMiAyaC0xdjFoMXYtMXptLTItMmgxdjFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bTItMmgxdjFoLTF2LTF6bS0yLTJoMXYxaC0xdi0xem0tMi0yaDEiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-purple-400/10 blur-[120px] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-400/10 blur-[100px] opacity-50"></div>
      </div>

      <div className="container px-6 max-w-7xl mx-auto">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Left column - Content */}
          <motion.div className="order-2 lg:order-1" variants={itemVariants}>
            <Badge className="mb-4 px-3 py-1.5 bg-purple-100 text-purple-700 border-purple-200">
              <Sparkles className="mr-2 h-3.5 w-3.5" /> New Module
            </Badge>

            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 via-fuchsia-600 to-pink-600">
              Learn Prompt Engineering for Visual Brand Marketing
            </h2>

            <p className="text-gray-600 text-lg mb-8">
              Master the art of crafting AI prompts that generate stunning, brand-aligned visuals. Use Midjourney to
              create attention-grabbing marketing assets that would be impossible or prohibitively expensive with
              traditional methods.
            </p>

            <div className="grid md:grid-cols-2 gap-5 mb-8">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="bg-white/80 backdrop-blur-sm border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 text-white">
                        {feature.icon}
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">{feature.title}</h3>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md group"
              >
                <Link href="#enroll">
                  <span className="flex items-center">
                    Enroll in This Module
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>

              <Button asChild variant="outline" className="border-gray-300">
                <Link href="#curriculum">View Full Curriculum</Link>
              </Button>
            </div>
          </motion.div>

          {/* Right column - Image */}
          <motion.div className="order-1 lg:order-2 flex justify-center" variants={itemVariants}>
            <div className="relative max-w-md">
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-2 border-l-2 border-purple-200 rounded-tl-xl"></div>
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-2 border-r-2 border-purple-200 rounded-br-xl"></div>

              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="aspect-[9/16] relative">
                  <Image
                    src="https://sjc.microlink.io/ZP50ro4I5yt2UtscvtUuDbiw7pA_3kg2MQ7sz6gF8rVikEWHYnvDsKZw_TXyVzR3e6Zpziiz8a_AFW-RWdZq0g.jpeg"
                    alt="Creative AI-generated marketing visual showing miniature workers cleaning teeth"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>

                {/* Overlay caption */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-4 text-white">
                  <p className="text-sm font-medium">
                    Use Midjourney to create surreal, attention-grabbing marketing visuals
                  </p>
                </div>

                {/* Decorative badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-purple-700 text-xs font-bold px-3 py-1 rounded-full shadow-md border border-purple-100">
                  AI-Generated
                </div>
              </div>

              {/* Stats badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-lg shadow-lg p-3 border border-gray-100">
                <div className="text-xs text-gray-500">Average engagement increase</div>
                <div className="text-xl font-bold text-purple-700">+237%</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Testimonial */}
        <motion.div
          className="mt-20 max-w-3xl mx-auto bg-white rounded-xl p-6 shadow-md border border-gray-100"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-1 h-16 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></div>
            <div>
              <p className="text-gray-600 italic mb-2">
                "The prompt engineering techniques I learned in this module helped our marketing team create visuals
                that increased our social media engagement by 3x. Our competitors can't figure out how we're doing it!"
              </p>
              <p className="font-medium">Sarah K. — Marketing Director, TechBrand</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

