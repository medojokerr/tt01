'use client'

import React, { useState, useEffect } from 'react'
import { SmartHeader } from '@/components/SmartHeader'
import { AIHeroSection } from '@/components/sections/AIHeroSection'
import { InteractiveFeatures } from '@/components/sections/InteractiveFeatures'
import { LiveDemoSection } from '@/components/sections/LiveDemoSection'
import { SmartPricingCalculator } from '@/components/sections/SmartPricingCalculator'
import { IntelligentFAQ } from '@/components/sections/IntelligentFAQ'
import { TransferWizard } from '@/components/TransferWizard'
import { OrderTracking } from '@/components/OrderTracking'
import { useLanguage } from '@/hooks/useLanguage'

type View = 'landing' | 'transfer' | 'tracking'

export function InnovativeLandingPage() {
  const { language } = useLanguage()
  const [currentView, setCurrentView] = useState<View>('landing')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight
      const currentProgress = (window.pageYOffset / totalScroll) * 100
      setScrollProgress(currentProgress)
    }

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
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
    <div className="relative min-h-screen overflow-hidden">
      {/* Dynamic Background */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
        }}
      />
      
      {/* Scroll Progress */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 dark:bg-gray-800 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <SmartHeader />
      
      <main className="relative z-10">
        <AIHeroSection 
          onStartTransfer={handleStartTransfer}
          onTrackOrder={handleTrackOrder}
          mousePosition={mousePosition}
        />
        <InteractiveFeatures />
        <LiveDemoSection />
        <SmartPricingCalculator />
        <IntelligentFAQ />
      </main>
    </div>
  )
}
