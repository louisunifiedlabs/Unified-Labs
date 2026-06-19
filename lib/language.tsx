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
    'nav.stories': 'Stories',
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

    // Stories / Customer cases
    'stories.badge': 'Customer Stories',
    'stories.title': 'Built on Unified Labs',
    'stories.subtitle': 'How exchanges, wallets, fintechs, and institutions deploy capital onchain with Unified Labs.',
    'stories.preview.note': 'Preview — these are placeholder case studies. Replace with real, authorized stories before launch.',
    'stories.featured': 'Featured Story',
    'stories.read': 'Read story',
    'stories.empty': 'No stories in this category yet',
    'stories.trusted': 'Trusted by teams across the ecosystem',
    'stories.cta.title': 'Become a partner',
    'stories.cta.desc': 'Bring institutional-grade onchain products to your users — or put your capital to work.',
    'stories.cta.button': 'Talk to us',

    // Story categories
    'story.cat.all': 'All',
    'story.cat.exchange': 'Exchanges',
    'story.cat.wallet': 'Wallets',
    'story.cat.institution': 'Institutions',
    'story.cat.fintech': 'Fintech',

    // Story detail
    'story.back': 'Back to Stories',
    'story.challenge': 'The Challenge',
    'story.solution': 'The Solution',
    'story.results': 'The Results',
    'story.related': 'More stories',

    // Footer
    'footer.tagline': 'Bridging Institutions to Onchain Finance.',
    'footer.business': 'Business',
    'footer.connect': 'Connect',
    'footer.rights': '© 2025 Unified Labs. All rights reserved.',
    'footer.locations': 'Hong Kong • Singapore • Dubai',

    // Reading
    'reading.min': 'min read',

    // Services
    'services.badge': 'What We Do',
    'services.title': 'Our Expertise',
    'services.build.title': 'Build products',
    'services.build.desc': 'Build institutional-grade stablecoin and yield products that embed directly into your app, exchange, or platform backend.',
    'services.build.p1': 'Ship branded stablecoin savings with onchain-verifiable yield sources and clearly tiered risk',
    'services.build.p2': 'Deploy multi-currency, risk-tiered vaults that convert idle balances and lift user retention',
    'services.build.p3': 'Wire curated DeFi vaults into your existing product stack via APIs or smart contracts',
    'services.yield.title': 'Earn yield',
    'services.yield.desc': 'Enter a network of risk-vetted DeFi vaults to allocate capital into diversified strategies — non-custodial, transparent, and built to institutional standards.',
    'services.yield.p1': 'Position treasury or fund capital in institutional stablecoin vaults secured by blue-chip collateral',
    'services.yield.p2': 'Tap into underwritten, diversified strategies across tokenized funds, tokenized treasuries, and other RWAs',
    'services.yield.p3': 'Run allocations automatically through dashboards or onchain rails, with every exposure verifiable onchain',
    'services.advisory.title': 'Advisory',
    'services.advisory.desc': 'Partner with our specialist team to design, underwrite, and execute RWA, stablecoin, and tokenized asset strategies — from concept to deployment.',
    'services.advisory.p1': 'Map out RWA and stablecoin product strategy, from opportunity discovery to product definition',
    'services.advisory.p2': 'Structure and underwrite tokenized assets and credit products for DeFi listing and distribution',
    'services.advisory.p3': 'Build protocol or treasury economic models, delivered as executable onchain configurations',
  },
  zh: {
    // Nav
    'nav.insights': '洞察',
    'nav.stories': '客户案例',
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

    // Stories / Customer cases
    'stories.badge': '客户案例',
    'stories.title': '基于 Unified Labs 构建',
    'stories.subtitle': '交易所、钱包、金融科技与机构如何借助 Unified Labs 在链上配置资金。',
    'stories.preview.note': '预览模式 — 以下为占位案例，正式上线前请替换为已获授权的真实案例。',
    'stories.featured': '旗舰案例',
    'stories.read': '查看案例',
    'stories.empty': '该分类下暂无案例',
    'stories.trusted': '生态伙伴的信赖之选',
    'stories.cta.title': '成为合作伙伴',
    'stories.cta.desc': '为你的用户带来机构级链上产品，或让你的资金高效运转。',
    'stories.cta.button': '与我们联系',

    // Story categories
    'story.cat.all': '全部',
    'story.cat.exchange': '交易所',
    'story.cat.wallet': '钱包',
    'story.cat.institution': '机构',
    'story.cat.fintech': '金融科技',

    // Story detail
    'story.back': '返回客户案例',
    'story.challenge': '挑战',
    'story.solution': '方案',
    'story.results': '成果',
    'story.related': '更多案例',

    // Footer
    'footer.tagline': '连接机构与链上金融。',
    'footer.business': '业务',
    'footer.connect': '联系',
    'footer.rights': '© 2025 Unified Labs. 保留所有权利。',
    'footer.locations': '香港 • 新加坡 • 迪拜',

    // Reading
    'reading.min': '分钟阅读',

    // Services
    'services.badge': '核心业务',
    'services.title': '我们的专业领域',
    'services.build.title': '构建产品',
    'services.build.desc': '打造机构级的稳定币与收益产品，直接嵌入你的 App、交易所或平台后端。',
    'services.build.p1': '推出品牌化的稳定币储蓄产品，收益来源链上可溯，风险分层一目了然',
    'services.build.p2': '交付多币种的风险分级 Vault，转化闲置余额并提升用户粘性',
    'services.build.p3': '通过 API 或智能合约，将经过风控审核的 DeFi Vault 嵌进你现有的产品栈',
    'services.yield.title': '获取收益',
    'services.yield.desc': '进入经风控审核的 DeFi Vault 体系，以非托管、透明、机构级的方式把资金部署到多元化策略中。',
    'services.yield.p1': '将财库或基金资金配置至蓝筹抵押支持的机构级稳定币 Vault',
    'services.yield.p2': '接入经承销审核的多元收益策略，覆盖代币化基金、代币化美债与其他 RWA 资产',
    'services.yield.p3': '配置通过仪表盘或链上通道自动执行，每一笔敞口链上可验证',
    'services.advisory.title': '顾问服务',
    'services.advisory.desc': '与我们的专业团队共同设计、承销并落地 RWA、稳定币与代币化资产策略，从构想到上链一站贯通。',
    'services.advisory.p1': '制定 RWA 与稳定币产品的整体路径，从机会识别走到产品定型',
    'services.advisory.p2': '结构化并承销代币化资产或信贷产品，使其具备 DeFi 上架与分销条件',
    'services.advisory.p3': '为协议或财库建立经济模型，输出可直接部署的链上配置方案',
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
