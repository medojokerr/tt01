'use client'

import React from 'react'
import { MessageCircle } from 'lucide-react'

interface WhatsAppSupportProps {
  language: 'ar' | 'en'
}

export function WhatsAppSupport({ language }: WhatsAppSupportProps) {
  const t = (key: string) => {
    const translations = {
      ar: {
        support: "دعم واتساب",
        message: "مرحبا، أحتاج مساعدة في TeleTransfer"
      },
      en: {
        support: "WhatsApp Support",
        message: "Hello, I need help with TeleTransfer"
      }
    }
    return translations[language][key] || key
  }

  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890" // Replace with actual number
    const message = encodeURIComponent(t("message"))
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappUrl, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-4 left-4 z-50 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
      title={t("support")}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}
