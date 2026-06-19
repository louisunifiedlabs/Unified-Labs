'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CLIENT_GROUPS, getClientsByGroup } from '@/lib/clients'
import { useLanguage } from '@/lib/language'
import ClientTile from './ClientTile'

export default function ClientsShowcase() {
  const { locale, t } = useLanguage()

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {CLIENT_GROUPS.map((group, i) => {
        const clients = getClientsByGroup(group.key)
        if (clients.length === 0) return null

        return (
          <section key={group.key} className={i === 0 ? '' : 'mt-28'}>
            <div className="max-w-2xl mb-10">
              <h2 className="text-3xl md:text-4xl font-serif font-bold">
                {group.title[locale]}
              </h2>
              <p className="mt-3 text-gray-400 leading-relaxed">
                {group.intro[locale]}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {clients.map((client) => (
                <ClientTile key={client.slug} client={client} />
              ))}
            </div>
          </section>
        )
      })}

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
