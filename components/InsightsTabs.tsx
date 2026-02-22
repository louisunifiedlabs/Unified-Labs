'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock } from 'lucide-react'
import { GhostPost, INSIGHT_TABS, TabKey } from '@/lib/ghost'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function getTagLabel(post: GhostPost): string | null {
  if (!post.tags || post.tags.length === 0) return null
  return post.tags[0].name
}

function getTagSlug(post: GhostPost): string | null {
  if (!post.tags || post.tags.length === 0) return null
  return post.tags[0].slug
}

// ── Unified card for all posts ─────────────────────────

function PostCard({ post }: { post: GhostPost }) {
  return (
    <Link href={`/insights/${post.slug}`} className="group block">
      <article className="border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden h-full">
        {post.feature_image ? (
          <div className="relative h-48 md:h-52 overflow-hidden">
            <Image
              src={post.feature_image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4">
              {getTagLabel(post) && (
                <span className="inline-block px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider">
                  {getTagLabel(post)}
                </span>
              )}
            </div>
          </div>
        ) : (
          <div className="relative h-48 md:h-52 bg-gradient-to-br from-white/[0.03] to-white/[0.08] flex items-end overflow-hidden">
            <div className="absolute inset-0 border-b border-white/5" />
            <div className="p-4">
              {getTagLabel(post) && (
                <span className="inline-block px-2 py-0.5 bg-white text-black text-[10px] font-mono uppercase tracking-wider">
                  {getTagLabel(post)}
                </span>
              )}
            </div>
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3" />
              {formatDate(post.published_at)}
            </span>
            {post.reading_time > 0 && (
              <>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3 h-3" />
                  {post.reading_time} min read
                </span>
              </>
            )}
          </div>
          <h3 className="text-lg font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-colors line-clamp-2">
            {post.title}
          </h3>
          {post.excerpt && (
            <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </article>
    </Link>
  )
}

// ── Main component ─────────────────────────────────────

export default function InsightsTabs({ posts }: { posts: GhostPost[] }) {
  const [activeTab, setActiveTab] = useState<TabKey>('all')

  const filtered =
    activeTab === 'all'
      ? posts
      : posts.filter((p) => getTagSlug(p) === activeTab)

  return (
    <>
      {/* Tab Bar */}
      <div className="border-b border-white/10 mb-10 overflow-x-auto">
        <div className="flex gap-0 min-w-max">
          {INSIGHT_TABS.map((tab) => {
            const count =
              tab.key === 'all'
                ? posts.length
                : posts.filter((p) => getTagSlug(p) === tab.key).length
            const isActive = activeTab === tab.key

            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  relative px-5 py-3 text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap
                  ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                `}
              >
                {tab.label}
                <span className={`ml-2 ${isActive ? 'text-gray-400' : 'text-gray-600'}`}>
                  {count}
                </span>
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-white" />
                )}
              </button>
            )
          })}
        </div>
      </div>

      {/* All cards in uniform grid */}
      {filtered.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 border border-white/10">
          <p className="text-gray-400 text-lg font-serif">
            No posts in this category yet
          </p>
          <p className="text-gray-600 mt-2 font-mono text-sm">
            Check back soon for updates
          </p>
        </div>
      )}
    </>
  )
}
