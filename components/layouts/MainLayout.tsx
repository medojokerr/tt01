'use client'

import React from 'react'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { WhatsAppSupport } from '@/components/common/WhatsAppSupport'
import { ScrollToTop } from '@/components/common/ScrollToTop'

interface MainLayoutProps {
  children: React.ReactNode
  language: 'ar' | 'en'
  onLanguageChange: (lang: 'ar' | 'en') => void
  onAdminAccess: () => void
  showNavigation?: boolean
}

export function MainLayout({ 
  children, 
  language, 
  onLanguageChange, 
  onAdminAccess,
  showNavigation = true 
}: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {showNavigation && (
        <Header 
          language={language}
          onLanguageChange={onLanguageChange}
          onAdminAccess={onAdminAccess}
        />
      )}
      
      <main className="flex-1">
        {children}
      </main>
      
      {showNavigation && <Footer language={language} />}
      
      <WhatsAppSupport language={language} />
      <ScrollToTop />
    </div>
  )
}
