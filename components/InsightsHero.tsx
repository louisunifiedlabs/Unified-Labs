'use client'

import { useLanguage } from '@/lib/language'

export default function InsightsHero({ ghostConfigured }: { ghostConfigured: boolean }) {
  const { t } = useLanguage()

  return (
    <>
      <section className="pt-32 pb-12 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-xs font-mono text-gray-400 uppercase tracking-widest">
              {t('insights.badge')}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            {t('insights.title')}
          </h1>
          <p className="text-gray-400 mt-4 max-w-2xl text-lg leading-relaxed">
            {t('insights.subtitle')}
          </p>
        </div>
      </section>

      {!ghostConfigured && (
        <section className="px-6 pt-8">
          <div className="max-w-7xl mx-auto">
            <div className="px-4 py-3 border border-yellow-500/30 bg-yellow-500/5 text-yellow-400 text-xs font-mono">
              {t('insights.ghost.warning')}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
