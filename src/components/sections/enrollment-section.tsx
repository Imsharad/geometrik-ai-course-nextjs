"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import {
  ArrowRight,
  Lock,
  Shield,
  CreditCard,
  Clock,
  Gift,
  CheckCircle,
  Sparkles,
  Info,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"
import { studentImages } from "@/components/student-images"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function EnrollmentSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })
  const [selectedPlan, setSelectedPlan] = useState("professional")
  const [enrollmentComplete, setEnrollmentComplete] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setEnrollmentComplete(true)
  }

  // Animation variants
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 15 },
    },
  }

  return (
    <section ref={ref} className="py-24 relative overflow-hidden isolate" id="enroll">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-400/5 blur-[120px] opacity-60"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-400/5 blur-[100px] opacity-50"></div>
      </div>

      <motion.div
        className="container max-w-6xl mx-auto px-6 relative"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="max-w-3xl mx-auto text-center mb-16" variants={itemVariants}>
          <Badge className="mb-4 px-3 py-1.5 bg-black text-white border-none">
            <Gift className="mr-2 h-3.5 w-3.5" /> Limited Time Offer
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">Begin Your Learning Journey</h2>
          <p className="text-gray-600 text-lg">
            Take the first step toward mastery and transform your skills with our comprehensive course
          </p>
        </motion.div>

        <motion.div className="grid lg:grid-cols-5 gap-8 items-start" variants={itemVariants}>
          {/* Left column - Form (3/5 width) */}
          <div className="lg:col-span-3 space-y-8">
            <Card className="border-0 shadow-xl bg-white/90 backdrop-blur-sm">
              <CardHeader className="pb-4 border-b">
                <CardTitle className="text-xl">Enrollment Options</CardTitle>
                <CardDescription>Create your account or sign in to continue</CardDescription>
              </CardHeader>

              <CardContent className="pt-6">
                <Tabs defaultValue="signup" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-8 p-1 bg-gray-100 rounded-lg">
                    <TabsTrigger
                      value="signup"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                    >
                      New Student
                    </TabsTrigger>
                    <TabsTrigger
                      value="login"
                      className="rounded-md data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:shadow-sm"
                    >
                      Returning Student
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="signup">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="first-name" className="text-sm font-medium">
                            First Name
                          </Label>
                          <Input
                            id="first-name"
                            placeholder="John"
                            required
                            className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last-name" className="text-sm font-medium">
                            Last Name
                          </Label>
                          <Input
                            id="last-name"
                            placeholder="Doe"
                            required
                            className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="john.doe@example.com"
                          required
                          className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium">
                          Password
                        </Label>
                        <div className="relative">
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="space-y-4 pt-4">
                        <Label className="text-sm font-medium">Select Your Plan</Label>
                        <RadioGroup defaultValue={selectedPlan} onValueChange={setSelectedPlan} className="space-y-4">
                          <div
                            className={`flex items-center space-x-2 rounded-xl border p-4 cursor-pointer transition-all ${
                              selectedPlan === "essentials"
                                ? "border-gray-400 bg-gray-50 ring-1 ring-gray-200"
                                : "hover:bg-gray-50 hover:border-gray-300"
                            }`}
                          >
                            <RadioGroupItem value="essentials" id="essentials" className="text-black" />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <Label htmlFor="essentials" className="font-medium cursor-pointer">
                                  Essentials
                                </Label>
                                <span className="font-bold">$499</span>
                              </div>
                              <p className="text-sm text-gray-500">Individual learning experience</p>
                            </div>
                          </div>

                          <div
                            className={`flex items-center space-x-2 rounded-xl border p-4 cursor-pointer transition-all ${
                              selectedPlan === "professional"
                                ? "border-black bg-black/5 ring-1 ring-black"
                                : "hover:bg-gray-50 hover:border-gray-300"
                            }`}
                          >
                            <RadioGroupItem value="professional" id="professional" className="text-black" />
                            <div className="flex-1">
                              <div className="flex justify-between items-center">
                                <div>
                                  <Label htmlFor="professional" className="font-medium cursor-pointer">
                                    Professional
                                  </Label>
                                  <Badge className="ml-2 bg-black text-white border-none text-[10px] py-0">
                                    <Sparkles className="mr-1 h-2 w-2" /> Recommended
                                  </Badge>
                                </div>
                                <span className="font-bold">$899</span>
                              </div>
                              <p className="text-sm text-gray-500">Enhanced learning with mentorship</p>
                            </div>
                          </div>

                          <div
                            className={`flex items-center space-x-2 rounded-xl border p-4 cursor-pointer transition-all ${
                              selectedPlan === "enterprise"
                                ? "border-gray-400 bg-gray-50 ring-1 ring-gray-200"
                                : "hover:bg-gray-50 hover:border-gray-300"
                            }`}
                          >
                            <RadioGroupItem value="enterprise" id="enterprise" className="text-black" />
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <Label htmlFor="enterprise" className="font-medium cursor-pointer">
                                  Enterprise
                                </Label>
                                <span className="font-bold">$1,499</span>
                              </div>
                              <p className="text-sm text-gray-500">Team and organization solution</p>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>

                      <div className="flex items-start space-x-2 pt-2">
                        <Checkbox
                          id="terms"
                          required
                          className="mt-1 data-[state=checked]:bg-black data-[state=checked]:border-black"
                        />
                        <div className="grid gap-1.5 leading-none">
                          <Label
                            htmlFor="terms"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            I agree to the{" "}
                            <Link href="#terms" className="text-black underline hover:text-gray-700">
                              terms and conditions
                            </Link>
                          </Label>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full py-6 bg-black hover:bg-gray-800 text-white group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          Complete Enrollment
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="login">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="login-email" className="text-sm font-medium">
                          Email
                        </Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="john.doe@example.com"
                          required
                          className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password" className="text-sm font-medium">
                            Password
                          </Label>
                          <Link href="#reset" className="text-sm text-black hover:text-gray-700 hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <div className="relative">
                          <Input
                            id="login-password"
                            type={showPassword ? "text" : "password"}
                            required
                            className="h-11 bg-gray-50 border-gray-200 focus:bg-white transition-colors pr-10"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </button>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        className="w-full py-6 bg-black hover:bg-gray-800 text-white group relative overflow-hidden"
                      >
                        <span className="relative z-10 flex items-center">
                          Log In & Continue
                          <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-gray-800 to-black transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right column - Course Summary (2/5 width) */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-xl sticky top-24 bg-white/90 backdrop-blur-sm">
              <CardHeader className="border-b bg-black text-white rounded-t-xl">
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5" />
                  Course Summary
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Comprehensive curriculum with lifetime access
                </CardDescription>
              </CardHeader>

              <CardContent className="pt-6 space-y-6">
                <div className="space-y-4">
                  {[
                    { title: "Complete Course Access", desc: "All modules, resources, and future updates" },
                    { title: "Community Membership", desc: "Connect with peers and instructors" },
                    { title: "Practical Projects", desc: "Build your portfolio with hands-on work" },
                    { title: "Completion Certificate", desc: "Demonstrate your expertise" },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className="mt-0.5 text-black bg-gray-100 p-1 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Professional Plan</span>
                    <span className="font-bold">$899</span>
                  </div>
                  <div className="flex justify-between mb-2 text-xs text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <span>Lifetime access</span>
                  </div>
                </div>

                {/* Add a subtle student testimonial */}
                <div className="pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6 border border-white">
                      <AvatarImage src={studentImages.jennifer} alt="Student" />
                      <AvatarFallback>J</AvatarFallback>
                    </Avatar>
                    <p className="text-xs text-gray-600 italic">"Enrolling was the best career decision I've made!"</p>
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex items-center justify-between bg-gray-50 p-4 rounded-b-xl border-t">
                <div className="flex items-center text-xs text-gray-500">
                  <Shield className="h-3.5 w-3.5 mr-1" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center text-xs">
                  <CreditCard className="h-3.5 w-3.5 mr-1 text-gray-500" />
                  <span>Payment plans available</span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div className="mt-12 flex flex-wrap justify-center gap-8 text-center" variants={itemVariants}>
          <div className="grid grid-cols-4 gap-6 max-w-3xl mx-auto">
            {[
              { icon: <Shield className="h-5 w-5 mx-auto mb-2" />, text: "Secure Checkout" },
              { icon: <Clock className="h-5 w-5 mx-auto mb-2" />, text: "30-Day Guarantee" },
              { icon: <Lock className="h-5 w-5 mx-auto mb-2" />, text: "Privacy Protected" },
              { icon: <Info className="h-5 w-5 mx-auto mb-2" />, text: "24/7 Support" },
            ].map((item, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-white/80 backdrop-blur-sm border shadow-sm hover:shadow-md transition-all"
              >
                <div className="text-black">{item.icon}</div>
                <p className="text-sm font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

