// Clients & Ecosystem showcase — data layer
// ────────────────────────────────────────────────────────────────
// PREVIEW SKELETON: the entries below are PLACEHOLDER samples with
// fictional client names. They exist only to preview the UI. Replace
// them with real, authorized clients before going live.
//
// The showcase is logo-forward and organised by relationship type
// (asset issuers / integrated platforms / institutional allocators).
// Most clients are simple showcase tiles; a few carry an optional
// `story` and become clickable into a detail page.

export type ClientGroup = 'issuer' | 'platform' | 'institution'

/** A string available in both supported locales. */
export interface LocalizedText {
  en: string
  zh: string
}

/** Optional deep-dive shown on /clients/[slug] when present. */
export interface ClientStory {
  headline: LocalizedText
  summary: LocalizedText
  challenge: LocalizedText
  solution: LocalizedText
  results: LocalizedText
  quote?: { text: LocalizedText; author: LocalizedText }
}

export interface Client {
  slug: string
  name: string
  /** Brand accent (6-digit hex) used for the placeholder logo lockup. */
  accent: string
  group: ClientGroup
  /** Small subtype label, e.g. "Tokenized treasuries", "Exchange". */
  tag: LocalizedText
  /** One line on what we do with / for them. */
  relationship: LocalizedText
  story?: ClientStory
}

// ── Group metadata (section headings + intros) ─────────────────────

export interface GroupMeta {
  key: ClientGroup
  title: LocalizedText
  intro: LocalizedText
}

export const CLIENT_GROUPS: GroupMeta[] = [
  {
    key: 'issuer',
    title: { en: 'Asset issuers', zh: '资产发行方' },
    intro: {
      en: 'Issuers we help structure, underwrite, and bring onchain.',
      zh: '我们协助进行结构化、承销并带上链的资产发行方。',
    },
  },
  {
    key: 'platform',
    title: { en: 'Integrated platforms', zh: '集成平台' },
    intro: {
      en: 'Exchanges, wallets, and fintechs distributing onchain yield through Unified Labs.',
      zh: '通过 Unified Labs 分发链上收益的交易所、钱包与金融科技平台。',
    },
  },
  {
    key: 'institution',
    title: { en: 'Institutional allocators', zh: '机构配置方' },
    intro: {
      en: 'Funds and treasuries allocating into underwritten onchain strategies.',
      zh: '将资金配置至经承销链上策略的基金与财库。',
    },
  },
]

// ── Placeholder clients ────────────────────────────────────────────

