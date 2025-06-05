"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Award, BookOpen, Briefcase, Users, Quote, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

export function InstructorSection() {
  const [activeTab, setActiveTab] = useState("about")
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  }

  // Instructor data
  const instructor = {
    name: "Dr. Alex Johnson",
    title: "Lead Instructor",
    image:
      "https://sjc.microlink.io/d-pr2VshFerH5ry8gFOoN4WXbArMfrk7trM0vi6XKe9Ucj-4tggEM-FFv89fsDK1xpbUXtCzNrMD0sCm0KxxuA.jpeg",
    bio: "A renowned expert with over 15 years of experience in the field. Alex brings real-world insights and practical knowledge to every lesson, making complex concepts accessible and applicable.",
    stats: [
      { value: "15k+", label: "Students", icon: Users, color: "bg-blue-50/80 text-blue-600 border-blue-100" },
      { value: "12", label: "Courses", icon: BookOpen, color: "bg-emerald-50/80 text-emerald-600 border-emerald-100" },
      { value: "15+", label: "Years", icon: Briefcase, color: "bg-amber-50/80 text-amber-600 border-amber-100" },
      { value: "6", label: "Awards", icon: Award, color: "bg-violet-50/80 text-violet-600 border-violet-100" },
    ],
    experience: [
      {
        company: "TechCorp",
        role: "Senior Technical Lead",
        period: "2018-2023",
        description:
          "Led implementation of enterprise-level solutions for global clients, increasing system performance by 40% for Fortune 100 companies.",
      },
      {
        company: "InnovateX",
        role: "Principal Consultant",
        period: "2014-2018",
        description:
          "Advised Fortune 500 companies on strategic implementation, developing optimization frameworks adopted by 30+ organizations.",
      },
    ],
    publications: [
      {
        title: "Advanced Implementation Strategies",
        publisher: "Tech Publications",
        year: 2022,
        description: "Cited in 45+ industry papers and featured at international conferences.",
        link: "#",
      },
      {
        title: "Optimization Techniques for Modern Applications",
        publisher: "Industry Journal",
        year: 2021,
        description: "Featured in 3 international conferences and adopted by leading universities.",
        link: "#",
      },
    ],
    teaching:
      "My teaching approach focuses on practical application backed by solid theory. I believe in learning by doing, with real-world examples that demonstrate how concepts apply in actual scenarios.",
    testimonial: {
      quote:
        "Dr. Johnson's teaching style made complex concepts understandable and practical. Her mentorship has been invaluable to my career growth.",
      name: "Jennifer K.",
      role: "Senior Developer",
      company: "EnterpriseX",
    },
  }

  return (
    <section ref={sectionRef} className="py-28 relative overflow-hidden bg-white" id="instructor">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute -top-[300px] -right-[300px] w-[600px] h-[600px] rounded-full bg-blue-50 blur-[120px]"></div>
        <div className="absolute -bottom-[300px] -left-[300px] w-[600px] h-[600px] rounded-full bg-indigo-50 blur-[120px]"></div>
      </div>

      <motion.div
        className="container max-w-5xl mx-auto px-4"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        {/* Section header */}
        <motion.div className="text-center mb-20" variants={itemVariants}>
          <span className="text-blue-600 text-sm font-medium tracking-wide uppercase">Your Instructor</span>
          <h2 className="text-3xl font-semibold text-blue-800 mt-3 mb-5">Learn from an Industry Expert</h2>
          <div className="w-16 h-0.5 bg-blue-500 mx-auto"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left column - Visual elements */}
          <div className="space-y-10">
            {/* Instructor image */}
            <motion.div className="relative" variants={itemVariants}>
              <div className="aspect-square relative rounded-2xl overflow-hidden bg-gradient-to-b from-gray-100 to-gray-200 shadow-md">
                <Image
                  src={instructor.image || "/placeholder.svg"}
                  alt={instructor.name}
                  fill
                  className="object-cover transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 500px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 via-transparent to-transparent"></div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 border-t-2 border-l-2 border-blue-200 rounded-tl-xl"></div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-blue-200 rounded-br-xl"></div>
            </motion.div>

            {/* Stats grid */}
            <motion.div className="grid grid-cols-2 gap-5" variants={itemVariants}>
              {instructor.stats.map((stat, index) => {
                const StatIcon = stat.icon
                return (
                  <motion.div
                    key={index}
                    className={cn(
                      "flex flex-col items-center justify-center p-5 rounded-xl border backdrop-blur-sm transition-all duration-300",
                      stat.color,
                      "hover:shadow-md hover:-translate-y-1",
                    )}
                    whileHover={{ scale: 1.03 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <StatIcon className="h-5 w-5 mb-3" />
                    <span className="text-2xl font-semibold">{stat.value}</span>
                    <span className="text-xs text-gray-600 mt-1">{stat.label}</span>
                  </motion.div>
                )
              })}
            </motion.div>

            {/* Testimonial */}
            <motion.div
              className="p-7 bg-white border border-gray-100 rounded-xl shadow-sm relative"
              variants={itemVariants}
              whileHover={{ boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
            >
              <div className="absolute -top-3 -left-3 text-blue-500 bg-white rounded-full p-1 shadow-sm">
                <Quote className="h-6 w-6" />
              </div>
              <p className="text-gray-700 italic mb-5 text-base leading-relaxed">"{instructor.testimonial.quote}"</p>
              <div className="flex items-center">
                <div className="w-10 h-0.5 bg-gradient-to-r from-blue-300 to-indigo-300 mr-4"></div>
                <div>
                  <p className="font-medium text-gray-800">{instructor.testimonial.name}</p>
                  <p className="text-xs text-gray-500">
                    {instructor.testimonial.role}, {instructor.testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right column - Content */}
          <div className="space-y-10">
            {/* Instructor header */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-gray-900">{instructor.name}</h3>
              <p className="text-blue-600 font-medium">{instructor.title}</p>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={itemVariants}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid grid-cols-3 bg-gray-100/80 p-1 rounded-lg">
                  <TabsTrigger
                    value="about"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                  >
                    About
                  </TabsTrigger>
                  <TabsTrigger
                    value="experience"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                  >
                    Experience
                  </TabsTrigger>
                  <TabsTrigger
                    value="publications"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                  >
                    Publications
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-8 space-y-8 animate-in fade-in-50 duration-300">
                  <p className="text-gray-700 text-base leading-relaxed">{instructor.bio}</p>
                  <div className="p-6 bg-blue-50/80 rounded-xl border border-blue-100/80 backdrop-blur-sm">
                    <h4 className="text-blue-800 font-medium mb-4 text-base">Teaching Philosophy</h4>
                    <p className="text-gray-700 text-base leading-relaxed">{instructor.teaching}</p>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="mt-8 space-y-6 animate-in fade-in-50 duration-300">
                  {instructor.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-gray-900 font-medium text-base">{exp.company}</h4>
                          <p className="text-blue-600 text-sm">{exp.role}</p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-gray-700 text-base leading-relaxed">{exp.description}</p>
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="publications" className="mt-8 space-y-6 animate-in fade-in-50 duration-300">
                  {instructor.publications.map((pub, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-gray-900 font-medium text-base">{pub.title}</h4>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium">
                          {pub.year}
                        </span>
                      </div>
                      <p className="text-blue-600 text-sm mb-3">{pub.publisher}</p>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">{pub.description}</p>
                      <Link
                        href={pub.link}
                        className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View Publication <ExternalLink className="ml-1 h-3 w-3" />
                      </Link>
                    </motion.div>
                  ))}
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* CTA */}
            <motion.div className="pt-6" variants={itemVariants}>
              <Button
                asChild
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 py-6 h-auto shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-y-[-2px]"
              >
                <Link href="/enroll">
                  <span className="flex items-center text-base font-medium">
                    Learn with Dr. Johnson
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

