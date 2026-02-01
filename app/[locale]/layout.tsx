import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = params

  if (!routing.locales.includes(locale as 'en' | 'zh')) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  )
}
