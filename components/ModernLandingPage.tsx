'use client'

import React, { useState, useEffect } from 'react'
import { ModernHeader } from '@/components/ModernHeader'
import { HeroSection } from '@/components/HeroSection'
import { FeaturesGrid } from '@/components/FeaturesGrid'
import { AIShowcase } from '@/components/AIShowcase'
import { ProcessFlow } from '@/components/ProcessFlow'
import { SocialProof } from '@/components/SocialProof'
import { ContactCTA } from '@/components/ContactCTA'
import { FloatingElements } from '@/components/FloatingElements'
import { TransferWizard } from '@/components/TransferWizard'
import { OrderTracking } from '@/components/OrderTracking'
import { useLanguage } from '@/hooks/useLanguage'

type View = 'landing' | 'transfer' | 'tracking'

export function ModernLandingPage() {
  const { language } = useLanguage()
  const [currentView, setCurrentView] = useState<View>('landing')
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleStartTransfer = () => setCurrentView('transfer')
  const handleTrackOrder = () => setCurrentView('tracking')
  const handleBackToLanding = () => setCurrentView('landing')

  if (currentView === 'transfer') {
    return <TransferWizard onBack={handleBackToLanding} />
  }

  if (currentView === 'tracking') {
    return <OrderTracking onBack={handleBackToLanding} />
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <FloatingElements scrollY={scrollY} />
      <ModernHeader />
      
      <main className="relative overflow-hidden">
        <HeroSection 
          onStartTransfer={handleStartTransfer}
          onTrackOrder={handleTrackOrder}
          scrollY={scrollY}
        />
        <FeaturesGrid scrollY={scrollY} />
        <AIShowcase scrollY={scrollY} />
        <ProcessFlow scrollY={scrollY} />
        <SocialProof scrollY={scrollY} />
        <ContactCTA scrollY={scrollY} />
      </main>
    </div>
  )
}
