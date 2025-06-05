import fs from "fs"
import yaml from "js-yaml"
import path from "path"
import { InstructorClient, type InstructorData } from "./instructor-client"

// Define types for the YAML resume data
interface SocialNetwork {
  network: string
  username: string
}

interface ProfessionalExperience {
  company: string
  position: string
  location: string
  start_date: string
  end_date?: string
  highlights: string[]
}

interface EducationEntry {
  institution: string
  area: string
  degree: string
  location: string
  start_date: string
  end_date: string
}

interface Technology {
  label: string
  details: string
}

interface CVData {
  name: string
  location: string
  email: string
  phone: string
  website: string
  social_networks: SocialNetwork[]
  sections: {
    professional_summary: string[]
    professional_experience: ProfessionalExperience[]
    education: EducationEntry[]
    technologies: Technology[]
  }
}

// Helper function to format dates
const formatDateRange = (startDate: string, endDate?: string) => {
  const start = new Date(startDate)
  const end = endDate && endDate !== "present" ? new Date(endDate) : null
  const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short" }

  const startDateFormatted = start.toLocaleDateString("en-US", options)
  if (endDate === "present") {
    return `${startDateFormatted} - Present`
  }
  if (end) {
    const endDateFormatted = end.toLocaleDateString("en-US", options)
    return `${startDateFormatted} - ${endDateFormatted}`
  }
  return startDateFormatted
}

// Server component that reads and processes the YAML data
export function InstructorSection() {
  // Load YAML data on the server side
  let instructorData: CVData | null = null
  
  try {
    const yamlPath = path.join(process.cwd(), "resume.yaml")
    const fileContents = fs.readFileSync(yamlPath, "utf8")
    const data = yaml.load(fileContents) as { cv: CVData }
    instructorData = data.cv
  } catch (error) {
    console.error("Error loading or parsing resume.yaml:", error)
    // Return a fallback or throw error
    return <div>Error loading instructor data. Please check the resume.yaml file.</div>
  }

  if (!instructorData) {
    return <div>No instructor data available.</div>
  }

  // Transform YAML data to component structure
  const instructor: InstructorData = {
    name: instructorData.name,
    title: instructorData.sections.professional_experience[0]?.position || "Instructor",
    image: "/images/instructor/main.jpeg",
    bio: instructorData.sections.professional_summary.join("\n\n"),
    location: instructorData.location,
    experience: instructorData.sections.professional_experience.map(exp => ({
      company: exp.company,
      role: exp.position,
      period: formatDateRange(exp.start_date, exp.end_date),
      description: exp.highlights.join("\n- "),
      location: exp.location,
    })),
    education: instructorData.sections.education.map(edu => ({
      institution: edu.institution,
      degree: `${edu.degree} in ${edu.area}`,
      period: formatDateRange(edu.start_date, edu.end_date),
      location: edu.location,
    })),
    technologies: instructorData.sections.technologies,
    contact: {
      email: instructorData.email,
      phone: instructorData.phone,
      website: instructorData.website,
      social_networks: instructorData.social_networks,
    },
  }

  // Pass the processed data to the client component
  return <InstructorClient instructor={instructor} />
}

