"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "@/app/fix-framer-motion"
import { ChevronDown, Sparkles, ArrowRight, PlayCircle, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { HeroParticlesAnimation } from "@/components/hero/hero-particles-animation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { studentImages } from "@/components/student-images"
import Link from "next/link"

// Add a new component for student avatars in the hero section
function StudentAvatars() {
  return (
    <div className="flex -space-x-3">
      <Avatar className="w-8 h-8 border-2 border-background">
        <AvatarImage src={studentImages.jennifer} alt="Student" />
        <AvatarFallback>J</AvatarFallback>
      </Avatar>
      <Avatar className="w-8 h-8 border-2 border-background">
        <AvatarImage src={studentImages.marcus} alt="Student" />
        <AvatarFallback>M</AvatarFallback>
      </Avatar>
      <Avatar className="w-8 h-8 border-2 border-background">
        <AvatarImage src={studentImages.sophia} alt="Student" />
        <AvatarFallback>S</AvatarFallback>
      </Avatar>
      <Avatar className="w-8 h-8 border-2 border-background">
        <AvatarImage src={studentImages.alex} alt="Student" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>
    </div>
  )
}

export function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Subtle gradient base */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>

      {/* Fine grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), 
                          linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Accent lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/0 via-primary/10 to-primary/0"></div>
      <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/0 via-primary/10 to-primary/0"></div>
      <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0"></div>

      {/* Colorful diffused glows - increased opacity and size */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-blue-400/20 blur-[120px] opacity-80 hero-glow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-[100px] opacity-70 hero-glow"></div>
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-400/20 blur-[80px] opacity-60 hero-glow"></div>
      <div className="absolute bottom-1/4 right-1/3 w-[550px] h-[550px] rounded-full bg-emerald-400/20 blur-[90px] opacity-50 hero-glow"></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-rose-400/15 blur-[70px] opacity-60 hero-glow transform -translate-x-1/2 -translate-y-1/2"></div>

      {/* Additional color accents */}
      <div className="absolute top-[15%] right-[20%] w-[200px] h-[200px] rounded-full bg-cyan-400/20 blur-[60px] opacity-60 hero-glow"></div>
      <div className="absolute bottom-[20%] left-[15%] w-[250px] h-[250px] rounded-full bg-indigo-400/20 blur-[70px] opacity-50 hero-glow"></div>

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/80 opacity-80"></div>

      {/* Particle network effect */}
      <HeroParticlesAnimation />
    </div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
}

export function HeroSection() {
  const [username, setUsername] = useState("")
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 50])

  // Simulate personalization by using a visitor name
  useEffect(() => {
    const names = ["there", "learner", "future expert", "professional"]
    const randomName = names[Math.floor(Math.random() * names.length)]
    const timer = setTimeout(() => {
      setUsername(randomName)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section ref={heroRef} className="relative min-h-screen pt-24 overflow-hidden" id="hero">
      {/* Background */}
      <HeroBackground />

      <motion.div
        className="container relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-6 py-16 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity, scale, y }}
      >
        {/* Featured Badge */}
        <motion.div variants={itemVariants} className="mb-8">
          <Badge
            variant="outline"
            className="py-2 px-5 gap-2 text-sm bg-background/80 backdrop-blur-sm border-primary/20"
          >
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-primary font-medium">Featured Course</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">New for 2025</span>
          </Badge>
        </motion.div>

        {username && (
          <motion.div className="mb-8 text-lg sm:text-xl" variants={itemVariants}>
            <span className="text-muted-foreground">Welcome,</span> <span className="font-medium">{username}</span>
          </motion.div>
        )}

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/80"
          variants={itemVariants}
        >
          Master{" "}
          <span className="text-primary relative inline-block">
            AI Agents
            <svg
              className="absolute -bottom-2 left-0 w-full h-2 text-primary/30"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <path d="M0,0 Q50,12 100,0" fill="none" stroke="currentColor" strokeWidth="3" />
            </svg>
          </span>{" "}
          & Transform Your Skills
        </motion.h1>

        <motion.p className="max-w-2xl text-xl md:text-2xl text-muted-foreground mb-12" variants={itemVariants}>
          The comprehensive program that takes you from beginner to expert with proven methods and practical
          applications.
        </motion.p>

        {/* Hero Actions */}
        <motion.div className="flex flex-col sm:flex-row gap-5 mb-16" variants={itemVariants}>
          <Button size="lg" asChild className="px-8 py-6 text-base font-medium relative overflow-hidden group">
            <Link href="#enroll">
              <span className="relative z-10 flex items-center">
                Enroll Now <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
              <span className="absolute inset-0 bg-primary/10 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
            </Link>
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="lg"
                variant="outline"
                className="px-8 py-6 text-base font-medium relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  <PlayCircle className="mr-2 h-5 w-5" /> Watch Preview
                </span>
                <span className="absolute inset-0 bg-primary/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[800px] p-0">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center p-8">
                  <h3 className="text-xl font-semibold mb-2">Course Preview</h3>
                  <p className="text-muted-foreground">
                    An engaging video player would be implemented here showing your course highlights
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Hero Stats */}
        <motion.div className="flex flex-col items-center gap-6" variants={itemVariants}>
          <div className="flex items-center justify-center gap-4 text-muted-foreground text-sm bg-background/50 backdrop-blur-sm py-3 px-6 rounded-full border border-border/50">
            <StudentAvatars />
            <span>
              Join <strong>2,531</strong> students already enrolled
            </span>
          </div>

          <div className="flex items-center gap-2 text-amber-500">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500" />
              ))}
            <span className="text-sm font-medium">4.9/5 from 328 reviews</span>
          </div>
        </motion.div>

        {/* Quick testimonial */}
        <motion.div
          className="mt-8 max-w-md mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-gray-100 shadow-sm"
          variants={itemVariants}
        >
          <div className="flex items-start gap-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              <AvatarImage src={studentImages.taylor} alt="Student testimonial" />
              <AvatarFallback>T</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm italic text-gray-600 mb-1">
                "This course transformed my career. The practical approach and supportive community made all the
                difference."
              </p>
              <p className="text-xs text-gray-500">Taylor R. — Senior Developer</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center z-10">
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full h-12 w-12 p-0 opacity-70 hover:opacity-100 transition-opacity"
        >
          <ChevronDown className="h-5 w-5" />
          <span className="sr-only">Scroll down</span>
        </Button>
      </div>
    </section>
  )
}

