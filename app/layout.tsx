import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { LanguageProvider } from '@/hooks/useLanguage'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ 
  subsets: ['latin', 'arabic'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TeleTransfer - نقل أعضاء تليجرام بالذكاء الاصطناعي',
  description: 'أداة ذكية لنقل أعضاء تليجرام بين المجموعات بمعدل نجاح 99.8% وبأمان كامل',
  keywords: 'telegram, member transfer, AI, نقل أعضاء تليجرام, ذكاء اصطناعي',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            {children}
            <Toaster />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
