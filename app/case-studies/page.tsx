import React from 'react';
import { Metadata } from 'next';
import { getCaseStudies } from '@/lib/case-studies';
import { List } from '@/components/case-studies/list';
import { Hero } from '@/components/case-studies/hero';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';

export const metadata: Metadata = {
  title: 'Student Case Studies | Geometrik AI Course',
  description: 'Explore real-world AI projects completed by our graduates. See how our curriculum translates into impactful solutions across industries.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <main className="flex-1">
        <Hero />

        <section className="container max-w-6xl mx-auto px-4 py-12">
          <List caseStudies={caseStudies} />
        </section>
      </main>
      <SiteFooter />
    </div>
  );
} 