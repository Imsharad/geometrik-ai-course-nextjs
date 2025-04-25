// Required bootstrap script for Next.js 

// This file might be missing, causing the "Invariant: missing bootstrap script" error.
// Creating this file should fix the issue.

// Register client-side features
if (typeof window !== 'undefined') {
  // Register service worker (if needed)
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
      // navigator.serviceWorker.register('/sw.js');
    });
  }

  // Set up any global client-side event listeners
  window.addEventListener('error', function(event) {
    console.warn('Global error caught:', event.error);
  });
}

// This file needs to exist, but it doesn't need to do much.
// Next.js will look for it during the build process.
export {}; 