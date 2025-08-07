'use client'

import React, { useState } from 'react'
import { Header } from '@/components/Header'
import { HeroSection } from '@/components/HeroSection'
import { AIAgentSection } from '@/components/AIAgentSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { HowItWorksSection } from '@/components/HowItWorksSection'
import { InteractiveShowcase } from '@/components/InteractiveShowcase'
import { ContactSection } from '@/components/ContactSection'
import { SmartTestimonials } from '@/components/SmartTestimonials'
import { InteractiveFAQ } from '@/components/InteractiveFAQ'
import { Footer } from '@/components/Footer'
import { WhatsAppSupport } from '@/components/WhatsAppSupport'
import { ScrollToTop } from '@/components/ScrollToTop'
import { TransferWizard } from '@/components/TransferWizard'
import { OrderTracking } from '@/components/OrderTracking'
import { AdminPanel } from '@/components/AdminPanel'
import { useLanguage } from '@/hooks/useLanguage'

type View = 'landing' | 'transfer' | 'tracking' | 'admin'

export function LandingPage() {
  const { language } = useLanguage()
  const [currentView, setCurrentView] = useState<View>('landing')

  const handleStartTransfer = () => {
    setCurrentView('transfer')
  }

  const handleTrackOrder = () => {
    setCurrentView('tracking')
  }

  const handleBackToLanding = () => {
    setCurrentView('landing')
  }

  const renderView = () => {
    switch (currentView) {
      case 'transfer':
        return <TransferWizard onBack={handleBackToLanding} />
      case 'tracking':
        return <OrderTracking onBack={handleBackToLanding} />
      case 'admin':
        return <AdminPanel onBack={handleBackToLanding} />
      default:
        return (
          <>
            <HeroSection 
              onStartTransfer={handleStartTransfer}
              onTrackOrder={handleTrackOrder}
            />
            <AIAgentSection />
            <FeaturesSection />
            <InteractiveShowcase />
            <HowItWorksSection />
            <SmartTestimonials />
            <InteractiveFAQ />
            <ContactSection />
          </>
        )
    }
  }

  return (
    <div className={`min-h-screen ${language === 'ar' ? 'rtl' : 'ltr'}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <Header onAdminPanel={() => setCurrentView('admin')} />
      
      <main>
        {renderView()}
      </main>
      
      {currentView === 'landing' && <Footer />}
      
      <WhatsAppSupport />
      <ScrollToTop />
    </div>
  )
}
