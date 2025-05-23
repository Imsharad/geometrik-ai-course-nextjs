"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, MessageCircle, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { studentImages } from "@/components/student-images"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Types
interface FAQ {
  id: string
  question: string
  answer: string
  category: string
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      duration: 0.6,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 15, duration: 0.6 },
  },
}

export function FaqSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  // Consolidated FAQ data from all sections
  const faqs: FAQ[] = [
    // Course Content & Structure
    {
      id: "course-1",
      question: "What will I learn in this course?",
      answer:
        "This comprehensive course covers everything from fundamental principles to advanced implementation strategies. You'll learn core concepts, practical techniques, optimization methods, and real-world applications. By the end, you'll have both theoretical knowledge and hands-on experience implementing solutions for complex problems.",
      category: "course",
    },
    {
      id: "course-2",
      question: "How is the course structured?",
      answer:
        "The course is divided into four main modules, each building upon the previous one. You'll start with foundations, move to advanced implementation, then specialized applications, and finish with professional application. Each module contains video lectures, hands-on exercises, quizzes, and practical projects to reinforce learning.",
      category: "course",
    },
    {
      id: "course-3",
      question: "How long will it take to complete the course?",
      answer:
        "The course is designed to be completed in 12-16 weeks when dedicating 5-7 hours per week. However, you have lifetime access and can progress at your own pace. Some students complete it faster with more time investment, while others take longer to thoroughly master each concept.",
      category: "course",
    },
    // Access & Technical Requirements
    {
      id: "access-1",
      question: "What technical requirements are needed for the course?",
      answer:
        "You'll need a computer with internet access, a modern web browser, and basic software that we'll guide you to install (all free or with free alternatives available). Detailed setup instructions are provided in the welcome module to ensure you have everything needed before starting the core content.",
      category: "access",
    },
    {
      id: "access-2",
      question: "How long do I have access to the course materials?",
      answer:
        "You receive lifetime access to all course materials, including future updates. This means you can revisit lessons, download resources, and benefit from new content additions for as long as the course exists.",
      category: "access",
    },
    // Payment & Guarantees
    {
      id: "payment-1",
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and in some regions, bank transfers or alternative payment methods. All payments are processed securely through industry-standard encryption and trusted payment processors.",
      category: "payment",
    },
    {
      id: "payment-2",
      question: "Is there a payment plan option?",
      answer:
        "Yes, we offer installment plans for all tiers. You can split your payment into 3 or 6 monthly installments with no additional interest. This option is available at checkout, making the course more accessible without compromising your cash flow.",
      category: "payment",
    },
    {
      id: "payment-3",
      question: "Do you offer a money-back guarantee?",
      answer:
        "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the course for any reason, you can request a full refund within 30 days of purchase. We want you to feel confident in your investment in your education.",
      category: "payment",
    },
    // Community & Support
    {
      id: "community-1",
      question: "Is there a community of students I can connect with?",
      answer:
        "Our vibrant community is one of the most valuable aspects of the course. You'll have access to a private forum where you can connect with fellow students, share your progress, ask questions, and collaborate on projects. Many students form lasting professional relationships through these interactions.",
      category: "community",
    },
    {
      id: "community-2",
      question: "What kind of support will I receive?",
      answer:
        "You'll have access to multiple support channels: our responsive teaching assistants who answer questions within 24 hours, weekly live Q&A sessions with instructors, the community forum for peer support, and comprehensive documentation. For Professional and Enterprise tier students, additional 1-on-1 mentorship sessions are included.",
      category: "community",
    },
    // Career & Outcomes
    {
      id: "career-1",
      question: "Will this course help me advance my career?",
      answer:
        "Our course is designed with career advancement in mind. 87% of our graduates report significant career advancement within 6 months of completion, including promotions, new job offers, and successful career transitions. The skills you'll learn are in high demand across industries, and our career resources section provides guidance on leveraging your new expertise.",
      category: "career",
    },
    {
      id: "career-2",
      question: "Do I receive a certificate upon completion?",
      answer:
        "Yes, upon completing all course requirements, you'll receive a verified digital certificate that you can add to your LinkedIn profile, resume, and portfolio. Our certificates are recognized by leading companies in the industry and serve as credible proof of your expertise.",
      category: "career",
    },
  ]

  // Category data
  const categories = [
    { id: null, label: "All Questions" },
    { id: "course", label: "Course Content" },
    { id: "access", label: "Access & Requirements" },
    { id: "payment", label: "Payment & Guarantees" },
    { id: "community", label: "Community & Support" },
    { id: "career", label: "Career & Outcomes" },
  ]

  // Filter FAQs based on search query and active category
  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeCategory === null || faq.category === activeCategory

    return matchesSearch && matchesCategory
  })

  // Toggle FAQ item
  const toggleItem = (id: string) => {
    setActiveItem(activeItem === id ? null : id)
  }

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white" id="faq">
      <motion.div
        className="container px-4 max-w-4xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Find answers to common questions about Geometrik.ai's course, support, and enrollment
          </p>
        </motion.div>

        {/* Search */}
        <motion.div className="mb-10" variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 bg-white border-gray-200 focus:border-gray-300 focus:ring focus:ring-gray-200 focus:ring-opacity-50"
            />
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div className="mb-10 overflow-x-auto scrollbar-hide" variants={itemVariants}>
          <div className="flex gap-2 pb-2">
            {categories.map((category) => (
              <Button
                key={category.id ?? "all"}
                variant={activeCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "rounded-full px-4 whitespace-nowrap transition-all",
                  activeCategory === category.id
                    ? "bg-gray-900 text-white hover:bg-gray-800"
                    : "text-gray-700 border-gray-200 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                {category.label}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* FAQ accordion */}
        <motion.div className="space-y-4" variants={itemVariants}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className={cn(
                  "border rounded-xl overflow-hidden transition-all duration-300",
                  activeItem === faq.id ? "border-gray-300 shadow-sm" : "border-gray-200 hover:border-gray-300",
                )}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4"
                >
                  <h3 className="font-medium text-gray-900">{faq.question}</h3>
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                      activeItem === faq.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-500",
                    )}
                  >
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-300",
                        activeItem === faq.id ? "rotate-180" : "",
                      )}
                    />
                  </div>
                </button>

                <AnimatePresence>
                  {activeItem === faq.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-5 pt-0 text-gray-600 border-t border-gray-100">
                        <p className="mt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
              <p className="text-gray-500 mb-4">No questions found matching your search</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory(null)
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </motion.div>

        {/* Social proof */}
        <motion.div className="mt-12 bg-white rounded-lg border p-4" variants={itemVariants}>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={studentImages.taylor} alt="Student" />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={studentImages.alex} alt="Student" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Our students say:</span> "The support team is amazing. They responded to all
              my questions within hours."
            </p>
          </div>
        </motion.div>

        {/* Contact support */}
        <motion.div
          className="mt-12 text-center bg-gradient-to-r from-gray-100 to-gray-50 p-8 rounded-xl border border-gray-200"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold mb-3">Still Have Questions?</h3>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Our team is here to help you make an informed decision about your educational journey.
          </p>
          <Button asChild className="bg-gray-900 hover:bg-gray-800 text-white">
            <Link href="#contact">
              <MessageCircle className="mr-2 h-4 w-4" />
              Contact Support
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}

