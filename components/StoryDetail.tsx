'use client'

import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { Story, getRelatedStories } from '@/lib/stories'
import { useLanguage } from '@/lib/language'
import StoryCard from './StoryCard'

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h2 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-4">{label}</h2>
      <p className="text-gray-200 text-lg md:text-xl leading-relaxed font-light">{body}</p>
    </div>
  )
}

export default function StoryDetail({ story }: { story: Story }) {
  const { locale, t } = useLanguage()
  const related = getRelatedStories(story.slug)

  return (
    <article className="pt-32 pb-16">
      <div className="max-w-3xl mx-auto px-6">
        {/* Back */}
        <Link
          href="/stories"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-10 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          {t('story.back')}
        </Link>

        {/* Header */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-6 text-[11px] uppercase tracking-[0.22em] text-gray-500">
            <span>{t(`story.cat.${story.category}`)}</span>
            <span className="h-px w-8 bg-white/20" />
            <span>{story.client}</span>
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
            background: `linear-gradient(160deg, ${story.accent}26 0%, #0b0b0b 72%)`,
          }}
        >
          <span className="font-serif font-bold text-3xl md:text-5xl text-white/60">
            {story.client}
          </span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6">
        {/* Metric row */}
        <div className="flex flex-wrap gap-x-12 gap-y-6 my-14 py-8 border-y border-white/10">
          {story.metrics.map((m) => (
            <div key={m.label.en}>
              <div className="text-3xl md:text-4xl font-serif font-bold text-white">
                {m.value}
              </div>
              <div className="mt-1 text-sm text-gray-500">{m.label[locale]}</div>
            </div>
          ))}
        </div>

        {/* Narrative */}
        <div className="space-y-12">
          <Section label={t('story.challenge')} body={story.challenge[locale]} />
          <Section label={t('story.solution')} body={story.solution[locale]} />
          <Section label={t('story.results')} body={story.results[locale]} />
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
            {t('stories.cta.title')}
          </h3>
          <p className="text-gray-400 max-w-md mx-auto mb-7 leading-relaxed">
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
        <div className="max-w-7xl mx-auto px-6 mt-28">
          <h2 className="text-2xl font-serif font-bold mb-10 border-b border-white/10 pb-6">
            {t('story.related')}
          </h2>
          <div className="grid md:grid-cols-3 gap-x-10 gap-y-12">
            {related.map((s) => (
              <StoryCard key={s.slug} story={s} />
            ))}
          </div>
        </div>
      )}
    </article>
  )
}
