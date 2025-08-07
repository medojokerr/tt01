'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useTheme } from 'next-themes'
import { Moon, Sun, Menu, X, Settings } from 'lucide-react'

interface HeaderProps {
  language: 'ar' | 'en'
  onLanguageChange: (lang: 'ar' | 'en') => void
  onAdminAccess: () => void
}

export function Header({ language, onLanguageChange, onAdminAccess }: HeaderProps) {
  const { theme, setTheme } = useTheme()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        home: "الرئيسية",
        features: "المميزات",
        howItWorks: "كيف يعمل",
        contact: "تواصل معنا",
        getStarted: "ابدأ الآن",
        admin: "الإدارة",
      },
      en: {
        home: "Home",
        features: "Features", 
        howItWorks: "How It Works",
        contact: "Contact",
        getStarted: "Get Started",
        admin: "Admin",
      }
    }
    return translations[language][key] || key
  }

  const navLinks = [
    { href: "#hero", label: t("home") },
    { href: "#features", label: t("features") },
    { href: "#how-it-works", label: t("howItWorks") },
    { href: "#contact", label: t("contact") },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="#" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">TT</span>
          </div>
          <span className="text-xl font-bold">TeleTransfer</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
          >
            {language === 'ar' ? 'EN' : 'ع'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={onAdminAccess}
            className="text-xs"
          >
            <Settings className="h-4 w-4" />
          </Button>
          
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600">
            {t("getStarted")}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-sm font-medium hover:text-primary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-2 pt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLanguageChange(language === 'ar' ? 'en' : 'ar')}
              >
                {language === 'ar' ? 'EN' : 'ع'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => { onAdminAccess(); setIsMobileMenuOpen(false); }}
              >
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
