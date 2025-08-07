'use client'

import { InnovativeLandingPage } from '@/components/InnovativeLandingPage'
import { AIAssistant } from '@/components/AIAssistant'
import { useLanguage } from '@/hooks/useLanguage'

export default function Home() {
  const { language } = useLanguage()
  
  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950 dark:to-indigo-950 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <InnovativeLandingPage />
      <AIAssistant />
    </div>
  )
}
