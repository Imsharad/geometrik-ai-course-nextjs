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
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
        { label: "Partners", href: "/partners" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Accessibility", href: "/accessibility" },
      ],
    },
  ]

  const socialLinks = [
    { icon: <Twitter className="h-5 w-5" />, href: "https://twitter.com/geometrikai", label: "Twitter" },
    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/company/geometrikai", label: "LinkedIn" },
    { icon: <Github className="h-5 w-5" />, href: "https://github.com/geometrikai", label: "GitHub" },
    { icon: <Youtube className="h-5 w-5" />, href: "https://youtube.com/geometrikai", label: "YouTube" },
    { icon: <Instagram className="h-5 w-5" />, href: "https://instagram.com/geometrikai", label: "Instagram" },
  ]

  return (
    <footer className="bg-slate-50 pt-16 pb-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Company info and newsletter */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <CourseLogo />
              <p className="mt-4 text-slate-600">
                Cutting-edge AI education to help you master the skills needed for tomorrow's challenges.
              </p>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-base font-medium mb-3">Stay ahead of the curve</h3>
              {isSubscribed ? (
                <div className="flex items-center gap-2 text-green-600">
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
                    className="bg-white"
                  />
                  <Button type="submit" className="shrink-0">
                    Subscribe
                  </Button>
                </form>
              )}
            </div>
            
            {/* Social links */}
            <div className="flex gap-3">
              {socialLinks.map((social, idx) => (
                <Link
                  key={idx}
                  href={social.href}
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-slate-600 hover:text-primary hover:bg-white/80 transition-colors"
                  aria-label={social.label}
                >
                  {social.icon}
                </Link>
              ))}
            </div>
          </div>
          
          {/* Links */}
          <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            {footerLinks.map((column, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-slate-900 mb-4">{column.title}</h3>
                <ul className="space-y-2">
                  {column.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      <Link
                        href={link.href}
                        className="text-slate-600 hover:text-primary transition-colors text-sm"
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
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        {/* Contact information */}
        <div className="mt-12 flex flex-wrap justify-center gap-12 text-sm text-slate-600">
          <a href="mailto:hello@geometrik.ai" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Mail className="h-4 w-4" />
            hello@geometrik.ai
          </a>
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            123 AI Avenue, San Francisco, CA 94107
          </div>
          <a href="tel:+15551234567" className="flex items-center gap-2 hover:text-primary transition-colors">
            <Phone className="h-4 w-4" />
            +1 (555) 123-4567
          </a>
        </div>
        
        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-slate-500">
            © {new Date().getFullYear()} Geometrik.ai. All rights reserved.
          </div>
          
          {/* Language selector */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Globe className="h-4 w-4" />
            <select className="bg-transparent border-none text-slate-600 text-sm focus:ring-0 pr-6 appearance-none">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 rounded-full shadow-md h-10 w-10 z-50"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowRight className="h-4 w-4 rotate-[-90deg]" />
        <span className="sr-only">Back to top</span>
      </Button>
    </footer>
  )
}
