# Copilot Instructions for Storyblok Next.js 15 Project

## Project Overview
This is a Next.js 15 App Router project integrated with Storyblok CMS for headless content management. The architecture follows a component-driven approach where Storyblok content types map to React components.

## Core Architecture

### Storyblok Integration Pattern
- **Component Registration**: All Storyblok components are registered in `src/lib/storyblok.ts` using the `storyblokInit` function
- **Component Mapping**: Storyblok content types (e.g., "page", "teaser") map to React components with identical names
- **Provider Setup**: `StoryblokProvider` wraps the app in `layout.tsx` to initialize the Storyblok API client

### Dual-Mode Routing System
The project uses a sophisticated dual-mode routing to handle both published and draft content:

- **Production Route**: `app/[[...slug]]/page.tsx` - Fetches `published` content for live site
- **Preview Route**: `app/preview/[[...slug]]/page.tsx` - Fetches `draft` content for Storyblok live preview
- **Slug Handling**: Both routes use catch-all segments `[[...slug]]` to handle dynamic paths; empty slug defaults to "home"

### Content Fetching Strategy
- **fetchStory utility**: Located in `src/utils/fetchStory.ts`, handles both draft and published content
- **Cache Strategy**: Published content uses default caching, draft content uses `cache: 'no-store'`
- **URL Construction**: Converts slug arrays to Storyblok API paths (e.g., `['about', 'team']` → `/about/team`)

## Development Workflow

### Environment Setup
- Requires `NEXT_PUBLIC_STORYBLOK_TOKEN` in `.env.local`
- Dev server runs with HTTPS (`--experimental-https`) for Storyblok live preview compatibility
- Uses Turbopack for faster development builds

### Component Development Pattern
When creating new Storyblok components:
1. Create React component in `src/components/` following this pattern:
   ```tsx
   import { SbBlokData, storyblokEditable } from '@storyblok/react/rsc';
   
   interface SbComponentData extends SbBlokData {
     // Define your Storyblok fields here
   }
   
   export default function Component({ blok }: { blok: SbComponentData }) {
     return (
       <div {...storyblokEditable(blok)}>
         {/* Component content */}
       </div>
     );
   }
   ```
2. Register component in `src/lib/storyblok.ts` components object
3. Create corresponding component in Storyblok CMS with matching name

### Content Revalidation
- API endpoint: `src/app/api/revalidate/route.ts`
- Webhook-triggered revalidation using Next.js `revalidatePath`
- Handles Storyblok's `full_slug` parameter and converts "home" to "/"

## Key Files and Their Purposes

- `src/lib/storyblok.ts`: Central Storyblok configuration and component registration
- `src/utils/fetchStory.ts`: Unified content fetching logic for both draft and published content
- `src/components/Page.tsx`: Container component that renders Storyblok body content using `StoryblokServerComponent`
- `src/app/layout.tsx`: App-wide layout with StoryblokProvider initialization

## Configuration Notes

- **Image Optimization**: `next.config.ts` allows remote images from `focusreactive.com`
- **HTTPS Development**: Required for Storyblok live preview integration
- **TypeScript**: Strict typing with Storyblok's `SbBlokData` interfaces

## Common Patterns

- Always extend `SbBlokData` for component prop interfaces
- Use `storyblokEditable(blok)` spread for live editing capabilities
- Prefer server components (`/rsc` imports) for better performance
- Handle empty slugs by defaulting to "home" content