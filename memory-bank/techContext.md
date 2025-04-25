# Technology Context

## Core Technology Stack
- **Framework**: Next.js 15.1.0 (with App Router)
- **Language**: TypeScript 5.x
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4.x, with tailwindcss-animate
- **Component Library**: 
  - Radix UI components (dialogs, accordions, navigation, etc.)
  - Custom components using class-variance-authority and clsx/tailwind-merge
- **Form Handling**: React Hook Form with Zod validation
- **Animations**: Framer Motion 12.0.0-alpha.0
- **Content Management**: 
  - gray-matter for Markdown frontmatter parsing
  - remark/rehype ecosystem for Markdown processing
- **Utilities**: 
  - date-fns for date handling
  - next-themes for theme management
  - cmdk for command interfaces
  - sonner for toast notifications

## Project Structure
- `/app`: Next.js App Router pages and layouts
- `/components`: Reusable UI components
- `/lib`: Utility functions and shared logic
- `/hooks`: Custom React hooks
- `/styles`: Global CSS and styling utilities
- `/public`: Static assets
- `/content`: Markdown content files for static content like case studies

## Build & Development Tools
- Package Manager: pnpm
- Linting: Next.js default linting configuration
- Postcss with autoprefixer

## Important Libraries & Versions
| Library | Version | Purpose |
|---------|---------|---------|
| next | 15.1.0 | Framework |
| react/react-dom | 19.x | UI rendering |
| typescript | 5.x | Type safety |
| tailwindcss | 3.4.17 | Styling |
| radix-ui/* | Various | UI components |
| react-hook-form | 7.54.1 | Form handling |
| zod | 3.24.1 | Schema validation |
| framer-motion | 12.0.0-alpha.0 | Animations |
| gray-matter | 4.0.3 | Markdown parsing |
| remark | 14.0.3 | Markdown processing |
| rehype | 12.0.1 | HTML processing |

## APIs & External Services
*To be documented as integrated*

## Performance Considerations
- Next.js App Router implements server components for better performance
- Image optimization via Next.js Image component
- Consider code splitting for larger page bundles
- Use static generation for Markdown-based case studies

## Accessibility
- Radix UI provides accessible components by default
- Ensure proper contrast ratios with Tailwind
- Maintain semantic HTML structure
- Add proper ARIA labels to interactive case study elements

*This document should be updated when significant tech stack changes occur.* 