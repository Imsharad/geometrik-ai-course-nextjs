import React from 'react';
import { Metadata } from 'next';
import { getCaseStudies } from '@/lib/case-studies';
import { CaseStudyList } from '@/components/case-studies/case-study-list';

export const metadata: Metadata = {
  title: 'Case Studies | Geometrik AI Course',
  description: 'Explore real-world success stories and projects from our former students.',
};

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold mb-6 text-gradient">Student Success Stories</h1>
        <p className="text-xl text-slate-700 dark:text-slate-300 mb-12">
          Explore how our former students applied their AI knowledge to solve real-world problems and advance their careers.
        </p>
        
        <CaseStudyList caseStudies={caseStudies} />
      </div>
    </div>
  );
} 