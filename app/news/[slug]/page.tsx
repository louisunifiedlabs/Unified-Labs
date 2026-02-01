import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Calendar, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

async function getNewsBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('post_type', 'news')
    .eq('is_published', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function NewsDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const news = await getNewsBySlug(params.slug)

  if (!news) {
    notFound()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

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
                {formatDate(news.created_at)}
              </span>
              <span className="px-2 py-0.5 border border-white/20 rounded">
                {news.category}
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
              {news.title}
            </h1>

            {news.summary && (
              <p className="text-lg text-gray-400 mt-6 leading-relaxed">
                {news.summary}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {news.cover_image && (
            <div className="relative h-64 md:h-96 overflow-hidden mb-12 border border-white/10">
              <Image
                src={news.cover_image}
                alt={news.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: news.content }}
          />

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
