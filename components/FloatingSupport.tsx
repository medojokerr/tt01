'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { MessageCircle, X, ArrowUp, Headphones } from 'lucide-react'

export function FloatingSupport() {
  const { language } = useLanguage()
  const [showWhatsApp, setShowWhatsApp] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        whatsapp: 'دعم واتساب',
        message: 'مرحباً! أحتاج مساعدة في نقل أعضاء تليجرام',
        scrollTop: 'العودة للأعلى'
      },
      en: {
        whatsapp: 'WhatsApp Support',
        message: 'Hello! I need help with Telegram member transfer',
        scrollTop: 'Back to Top'
      }
    }
    return translations[language][key] || key
  }

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.pageYOffset > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('message'))
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 space-y-3">
      {/* WhatsApp Support */}
      {showWhatsApp && (
        <div className="relative group">
          <Button
            onClick={handleWhatsAppClick}
            className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
          
          <Button
            onClick={() => setShowWhatsApp(false)}
            variant="ghost"
            size="sm"
            className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-500 hover:bg-gray-600 text-white p-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X className="h-3 w-3" />
          </Button>
          
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-sm font-medium">{t('whatsapp')}</p>
          </div>
        </div>
      )}

      {/* Scroll to Top */}
      {showScrollTop && (
        <div className="group">
          <Button
            onClick={scrollToTop}
            className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-110"
          >
            <ArrowUp className="h-6 w-6" />
          </Button>
          
          <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <p className="text-sm font-medium">{t('scrollTop')}</p>
          </div>
        </div>
      )}
    </div>
  )
}
