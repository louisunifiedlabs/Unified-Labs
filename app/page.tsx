'use client'

import Link from 'next/link'
import { Shield, TrendingUp, Globe, ArrowRight, ChevronDown, Coins } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FluidGridBackground from '@/components/FluidGridBackground'

// Card Component
const Card = ({ title, desc, icon: Icon, features, step }: {
  title: string
  desc: string
  icon: any
  features: string[]
  step: string
}) => (
  <div className="group relative border-l border-white/10 pl-8 py-6 hover:border-white transition-colors duration-500">
    <div className="absolute -left-[5px] top-0 h-0 w-[9px] bg-white group-hover:h-full transition-all duration-700 ease-in-out"></div>

    <div className="flex items-center justify-between mb-5">
      <div className="flex items-center gap-4">
        <span className="text-xs font-mono text-gray-500">0{step}</span>
        <h3 className="text-2xl md:text-3xl font-serif font-bold text-white group-hover:tracking-wide transition-all duration-500">{title}</h3>
      </div>
      <Icon className="text-gray-600 group-hover:text-white transition-colors" size={28} />
    </div>

    <p className="text-gray-400 mb-8 text-base leading-relaxed max-w-sm font-light">
      {desc}
    </p>

    <ul className="space-y-3">
      {features.map((f, i) => (
        <li key={i} className="flex items-center text-xs font-medium text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
          <span className="w-1.5 h-1.5 bg-gray-700 group-hover:bg-white mr-3 rounded-full transition-colors"></span>
          {f}
        </li>
      ))}
    </ul>
  </div>
)


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


      {/* --- CORE BUSINESS --- */}
      <section id="services" className="relative z-10 py-40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-24 flex flex-col md:flex-row justify-between items-end border-b border-white/10 pb-10">
            <h2 className="text-5xl md:text-6xl font-serif font-bold leading-tight">
              The Unified <br /> Architecture
            </h2>
            <p className="text-gray-500 font-mono text-xs uppercase tracking-[0.2em] mt-6 md:mt-0 mb-2">
              Four Pillars of Infrastructure
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-20 gap-y-24">
            <Card
              step="1"
              title="Risk Curator"
              icon={Shield}
              desc="Vault strategy design and risk management for DeFi protocols. Asset screening, parameter optimization, and 24/7 monitoring."
              features={["Vault Curation", "Dynamic Parameter Optimization", "Real-time Risk Monitoring"]}
            />
            <Card
              step="2"
              title="Market Making"
              icon={TrendingUp}
              desc="Liquidity provision for tokenized assets. Spot and derivatives market making across CEX and DEX venues."
              features={["Launch Day Liquidity", "Delta Neutral Strategies", "Cross-Venue Arbitrage"]}
            />
            <Card
              step="3"
              title="Advisory"
              icon={Globe}
              desc="Strategic consulting for RWA tokenization, on-chain treasury management, and DeFi integration."
              features={["RWA Tokenization Strategy", "Treasury Management", "DeFi Integration Consulting"]}
            />
            <Card
              step="4"
              title="Asset Management"
              icon={Coins}
              desc="Bespoke onchain allocation products. Quantitative yield strategies for institutions and family offices."
              features={["Proprietary Quant Strategies", "Customized Mandates", "Institutional Reporting"]}
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
