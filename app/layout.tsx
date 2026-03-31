import type { Metadata } from 'next'
import { headers } from 'next/headers'
import './globals.css'
import { LanguageProvider } from '@/lib/language'

export const metadata: Metadata = {
  title: 'Unified Labs',
  description: 'Unified Labs delivers institutional risk strategies and liquidity infrastructure—optimal onchain allocation for every dollar deployed.',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || ''

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-black min-h-screen text-white selection:bg-white selection:text-black" nonce={nonce}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
