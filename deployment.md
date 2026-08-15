# Vercel Deployment Guide

This guide explains how to deploy both the Next.js frontend (`web`) and the standalone Sanity Studio (`studio`) from this monorepo to Vercel.

---

## Prerequisites

Before starting, ensure you have:
1. A **Vercel Account** connected to your Git provider (GitHub, GitLab, or Bitbucket).
2. The code pushed to a Git repository.
3. The Sanity Project ID (`vdlf8k9d`) and Dataset (`production`).

---

## 1. Deploying the Next.js App (`web`)

1. **Import the Project in Vercel**:
   - Go to your Vercel Dashboard and click **Add New > Project**.
   - Select your Git repository.
2. **Configure Project Settings**:
   - **Project Name**: `guru-bulbs-web` (or your preferred name)
   - **Framework Preset**: `Next.js`
   - **Root Directory**: Click *Edit* and select the `web` folder.
3. **Set Environment Variables**:
   Add the following environment variables under the **Environment Variables** section:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` = `vdlf8k9d`
   - `NEXT_PUBLIC_SANITY_DATASET` = `production`
   - *(Optional)* `SANITY_API_READ_TOKEN` = `<your_read_token>` (only needed if fetching drafts or using preview mode)
4. **Deploy**:
   - Click **Deploy**. Vercel will compile the Next.js application and generate a public URL (e.g., `https://guru-bulbs-web.vercel.app`).

---

## 2. Deploying the Standalone Sanity Studio (`studio`)

Sanity Studio is a Single Page Application (SPA). To prevent Vercel from returning `404 Not Found` errors when navigating to deep Studio links directly (e.g., `/structure`), we route all traffic to `index.html`.

### Step 2.1: Add `vercel.json` to the Studio folder
Create a `vercel.json` file inside the `studio/` folder with the following configuration:

```json
{
  "cleanUrls": true,
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### Step 2.2: Configure Vercel Project
1. **Import the Project in Vercel**:
   - Go to your Vercel Dashboard, click **Add New > Project**.
   - Select the same Git repository again.
2. **Configure Project Settings**:
   - **Project Name**: `guru-bulbs-studio` (or your preferred name)
   - **Framework Preset**: `Other` (or `Vite` if auto-detected)
   - **Root Directory**: Click *Edit* and select the `studio` folder.
   - **Build & Development Settings**:
     - Build Command: `npm run build` or `npx sanity build`
     - Output Directory: `dist`
3. **Set Environment Variables**:
   Add the following environment variables under the **Environment Variables** section if your Studio's configuration relies on them:
   - `SANITY_STUDIO_PROJECT_ID` = `vdlf8k9d`
   - `SANITY_STUDIO_DATASET` = `production`
4. **Deploy**:
   - Click **Deploy**. Vercel will compile the Studio and generate a public URL (e.g., `https://guru-bulbs-studio.vercel.app`).

---

## 3. Configuring Sanity CORS Origins (Crucial)

To allow the deployed Studio and Frontend to make API requests to Sanity, you must authorize their URLs:

1. Log in to [Sanity Manage](https://manage.sanity.io/) and select the project **`vdlf8k9d`**.
2. Navigate to the **API** tab.
3. Scroll to **CORS origins** and click **Add CORS origin**.
4. Add your **Next.js Web URL** (e.g., `https://guru-bulbs-web.vercel.app`):
   - **Allow credentials**: Unchecked (unless you need secure preview credentials).
5. Click **Add CORS origin** again and add your **Sanity Studio URL** (e.g., `https://guru-bulbs-studio.vercel.app`):
   - **Allow credentials**: **Checked** (Must be checked so users can authenticate/log in).
