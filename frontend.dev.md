# Frontend Developer Guide

This guide is for frontend developers working on the Next.js application (`web/`) connected to Sanity.

---

## 1. Local Environment Setup

Create a `.env.local` file in the `web/` directory:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=vdlf8k9d
NEXT_PUBLIC_SANITY_DATASET=production
# Add if preview mode or Draft Mode token is needed:
SANITY_API_READ_TOKEN=your_read_token
```

To run the Next.js development server:
```bash
cd web
npm install
npm run dev
```
The site will run on [http://localhost:3000](http://localhost:3000).

---

## 2. Folder Structure

Here is the directory structure for the Next.js frontend app (`web/`):

```
web/
├── src/
│   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── api/             # API routes
│   │   │   └── draft-mode/
│   │   │       └── enable/
│   │   │           └── route.ts  # Endpoint to enable Draft Mode / Preview
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout (mounts <SanityLive /> & <VisualEditing />)
│   │   └── page.tsx         # Home page rendering fetched bulbs
│   └── sanity/              # Sanity configuration and client folder
│       ├── client.ts        # Exports configured Sanity client
│       └── lib/
│           └── live.ts      # Configures Live Content API (sanityFetch, SanityLive)
├── public/                  # Static files (images, icons)
├── .env.local               # Local environment variables
├── next.config.ts           # Next.js configurations
├── package.json             # Project dependencies and dev scripts
├── tsconfig.json            # TypeScript configuration
└── eslint.config.mjs        # ESLint configuration
```

---

## 3. Sanity Client Configuration

The client is configured in `src/sanity/client.ts` using `next-sanity`. 

* **General Rule**: Use `useCdn: true` for client-side fetches or where minor caching delay is acceptable. Use `useCdn: false` for server-side fetches that require fresh data (e.g. `generateStaticParams`).

---

## 3. Data Fetching & Live Content API

We use **Live Content API (`defineLive`)** to automate caching, revalidation, and live preview updates (Visual Editing).

### A. How to Fetch Data (Server Components)

Use the generated `sanityFetch` helper instead of raw client calls:

```typescript
import { sanityFetch } from "@/sanity/lib/live";
import { defineQuery } from "next-sanity";

// Define queries using defineQuery for TypeScript type generation support
const BULBS_QUERY = defineQuery(
  `*[_type == "bulb" && defined(slug.current)] | order(_createdAt desc)`
);

export default async function Page() {
  const bulbs = await sanityFetch({ query: BULBS_QUERY });

  return (
    <div>
      {bulbs.map((bulb) => (
        <h2 key={bulb._id}>{bulb.name}</h2>
      ))}
    </div>
  );
}
```

### B. Live Updates setup
`<SanityLive />` is rendered in your root layout (`web/src/app/layout.tsx`). It opens a real-time connection to Sanity when Draft Mode is active, allowing preview changes to display instantly without refreshing.

---

## 4. Visual Editing & Stega Clean

Sanity injects invisible metadata (stega) into strings so authors can click components in the preview to edit them directly in Sanity Studio.

### The Golden Rule of Stega:
If a text field from Sanity is used for CSS classes, conditional logic, IDs, or redirects, you **must** clean it first. Otherwise, the invisible characters will cause comparisons to fail.

```typescript
import { stegaClean } from "@sanity/client/stega";

export function BulbCard({ alignment }) {
  // ❌ Bad: Will fail when previewing in Studio
  // const isLeft = alignment === 'left';

  // ✅ Good: Clean the string first
  const cleanAlign = stegaClean(alignment);
  const isLeft = cleanAlign === 'left';

  return <div className={isLeft ? 'text-left' : 'text-center'} />;
}
```

### Metadata and SEO:
Always disable stega for SEO titles and description queries so invisible characters don't leak into your `<head>` tags:
```typescript
const seoData = await client.fetch(SEO_QUERY, {}, { stega: false });
```

---

## 5. Rendering Rich Text (Portable Text)

Use the `<PortableText />` component from `next-sanity` to render rich text blocks:

```typescript
import { PortableText } from "next-sanity";

const components = {
  types: {
    image: ({ value }) => <img src={urlFor(value).url()} alt="" />,
  },
};

export function RichText({ value }) {
  return <PortableText value={value} components={components} />;
}
```

---

## 6. Rendering Images

Always use `@sanity/image-url` builder to generate optimized, responsive images.

```typescript
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/sanity/client";

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Usage in JSX
<img 
  src={urlFor(bulb.image).width(400).height(400).url()} 
  alt={bulb.name} 
/>
```
