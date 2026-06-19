'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Client } from '@/lib/clients'
import { useLanguage } from '@/lib/language'

export default function ClientTile({ client }: { client: Client }) {
  const { locale, t } = useLanguage()
  const hasStory = !!client.story

  const inner = (
    <>
      {/* Logo lockup — placeholder is the name in serif on a faint brand tint.
          Swap this block for <Image src={client.logo} /> when real logos land. */}
      <div
        className="h-14 flex items-center mb-7"
        style={{
          background: `linear-gradient(120deg, ${client.accent}12 0%, transparent 65%)`,
        }}
      >
        <span className="font-serif text-lg md:text-xl leading-tight text-white/85 group-hover:text-white transition-colors">
          {client.name}
        </span>
      </div>

      <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
        {client.tag[locale]}
      </span>
      <p className="mt-2 text-sm text-gray-400 leading-relaxed">
        {client.relationship[locale]}
      </p>

      {hasStory && (
        <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-gray-300 group-hover:text-white transition-colors">
          {t('clients.viewCase')}
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </span>
      )}
    </>
  )

  const className =
    'group flex flex-col border border-white/10 hover:border-white/25 hover:bg-white/[0.02] transition-colors p-7 h-full'

  return hasStory ? (
    <Link href={`/clients/${client.slug}`} className={className}>
      {inner}
    </Link>
  ) : (
    <div className={className}>{inner}</div>
  )
}
