'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  language: 'en' | 'ar'
  setLanguage: (lang: 'en' | 'ar') => void
}

export function LanguageToggle({ language, setLanguage }: LanguageToggleProps) {
  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en')
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleLanguage} 
      aria-label="Toggle Language"
      className="relative"
    >
      <Globe className="h-5 w-5 text-gray-600 dark:text-gray-300" />
      <span className="absolute -top-1 -right-1 text-xs font-bold text-primary">
        {language.toUpperCase()}
      </span>
      <span className="sr-only">Toggle language</span>
    </Button>
  )
}
