"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface GlobeVisualizationProps {
  countryCount?: number
  showStats?: boolean
  size?: "small" | "medium" | "large"
}

export function GlobeVisualization({ countryCount = 65, showStats = true, size = "medium" }: GlobeVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [particles, setParticles] = useState<any[]>([])
  const [connections, setConnections] = useState<any[]>([])
  const [dimensions, setDimensions] = useState({ width: 400, height: 400 })
  const [isHovered, setIsHovered] = useState(false)
  const [rotation, setRotation] = useState(0)

  // Size mapping
  const sizeMap = {
    small: { width: 200, height: 200 },
    medium: { width: 400, height: 400 },
    large: { width: 600, height: 600 },
  }

  // Initialize globe
  useEffect(() => {
    if (!svgRef.current) return

    const { width, height } = svgRef.current.getBoundingClientRect()
    const newDimensions = { width, height }
    setDimensions(newDimensions)

    // Create particles
    const newParticles = []
    const particleCount = Math.min(50, Math.floor(width / 8))

    for (let i = 0; i < particleCount; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 0.1,
        speedX: Math.random() * 0.2 - 0.1,
        speedY: Math.random() * 0.2 - 0.1,
        opacity: Math.random() * 0.5 + 0.1,
      })
    }
    setParticles(newParticles)

    // Create connections
    const newConnections = []
    const connectionCount = Math.min(15, Math.floor(width / 30))

    for (let i = 0; i < connectionCount; i++) {
      newConnections.push({
        id: i,
        from: Math.floor(Math.random() * particleCount),
        to: Math.floor(Math.random() * particleCount),
        progress: Math.random(),
        speed: Math.random() * 0.01 + 0.003,
        active: Math.random() > 0.3,
      })
    }
    setConnections(newConnections)

    const handleResize = () => {
      if (!svgRef.current) return
      const { width, height } = svgRef.current.getBoundingClientRect()
      setDimensions({ width, height })
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate the globe
      setRotation((prev) => (prev + (isHovered ? 0.4 : 0.2)) % 360)

      // Update particles
      setParticles((prevParticles) =>
        prevParticles.map((particle) => {
          // Update position
          let x = particle.x + particle.speedX
          let y = particle.y + particle.speedY

          // Wrap around edges
          if (x > dimensions.width) x = 0
          else if (x < 0) x = dimensions.width

          if (y > dimensions.height) y = 0
          else if (y < 0) y = dimensions.height

          return { ...particle, x, y }
        }),
      )

      // Update connections
      setConnections((prevConnections) =>
        prevConnections.map((conn) => {
          let newProgress = conn.progress + conn.speed

          if (newProgress > 1) {
            newProgress = 0
            // Randomly change destination
            return {
              ...conn,
              progress: newProgress,
              to: Math.floor(Math.random() * particles.length),
              active: Math.random() > 0.3,
            }
          }

          return { ...conn, progress: newProgress }
        }),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [isHovered, dimensions.width, dimensions.height, particles.length])

  const { width, height } = sizeMap[size]

  return (
    <div className={`relative w-full max-w-[${width}px] h-[${height}px] mx-auto`}>
      <motion.svg
        ref={svgRef}
        className="w-full h-full"
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Globe outline */}
        <circle
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          r={Math.min(dimensions.width, dimensions.height) * 0.35}
          fill="none"
          stroke="rgba(59, 130, 246, 0.15)"
          strokeWidth="1"
        />

        {/* Equator line */}
        <ellipse
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          rx={Math.min(dimensions.width, dimensions.height) * 0.35}
          ry={Math.min(dimensions.width, dimensions.height) * 0.35 * 0.1}
          fill="none"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="1"
        />

        {/* Meridian lines */}
        <ellipse
          cx={dimensions.width / 2}
          cy={dimensions.height / 2}
          rx={Math.min(dimensions.width, dimensions.height) * 0.35 * 0.1}
          ry={Math.min(dimensions.width, dimensions.height) * 0.35}
          fill="none"
          stroke="rgba(59, 130, 246, 0.1)"
          strokeWidth="1"
        />

        {/* Connection lines */}
        {connections.map((conn) => {
          if (!conn.active) return null

          const fromParticle = particles[conn.from]
          const toParticle = particles[conn.to]

          if (!fromParticle || !toParticle) return null

          // Calculate the point along the path based on progress
          const currentX = fromParticle.x + (toParticle.x - fromParticle.x) * conn.progress
          const currentY = fromParticle.y + (toParticle.y - fromParticle.y) * conn.progress

          return (
            <g key={conn.id}>
              <line
                x1={fromParticle.x}
                y1={fromParticle.y}
                x2={toParticle.x}
                y2={toParticle.y}
                stroke="rgba(59, 130, 246, 0.1)"
                strokeWidth="0.5"
                strokeDasharray="2 2"
              />
              <circle cx={currentX} cy={currentY} r={1.5} fill="rgba(59, 130, 246, 0.6)" />
            </g>
          )
        })}

        {/* Particles */}
        {particles.map((particle) => (
          <circle
            key={particle.id}
            cx={particle.x}
            cy={particle.y}
            r={particle.size}
            fill={`rgba(59, 130, 246, ${particle.opacity})`}
          />
        ))}
      </motion.svg>

      {showStats && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="text-4xl font-bold text-primary">{countryCount}+</div>
          <div className="text-sm text-muted-foreground">Countries</div>
        </div>
      )}
    </div>
  )
}

