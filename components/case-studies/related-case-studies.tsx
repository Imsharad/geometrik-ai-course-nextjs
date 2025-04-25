import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/lib/case-studies';

interface RelatedCaseStudiesProps {
  currentSlug: string;
  caseStudies: CaseStudy[];
  maxDisplay?: number;
}

export function RelatedCaseStudies({ 
  currentSlug, 
  caseStudies, 
  maxDisplay = 3 
}: RelatedCaseStudiesProps) {
  // Filter out the current case study and limit to maxDisplay
  const relatedStudies = caseStudies
    .filter(study => study.slug !== currentSlug)
    .slice(0, maxDisplay);
  
  if (relatedStudies.length === 0) return null;
  
  return (
    <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
      <h2 className="text-2xl font-bold mb-6">More Success Stories</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedStudies.map(study => (
          <Link 
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className="group flex flex-col rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-md transition-shadow"
          >
            <div className="relative h-40 w-full">
              <Image
                src={study.coverImage || '/images/case-studies/default-cover.jpg'}
                alt={study.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="p-4 flex-1 flex flex-col">
              <h3 className="font-medium text-lg mb-2 group-hover:text-primary transition-colors">
                {study.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-2">
                {study.excerpt}
              </p>
              <p className="mt-auto text-xs text-slate-500">
                By {study.author.name}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 