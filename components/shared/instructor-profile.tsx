"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Briefcase, FileText, Video, LinkIcon, Star } from "lucide-react"
import Link from "next/link"

export interface InstructorStat {
  id: number
  label: string
  value: string
  icon: React.ElementType
}

export interface Experience {
  id: number
  company: string
  role: string
  duration: string
  description: string
}

export interface Publication {
  id: number
  title: string
  publisher: string
  year: number
  link: string
}

export interface Conference {
  id: number
  title: string
  role: string
  year: number
  location: string
}

export interface Instructor {
  name: string
  title: string
  image: string
  bio: string
  statistics: InstructorStat[]
  teachingStyle: string
  experience?: Experience[]
  publications?: Publication[]
  conferences?: Conference[]
}

interface InstructorProfileProps {
  instructor: Instructor
  variants?: any
  showDetails?: boolean
}

export function InstructorProfile({ instructor, variants, showDetails = true }: InstructorProfileProps) {
  return (
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <motion.div className="space-y-6" variants={variants}>
        <div className="aspect-square relative rounded-lg overflow-hidden border shadow-lg mx-auto max-w-sm">
          <Image src={instructor.image || "/placeholder.svg"} alt={instructor.name} fill className="object-cover" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          {instructor.statistics.map((stat) => {
            const StatIcon = stat.icon

            return (
              <div key={stat.id} className="bg-card border rounded-lg p-4 text-center">
                <StatIcon className="h-6 w-6 mx-auto mb-2 text-primary" />
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>

        <div className="p-6 bg-card border rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <FileText className="h-5 w-5 text-primary" />
            <h3 className="font-bold">Teaching Philosophy</h3>
          </div>
          <p className="text-muted-foreground italic">"{instructor.teachingStyle}"</p>
          <div className="mt-4 flex justify-center">
            <div className="flex items-center gap-1">
              {Array(5)
                .fill(0)
                .map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                ))}
              <span className="text-sm font-medium ml-2">4.9/5.0 instructor rating</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Button asChild>
            <Link href="#enroll">Learn From {instructor.name.split(" ")[0]}</Link>
          </Button>
        </div>
      </motion.div>

      {showDetails && instructor.experience && instructor.publications && instructor.conferences && (
        <motion.div variants={variants}>
          <h3 className="text-2xl font-bold tracking-tight mb-6">{instructor.name}</h3>
          <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium mb-4">
            {instructor.title}
          </div>

          <p className="text-muted-foreground mb-8">{instructor.bio}</p>

          <Tabs defaultValue="experience">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="publications">Publications</TabsTrigger>
              <TabsTrigger value="speaking">Speaking</TabsTrigger>
            </TabsList>

            <TabsContent value="experience" className="p-4 border rounded-lg mt-4">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Briefcase className="h-5 w-5 text-primary" />
                Professional Experience
              </h4>
              <div className="space-y-4">
                {instructor.experience.map((exp) => (
                  <div key={exp.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex flex-wrap justify-between gap-2 mb-1">
                      <h5 className="font-medium">{exp.company}</h5>
                      <span className="text-sm text-muted-foreground">{exp.duration}</span>
                    </div>
                    <div className="text-sm font-medium mb-1">{exp.role}</div>
                    <p className="text-sm text-muted-foreground">{exp.description}</p>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="publications" className="p-4 border rounded-lg mt-4">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Publications & Research
              </h4>
              <div className="space-y-4">
                {instructor.publications.map((pub) => (
                  <div key={pub.id} className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium">{pub.title}</h5>
                    <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground mb-2">
                      <span>{pub.publisher}</span>
                      <span>{pub.year}</span>
                    </div>
                    <Link href={pub.link} className="text-sm text-primary flex items-center gap-1 hover:underline">
                      <LinkIcon className="h-3.5 w-3.5" /> View Publication
                    </Link>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="speaking" className="p-4 border rounded-lg mt-4">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Speaking Engagements
              </h4>
              <div className="space-y-4">
                {instructor.conferences.map((conf) => (
                  <div key={conf.id} className="p-3 bg-muted rounded-lg">
                    <h5 className="font-medium">{conf.title}</h5>
                    <div className="text-sm font-medium mb-1">{conf.role}</div>
                    <div className="flex flex-wrap justify-between gap-2 text-sm text-muted-foreground">
                      <span>{conf.location}</span>
                      <span>{conf.year}</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      )}
    </div>
  )
}

