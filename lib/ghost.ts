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
  console.log('[Ghost] Fetching:', url.replace(GHOST_KEY, '***'))
  const res = await fetch(url, { next: { revalidate: 60 } })
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error(`[Ghost] API error: ${res.status} ${res.statusText}`, body)
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

// ── Clients showcase ───────────────────────────────────
// A "client" is any post tagged `client`. Tag each post with:
//   client + (en | zh) + a category tag (e.g. exchange, wallet, rwa)
// Card  = feature_image + category tag + title + excerpt
// Detail = the rendered post body (post.html)

export const CLIENT_TAG = 'client'

/** Fetch all client posts (both locales). Filter by locale in the UI. */
export async function getClientPosts(limit = 100): Promise<GhostPost[]> {
  return getPosts(CLIENT_TAG, limit)
}

/** The category tag for a client (excludes language + the `client` marker). */
export function getClientCategory(post: GhostPost): GhostTag | null {
  return (
    post.tags?.find(
      (t) => t.slug !== 'en' && t.slug !== 'zh' && t.slug !== CLIENT_TAG
    ) ?? null
  )
}

/** The locale slug (en/zh) a post is tagged with, if any. */
export function getPostLocale(post: GhostPost): string | null {
  return post.tags?.find((t) => t.slug === 'en' || t.slug === 'zh')?.slug ?? null
}

/** Whether a post is a client showcase entry. */
export function isClientPost(post: GhostPost): boolean {
  return post.tags?.some((t) => t.slug === CLIENT_TAG) ?? false
}


/**
 * Check if Ghost is configured (env vars present).
 */
export function isGhostConfigured(): boolean {
  const configured = Boolean(GHOST_URL && GHOST_KEY)
  console.log('[Ghost] configured:', configured, 'URL:', GHOST_URL ? GHOST_URL : '(empty)', 'KEY:', GHOST_KEY ? '***' : '(empty)')
  return configured
}

// ── Empty fallback when Ghost is not configured ─────────

export const DEMO_POSTS: GhostPost[] = []
