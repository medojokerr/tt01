'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/hooks/useLanguage'
import { Send, MessageCircle, Mail, Phone, CheckCircle2 } from 'lucide-react'

interface QuickContactProps {
  scrollY: number
}

export function QuickContact({ scrollY }: QuickContactProps) {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'هل لديك أسئلة؟',
        subtitle: 'تواصل معنا وسنرد عليك في أسرع وقت',
        name: 'الاسم',
        email: 'البريد الإلكتروني',
        message: 'رسالتك',
        send: 'إرسال',
        sending: 'جاري الإرسال...',
        success: 'تم إرسال رسالتك بنجاح!',
        successDesc: 'سنتواصل معك خلال ساعة واحدة',
        chat: 'دردشة مباشرة',
        email: 'البريد الإلكتروني',
        phone: 'الهاتف',
        startNow: 'ابدأ الآن مجاناً'
      },
      en: {
        title: 'Have Questions?',
        subtitle: 'Contact us and we\'ll get back to you as soon as possible',
        name: 'Name',
        email: 'Email',
        message: 'Your Message',
        send: 'Send',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        successDesc: 'We\'ll contact you within 1 hour',
        chat: 'Live Chat',
        email: 'Email',
        phone: 'Phone',
        startNow: 'Start Now for Free'
      }
    }
    return translations[language][key] || key
  }

  const contactMethods = [
    {
      icon: <MessageCircle className="h-5 w-5" />,
      title: t('chat'),
      value: language === 'ar' ? 'دردشة فورية' : 'Instant Chat',
      color: 'blue'
    },
    {
      icon: <Mail className="h-5 w-5" />,
      title: t('email'),
      value: 'support@teletransfer.com',
      color: 'green'
    },
    {
      icon: <Phone className="h-5 w-5" />,
      title: t('phone'),
      value: '+1 (555) 123-4567',
      color: 'purple'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 5000)
  }

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
                  {t('title')}
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {t('subtitle')}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 rtl:space-x-reverse p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300"
                  style={{ transform: `translateY(${scrollY * 0.01 * (index + 1)}px)` }}
                >
                  <div className={`w-10 h-10 bg-${method.color}-100 dark:bg-${method.color}-900/30 rounded-lg flex items-center justify-center text-${method.color}-600`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{method.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{method.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-4">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Send className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('startNow')}
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <div 
              className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            >
              {isSubmitted ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-600 mb-2">{t('success')}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{t('successDesc')}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-xl font-semibold mb-2">
                      {language === 'ar' ? 'تواصل معنا' : 'Get in Touch'}
                    </h3>
                  </div>

                  <Input 
                    placeholder={t('name')}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    className="rounded-lg h-12"
                  />
                  
                  <Input 
                    type="email" 
                    placeholder={t('email')}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    className="rounded-lg h-12"
                  />
                  
                  <Textarea 
                    placeholder={t('message')} 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="rounded-lg resize-none"
                  />
                  
                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                        {t('sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                        {t('send')}
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
