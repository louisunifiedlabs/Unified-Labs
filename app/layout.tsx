import type { Metadata } from 'next'
import './globals.css'
import { LanguageProvider } from '@/lib/language'

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
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black min-h-screen text-white selection:bg-white selection:text-black">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
