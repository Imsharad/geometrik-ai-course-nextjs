# Active Development Context
*Last Updated: May 2024*

## Current Focus
Fixed a critical build error related to React context in Framer Motion components during server-side rendering. The error (`TypeError: null is not an object (evaluating 'ReactSharedInternals.H.useContext')`) was occurring during static generation of error pages. Implemented a proper client/server component boundary by creating a client wrapper component with dynamic imports and the `ssr: false` option to ensure client-side code only runs in the browser. Cleared build cache and reinstalled dependencies to resolve the issue.

## Previous Focus
Successfully reorganized the project structure by moving code directories (app/, components/, lib/, hooks/, styles/, config/) into a src/ directory while maintaining proper functionality. Updated import paths and tsconfig.json to ensure the application continues to work correctly. This reorganization reduces noise in the root directory and follows modern best practices for Next.js projects.

## Active Tasks
- [x] Create memory-bank directory structure
- [x] Create .cursor/rules directory structure
- [ ] Implement core Cursor rules for project guidance
- [ ] Configure AI assistant behavior for the codebase
- [x] Create Case Studies page with modern design and animations
- [x] Set up Markdown-based case study content structure
- [x] Implement case study detail view
- [x] Fix dependencies for markdown parsing
- [x] Switch to Bun for package management
- [x] Enhance case study detail page with sophisticated animations
- [x] Implement micro-interactions for improved user experience
- [x] Add site footer to Case Studies page
- [x] Verify navigation links to Case Studies page
- [x] Implement dynamic image placeholder component
- [x] Fix missing student images in Case Study detail page
- [x] Fix Key Results image rendering
- [x] Harmonize hero background with page content
- [x] Enhance site footer design
- [x] Reorganize project structure into src directory
- [x] Update import paths and configuration
- [x] Fix build error with Framer Motion components
- [x] Implement proper client/server component boundary
- [ ] Test animations for performance impacts
- [ ] Ensure accessibility of animated components

## Key Files in Current Focus
- `src/components/FramerErrorFixClient.tsx`: New client wrapper for the Framer error fix component
- `src/app/layout.tsx`: Updated to use the client wrapper component
- `src/app/fix-framer-errors-client.tsx`: Original error fix component for Framer Motion
- `src/app/fix-framer-motion.tsx`: Motion component and animation utilities
- `tsconfig.json`: Updated with new path mappings for src directory
- `src/lib/case-studies.ts`: Updated to maintain correct path to content directory
- `.cursor/rules/*.mdc`: Rules for AI assistant behavior
- `memory-bank/*.md`: Knowledge base for project context
- `src/app/case-studies/page.tsx`: Main case studies listing page (moved to src)
- `src/app/case-studies/[slug]/page.tsx`: Individual case study template (moved to src)
- `src/components/case-studies/detail.tsx`: Enhanced case study detail component (moved to src)
- `src/components/shared/placeholder-image.tsx`: Dynamic image placeholders (moved to src)
- `content/case-studies/*.md`: Case study content files (remain at root)

## Recent Changes
- Fixed build error by creating a proper client component wrapper
- Used dynamic imports with `ssr: false` to prevent server-side rendering of client components
- Cleared build cache and reinstalled dependencies
- Successfully verified build process works without errors
- Reorganized project structure by moving code into src/ directory
- Updated tsconfig.json with new path mappings
- Fixed import paths in layout.tsx and other files
- Created special path mapping for content directory
- Verified that the application builds and runs correctly
- Added SiteFooter component to the Case Studies listing page
- Created a reusable PlaceholderImage component for dynamic image rendering
- Fixed "null" image in Student Card with placeholder implementation
- Enhanced the Key Results section to properly handle metric images

## Next Steps
- Document the client/server component boundary pattern
- Monitor for any other build errors
- Document the new project structure
- Consider cleaning up any unused files
- Implement more case study content
- Add keyboard navigation support for animated elements
- Consider performance optimizations for animation-heavy pages

## Notes & Considerations
- React 19 and Next.js 15 have stricter boundaries between server and client components
- The `"use client"` directive is required for any component using client-side React features
- For components using browser-only features, consider using dynamic imports with `ssr: false`
- Build cache issues can sometimes cause persistent errors - clear cache when troubleshooting
- The content/ directory intentionally remains at the root level for easier content management
- Using src/ directory follows modern Next.js project organization practices
- Path mappings in tsconfig.json ensure imports continue to work correctly
- Ensure all new files are created in the appropriate src/ subdirectories
- Update this file regularly to reflect current development focus
- Maintain consistent design language between case studies and existing pages
- Balance animation richness with performance considerations
- Test new features thoroughly across different viewport sizes

## Animation Components
- `src/components/animations/parallax.tsx`: Parallax effect for images and backgrounds (moved to src)
- `src/components/animations/scroll-trigger.tsx`: Animations triggered by scroll position (moved to src)
- `src/lib/animations.ts`: Utility functions for animations (moved to src)

## Related Files
- `src/components/case-studies/detail.tsx`: Main case study detail page using animations
- `src/components/case-studies/card.tsx`: Card component with hover animations
- `src/app/case-studies/[slug]/page.tsx`: Dynamic route for case studies
- `src/components/shared/placeholder-image.tsx`: Reusable component for dynamic images
- `src/styles/globals.css`: Global styles (moved from styles/ to src/styles/)
- `tailwind.config.js`: Animation-related Tailwind configurations

*This is a dynamic document that should be updated frequently to reflect the current development focus and context.* 