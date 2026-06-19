'use client'

import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Story } from '@/lib/stories'
import { useLanguage } from '@/lib/language'

export default function StoryCard({ story }: { story: Story }) {
  const { locale, t } = useLanguage()

  return (
    <Link href={`/stories/${story.slug}`} className="group block h-full">
      <article className="border border-white/10 hover:border-cyan-500/30 transition-all duration-300 overflow-hidden h-full flex flex-col">
        {/* Visual — placeholder branded gradient (swap for <Image> when assets land) */}
        <div
          className="relative h-44 overflow-hidden flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${story.accent}26 0%, ${story.accent}08 60%, transparent 100%)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          <span className="relative font-serif font-bold text-2xl text-white/90 group-hover:scale-105 transition-transform duration-500">
            {story.client}
          </span>
          <span className="absolute top-4 left-4 px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider">
            {t(`story.cat.${story.category}`)}
          </span>
          <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-white/40 group-hover:text-cyan-400 transition-colors" />
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
            {story.headline[locale]}
          </h3>
          <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed mb-4">
            {story.summary[locale]}
          </p>

          {/* Metric chips — the distinguishing element vs a plain post card */}
          <div className="flex flex-wrap gap-2 mt-auto">
            {story.metrics.slice(0, 2).map((m) => (
              <span
                key={m.label.en}
                className="px-2.5 py-1 border border-white/10 text-xs font-mono"
              >
                <span className="text-cyan-400">{m.value}</span>{' '}
                <span className="text-gray-500">{m.label[locale]}</span>
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  )
}
