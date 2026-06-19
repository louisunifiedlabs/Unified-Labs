// Customer Stories / 客户案例 — data layer
// ────────────────────────────────────────────────────────────────
// PREVIEW SKELETON: the entries below are PLACEHOLDER samples with
// fictional client names. They exist only to preview the UI. Replace
// them with real, authorized case studies before going live.
//
// This static file is intentionally shaped to mirror the GhostPost
// pattern, so the section can later be migrated to Ghost CMS or a
// Supabase `stories` table without touching the components.

export type StoryCategory = 'exchange' | 'wallet' | 'institution' | 'fintech'

/** A string available in both supported locales. */
export interface LocalizedText {
  en: string
  zh: string
}

/** A headline number shown as a chip on the card and detail page. */
export interface StoryMetric {
  value: string // "$2B", "8M", "40%"
  label: LocalizedText
}

/** Optional client pull-quote on the detail page. */
export interface StoryQuote {
  text: LocalizedText
  author: LocalizedText
}

export interface Story {
  slug: string
  client: string
  /** Brand accent (6-digit hex) used for the placeholder visual. */
  accent: string
  category: StoryCategory
  featured: boolean

  headline: LocalizedText
  summary: LocalizedText
  metrics: StoryMetric[]

  // Structured narrative for the detail page.
  challenge: LocalizedText
  solution: LocalizedText
  results: LocalizedText
  quote?: StoryQuote

  publishedAt: string // ISO date, used for ordering
}

// ── Categories (for the filter tabs) ───────────────────────────────

export const STORY_CATEGORIES = [
  'all',
  'exchange',
  'wallet',
  'institution',
  'fintech',
] as const

export type StoryTabKey = (typeof STORY_CATEGORIES)[number]

// ── Aggregate stats (the trust bar under the hero) ─────────────────

export const STORY_STATS: { value: string; label: LocalizedText }[] = [
  { value: '$1.2B+', label: { en: 'Capital deployed onchain', zh: '链上配置规模' } },
  { value: '18', label: { en: 'Institutional partners', zh: '机构合作伙伴' } },
  { value: '40+', label: { en: 'Strategies live', zh: '上线策略' } },
  { value: '99.9%', label: { en: 'Settlement reliability', zh: '结算可靠性' } },
]

// ── Placeholder stories ────────────────────────────────────────────

