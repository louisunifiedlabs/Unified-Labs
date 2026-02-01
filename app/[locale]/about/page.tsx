'use client'

import { useTranslations } from 'next-intl'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Target, Eye, Sparkles, Shield, Handshake } from 'lucide-react'

export default function AboutPage() {
  const t = useTranslations('about')

  const values = [
    {
      title: t('rigorTitle'),
      description: t('rigorDesc'),
      icon: Shield
    },
    {
      title: t('trustTitle'),
      description: t('trustDesc'),
      icon: Handshake
    },
    {
      title: t('expertiseTitle'),
      description: t('expertiseDesc'),
      icon: Sparkles
    }
  ]

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold">
                {t('title')}
              </h1>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{t('purposeLabel')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight mb-6">
                {t('purpose')}
              </h2>
              <div className="flex items-center gap-3 mb-6 mt-12">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{t('visionLabel')}</span>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">
                {t('vision')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="w-12 h-1 bg-cyan-400 mb-6"></div>
            <h2 className="text-xs font-mono text-white uppercase tracking-[0.2em]">
              {t('valuesLabel')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            {t('ctaTitle')}
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            {t('ctaDesc')}
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            {t('ctaButton')}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
