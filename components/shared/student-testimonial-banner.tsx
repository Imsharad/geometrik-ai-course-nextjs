"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { studentImages } from "@/components/student-images"
import { Star } from "lucide-react"

export function StudentTestimonialBanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.2 })

  const testimonials = [
    {
      id: 1,
      name: "Jennifer K.",
      role: "Senior Developer",
      quote: "This course transformed my approach to problem-solving.",
      image: studentImages.jennifer,
    },
    {
      id: 2,
      name: "Marcus T.",
      role: "CTO",
      quote: "The practical insights helped me lead my team to new heights.",
      image: studentImages.marcus,
    },
    {
      id: 3,
      name: "Sophia R.",
      role: "Product Manager",
      quote: "My product metrics improved dramatically after applying these techniques.",
      image: studentImages.sophia,
    },
    {
      id: 4,
      name: "Alex K.",
      role: "Full-Stack Developer",
      quote: "The community support alone is worth the investment.",
      image: studentImages.alex,
    },
  ]

  return (
    <section ref={ref} className="py-6 bg-gradient-to-r from-gray-50 via-white to-gray-50 border-y border-gray-100">
      <div className="container">
        <motion.div
          className="flex flex-wrap justify-center gap-4 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="flex items-center gap-2 bg-white rounded-full pl-1 pr-4 py-1 shadow-sm border border-gray-100 max-w-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -3, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <Avatar className="h-8 w-8 border-2 border-white">
                <AvatarImage src={testimonial.image} alt={testimonial.name} />
                <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-2 w-2 fill-amber-500" />
                  ))}
                </div>
                <p className="text-xs text-gray-600 truncate">{testimonial.quote}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

