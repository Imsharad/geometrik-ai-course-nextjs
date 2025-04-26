# Geometrik AI Course Platform

A modern educational platform for AI curriculum built with Next.js 15, React 19, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Curriculum Sections**: Comprehensive AI course materials organized by topics
- **Case Studies**: Showcase of student projects with dynamic content from Markdown files
- **Interactive UI**: Rich animations and micro-interactions using Framer Motion
- **Responsive Design**: Fully responsive layout for all device sizes
- **Modern Architecture**: Next.js App Router with proper client/server component boundaries
- **Authentication**: Full-featured authentication system powered by Supabase
- **User Profiles**: Customizable user profiles with secure data storage
- **Row-Level Security**: Fine-grained access control for user data

## Project Structure

- `/src`: Main source code
  - `/app`: Next.js App Router pages and layouts
  - `/components`: Reusable React components
    - `/auth`: Authentication and user-related components
  - `/lib`: Utility functions and data fetching
    - `/supabase`: Supabase client utilities
  - `/styles`: Global CSS and style utilities
  - `/hooks`: Custom React hooks
- `/content`: Markdown-based content (case studies, etc.)
- `/public`: Static assets

## Getting Started

### Prerequisites

- Node.js 18+
- Bun (preferred over npm)
- Supabase Account (for authentication and database features)

### Installation

```bash
# Clone the repository
git clone https://github.com/Imsharad/geometrik-ai-course-nextjs.git

# Navigate to project directory
cd geometrik-ai-course-nextjs

# Install dependencies with Bun
bun install

# Create .env.local file with your Supabase credentials
cp .env.example .env.local
# Update with your actual Supabase URL and anon key
```

### Supabase Setup

1. Create a new Supabase project from the [Supabase Dashboard](https://app.supabase.io/)
2. Run the SQL migration in `supabase-migration.sql` to set up the database schema and RLS policies
3. Enable Email and OAuth providers in the Authentication section
4. Add your site URL to the allowed redirect URLs in the Authentication settings
5. Copy your Supabase URL and anon key to your `.env.local` file

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
- **Supabase**: Authentication, user management, and database with Row Level Security

## License

[MIT](LICENSE) 