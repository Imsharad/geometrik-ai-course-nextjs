import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { getCaseStudyFiles, markdownToHtml, extractSectionContent, parseMarkdownToSections } from './markdown';

export interface CaseStudySummary {
  slug: string;
  title: string;
  summary: string;
  student: string;
  cohort: string | number;
  domain: string;
  image?: string;
  outcomes: string[];
  technologies?: string[];
  featured?: boolean;
  readTime?: string;
  date?: string;
}

export interface Metric {
  value: string;
  label: string;
  category?: string;
  unit?: string;
  comparison?: string;
  image?: string;
}

export interface Section {
  title: string;
  content: string;
  images?: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
  icon?: string;
}

export interface Timeline {
  start?: string;
  end?: string;
  duration?: string;
}

export interface CaseStudy {
  // Core fields
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  author: {
    name: string;
    picture: string;
    bio?: string;
  };
  content: string;
  ogImage?: {
    url: string;
  };
  
  // Enhanced fields
  image?: string; // May be same as coverImage
  domain: string;
  summary?: string; // May be same as excerpt
  student: string; // May be derived from author.name
  studentImage?: string; // May be same as author.picture
  studentBackground?: string;
  cohort: string | number;
  readTime?: string;
  featured?: boolean;
  outcomes: string[];
  challenge?: string;
  solution?: string;
  technologies?: string[];
  sections?: Section[];
  metrics?: Metric[];
  projectLinks?: ProjectLink[];
  timeline?: Timeline;
}

// Update the path to point to content directory at project root
const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies');

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  // Use the advanced markdown processing
  const contentHtml = await markdownToHtml(content);
  
  // Extract challenge and solution from the markdown content
  const challenge = extractSectionContent(content, "Challenge") || data.challenge || '';
  const solution = extractSectionContent(content, "Solution") || data.solution || '';
  
  // Parse the rest of the content into sections
  const extractedSections = parseMarkdownToSections(content);
  
  // Combine frontmatter sections with extracted sections
  const sections = data.sections || extractedSections || [];
  
  // Extract metrics from frontmatter if available
  const metrics = data.metrics || [];
  
  // Extract outcomes from frontmatter if available
  const outcomes = data.outcomes || [];
  
  // Extract technologies from frontmatter if available
  const technologies = data.technologies || [];

  return {
    slug,
    title: data.title || '',
    excerpt: data.excerpt || '',
    date: data.date || '',
    coverImage: data.coverImage || '',
    author: data.author || {
      name: '',
      picture: '',
    },
    content: contentHtml,
    ogImage: data.ogImage || { url: '' },
    
    // Map enhanced fields with defaults
    image: data.image || data.coverImage || '',
    domain: data.domain || 'Education', // Default domain
    summary: data.summary || data.excerpt || '',
    student: data.student || (data.author ? data.author.name : ''),
    studentImage: data.studentImage || (data.author ? data.author.picture : ''),
    studentBackground: data.studentBackground || '',
    cohort: data.cohort || 'Pilot',
    readTime: data.readTime || '5 min read',
    featured: data.featured || false,
    outcomes: outcomes,
    challenge: challenge,
    solution: solution,
    technologies: technologies,
    sections: sections,
    metrics: metrics,
    projectLinks: data.projectLinks || [],
    timeline: data.timeline || {},
  };
}

export async function getAllCaseSlugs(): Promise<string[]> {
  try {
    if (!fs.existsSync(caseStudiesDirectory)) {
      fs.mkdirSync(caseStudiesDirectory, { recursive: true });
      return [];
    }
    
    const fileNames = fs.readdirSync(caseStudiesDirectory);
    return fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(fileName => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error getting case study slugs:', error);
    return [];
  }
}

export async function getCaseStudies(): Promise<CaseStudySummary[]> {
  try {
    const slugs = await getAllCaseSlugs();
    
    if (slugs.length === 0) {
      // If no case studies exist yet, create a sample one for development
      if (process.env.NODE_ENV === 'development') {
        const sampleCasePath = path.join(process.cwd(), 'sample_case_study.md');
        if (fs.existsSync(sampleCasePath)) {
          if (!fs.existsSync(caseStudiesDirectory)) {
            fs.mkdirSync(caseStudiesDirectory, { recursive: true });
          }
          
          const sampleContent = fs.readFileSync(sampleCasePath, 'utf8');
          fs.writeFileSync(path.join(caseStudiesDirectory, 'sample-case-study.md'), sampleContent);
          slugs.push('sample-case-study');
        }
      }
    }
    
    const caseStudies = await Promise.all(
      slugs.map(async (slug) => {
        try {
          const filePath = path.join(caseStudiesDirectory, `${slug}.md`);
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const { data } = matter(fileContents);
          
          return {
            slug,
            title: data.title || '',
            summary: data.summary || data.excerpt || '',
            student: data.student || (data.author ? data.author.name : ''),
            cohort: data.cohort || 'Pilot',
            domain: data.domain || 'Education',
            image: data.image || data.coverImage || '',
            outcomes: data.outcomes || [],
            technologies: data.technologies || [],
            featured: data.featured || false,
            readTime: data.readTime || '5 min read',
            date: data.date || '',
          } as CaseStudySummary;
        } catch (error) {
          console.error(`Error getting case study ${slug}:`, error);
          return null;
        }
      })
    );
    
    // Sort case studies by featured status and then by date
    return (caseStudies
      .filter(Boolean) as CaseStudySummary[])
      .sort((a: CaseStudySummary, b: CaseStudySummary) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  } catch (error) {
    console.error('Error getting case studies:', error);
    return [];
  }
}

// Function to get navigation data for a case study
export async function getCaseStudyNavigation(currentSlug: string): Promise<{ 
  prev: CaseStudySummary | null; 
  next: CaseStudySummary | null 
}> {
  const allCaseStudies = await getCaseStudies();
  
  // Sort case studies by date
  const sortedCaseStudies = [...allCaseStudies].sort(
    (a: CaseStudySummary, b: CaseStudySummary) => {
      // First by featured status
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      
      // Use the date property if it exists
      if (a.date && b.date) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      
      return 0;
    }
  );
  
  const currentIndex = sortedCaseStudies.findIndex(cs => cs.slug === currentSlug);
  
  if (currentIndex === -1) {
    return { prev: null, next: null };
  }
  
  const prev = currentIndex < sortedCaseStudies.length - 1 
    ? sortedCaseStudies[currentIndex + 1]
    : null;
    
  const next = currentIndex > 0 
    ? sortedCaseStudies[currentIndex - 1]
    : null;
    
  return { prev, next };
}

/**
 * Get related case studies based on domain and technologies
 */
export async function getRelatedCaseStudies(
  currentSlug: string,
  domain: string,
  technologies: string[] = []
): Promise<CaseStudySummary[]> {
  const allCaseStudies = await getCaseStudies();

  return allCaseStudies
    .filter((study) => study.slug !== currentSlug)
    .filter((study) => {
      // Prioritize same domain
      if (study.domain === domain) return true;

      // If we have technologies data, use it for matching
      if (technologies.length > 0 && study.technologies) {
        // Check if there's any overlap in technologies
        return technologies.some((tech) => study.technologies?.includes(tech));
      }

      return false;
    })
    .slice(0, 3); // Limit to 3 related studies
} 