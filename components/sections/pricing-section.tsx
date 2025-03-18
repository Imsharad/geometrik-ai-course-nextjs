"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { PricingSection as PricingComponent, type PricingPlan } from "@/components/shared/pricing-section"
import { studentImages } from "@/components/student-images"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const plans: PricingPlan[] = [
  {
    id: "essentials",
    name: "Essentials",
    description: "Perfect for individual learners looking to build their skills",
    monthlyPrice: 499,
    yearlyPrice: 449,
    features: [
      { id: 1, name: "Full Course Access", included: true },
      { id: 2, name: "Lifetime Updates", included: true },
      { id: 3, name: "Project Files & Resources", included: true },
      { id: 4, name: "Community Access (Basic)", included: true },
      { id: 5, name: "Q&A Support", included: true },
      { id: 6, name: "1-on-1 Mentorship Sessions", included: false },
      { id: 7, name: "Career Development Resources", included: false },
      { id: 8, name: "Advanced Workshop Access", included: false },
      { id: 9, name: "Team Collaboration Tools", included: false },
    ],
    mostPopular: false,
    ctaText: "Start Learning",
  },
  {
    id: "professional",
    name: "Professional",
    description: "Our most popular option for dedicated professionals",
    monthlyPrice: 899,
    yearlyPrice: 799,
    features: [
      { id: 1, name: "Full Course Access", included: true },
      { id: 2, name: "Lifetime Updates", included: true },
      { id: 3, name: "Project Files & Resources", included: true },
      {
        id: 4,
        name: "Community Access (Premium)",
        included: true,
        tooltip: "Access to exclusive premium community areas and networking events",
      },
      { id: 5, name: "Priority Q&A Support", included: true },
      {
        id: 6,
        name: "1-on-1 Mentorship Sessions (2x)",
        included: true,
        tooltip: "Two 30-minute sessions with course instructors or industry experts",
      },
      { id: 7, name: "Career Development Resources", included: true },
      { id: 8, name: "Advanced Workshop Access", included: true },
      { id: 9, name: "Team Collaboration Tools", included: false },
    ],
    mostPopular: true,
    ctaText: "Go Professional",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "Ideal for teams and organizations scaling their capabilities",
    monthlyPrice: 1499,
    yearlyPrice: 1299,
    features: [
      { id: 1, name: "Full Course Access", included: true },
      { id: 2, name: "Lifetime Updates", included: true },
      { id: 3, name: "Project Files & Resources", included: true },
      { id: 4, name: "Community Access (Premium)", included: true },
      { id: 5, name: "Priority Q&A Support", included: true },
      {
        id: 6,
        name: "1-on-1 Mentorship Sessions (5x)",
        included: true,
        tooltip: "Five 30-minute sessions with course instructors or industry experts",
      },
      { id: 7, name: "Career Development Resources", included: true },
      { id: 8, name: "Advanced Workshop Access", included: true },
      {
        id: 9,
        name: "Team Collaboration Tools",
        included: true,
        tooltip: "Shared workspaces, team progress tracking, and collaborative project tools",
      },
    ],
    customOption: true,
    ctaText: "Contact Sales",
  },
]

const guarantees = [
  {
    id: 1,
    title: "30-Day Money-Back Guarantee",
    description: "If you're not satisfied, get a full refund within 30 days of purchase, no questions asked.",
  },
  {
    id: 2,
    title: "Lifetime Access",
    description: "Buy once and access the course and all future updates forever.",
  },
  {
    id: 3,
    title: "Secure Payment",
    description: "All payments are processed securely through trusted payment providers.",
  },
]

const faqs = [
  {
    id: 1,
    question: "Do I get lifetime access to the course?",
    answer:
      "Yes, you get lifetime access to the course and all future updates. Once you purchase, you can access the content at any time.",
  },
  {
    id: 2,
    question: "What if the course isn't right for me?",
    answer:
      "We offer a 30-day money-back guarantee. If you're not satisfied with the course, simply request a refund within 30 days of purchase.",
  },
  {
    id: 3,
    question: "How do the mentorship sessions work?",
    answer:
      "Mentorship sessions are conducted via video call. You can schedule them through our platform at times that work for you and your assigned mentor.",
  },
  {
    id: 4,
    question: "Can I upgrade my plan later?",
    answer:
      "Yes, you can upgrade your plan at any time. You'll only pay the difference between your current plan and the new one.",
  },
]

export function PricingSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 bg-background" id="pricing">
      <motion.div
        className="container px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="max-w-3xl mx-auto text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Investment in Your Future</h2>
          <p className="text-xl text-muted-foreground">
            Choose the plan that's right for your career goals and learning needs
          </p>
        </motion.div>

        <PricingComponent plans={plans} guarantees={guarantees} faqs={faqs} variants={itemVariants} />

        {/* Add a testimonial section to the pricing section - more subtle */}
        <motion.div
          className="max-w-2xl mx-auto bg-white rounded-lg border shadow-sm p-4 mt-8 mb-12"
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={studentImages.marcus} alt="Student testimonial" />
              <AvatarFallback>M</AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-1 text-amber-500 mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-amber-500" />
                ))}
              </div>
              <p className="text-sm text-gray-600 italic mb-1">
                "The investment in this course paid for itself within months. The skills I gained led directly to a
                promotion and salary increase."
              </p>
              <p className="text-sm font-medium">Marcus T., CTO at StartupFusion</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

