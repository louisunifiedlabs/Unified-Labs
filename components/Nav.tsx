'use client'

import { useState, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { X, Menu } from 'lucide-react'
import Logo from './Logo'

export default function Nav() {
  const t = useTranslations('nav')
  const locale = useLocale()
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { name: t('news'), href: '/news' as const },
    { name: t('insights'), href: '/insights' as const },
    { name: t('about'), href: '/about' as const },
    { name: t('docs'), href: '/docs', external: true },
  ]

  const switchLocale = () => {
    const nextLocale = locale === 'en' ? 'zh' : 'en'
    router.replace(pathname, { locale: nextLocale })
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden md:flex space-x-12 items-center">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-[0.15em] uppercase"
                >
                  {item.name} <span className="text-[0.6em]">&#8599;</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-[0.15em] uppercase"
                >
                  {item.name}
                </Link>
              )
            )}
            <button
              onClick={switchLocale}
              className="text-xs font-mono text-gray-400 hover:text-white transition-colors tracking-wider border border-white/20 px-3 py-1.5 hover:border-white/40"
            >
              {locale === 'en' ? '中文' : 'EN'}
            </button>
            <Link
              href="/contact"
              className="px-6 py-2 bg-white text-black font-serif font-bold text-sm hover:bg-gray-200 transition-colors tracking-wide"
            >
              {t('contact')}
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-black border-b border-white/10">
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) =>
              item.external ? (
                <a
                  key={item.name}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="text-lg text-gray-300 font-serif"
                >
                  {item.name} <span className="text-[0.7em]">&#8599;</span>
                </a>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg text-gray-300 font-serif"
                >
                  {item.name}
                </Link>
              )
            )}
            <button
              onClick={() => { switchLocale(); setIsOpen(false) }}
              className="text-left text-lg text-gray-300 font-serif"
            >
              {locale === 'en' ? '中文' : 'English'}
            </button>
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-block px-6 py-3 bg-white text-black font-serif font-bold text-sm text-center mt-4"
            >
              {t('contact')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
