"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { CourseLogo } from "@/components/course-logo"

interface NavItem {
  title: string
  href: string
  isActive?: boolean
}

interface MobileMenuProps {
  items: NavItem[]
}

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("")

  // Update active section on scroll
  useEffect(() => {
    if (!isOpen) return

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100
      const sections = document.querySelectorAll("section[id]")

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
  }, [isOpen])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <div className="grid gap-6 py-6">
          <div className="flex items-center justify-between">
            <CourseLogo />
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                <X className="h-5 w-5" />
                <span className="sr-only">Close menu</span>
              </Button>
            </SheetTrigger>
          </div>
          <nav className="grid gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-lg font-medium transition-colors hover:text-primary ${
                  activeSection === item.href.replace("#", "") ? "text-primary" : ""
                }`}
                onClick={(e) => {
                  const targetId = item.href.replace("#", "")
                  const targetElement = document.getElementById(targetId)
                  if (targetElement) {
                    e.preventDefault()
                    targetElement.scrollIntoView({ behavior: "smooth" })
                    setIsOpen(false)
                  }
                }}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="grid gap-4">
            <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
              <Link href="#enroll">Log In</Link>
            </Button>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="#enroll">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

