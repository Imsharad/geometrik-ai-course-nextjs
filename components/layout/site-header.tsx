"use client"

import { useState, useEffect } from "react"
import { CourseLogo } from "@/components/course-logo"
import { NavigationMenu } from "@/components/header/navigation-menu"
import { MobileMenu } from "@/components/header/mobile-menu"
import { HeaderActions } from "@/components/header/header-actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { studentImages } from "@/components/student-images"

// Update the navItems array to match the actual sections in the page
const navItems = [
  { title: "Curriculum", href: "#curriculum" },
  { title: "Instructor", href: "#instructor" },
  { title: "Community", href: "#community" },
  { title: "Success Stories", href: "#success-stories" },
  { title: "Pricing", href: "#pricing" },
  { title: "FAQ", href: "#faq" },
]

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)

      // Determine active section
      const sections = document.querySelectorAll("section[id]")
      const scrollPosition = window.scrollY + 100 // Add offset for better UX

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId || "")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update navItems with active state
  const navItemsWithActive = navItems.map((item) => ({
    ...item,
    isActive: activeSection === item.href.replace("#", ""),
  }))

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"}`}
    >
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <CourseLogo />
          <NavigationMenu items={navItemsWithActive} />
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={studentImages.sophia} alt="Student" />
              <AvatarFallback>S</AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-500">
              <span className="font-medium text-black">12,000+</span> students
            </span>
          </div>

          <HeaderActions />
          <MobileMenu items={navItemsWithActive} />
        </div>
      </div>
    </header>
  )
}

