'use client'

import React from 'react'
import Link from 'next/link'
import { Mail, Phone, MessageCircle } from 'lucide-react'

interface FooterProps {
  language: 'ar' | 'en'
}

export function Footer({ language }: FooterProps) {
  const t = (key: string) => {
    const translations = {
      ar: {
        company: "الشركة",
        about: "من نحن",
        privacy: "سياسة الخصوصية",
        terms: "شروط الاستخدام",
        contact: "تواصل معنا",
        support: "الدعم",
        faq: "الأسئلة الشائعة",
        help: "المساعدة",
        social: "وسائل التواصل",
        rights: "جميع الحقوق محفوظة",
        description: "أداة ذكية لنقل أعضاء تليجرام بأمان وكفاءة عالية"
      },
      en: {
        company: "Company",
        about: "About Us",
        privacy: "Privacy Policy",
        terms: "Terms of Service",
        contact: "Contact",
        support: "Support",
        faq: "FAQ",
        help: "Help",
        social: "Social Media",
        rights: "All rights reserved",
        description: "Smart tool for transferring Telegram members safely and efficiently"
      }
    }
    return translations[language][key] || key
  }

  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TT</span>
              </div>
              <span className="text-xl font-bold text-white">TeleTransfer</span>
            </div>
            <p className="text-sm text-gray-400">
              {t("description")}
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t("company")}</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">{t("about")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("privacy")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("terms")}</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t("support")}</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white transition-colors">{t("help")}</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">{t("faq")}</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">{t("contact")}</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">{t("contact")}</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-sm">support@teletransfer.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="h-4 w-4" />
                <span className="text-sm">{language === 'ar' ? 'دردشة مباشرة' : 'Live Chat'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} TeleTransfer. {t("rights")}.
          </p>
        </div>
      </div>
    </footer>
  )
}
