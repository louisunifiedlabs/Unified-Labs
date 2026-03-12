import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  getPostBySlug,
  isGhostConfigured,
  DEMO_POSTS,
  GhostPost,
} from '@/lib/ghost'
import { Calendar, ArrowLeft, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const dynamic = 'force-dynamic'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function NewsDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const slug = decodeURIComponent(params.slug)

  let post: GhostPost | null = null

  if (isGhostConfigured()) {
    post = await getPostBySlug(slug)
  } else {
    post = DEMO_POSTS.find((p) => p.slug === slug) ?? null
  }

  if (!post) {
    notFound()
  }

  const tagLabel = post.tags?.[0]?.name ?? null

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      <article className="pt-32 pb-16">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Link */}
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to News
          </Link>

          {/* Header */}
          <header className="mb-12 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-mono uppercase tracking-wider">
              <span className="flex items-center gap-2">
                <Calendar className="w-3 h-3" />
                {formatDate(post.published_at)}
              </span>
              {post.reading_time > 0 && (
                <span className="flex items-center gap-2">
                  <Clock className="w-3 h-3" />
                  {post.reading_time} min read
                </span>
              )}
              {tagLabel && (
                <span className="px-2 py-0.5 border border-white/20 rounded">
                  {tagLabel}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
              {post.title}
            </h1>

            {post.excerpt && (
              <p className="text-lg text-gray-400 mt-6 leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {post.feature_image && (
            <div className="relative h-64 md:h-96 overflow-hidden mb-12 border border-white/10">
              <Image
                src={post.feature_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content — Ghost returns HTML */}
          {post.html && (
            <div
              className="prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.html }}
            />
          )}

          {/* Footer Navigation */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <Link
              href="/news"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-mono"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all news
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
