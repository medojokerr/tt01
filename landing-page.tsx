'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle, Shield, Zap, Users, BarChart, MessageSquare, Palette, Globe, DollarSign, Headphones, Lightbulb, Brain } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'
import { EnhancedTestimonials } from '@/components/EnhancedTestimonials'
import { EnhancedFAQ } from '@/components/EnhancedFAQ'
import { EnhancedAdminFeatures } from '@/components/EnhancedAdminFeatures'
import { cn } from '@/lib/utils'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PaymentMethods } from '@/components/PaymentMethods'
import { Stats } from '@/components/Stats'
import { Features } from '@/components/Features'
import { Dashboard } from '@/components/Dashboard'
import { Footer } from '@/components/Footer'
import { AIChatbot } from '@/components/AIChatbot'
import { CustomizationPanel } from '@/components/CustomizationPanel'
import { NotificationSystem } from '@/components/NotificationSystem'
import { AdminPanel } from '@/components/AdminPanel'
import { OrderTracking } from '@/components/OrderTracking'
import { useLanguage } from '@/hooks/useLanguage'
import { useTheme } from '@/hooks/useTheme'
import { EnhancedStartWizard } from '@/components/EnhancedStartWizard'
import { ContactSection } from '@/components/ContactSection'
import { NewsletterSignup } from '@/components/NewsletterSignup'
import { ProcessSteps } from '@/components/ProcessSteps'
import { TransferForm } from '@/components/TransferForm'
import { SuccessModal } from '@/components/SuccessModal'
import { WhatsAppSupport } from '@/components/WhatsAppSupport'


export default function LandingPage() {
  const { language, setLanguage } = useLanguage()
  const { theme, setTheme } = useTheme()
  const [email, setEmail] = useState('')
  const [activeSection, setActiveSection] = useState('home') // 'home', 'wizard', 'track', 'admin', 'customize', 'dashboard'
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleNewsletterSignup = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Newsletter signup email:', email)
    alert('Thank you for signing up for our newsletter!')
    setEmail('')
  }

  const handleStartWizard = () => setActiveSection('wizard')
  const handleTrackOrder = () => setActiveSection('track')
  const handleAdminPanel = () => setActiveSection('admin')
  const handleCustomize = () => setActiveSection('customize')
  const handleDashboard = () => setActiveSection('dashboard')
  const handleBackToHome = () => setActiveSection('home')

  const handleTransferFormSubmit = () => {
    setShowSuccessModal(true);
  };

  const featureVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <NotificationSystem />
      <Header
        language={language}
        onLanguageChange={setLanguage}
        onAdminPanel={handleAdminPanel}
        onCustomize={handleCustomize}
        onTrackOrder={handleTrackOrder}
        onDashboard={handleDashboard}
      />

      <main className="flex-1">
        {activeSection === 'home' && (
          <>
            <Hero
              language={language}
              onStartTransfer={handleStartWizard}
            />
            <PaymentMethods language={language} />
            <Stats language={language} />
            <Features language={language} />
            <ProcessSteps language={language} />
            <TransferForm language={language} onSubmit={handleTransferFormSubmit} />
            <Dashboard language={language} onStartWizard={handleStartWizard} onTrackOrder={handleTrackOrder} />
            <EnhancedTestimonials language={language} />
            <EnhancedFAQ language={language} />
            <section id="newsletter" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
              <div className="container mx-auto px-4 flex justify-center">
                <NewsletterSignup />
              </div>
            </section>
            <ContactSection />
          </>
        )}

        {activeSection === 'wizard' && (
          <EnhancedStartWizard onBack={handleBackToHome} language={language} />
        )}

        {activeSection === 'track' && (
          <OrderTracking onBack={handleBackToHome} language={language} />
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

        {activeSection === 'dashboard' && (
          <Dashboard onStartWizard={handleStartWizard} onTrackOrder={handleTrackOrder} language={language} />
        )}
      </main>

      <Footer language={language} />
      <AIChatbot onStartTransfer={handleStartWizard} language={language} />
      <WhatsAppSupport language={language} />
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} language={language} />
    </div>
  )
}

// This file seems to be a duplicate or an older version of the main page logic.
// The primary page logic is now handled in app/page.tsx and components/LandingPage.tsx.
// This file will be removed to avoid confusion and redundancy.
// Its content is assumed to be integrated into components/LandingPage.tsx or app/page.tsx.
