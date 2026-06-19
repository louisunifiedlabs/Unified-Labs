import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StoryDetail from '@/components/StoryDetail'
import { getStoryBySlug, STORIES } from '@/lib/stories'

export function generateStaticParams() {
  return STORIES.map((s) => ({ slug: s.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const story = getStoryBySlug(decodeURIComponent(params.slug))
  if (!story) return { title: 'Story — Unified Labs' }
  return {
    title: `${story.client} — Unified Labs`,
    description: story.summary.en,
  }
}

export default function StoryDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const story = getStoryBySlug(decodeURIComponent(params.slug))
  if (!story) notFound()

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />
      <StoryDetail story={story} />
      <Footer />
    </div>
  )
}
