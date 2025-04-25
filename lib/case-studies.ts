import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export interface CaseStudy {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  coverImage: string;
  author: {
    name: string;
    picture: string;
  };
  content: string;
  ogImage?: {
    url: string;
  };
}

const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies');

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy> {
  const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const processedContent = await remark()
    .use(html)
    .process(content);
  const contentHtml = processedContent.toString();

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

export async function getCaseStudies(): Promise<CaseStudy[]> {
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
          return await getCaseStudyBySlug(slug);
        } catch (error) {
          console.error(`Error getting case study ${slug}:`, error);
          return null;
        }
      })
    );
    
    return caseStudies
      .filter(Boolean) as CaseStudy[];
  } catch (error) {
    console.error('Error getting case studies:', error);
    return [];
  }
} 