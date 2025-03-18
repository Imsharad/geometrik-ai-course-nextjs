"use client"
import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "@/app/fix-framer-motion"
import { ChevronDown, Sparkles, ArrowRight, PlayCircle, Star, TrendingUp, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { HeroParticlesAnimation } from "@/components/hero/hero-particles-animation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { studentImages } from "@/components/student-images"
import Link from "next/link"
import { RetargetingScript } from "@/components/marketing/retargeting-script"

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

export function HeroBackground({ backgroundY = 0 }: { backgroundY?: number }) {
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
          transform: `translateY(${backgroundY}px)`,
        }}
      />

      {/* Accent lines */}
      <div className="absolute left-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/0 via-primary/10 to-primary/0" style={{ transform: `translateY(${backgroundY * 0.5}px)` }}></div>
      <div className="absolute right-1/4 top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/0 via-primary/10 to-primary/0" style={{ transform: `translateY(${backgroundY * 0.7}px)` }}></div>
      <div className="absolute top-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0" style={{ transform: `translateY(${backgroundY * 0.6}px)` }}></div>

      {/* Colorful diffused glows - increased opacity and size */}
      <div className="absolute top-1/4 left-1/4 w-[700px] h-[700px] rounded-full bg-blue-400/20 blur-[120px] opacity-80 hero-glow" style={{ transform: `translateY(${backgroundY * 0.3}px)` }}></div>
      <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] rounded-full bg-purple-400/20 blur-[100px] opacity-70 hero-glow" style={{ transform: `translateY(${backgroundY * 0.4}px)` }}></div>
      <div className="absolute top-2/3 left-1/3 w-[500px] h-[500px] rounded-full bg-amber-400/20 blur-[80px] opacity-60 hero-glow" style={{ transform: `translateY(${backgroundY * 0.5}px)` }}></div>
      <div className="absolute bottom-1/4 right-1/3 w-[550px] h-[550px] rounded-full bg-emerald-400/20 blur-[90px] opacity-50 hero-glow" style={{ transform: `translateY(${backgroundY * 0.2}px)` }}></div>
      <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] rounded-full bg-rose-400/15 blur-[70px] opacity-60 hero-glow transform -translate-x-1/2 -translate-y-1/2" style={{ transform: `translate(-50%, -50%) translateY(${backgroundY * 0.1}px)` }}></div>

      {/* Additional color accents */}
      <div className="absolute top-[15%] right-[20%] w-[200px] h-[200px] rounded-full bg-cyan-400/20 blur-[60px] opacity-60 hero-glow" style={{ transform: `translateY(${backgroundY * 0.4}px)` }}></div>
      <div className="absolute bottom-[20%] left-[15%] w-[250px] h-[250px] rounded-full bg-indigo-400/20 blur-[70px] opacity-50 hero-glow" style={{ transform: `translateY(${backgroundY * 0.3}px)` }}></div>

      {/* Dot pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
          transform: `translateY(${backgroundY * 0.2}px)`,
        }}
      />

      {/* Vignette effect */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent to-white/80 opacity-80"></div>

      {/* Particle network effect */}
      <div style={{ transform: `translateY(${backgroundY * 0.1}px)` }}>
        <HeroParticlesAnimation />
      </div>
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

// Add forced visible variants
const forcedVisibleVariants = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
}

export function HeroSection() {
  const [username, setUsername] = useState("")
  const [isFirstLoad, setIsFirstLoad] = useState(true)
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  // Create even smoother animation curves with extended ranges
  const opacity = useTransform(
    scrollYProgress, 
    [0, 0.4, 0.75, 1], 
    [1, 1, 0.6, 0]
  )
  const scale = useTransform(
    scrollYProgress,
    [0, 0.7, 1], 
    [1, 1, 0.99]
  )
  const y = useTransform(
    scrollYProgress, 
    [0, 0.7, 1], 
    [0, 0, 20]
  )
  
  // Parallax effect for background elements
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 40])

  // Handle initial page load and navigation back to home
  useEffect(() => {
    // Reset scroll to top of page and mark as first load
    window.scrollTo(0, 0);
    setIsFirstLoad(true);
    
    // After a short delay, reset the first load flag to allow scroll animations
    const timer = setTimeout(() => {
      setIsFirstLoad(false);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
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
    <section ref={heroRef} className="relative min-h-screen pt-24 pb-12 overflow-hidden" id="hero">
      {/* Retargeting scripts for ad campaign tracking */}
      <RetargetingScript 
        pixelID="123456789012345" 
        conversionID="AW-123456789/AbC-D_efG-h1i2J3k4L5"
        pageType="landing"
      />
      
      {/* Background */}
      <HeroBackground backgroundY={isFirstLoad ? 0 : backgroundY.get()} />

      <motion.div
        className="container relative z-10 flex flex-col items-center justify-center min-h-[90vh] text-center px-6 py-16 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="visible"
        animate="visible"
        style={{
          opacity: isFirstLoad ? 1 : opacity,
          scale: isFirstLoad ? 1 : scale,
          y: isFirstLoad ? 0 : y
        }}
      >
        {/* Featured Badge */}
        <motion.div variants={forcedVisibleVariants} className="mb-8">
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
          <motion.div className="mb-8 text-lg sm:text-xl" variants={forcedVisibleVariants}>
            <span className="text-muted-foreground">Welcome,</span> <span className="font-medium">{username}</span>
          </motion.div>
        )}

        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-foreground via-foreground to-foreground/80"
          variants={forcedVisibleVariants}
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
          & Transform Your Career
        </motion.h1>

        {/* Trust Signals */}
        <motion.div variants={forcedVisibleVariants} className="flex flex-wrap justify-center gap-4 mb-8">
          <Badge variant="outline" className="py-1.5 px-3 bg-background/80 backdrop-blur-sm">
            <TrendingUp className="mr-2 h-4 w-4" />
            #1 AI Career Program
          </Badge>
          <Badge variant="outline" className="py-1.5 px-3 bg-background/80 backdrop-blur-sm">
            <Zap className="mr-2 h-4 w-4" />
            87% Job Placement Rate
          </Badge>
          <Badge variant="outline" className="py-1.5 px-3 bg-background/80 backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            $126K Avg. Starting Salary
          </Badge>
        </motion.div>

        <motion.p className="max-w-2xl text-xl md:text-2xl text-muted-foreground mb-12" variants={forcedVisibleVariants}>
          The comprehensive program that takes you from beginner to AI expert with guaranteed job placement in top companies.
        </motion.p>

        {/* Hero Actions */}
        <motion.div className="flex flex-col sm:flex-row gap-5 mb-16" variants={forcedVisibleVariants}>
          <Button size="lg" asChild className="px-8 py-6 text-base font-medium relative overflow-hidden group bg-gradient-to-r from-primary to-purple-600 hover:from-primary/90 hover:to-purple-600/90 border-none shadow-lg shadow-primary/20">
            <Link href="#enroll">
              <span className="relative z-10 flex items-center">
                Apply Now - 15 Spots Left <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
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
        <motion.div className="flex flex-col items-center gap-6" variants={forcedVisibleVariants}>
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
          variants={forcedVisibleVariants}
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
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 2.5, 
              ease: "easeInOut"
            }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="rounded-full h-12 w-12 p-0 opacity-70 hover:opacity-100 transition-opacity bg-background/30 backdrop-blur-sm hover:bg-background/50"
            >
              <ChevronDown className="h-5 w-5" />
              <span className="sr-only">Scroll down</span>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

