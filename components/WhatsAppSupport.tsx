'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { MessageCircle, X } from 'lucide-react'

export function WhatsAppSupport() {
  const { language } = useLanguage()
  const [isVisible, setIsVisible] = useState(true)

  const t = (key: string) => {
    const translations = {
      ar: {
        support: 'دعم واتساب',
        message: 'مرحباً! أحتاج مساعدة في نقل أعضاء تليجرام'
      },
      en: {
        support: 'WhatsApp Support',
        message: 'Hello! I need help with Telegram member transfer'
      }
    }
    return translations[language][key] || key
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(t('message'))
    const whatsappUrl = `https://wa.me/1234567890?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        <Button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
        
        <Button
          onClick={() => setIsVisible(false)}
          variant="ghost"
          size="sm"
          className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gray-500 hover:bg-gray-600 text-white p-0"
        >
          <X className="h-3 w-3" />
        </Button>
        
        <div className="absolute bottom-16 right-0 bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 whitespace-nowrap">
          <p className="text-sm font-medium">{t('support')}</p>
        </div>
      </div>
    </div>
  )
}
