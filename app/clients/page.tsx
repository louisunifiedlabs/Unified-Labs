import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ClientsHero from '@/components/ClientsHero'
import ClientsShowcase from '@/components/ClientsShowcase'
import { getClientPosts, isGhostConfigured, GhostPost } from '@/lib/ghost'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Clients — Unified Labs',
  description:
    'The asset issuers, platforms, and institutions building with Unified Labs.',
}

export default async function ClientsPage() {
  let posts: GhostPost[] = []
  if (isGhostConfigured()) {
    try {
      posts = await getClientPosts()
    } catch {
      posts = []
    }
  }

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />
      <ClientsHero />
      <ClientsShowcase posts={posts} ghostConfigured={isGhostConfigured()} />
      <Footer />
    </div>
  )
}
