import type { NextConfig } from 'next'

// Two deployment targets are supported:
//
//  NEXT_PUBLIC_DEPLOY_TARGET=static  → GitHub Pages (no server, no API routes)
//  (unset)                           → Vercel / any Node host (API routes work)
//
// Set NEXT_PUBLIC_BASE_PATH=/platform-map when deploying to a GitHub Pages
// project sub-path; leave empty for root domains (Vercel, custom domain).

const isStatic = process.env.NEXT_PUBLIC_DEPLOY_TARGET === 'static'

const nextConfig: NextConfig = {
  ...(isStatic && {
    output: 'export',
    trailingSlash: true,   // every route → /route/index.html  (no 404.html hack needed)
  }),
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  images: { unoptimized: true },
}

export default nextConfig
