'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Story, getRelatedStories } from '@/lib/stories'
import { useLanguage } from '@/lib/language'
import StoryCard from './StoryCard'

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div className="border-t border-white/10 pt-8">
      <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em] mb-4">
        {label}
      </h2>
      <p className="text-gray-300 text-lg leading-relaxed">{body}</p>
    </div>
  )
}

export default function StoryDetail({ story }: { story: Story }) {
  const { locale, t } = useLanguage()
  const related = getRelatedStories(story.slug)

  return (
    <article className="pt-32 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 text-sm uppercase tracking-widest font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('story.back')}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <span className="px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider">
              {t(`story.cat.${story.category}`)}
            </span>
            <span className="font-mono text-sm text-gray-400">{story.client}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight">
            {story.headline[locale]}
          </h1>
          <p className="text-lg text-gray-400 mt-6 leading-relaxed">
            {story.summary[locale]}
          </p>
        </header>

        {/* Metric row */}
        <div className="grid grid-cols-3 gap-px mb-12 border border-white/10 bg-white/10">
          {story.metrics.map((m) => (
            <div key={m.label.en} className="bg-black p-5 md:p-6">
              <div className="text-2xl md:text-3xl font-serif font-bold text-cyan-400">
                {m.value}
              </div>
              <div className="mt-1.5 text-[10px] md:text-xs font-mono text-gray-500 uppercase tracking-wider leading-relaxed">
                {m.label[locale]}
              </div>
            </div>
          ))}
        </div>

        {/* Visual band (placeholder) */}
        <div
          className="relative h-48 md:h-64 mb-12 flex items-center justify-center overflow-hidden border border-white/10"
          style={{
            background: `linear-gradient(135deg, ${story.accent}2e 0%, ${story.accent}0a 60%, transparent 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="relative font-serif font-bold text-3xl md:text-4xl text-white/90">
            {story.client}
          </span>
        </div>

        {/* Narrative */}
        <div className="space-y-10">
          <Section label={t('story.challenge')} body={story.challenge[locale]} />
          <Section label={t('story.solution')} body={story.solution[locale]} />
          <Section label={t('story.results')} body={story.results[locale]} />
        </div>

        {/* Quote */}
        {story.quote && (
          <blockquote className="mt-12 border-l-2 border-cyan-400 pl-6 py-2">
            <p className="text-xl md:text-2xl font-serif italic text-white leading-relaxed">
              “{story.quote.text[locale]}”
            </p>
            <footer className="mt-4 text-sm font-mono text-gray-500 uppercase tracking-wider">
              {story.quote.author[locale]}
            </footer>
          </blockquote>
        )}

        {/* CTA */}
        <div className="mt-16 border border-white/10 bg-white/[0.02] px-6 py-12 text-center">
          <h3 className="text-2xl font-serif font-bold mb-3">{t('stories.cta.title')}</h3>
          <p className="text-gray-400 max-w-md mx-auto mb-6 text-sm leading-relaxed">
            {t('stories.cta.desc')}
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-7 py-3 bg-white text-black font-serif font-bold text-sm hover:bg-gray-200 transition-colors tracking-wide"
          >
            {t('stories.cta.button')}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 mt-24">
          <h2 className="text-2xl font-serif font-bold mb-8 border-b border-white/10 pb-6">
            {t('story.related')}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {related.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
