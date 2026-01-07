import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { supabase, Post } from '@/lib/supabase'
import { Clock, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

async function getInsights() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('post_type', 'insight')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching insights:', error)
    return []
  }

  return data || []
}

// Featured Insight Card (大卡片，用于第一篇)
function FeaturedInsightCard({ post }: { post: Post }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <Link href={`/insights/${post.slug}`} className="group block">
      <article className="grid md:grid-cols-2 gap-8 md:gap-12 border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-6 md:p-10 hover:border-white/20 transition-all duration-500">
        {post.cover_image && (
          <div className="relative h-64 md:h-80 overflow-hidden">
            <Image
              src={post.cover_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        )}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 font-mono uppercase tracking-wider">
            <span className="px-2 py-1 border border-cyan-500/30 text-cyan-400 rounded">
              Featured
            </span>
            <span>{post.category}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-4 group-hover:text-gray-300 transition-colors leading-tight">
            {post.title}
          </h2>

          <p className="text-gray-400 text-lg leading-relaxed mb-6 line-clamp-3">
            {post.summary}
          </p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            {post.author && (
              <span className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </span>
            )}
            {post.read_time && (
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {post.read_time} min read
              </span>
            )}
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>
      </article>
    </Link>
  )
}

// Regular Insight Card
function InsightCard({ post }: { post: Post }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <Link href={`/insights/${post.slug}`} className="group block">
      <article className="border-b border-white/10 pb-8 hover:border-white/20 transition-colors">
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 font-mono uppercase tracking-wider">
          <span>{post.category}</span>
          <span>•</span>
          <span>{formatDate(post.created_at)}</span>
          {post.read_time && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.read_time} min
              </span>
            </>
          )}
        </div>

        <h3 className="text-xl md:text-2xl font-serif font-bold text-white mb-3 group-hover:text-gray-300 transition-colors">
          {post.title}
        </h3>

        <p className="text-gray-500 leading-relaxed mb-4 line-clamp-2">
          {post.summary}
        </p>

        <div className="flex items-center justify-between">
          {post.author && (
            <span className="text-sm text-gray-500 flex items-center gap-2">
              <User className="w-4 h-4" />
              {post.author}
            </span>
          )}
          <span className="flex items-center gap-2 text-xs text-gray-400 group-hover:text-white transition-colors uppercase tracking-widest">
            Read Article
            <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </article>
    </Link>
  )
}

export default async function InsightsPage() {
  const insights = await getInsights()
  const featured = insights[0]
  const rest = insights.slice(1)

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="inline-block px-3 py-1 border border-white/20 text-xs font-mono uppercase tracking-widest mb-6 text-gray-400">
            Research & Analysis
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6">
            Insights
          </h1>
          <p className="text-gray-400 text-xl max-w-2xl leading-relaxed">
            Deep dives into DeFi infrastructure, risk management, and the evolving landscape of institutional digital assets.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {insights.length > 0 ? (
            <>
              {/* Featured Article */}
              {featured && (
                <div className="mb-16">
                  <FeaturedInsightCard post={featured} />
                </div>
              )}

              {/* Rest of Articles */}
              {rest.length > 0 && (
                <div className="space-y-8">
                  <h2 className="text-sm font-mono uppercase tracking-widest text-gray-500 pb-4 border-b border-white/10">
                    All Insights
                  </h2>
                  <div className="space-y-8">
                    {rest.map((post) => (
                      <InsightCard key={post.id} post={post} />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-24 border border-white/10">
              <p className="text-gray-400 text-xl font-serif">No insights yet</p>
              <p className="text-gray-600 mt-2 font-mono text-sm">Check back soon for in-depth analysis</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
