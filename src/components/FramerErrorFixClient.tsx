"use client";

import dynamic from 'next/dynamic';

// Dynamically import the actual fix component, ensuring it's NEVER included server-side
const FramerErrorFix = dynamic(() => import('@/app/fix-framer-errors-client'), {
  ssr: false, // Explicitly disable SSR for this component
});

export default function FramerErrorFixClient() {
  // This wrapper now dynamically renders the original component only on the client
  return <FramerErrorFix />;
} 