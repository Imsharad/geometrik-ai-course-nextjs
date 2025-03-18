import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./debug.css"

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



import './globals.css'