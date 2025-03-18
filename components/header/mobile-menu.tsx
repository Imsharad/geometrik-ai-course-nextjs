"use client"

import { useState } from "react"
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
                  item.isActive ? "text-primary" : ""
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.title}
              </Link>
            ))}
          </nav>
          <div className="grid gap-4">
            <Button asChild variant="outline" onClick={() => setIsOpen(false)}>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild onClick={() => setIsOpen(false)}>
              <Link href="/pricing">Enroll Now</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

