// Ghost Content API client
// Set these environment variables in .env.local:
//   NEXT_PUBLIC_GHOST_URL=https://your-ghost-site.com
//   NEXT_PUBLIC_GHOST_CONTENT_API_KEY=your-content-api-key

const GHOST_URL = process.env.NEXT_PUBLIC_GHOST_URL || ''
const GHOST_KEY = process.env.NEXT_PUBLIC_GHOST_CONTENT_API_KEY || ''

// ── Types ──────────────────────────────────────────────

export interface GhostTag {
  id: string
  name: string
  slug: string
}

export interface GhostAuthor {
  id: string
  name: string
  slug: string
  profile_image: string | null
}

export interface GhostPost {
  id: string
  uuid: string
  title: string
  slug: string
  html: string | null
  excerpt: string | null
  feature_image: string | null
  featured: boolean
  published_at: string
  updated_at: string
  tags: GhostTag[]
  authors: GhostAuthor[]
  reading_time: number
}

export interface GhostPaginatedResponse {
  posts: GhostPost[]
  meta: {
    pagination: {
      page: number
      limit: number
      pages: number
      total: number
    }
  }
}

// ── Tag → Tab mapping ──────────────────────────────────

export const INSIGHT_TABS = [
  { key: 'all', label: 'All' },
  { key: 'news-press', label: 'News & Press' },
  { key: 'research', label: 'Research' },
  { key: 'market-decoded', label: 'Market Decoded' },
  { key: 'events', label: 'Events' },
] as const

export type TabKey = (typeof INSIGHT_TABS)[number]['key']

// ── API helpers ────────────────────────────────────────

function ghostApi(resource: string, params: Record<string, string> = {}) {
  const url = new URL(`/ghost/api/content/${resource}/`, GHOST_URL)
  url.searchParams.set('key', GHOST_KEY)
  for (const [k, v] of Object.entries(params)) {
    url.searchParams.set(k, v)
  }
  return url.toString()
}

async function fetchGhost<T>(url: string): Promise<T> {
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) {
    throw new Error(`Ghost API error: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

// ── Public queries ─────────────────────────────────────

/**
 * Fetch posts, optionally filtered by tag slug and/or locale.
 * When locale is provided, only posts tagged with that locale (en/zh) are returned.
 */
export async function getPosts(
  tagSlug?: string,
  limit = 50,
  locale?: string
): Promise<GhostPost[]> {
  const params: Record<string, string> = {
    include: 'tags,authors',
    limit: String(limit),
    order: 'published_at desc',
  }
  const filters: string[] = []
  if (tagSlug && tagSlug !== 'all') {
    filters.push(`tag:${tagSlug}`)
  }
  if (locale) {
    filters.push(`tag:${locale}`)
  }
  if (filters.length > 0) {
    params.filter = filters.join('+')
  }
  const url = ghostApi('posts', params)
  const data = await fetchGhost<GhostPaginatedResponse>(url)
  return data.posts
}

/**
 * Fetch a single post by slug.
 */
export async function getPostBySlug(
  slug: string
): Promise<GhostPost | null> {
  const url = ghostApi(`posts/slug/${slug}`, {
    include: 'tags,authors',
  })
  try {
    const data = await fetchGhost<{ posts: GhostPost[] }>(url)
    return data.posts[0] ?? null
  } catch {
    return null
  }
}

/**
 * Fetch the N most recent posts (for homepage preview).
 */
export async function getRecentPosts(limit = 6): Promise<GhostPost[]> {
  return getPosts(undefined, limit)
}

/**
 * Check if Ghost is configured (env vars present).
 */
export function isGhostConfigured(): boolean {
  return Boolean(GHOST_URL && GHOST_KEY)
}

// ── Empty fallback when Ghost is not configured ─────────

export const DEMO_POSTS: GhostPost[] = []
