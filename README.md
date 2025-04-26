# Geometrik AI Course Platform

A modern educational platform for AI curriculum built with Next.js 15, React 19, TypeScript, and Tailwind CSS.

## Features

- **Curriculum Sections**: Comprehensive AI course materials organized by topics
- **Case Studies**: Showcase of student projects with dynamic content from Markdown files
- **Interactive UI**: Rich animations and micro-interactions using Framer Motion
- **Responsive Design**: Fully responsive layout for all device sizes
- **Modern Architecture**: Next.js App Router with proper client/server component boundaries

## Project Structure

- `/src`: Main source code
  - `/app`: Next.js App Router pages and layouts
  - `/components`: Reusable React components
  - `/lib`: Utility functions and data fetching
  - `/styles`: Global CSS and style utilities
  - `/hooks`: Custom React hooks
- `/content`: Markdown-based content (case studies, etc.)
- `/public`: Static assets

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (preferred over npm)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/geometrik-ai-course.git

# Navigate to project directory
cd geometrik-ai-course

# Install dependencies with Bun
bun install
```

### Development

```bash
# Start development server
bun run dev
```

### Building for Production

```bash
# Create production build
bun run build

# Start production server
bun run start
```

## Key Technologies

- **Next.js 15**: App Router, server components, API routes
- **React 19**: Latest React features and optimizations
- **TypeScript**: Type safety throughout the codebase
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Advanced animations and transitions
- **Markdown Processing**: Content management with gray-matter, remark, and rehype

## License

[MIT](LICENSE) 