import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { GhostPost } from '@/lib/ghost'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function InsightCard({ post }: { post: GhostPost }) {
  const tagLabel = post.tags?.[0]?.name ?? null

  return (
    <Link href={`/insights/${post.slug}`} className="group block">
      <article className="border border-white/10 hover:border-white/30 transition-all duration-300 overflow-hidden h-full">
        {post.feature_image ? (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-4 left-4">
              {tagLabel && (
                <span className="inline-block px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider">
                  {tagLabel}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="relative h-48 bg-gradient-to-br from-white/[0.03] to-white/[0.08] flex items-end">
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
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-3 font-mono">
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
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  )
}

export default function InsightsPreview({ posts }: { posts: GhostPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-20 border border-white/10">
        <p className="text-gray-400 text-lg font-serif">No insights yet</p>
        <p className="text-gray-600 mt-2 font-mono text-sm">
          Check back soon for updates
        </p>
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((post) => (
        <InsightCard key={post.id} post={post} />
      ))}
    </div>
  )
}
