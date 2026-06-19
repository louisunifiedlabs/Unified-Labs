'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import {
  getStories,
  getFeaturedStory,
  STORY_CATEGORIES,
  StoryTabKey,
  Story,
} from '@/lib/stories'
import { useLanguage } from '@/lib/language'
import StoryCard from './StoryCard'

function FeaturedStory({ story }: { story: Story }) {
  const { locale, t } = useLanguage()

  return (
    <Link href={`/stories/${story.slug}`} className="group block mb-16">
      <article className="grid md:grid-cols-2 border border-white/10 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden">
        {/* Visual */}
        <div
          className="relative min-h-[220px] md:min-h-[340px] flex items-center justify-center overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${story.accent}2e 0%, ${story.accent}0a 60%, transparent 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <span className="relative font-serif font-bold text-3xl md:text-4xl text-white/90 group-hover:scale-105 transition-transform duration-500">
            {story.client}
          </span>
        </div>

        {/* Copy */}
        <div className="p-8 md:p-10 flex flex-col">
          <div className="flex items-center gap-3 mb-5">
            <span className="px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider">
              {t(`story.cat.${story.category}`)}
            </span>
            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.2em]">
              {t('stories.featured')}
            </span>
          </div>

          <h2 className="text-2xl md:text-3xl font-serif font-bold leading-tight mb-4 group-hover:text-gray-200 transition-colors">
            {story.headline[locale]}
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            {story.summary[locale]}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {story.metrics.map((m) => (
              <span
                key={m.label.en}
                className="px-3 py-1.5 border border-white/10 text-sm font-mono"
              >
                <span className="text-cyan-400">{m.value}</span>{' '}
                <span className="text-gray-500">{m.label[locale]}</span>
              </span>
            ))}
          </div>

          <span className="mt-auto inline-flex items-center gap-2 text-sm text-gray-300 group-hover:text-white transition-colors font-mono uppercase tracking-wider">
            {t('stories.read')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </article>
    </Link>
  )
}

export default function StoriesContent() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<StoryTabKey>('all')

  const stories = getStories()
  const featured = getFeaturedStory()

  const filtered =
    activeTab === 'all'
      ? stories
      : stories.filter((s) => s.category === activeTab)

  return (
    <>
      {/* Featured */}
      <section className="px-6 pt-12">
        <div className="max-w-7xl mx-auto">
          {featured && <FeaturedStory story={featured} />}
        </div>
      </section>

      {/* Filter tabs + grid */}
      <section className="px-6">
        <div className="max-w-7xl mx-auto">
          <div className="border-b border-white/10 mb-10 overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {STORY_CATEGORIES.map((key) => {
                const count =
                  key === 'all'
                    ? stories.length
                    : stories.filter((s) => s.category === key).length
                const isActive = activeTab === key

                return (
                  <button
                    key={key}
                    onClick={() => setActiveTab(key)}
                    className={`relative px-5 py-3 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                      isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    {t(`story.cat.${key}`)}
                    <span className={`ml-2 ${isActive ? 'text-gray-400' : 'text-gray-600'}`}>
                      {count}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>

          {filtered.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((story) => (
                <StoryCard key={story.slug} story={story} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 border border-white/10">
              <p className="text-gray-400 text-lg font-serif">{t('stories.empty')}</p>
            </div>
          )}
        </div>
      </section>

      {/* Logo wall */}
      <section className="px-6 mt-28">
        <div className="max-w-7xl mx-auto border-t border-white/10 pt-16">
          <p className="text-center text-xs font-mono text-gray-500 uppercase tracking-[0.2em] mb-10">
            {t('stories.trusted')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/10 border border-white/10">
            {stories.map((s) => (
              <div
                key={s.slug}
                className="bg-black h-24 flex items-center justify-center"
              >
                <span className="font-serif font-bold text-base text-gray-500 hover:text-white transition-colors">
                  {s.client}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 mt-28">
        <div className="max-w-7xl mx-auto">
          <div className="border border-white/10 bg-white/[0.02] px-8 py-16 md:py-20 text-center">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              {t('stories.cta.title')}
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
              {t('stories.cta.desc')}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-serif font-bold text-sm hover:bg-gray-200 transition-colors tracking-wide"
            >
              {t('stories.cta.button')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
