'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Client } from '@/lib/clients'
import { useLanguage } from '@/lib/language'

export default function ClientTile({ client }: { client: Client }) {
  const { locale } = useLanguage()

  return (
    <Link
      href={`/clients/${client.slug}`}
      className="group block border border-white/10 hover:border-white/25 transition-colors overflow-hidden"
    >
      {/* Visual — placeholder is the name in serif on a faint brand tint.
          Swap this block for <Image src={client.logo} /> when logos land. */}
      <div
        className="relative aspect-[16/10] flex items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(150deg, ${client.accent}1f 0%, #0b0b0b 72%)`,
        }}
      >
        <span className="font-serif text-2xl md:text-3xl text-white/70 group-hover:text-white/90 group-hover:scale-[1.03] transition-all duration-700">
          {client.name}
        </span>
        <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
      </div>

      {/* Copy */}
      <div className="p-6">
        <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
          {client.tag[locale]}
        </span>
        <p className="mt-2 text-base text-gray-300 leading-relaxed group-hover:text-white transition-colors">
          {client.relationship[locale]}
        </p>
      </div>
    </Link>
  )
}
