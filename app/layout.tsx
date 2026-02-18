import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Unified Labs',
  description: 'Unified Labs delivers institutional risk strategies and liquidity infrastructure—optimal onchain allocation for every dollar deployed.',
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
