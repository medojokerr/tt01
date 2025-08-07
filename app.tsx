'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PaymentMethods } from '@/components/PaymentMethods'
import { Stats } from '@/components/Stats'
import { Features } from '@/components/Features'
import { Dashboard } from '@/components/Dashboard'
import { Footer } from '@/components/Footer'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { EnhancedStartWizard } from '@/components/EnhancedStartWizard'
import { OrderTracking } from '@/components/OrderTracking'
import { AdminPanel } from '@/components/AdminPanel'
import { AIChatbot } from '@/components/AIChatbot'
import { CustomizationPanel } from '@/components/CustomizationPanel'
import { NotificationSystem } from '@/components/NotificationSystem'
import { useTranslation } from '@/hooks/useTranslation'

// This file seems to be a duplicate or an older version of the main page logic.
// The primary page logic is now handled in app/page.tsx and components/LandingPage.tsx.
// This file will be removed to avoid confusion and redundancy.
// Its content is assumed to be integrated into components/LandingPage.tsx or app/page.tsx.

export default function App() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('home') // 'home', 'wizard', 'track', 'admin', 'customize'

  const handleStartWizard = () => setActiveSection('wizard')
  const handleTrackOrder = () => setActiveSection('track')
  const handleAdminPanel = () => setActiveSection('admin')
  const handleCustomize = () => setActiveSection('customize')
  const handleBackToHome = () => setActiveSection('home')

  const { t } = useTranslation()

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NotificationSystem />
      <Header
        language={language}
        setLanguage={setLanguage}
        theme={theme}
        setTheme={setTheme}
        onAdminPanel={handleAdminPanel}
        onCustomize={handleCustomize}
      />

      <main className="flex-1">
        {activeSection === 'home' && (
          <>
            <Hero
              language={language}
              onStartWizard={handleStartWizard}
              onTrackOrder={handleTrackOrder}
            />
            <PaymentMethods language={language} />
            <Stats language={language} />
            <Features language={language} />
            <Dashboard language={language} onStartWizard={handleStartWizard} onTrackOrder={handleTrackOrder} />
          </>
        )}

        {activeSection === 'wizard' && (
          <EnhancedStartWizard onBack={handleBackToHome} language={language} />
        )}

        {activeSection === 'track' && (
          <OrderTracking onBack={handleBackToHome} />
        )}

        {activeSection === 'admin' && (
          <AdminPanel
            onBack={handleBackToHome}
            onStartWizard={handleStartWizard}
            onTrackOrder={handleTrackOrder}
            language={language}
          />
        )}

        {activeSection === 'customize' && (
          <CustomizationPanel onBack={handleBackToHome} />
        )}
      </main>

      <Footer language={language} />
      <AIChatbot onStartTransfer={handleStartWizard} language={language} />
    </div>
  )
}
