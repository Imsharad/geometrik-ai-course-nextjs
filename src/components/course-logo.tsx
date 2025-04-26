import Link from "next/link"
import { cn } from "@/lib/utils"

interface CourseLogoProps {
  className?: string
  variant?: "default" | "inverse"
}

export function CourseLogo({ className, variant = "default" }: CourseLogoProps) {
  const textColor = variant === "inverse" ? "text-white" : "text-black"

  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <div className="relative flex items-center">
        <div className="absolute w-6 h-6 bg-blue-500 rounded-md -rotate-12"></div>
        <div className="absolute w-6 h-6 bg-amber-500 rounded-md rotate-12 opacity-70"></div>
        <div className="relative w-6 h-6 bg-black rounded-md flex items-center justify-center">
          <span className="text-white text-xs font-bold">G</span>
        </div>
      </div>
      <span className={cn("font-semibold tracking-tight", textColor)}>Geometrik.ai</span>
    </Link>
  )
}

