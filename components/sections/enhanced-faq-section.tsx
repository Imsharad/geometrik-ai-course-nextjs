"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ChevronDown, MessageCircle, Search, PlusCircle, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { studentImages } from "@/components/student-images"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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

export function EnhancedFaqSection() {
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
    // Community & Support
    {
      id: "support-1",
      question: "Is there a community of students I can connect with?",
      answer:
        "Yes, we have an active community of students and alumni. You'll gain access to our private community platform where you can connect with fellow students, share your progress, ask questions, and collaborate on projects. Many students form lasting professional relationships through these interactions.",
      category: "support",
    },
    {
      id: "support-2",
      question: "What kind of support will I receive?",
      answer:
        "You'll have access to multiple support channels: our responsive teaching assistants who answer questions within 24 hours, weekly live Q&A sessions with instructors, the community forum for peer support, and comprehensive documentation. For Professional and Enterprise tier students, additional 1-on-1 mentorship is available.",
      category: "support",
    },
    // Career & Outcomes
    {
      id: "career-1",
      question: "Will this course help me advance my career?",
      answer:
        "Yes, this course is designed with career advancement in mind. The skills you'll learn are in high demand across industries. Many of our graduates have secured new positions, received promotions, or successfully transitioned to roles with higher compensation. The portfolio projects you'll build during the course provide tangible evidence of your capabilities to potential employers.",
      category: "career",
    },
    {
      id: "career-2",
      question: "Do I receive a certificate upon completion?",
      answer:
        "Yes, upon completing all course requirements, you'll receive a verified certificate of completion. This certificate can be added to your resume, LinkedIn profile, and shared with potential employers. While the skills and portfolio you develop are the primary value, the certificate serves as formal recognition of your achievement and commitment to professional development.",
      category: "career",
    },
    // Payment & Pricing
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
        "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with the course for any reason, you can request a full refund within 30 days of purchase, no questions asked. We stand behind the quality of our course and want you to feel confident in your investment.",
      category: "payment",
    },
    {
      id: "payment-4",
      question: "Do I get lifetime access to the course?",
      answer:
        "Yes, you get lifetime access to the course and all future updates. Once you purchase, you can access the content at any time.",
      category: "payment",
    },
    {
      id: "payment-5",
      question: "Can I upgrade my plan later?",
      answer:
        "Yes, you can upgrade your plan at any time. You'll only pay the difference between your current plan and the new one.",
      category: "payment",
    },
    {
      id: "payment-6",
      question: "How do the mentorship sessions work?",
      answer:
        "Mentorship sessions are conducted via video call. You can schedule them through our platform at times that work for you and your assigned mentor.",
      category: "payment",
    },
  ]

  // Category data
  const categories = [
    { id: null, label: "All Questions" },
    { id: "course", label: "Course Content" },
    { id: "access", label: "Access & Requirements" },
    { id: "support", label: "Community & Support" },
    { id: "career", label: "Career & Outcomes" },
    { id: "payment", label: "Payment & Pricing" },
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
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950" id="faq">
      <motion.div
        className="container px-4 max-w-5xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our course, support, and enrollment process
          </p>
        </motion.div>

        {/* Search and filter */}
        <motion.div className="mb-10 space-y-6" variants={itemVariants}>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 py-6 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus:border-gray-300 dark:focus:border-gray-600 focus:ring focus:ring-gray-200 dark:focus:ring-gray-700 focus:ring-opacity-50"
            />
          </div>

          <Tabs defaultValue="categories" className="w-full">
            <div className="flex justify-center mb-2">
              <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-gray-100 dark:bg-gray-800 p-1">
                <TabsTrigger
                  value="categories"
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-white data-[state=active]:text-gray-950 data-[state=active]:shadow-sm dark:ring-offset-gray-950 dark:focus-visible:ring-gray-300 dark:data-[state=active]:bg-gray-950 dark:data-[state=active]:text-gray-50"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Categories
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="categories" className="mt-2">
              <div className="flex flex-wrap gap-2 justify-center">
                {categories.map((category) => (
                  <Button
                    key={category.id ?? "all"}
                    variant={activeCategory === category.id ? "default" : "outline"}
                    size="sm"
                    onClick={() => setActiveCategory(category.id)}
                    className={cn(
                      "rounded-full px-4 transition-all",
                      activeCategory === category.id
                        ? "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200"
                        : "text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-100",
                    )}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* FAQ accordion */}
        <motion.div className="space-y-4" variants={itemVariants}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <motion.div
                key={faq.id}
                variants={itemVariants}
                className={cn(
                  "border rounded-xl overflow-hidden transition-all duration-300 dark:border-gray-700",
                  activeItem === faq.id 
                    ? "border-gray-300 dark:border-gray-600 shadow-sm" 
                    : "border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700",
                )}
              >
                <button
                  onClick={() => toggleItem(faq.id)}
                  className="w-full p-5 text-left flex justify-between items-center gap-4"
                >
                  <h3 className="font-medium text-gray-900 dark:text-gray-100">{faq.question}</h3>
                  <div
                    className={cn(
                      "h-8 w-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors",
                      activeItem === faq.id 
                        ? "bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400",
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
                      <div className="px-5 pb-5 pt-0 text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800">
                        <p className="mt-4">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
              <p className="text-gray-500 dark:text-gray-400 mb-4">No questions found matching your search</p>
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
        <motion.div className="mt-12 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4" variants={itemVariants}>
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <Avatar className="h-8 w-8 border-2 border-white dark:border-gray-800">
                <AvatarImage src={studentImages.taylor} alt="Student" />
                <AvatarFallback>T</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-white dark:border-gray-800">
                <AvatarImage src={studentImages.alex} alt="Student" />
                <AvatarFallback>A</AvatarFallback>
              </Avatar>
              <Avatar className="h-8 w-8 border-2 border-white dark:border-gray-800">
                <AvatarImage src={studentImages.jordan} alt="Student" />
                <AvatarFallback>J</AvatarFallback>
              </Avatar>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span className="font-medium">Our students say:</span> "The support team is amazing. They responded to all
              my questions within hours."
            </p>
          </div>
        </motion.div>

        {/* Contact support */}
        <motion.div
          className="mt-12 text-center bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-700"
          variants={itemVariants}
        >
          <h3 className="text-xl font-semibold mb-3 flex items-center justify-center gap-2">
            <PlusCircle className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            Still Have Questions?
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-lg mx-auto">
            Our team is here to help you make an informed decision about your educational journey.
          </p>
          <Button asChild className="bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900">
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