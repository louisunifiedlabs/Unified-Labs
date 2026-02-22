import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import InsightsTabs from '@/components/InsightsTabs'
import { getPosts, isGhostConfigured, DEMO_POSTS, GhostPost } from '@/lib/ghost'

export const dynamic = 'force-dynamic'

export default async function InsightsPage() {
  let posts: GhostPost[] = []

  if (isGhostConfigured()) {
    try {
      posts = await getPosts()
    } catch (err) {
      console.error('Failed to fetch from Ghost:', err)
      posts = DEMO_POSTS
    }
  } else {
    // Ghost not configured — show demo data so you can preview the UI
    posts = DEMO_POSTS
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              Insights &amp; Research
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            Insights
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed">
            Research, market analysis, and news from the Unified Labs team.
          </p>
        </div>
      </section>

      {/* Tabs + Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {!isGhostConfigured() && (
            <div className="mb-8 px-4 py-3 border border-yellow-500/30 bg-yellow-500/5 text-yellow-400 text-xs font-mono">
              Ghost CMS not connected — showing demo data. Set NEXT_PUBLIC_GHOST_URL
              and NEXT_PUBLIC_GHOST_CONTENT_API_KEY in .env.local to connect.
            </div>
          )}
          <InsightsTabs posts={posts} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
