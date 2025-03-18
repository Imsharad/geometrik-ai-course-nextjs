"use client"

import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, threshold: 0.1 })
  const [activeTab, setActiveTab] = useState("discussions")

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

        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] rounded-full bg-indigo-800/5 blur-[120px] opacity-40"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[100px] opacity-30"></div>
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
                  <Globe className="h-12 w-12 text-indigo-700" />
                </div>

                {/* Connection nodes */}
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
                <StatIcon className="h-6 w-6 mx-auto mb-3 text-indigo-700" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>

        <motion.div className="mb-16" variants={fadeIn} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <h3 className="text-xl font-semibold mb-8 text-center">Community Features</h3>
          <div className="grid md:grid-cols-2 gap-6">
            {communityFeatures.map((feature) => (
              <div
                key={feature.id}
                className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
              >
                <div className="p-3 rounded-full bg-indigo-50">{feature.icon}</div>
                <div>
                  <h4 className="font-medium mb-2">{feature.title}</h4>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Discussions */}
        <motion.div className="mb-16" variants={fadeIn} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <Tabs defaultValue="discussions" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-3 mb-8">
              <TabsTrigger
                value="discussions"
                className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white"
              >
                Discussions
              </TabsTrigger>
              <TabsTrigger value="success" className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white">
                Success Stories
              </TabsTrigger>
              <TabsTrigger value="events" className="data-[state=active]:bg-indigo-700 data-[state=active]:text-white">
                Upcoming Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="discussions" className="mt-0">
              <div className="space-y-6">
                {discussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
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
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button variant="outline" size="sm" className="text-indigo-700 border-indigo-200 hover:bg-indigo-50">
                  View All Discussions
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="success" className="mt-0">
              <div className="p-12 text-center text-gray-500">Success stories content will appear here</div>
            </TabsContent>

            <TabsContent value="events" className="mt-0">
              <div className="p-12 text-center text-gray-500">Upcoming events content will appear here</div>
            </TabsContent>
          </Tabs>
        </motion.div>

        {/* Call to action */}
        <motion.div className="mt-16" variants={fadeIn} initial="hidden" animate={isInView ? "visible" : "hidden"}>
          <div className="bg-gradient-to-r from-indigo-700 to-indigo-900 text-white rounded-2xl p-12 shadow-lg overflow-hidden relative">
            {/* Background blur effects */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4 text-center">Ready to Join Our Community?</h3>
              <p className="text-indigo-100 mb-8 max-w-2xl mx-auto text-center">
                Connect with fellow learners, share your journey, and accelerate your growth with our supportive
                community of professionals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-white text-indigo-700 hover:bg-indigo-50">Join Community</Button>
                <Button variant="outline" className="border-white text-white hover:bg-white/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

