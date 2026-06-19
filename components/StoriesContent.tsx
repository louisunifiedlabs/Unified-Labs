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
    <Link href={`/stories/${story.slug}`} className="group block">
      <div className="grid md:grid-cols-2 gap-8 md:gap-14 items-center">
        {/* Visual */}
        <div
          className="relative aspect-[4/3] overflow-hidden"
          style={{
            background: `linear-gradient(160deg, ${story.accent}26 0%, #0b0b0b 72%)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-serif text-3xl md:text-4xl text-white/60 group-hover:text-white/90 group-hover:scale-[1.03] transition-all duration-700">
              {story.client}
            </span>
          </div>
        </div>

        {/* Copy */}
        <div>
          <div className="flex items-center gap-4 mb-6 text-[11px] uppercase tracking-[0.22em] text-gray-500">
            <span>{t('stories.featured')}</span>
            <span className="h-px w-8 bg-white/20" />
            <span>{t(`story.cat.${story.category}`)}</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-serif font-bold leading-tight text-white group-hover:text-gray-200 transition-colors">
            {story.headline[locale]}
          </h2>
          <p className="mt-5 text-lg text-gray-400 leading-relaxed font-light">
            {story.summary[locale]}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-12 gap-y-6">
            {story.metrics.map((m) => (
              <div key={m.label.en}>
                <div className="text-3xl font-serif font-bold text-white">{m.value}</div>
                <div className="mt-1 text-sm text-gray-500">{m.label[locale]}</div>
              </div>
            ))}
          </div>

          <span className="mt-8 inline-flex items-center gap-2 text-sm text-white border-b border-white/30 pb-1 group-hover:border-white transition-colors">
            {t('stories.read')}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function StoriesContent() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState<StoryTabKey>('all')

  const stories = getStories()
  const featured = getFeaturedStory()

  // On "All", the featured story is the lead and is not repeated in the grid.
  const gridStories =
    activeTab === 'all'
      ? stories.filter((s) => s.slug !== featured?.slug)
      : stories.filter((s) => s.category === activeTab)

  return (
    <div className="max-w-7xl mx-auto px-6">
      {/* Featured lead (only on "All") */}
      {activeTab === 'all' && featured && (
        <section className="pt-16 pb-20 mb-16 border-b border-white/10">
          <FeaturedStory story={featured} />
        </section>
      )}

      {/* Filters */}
      <div className="flex flex-wrap gap-x-8 gap-y-3 mb-14">
        {STORY_CATEGORIES.map((key) => {
          const isActive = activeTab === key
          return (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`text-sm tracking-wide pb-1 border-b transition-colors ${
                isActive
                  ? 'text-white border-white'
                  : 'text-gray-500 border-transparent hover:text-gray-300'
              }`}
            >
              {t(`story.cat.${key}`)}
            </button>
          )
        })}
      </div>

      {/* Grid */}
      {gridStories.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-x-10 gap-y-16">
          {gridStories.map((story) => (
            <StoryCard key={story.slug} story={story} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24">
          <p className="text-gray-400 text-lg font-serif">{t('stories.empty')}</p>
        </div>
      )}

      {/* Logo wall */}
      <section className="mt-32 pt-16 border-t border-white/10">
        <p className="text-center text-sm text-gray-500 mb-12">{t('stories.trusted')}</p>
        <div className="flex flex-wrap items-center justify-center gap-x-14 gap-y-8">
          {stories.map((s) => (
            <span
              key={s.slug}
              className="font-serif text-lg text-gray-600 hover:text-white transition-colors"
            >
              {s.client}
            </span>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-32 text-center">
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
      </section>
    </div>
  )
}
