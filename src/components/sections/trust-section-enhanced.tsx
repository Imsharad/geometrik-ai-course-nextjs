"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useInView } from "@/app/fix-framer-motion"
import Image from "next/image"
import { batchFetchLogos } from "../utils/logo-fetcher"

export function TrustSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [logoUrls, setLogoUrls] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(true)

  // Companies we want to display with their domains
  const companies = [
    { name: "Google", domain: "google.com" },
    { name: "Microsoft", domain: "microsoft.com" },
    { name: "Amazon", domain: "amazon.com" },
    { name: "Meta", domain: "meta.com" },
    { name: "Apple", domain: "apple.com" },
    { name: "Netflix", domain: "netflix.com" },
  ]

  // Fetch all logos on component mount
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const logos = await batchFetchLogos(companies)
        setLogoUrls(logos)
      } catch (error) {
        console.error("Error fetching logos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLogos()
  }, [])

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

  return (
    <section ref={ref} className="py-12 border-b">
      <div className="container">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-sm text-gray-500">Geometrik.ai graduates work at leading technology companies worldwide</p>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {isLoading ? (
            // Show skeleton loaders while fetching
            <>
              {Array.from({ length: 6 }).map((_, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="h-8 w-24 bg-gray-200 animate-pulse rounded"
                />
              ))}
            </>
          ) : (
            // Show actual logos once loaded
            companies.map((company, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="grayscale opacity-70 hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logoUrls[company.name] || `/placeholder.svg?height=40&width=120&text=${company.name}`}
                  alt={`${company.name} logo`}
                  width={120}
                  height={40}
                  className="h-8 w-auto object-contain"
                  unoptimized // Important for external images
                />
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </section>
  )
}

