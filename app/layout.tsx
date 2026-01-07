import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unified Labs | Liquidity Engineered',
  description: 'Unified Labs bridges Traditional Finance and DeFi. We curate risk, make markets, and engineer the future of yield.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  )
}
