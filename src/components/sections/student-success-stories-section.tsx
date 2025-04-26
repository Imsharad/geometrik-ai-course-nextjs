"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Award, TrendingUp, BarChart, Zap } from "lucide-react"
import { Testimonials } from "@/components/shared/testimonials"

// Success metrics data
const successMetrics = [
  {
    label: "Average Salary Increase",
    value: "37%",
    icon: TrendingUp,
    color: "from-green-500 to-emerald-600",
  },
  {
    label: "Career Advancement",
    value: "78%",
    icon: BarChart,
    color: "from-blue-500 to-indigo-600",
  },
  {
    label: "Project Success Rate",
    value: "92%",
    icon: Zap,
    color: "from-purple-500 to-violet-600",
  },
]

// Testimonial data
const testimonials = [
  {
    id: 1,
    name: "Jennifer K.",
    role: "Senior Developer",
    company: "EnterpriseX",
    image:
      "https://sjc.microlink.io/oeea5MBHysQn7-jgqn2gA9vyt72f9rLLGeXet61DYNyzV1p3JYZmWbstC2ASSyAEoU7yicl3e87fDtk2C5vpZQ.jpeg",
    quote:
      "Dr. Johnson's teaching style made complex concepts understandable and practical. The way they break down advanced topics and relate them to real-world scenarios helped me implement solutions that increased our system performance by 40%. Their mentorship has been invaluable to my career growth.",
    metrics: [
      {
        icon: <TrendingUp className="h-4 w-4" />,
        label: "Performance Improvement",
        value: "40%",
      },
      {
        icon: <Award className="h-4 w-4" />,
        label: "Promotion Timeline",
        value: "6 months",
      },
    ],
    tags: ["System Performance", "Career Growth", "Mentorship"],
    featured: true,
    rating: 5,
  },
  {
    id: 2,
    name: "Marcus T.",
    role: "CTO",
    company: "StartupFusion",
    image: "https://cdn.midjourney.com/10579840-a472-4a8a-bf81-4a21d5b4b184/0_0.png",
    quote:
      "Beyond just theory, Dr. Johnson provides insights from their extensive industry experience that you can't find in textbooks. Their guidance helped me transform our company's approach to development and scale our operations effectively. This course has the perfect balance of theory and practical application.",
    metrics: [
      {
        icon: <TrendingUp className="h-4 w-4" />,
        label: "Business Growth",
        value: "3x",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        label: "Team Efficiency",
        value: "+65%",
      },
    ],
    tags: ["Scaling Operations", "Industry Insights", "Leadership"],
    rating: 5,
  },
  {
    id: 3,
    name: "Sophia R.",
    role: "Product Manager",
    company: "InnovateTech",
    image: "https://cdn.midjourney.com/6a7d99fe-057d-48df-b60a-9cf59a5d97a4/0_0.png",
    quote:
      "The strategic frameworks taught in this course revolutionized how I approach product development. Within months of applying these techniques, our user engagement increased by 52% and our feature adoption rate doubled. The ROI on this course has been exceptional.",
    metrics: [
      {
        icon: <TrendingUp className="h-4 w-4" />,
        label: "User Engagement",
        value: "+52%",
      },
      {
        icon: <Zap className="h-4 w-4" />,
        label: "Feature Adoption",
        value: "2x",
      },
    ],
    tags: ["Product Strategy", "User Engagement", "ROI"],
    rating: 5,
  },
]

export function StudentSuccessStoriesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })

  return (
    <section className="py-20 bg-background" id="success-stories">
      <div className="container px-4" ref={ref}>
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4 bg-primary/10 text-primary hover:bg-primary/20 border-none">
            <Award className="h-3.5 w-3.5 mr-1" /> Success Stories
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Transformative Results from Our Students
          </h2>
          <p className="text-xl text-muted-foreground">
            See how our course has helped professionals achieve remarkable outcomes in their careers and businesses
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {successMetrics.map((metric, index) => {
            const Icon = metric.icon

            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm"
              >
                <div
                  className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full bg-gradient-to-br ${metric.color} opacity-10`}
                />
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <div className={`p-2 rounded-full bg-gradient-to-br ${metric.color}`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.label}</p>
                      <h3 className="text-3xl font-bold">{metric.value}</h3>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Testimonials testimonials={testimonials} title="Featured Student Testimonials" variant="carousel" />
        </motion.div>
      </div>
    </section>
  )
}

