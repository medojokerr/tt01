'use client'

import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Zap, Shield, Globe, Heart } from 'lucide-react'

export function Footer() {
  const { language, t } = useLanguage()

  const footerLinks = {
    product: [
      { name: language === 'ar' ? 'المميزات' : 'Features', href: '#features' },
      { name: language === 'ar' ? 'الأسعار' : 'Pricing', href: '#pricing' },
      { name: language === 'ar' ? 'كيف يعمل' : 'How it Works', href: '#how-it-works' },
    ],
    support: [
      { name: language === 'ar' ? 'مركز المساعدة' : 'Help Center', href: '#' },
      { name: language === 'ar' ? 'التوثيق' : 'Documentation', href: '#' },
      { name: language === 'ar' ? 'اتصل بنا' : 'Contact Us', href: '#contact' },
    ],
    legal: [
      { name: language === 'ar' ? 'سياسة الخصوصية' : 'Privacy Policy', href: '#' },
      { name: language === 'ar' ? 'شروط الخدمة' : 'Terms of Service', href: '#' },
      { name: language === 'ar' ? 'ملفات تعريف الارتباط' : 'Cookie Policy', href: '#' },
    ]
  }

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold">TeleTransfer</span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              {t('footer.description')}
            </p>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <Heart className="h-4 w-4 text-red-500" />
              <span>{t('footer.made')}</span>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.product')}</h3>
            <ul className="space-y-2">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <Shield className="h-4 w-4 text-green-500" />
              <span>SSL Secured</span>
            </div>
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-blue-500" />
              <span>{t('footer.global')}</span>
            </div>
          </div>
          <p className="text-sm text-gray-400 mt-4 md:mt-0">
            © 2024 TeleTransfer. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
