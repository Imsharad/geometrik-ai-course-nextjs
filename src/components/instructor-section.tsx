"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Award, BookOpen, Briefcase, Users } from "lucide-react"
import { InstructorProfile } from "./instructor/instructor-profile"
import { InstructorDetails, type Experience, type Publication, type Conference } from "./instructor/instructor-details"
import { Testimonials, type StudentTestimonial } from "./instructor/testimonials"

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

// Update the testimonial in the instructor section
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
    image:
      "https://sjc.microlink.io/oeea5MBHysQn7-jgqn2gA9vyt72f9rLLGeXet61DYNyzV1p3JYZmWbstC2ASSyAEoU7yicl3e87fDtk2C5vpZQ.jpeg",
  },
}

const experience: Experience[] = [
  {
    id: 1,
    company: "TechCorp",
    role: "Senior Technical Lead",
    duration: "2018-2023",
    description: "Led implementation of enterprise-level solutions for global clients",
  },
  {
    id: 2,
    company: "InnovateX",
    role: "Principal Consultant",
    duration: "2014-2018",
    description: "Advised Fortune 500 companies on strategic implementation and optimization",
  },
  {
    id: 3,
    company: "Global University",
    role: "Adjunct Professor",
    duration: "2012-2014",
    description: "Taught advanced courses in specialized techniques and methodologies",
  },
]

const publications: Publication[] = [
  {
    id: 1,
    title: "Advanced Implementation Strategies",
    publisher: "Tech Publications",
    year: 2022,
    link: "#",
  },
  {
    id: 2,
    title: "Optimization Techniques for Modern Applications",
    publisher: "Industry Journal",
    year: 2021,
    link: "#",
  },
  {
    id: 3,
    title: "The Future of Implementation Technologies",
    publisher: "Future Press",
    year: 2020,
    link: "#",
  },
]

const conferences: Conference[] = [
  {
    id: 1,
    title: "Modern Implementation Summit",
    role: "Keynote Speaker",
    year: 2023,
    location: "New York, NY",
  },
  {
    id: 2,
    title: "Global Technology Conference",
    role: "Panel Moderator",
    year: 2022,
    location: "San Francisco, CA",
  },
  {
    id: 3,
    title: "Industry Innovation Forum",
    role: "Workshop Facilitator",
    year: 2021,
    location: "London, UK",
  },
]

const testimonials: StudentTestimonial[] = [
  {
    id: 1,
    name: "Jennifer K.",
    role: "Senior Developer",
    company: "EnterpriseX",
    image: "/placeholder.svg?height=60&width=60",
    quote:
      "Dr. Johnson's teaching style made complex concepts understandable and practical. The way they break down advanced topics and relate them to real-world scenarios helped me implement solutions that increased our system performance by 40%. Their mentorship has been invaluable to my career growth.",
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "CTO",
    company: "StartupFusion",
    image: "/placeholder.svg?height=60&width=60",
    quote:
      "Beyond just theory, Dr. Johnson provides insights from their extensive industry experience that you can't find in textbooks. Their guidance helped me transform our company's approach to development and scale our operations effectively. This course has the perfect balance of theory and practical application.",
  },
]

export function InstructorSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section ref={ref} className="py-20 bg-muted/30" id="instructor">
      <motion.div
        className="container px-4"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="max-w-3xl mx-auto text-center mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Meet Your Instructor</h2>
          <p className="text-xl text-muted-foreground">
            Learn from an industry expert with extensive experience and a passion for teaching
          </p>
        </motion.div>

        <motion.div className="grid md:grid-cols-2 gap-10 mb-16 items-start" variants={itemVariants}>
          <InstructorProfile instructor={instructor} variants={itemVariants} />

          <InstructorDetails
            name={instructor.name}
            title={instructor.title}
            bio={instructor.bio}
            experience={experience}
            publications={publications}
            conferences={conferences}
            variants={itemVariants}
          />
        </motion.div>

        <Testimonials testimonials={testimonials} variants={itemVariants} />
      </motion.div>
    </section>
  )
}

