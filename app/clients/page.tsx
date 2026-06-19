import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ClientsHero from '@/components/ClientsHero'
import ClientsShowcase from '@/components/ClientsShowcase'

export const metadata = {
  title: 'Clients — Unified Labs',
  description:
    'The asset issuers, platforms, and institutions building with Unified Labs.',
}

export default function ClientsPage() {
  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />
      <ClientsHero />
      <ClientsShowcase />
      <Footer />
    </div>
  )
}
