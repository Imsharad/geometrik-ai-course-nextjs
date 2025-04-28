"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Users } from "lucide-react"
import { PlaceholderImage } from "@/components/shared/placeholder-image"
import { getDomainClasses } from "./constants"

interface StudentInfoSectionProps {
  student: string
  cohort: string
  studentImage?: string
  studentBackground?: string
  domain: string
}

export function StudentInfoSection({
  student,
  cohort,
  studentImage,
  studentBackground,
  domain
}: StudentInfoSectionProps) {
  if (!student || !studentBackground) return null

  const domainClasses = getDomainClasses(domain)
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}
      className="p-6 rounded-xl border shadow-sm bg-card text-card-foreground relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.02] pointer-events-none mix-blend-soft-light" />
      
      {/* Animated accent on hover */}
      <div className={`absolute top-0 left-0 w-0 h-1 ${domainClasses.accent} group-hover:w-full transition-all duration-500 ease-out`}></div>
      
      <h3 className="text-lg font-bold mb-5 flex items-center group">
        <Users className={`h-4 w-4 mr-2 text-primary/80 group-hover:scale-110 transition-transform duration-300`} />
        <span className="relative">
          About the Student
          <span className={`absolute -bottom-px left-0 w-0 h-px ${domainClasses.accent} group-hover:w-full transition-all duration-500 ease-out`}></span>
        </span>
      </h3>
      
      <div className="flex items-start space-x-4 mb-5">
        {/* Student image with polished styling */}
        <motion.div 
          className="relative h-16 w-16 rounded-full overflow-hidden border shadow-md group/avatar"
          whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 400, damping: 10 } }}
        >
          {studentImage ? (
            <Image
              src={studentImage}
              alt={student || "Student"}
              fill
              className="object-cover group-hover/avatar:scale-110 transition-transform duration-700"
            />
          ) : (
            <PlaceholderImage
              alt={student || "Student"}
              fill
              className="object-cover group-hover/avatar:scale-110 transition-transform duration-700"
              category="people"
              seed={student ? encodeURIComponent(student) : undefined}
              keywords={`profile,professional,${domain.toLowerCase()}`}
            />
          )}
        </motion.div>
        <div>
          <h4 className="font-semibold text-base">{student}</h4>
          <p className="text-sm text-muted-foreground">Cohort {cohort}</p>
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground/90 leading-relaxed border-t border-border/40 pt-4 group-hover:text-muted-foreground transition-colors duration-300">{studentBackground}</p>
    </motion.div>
  )
} 