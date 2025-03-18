"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"

interface NavItem {
  title: string
  href: string
  isActive?: boolean
}

interface NavigationMenuProps {
  items: NavItem[]
}

export function NavigationMenu({ items }: NavigationMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [hoverStyle, setHoverStyle] = useState({ opacity: 0, left: 0, top: 0, width: 0, height: 0 })
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([])

  useEffect(() => {
    if (hoveredIndex !== null) {
      const hoveredElement = itemsRef.current[hoveredIndex]
      if (hoveredElement) {
        const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = hoveredElement
        setHoverStyle({
          opacity: 1,
          left: offsetLeft,
          top: offsetTop,
          width: offsetWidth,
          height: offsetHeight,
        })
      }
    } else {
      setHoverStyle((prev) => ({ ...prev, opacity: 0 }))
    }
  }, [hoveredIndex])

  // Add scroll event listener to update active state based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY

      // Get all section elements
      const sections = document.querySelectorAll("section[id]")

      // Determine which section is currently in view
      sections.forEach((section) => {
        const sectionTop = section.offsetTop - 100 // Offset for better UX
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Find the corresponding nav item and highlight it
          const index = items.findIndex((item) => item.href === `#${sectionId}`)
          if (index !== -1) {
            setHoveredIndex(index)
          }
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  return (
    <nav className="hidden md:flex items-center gap-6 relative">
      {/* Hover background effect */}
      <div
        className="absolute bg-primary/10 rounded-md transition-all duration-300 ease-out pointer-events-none"
        style={{
          opacity: hoverStyle.opacity,
          left: hoverStyle.left,
          top: hoverStyle.top,
          width: hoverStyle.width,
          height: hoverStyle.height,
        }}
      />

      {items.map((item, index) => (
        <Link
          key={item.href}
          href={item.href}
          ref={(el) => (itemsRef.current[index] = el)}
          className={`text-sm font-medium transition-colors hover:text-primary px-3 py-2 rounded-md relative z-10 ${
            item.isActive ? "text-primary" : ""
          }`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={(e) => {
            // Smooth scroll to the section
            const targetId = item.href.replace("#", "")
            const targetElement = document.getElementById(targetId)
            if (targetElement) {
              e.preventDefault()
              targetElement.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

