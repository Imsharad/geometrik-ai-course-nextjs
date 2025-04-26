"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "@/app/fix-framer-motion"
import { Globe, MessageCircle, Share2, Calendar, Users, MessageSquare, ThumbsUp, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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
    icon: <MessageSquare className="h-5 w-5 text-blue-500" />,
    title: "Dedicated Q&A Forum",
    description: "Get help with specific challenges and learn from others' questions",
  },
  {
    id: "discussion-channels",
    icon: <MessageCircle className="h-5 w-5 text-blue-500" />,
    title: "Live Discussion Channels",
    description: "Connect in real-time with peers and instructors on various topics",
  },
  {
    id: "resource-exchange",
    icon: <Share2 className="h-5 w-5 text-blue-500" />,
    title: "Resource Exchange",
    description: "Share and access valuable resources contributed by the community",
  },
  {
    id: "events-workshops",
    icon: <Calendar className="h-5 w-5 text-blue-500" />,
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
  },
]

export function CommunitySection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.1 })
  const [activeTab, setActiveTab] = useState("discussions")

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="py-24 relative overflow-hidden isolate"
      id="community"
      aria-labelledby="community-heading"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full bg-blue-400/5 blur-[120px] opacity-40"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-400/5 blur-[100px] opacity-30"></div>
      </div>

      <div className="container px-6 max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h2 id="community-heading" className="text-3xl md:text-5xl font-bold tracking-tight mb-4">
            Learn Together, Grow Together
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Connect with fellow learners, get support, and accelerate your growth through collaborative learning and
            networking opportunities.
          </p>
        </motion.div>

        {/* Community visualization */}
        <motion.div
          className="relative h-64 mb-16 flex items-center justify-center"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <div className="relative w-full max-w-md h-full">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-40 h-40 md:w-48 md:h-48">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-200 animate-spin-slow"></div>
                <div className="absolute inset-4 rounded-full border border-gray-100 bg-white/80 backdrop-blur-sm shadow-sm flex items-center justify-center">
                  <Globe className="h-12 w-12 text-blue-400" />
                </div>

                {/* Connection nodes */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * Math.PI * 2) / 8
                  // Round to 6 decimal places to ensure consistency
                  const x = Math.round(Math.cos(angle) * 80 * 1000000) / 1000000
                  const y = Math.round(Math.sin(angle) * 80 * 1000000) / 1000000

                  return (
                    <motion.div
                      key={i}
                      className="absolute w-3 h-3 rounded-full bg-blue-500"
                      style={{
                        left: `calc(50% + ${x}px)`,
                        top: `calc(50% + ${y}px)`,
                      }}
                      suppressHydrationWarning
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
              </div>
            </div>
          </div>
        </motion.div>

        {/* Community stats */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {communityStats.map((stat, index) => {
            const StatIcon = stat.icon
            return (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="flex justify-center mb-3">
                  <StatIcon className="h-7 w-7 text-blue-500" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Community features and tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden mb-16">
          <div className="grid md:grid-cols-2">
            {/* Features list */}
            <motion.div
              className="p-8 md:p-10 bg-gradient-to-br from-gray-50 to-gray-100"
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <h3 className="text-xl md:text-2xl font-bold mb-6">Community Features</h3>
              <div className="space-y-6">
                {communityFeatures.map((feature) => (
                  <motion.div key={feature.id} variants={fadeIn} className="flex items-start">
                    <div className="mt-1 mr-4 p-2 bg-white rounded-lg shadow-sm">{feature.icon}</div>
                    <div>
                      <h4 className="font-medium text-gray-900">{feature.title}</h4>
                      <p className="text-sm text-gray-500">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Discussions preview */}
            <motion.div
              className="p-8 md:p-10"
              variants={fadeIn}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl md:text-2xl font-bold">Community Activity</h3>
                  <TabsList className="bg-gray-100">
                    <TabsTrigger value="discussions" className="text-xs">Discussions</TabsTrigger>
                    <TabsTrigger value="events" className="text-xs">Events</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="discussions" className="m-0">
                  <div className="space-y-4">
                    {discussions.map((discussion) => (
                      <div key={discussion.id} className="p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <Avatar>
                            <AvatarImage src={discussion.avatar} alt={discussion.author} />
                            <AvatarFallback>{discussion.author.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <p className="font-medium text-sm">{discussion.author}</p>
                              <div className="flex items-center text-xs text-gray-500">
                                <Clock className="h-3 w-3 mr-1" />
                                {discussion.time}
                              </div>
                            </div>
                            <p className="mt-1 text-sm text-gray-600 line-clamp-2">{discussion.content}</p>
                            <div className="mt-2 flex items-center space-x-4">
                              <div className="flex items-center text-xs text-gray-500">
                                <ThumbsUp className="h-3 w-3 mr-1" />
                                {discussion.likes}
                              </div>
                              <div className="flex items-center text-xs text-gray-500">
                                <MessageSquare className="h-3 w-3 mr-1" />
                                {discussion.replies} replies
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="events" className="m-0">
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-blue-900">Upcoming Workshop</h4>
                          <p className="text-sm text-blue-700 mt-1">Advanced Techniques in Module 5</p>
                        </div>
                        <div className="bg-white rounded-md px-2 py-1 text-xs font-medium text-blue-800">Tomorrow</div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Ask Me Anything Session</h4>
                          <p className="text-sm text-gray-500 mt-1">With Senior Instructor David Chen</p>
                        </div>
                        <div className="bg-white rounded-md px-2 py-1 text-xs font-medium text-gray-700">Next Week</div>
                      </div>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-100 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Project Showcase</h4>
                          <p className="text-sm text-gray-500 mt-1">Present your work and receive feedback</p>
                        </div>
                        <div className="bg-white rounded-md px-2 py-1 text-xs font-medium text-gray-700">In 2 Weeks</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </motion.div>
          </div>
        </div>

        {/* Join CTA */}
        <motion.div
          className="text-center"
          variants={fadeIn}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-6">Join a Thriving Learning Community</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Connect with peers, get personalized support, and accelerate your learning journey with our active community
            of AI enthusiasts.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 h-auto text-lg rounded-xl">
              Become a Member
            </Button>
            <Button variant="outline" className="px-8 py-6 h-auto text-lg rounded-xl">
              Learn More
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 