# Studio Developer Guide

This guide is for backend and content schema developers working on Sanity Studio (`studio/`).

---

## 1. Local Environment Setup

To run the standalone Sanity Studio locally:

```bash
cd studio
npm install
npm run dev
```
The Studio will run on Vite at [http://localhost:3333](http://localhost:3333).

---

## 2. Folder Structure

Here is the directory structure for the standalone Sanity Studio:

```
studio/
├── schemaTypes/         # Content type schema definitions
│   ├── index.ts         # Registers and exports all schemas
│   └── bulb.ts          # Individual schema definition for the 'bulb' document
├── static/              # Static assets for the Studio (favicons, logos, etc.)
├── sanity.config.ts     # Main config file (registers plugins, schemas, project/dataset)
├── sanity.cli.ts        # CLI config (specifies project ID and auto-updates)
├── package.json         # Package configuration and development scripts
├── tsconfig.json        # TypeScript configuration
└── eslint.config.mjs    # ESLint configuration
```

---

## 3. Configuration Files

* **`sanity.config.ts`**: The main configuration file where you declare plugins, projects, datasets, and schemas.
* **`sanity.cli.ts`**: Configures CLI behavior (e.g. Project ID, Dataset, and auto-updates setting).

---

## 3. Schema Design Best Practices

Define schemas in the `schemaTypes/` directory.

### A. Document Example (`studio/schemaTypes/bulb.ts`)

Use `defineType` and `defineField` to enforce type safety and provide descriptive titles for content creators.

```typescript
import { defineType, defineField } from 'sanity'

export const bulb = defineType({
  name: 'bulb',
  title: 'Bulb',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true, // Enables visual cropping in the Studio
      },
    }),
    defineField({
      name: 'price',
      title: 'Price ($)',
      type: 'number',
      validation: (Rule) => Rule.positive(),
    }),
  ],
})
```

### B. Registering Schemas (`studio/schemaTypes/index.ts`)

Import your schema and add it to the `schemaTypes` array:

```typescript
import { bulb } from './bulb'

export const schemaTypes = [bulb]
```

---

## 4. Deploying Schemas (Crucial for Client & MCP)

Whenever you add or modify a schema field, you **must** deploy your schema changes to the Sanity Content Lake. If you don't do this, Sanity's API client (and AI/MCP servers) won't see the new document types or fields.

Run this command inside the `studio/` directory:
```bash
npx sanity schema deploy
```

---

## 5. Local CORS Setup

To allow your local Next.js frontend (running at `http://localhost:3000`) to communicate with Sanity's APIs, you must authorize the origin.

Run this command inside the `studio/` directory:
```bash
npx sanity cors add http://localhost:3000 --credentials
```

Alternatively, configure this in the [Sanity Manage Portal](https://manage.sanity.io/) under the **API** tab.

---

## 6. Hosting Deployments

* **Sanity Hosting**: Run `npx sanity deploy` inside `studio/` to host the Studio on Sanity's global CDN (e.g. `your-project.sanity.studio`).
* **Vercel Hosting**: Refer to [deployment.md](file:///Users/nishanrana/guru-bulbs/deployment.md) for hosting the Studio on Vercel as a static SPA.
