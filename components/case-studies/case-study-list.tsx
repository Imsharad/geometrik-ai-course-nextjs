"use client"

import { useState } from 'react';
import { CaseStudy } from '@/lib/case-studies';
import { CaseStudyCard } from './case-study-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

interface CaseStudyListProps {
  caseStudies: CaseStudy[];
}

export function CaseStudyList({ caseStudies }: CaseStudyListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredStudies, setFilteredStudies] = useState(caseStudies);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      setFilteredStudies(caseStudies);
      return;
    }
    
    const query = searchQuery.toLowerCase();
    const filtered = caseStudies.filter(study => 
      study.title.toLowerCase().includes(query) || 
      study.excerpt.toLowerCase().includes(query) ||
      study.author.name.toLowerCase().includes(query)
    );
    
    setFilteredStudies(filtered);
  };

  return (
    <div className="space-y-8">
      <form onSubmit={handleSearch} className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input
            type="text"
            placeholder="Search case studies..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button type="submit">Search</Button>
      </form>
      
      {filteredStudies.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium mb-2">No case studies found</h3>
          <p className="text-slate-500">Try adjusting your search term</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudies.map((study) => (
            <CaseStudyCard key={study.slug} caseStudy={study} />
          ))}
        </div>
      )}
    </div>
  );
} 