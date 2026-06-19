'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getClients } from '@/lib/clients'
import { useLanguage } from '@/lib/language'
import ClientTile from './ClientTile'

export default function ClientsShowcase() {
  const { t } = useLanguage()
  const clients = getClients()

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {clients.map((client) => (
          <ClientTile key={client.slug} client={client} />
        ))}
      </div>

      {/* CTA */}
      <section className="mt-32 text-center border-t border-white/10 pt-20">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
          {t('clients.cta.title')}
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto mb-8 leading-relaxed">
          {t('clients.cta.desc')}
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-8 py-3 bg-white text-black font-serif font-bold text-sm hover:bg-gray-200 transition-colors tracking-wide"
        >
          {t('clients.cta.button')}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
