"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { CourseLogo } from "@/components/course-logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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
  CheckCircle,
  Globe,
  ChevronRight,
  Sparkles,
  Zap,
  BookOpen,
  UserPlus,
  Star,
  HeartHandshake,
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
      icon: <BookOpen className="h-4 w-4" />,
      links: [
        { label: "Curriculum", href: "/curriculum" },
        { label: "Instructor", href: "/instructor" },
        { label: "Community", href: "/community" },
        { label: "Case Studies", href: "/case-studies" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" },
      ],
    },
    {
      title: "Resources",
      icon: <Sparkles className="h-4 w-4" />,
      links: [
        { label: "Blog", href: "/" },
        { label: "Documentation", href: "/" },
        { label: "Tutorials", href: "/" },
        { label: "Webinars", href: "/" },
      ],
    },
    {
      title: "Company",
      icon: <UserPlus className="h-4 w-4" />,
      links: [
        { label: "About Us", href: "/" },
        { label: "Careers", href: "/" },
        { label: "Contact", href: "/" },
        { label: "Partners", href: "/" },
      ],
    },
    {
      title: "Legal",
      icon: <HeartHandshake className="h-4 w-4" />,
      links: [
        { label: "Terms of Service", href: "/" },
        { label: "Privacy Policy", href: "/" },
        { label: "Cookie Policy", href: "/" },
        { label: "Accessibility", href: "/" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "/", label: "Twitter", color: "hover:text-blue-400" },
    { icon: <Linkedin className="h-5 w-5" />, href: "/", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: <Github className="h-5 w-5" />, href: "/", label: "GitHub", color: "hover:text-gray-800" },
    { icon: <Youtube className="h-5 w-5" />, href: "/", label: "YouTube", color: "hover:text-red-600" },
    { icon: <Instagram className="h-5 w-5" />, href: "/", label: "Instagram", color: "hover:text-pink-600" },
  ]

  return (
    <footer className="relative pt-16 pb-8 border-t border-slate-200 overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-gray-900 -z-10"></div>
      <div className="absolute inset-0 bg-[url('/subtle-pattern.png')] opacity-[0.03] mix-blend-soft-light -z-10"></div>
      
      {/* Accent elements */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600"></div>
      <div className="absolute top-0 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl -z-10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Company info and newsletter */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center">
                <CourseLogo />
                <div className="ml-2 flex items-center">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="text-xs text-amber-600 font-medium ml-1">PREMIUM AI EDUCATION</span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
                Cutting-edge AI education to help you master the skills needed for tomorrow's challenges. Our curriculum combines theoretical knowledge with practical applications to prepare you for a successful career in artificial intelligence.
              </p>
            </div>
            
            {/* Newsletter */}
            <div className="p-5 rounded-xl border border-slate-200 bg-white dark:bg-gray-800/50 dark:border-gray-700 shadow-sm relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-50 to-white dark:from-gray-800/30 dark:to-gray-800/10 opacity-50 group-hover:opacity-80 transition-opacity duration-500 -z-10"></div>
              <h3 className="text-base font-medium mb-3 flex items-center">
                <Star className="mr-2 h-4 w-4 text-amber-500" />
                <span>Stay ahead of the curve</span>
              </h3>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                  <p className="text-sm">Thanks for subscribing!</p>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white dark:bg-gray-900 border-slate-200 dark:border-gray-700"
                  />
                  <Button type="submit" className="shrink-0 bg-blue-600 hover:bg-blue-700">
                    Subscribe
                  </Button>
                </form>
              )}
              <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
                Get weekly insights on AI advancements and exclusive course offers.
              </p>
            </div>
            
            {/* Social links */}
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-slate-900 dark:text-white">Follow us</h3>
              <div className="flex gap-3">
                {socialLinks.map((social, idx) => (
                  <Link
                    key={idx}
                    href={social.href}
                    className={`flex items-center justify-center w-9 h-9 rounded-full bg-white dark:bg-gray-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-gray-700 hover:border-slate-300 dark:hover:border-gray-600 transition-colors ${social.color}`}
                    aria-label={social.label}
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-slate-900 dark:text-white mb-4 flex items-center">
                  <span className="bg-slate-100 dark:bg-gray-800 p-1.5 rounded-md mr-2">
                    {column.icon}
                  </span>
                  {column.title}
                </h3>
                <ul className="space-y-2.5">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm flex items-center group"
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
                        <ChevronRight className="mr-1 h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact information */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-600 dark:text-slate-400">
          <a href="mailto:hello@geometrik.ai" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800">
            <Mail className="h-4 w-4" />
            hello@geometrik.ai
          </a>
          <div className="flex items-center gap-2 p-2">
            <MapPin className="h-4 w-4" />
            609, Cambridge Street, San Francisco
          </div>
          <a href="tel:+917999024306" className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-gray-800">
            <Phone className="h-4 w-4" />
            +91 7999 024306
          </a>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} Geometrik.ai. All rights reserved.
          </div>
          
          {/* Language selector */}
          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 p-1.5 bg-slate-100 dark:bg-gray-800 rounded-lg">
            <Globe className="h-4 w-4" />
            <select className="bg-transparent border-none text-slate-600 dark:text-slate-300 text-sm focus:ring-0 pr-6 appearance-none">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
