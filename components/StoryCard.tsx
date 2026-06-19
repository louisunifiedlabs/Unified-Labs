'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Story } from '@/lib/stories'
import { useLanguage } from '@/lib/language'

export default function StoryCard({ story }: { story: Story }) {
  const { locale, t } = useLanguage()

  return (
    <Link href={`/stories/${story.slug}`} className="group block">
      {/* Image — large, editorial. Swap the gradient for <Image> when assets land. */}
      <div
        className="relative aspect-[16/10] overflow-hidden mb-6"
        style={{
          background: `linear-gradient(160deg, ${story.accent}1f 0%, #0b0b0b 72%)`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-2xl md:text-3xl text-white/60 group-hover:text-white/90 group-hover:scale-[1.03] transition-all duration-700">
            {story.client}
          </span>
        </div>
      </div>

      {/* Copy */}
      <span className="text-[11px] uppercase tracking-[0.22em] text-gray-500">
        {t(`story.cat.${story.category}`)}
      </span>
      <h3 className="mt-3 text-xl md:text-2xl font-serif font-bold leading-snug text-white group-hover:text-gray-300 transition-colors">
        {story.headline[locale]}
      </h3>
      <p className="mt-3 text-gray-400 leading-relaxed line-clamp-2">
        {story.summary[locale]}
      </p>

      {/* Metrics — editorial serif numbers, no chips, no neon */}
      <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-10">
        {story.metrics.slice(0, 2).map((m) => (
          <div key={m.label.en}>
            <div className="text-2xl font-serif font-bold text-white">{m.value}</div>
            <div className="mt-1 text-xs text-gray-500">{m.label[locale]}</div>
          </div>
        ))}
      </div>

      <span className="mt-6 inline-flex items-center gap-2 text-sm text-gray-400 group-hover:text-white transition-colors">
        {t('stories.read')}
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </span>
    </Link>
  )
}
