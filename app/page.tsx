'use client'

import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FluidGridBackground from '@/components/FluidGridBackground'
import NewsPreview from '@/components/NewsPreview'


export default function HomePage() {
  return (
    <div className="bg-black min-h-screen text-white selection:bg-white selection:text-black overflow-x-hidden">
      <FluidGridBackground />
      <Nav />

      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex flex-col justify-center px-6 relative z-10">
        <div className="max-w-7xl mx-auto w-full pt-20">
          <div className="inline-flex items-center gap-3 mb-10 border border-white/10 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-md">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] md:text-xs font-mono text-gray-400 uppercase tracking-[0.2em]">System Status: Active</span>
          </div>

          <div className="mb-12">
            {/* LAYER 1: The Context */}
            <div className="text-sm md:text-lg font-mono text-cyan-400 uppercase tracking-[0.6em] mb-4 md:mb-6 pl-1 opacity-80">
              The layer where
            </div>

            {/* LAYER 2: The Duality - TradFi & DeFi */}
            <div className="flex flex-col md:flex-row items-start md:items-baseline gap-4 md:gap-8 mb-4 md:mb-6">
              {/* TradFi: Solid, Heavy, Serif */}
              <span className="text-6xl md:text-8xl font-serif font-black text-white tracking-tighter drop-shadow-2xl">
                TradFi
              </span>

              {/* Connector */}
              <span className="text-4xl md:text-6xl font-serif italic text-gray-500 px-2 opacity-70 font-light">
                &
              </span>

              {/* DeFi: Hollow, Outline, Glowing */}
              <span
                className="text-6xl md:text-8xl font-sans font-bold text-transparent tracking-tighter"
                style={{
                  WebkitTextStroke: '2px #22d3ee',
                  textShadow: '0 0 25px rgba(34, 211, 238, 0.35)'
                }}
              >
                DeFi
              </span>
            </div>

            {/* LAYER 3: The Fusion */}
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-cyan-500/10 blur-2xl rounded-full transform scale-x-110"></div>
              <span className="relative text-5xl md:text-7xl font-serif italic font-medium text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-cyan-100 to-white tracking-wide mix-blend-overlay opacity-90">
                become one.
              </span>
            </div>
          </div>

          <div className="border-l border-white/20 pl-8 ml-2 mt-12">
            <p className="max-w-xl text-lg md:text-xl text-gray-400 leading-relaxed font-light">
              Unified Labs delivers institutional risk strategies and liquidity infrastructure—optimal onchain allocation for every dollar deployed.
            </p>
          </div>
        </div>

        <div className="absolute bottom-12 left-0 w-full text-center animate-bounce opacity-40">
          <ChevronDown className="mx-auto text-white/50" size={24} />
        </div>
      </section>


      {/* --- NEWS PREVIEW SECTION --- */}
      <section id="news" className="relative z-10 py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 border-b border-white/10 pb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-mono text-gray-500 uppercase tracking-[0.2em]">Latest Updates</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">
                News
              </h2>
            </div>
            <Link
              href="/news"
              className="group flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mt-6 md:mt-0"
            >
              View All
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <NewsPreview />
        </div>
      </section>

      <Footer />
    </div>
  )
}
