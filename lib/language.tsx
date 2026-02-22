'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Locale = 'en' | 'zh'

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string) => string
}

const translations: Record<Locale, Record<string, string>> = {
  en: {
    // Nav
    'nav.insights': 'Insights',
    'nav.about': 'About',
    'nav.docs': 'Docs',
    'nav.contact': 'Contact Us',

    // Insights page
    'insights.badge': 'Insights & Research',
    'insights.title': 'Insights',
    'insights.subtitle': 'Research, market analysis, and news from the Unified Labs team.',
    'insights.empty': 'No posts in this category yet',
    'insights.empty.sub': 'Check back soon for updates',
    'insights.ghost.warning':
      'Ghost CMS not connected — showing demo data. Set NEXT_PUBLIC_GHOST_URL and NEXT_PUBLIC_GHOST_CONTENT_API_KEY in .env.local to connect.',

    // Tabs
    'tab.all': 'All',
    'tab.news-press': 'News & Press',
    'tab.research': 'Research',
    'tab.market-decoded': 'Market Decoded',
    'tab.events': 'Events',

    // Footer
    'footer.tagline': 'Bridging Institutions to Onchain Finance.',
    'footer.business': 'Business',
    'footer.connect': 'Connect',
    'footer.rights': '© 2025 Unified Labs. All rights reserved.',
    'footer.locations': 'Hong Kong • Singapore • Dubai',

    // Reading
    'reading.min': 'min read',
  },
  zh: {
    // Nav
    'nav.insights': '洞察',
    'nav.about': '关于我们',
    'nav.docs': '文档',
    'nav.contact': '联系我们',

    // Insights page
    'insights.badge': '洞察与研究',
    'insights.title': '洞察',
    'insights.subtitle': '来自 Unified Labs 团队的研究、市场分析和最新动态。',
    'insights.empty': '该分类下暂无文章',
    'insights.empty.sub': '请稍后再来查看',
    'insights.ghost.warning':
      'Ghost CMS 未连接 — 正在显示演示数据。请在 .env.local 中设置 NEXT_PUBLIC_GHOST_URL 和 NEXT_PUBLIC_GHOST_CONTENT_API_KEY 以连接。',

    // Tabs
    'tab.all': '全部',
    'tab.news-press': '新闻与媒体',
    'tab.research': '研究报告',
    'tab.market-decoded': '市场解读',
    'tab.events': '活动',

    // Footer
    'footer.tagline': '连接机构与链上金融。',
    'footer.business': '业务',
    'footer.connect': '联系',
    'footer.rights': '© 2025 Unified Labs. 保留所有权利。',
    'footer.locations': '香港 • 新加坡 • 迪拜',

    // Reading
    'reading.min': '分钟阅读',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en')

  useEffect(() => {
    const saved = localStorage.getItem('locale') as Locale | null
    if (saved && (saved === 'en' || saved === 'zh')) {
      setLocaleState(saved)
    }
  }, [])

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('locale', newLocale)
  }

  const t = (key: string): string => {
    return translations[locale][key] ?? key
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
