import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ArrowRight } from 'lucide-react'
import { urlFor, SanityPost } from '@/lib/sanity'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function NewsCard({ post, featured = false }: { post: SanityPost; featured?: boolean }) {
  if (featured) {
    return (
      <Link href={`/news/${post.slug.current}`} className="group block">
        <article className="border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden h-full">
          {post.image && (
            <div className="relative h-48 overflow-hidden">
              <Image
                src={urlFor(post.image).width(800).height(500).url()}
                alt={post.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                {post.category && (
                  <span className="inline-block px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider">
                    {post.category}
                  </span>
                )}
              </div>
            </div>
          )}
          <div className="p-5">
            {post.publishedAt && (
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-mono">
                <Calendar className="w-3 h-3" />
                {formatDate(post.publishedAt)}
              </div>
            )}
            <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
              {post.summary}
            </p>
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={`/news/${post.slug.current}`} className="group block">
      <article className="flex gap-4 py-5 border-b border-white/5 hover:border-white/20 transition-colors">
        <div className="flex-1">
          <div className="flex items-center gap-3 text-[10px] text-gray-500 mb-2 font-mono uppercase tracking-wider">
            {post.category && <span className="text-cyan-400">{post.category}</span>}
            {post.category && post.publishedAt && <span>•</span>}
            {post.publishedAt && <span>{formatDate(post.publishedAt)}</span>}
          </div>
          <h3 className="text-base font-medium text-white group-hover:text-gray-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-white group-hover:translate-x-1 transition-all mt-3 flex-shrink-0" />
      </article>
    </Link>
  )
}

export default function NewsPreview({ posts }: { posts: SanityPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 border border-white/10">
        <p className="text-gray-400 text-lg font-serif">No news yet</p>
        <p className="text-gray-600 mt-2 font-mono text-sm">Check back soon for updates</p>
      </div>
    )
  }

  const featured = posts.slice(0, 3)
  const recent = posts.slice(3, 6)

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="grid md:grid-cols-2 gap-4">
          {featured.map((post) => (
            <NewsCard key={post._id} post={post} featured />
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 pb-3 mb-2 border-b border-white/10">
          Recent
        </h3>
        <div>
          {recent.length > 0 ? (
            recent.map((post) => (
              <NewsCard key={post._id} post={post} />
            ))
          ) : (
            featured.map((post) => (
              <NewsCard key={post._id} post={post} />
            ))
          )}
        </div>
      </div>
    </div>
  )
}
