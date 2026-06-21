'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { GhostPost } from '@/lib/ghost'
import { useLanguage } from '@/lib/language'
import ClientTile from './ClientTile'

export default function ClientsShowcase({
  posts,
  ghostConfigured,
}: {
  posts: GhostPost[]
  ghostConfigured: boolean
}) {
  const { locale, t } = useLanguage()

  // Show only the posts tagged with the current language (same as Insights).
  const clients = posts.filter((p) =>
    p.tags?.some((tag) => tag.slug === locale)
  )

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {clients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((post) => (
            <ClientTile key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-white/10">
          <p className="text-gray-400 text-lg font-serif">{t('clients.empty')}</p>
          <p className="text-gray-600 mt-2 text-sm max-w-md mx-auto">
            {ghostConfigured ? t('clients.empty.sub') : t('clients.empty.unconfigured')}
          </p>
        </div>
      )}

      {/* CTA */}
      <section className="mt-32 text-center border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {t('clients.cta.title')}
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          {t('clients.cta.desc')}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-serif font-bold text-sm hover:bg-gray-200 transition-colors tracking-wide"
        >
          {t('clients.cta.button')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
