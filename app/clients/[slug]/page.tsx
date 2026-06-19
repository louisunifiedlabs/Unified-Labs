import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ClientStory from '@/components/ClientStory'
import { getClientBySlug, getClients } from '@/lib/clients'

export function generateStaticParams() {
  return getClients().map((c) => ({ slug: c.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const client = getClientBySlug(decodeURIComponent(params.slug))
  if (!client) return { title: 'Client — Unified Labs' }
  return {
    title: `${client.name} — Unified Labs`,
    description: client.story.summary.en,
  }
}

export default function ClientDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const client = getClientBySlug(decodeURIComponent(params.slug))
  if (!client) notFound()

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />
      <ClientStory client={client} />
      <Footer />
    </div>
  )
}
