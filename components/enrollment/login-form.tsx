"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

interface LoginFormProps {
  onSubmit: (e: React.FormEvent) => void
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  return (
    <form onSubmit={onSubmit} className="space-y-6 mt-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" required />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="login-password">Password</Label>
            <Link href="#reset" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input id="login-password" type="password" required />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Log In & Continue <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}

