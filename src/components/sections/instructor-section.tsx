"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Award, BookOpen, Briefcase, Users, Quote, ExternalLink, Mail, Phone, Linkedin, Github, Globe } from "lucide-react"
import { cn } from "@/lib/utils"
import fs from "fs"
import yaml from "js-yaml"
import path from "path"

// Define types for the resume data
interface SocialNetwork {
  network: string
  username: string
}

interface ProfessionalSummary {
  summary: string[]
}

interface ProfessionalExperience {
  company: string
  position: string
  location: string
  start_date: string
  end_date?: string
  highlights: string[]
}

interface EducationEntry {
  institution: string
  area: string
  degree: string
  location: string
  start_date: string
  end_date: string
}

interface Technology {
  label: string
  details: string
}

interface CVData {
  name: string
  location: string
  email: string
  phone: string
  website: string
  social_networks: SocialNetwork[]
  sections: {
    professional_summary: string[]
    professional_experience: ProfessionalExperience[]
    education: EducationEntry[]
    technologies: Technology[]
  }
}

// Helper function to format dates
const formatDateRange = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const end = endDate && endDate !== "present" ? new Date(endDate) : null
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" }

  const startDateFormatted = start.toLocaleDateString("en-US", options)
  if (endDate === "present") {
    return `${startDateFormatted} - Present`
  }
  if (end) {
    const endDateFormatted = end.toLocaleDateString("en-US", options)
    return `${startDateFormatted} - ${endDateFormatted}`
  }
  return startDateFormatted
}


export function InstructorSection() {
  const [activeTab, setActiveTab] = useState("about")
  const [isInView, setIsInView] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [instructorData, setInstructorData] = useState<CVData | null>(null)

  useEffect(() => {
    // Load YAML data
    try {
      const yamlPath = path.join(process.cwd(), "resume.yaml")
      const fileContents = fs.readFileSync(yamlPath, "utf8")
      const data = yaml.load(fileContents) as { cv: CVData }
      setInstructorData(data.cv)
    } catch (error) {
      console.error("Error loading or parsing resume.yaml:", error)
    }

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

  if (!instructorData) {
    // You might want to render a loading state or a fallback UI
    return <div>Loading instructor data...</div>
  }

  // Map YAML data to component structure
  const instructor = {
    name: instructorData.name,
    title: instructorData.sections.professional_experience[0]?.position || "Instructor",
    image: "/placeholder-user.jpg", // Using placeholder as specified
    bio: instructorData.sections.professional_summary.join("\n\n"),
    experience: instructorData.sections.professional_experience.map(exp => ({
      company: exp.company,
      role: exp.position,
      period: formatDateRange(exp.start_date, exp.end_date),
      description: exp.highlights.join("\n- "),
      location: exp.location,
    })),
    education: instructorData.sections.education.map(edu => ({
      institution: edu.institution,
      degree: `${edu.degree} in ${edu.area}`,
      period: formatDateRange(edu.start_date, edu.end_date),
      location: edu.location,
    })),
    technologies: instructorData.sections.technologies,
    contact: {
      email: instructorData.email,
      phone: instructorData.phone,
      website: instructorData.website,
      social_networks: instructorData.social_networks,
    },
  }

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
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="space-y-3">
                {instructor.contact.email && (
                  <div className="flex items-center text-gray-700">
                    <Mail className="h-4 w-4 mr-3 text-blue-600" />
                    <a href={`mailto:${instructor.contact.email}`} className="hover:text-blue-700">{instructor.contact.email}</a>
                  </div>
                )}
                {instructor.contact.phone && (
                  <div className="flex items-center text-gray-700">
                    <Phone className="h-4 w-4 mr-3 text-blue-600" />
                    <span>{instructor.contact.phone}</span>
                  </div>
                )}
                {instructor.contact.website && (
                  <div className="flex items-center text-gray-700">
                    <Globe className="h-4 w-4 mr-3 text-blue-600" />
                    <a href={instructor.contact.website} target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
                      {instructor.contact.website}
                    </a>
                  </div>
                )}
                {instructor.contact.social_networks.map(social => (
                  <div key={social.network} className="flex items-center text-gray-700">
                    {social.network === "LinkedIn" && <Linkedin className="h-4 w-4 mr-3 text-blue-600" />}
                    {social.network === "GitHub" && <Github className="h-4 w-4 mr-3 text-blue-600" />}
                    <a
                      href={
                        social.network === "LinkedIn"
                          ? `https://linkedin.com/in/${social.username}`
                          : social.network === "GitHub"
                          ? `https://github.com/${social.username}`
                          : '#'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-blue-700"
                    >
                      {social.username} ({social.network})
                    </a>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column - Content */}
          <div className="space-y-10">
            {/* Instructor header */}
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-semibold text-gray-900">{instructor.name}</h3>
              <p className="text-blue-600 font-medium">{instructor.title}</p>
              <p className="text-sm text-gray-600 mt-1">{instructorData.location}</p>
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
                    value="education"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm rounded-md text-sm font-medium transition-all"
                  >
                    Education
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="about" className="mt-8 space-y-8 animate-in fade-in-50 duration-300">
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-3">About Me</h4>
                    <p className="text-gray-700 text-base leading-relaxed whitespace-pre-line">{instructor.bio}</p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-4">Technologies</h4>
                    <div className="space-y-4">
                      {instructor.technologies.map((tech, index) => (
                        <div key={index} className="p-4 bg-blue-50/80 rounded-lg border border-blue-100/80">
                          <h5 className="font-medium text-blue-800">{tech.label}</h5>
                          <p className="text-sm text-gray-700">{tech.details}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="experience" className="mt-8 space-y-6 animate-in fade-in-50 duration-300">
                  {instructor.experience.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-gray-900 font-medium text-base">{exp.company}</h4>
                          <p className="text-blue-600 text-sm">{exp.role}</p>
                          <p className="text-xs text-gray-500">{exp.location}</p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>
                      {exp.description && (
                        <ul className="list-disc list-inside text-gray-700 text-sm leading-relaxed space-y-1 mt-3">
                          {exp.description.split('\n- ').map((highlight, i) => (
                            highlight && <li key={i}>{highlight.replace(/^- /,'')}</li>
                          ))}
                        </ul>
                      )}
                    </motion.div>
                  ))}
                </TabsContent>

                <TabsContent value="education" className="mt-8 space-y-6 animate-in fade-in-50 duration-300">
                  {instructor.education.map((edu, index) => (
                    <motion.div
                      key={index}
                      className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-gray-900 font-medium text-base">{edu.institution}</h4>
                          <p className="text-blue-600 text-sm">{edu.degree}</p>
                          <p className="text-xs text-gray-500">{edu.location}</p>
                        </div>
                        <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                          {edu.period}
                        </span>
                      </div>
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
                <Link href="#enroll">
                  <span className="flex items-center text-base font-medium">
                    Learn with {instructor.name.split(' ')[0]}
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

