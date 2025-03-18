"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CourseLogo } from "@/components/course-logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { studentImages } from "@/components/student-images"
import {
  ArrowRight,
  Twitter,
  Linkedin,
  Github,
  Youtube,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Heart,
  CheckCircle,
  Globe,
  Award,
  BookOpen,
  Users,
} from "lucide-react"

export function SiteFooter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      // In a real implementation, you would send this to your API
      console.log("Subscribed with email:", email)
    }
  }

  const footerLinks = [
    {
      title: "Course",
      links: [
        { label: "Curriculum", href: "#curriculum" },
        { label: "Instructor", href: "#instructor" },
        { label: "Community", href: "#community" },
        { label: "Success Stories", href: "#success-stories" },
        { label: "Pricing", href: "#pricing" },
        { label: "FAQ", href: "#faq" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Documentation", href: "/docs" },
        { label: "Tutorials", href: "/tutorials" },
        { label: "Webinars", href: "/webinars" },
        { label: "Free Resources", href: "/resources" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Partners", href: "/partners" },
        { label: "Press Kit", href: "/press" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "GDPR", href: "/gdpr" },
        { label: "Accessibility", href: "/accessibility" },
      ],
    },
  ]

  const stats = [
    { icon: <Users className="h-5 w-5" />, value: "15,000+", label: "Students" },
    { icon: <Globe className="h-5 w-5" />, value: "65+", label: "Countries" },
    { icon: <Award className="h-5 w-5" />, value: "12", label: "Awards" },
    { icon: <BookOpen className="h-5 w-5" />, value: "24/7", label: "Support" },
  ]

  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-[0.03]">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-primary/30 blur-3xl"></div>
        <div className="absolute top-1/2 right-0 w-80 h-80 rounded-full bg-blue-400/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-purple-400/20 blur-3xl"></div>
      </div>

      {/* Main footer content */}
      <div className="container relative z-10 pt-20 pb-12">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Company info column */}
          <div className="lg:w-1/3 space-y-8">
            <div className="space-y-5">
              <div>
                <CourseLogo />
              </div>
              <p className="text-slate-600 text-lg leading-relaxed">
                Geometrik.ai provides cutting-edge AI education to help you master the skills needed for tomorrow's
                challenges. Join our community of learners and transform your career.
              </p>
            </div>

            {/* Newsletter subscription */}
            <div className="mt-8 p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-medium mb-3">Stay ahead of the curve</h3>
              {isSubscribed ? (
                <div className="flex items-center gap-3 text-green-600 bg-green-50 p-4 rounded-xl">
                  <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  <p>Thanks for subscribing! We'll be in touch soon.</p>
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-slate-50 border-slate-200 rounded-xl focus:ring-primary focus:border-primary"
                    />
                    <Button 
                      type="submit" 
                      className="shrink-0 rounded-xl bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
                    >
                      Subscribe
                    </Button>
                  </form>
                  <p className="text-sm text-slate-500 mt-3">
                    Get weekly insights on AI trends, exclusive tutorials, and early access to new courses.
                  </p>
                </>
              )}
            </div>

            {/* Social links */}
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-4 text-slate-700">Connect with us</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/geometrikai", label: "Twitter" },
                  { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/company/geometrikai", label: "LinkedIn" },
                  { icon: <Github className="h-5 w-5" />, href: "https://github.com/geometrikai", label: "GitHub" },
                  { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com/geometrikai", label: "YouTube" },
                  { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/geometrikai", label: "Instagram" },
                ].map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-primary hover:border-primary hover:shadow-sm transition-all duration-200"
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Links and contact section */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Links columns */}
              {footerLinks.map((column, idx) => (
                <div key={idx} className="space-y-5">
                  <h3 className="font-medium text-slate-900">{column.title}</h3>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link
                          href={link.href}
                          className="text-slate-600 hover:text-primary transition-colors text-sm inline-flex items-center gap-1 group"
                          onClick={(e) => {
                            if (link.href.startsWith("#")) {
                              e.preventDefault()
                              const targetId = link.href.replace("#", "")
                              const targetElement = document.getElementById(targetId)
                              if (targetElement) {
                                targetElement.scrollIntoView({ behavior: "smooth" })
                              }
                            }
                          }}
                        >
                          {link.label}
                          <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact information */}
            <div className="mt-12 p-6 bg-white rounded-2xl shadow-sm border border-slate-100 space-y-5">
              <h3 className="font-medium text-slate-900">Contact Us</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Email</p>
                    <a href="mailto:hello@geometrik.ai" className="text-slate-600 hover:text-primary transition-colors">
                      hello@geometrik.ai
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Location</p>
                    <p className="text-slate-600">123 AI Avenue, San Francisco, CA 94107</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-700">Phone</p>
                    <a href="tel:+15551234567" className="text-slate-600 hover:text-primary transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center text-center"
            >
              <div className="p-3 bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl text-primary mb-3">
                {stat.icon}
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
              <div className="text-slate-600">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 bg-gradient-to-r from-slate-50 to-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="absolute -top-2 -left-2 w-full h-full bg-primary/10 rounded-full"></div>
              <Avatar className="h-20 w-20 border-4 border-white shadow-sm relative">
                <AvatarImage src={studentImages.alex} alt="Alex K." />
                <AvatarFallback>AK</AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-3 flex-1">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className="h-5 w-5 fill-amber-400 text-amber-400"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-slate-700 italic text-lg leading-relaxed">
                "The Geometrik.ai course completely transformed my understanding of AI systems. The practical approach
                and supportive community made all the difference in my learning journey."
              </p>
              <div className="flex items-center gap-2">
                <p className="font-medium text-slate-900">Alex K.</p>
                <span className="text-slate-400">•</span>
                <p className="text-slate-600">Full-Stack Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 text-sm text-slate-500">
              <span>© {new Date().getFullYear()} Geometrik.ai. All rights reserved.</span>
              <div className="hidden md:flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-slate-300"></span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3 text-red-500" /> Made in San Francisco
                </span>
              </div>
            </div>

            {/* Language selector */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <Globe className="h-4 w-4 text-slate-500" />
                <select className="bg-transparent border-none text-slate-700 text-sm focus:ring-0 pr-6 appearance-none">
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top button */}
      <div className="fixed bottom-6 right-6 z-50">
        <div>
          <Button
            size="icon"
            className="rounded-full shadow-lg bg-primary hover:bg-primary/90 h-12 w-12"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <ArrowRight className="h-5 w-5 rotate-[-90deg]" />
            <span className="sr-only">Back to top</span>
          </Button>
        </div>
      </div>
    </footer>
  )
}
