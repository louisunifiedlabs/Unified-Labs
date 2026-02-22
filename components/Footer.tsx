'use client'

import Link from 'next/link'
import Logo from './Logo'
import { useLanguage } from '@/lib/language'

export default function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="relative z-10 bg-black text-white pt-32 pb-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-16 mb-24">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-8 text-gray-400 leading-relaxed text-sm font-light">
              {t('footer.tagline')}
            </p>
          </div>

          <div className="flex gap-24">
            <div>
              <h4 className="font-serif font-bold text-lg mb-8">{t('footer.business')}</h4>
              <ul className="space-y-5 text-gray-500 text-sm font-medium tracking-wide">
                <li><Link href="/#services" className="hover:text-white transition-colors">Risk Curator</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif font-bold text-lg mb-8">{t('footer.connect')}</h4>
              <ul className="space-y-5 text-gray-500 text-sm font-medium tracking-wide">
                <li><a href="https://x.com/unifiedlabs_" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Twitter / X</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LinkedIn</a></li>
                <li><Link href="/news" className="hover:text-white transition-colors">News</Link></li>
                <li><a href="https://unifiedlabs.substack.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Insights</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-10 border-t border-white/10 text-[10px] md:text-xs text-gray-600 font-mono uppercase tracking-[0.1em]">
          <div>{t('footer.rights')}</div>
          <div className="mt-4 md:mt-0">{t('footer.locations')}</div>
        </div>
      </div>
    </footer>
  )
}
