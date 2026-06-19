'use client'

import { useLanguage } from '@/lib/language'

export default function ClientsHero() {
  const { t } = useLanguage()

  return (
    <section className="pt-36 pb-16 px-6 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        <span className="text-[11px] uppercase tracking-[0.25em] text-gray-500">
          {t('clients.badge')}
        </span>
        <h1 className="mt-5 text-5xl md:text-6xl font-serif font-bold leading-[1.05] max-w-4xl">
          {t('clients.title')}
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-2xl leading-relaxed font-light">
          {t('clients.subtitle')}
        </p>
      </div>
    </section>
  )
}
