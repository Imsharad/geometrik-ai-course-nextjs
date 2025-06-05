import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllCaseSlugs, getCaseStudyBySlug, getCaseStudyNavigation, getCaseStudies } from '@/lib/case-studies';
import { Detail } from '@/components/case-studies/detail';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  try {
    const caseStudy = await getCaseStudyBySlug((await params).slug);
    
    return {
      title: `${caseStudy.title} | Geometrik AI Course Case Study`,
      description: caseStudy.summary || caseStudy.excerpt,
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
    const caseStudy = await getCaseStudyBySlug((await params).slug);
    const navigation = await getCaseStudyNavigation((await params).slug);
    
    return (
      <Detail caseStudy={caseStudy} navigation={navigation} />
    );
  } catch (error) {
    notFound();
  }
} 