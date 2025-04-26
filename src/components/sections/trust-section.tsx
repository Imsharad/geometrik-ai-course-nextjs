"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView, AnimatePresence, useMotionValue, useTransform } from "@/app/fix-framer-motion"
import Image from "next/image"
import { useTheme } from "next-themes"
import { BadgeCheck, Building2, Briefcase, Users, TrendingUp, Star, Globe } from "lucide-react"

export function TrustSection() {
  const ref = useRef(null)
  const statsRef = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const statsInView = useInView(statsRef, { once: true, threshold: 0.1 })
  const { theme } = useTheme()
  const [activeCompany, setActiveCompany] = useState<string | null>(null)
  const [showStats, setShowStats] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  // Mouse follower effect
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight })

      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({ x: e.clientX, y: e.clientY })
      }

      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  // Parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  useEffect(() => {
    if (windowSize.width > 0) {
      mouseX.set(mousePosition.x / windowSize.width)
      mouseY.set(mousePosition.y / windowSize.height)
    }
  }, [mousePosition, windowSize, mouseX, mouseY])

  const rotateX = useTransform(mouseY, [0, 1], [2, -2])
  const rotateY = useTransform(mouseX, [0, 1], [-2, 2])
  const translateX = useTransform(mouseX, [0, 1], [-5, 5])
  const translateY = useTransform(mouseY, [0, 1], [-5, 5])

  // Companies with direct logo URLs and stats
  const companies = [
    {
      name: "Google",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1200px-Google_2015_logo.svg.png",
      hires: 42,
      avgSalary: "$145K",
      topRole: "AI Engineer",
      color: "#4285F4",
      testimonial: "Geometrik.ai graduates consistently demonstrate exceptional problem-solving skills.",
    },
    {
      name: "Microsoft",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png",
      hires: 38,
      avgSalary: "$152K",
      topRole: "ML Specialist",
      color: "#00A4EF",
      testimonial: "Their deep understanding of AI fundamentals makes them valuable team members.",
    },
    {
      name: "Amazon",
      logoUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1200px-Amazon_logo.svg.png",
      hires: 51,
      avgSalary: "$139K",
      topRole: "Data Scientist",
      color: "#FF9900",
      testimonial: "We've had great success with Geometrik.ai alumni in our AI initiatives.",
    },
    {
      name: "Meta",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/1200px-Meta_Platforms_Inc._logo.svg.png",
      hires: 29,
      avgSalary: "$158K",
      topRole: "AI Researcher",
      color: "#0668E1",
      testimonial: "Their graduates bring both technical expertise and creative thinking to our teams.",
    },
    {
      name: "Apple",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1200px-Apple_logo_black.svg.png",
      hires: 35,
      avgSalary: "$162K",
      topRole: "ML Engineer",
      color: "#A2AAAD",
      testimonial: "Geometrik.ai alumni consistently exceed our expectations in AI development.",
    },
    {
      name: "Netflix",
      logoUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1200px-Netflix_2015_logo.svg.png",
      hires: 24,
      avgSalary: "$175K",
      topRole: "AI Specialist",
      color: "#E50914",
      testimonial: "Their graduates have the perfect blend of theoretical knowledge and practical skills.",
    },
  ]

  // Overall employment stats
  const employmentStats = [
    {
      icon: <Building2 className="h-5 w-5" />,
      value: "94%",
      label: "Employment Rate",
      description: "of graduates find relevant employment within 3 months",
      color: "from-blue-500 to-cyan-400",
    },
    {
      icon: <Briefcase className="h-5 w-5" />,
      value: "$156K",
      label: "Average Salary",
      description: "for graduates in AI/ML positions",
      color: "from-emerald-500 to-teal-400",
    },
    {
      icon: <TrendingUp className="h-5 w-5" />,
      value: "68%",
      label: "Salary Increase",
      description: "average boost after completing our program",
      color: "from-amber-500 to-yellow-400",
    },
    {
      icon: <Users className="h-5 w-5" />,
      value: "219",
      label: "Recent Hires",
      description: "at top tech companies in the last year",
      color: "from-purple-500 to-fuchsia-400",
    },
  ]

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
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        type: "spring",
        stiffness: 100,
      },
    }),
  }

  // Get active company color or default
  const activeColor = activeCompany ? companies.find((c) => c.name === activeCompany)?.color || "#4285F4" : "#4285F4"

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 -z-10" />

      {/* Animated grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMi0yaDF2MWgtMXYtMXptLTItMmgxdjFoLTF2LTF6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30 dark:opacity-10 -z-10" />

      {/* Gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-400 dark:bg-blue-600 opacity-10 dark:opacity-5 blur-3xl -z-10"
        style={{ x: translateX, y: translateY }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-purple-400 dark:bg-purple-600 opacity-10 dark:opacity-5 blur-3xl -z-10"
        style={{ x: useTransform(mouseX, [0, 1], [5, -5]), y: useTransform(mouseY, [0, 1], [5, -5]) }}
      />

      <div className="container relative">
        {/* Enhanced floating badges */}
        <motion.div
          className="absolute -top-6 left-1/4 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-green-100 dark:border-green-900">
            <BadgeCheck className="h-3.5 w-3.5" />
            <span>Industry Recognized</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute -top-4 right-1/4 hidden md:block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-blue-100 dark:border-blue-900">
            <Star className="h-3.5 w-3.5" />
            <span>Top Rated Program</span>
          </div>
        </motion.div>

        <motion.div
          className="absolute top-32 right-10 hidden lg:block"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full text-xs font-medium shadow-sm border border-amber-100 dark:border-amber-900">
            <Globe className="h-3.5 w-3.5" />
            <span>Global Opportunities</span>
          </div>
        </motion.div>

        {/* Enhanced heading section */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-3 px-4 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs font-medium text-gray-800 dark:text-gray-200"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            INDUSTRY CONNECTIONS
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-300 dark:to-white"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Recognized by Industry Leaders
          </motion.h2>

          <motion.p
            className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            Our graduates are sought after by leading technology companies worldwide, with exceptional placement rates
            and competitive salaries
          </motion.p>
        </motion.div>

        {/* Enhanced company logos with 3D hover effects */}
        <motion.div
          className="relative flex flex-wrap justify-center items-center gap-x-16 gap-y-10 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            perspective: 1000,
          }}
        >
          {companies.map((company, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group cursor-pointer transition-all duration-300 ${
                activeCompany === company.name
                  ? "z-10"
                  : activeCompany
                    ? "opacity-50 scale-95"
                    : "grayscale opacity-70 hover:opacity-100 hover:grayscale-0"
              }`}
              onMouseEnter={() => setActiveCompany(company.name)}
              onMouseLeave={() => setActiveCompany(null)}
              onClick={() => setActiveCompany(company.name === activeCompany ? null : company.name)}
              style={{
                transformStyle: "preserve-3d",
                rotateX: activeCompany === company.name ? rotateX : 0,
                rotateY: activeCompany === company.name ? rotateY : 0,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="relative p-5"
                animate={{
                  rotateX: activeCompany === company.name ? rotateX : 0,
                  rotateY: activeCompany === company.name ? rotateY : 0,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              >
                <Image
                  src={company.logoUrl || "/placeholder.svg"}
                  alt={`${company.name} logo`}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain transition-transform duration-300"
                  unoptimized
                />

                {/* Enhanced highlight effect */}
                <motion.div
                  className="absolute -inset-4 rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 -z-10 shadow-sm"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: activeCompany === company.name ? 1 : 0,
                    boxShadow: activeCompany === company.name ? `0 4px 20px -5px ${company.color}40` : "none",
                  }}
                  transition={{ duration: 0.2 }}
                />

                {/* Enhanced pulsing dot */}
                {activeCompany === company.name && (
                  <motion.div
                    className="absolute -top-1 -right-1 h-3 w-3 rounded-full"
                    style={{ backgroundColor: company.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.4 }}
                  >
                    <motion.div
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: company.color }}
                      animate={{ scale: [1, 1.8, 1], opacity: [0.7, 0.2, 0.7] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    />
                  </motion.div>
                )}

                {/* Subtle company name label */}
                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-xs font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={{ y: 5, opacity: 0 }}
                  animate={activeCompany === company.name ? { y: 0, opacity: 1 } : { y: 5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {company.name}
                </motion.div>
              </motion.div>

              {/* Enhanced company stats tooltip */}
              <AnimatePresence>
                {activeCompany === company.name && (
                  <motion.div
                    className="absolute top-full left-1/2 transform -translate-x-1/2 mt-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl p-4 min-w-[240px] z-20 border border-gray-100 dark:border-gray-700"
                    initial={{ opacity: 0, y: -5, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -5, scale: 0.95 }}
                    transition={{ duration: 0.3, type: "spring", stiffness: 500, damping: 30 }}
                    style={{
                      boxShadow: `0 8px 30px -5px ${company.color}30`,
                    }}
                  >
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 rotate-45 bg-white dark:bg-gray-800 border-t border-l border-gray-100 dark:border-gray-700" />

                    <div className="text-center mb-3 pb-2 border-b border-gray-100 dark:border-gray-700">
                      <div
                        className="inline-block h-1 w-10 rounded-full mb-2"
                        style={{ backgroundColor: company.color }}
                      />
                      <h4 className="font-semibold">{company.name} Hires</h4>
                    </div>

                    <div className="space-y-2 text-sm mb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Recent Hires:</span>
                        <span className="font-medium">{company.hires}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Avg. Salary:</span>
                        <span className="font-medium">{company.avgSalary}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500 dark:text-gray-400">Top Role:</span>
                        <span className="font-medium">{company.topRole}</span>
                      </div>
                    </div>

                    {/* Added testimonial */}
                    <div className="text-xs italic text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-2 rounded-lg">
                      "{company.testimonial}"
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced view stats button */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.8 }}
        >
          <motion.button
            onClick={() => setShowStats(!showStats)}
            className="group flex items-center gap-2 px-5 py-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors shadow-sm hover:shadow"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>{showStats ? "Hide Employment Stats" : "View Employment Stats"}</span>
            <motion.span
              animate={{ rotate: showStats ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="inline-block"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2 4L6 8L10 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.span>
          </motion.button>
        </motion.div>

        {/* Enhanced employment stats */}
        <AnimatePresence>
          {showStats && (
            <motion.div
              ref={statsRef}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: { opacity: 0, height: 0 },
                visible: {
                  opacity: 1,
                  height: "auto",
                  transition: {
                    height: { duration: 0.4 },
                    opacity: { duration: 0.3, delay: 0.2 },
                  },
                },
              }}
            >
              {employmentStats.map((stat, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={statVariants}
                  className="relative overflow-hidden bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition-shadow group"
                >
                  {/* Background gradient */}
                  <div
                    className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 transition-opacity duration-500 -z-10"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${stat.color.split(" ")[1]}, ${stat.color.split(" ")[3]})`,
                    }}
                  />

                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-lg bg-gradient-to-br ${stat.color} text-white`}>{stat.icon}</div>
                    <div>
                      <motion.div
                        className="text-2xl font-bold text-gray-900 dark:text-white flex items-baseline gap-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      >
                        <span>{stat.value}</span>
                        <motion.div
                          className="inline-block h-1 w-3 rounded-full"
                          style={{
                            backgroundImage: `linear-gradient(to right, ${stat.color.split(" ")[1]}, ${stat.color.split(" ")[3]})`,
                          }}
                          initial={{ width: 0 }}
                          animate={{ width: 12 }}
                          transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                        />
                      </motion.div>
                      <div className="text-sm font-medium text-gray-700 dark:text-gray-300">{stat.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{stat.description}</div>
                    </div>
                  </div>

                  {/* Decorative corner accent */}
                  <div
                    className="absolute -bottom-1 -right-1 w-12 h-12 rounded-tl-xl bg-gradient-to-tl opacity-10 dark:opacity-5"
                    style={{
                      backgroundImage: `linear-gradient(to top left, ${stat.color.split(" ")[1]}, ${stat.color.split(" ")[3]})`,
                    }}
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Enhanced bottom gradient line */}
        <div className="relative h-px w-full bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent mt-8">
          <motion.div
            className="absolute top-0 left-0 h-px w-0"
            style={{
              backgroundImage: `linear-gradient(to right, ${activeColor}80, ${activeColor}40)`,
            }}
            animate={isInView ? { width: "100%" } : { width: 0 }}
            transition={{ duration: 1.5, delay: 0.5 }}
          />
        </div>
      </div>
    </section>
  )
}

