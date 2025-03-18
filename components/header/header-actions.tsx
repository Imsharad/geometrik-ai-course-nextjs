"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <Button asChild variant="outline" className="hidden md:inline-flex">
        <Link href="/login">
          Log In
        </Link>
      </Button>
      <Button asChild className="hidden md:inline-flex">
        <Link href="/pricing">
          Enroll Now
        </Link>
      </Button>
    </div>
  )
}

