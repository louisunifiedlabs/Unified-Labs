'use client'

import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import Logo from './Logo'

export default function Footer() {
  const t = useTranslations('footer')

  return (
    <footer className="relative z-10 bg-black text-white pt-32 pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-8 text-gray-400 leading-relaxed text-sm font-light">
              {t('tagline')}
            </p>
          </div>

          <div className="flex gap-24">
            <div>
              <h4 className="font-serif font-bold text-lg mb-8">{t('business')}</h4>
              <ul className="space-y-5 text-gray-500 text-sm font-medium tracking-wide">
                <li><Link href="/#services" className="hover:text-white transition-colors">{t('riskCurator')}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-8">{t('connect')}</h4>
              <ul className="space-y-5 text-gray-500 text-sm font-medium tracking-wide">
                <li><a href="https://x.com/unifiedlabs_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">{t('twitterX')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t('linkedin')}</a></li>
                <li><Link href="/news" className="hover:text-white transition-colors">{t('news')}</Link></li>
                <li><Link href="/insights" className="hover:text-white transition-colors">{t('insights')}</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10 text-[10px] md:text-xs text-gray-600 font-mono uppercase tracking-[0.1em]">
          <div>{t('copyright')}</div>
          <div className="mt-4 md:mt-0">{t('locations')}</div>
        </div>
      </div>
    </footer>
  )
}
