'use client'

import { Layers, TrendingUp, Compass } from 'lucide-react'
import { useLanguage } from '@/lib/language'

const services = [
  { key: 'build', icon: Layers, offset: false },
  { key: 'yield', icon: TrendingUp, offset: true },
  { key: 'advisory', icon: Compass, offset: false },
] as const

export default function ServicesSection() {
  const { t } = useLanguage()

  return (
    <section id="services" className="relative z-10 py-32 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 md:mb-32 max-w-3xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-[0.2em]">
              {t('services.badge')}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
            {t('services.title')}
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 md:gap-12 pb-12 lg:pb-0">
          {services.map(({ key, icon: Icon, offset }) => (
            <div key={key} className={`group relative flex flex-col ${offset ? 'lg:translate-y-16' : ''}`}>
              <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 group-hover:from-cyan-500/10 to-transparent transition-all duration-700 rounded-2xl pointer-events-none" />
              <div className="relative p-8 md:p-10 h-full flex flex-col border border-white/5 rounded-2xl bg-white/[0.01] hover:border-cyan-500/30 transition-all duration-500">
                <div className="w-14 h-14 bg-black border border-white/10 rounded-xl flex items-center justify-center mb-8 group-hover:border-cyan-400/50 transition-colors duration-500">
                  <Icon className="w-6 h-6 text-white group-hover:text-cyan-400 transition-colors" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-white mb-4">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-gray-400 leading-relaxed mb-10">
                  {t(`services.${key}.desc`)}
                </p>
                <ul className="space-y-4 mt-auto">
                  {[1, 2, 3].map((i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500/40 mt-2.5 shrink-0 group-hover:bg-cyan-400 transition-colors" />
                      <span className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-300 transition-colors">
                        {t(`services.${key}.p${i}`)}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
