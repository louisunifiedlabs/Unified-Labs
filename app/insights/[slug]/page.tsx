import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { supabase } from '@/lib/supabase'
import { Clock, User, ArrowLeft, Calendar } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export const revalidate = 60

async function getInsightBySlug(slug: string) {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('post_type', 'insight')
    .eq('is_published', true)
    .single()

  if (error || !data) {
    return null
  }

  return data
}

export default async function InsightDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const insight = await getInsightBySlug(params.slug)

  if (!insight) {
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
        {/* Header */}
        <header className="max-w-4xl mx-auto px-6 mb-12">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-mono"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Insights
          </Link>

          <div className="flex items-center gap-4 text-xs text-gray-500 mb-6 font-mono uppercase tracking-wider">
            <span className="px-2 py-1 border border-white/20 rounded">
              {insight.category}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-3 h-3" />
              {formatDate(insight.created_at)}
            </span>
            {insight.read_time && (
              <span className="flex items-center gap-2">
                <Clock className="w-3 h-3" />
                {insight.read_time} min read
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-6xl font-serif font-bold leading-tight mb-8">
            {insight.title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8">
            {insight.summary}
          </p>

          {insight.author && (
            <div className="flex items-center gap-4 pt-8 border-t border-white/10">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-medium text-white">{insight.author}</div>
                <div className="text-sm text-gray-500">Unified Labs</div>
              </div>
            </div>
          )}
        </header>

        {/* Cover Image */}
        {insight.cover_image && (
          <div className="max-w-6xl mx-auto px-6 mb-16">
            <div className="relative h-64 md:h-[500px] overflow-hidden">
              <Image
                src={insight.cover_image}
                alt={insight.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-3xl mx-auto px-6">
          <div
            className="prose prose-lg prose-invert prose-headings:font-serif prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-cyan-400 prose-strong:text-white max-w-none"
            dangerouslySetInnerHTML={{ __html: insight.content }}
          />

          {/* Share & Navigation */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <div className="flex items-center justify-between">
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm uppercase tracking-widest font-mono"
              >
                <ArrowLeft className="w-4 h-4" />
                All Insights
              </Link>
            </div>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  )
}