export const CLIENTS: Client[] = [
  // ── Asset issuers ──
  {
    slug: 'sterling-trust',
    name: 'Sterling Trust',
    accent: '#60a5fa',
    group: 'issuer',
    tag: { en: 'Tokenized treasuries', zh: '代币化美债' },
    relationship: {
      en: 'Structured and distributed tokenized treasury exposure onchain.',
      zh: '将代币化美债敞口结构化并在链上分发。',
    },
    story: {
      headline: {
        en: 'Bringing tokenized U.S. treasuries onchain',
        zh: '将代币化美债带上链',
      },
      summary: {
        en: 'We structured and underwrote Sterling’s treasury product so it could be listed and distributed across onchain venues.',
        zh: '我们为 Sterling 的美债产品做结构化与承销，使其具备在链上各渠道上架与分发的条件。',
      },
      challenge: {
        en: 'Sterling held high-quality treasury assets but lacked a compliant, scalable path to distribute tokenized exposure onchain.',
        zh: 'Sterling 持有优质美债资产，却缺乏合规、可扩展的途径在链上分发其代币化敞口。',
      },
      solution: {
        en: 'Unified Labs structured and underwrote the product, then wired it into curated vaults and listing venues with full documentation.',
        zh: 'Unified Labs 对产品进行结构化与承销，并配以完整文档接入精选 Vault 与上架渠道。',
      },
      results: {
        en: 'The product went live across multiple onchain venues, expanding reach while preserving institutional controls.',
        zh: '产品在多个链上渠道上线，在保留机构级管控的同时扩大了触达。',
      },
      quote: {
        text: {
          en: 'Unified Labs took us from a tokenization concept to live onchain distribution.',
          zh: 'Unified Labs 让我们从代币化构想走到了真正的链上分发。',
        },
        author: { en: 'Managing Director, Sterling Trust', zh: 'Sterling Trust 董事总经理' },
      },
    },
  },
  {
    slug: 'helios-asset-management',
    name: 'Helios Asset Management',
    accent: '#f59e0b',
    group: 'issuer',
    tag: { en: 'Tokenized MMF', zh: '代币化货币基金' },
    relationship: {
      en: 'Brought a regulated money market fund onchain for DeFi distribution.',
      zh: '将受监管的货币市场基金带上链，用于 DeFi 分发。',
    },
  },
  {
    slug: 'northbridge-credit',
    name: 'Northbridge Credit',
    accent: '#34d399',
    group: 'issuer',
    tag: { en: 'Private credit', zh: '私募信贷' },
    relationship: {
      en: 'Underwrote a private credit product for onchain listing.',
      zh: '承销私募信贷产品以供链上上架。',
    },
  },
  {
    slug: 'aurum-reserve',
    name: 'Aurum Reserve',
    accent: '#fbbf24',
    group: 'issuer',
    tag: { en: 'Tokenized gold', zh: '代币化黄金' },
    relationship: {
      en: 'Issued tokenized commodity exposure backed by allocated gold.',
      zh: '发行由实物黄金背书的代币化大宗商品敞口。',
    },
  },

  // ── Integrated platforms ──
  {
    slug: 'apex-exchange',
    name: 'Apex Exchange',
    accent: '#22d3ee',
    group: 'platform',
    tag: { en: 'Exchange', zh: '交易所' },
    relationship: {
      en: 'Embedded a branded USD earn product into the exchange.',
      zh: '在交易所内嵌品牌化美元理财产品。',
    },
    story: {
      headline: {
        en: 'Embedding a branded USD earn product into an exchange',
        zh: '在交易所内嵌品牌化美元理财产品',
      },
      summary: {
        en: 'Apex turned idle user balances into a flagship, onchain-verifiable yield product.',
        zh: 'Apex 将闲置的用户余额变成可在链上验证的旗舰收益产品。',
      },
      challenge: {
        en: 'Millions in stablecoin balances sat idle on the exchange, generating no return for users and no differentiation for the platform.',
        zh: '交易所上数百万美元的稳定币余额长期闲置，既无法为用户创造收益，也无法构成平台差异化。',
      },
      solution: {
        en: 'Unified Labs wired curated, risk-tiered vaults directly into the exchange backend via API, each tier mapped to a transparent onchain strategy.',
        zh: 'Unified Labs 通过 API 将经过风控审核的风险分级 Vault 直接接入交易所后端，每个层级对应一条透明的链上策略。',
      },
      results: {
        en: 'The exchange launched a branded earn product in days, lifting retention and opening a new revenue line.',
        zh: '交易所在数天内上线品牌化理财产品，提升了用户留存并打开了新的收入来源。',
      },
      quote: {
        text: {
          en: 'We shipped an institutional-grade earn product in days, not quarters — and every position is verifiable onchain.',
          zh: '我们用几天而不是几个季度就上线了机构级理财产品，而且每一笔头寸都能在链上验证。',
        },
        author: { en: 'Head of Product, Apex Exchange', zh: 'Apex Exchange 产品负责人' },
      },
    },
  },
  {
    slug: 'vertex-markets',
    name: 'Vertex Markets',
    accent: '#f472b6',
    group: 'platform',
    tag: { en: 'Exchange', zh: '交易所' },
    relationship: {
      en: 'Converted idle balances into multi-currency yield.',
      zh: '将闲置余额转化为多币种收益。',
    },
  },
  {
    slug: 'meridian-wallet',
    name: 'Meridian Wallet',
    accent: '#a78bfa',
    group: 'platform',
    tag: { en: 'Wallet', zh: '钱包' },
    relationship: {
      en: 'One-tap, non-custodial yield inside the wallet.',
      zh: '钱包内一键、非托管的收益。',
    },
  },
  {
    slug: 'cobalt-wallet',
    name: 'Cobalt Wallet',
    accent: '#38bdf8',
    group: 'platform',
    tag: { en: 'Wallet', zh: '钱包' },
    relationship: {
      en: 'Self-custody stablecoin earn for retail users.',
      zh: '面向零售用户的自托管稳定币理财。',
    },
  },
  {
    slug: 'lumen-pay',
    name: 'Lumen Pay',
    accent: '#fb923c',
    group: 'platform',
    tag: { en: 'Fintech', zh: '金融科技' },
    relationship: {
      en: 'Launched branded stablecoin savings on DeFi rails.',
      zh: '以 DeFi 通道推出品牌化稳定币储蓄。',
    },
  },
  {
    slug: 'orbit-pay',
    name: 'Orbit Pay',
    accent: '#818cf8',
    group: 'platform',
    tag: { en: 'Fintech', zh: '金融科技' },
    relationship: {
      en: 'Yield-bearing balances for cross-border payouts.',
      zh: '为跨境支付提供生息余额。',
    },
  },

  // ── Institutional allocators ──
  {
    slug: 'granite-capital',
    name: 'Granite Capital',
    accent: '#94a3b8',
    group: 'institution',
    tag: { en: 'Fund', zh: '基金' },
    relationship: {
      en: 'Allocated treasury capital into underwritten vaults.',
      zh: '将财库资金配置至经承销的 Vault。',
    },
  },
  {
    slug: 'summit-family-office',
    name: 'Summit Family Office',
    accent: '#cbd5e1',
    group: 'institution',
    tag: { en: 'Family office', zh: '家族办公室' },
    relationship: {
      en: 'Diversified onchain allocation with onchain reporting.',
      zh: '多元化的链上配置，配套链上报告。',
    },
  },
]

// ── Query helpers ──────────────────────────────────────────────────

export function getClients(): Client[] {
  return CLIENTS
}

export function getClientsByGroup(group: ClientGroup): Client[] {
  return CLIENTS.filter((c) => c.group === group)
}

export function getClientBySlug(slug: string): Client | null {
  return CLIENTS.find((c) => c.slug === slug) ?? null
}

/** Clients that have a full story (and therefore a detail page). */
export function getClientsWithStory(): Client[] {
  return CLIENTS.filter((c) => c.story)
}

/** Other clients in the same group, for the detail page footer. */
export function getRelatedClients(slug: string, limit = 4): Client[] {
  const current = getClientBySlug(slug)
  if (!current) return CLIENTS.slice(0, limit)
  return CLIENTS.filter(
    (c) => c.slug !== slug && c.group === current.group
  ).slice(0, limit)
}
