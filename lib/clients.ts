// Clients & Ecosystem showcase — data layer
// ────────────────────────────────────────────────────────────────
// PREVIEW SKELETON: the entries below are PLACEHOLDER samples with
// fictional client names. They exist only to preview the UI. Replace
// them with real, authorized clients before going live.
//
// The showcase is a flat, logo-forward grid (Morpho-style); every
// client is clickable into a detail page.

/** A string available in both supported locales. */
export interface LocalizedText {
  en: string
  zh: string
}

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
  /** Small subtype label, e.g. "Tokenized treasuries", "Exchange". */
  tag: LocalizedText
  /** One line on what we do with / for them (the card headline). */
  relationship: LocalizedText
  story: ClientStory
}

// ── Placeholder clients ────────────────────────────────────────────

export const CLIENTS: Client[] = [
  {
    slug: 'sterling-trust',
    name: 'Sterling Trust',
    accent: '#60a5fa',
    tag: { en: 'Tokenized treasuries', zh: '代币化美债' },
    relationship: {
      en: 'Structured and distributed tokenized treasury exposure onchain.',
      zh: '将代币化美债敞口结构化并在链上分发。',
    },
    story: {
      headline: { en: 'Bringing tokenized U.S. treasuries onchain', zh: '将代币化美债带上链' },
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
    tag: { en: 'Tokenized MMF', zh: '代币化货币基金' },
    relationship: {
      en: 'Brought a regulated money market fund onchain for DeFi distribution.',
      zh: '将受监管的货币市场基金带上链，用于 DeFi 分发。',
    },
    story: {
      headline: { en: 'Bringing a regulated money market fund onchain', zh: '将受监管的货币市场基金带上链' },
      summary: {
        en: 'We helped Helios tokenize its money market fund and make it available across DeFi venues.',
        zh: '我们帮助 Helios 将其货币市场基金代币化，并在 DeFi 渠道上线。',
      },
      challenge: {
        en: 'Helios wanted onchain distribution for its fund but needed to preserve regulatory and operational controls.',
        zh: 'Helios 希望让基金在链上分发，但需要保留监管与运营层面的管控。',
      },
      solution: {
        en: 'Unified Labs structured the tokenized share class and integrated it into curated vaults with full reporting.',
        zh: 'Unified Labs 设计了代币化份额类别，并将其接入精选 Vault，配套完整报告。',
      },
      results: {
        en: 'The fund became accessible to onchain allocators while Helios retained institutional oversight.',
        zh: '基金对链上配置方开放，同时 Helios 保留了机构级监督。',
      },
    },
  },
  {
    slug: 'northbridge-credit',
    name: 'Northbridge Credit',
    accent: '#34d399',
    tag: { en: 'Private credit', zh: '私募信贷' },
    relationship: {
      en: 'Underwrote a private credit product for onchain listing.',
      zh: '承销私募信贷产品以供链上上架。',
    },
    story: {
      headline: { en: 'Listing a private credit product onchain', zh: '将私募信贷产品搬上链' },
      summary: {
        en: 'We underwrote and packaged Northbridge’s credit strategy for transparent onchain distribution.',
        zh: '我们对 Northbridge 的信贷策略进行承销与封装，使其可在链上透明分发。',
      },
      challenge: {
        en: 'Private credit is opaque and hard to distribute onchain without standardized underwriting.',
        zh: '私募信贷透明度低，缺乏标准化承销时很难在链上分发。',
      },
      solution: {
        en: 'Unified Labs underwrote the strategy and expressed its risk parameters as onchain-verifiable configurations.',
        zh: 'Unified Labs 对策略进行承销，并将其风险参数表达为链上可验证的配置。',
      },
      results: {
        en: 'Allocators gained access to a vetted private credit exposure with clear, monitorable risk.',
        zh: '配置方得以接入经审核的私募信贷敞口，风险清晰且可监控。',
      },
    },
  },
  {
    slug: 'aurum-reserve',
    name: 'Aurum Reserve',
    accent: '#fbbf24',
    tag: { en: 'Tokenized gold', zh: '代币化黄金' },
    relationship: {
      en: 'Issued tokenized commodity exposure backed by allocated gold.',
      zh: '发行由实物黄金背书的代币化大宗商品敞口。',
    },
    story: {
      headline: { en: 'Tokenizing allocated gold for onchain access', zh: '将实物黄金代币化以供链上使用' },
      summary: {
        en: 'We brought Aurum’s gold-backed product onchain as a collateral- and yield-eligible asset.',
        zh: '我们将 Aurum 的黄金背书产品带上链，使其成为可作抵押、可生息的资产。',
      },
      challenge: {
        en: 'Aurum’s gold product had no onchain footprint and no path into DeFi collateral markets.',
        zh: 'Aurum 的黄金产品没有链上足迹，也没有进入 DeFi 抵押市场的途径。',
      },
      solution: {
        en: 'Unified Labs structured the tokenized asset and integrated it into vaults and listing venues.',
        zh: 'Unified Labs 对该代币化资产进行结构化，并将其接入 Vault 与上架渠道。',
      },
      results: {
        en: 'Tokenized gold became usable across onchain strategies while staying fully backed by allocated metal.',
        zh: '代币化黄金得以在链上各策略中使用，同时保持由实物金属足额背书。',
      },
    },
  },
  {
    slug: 'apex-exchange',
    name: 'Apex Exchange',
    accent: '#22d3ee',
    tag: { en: 'Exchange', zh: '交易所' },
    relationship: {
      en: 'Embedded a branded USD earn product into the exchange.',
      zh: '在交易所内嵌品牌化美元理财产品。',
    },
    story: {
      headline: { en: 'Embedding a branded USD earn product into an exchange', zh: '在交易所内嵌品牌化美元理财产品' },
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
    tag: { en: 'Exchange', zh: '交易所' },
    relationship: {
      en: 'Converted idle balances into multi-currency yield.',
      zh: '将闲置余额转化为多币种收益。',
    },
    story: {
      headline: { en: 'Turning idle balances into multi-currency yield', zh: '把闲置余额变成多币种收益' },
      summary: {
        en: 'Vertex activated dormant balances across multiple assets with risk-tiered vaults.',
        zh: 'Vertex 借助风险分级 Vault 激活了多种资产上的沉睡余额。',
      },
      challenge: {
        en: 'Users parked funds on Vertex and churned, leaving lifetime value flat.',
        zh: '用户在 Vertex 存入资金后便流失，生命周期价值长期停滞。',
      },
      solution: {
        en: 'Unified Labs deployed multi-currency, risk-tiered vaults wired into the Vertex backend.',
        zh: 'Unified Labs 部署了多币种、风险分级的 Vault 并接入 Vertex 后端。',
      },
      results: {
        en: 'Balance holders engaged more and stayed longer, with yield a core reason to remain.',
        zh: '持有余额的用户活跃度更高、留存更久，收益成为留下的核心理由之一。',
      },
    },
  },
  {
    slug: 'meridian-wallet',
    name: 'Meridian Wallet',
    accent: '#a78bfa',
    tag: { en: 'Wallet', zh: '钱包' },
    relationship: {
      en: 'One-tap, non-custodial yield inside the wallet.',
      zh: '钱包内一键、非托管的收益。',
    },
    story: {
      headline: { en: 'One-tap onchain yield inside a self-custody wallet', zh: '自托管钱包内的一键链上收益' },
      summary: {
        en: 'Meridian surfaced non-custodial yield to a mainstream wallet audience.',
        zh: 'Meridian 为大众钱包用户提供了非托管的收益入口。',
      },
      challenge: {
        en: 'Meridian users held stablecoins but had no simple, safe way to earn without leaving self-custody.',
        zh: 'Meridian 用户持有稳定币，却没有简单安全、又不放弃自托管的收益途径。',
      },
      solution: {
        en: 'A one-tap earn flow surfaced Unified Labs vaults inside the wallet; funds never leave user custody.',
        zh: '钱包内嵌一键理财流程，直接呈现 Unified Labs 的 Vault，资金始终由用户自托管。',
      },
      results: {
        en: 'Yield became one of the wallet’s most engaged features, with strong organic adoption.',
        zh: '收益成为钱包活跃度最高的功能之一，并获得强劲的自然采用。',
      },
      quote: {
        text: {
          en: 'Our users earn onchain yield without ever leaving the wallet or giving up custody.',
          zh: '我们的用户无需离开钱包、也无需放弃自托管，就能获得链上收益。',
        },
        author: { en: 'Co-founder, Meridian Wallet', zh: 'Meridian Wallet 联合创始人' },
      },
    },
  },
  {
    slug: 'cobalt-wallet',
    name: 'Cobalt Wallet',
    accent: '#38bdf8',
    tag: { en: 'Wallet', zh: '钱包' },
    relationship: {
      en: 'Self-custody stablecoin earn for retail users.',
      zh: '面向零售用户的自托管稳定币理财。',
    },
    story: {
      headline: { en: 'Self-custody stablecoin earn for retail', zh: '面向零售的自托管稳定币理财' },
      summary: {
        en: 'Cobalt added a simple earn option for everyday users without custodial risk.',
        zh: 'Cobalt 为日常用户增加了一个无托管风险的简单理财选项。',
      },
      challenge: {
        en: 'Cobalt wanted to offer earn without building DeFi or risk infrastructure in-house.',
        zh: 'Cobalt 希望提供理财功能，但不想自建 DeFi 或风控基础设施。',
      },
      solution: {
        en: 'Unified Labs provided curated vaults and APIs that Cobalt presented under its own brand.',
        zh: 'Unified Labs 提供精选 Vault 与 API，由 Cobalt 以自有品牌呈现。',
      },
      results: {
        en: 'Retail users earned onchain yield through a familiar, self-custody experience.',
        zh: '零售用户通过熟悉的自托管体验获得了链上收益。',
      },
    },
  },
  {
    slug: 'lumen-pay',
    name: 'Lumen Pay',
    accent: '#fb923c',
    tag: { en: 'Fintech', zh: '金融科技' },
    relationship: {
      en: 'Launched branded stablecoin savings on DeFi rails.',
      zh: '以 DeFi 通道推出品牌化稳定币储蓄。',
    },
    story: {
      headline: { en: 'A branded savings product on DeFi rails', zh: '以 DeFi 通道驱动的品牌化储蓄产品' },
      summary: {
        en: 'Lumen launched stablecoin savings with clearly tiered risk and onchain-verifiable yield.',
        zh: 'Lumen 推出了风险分层清晰、收益链上可验证的稳定币储蓄产品。',
      },
      challenge: {
        en: 'Lumen wanted competitive savings yields without building DeFi infrastructure.',
        zh: 'Lumen 希望提供有竞争力的储蓄收益，但不想自建 DeFi 基础设施。',
      },
      solution: {
        en: 'Unified Labs supplied the full backend: curated vaults, tiered risk, and APIs.',
        zh: 'Unified Labs 提供完整后端：精选 Vault、分层风险与 API。',
      },
      results: {
        en: 'Lumen shipped savings as a headline feature with transparent, tiered options.',
        zh: 'Lumen 将储蓄作为核心功能推出，并提供透明的分层选项。',
      },
    },
  },
  {
    slug: 'orbit-pay',
    name: 'Orbit Pay',
    accent: '#818cf8',
    tag: { en: 'Fintech', zh: '金融科技' },
    relationship: {
      en: 'Yield-bearing balances for cross-border payouts.',
      zh: '为跨境支付提供生息余额。',
    },
    story: {
      headline: { en: 'Yield-bearing balances for cross-border payouts', zh: '为跨境支付提供生息余额' },
      summary: {
        en: 'Orbit made held balances productive between payout cycles.',
        zh: 'Orbit 让支付周期之间的留存余额产生收益。',
      },
      challenge: {
        en: 'Funds sat idle between payout runs, earning nothing for Orbit or its users.',
        zh: '在两次支付之间，资金处于闲置状态，对 Orbit 与其用户都没有收益。',
      },
      solution: {
        en: 'Unified Labs routed idle balances into transparent, liquid vaults accessible on demand.',
        zh: 'Unified Labs 将闲置余额导入透明、可随时取用的高流动性 Vault。',
      },
      results: {
        en: 'Balances earned yield without sacrificing the liquidity payouts require.',
        zh: '余额在不牺牲支付所需流动性的前提下获得了收益。',
      },
    },
  },
  {
    slug: 'granite-capital',
    name: 'Granite Capital',
    accent: '#94a3b8',
    tag: { en: 'Fund', zh: '基金' },
    relationship: {
      en: 'Allocated treasury capital into underwritten vaults.',
      zh: '将财库资金配置至经承销的 Vault。',
    },
    story: {
      headline: { en: 'Treasury allocation into underwritten vaults', zh: '将财库资金配置至经承销的 Vault' },
      summary: {
        en: 'Granite deployed treasury capital into diversified, onchain-verifiable strategies.',
        zh: 'Granite 将财库资金配置至多元化、链上可验证的策略。',
      },
      challenge: {
        en: 'Granite needed onchain yield meeting institutional standards without custodial risk.',
        zh: 'Granite 需要满足机构标准、又不承担托管风险的链上收益。',
      },
      solution: {
        en: 'Unified Labs structured a diversified allocation with underwriting documentation and dashboards.',
        zh: 'Unified Labs 构建了多元化配置，并提供承销文档与仪表盘。',
      },
      results: {
        en: 'Granite moved to a live allocation, with every exposure auditable onchain.',
        zh: 'Granite 推进至实盘配置，每一笔敞口均可在链上审计。',
      },
    },
  },
  {
    slug: 'summit-family-office',
    name: 'Summit Family Office',
    accent: '#cbd5e1',
    tag: { en: 'Family office', zh: '家族办公室' },
    relationship: {
      en: 'Diversified onchain allocation with onchain reporting.',
      zh: '配套链上报告的多元化链上配置。',
    },
    story: {
      headline: { en: 'Diversified onchain allocation with onchain reporting', zh: '配套链上报告的多元化链上配置' },
      summary: {
        en: 'Summit allocated across vetted strategies with reporting mapped to its process.',
        zh: 'Summit 配置于经审核的多元策略，并配套贴合其流程的报告。',
      },
      challenge: {
        en: 'Summit wanted onchain exposure but required clear reporting and risk oversight.',
        zh: 'Summit 希望获得链上敞口，但要求清晰的报告与风险监督。',
      },
      solution: {
        en: 'Unified Labs built a diversified allocation and reporting aligned to the family office’s process.',
        zh: 'Unified Labs 构建了多元化配置，并提供与该家族办公室流程对齐的报告。',
      },
      results: {
        en: 'Summit gained transparent, diversified onchain exposure with institutional oversight.',
        zh: 'Summit 获得了透明、多元、且具备机构级监督的链上敞口。',
      },
    },
  },
]

// ── Query helpers ──────────────────────────────────────────────────

export function getClients(): Client[] {
  return CLIENTS
}

export function getClientBySlug(slug: string): Client | null {
  return CLIENTS.find((c) => c.slug === slug) ?? null
}

/** Other clients, for the detail page footer. */
export function getRelatedClients(slug: string, limit = 3): Client[] {
  return CLIENTS.filter((c) => c.slug !== slug).slice(0, limit)
}
