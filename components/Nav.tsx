'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { X, Menu } from 'lucide-react'
import Logo from './Logo'

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navItems = [
    { name: 'Services', href: '/#services' },
    { name: 'News', href: '/news' },
    { name: 'Insights', href: '/insights' },
    { name: 'About', href: '/about' },
  ]

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <Logo />
          </Link>

          <div className="hidden md:flex space-x-12 items-center">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-xs md:text-sm font-medium text-gray-400 hover:text-white transition-colors tracking-[0.15em] uppercase"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-2 bg-white text-black font-serif font-bold text-sm hover:bg-gray-200 transition-colors tracking-wide"
            >
              CONTACT US
            </Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute w-full bg-black border-b border-white/10">
          <div className="flex flex-col p-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-lg text-gray-300 font-serif"
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setIsOpen(false)}
              className="inline-block px-6 py-3 bg-white text-black font-serif font-bold text-sm text-center mt-4"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
