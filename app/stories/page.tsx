import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import StoriesHero from '@/components/StoriesHero'
import StoriesContent from '@/components/StoriesContent'

export const metadata = {
  title: 'Stories — Unified Labs',
  description:
    'How exchanges, wallets, fintechs, and institutions deploy capital onchain with Unified Labs.',
}

export default function StoriesPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />
      <StoriesHero />
      <StoriesContent />
      <Footer />
    </div>
  )
}
