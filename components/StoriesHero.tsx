'use client'

import { useLanguage } from '@/lib/language'
import { STORY_STATS } from '@/lib/stories'

export default function StoriesHero() {
  const { locale, t } = useLanguage()

  return (
    <section className="pt-32 pb-12 px-6 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
            {t('stories.badge')}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-serif font-bold">
          {t('stories.title')}
        </h1>
        <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed">
          {t('stories.subtitle')}
        </p>

        {/* Preview-only notice — remove once real stories are in place */}
        <div className="mt-8 px-4 py-3 border border-yellow-500/30 bg-yellow-500/5 text-yellow-400 text-xs font-mono">
          {t('stories.preview.note')}
        </div>

        {/* Aggregate trust bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px mt-12 border border-white/10 bg-white/10">
          {STORY_STATS.map((stat) => (
            <div key={stat.label.en} className="bg-black p-6">
              <div className="text-3xl md:text-4xl font-serif font-bold text-cyan-400">
                {stat.value}
              </div>
              <div className="mt-2 text-xs font-mono text-gray-500 uppercase tracking-wider leading-relaxed">
                {stat.label[locale]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
