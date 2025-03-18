"use client"

import { cn } from "@/lib/utils"

import { useState, useRef, useEffect } from "react"
// Import from our fixed version instead of directly from framer-motion
import { motion, useInView, AnimatePresence } from "./fix-framer-motion"
import {
  Globe,
  MessageCircle,
  Share2,
  Calendar,
  Users,
  MessageSquare,
  ThumbsUp,
  Clock,
  ArrowRight,
  Sparkles,
  Heart,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// Enhanced animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeInRight = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const fadeInLeft = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

// Community stats data
const communityStats = [
  { value: "2,500+", label: "Active Members", icon: Users },
  { value: "75+", label: "Daily Discussions", icon: MessageCircle },
  { value: "12", label: "Monthly Events", icon: Calendar },
  { value: "850+", label: "Resources Shared", icon: Share2 },
]

// Community features data
const communityFeatures = [
  {
    id: "qa-forum",
    icon: <MessageSquare className="h-5 w-5 text-indigo-700" />,
    title: "Dedicated Q&A Forum",
    description: "Get help with specific challenges and learn from others' questions",
  },
  {
    id: "discussion-channels",
    icon: <MessageCircle className="h-5 w-5 text-indigo-700" />,
    title: "Live Discussion Channels",
    description: "Connect in real-time with peers and instructors on various topics",
  },
  {
    id: "resource-exchange",
    icon: <Share2 className="h-5 w-5 text-indigo-700" />,
    title: "Resource Exchange",
    description: "Share and access valuable resources contributed by the community",
  },
  {
    id: "events-workshops",
    icon: <Calendar className="h-5 w-5 text-indigo-700" />,
    title: "Events & Workshops",
    description: "Participate in regular events, workshops, and live coding sessions",
  },
]

// Discussion data
const discussions = [
  {
    id: 1,
    author: "Taylor R.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "2 hours ago",
    content:
      "Hey, anyone implementing the application I've designed from Module 6.3? I'm seeing great results but wondering if anyone has tips on optimizing the project. Particularly interested in performance tips!",
    likes: 12,
    replies: 4,
    tags: ["Module 6.3", "Optimization"],
  },
  {
    id: 2,
    author: "Jordan M.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "5 hours ago",
    content:
      "Sharing my project from Module 3! I've followed the techniques in section 4 and applied it with a twist. Would love to hear your feedback on my implementation.",
    likes: 18,
    replies: 7,
    tags: ["Module 3", "Project Showcase"],
  },
  {
    id: 3,
    author: "Alex K.",
    avatar: "/placeholder.svg?height=40&width=40",
    time: "Yesterday",
    content:
      "Just completed the advanced workshop and it was incredibly helpful. The instructor's approach to problem-solving really clicked for me. Has anyone else applied these techniques to real-world projects?",
    likes: 24,
    replies: 9,
    tags: ["Workshop", "Problem Solving"],
  },
]

// Success stories data
const successStories = [
  {
    id: 1,
    author: "Sophia L.",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "Product Manager",
    company: "TechVision",
    content:
      "The community helped me tackle challenges I was facing at work and provided guidance that directly led to my promotion.",
    achievement: "Promotion to Senior PM",
  },
  {
    id: 2,
    author: "Marcus T.",
    avatar: "/placeholder.svg?height=60&width=60",
    role: "Full-Stack Developer",
    company: "StartupX",
    content:
      "I received invaluable feedback on my project from the community that helped me refine my approach and successfully launch.",
    achievement: "Successful Product Launch",
  },
]

// Upcoming events data
const upcomingEvents = [
  {
    id: 1,
    title: "Advanced Optimization Workshop",
    date: "June 15, 2025",
    time: "1:00 PM - 3:00 PM EST",
    host: "Dr. Alex Johnson",
    attendees: 45,
  },
  {
    id: 2,
    title: "Monthly Q&A Session",
    date: "June 22, 2025",
    time: "11:00 AM - 12:30 PM EST",
    host: "Teaching Team",
    attendees: 120,
  },
  {
    id: 3,
    title: "Project Showcase",
    date: "June 30, 2025",
    time: "2:00 PM - 4:00 PM EST",
    host: "Community Leaders",
    attendees: 85,
  },
]

export function CommunitySectionRefined() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState("discussions")
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [isGlobeHovered, setIsGlobeHovered] = useState(false)

  // Parallax effect for background elements
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section
      ref={ref}
      className="py-32 relative overflow-hidden isolate"
      id="community"
      aria-labelledby="community-heading"
    >
      {/* Enhanced background elements with parallax effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>

        {/* Subtle patterns */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: "30px 30px",
          }}
        />

        {/* Gradient orbs with parallax */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full bg-indigo-800/5 blur-[120px] opacity-40"
          style={{
            top: `${25 - scrollY * 0.02}%`,
            left: `${25 - scrollY * 0.01}%`,
          }}
        ></div>
        <div
          className="absolute w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[100px] opacity-30"
          style={{
            bottom: `${33 + scrollY * 0.02}%`,
            right: `${25 + scrollY * 0.01}%`,
          }}
        ></div>

        {/* Accent lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-indigo-200 to-transparent opacity-70"></div>
      </div>

      <div className="container px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-20"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <Badge className="mb-4 px-3 py-1.5 bg-indigo-50 text-indigo-700 border-none">
            <Users className="mr-2 h-3.5 w-3.5" /> Join Our Community
          </Badge>
          <h2
            id="community-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-700 via-indigo-800 to-indigo-900"
          >
            Learn Together, Grow Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Connect with fellow learners, get support, and accelerate your growth through collaborative learning and
            networking opportunities.
          </p>
        </motion.div>

        {/* Enhanced community visualization */}
        <motion.div
          className="relative h-64 mb-20 flex items-center justify-center"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          onMouseEnter={() => setIsGlobeHovered(true)}
          onMouseLeave={() => setIsGlobeHovered(false)}
        >
          <div className="relative w-full max-w-md h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-dashed border-indigo-200"
                  animate={{
                    rotate: 360,
                    transition: { duration: 40, ease: "linear", repeat: Number.POSITIVE_INFINITY },
                  }}
                ></motion.div>

                <motion.div
                  className="absolute inset-4 rounded-full border border-indigo-100 bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center"
                  animate={{
                    boxShadow: isGlobeHovered ? "0 0 30px rgba(79, 70, 229, 0.4)" : "0 0 15px rgba(79, 70, 229, 0.2)",
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Globe className="h-12 w-12 text-indigo-700" />
                </motion.div>

                {/* Connection nodes with enhanced animation */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * Math.PI * 2) / 8
                  const x = Math.cos(angle) * 80
                  const y = Math.sin(angle) * 80

                  return (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-indigo-600"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: [0, 1.2, 1],
                        opacity: 1,
                      }}
                      transition={{
                        delay: 0.5 + i * 0.1,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  )
                })}

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full" style={{ transform: "rotate(-45deg)" }}>
                  <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="rgba(79, 70, 229, 0.2)" />
                      <stop offset="100%" stopColor="rgba(99, 102, 241, 0.2)" />
                    </linearGradient>
                  </defs>
                  {[...Array(12)].map((_, i) => {
                    const delay = 0.8 + i * 0.1
                    return (
                      <motion.line
                        key={i}
                        x1="50%"
                        y1="50%"
                        x2={`${50 + Math.cos((i * Math.PI * 2) / 12) * 45}%`}
                        y2={`${50 + Math.sin((i * Math.PI * 2) / 12) * 45}%`}
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        strokeDasharray="3,3"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{
                          pathLength: 1,
                          opacity: 0.6,
                        }}
                        transition={{
                          delay,
                          duration: 1.5,
                          ease: "easeOut",
                        }}
                      />
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Enhanced community stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {communityStats.map((stat, index) => {
            const StatIcon = stat.icon
            return (
              <motion.div
                key={index}
                custom={index}
                variants={fadeIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                onMouseEnter={() => setHoveredStat(index)}
                onMouseLeave={() => setHoveredStat(null)}
              >
                <Card
                  className={cn(
                    "h-full border-0 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden transition-all duration-300",
                    hoveredStat === index ? "shadow-md" : "",
                  )}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-50 text-indigo-700 transition-transform duration-300 group-hover:scale-110">
                      <StatIcon className="h-6 w-6" />
                    </div>
                    <motion.div
                      className="text-3xl font-bold mb-1 text-indigo-900"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-indigo-600">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main content area */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left column - Features */}
          <motion.div
            className="md:col-span-4 space-y-6"
            variants={fadeInRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-indigo-500" />
              Community Features
            </h3>

            <div className="space-y-4">
              {communityFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-indigo-50 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-indigo-50 text-indigo-700">{feature.icon}</div>
                    <div>
                      <h4 className="font-medium mb-1 text-indigo-900">{feature.title}</h4>
                      <p className="text-sm text-indigo-700/80">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="pt-4">
              <Button className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white shadow-sm group">
                <span className="flex items-center">
                  Explore All Features
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </motion.div>

          {/* Right column - Tabs */}
          <motion.div
            className="md:col-span-8"
            variants={fadeInLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6 bg-white/80 backdrop-blur-sm p-1 rounded-lg border shadow-sm">
                <TabsTrigger
                  value="discussions"
                  className="rounded-md data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger
                  value="success"
                  className="rounded-md data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Success Stories
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="rounded-md data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Upcoming Events
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <TabsContent value="discussions" className="mt-0">
                    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {discussions.map((discussion, index) => (
                            <motion.div
                              key={discussion.id}
                              className={cn(
                                "p-4 rounded-lg transition-colors",
                                index % 2 === 0 ? "bg-indigo-50/50" : "bg-white",
                              )}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.4 }}
                              whileHover={{ backgroundColor: "rgba(238, 242, 255, 0.8)" }}
                            >
                              <div className="flex items-start gap-3 mb-3">
                                <Avatar className="h-10 w-10 border-2 border-white shadow-sm">
                                  <AvatarImage src={discussion.avatar} alt={discussion.author} />
                                  <AvatarFallback className="bg-indigo-100 text-indigo-700">
                                    {discussion.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-medium text-indigo-900">{discussion.author}</h4>
                                    <span className="text-xs text-indigo-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {discussion.time}
                                    </span>
                                  </div>
                                  <p className="text-sm text-indigo-800/90 mb-2">{discussion.content}</p>
                                  <div className="flex flex-wrap gap-2">
                                    {discussion.tags.map((tag, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="bg-indigo-100/70 text-indigo-700 hover:bg-indigo-200 border-none text-xs"
                                      >
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 ml-12">
                                <span className="text-xs text-indigo-600 flex items-center">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {discussion.likes} likes
                                </span>
                                <span className="text-xs text-indigo-600 flex items-center">
                                  <MessageSquare className="h-3 w-3 mr-1" />
                                  {discussion.replies} replies
                                </span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                          >
                            View All Discussions
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="success" className="mt-0">
                    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="space-y-6">
                          {successStories.map((story, index) => (
                            <motion.div
                              key={story.id}
                              className="p-5 bg-white rounded-lg border border-indigo-100 shadow-sm"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.4 }}
                              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                            >
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                                  <AvatarImage src={story.avatar} alt={story.author} />
                                  <AvatarFallback className="bg-indigo-100 text-indigo-700">
                                    {story.author[0]}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium text-indigo-900">{story.author}</h4>
                                  <p className="text-sm text-indigo-600 mb-3">
                                    {story.role} at {story.company}
                                  </p>
                                  <p className="text-sm text-indigo-800/80 mb-3">{story.content}</p>
                                  <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-0">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    {story.achievement}
                                  </Badge>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                          >
                            Read More Success Stories
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="events" className="mt-0">
                    <Card className="border-0 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden">
                      <CardContent className="p-6">
                        <div className="space-y-4">
                          {upcomingEvents.map((event, index) => (
                            <motion.div
                              key={event.id}
                              className="p-4 bg-white rounded-lg border border-indigo-100 shadow-sm"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.4 }}
                              whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium text-indigo-900">{event.title}</h4>
                                <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 border-0">
                                  {event.attendees} Attending
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-indigo-600 mb-2">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                                <span>•</span>
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center text-sm text-indigo-600">
                                <Users className="h-4 w-4 mr-1" />
                                <span>Hosted by {event.host}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                          >
                            View All Events
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </motion.div>
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-20"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          transition={{ delay: 0.4 }}
        >
          <Card className="border-0 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white shadow-lg overflow-hidden relative">
            {/* Background blur effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <CardContent className="p-12">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-4 text-center">Ready to Join Our Community?</h3>
                <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-center">
                  Connect with fellow learners, share your journey, and accelerate your growth with our supportive
                  community of professionals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-white text-indigo-700 hover:bg-indigo-50 shadow-md hover:shadow-lg transition-all duration-300"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)",
                      transition: { duration: 0.2 },
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="flex items-center">
                      Join Community
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                  <Button variant="outline" className="border-white text-white hover:bg-white/10">
                    Learn More
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

