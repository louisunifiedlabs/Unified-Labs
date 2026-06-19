'use client'

import { useLanguage } from '@/lib/language'
import { STORY_STATS } from '@/lib/stories'

export default function StoriesHero() {
  const { locale, t } = useLanguage()

  return (
    <section className="pt-36 pb-16 px-6 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
          {t('stories.badge')}
        </span>
        <h1 className="mt-5 text-5xl md:text-6xl font-serif font-bold leading-[1.05] max-w-3xl">
          {t('stories.title')}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
          {t('stories.subtitle')}
        </p>

        {/* Preview-only notice — remove once real stories are in place */}
        <div className="mt-8 inline-block px-4 py-2 border border-white/15 text-gray-400 text-xs">
          {t('stories.preview.note')}
        </div>

        {/* Aggregate trust bar — editorial serif numbers, no boxes */}
        <div className="mt-16 flex flex-wrap gap-x-16 gap-y-10">
          {STORY_STATS.map((stat) => (
            <div key={stat.label.en}>
              <div className="text-4xl md:text-5xl font-serif font-bold text-white">
                {stat.value}
              </div>
              <div className="mt-2 text-sm text-gray-500">{stat.label[locale]}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
