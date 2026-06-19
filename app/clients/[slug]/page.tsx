import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ClientArticle from '@/components/ClientArticle'
import {
  getPostBySlug,
  getClientPosts,
  isClientPost,
  getPostLocale,
  isGhostConfigured,
  GhostPost,
} from '@/lib/ghost'

export const dynamic = 'force-dynamic'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  if (!isGhostConfigured()) return { title: 'Client — Unified Labs' }
  const post = await getPostBySlug(decodeURIComponent(params.slug))
  if (!post) return { title: 'Client — Unified Labs' }
  return {
    title: `${post.title} — Unified Labs`,
    description: post.excerpt ?? undefined,
  }
}

export default async function ClientDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = decodeURIComponent(params.slug)

  const post = isGhostConfigured() ? await getPostBySlug(slug) : null
  // Only render posts that are actually client showcase entries.
  if (!post || !isClientPost(post)) notFound()

  // Related: other clients in the same language.
  const localeTag = getPostLocale(post)
  let related: GhostPost[] = []
  try {
    const all = await getClientPosts()
    related = all
      .filter(
        (p) =>
          p.slug !== post.slug &&
          (!localeTag || p.tags?.some((t) => t.slug === localeTag))
      )
      .slice(0, 3)
  } catch {
    related = []
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />
      <ClientArticle post={post} related={related} />
      <Footer />
    </div>
  )
}
