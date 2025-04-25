import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./debug.css"
import { ThemeProvider } from "@/components/theme-provider"

// Import our fix early to ensure it runs before any animations
import "@/app/fix-framer-motion"
import FramerErrorFix from "./fix-framer-errors-client"

// Import bootstrap script
import "./bootstrap.js"

export const metadata: Metadata = {
  title: "Geometrik.ai | Advanced AI Course",
  description: "Master AI techniques with our comprehensive curriculum at Geometrik.ai",
  generator: "v0.dev",
  metadataBase: new URL("https://geometrik.ai/course"),
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <FramerErrorFix />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'