export const STORIES: Story[] = [
  {
    slug: 'apex-exchange',
    client: 'Apex Exchange',
    accent: '#22d3ee',
    category: 'exchange',
    featured: true,
    headline: {
      en: 'Embedding onchain USD yield into a top-tier exchange',
      zh: '将链上美元收益嵌入头部交易所',
    },
    summary: {
      en: 'Apex routed idle user balances into risk-tiered vaults, turning a dormant liability into a flagship yield product.',
      zh: 'Apex 将闲置用户余额接入风险分级 Vault，把沉睡负债变成旗舰收益产品。',
    },
    metrics: [
      { value: '$680M', label: { en: 'Balances activated', zh: '激活余额' } },
      { value: '5.2%', label: { en: 'Avg. net APY', zh: '平均净年化' } },
      { value: '11 days', label: { en: 'Time to launch', zh: '上线周期' } },
    ],
    challenge: {
      en: 'Millions in stablecoin user balances sat idle on the exchange, generating no return for users and no differentiation for the platform — while competitors began shipping native earn products.',
      zh: '交易所上数百万美元的稳定币用户余额长期闲置，既无法为用户创造收益，也无法构成平台差异化，而竞品已陆续推出原生理财产品。',
    },
    solution: {
      en: 'Unified Labs wired curated, risk-tiered vaults directly into the exchange backend via API. Each tier maps to a transparent, onchain-verifiable strategy, with risk parameters actively curated and monitored.',
      zh: 'Unified Labs 通过 API 将经过风控审核的风险分级 Vault 直接接入交易所后端。每个层级对应一条链上可验证的透明策略，风险参数持续主动审核与监控。',
    },
    results: {
      en: 'Within two weeks the exchange launched a branded earn product. Over $680M in balances were activated in the first quarter, lifting retention and opening a new revenue line.',
      zh: '两周内交易所上线了品牌化理财产品。首季激活余额超过 6.8 亿美元，提升了用户留存并打开了新的收入来源。',
    },
    quote: {
      text: {
        en: 'We shipped an institutional-grade earn product in days, not quarters — and every position is verifiable onchain.',
        zh: '我们用几天而不是几个季度就上线了机构级理财产品，而且每一笔头寸都能在链上验证。',
      },
      author: { en: 'Head of Product, Apex Exchange', zh: 'Apex Exchange 产品负责人' },
    },
    publishedAt: '2026-05-20',
  },
  {
    slug: 'meridian-wallet',
    client: 'Meridian Wallet',
    accent: '#a78bfa',
    category: 'wallet',
    featured: false,
    headline: {
      en: 'Native stablecoin yield for 4M self-custody users',
      zh: '为 400 万自托管用户提供原生稳定币收益',
    },
    summary: {
      en: 'In-app, non-custodial yield that lowered the barrier to DeFi for a mainstream wallet audience.',
      zh: '应用内非托管收益，为大众钱包用户大幅降低进入 DeFi 的门槛。',
    },
    metrics: [
      { value: '4M', label: { en: 'Users reached', zh: '触达用户' } },
      { value: '1-tap', label: { en: 'Onboarding', zh: '一键开通' } },
    ],
    challenge: {
      en: 'Meridian users held significant stablecoin balances but had no simple, safe way to earn yield without leaving self-custody or navigating complex DeFi interfaces.',
      zh: 'Meridian 用户持有大量稳定币余额，却没有简单安全的途径在不放弃自托管、不接触复杂 DeFi 界面的前提下获取收益。',
    },
    solution: {
      en: 'A one-tap earn flow surfaced Unified Labs vaults directly inside the wallet. Funds never leave user custody, and yield sources are fully transparent.',
      zh: '钱包内嵌一键理财流程，直接呈现 Unified Labs 的 Vault。资金始终由用户自托管，收益来源完全透明。',
    },
    results: {
      en: 'Yield became one of the wallet’s most engaged features within a month of launch, with strong organic adoption across regions.',
      zh: '上线一个月内，收益功能成为钱包活跃度最高的功能之一，并在多个地区获得强劲的自然采用。',
    },
    publishedAt: '2026-04-12',
  },
  {
    slug: 'northbridge-capital',
    client: 'Northbridge Capital',
    accent: '#34d399',
    category: 'institution',
    featured: false,
    headline: {
      en: 'Treasury allocation into underwritten onchain strategies',
      zh: '将财库资金配置至经承销的链上策略',
    },
    summary: {
      en: 'A fund deployed treasury capital into diversified, blue-chip-collateralized vaults with full onchain verifiability.',
      zh: '某基金将财库资金配置至以蓝筹资产抵押、多元化的 Vault，全程链上可验证。',
    },
    metrics: [
      { value: '$300M', label: { en: 'Treasury allocated', zh: '配置规模' } },
      { value: '100%', label: { en: 'Onchain verifiable', zh: '链上可验证' } },
    ],
    challenge: {
      en: 'Northbridge needed onchain yield that met institutional standards for transparency, risk underwriting, and reporting — without taking custodial risk.',
      zh: 'Northbridge 需要满足机构级透明度、风险承销与报告标准的链上收益，同时不承担托管风险。',
    },
    solution: {
      en: 'Unified Labs structured a diversified allocation across institutional stablecoin vaults, with underwriting documentation and dashboards mapped to the fund’s reporting needs.',
      zh: 'Unified Labs 构建了覆盖多个机构级稳定币 Vault 的多元化配置，并提供与基金报告需求对接的承销文档与仪表盘。',
    },
    results: {
      en: 'The fund moved from evaluation to a $300M allocation, with every exposure auditable onchain in real time.',
      zh: '该基金从评估推进至 3 亿美元配置，每一笔敞口均可在链上实时审计。',
    },
    publishedAt: '2026-03-03',
  },
  {
    slug: 'lumen-pay',
    client: 'Lumen Pay',
    accent: '#f59e0b',
    category: 'fintech',
    featured: false,
    headline: {
      en: 'A branded savings product, powered by DeFi rails',
      zh: '以 DeFi 通道驱动的品牌化储蓄产品',
    },
    summary: {
      en: 'A consumer fintech launched stablecoin savings with clearly tiered risk and onchain-verifiable yield.',
      zh: '一家消费金融科技公司推出了风险分层清晰、收益链上可验证的稳定币储蓄产品。',
    },
    metrics: [
      { value: '250K', label: { en: 'Savers onboarded', zh: '储蓄用户' } },
      { value: '3 tiers', label: { en: 'Risk options', zh: '风险层级' } },
    ],
    challenge: {
      en: 'Lumen wanted to offer competitive savings yields without building DeFi infrastructure or risk-management capability in-house.',
      zh: 'Lumen 希望提供有竞争力的储蓄收益，但不想自建 DeFi 基础设施或风控能力。',
    },
    solution: {
      en: 'Unified Labs provided the full backend: curated vaults, tiered risk, and APIs that let Lumen present everything under its own brand.',
      zh: 'Unified Labs 提供完整后端：精选 Vault、分层风险与 API，让 Lumen 以自有品牌呈现全部体验。',
    },
    results: {
      en: 'Lumen launched savings as a headline feature, onboarding 250K savers across three risk tiers in the first two quarters.',
      zh: 'Lumen 将储蓄作为核心功能推出，前两个季度在三个风险层级上获取了 25 万储蓄用户。',
    },
    publishedAt: '2026-02-08',
  },
  {
    slug: 'sterling-trust',
    client: 'Sterling Trust',
    accent: '#60a5fa',
    category: 'institution',
    featured: false,
    headline: {
      en: 'Tokenized treasury exposure, distributed onchain',
      zh: '链上分销的代币化美债敞口',
    },
    summary: {
      en: 'Structuring and underwriting tokenized treasuries for DeFi listing and distribution.',
      zh: '为代币化美债进行结构化与承销，使其具备 DeFi 上架与分销条件。',
    },
    metrics: [
      { value: '$150M', label: { en: 'Assets tokenized', zh: '代币化资产' } },
      { value: '6 venues', label: { en: 'Distribution', zh: '分销渠道' } },
    ],
    challenge: {
      en: 'Sterling held high-quality treasury assets but lacked a compliant, scalable path to distribute tokenized exposure across onchain venues.',
      zh: 'Sterling 持有优质美债资产，却缺乏合规、可扩展的途径在链上各渠道分销其代币化敞口。',
    },
    solution: {
      en: 'Unified Labs structured and underwrote the product, then wired it into curated vaults and listing venues with full documentation.',
      zh: 'Unified Labs 对产品进行结构化与承销，并配以完整文档接入精选 Vault 与上架渠道。',
    },
    results: {
      en: '$150M in assets were tokenized and distributed across six venues, expanding reach while preserving institutional controls.',
      zh: '1.5 亿美元资产完成代币化并在六个渠道分销，在保留机构级管控的同时扩大了触达。',
    },
    publishedAt: '2026-01-15',
  },
  {
    slug: 'vertex-markets',
    client: 'Vertex Markets',
    accent: '#f472b6',
    category: 'exchange',
    featured: false,
    headline: {
      en: 'Idle balances converted into a retention engine',
      zh: '把闲置余额变成留存引擎',
    },
    summary: {
      en: 'Multi-currency, risk-tiered vaults that turned dormant balances into recurring engagement.',
      zh: '多币种、风险分级的 Vault，将沉睡余额转化为持续的用户活跃。',
    },
    metrics: [
      { value: '+32%', label: { en: '90-day retention', zh: '90 天留存' } },
      { value: '7 assets', label: { en: 'Currencies', zh: '支持币种' } },
    ],
    challenge: {
      en: 'Vertex saw users park funds and churn. Without a reason to keep balances on-platform, lifetime value stayed flat.',
      zh: 'Vertex 发现用户存入资金后便流失。由于缺乏将余额留在平台的理由，用户生命周期价值长期停滞。',
    },
    solution: {
      en: 'Unified Labs deployed multi-currency, risk-tiered vaults that convert idle balances into yield-bearing positions across seven assets.',
      zh: 'Unified Labs 部署了多币种、风险分级的 Vault，将七种资产的闲置余额转化为生息头寸。',
    },
    results: {
      en: '90-day retention rose 32% among balance holders, with yield becoming a primary reason users stayed.',
      zh: '持有余额用户的 90 天留存提升 32%，收益成为用户留存的主要原因之一。',
    },
    publishedAt: '2025-12-01',
  },
]

// ── Query helpers ──────────────────────────────────────────────────

const byNewest = (a: Story, b: Story) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()

export function getStories(): Story[] {
  return [...STORIES].sort(byNewest)
}

export function getFeaturedStory(): Story | undefined {
  return getStories().find((s) => s.featured) ?? getStories()[0]
}

export function getStoryBySlug(slug: string): Story | null {
  return STORIES.find((s) => s.slug === slug) ?? null
}

export function getRelatedStories(slug: string, limit = 3): Story[] {
  const current = getStoryBySlug(slug)
  if (!current) return getStories().slice(0, limit)
  const sameCategory = getStories().filter(
    (s) => s.slug !== slug && s.category === current.category
  )
  const others = getStories().filter(
    (s) => s.slug !== slug && s.category !== current.category
  )
  return [...sameCategory, ...others].slice(0, limit)
}
