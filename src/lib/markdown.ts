import fs from "fs/promises"
import path from "path"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import rehypeRaw from "rehype-raw"
import { unified } from "unified"

// Define the directory where case studies are stored
const caseStudiesDirectory = path.join(process.cwd(), "content/case-studies")

/**
 * Get list of all case study files
 */
export async function getCaseStudyFiles() {
  try {
    return await fs.readdir(caseStudiesDirectory)
  } catch (error) {
    console.error("Error reading case studies directory:", error)
    return []
  }
}

/**
 * Parse markdown content to HTML
 */
export async function markdownToHtml(markdown: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeStringify)
    .process(markdown)

  return result.toString()
}

/**
 * Extract section content from markdown based on heading
 */
export function extractSectionContent(markdown: string, heading: string): string {
  const headingPattern = new RegExp(`## ${heading}\\s*([^#]+)`, "i")
  const match = markdown.match(headingPattern)
  return match ? match[1].trim() : ""
}

/**
 * Extract image URLs from a section of markdown
 */
export function extractImagesFromSection(sectionContent: string): string[] {
  const imagePattern = /!\[.*?\]\((.*?)\)/g
  const images: string[] = []
  let match

  while ((match = imagePattern.exec(sectionContent)) !== null) {
    images.push(match[1])
  }

  return images
}

/**
 * Parse markdown content to sections
 */
export function parseMarkdownToSections(content: string) {
  const sections: Array<{ title: string; content: string; images: string[] }> = []
  const sectionRegex = /## ([^\n]+)\n([\s\S]*?)(?=## |$)/g

  let match
  while ((match = sectionRegex.exec(content)) !== null) {
    const title = match[1].trim()
    // Skip Challenge and Solution sections as they are handled separately
    if (title !== "Challenge" && title !== "Solution") {
      const sectionContent = match[2].trim()
      const images = extractImagesFromSection(sectionContent)

      // Remove image markup from content
      const cleanContent = sectionContent.replace(/!\[.*?\]\(.*?\)/g, "").trim()

      sections.push({
        title,
        content: cleanContent,
        images,
      })
    }
  }

  return sections
} 