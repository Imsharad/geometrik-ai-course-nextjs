"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"

export function Hero() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  }

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-white dark:bg-gray-950"
    >
      {/* Abstract background elements - reduced opacity and adjusted colors */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-blue-400/70 to-purple-500/70 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-gradient-to-r from-emerald-400/70 to-cyan-500/70 blur-3xl" />
      </div>

      {/* Grid pattern overlay - more subtle */}
      <div
        className="absolute inset-0 z-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #9ca3af 1px, transparent 1px), linear-gradient(to bottom, #9ca3af 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto max-w-4xl text-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants} className="mb-2">
            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              Student Success
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl dark:text-white"
          >
            Student Case Studies
            <span className="relative mt-2 block h-1.5 w-32 bg-blue-600 mx-auto rounded">
              <span className="absolute -top-4 left-0 h-1.5 w-3/4 bg-emerald-500 blur-sm"></span>
            </span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-300"
          >
            Explore real-world AI projects completed by our graduates. See how our curriculum translates into impactful
            solutions across industries.
          </motion.p>

          {/* Floating icons representing different industries */}
          <div className="mt-12 flex justify-center space-x-8">
            {[
              { icon: "💼", label: "Business" },
              { icon: "🏥", label: "Healthcare" },
              { icon: "🏭", label: "Manufacturing" },
              { icon: "🛒", label: "Retail" },
              { icon: "🔬", label: "Research" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.4 + index * 0.1,
                      duration: 0.6,
                      ease: "easeOut",
                    },
                  },
                }}
                className="flex flex-col items-center"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-2xl shadow-md dark:bg-slate-700">
                  {item.icon}
                </span>
                <span className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-400">{item.label}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 