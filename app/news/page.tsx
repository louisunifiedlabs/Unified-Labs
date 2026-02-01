import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { supabase, Post } from '@/lib/supabase'
import { Calendar, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export const revalidate = 60

async function getNews() {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('post_type', 'news')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data || []
}

// Compact News Item
function NewsItem({ post, featured = false }: { post: Post; featured?: boolean }) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (featured) {
    return (
      <Link href={`/news/${post.slug}`} className="group block">
        <article className="border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
          {post.cover_image && (
            <div className="relative h-48 md:h-64 overflow-hidden">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4">
                <span className="inline-block px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider mb-2">
                  {post.category}
                </span>
              </div>
            </div>
          )}
          <div className="p-5">
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2 font-mono">
              <Calendar className="w-3 h-3" />
              {formatDate(post.created_at)}
            </div>
            <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2">
              {post.summary}
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
            <span>{post.category}</span>
            <span>•</span>
            <span>{formatDate(post.created_at)}</span>
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
  const news = await getNews()
  const featured = news.slice(0, 3)
  const rest = news.slice(3)

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
          {news.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Featured News (Left Column) */}
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

              {/* Recent News (Right Column) */}
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
