'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { GhostPost, getClientCategory } from '@/lib/ghost'

export default function ClientTile({ post }: { post: GhostPost }) {
  const category = getClientCategory(post)

  return (
    <Link
      href={`/clients/${post.slug}`}
      className="group block border border-white/10 hover:border-white/25 transition-colors overflow-hidden"
    >
      {/* Visual — the post's feature image, or a neutral fallback. */}
      <div className="relative aspect-[16/10] overflow-hidden">
        {post.feature_image ? (
          <Image
            src={post.feature_image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-white/[0.06] to-white/[0.01]">
            <span className="font-serif text-2xl md:text-3xl text-white/70 group-hover:text-white/90 transition-colors duration-700">
              {post.title}
            </span>
          </div>
        )}
        <ArrowUpRight className="absolute top-4 right-4 w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
      </div>

      {/* Copy */}
      <div className="p-6">
        {category && (
          <span className="text-[11px] uppercase tracking-[0.18em] text-gray-500">
            {category.name}
          </span>
        )}
        <h3 className="mt-2 text-lg md:text-xl font-serif font-bold text-white group-hover:text-gray-300 transition-colors">
          {post.title}
        </h3>
        {post.excerpt && (
          <p className="mt-2 text-sm text-gray-400 leading-relaxed line-clamp-2">
            {post.excerpt}
          </p>
        )}
      </div>
    </Link>
  )
}
