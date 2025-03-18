"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { studentImages } from "@/components/student-images"
import { MessageCircle } from "lucide-react"

export function FloatingStudentAvatars() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeAvatar, setActiveAvatar] = useState(0)

  // Show the component after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 8000) // Longer delay to be less intrusive

    return () => clearTimeout(timer)
  }, [])

  // Rotate through avatars
  useEffect(() => {
    if (!isVisible) return

    const interval = setInterval(() => {
      setActiveAvatar((prev) => (prev + 1) % 4)
    }, 5000) // Slower rotation

    return () => clearInterval(interval)
  }, [isVisible])

  const students = [
    { name: "Jennifer K.", image: studentImages.jennifer, message: "Just completed module 3!" },
    { name: "Marcus T.", image: studentImages.marcus, message: "Great discussion today!" },
    { name: "Sophia R.", image: studentImages.sophia, message: "Loving the course content!" },
    { name: "Alex K.", image: studentImages.alex, message: "Thanks for the feedback!" },
  ]

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 left-6 z-50 hidden lg:block">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeAvatar}
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="flex items-center gap-3 bg-white/90 backdrop-blur-sm rounded-full pl-1 pr-5 py-1 shadow-sm border border-gray-100"
        >
          <div className="relative">
            <Avatar className="h-8 w-8 border-2 border-white">
              <AvatarImage src={students[activeAvatar].image} alt={students[activeAvatar].name} />
              <AvatarFallback>{students[activeAvatar].name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
              <MessageCircle className="h-2 w-2 text-white" />
            </div>
          </div>
          <div>
            <p className="text-xs font-medium">{students[activeAvatar].name}</p>
            <p className="text-xs text-gray-600">{students[activeAvatar].message}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

