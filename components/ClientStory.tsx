'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Client, getRelatedClients } from '@/lib/clients'
import { useLanguage } from '@/lib/language'
import ClientTile from './ClientTile'

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">{label}</h2>
      <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light">{body}</p>
    </div>
  )
}

export default function ClientStory({ client }: { client: Client }) {
  const { locale, t } = useLanguage()
  const story = client.story!
  const related = getRelatedClients(client.slug)

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
          <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.22em] text-gray-500">
            <span>{client.tag[locale]}</span>
            <span className="h-px w-8 bg-white/20" />
            <span>{client.name}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold leading-[1.1]">
            {story.headline[locale]}
          </h1>
          <p className="mt-6 text-xl text-gray-400 leading-relaxed font-light">
            {story.summary[locale]}
          </p>
        </header>
      </div>

      {/* Visual band (placeholder) */}
      <div className="max-w-5xl mx-auto px-6">
        <div
          className="relative aspect-[21/9] flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${client.accent}26 0%, #0b0b0b 72%)`,
          }}
        >
          <span className="font-serif font-bold text-3xl md:text-5xl text-white/60">
            {client.name}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Narrative */}
        <div className="space-y-12 mt-14">
          <Section label={t('clients.challenge')} body={story.challenge[locale]} />
          <Section label={t('clients.solution')} body={story.solution[locale]} />
          <Section label={t('clients.results')} body={story.results[locale]} />
        </div>

        {/* Quote */}
        {story.quote && (
          <blockquote className="mt-14 border-l-2 border-white/30 pl-6 py-2">
            <p className="text-2xl md:text-3xl font-serif italic text-white leading-relaxed">
              “{story.quote.text[locale]}”
            </p>
            <footer className="mt-4 text-sm text-gray-500">
              {story.quote.author[locale]}
            </footer>
          </blockquote>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map((c) => (
              <ClientTile key={c.slug} client={c} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
