'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { MessageSquare, X } from 'lucide-react'
import { AIChatbot } from './AIChatbot'
import { useLanguage } from '@/hooks/useLanguage'

interface FloatingChatButtonProps {
  onStartTransfer: () => void
}

export function FloatingChatButton({ onStartTransfer }: FloatingChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        openChat: "Open Chat",
        closeChat: "Close Chat",
      },
      ar: {
        openChat: "افتح الدردشة",
        closeChat: "إغلاق الدردشة",
      },
    }
    return translations[language][key] || key
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 z-50 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
        aria-label={isOpen ? t("closeChat") : t("openChat")}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </Button>
      {isOpen && (
        <AIChatbot onStartTransfer={onStartTransfer} language={language} />
      )}
    </>
  )
}
