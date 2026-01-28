'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { Target, Eye, Sparkles, Shield, Handshake } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      title: 'Accessibility',
      description: 'We make complex DeFi strategies simple. Institutional-grade tools shouldn\'t require institutional resources.',
      icon: Sparkles
    },
    {
      title: 'Trust',
      description: 'We build for the long term. Sustainable relationships over short-term gains, always.',
      icon: Handshake
    },
    {
      title: 'Excellence',
      description: 'We pursue optimal allocation, never settling. Every strategy we deploy meets the highest standards.',
      icon: Shield
    }
  ]

  return (
    <div className="bg-black min-h-screen text-white">
      <Nav />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h1 className="text-5xl md:text-7xl font-serif font-bold">
                About us
              </h1>
            </div>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Target className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Our Purpose</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white leading-tight mb-6">
                Our purpose is building the infrastructure for institutional DeFi adoption.
              </h2>
              <div className="flex items-center gap-3 mb-6 mt-12">
                <Eye className="w-5 h-5 text-cyan-400" />
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Our Vision</span>
              </div>
              <p className="text-lg text-gray-400 leading-relaxed">
                We have a vision to bridge traditional finance and decentralized protocols, empowering institutions with the risk management and liquidity tools they need to participate in the future of finance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="w-12 h-1 bg-cyan-400 mb-6"></div>
            <h2 className="text-xs font-mono text-white uppercase tracking-[0.2em]">
              Our Values
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="group">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 border border-white/20 rounded-lg flex items-center justify-center group-hover:border-cyan-400 group-hover:bg-cyan-400/10 transition-all duration-300">
                      <IconComponent className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors" />
                    </div>
                    <h3 className="text-2xl font-serif font-bold text-white">
                      {value.title}
                    </h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white mb-6">
            Ready to optimize your onchain allocation?
          </h2>
          <p className="text-gray-400 text-lg mb-10">
            Get in touch with our team to learn how Unified Labs can help you navigate onchain finance.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold text-sm uppercase tracking-widest hover:bg-gray-200 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
