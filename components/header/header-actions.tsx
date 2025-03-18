"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="outline" className="hidden md:inline-flex">
        <Link
          href="#enroll"
          onClick={(e) => {
            e.preventDefault()
            const enrollSection = document.getElementById("enroll")
            if (enrollSection) {
              enrollSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          Log In
        </Link>
      </Button>
      <Button asChild className="hidden md:inline-flex">
        <Link
          href="#enroll"
          onClick={(e) => {
            e.preventDefault()
            const enrollSection = document.getElementById("enroll")
            if (enrollSection) {
              enrollSection.scrollIntoView({ behavior: "smooth" })
            }
          }}
        >
          Enroll Now
        </Link>
      </Button>
    </div>
  )
}

