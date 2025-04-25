import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllCaseSlugs, getCaseStudyBySlug, getCaseStudies } from '@/lib/case-studies';
import { RelatedCaseStudies } from '@/components/case-studies/related-case-studies';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  try {
    const caseStudy = await getCaseStudyBySlug(params.slug);
    
    return {
      title: `${caseStudy.title} | Geometrik AI Course Case Study`,
      description: caseStudy.excerpt,
      openGraph: caseStudy.ogImage 
        ? { images: [caseStudy.ogImage.url] }
        : undefined,
    };
  } catch (error) {
    return {
      title: 'Case Study | Geometrik AI Course',
      description: 'A student success story from the Geometrik AI Course.',
    };
  }
}

export async function generateStaticParams() {
  const slugs = await getAllCaseSlugs();
  return slugs.map(slug => ({ slug }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  try {
    const caseStudy = await getCaseStudyBySlug(params.slug);
    const allCaseStudies = await getCaseStudies();
    const defaultImage = '/images/case-studies/default-cover.jpg';
    
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <Link 
            href="/case-studies" 
            className="mb-8 inline-flex items-center text-sm font-medium text-slate-600 hover:text-primary transition-colors dark:text-slate-400 dark:hover:text-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6" />
            </svg>
            Back to Case Studies
          </Link>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient">{caseStudy.title}</h1>
          
          <div className="mb-8 flex items-center">
            {caseStudy.author.picture && (
              <div className="relative mr-3 h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src={caseStudy.author.picture}
                  alt={caseStudy.author.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            
            <div>
              <p className="text-md font-medium text-slate-900 dark:text-slate-200">
                {caseStudy.author.name}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {new Date(caseStudy.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          
          <div className="relative mb-12 h-72 md:h-96 w-full overflow-hidden rounded-lg">
            <Image
              src={caseStudy.coverImage || defaultImage}
              alt={caseStudy.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: caseStudy.content }} />
          
          <div className="mt-16 rounded-lg bg-slate-50 p-8 dark:bg-slate-900">
            <h2 className="mb-4 text-2xl font-semibold">Take the First Step in Your AI Journey</h2>
            <p className="mb-6 text-slate-600 dark:text-slate-300">
              Join our comprehensive AI course and build the skills to create success stories like this one.
            </p>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-primary/90"
            >
              Explore Course Options
            </Link>
          </div>
          
          <RelatedCaseStudies 
            currentSlug={params.slug}
            caseStudies={allCaseStudies}
          />
        </div>
      </div>
    );
  } catch (error) {
    notFound();
  }
} 