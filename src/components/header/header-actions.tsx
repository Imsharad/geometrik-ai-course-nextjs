"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import UserMenu from "@/components/auth/user-menu"

export function HeaderActions() {
  return (
    <div className="flex items-center gap-4">
      <UserMenu />
    </div>
  )
}

