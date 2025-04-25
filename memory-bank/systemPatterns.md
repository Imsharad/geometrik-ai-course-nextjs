# System Patterns & Architecture

## Architectural Patterns

### Component Structure
- **Atomic Design Approach**: 
  - Atoms: Basic UI elements (buttons, inputs, text)
  - Molecules: Simple combinations of atoms (form fields, cards)
  - Organisms: Complex combinations of molecules (headers, feature sections)
  - Templates: Page layouts with placeholders
  - Pages: Specific instances of templates with content

### State Management
- **React Hooks**: Local component state with `useState` and `useReducer`
- **Context API**: For shared state across component trees
- **Server Components**: Leveraging Next.js server components for data fetching

### Styling Approach
- **Utility-First CSS**: Using Tailwind's utility classes for consistent styling
- **Component Variants**: Using `class-variance-authority` for component variants
- **Composition**: Using `clsx`/`tailwind-merge` for conditional class names

### Animation Patterns
- **Framer Motion**: For sophisticated animations and transitions
- **Entry Animations**: Staggered animations on component mount
- **Hover Effects**: Interactive feedback on user hover
- **Scroll Animations**: Reveal animations triggered by scroll position

## Coding Patterns

### Component Patterns
```tsx
// Example component pattern with TypeScript props interface
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  // Implementation
}
```

### Data Fetching
- Server Components for direct data fetching
- Client Components with SWR or React Query for client-side data fetching with caching
- API routes for backend operations
- File system based content loading for Markdown files

### Form Handling
```tsx
// Example form pattern with React Hook Form and Zod
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
  });
  
  // Form implementation
}
```

### Content Management
```tsx
// Example pattern for loading Markdown content
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function getCaseStudies() {
  const directory = path.join(process.cwd(), 'content/case-studies');
  const files = fs.readdirSync(directory);
  
  const caseStudies = files.map(file => {
    const filePath = path.join(directory, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    
    return {
      slug: file.replace('.md', ''),
      ...data,
      content
    };
  });
  
  return caseStudies;
}
```

## Directory Structure Conventions

### Component Organization
- Group related components in subdirectories
- Include index.ts files for clean exports
- Co-locate component tests with the components

### Page Organization
- Follow Next.js App Router conventions
- Use layout.tsx for shared layouts
- Use page.tsx for page content
- Group related pages in subdirectories

### Content Organization
- Store Markdown files in `/content` directory
- Group related content by feature (e.g., `/content/case-studies`)
- Use consistent frontmatter schema for each content type

## Error Handling
- Use try/catch for async operations
- Implement error boundaries for client components
- Use toast notifications for user-facing errors

## Performance Patterns
- Memoize expensive calculations with `useMemo`
- Optimize re-renders with `useCallback` for function props
- Use dynamic imports for code splitting
- Generate static pages from Markdown at build time

*This document should be updated as the system architecture evolves.* 