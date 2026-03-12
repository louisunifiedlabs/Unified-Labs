import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getPosts, isGhostConfigured, DEMO_POSTS, GhostPost } from '@/lib/ghost'
import { Calendar, ArrowRight, Clock } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const dynamic = 'force-dynamic'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function getCategoryTag(post: GhostPost): string | null {
  if (!post.tags || post.tags.length === 0) return null
  const tag = post.tags.find((t) => t.slug !== 'en' && t.slug !== 'zh')
  return tag?.name ?? null
}

function NewsItem({ post, featured = false }: { post: GhostPost; featured?: boolean }) {
  const tagLabel = getCategoryTag(post)

  if (featured) {
    return (
      <Link href={`/news/${post.slug}`} className="group block">
        <article className="border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
          {post.feature_image ? (
            <div className="relative h-48 md:h-64 overflow-hidden">
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                {tagLabel && (
                  <span className="inline-block px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider mb-2">
                    {tagLabel}
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="relative h-48 md:h-64 bg-gradient-to-br from-white/[0.03] to-white/[0.08] flex items-end">
              <div className="p-4">
                {tagLabel && (
                  <span className="inline-block px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider">
                    {tagLabel}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="p-5">
            <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 font-mono">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3" />
                {formatDate(post.published_at)}
              </span>
              {post.reading_time > 0 && (
                <>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" />
                    {post.reading_time} min
                  </span>
                </>
              )}
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/news/${post.slug}`} className="group block">
      <article className="flex gap-4 py-4 border-b border-white/5 hover:border-white/20 transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-1 font-mono uppercase tracking-wider">
            {tagLabel && <span>{tagLabel}</span>}
            {tagLabel && post.published_at && <span>·</span>}
            <span>{formatDate(post.published_at)}</span>
          </div>
          <h3 className="text-base font-medium text-white group-hover:text-gray-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all mt-4 flex-shrink-0" />
      </article>
    </Link>
  )
}

export default async function NewsPage() {
  let posts: GhostPost[] = []

  if (isGhostConfigured()) {
    try {
      posts = await getPosts()
    } catch {
      posts = DEMO_POSTS
    }
  } else {
    posts = DEMO_POSTS
  }

  const featured = posts.slice(0, 3)
  const rest = posts.slice(3)

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* Hero Section - Compact */}
      <section className="pt-32 pb-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">Latest Updates</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            News
          </h1>
        </div>
      </section>

      {/* News Content */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {posts.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 pb-3 mb-6 border-b border-white/10">
                  Featured
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {featured.map((post) => (
                    <NewsItem key={post.id} post={post} featured />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-gray-500 pb-3 mb-6 border-b border-white/10">
                  Recent
                </h2>
                <div className="space-y-0">
                  {rest.length > 0 ? (
                    rest.map((post) => (
                      <NewsItem key={post.id} post={post} />
                    ))
                  ) : (
                    featured.slice(0, 5).map((post) => (
                      <NewsItem key={post.id} post={post} />
                    ))
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-24 border border-white/10">
              <p className="text-gray-400 text-lg font-serif">No news yet</p>
              <p className="text-gray-600 mt-2 font-mono text-sm">Check back soon for updates</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
