import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import InsightsTabs from '@/components/InsightsTabs'
import InsightsHero from '@/components/InsightsHero'
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
      <InsightsHero ghostConfigured={isGhostConfigured()} />

      {/* Tabs + Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <InsightsTabs posts={posts} />
        </div>
      </section>

      <Footer />
    </div>
  )
}
