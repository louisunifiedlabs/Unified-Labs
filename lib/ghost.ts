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
 * Fetch posts, optionally filtered by tag slug.
 */
export async function getPosts(
  tagSlug?: string,
  limit = 50
): Promise<GhostPost[]> {
  const params: Record<string, string> = {
    include: 'tags,authors',
    limit: String(limit),
    order: 'published_at desc',
  }
  if (tagSlug && tagSlug !== 'all') {
    params.filter = `tag:${tagSlug}`
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

// ── Demo / placeholder data ────────────────────────────
// Used when Ghost is not yet connected so you can preview the UI.

export const DEMO_POSTS: GhostPost[] = [
  {
    id: 'demo-1',
    uuid: 'demo-1',
    title: 'Unified Labs Closes $12M Series A to Scale Institutional DeFi Infrastructure',
    slug: 'series-a-funding',
    html: '<p>Unified Labs announced today that it has closed a $12 million Series A funding round led by Paradigm, with participation from Coinbase Ventures and a16z crypto.</p>',
    excerpt: 'Unified Labs announced today that it has closed a $12 million Series A funding round led by Paradigm.',
    feature_image: null,
    featured: true,
    published_at: '2026-02-20T09:00:00.000Z',
    updated_at: '2026-02-20T09:00:00.000Z',
    tags: [{ id: 't1', name: 'News & Press', slug: 'news-press' }],
    authors: [{ id: 'a1', name: 'Unified Labs', slug: 'unified-labs', profile_image: null }],
    reading_time: 4,
  },
  {
    id: 'demo-2',
    uuid: 'demo-2',
    title: 'Understanding Restaking Risk: A Quantitative Framework for AVS Selection',
    slug: 'restaking-risk-framework',
    html: '<p>A deep dive into the quantitative risk models used to evaluate Active Validator Services in the restaking ecosystem.</p>',
    excerpt: 'A deep dive into the quantitative risk models used to evaluate Active Validator Services in the restaking ecosystem.',
    feature_image: null,
    featured: true,
    published_at: '2026-02-18T14:00:00.000Z',
    updated_at: '2026-02-18T14:00:00.000Z',
    tags: [{ id: 't2', name: 'Research', slug: 'research' }],
    authors: [{ id: 'a1', name: 'Unified Labs', slug: 'unified-labs', profile_image: null }],
    reading_time: 12,
  },
  {
    id: 'demo-3',
    uuid: 'demo-3',
    title: 'ETH Staking Yields Compress as Institutional Demand Surges — What It Means',
    slug: 'eth-staking-yields-compress',
    html: '<p>Ethereum staking yields have compressed to historic lows. We break down the drivers and implications for institutional allocators.</p>',
    excerpt: 'Ethereum staking yields have compressed to historic lows. We break down the drivers and implications for institutional allocators.',
    feature_image: null,
    featured: false,
    published_at: '2026-02-15T10:00:00.000Z',
    updated_at: '2026-02-15T10:00:00.000Z',
    tags: [{ id: 't3', name: 'Market Decoded', slug: 'market-decoded' }],
    authors: [{ id: 'a1', name: 'Unified Labs', slug: 'unified-labs', profile_image: null }],
    reading_time: 7,
  },
  {
    id: 'demo-4',
    uuid: 'demo-4',
    title: 'Unified Labs Partners with Lido to Enhance Institutional Staking Solutions',
    slug: 'lido-partnership',
    html: '<p>We are excited to announce a strategic partnership with Lido Finance to deliver enhanced institutional-grade staking infrastructure.</p>',
    excerpt: 'We are excited to announce a strategic partnership with Lido Finance to deliver enhanced institutional-grade staking infrastructure.',
    feature_image: null,
    featured: false,
    published_at: '2026-02-12T08:00:00.000Z',
    updated_at: '2026-02-12T08:00:00.000Z',
    tags: [{ id: 't1', name: 'News & Press', slug: 'news-press' }],
    authors: [{ id: 'a1', name: 'Unified Labs', slug: 'unified-labs', profile_image: null }],
    reading_time: 3,
  },
  {
    id: 'demo-5',
    uuid: 'demo-5',
    title: 'Token2049 Dubai Recap: Key Takeaways on Institutional DeFi Adoption',
    slug: 'token2049-dubai-recap',
    html: '<p>Our team attended Token2049 Dubai. Here are the key insights on institutional adoption trends from the conference floor.</p>',
    excerpt: 'Our team attended Token2049 Dubai. Here are the key insights on institutional adoption trends from the conference floor.',
    feature_image: null,
    featured: false,
    published_at: '2026-02-10T16:00:00.000Z',
    updated_at: '2026-02-10T16:00:00.000Z',
    tags: [{ id: 't4', name: 'Events', slug: 'events' }],
    authors: [{ id: 'a1', name: 'Unified Labs', slug: 'unified-labs', profile_image: null }],
    reading_time: 6,
  },
  {
    id: 'demo-6',
    uuid: 'demo-6',
    title: 'The Basis Trade Unwind: Real-Time Analysis of the March Deleveraging Event',
    slug: 'basis-trade-unwind-march',
    html: '<p>An in-depth analysis of the March 2026 basis trade deleveraging event and its ripple effects across DeFi lending markets.</p>',
    excerpt: 'An in-depth analysis of the March 2026 basis trade deleveraging event and its ripple effects across DeFi lending markets.',
    feature_image: null,
    featured: false,
    published_at: '2026-02-08T11:00:00.000Z',
    updated_at: '2026-02-08T11:00:00.000Z',
    tags: [{ id: 't3', name: 'Market Decoded', slug: 'market-decoded' }],
    authors: [{ id: 'a1', name: 'Unified Labs', slug: 'unified-labs', profile_image: null }],
    reading_time: 9,
  },
  {
    id: 'demo-7',
    uuid: 'demo-7',
    title: 'Liquidity Fragmentation in L2 DeFi: Risks and Mitigation Strategies',
    slug: 'l2-liquidity-fragmentation',
    html: '<p>As activity migrates to Layer 2 networks, liquidity fragmentation poses new challenges for institutional participants.</p>',
    excerpt: 'As activity migrates to Layer 2 networks, liquidity fragmentation poses new challenges for institutional participants.',
    feature_image: null,
    featured: false,
    published_at: '2026-02-05T13:00:00.000Z',
    updated_at: '2026-02-05T13:00:00.000Z',
    tags: [{ id: 't2', name: 'Research', slug: 'research' }],
    authors: [{ id: 'a1', name: 'Unified Labs', slug: 'unified-labs', profile_image: null }],
    reading_time: 15,
  },
  {
    id: 'demo-8',
    uuid: 'demo-8',
    title: 'Speaking at ETHDenver 2026: Building Risk Infrastructure for Institutional DeFi',
    slug: 'ethdenver-2026-speaking',
    html: '<p>Join our CTO at ETHDenver 2026 for a talk on building robust risk infrastructure for institutional DeFi participants.</p>',
    excerpt: 'Join our CTO at ETHDenver 2026 for a talk on building robust risk infrastructure for institutional DeFi participants.',
    feature_image: null,
    featured: false,
    published_at: '2026-02-01T09:00:00.000Z',
    updated_at: '2026-02-01T09:00:00.000Z',
    tags: [{ id: 't4', name: 'Events', slug: 'events' }],
    authors: [{ id: 'a1', name: 'Unified Labs', slug: 'unified-labs', profile_image: null }],
    reading_time: 2,
  },
]
