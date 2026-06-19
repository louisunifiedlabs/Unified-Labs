'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { GhostPost, getClientCategory } from '@/lib/ghost'
import { useLanguage } from '@/lib/language'
import ClientTile from './ClientTile'

export default function ClientArticle({
  post,
  related,
}: {
  post: GhostPost
  related: GhostPost[]
}) {
  const { t } = useLanguage()
  const category = getClientCategory(post)

  return (
    <article className="pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/clients"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('clients.back')}
        </Link>

        {/* Header */}
        <header className="mb-10">
          {category && (
            <div className="text-[11px] uppercase tracking-[0.22em] text-gray-500 mb-6">
              {category.name}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-[1.1]">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="mt-6 text-xl text-gray-400 leading-relaxed font-light">
              {post.excerpt}
            </p>
          )}
        </header>
      </div>

      {/* Feature image */}
      {post.feature_image && (
        <div className="max-w-5xl mx-auto px-6 mb-12">
          <div className="relative aspect-[21/9] overflow-hidden border border-white/10">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6">
        {/* Body — Ghost returns HTML */}
        {post.html && (
          <div
            className="prose prose-lg prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        )}

        {/* CTA */}
        <div className="mt-16 text-center border-t border-white/10 pt-16">
          <h3 className="text-2xl md:text-3xl font-serif font-bold mb-3">
            {t('clients.cta.title')}
          </h3>
          <p className="text-gray-400 max-w-md mx-auto mb-7 leading-relaxed">
            {t('clients.cta.desc')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-serif font-bold text-sm hover:bg-gray-200 transition-colors tracking-wide"
          >
            {t('clients.cta.button')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-28">
          <h2 className="text-2xl font-serif font-bold mb-10 border-b border-white/10 pb-6">
            {t('clients.related')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => (
              <ClientTile key={p.id} post={p} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
