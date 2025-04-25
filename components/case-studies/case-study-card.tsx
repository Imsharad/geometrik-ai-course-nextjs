import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CaseStudy } from '@/lib/case-studies';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const defaultImage = '/images/case-studies/default-cover.jpg';
  
  return (
    <Link 
      href={`/case-studies/${caseStudy.slug}`}
      className="group flex flex-col h-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-950"
    >
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={caseStudy.coverImage || defaultImage}
          alt={caseStudy.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-semibold leading-tight text-slate-900 dark:text-slate-50">
          {caseStudy.title}
        </h3>
        
        <p className="mb-4 line-clamp-3 flex-1 text-sm text-slate-600 dark:text-slate-400">
          {caseStudy.excerpt}
        </p>
        
        <div className="mt-auto flex items-center">
          {caseStudy.author.picture && (
            <div className="relative mr-3 h-8 w-8 overflow-hidden rounded-full">
              <Image
                src={caseStudy.author.picture}
                alt={caseStudy.author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
              {caseStudy.author.name}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {new Date(caseStudy.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
} 