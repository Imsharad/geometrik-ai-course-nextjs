import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CaseStudyNotFound() {
  return (
    <div className="container mx-auto px-4 py-24 text-center">
      <div className="max-w-md mx-auto">
        <h1 className="text-4xl font-bold mb-6">Case Study Not Found</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
          The case study you're looking for might have been moved or doesn't exist.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild variant="default">
            <Link href="/case-studies">
              Browse Case Studies
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">
              Return Home
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
} 