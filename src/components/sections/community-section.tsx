"use client"

import { useRef, useState } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MessageSquare,
  Users,
  Calendar,
  Share2,
  FileQuestion,
  Globe,
  ArrowRight,
  Heart,
  ThumbsUp,
  Clock,
  Sparkles,
  BookOpen,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function CommunitySection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeTab, setActiveTab] = useState("discussions")
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)

  // Community stats
  const communityStats = [
    { id: 1, label: "Active Members", value: "2,500+", icon: Users },
    { id: 2, label: "Daily Discussions", value: "75+", icon: MessageSquare },
    { id: 3, label: "Monthly Events", value: "12", icon: Calendar },
    { id: 4, label: "Resources Shared", value: "850+", icon: Share2 },
  ]

  // Community features
  const communityFeatures = [
    {
      id: 1,
      title: "Dedicated Q&A Forum",
      description: "Get help with specific challenges and learn from others' questions",
      icon: FileQuestion,
    },
    {
      id: 2,
      title: "Live Discussion Channels",
      description: "Connect in real-time with peers and instructors on various topics",
      icon: MessageSquare,
    },
    {
      id: 3,
      title: "Resource Exchange",
      description: "Share and access valuable resources contributed by the community",
      icon: Share2,
    },
    {
      id: 4,
      title: "Events & Workshops",
      description: "Participate in regular events, workshops, and live coding sessions",
      icon: Calendar,
    },
  ]

  // Community discussions
  const discussions = [
    {
      id: 1,
      author: "Taylor R.",
      avatar: "https://cdn.midjourney.com/bfdb39aa-e499-44b0-b226-5394d8113a2a/0_2.png",
      time: "2 hours ago",
      content:
        "Has anyone implemented the optimization techniques from Module 3.3? I'm seeing great results but wondering if there are any pitfalls I should watch out for.",
      likes: 12,
      replies: 4,
    },
    {
      id: 2,
      author: "Jordan M.",
      avatar: "https://cdn.midjourney.com/10579840-a472-4a8a-bf81-4a21d5b4b184/0_0.png",
      time: "5 hours ago",
      content:
        "Sharing my project from the Module 2 capstone if anyone wants to take a look and provide feedback! Link in thread.",
      likes: 18,
      replies: 7,
    },
    {
      id: 3,
      author: "Alex K.",
      avatar: "https://cdn.midjourney.com/9602ceab-21d7-4e7f-8faf-16968641f536/0_1.png",
      time: "Yesterday",
      content:
        "Just completed the advanced workshop and it was incredibly helpful. The instructor's approach to problem-solving really clicked for me.",
      likes: 24,
      replies: 9,
    },
  ]

  // Success stories
  const successStories = [
    {
      id: 1,
      author: "Sophia L.",
      avatar: "https://cdn.midjourney.com/9602ceab-21d7-4e7f-8faf-16968641f536/0_1.png",
      role: "Product Manager",
      company: "TechVision",
      content:
        "The community helped me tackle challenges I was facing at work and provided guidance that directly led to my promotion.",
      achievement: "Promotion to Senior PM",
    },
    {
      id: 2,
      author: "Marcus T.",
      avatar: "https://cdn.midjourney.com/10579840-a472-4a8a-bf81-4a21d5b4b184/0_0.png",
      role: "Full-Stack Developer",
      company: "StartupX",
      content:
        "I received invaluable feedback on my project from the community that helped me refine my approach and successfully launch.",
      achievement: "Successful Product Launch",
    },
  ]

  // Upcoming events
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        duration: 0.6,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 100 },
    },
  }

  const statVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 100,
        delay: i * 0.1,
      },
    }),
    hover: {
      y: -5,
      transition: { type: "spring", damping: 15, stiffness: 400 },
    },
  }

  return (
    <section
      ref={ref}
      className="py-24 relative overflow-hidden isolate"
      id="community"
      aria-labelledby="community-heading"
    >
      {/* Background elements */}
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

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full bg-blue-400/5 blur-[120px] opacity-40"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-400/5 blur-[100px] opacity-30"></div>

        {/* Accent lines */}
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-gray-200 to-transparent opacity-70"></div>
      </div>

      <motion.div
        className="container px-6 max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <Badge className="mb-4 px-3 py-1.5 bg-black text-white border-none">
            <Users className="mr-2 h-3.5 w-3.5" /> Join Our Community
          </Badge>
          <h2
            id="community-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700"
          >
            Learn Together, Grow Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Connect with fellow learners, get support, and accelerate your growth through collaborative learning and
            networking opportunities.
          </p>
        </motion.div>

        {/* Community visualization */}
        <motion.div className="relative h-64 mb-16 flex items-center justify-center" variants={itemVariants}>
          <div className="relative w-full max-w-md h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
                  <Globe className="h-12 w-12 text-gray-400" />
                </div>

                {/* Connection nodes */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * Math.PI * 2) / 8
                  // Round to 6 decimal places to ensure consistency
                  const x = Math.round(Math.cos(angle) * 80 * 1000000) / 1000000
                  const y = Math.round(Math.sin(angle) * 80 * 1000000) / 1000000

                  return (
                    <motion.div
                      key={`connection-node-${i}`}
                      className="absolute w-3 h-3 rounded-full bg-blue-500"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      suppressHydrationWarning
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{
                        scale: 1,
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
                      <stop offset="0%" stopColor="rgba(59, 130, 246, 0.2)" />
                      <stop offset="100%" stopColor="rgba(139, 92, 246, 0.2)" />
                    </linearGradient>
                  </defs>
                  {[...Array(12)].map((_, i) => {
                    const delay = 0.8 + i * 0.1
                    // Calculate and round coordinates to ensure consistent values
                    const x2 = Math.round((50 + Math.cos((i * Math.PI * 2) / 12) * 45) * 1000000) / 1000000
                    const y2 = Math.round((50 + Math.sin((i * Math.PI * 2) / 12) * 45) * 1000000) / 1000000
                    return (
                      <motion.line
                        key={`connection-line-${i}`}
                        x1="50%"
                        y1="50%"
                        x2={`${x2}%`}
                        y2={`${y2}%`}
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
                        suppressHydrationWarning
                      />
                    )
                  })}
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community stats */}
        <motion.div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16" variants={itemVariants}>
          {communityStats.map((stat, index) => {
            const StatIcon = stat.icon
            return (
              <motion.div
                key={stat.id}
                custom={index}
                variants={statVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredStat(stat.id)}
                onHoverEnd={() => setHoveredStat(null)}
              >
                <Card
                  className={cn(
                    "h-full border-0 bg-white/80 backdrop-blur-sm shadow-sm overflow-hidden transition-all duration-300",
                    hoveredStat === stat.id ? "shadow-md" : "",
                  )}
                >
                  <CardContent className="p-6 text-center">
                    <div className="mb-3 inline-flex items-center justify-center w-12 h-12 rounded-full bg-gray-100 text-gray-500 transition-transform duration-300 group-hover:scale-110">
                      <StatIcon className="h-6 w-6" />
                    </div>
                    <motion.div
                      className="text-3xl font-bold mb-1"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-gray-500">{stat.label}</div>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Main content area */}
        <div className="grid md:grid-cols-12 gap-8">
          {/* Left column - Features */}
          <motion.div className="md:col-span-4 space-y-6" variants={itemVariants}>
            <h3 className="text-xl font-bold mb-4 flex items-center">
              <Sparkles className="h-5 w-5 mr-2 text-blue-500" />
              Community Features
            </h3>

            <div className="space-y-4">
              {communityFeatures.map((feature, index) => {
                const FeatureIcon = feature.icon
                return (
                  <motion.div
                    key={feature.id}
                    className="p-4 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-blue-50 text-blue-500">
                        <FeatureIcon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">{feature.title}</h4>
                        <p className="text-sm text-gray-500">{feature.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="pt-4">
              <Button className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white shadow-sm group">
                <span className="flex items-center">
                  Explore All Features
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Button>
            </div>
          </motion.div>

          {/* Right column - Tabs */}
          <motion.div className="md:col-span-8" variants={itemVariants}>
            <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-3 mb-6 bg-white/80 backdrop-blur-sm p-1 rounded-lg border shadow-sm">
                <TabsTrigger
                  value="discussions"
                  className="rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Discussions
                </TabsTrigger>
                <TabsTrigger
                  value="success"
                  className="rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Success Stories
                </TabsTrigger>
                <TabsTrigger
                  value="events"
                  className="rounded-md data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:shadow-sm transition-all duration-300"
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
                              key={`discussion-${discussion.id}`}
                              className={cn(
                                "p-4 rounded-lg transition-colors",
                                index % 2 === 0 ? "bg-gray-50" : "bg-white",
                              )}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.4 }}
                              whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.8)" }}
                            >
                              <div className="flex items-start gap-3 mb-3">
                                <Avatar className="h-10 w-10 border-2 border-white">
                                  <AvatarImage src={discussion.avatar} alt={discussion.author} />
                                  <AvatarFallback>{discussion.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                  <div className="flex justify-between items-center mb-1">
                                    <h4 className="font-medium">{discussion.author}</h4>
                                    <span className="text-xs text-gray-500 flex items-center">
                                      <Clock className="h-3 w-3 mr-1" />
                                      {discussion.time}
                                    </span>
                                  </div>
                                  <p className="text-sm text-gray-600">{discussion.content}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 ml-12">
                                <span className="text-xs text-gray-500 flex items-center">
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  {discussion.likes} likes
                                </span>
                                <span className="text-xs text-gray-500 flex items-center">
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
                            className="text-blue-500 border-blue-200 hover:bg-blue-50"
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
                              className="p-5 bg-white rounded-lg border border-gray-100 shadow-sm"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.4 }}
                              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                            >
                              <div className="flex items-start gap-4">
                                <Avatar className="h-12 w-12 border-2 border-white">
                                  <AvatarImage src={story.avatar} alt={story.author} />
                                  <AvatarFallback>{story.author[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{story.author}</h4>
                                  <p className="text-sm text-gray-500 mb-3">
                                    {story.role} at {story.company}
                                  </p>
                                  <p className="text-sm text-gray-600 mb-3">{story.content}</p>
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
                            className="text-blue-500 border-blue-200 hover:bg-blue-50"
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
                              className="p-4 bg-white rounded-lg border border-gray-100 shadow-sm"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 * index, duration: 0.4 }}
                              whileHover={{ y: -3, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)" }}
                            >
                              <div className="flex justify-between items-start mb-2">
                                <h4 className="font-medium">{event.title}</h4>
                                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">
                                  {event.attendees} Attending
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <Calendar className="h-4 w-4" />
                                <span>{event.date}</span>
                                <span>•</span>
                                <span>{event.time}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <BookOpen className="h-4 w-4 mr-1" />
                                <span>Hosted by {event.host}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        <div className="mt-6 text-center">
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-blue-500 border-blue-200 hover:bg-blue-50"
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
        <motion.div className="mt-16 text-center" variants={itemVariants}>
          <Card className="border-0 bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg overflow-hidden">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Ready to Join Our Community?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Connect with fellow learners, share your journey, and accelerate your growth with our supportive
                community of professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 10px 25px rgba(255, 255, 255, 0.3)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button className="bg-white text-blue-600 hover:bg-blue-50 shadow-sm">
                    <span className="flex items-center">
                      Join Community
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
                  </Button>
                </motion.div>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </section>
  )
}

