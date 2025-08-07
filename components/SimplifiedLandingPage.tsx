'use client'

import React, { useState, useEffect } from 'react'
import { SimpleHeader } from '@/components/SimpleHeader'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesRow } from '@/components/sections/FeaturesRow'
import { ProcessSection } from '@/components/sections/ProcessSection'
import { StatsProof } from '@/components/sections/StatsProof'
import { QuickContact } from '@/components/sections/QuickContact'
import { TransferWizard } from '@/components/TransferWizard'
import { OrderTracking } from '@/components/OrderTracking'
import { useLanguage } from '@/hooks/useLanguage'

type View = 'landing' | 'transfer' | 'tracking'

export function SimplifiedLandingPage() {
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
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <SimpleHeader />
      
      <main className="relative">
        <HeroSection 
          onStartTransfer={handleStartTransfer}
          onTrackOrder={handleTrackOrder}
          scrollY={scrollY}
        />
        <FeaturesRow scrollY={scrollY} />
        <ProcessSection scrollY={scrollY} />
        <StatsProof scrollY={scrollY} />
        <QuickContact scrollY={scrollY} />
      </main>
    </div>
  )
}
