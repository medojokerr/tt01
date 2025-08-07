'use client'

import React from 'react'
import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturesSection } from '@/components/sections/FeaturesSection'
import { HowItWorksSection } from '@/components/sections/HowItWorksSection'
import { PricingSection } from '@/components/sections/PricingSection'
import { ContactSection } from '@/components/sections/ContactSection'

interface LandingPageProps {
  language: 'ar' | 'en'
  onStartTransfer: () => void
  onTrackOrder: () => void
}

export function LandingPage({ language, onStartTransfer, onTrackOrder }: LandingPageProps) {
  return (
    <div className="space-y-0">
      <HeroSection 
        language={language}
        onStartTransfer={onStartTransfer}
        onTrackOrder={onTrackOrder}
      />
      <FeaturesSection language={language} />
      <HowItWorksSection language={language} />
      <PricingSection language={language} />
      <ContactSection language={language} />
    </div>
  )
}
