import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { getPostBySlug, urlFor, SanityPost } from '@/lib/sanity'
import { Calendar, ArrowLeft } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'

export const dynamic = 'force-dynamic'

const portableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) return null
      return (
        <div className="my-8">
          <Image
            src={urlFor(value).width(1200).url()}
            alt={value.caption || ''}
            width={1200}
            height={675}
            className="w-full rounded"
          />
          {value.caption && (
            <p className="text-center text-sm text-gray-500 mt-3">{value.caption}</p>
          )}
        </div>
      )
    },
  },
}

export default async function NewsDetailPage({
  params
}: {
  params: { slug: string }
}) {
  const decodedSlug = decodeURIComponent(params.slug)
  const post: SanityPost | null = await getPostBySlug(decodedSlug)

  if (!post) {
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
              {post.publishedAt && (
                <span className="flex items-center gap-2">
                  <Calendar className="w-3 h-3" />
                  {formatDate(post.publishedAt)}
                </span>
              )}
              {post.category && (
                <span className="px-2 py-0.5 border border-white/20 rounded">
                  {post.category}
                </span>
              )}
            </div>

            <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
              {post.title}
            </h1>

            {post.summary && (
              <p className="text-lg text-gray-400 mt-6 leading-relaxed">
                {post.summary}
              </p>
            )}
          </header>

          {/* Cover Image */}
          {post.coverImage && (
            <div className="relative h-64 md:h-96 overflow-hidden mb-12 border border-white/10">
              <Image
                src={urlFor(post.coverImage).width(1200).height(675).url()}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* Content */}
          {post.content && (
            <div className="prose prose-lg prose-invert max-w-none">
              <PortableText value={post.content} components={portableTextComponents} />
            </div>
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
