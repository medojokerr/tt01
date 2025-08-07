'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/hooks/useLanguage'
import { Send, MessageCircle, Mail, Phone, Clock, MapPin, CheckCircle, ArrowRight } from 'lucide-react'

interface ContactCTAProps {
  scrollY: number
}

export function ContactCTA({ scrollY }: ContactCTAProps) {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'ابدأ رحلتك الآن',
        subtitle: 'تواصل معنا وسنساعدك في نقل أعضاء مجموعتك بأفضل الطرق',
        description: 'فريق من الخبراء جاهز لمساعدتك في تحقيق أهدافك. نحن نقدم استشارة مجانية لفهم احتياجاتك',
        name: 'الاسم الكامل',
        email: 'البريد الإلكتروني',
        message: 'رسالتك أو استفسارك',
        send: 'إرسال الرسالة',
        sending: 'جاري الإرسال...',
        chat: 'دردشة مباشرة',
        chatDesc: 'متاح 24/7 للرد الفوري',
        email: 'البريد الإلكتروني',
        emailDesc: 'نرد خلال ساعة واحدة',
        phone: 'الهاتف',
        phoneDesc: 'للاستفسارات العاجلة',
        success: 'تم إرسال رسالتك بنجاح!',
        successDesc: 'سنتواصل معك خلال 24 ساعة',
        office: 'المكتب الرئيسي',
        hours: 'ساعات العمل',
        hoursDesc: '24/7 دعم متواصل',
        startNow: 'ابدأ الآن مجاناً',
        freeConsult: 'استشارة مجانية'
      },
      en: {
        title: 'Start Your Journey Now',
        subtitle: 'Contact us and we\'ll help you transfer your group members in the best way',
        description: 'A team of experts ready to help you achieve your goals. We offer free consultation to understand your needs',
        name: 'Full Name',
        email: 'Email Address',
        message: 'Your Message or Inquiry',
        send: 'Send Message',
        sending: 'Sending...',
        chat: 'Live Chat',
        chatDesc: 'Available 24/7 for instant response',
        email: 'Email',
        emailDesc: 'We reply within 1 hour',
        phone: 'Phone',
        phoneDesc: 'For urgent inquiries',
        success: 'Message sent successfully!',
        successDesc: 'We\'ll contact you within 24 hours',
        office: 'Main Office',
        hours: 'Working Hours',
        hoursDesc: '24/7 continuous support',
        startNow: 'Start Now for Free',
        freeConsult: 'Free Consultation'
      }
    }
    return translations[language][key] || key
  }

  const contactMethods = [
    {
      icon: <MessageCircle className="h-6 w-6 text-blue-500" />,
      title: t('chat'),
      description: t('chatDesc'),
      value: language === 'ar' ? 'دردشة فورية' : 'Instant Chat',
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Mail className="h-6 w-6 text-green-500" />,
      title: t('email'),
      description: t('emailDesc'),
      value: 'support@teletransfer.com',
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Phone className="h-6 w-6 text-purple-500" />,
      title: t('phone'),
      description: t('phoneDesc'),
      value: '+1 (555) 123-4567',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsLoading(false)
    setIsSubmitted(true)
    
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 5000)
  }

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.02}px) rotate(${scrollY * 0.01}deg)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.01}px) rotate(${scrollY * -0.01}deg)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <Send className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {t('freeConsult')} • {language === 'ar' ? 'رد سريع' : 'Quick Response'}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {t('title')}
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('subtitle')}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Contact Methods */}
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <div 
                  key={index}
                  className="flex items-center space-x-4 rtl:space-x-reverse p-6 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer"
                  style={{ transform: `translateY(${scrollY * 0.01 * (index + 1)}px)` }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${method.gradient} rounded-xl flex items-center justify-center shadow-lg`}>
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">{method.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{method.description}</p>
                    <p className="text-sm font-medium text-blue-600 dark:text-blue-400">{method.value}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-500 transition-colors" />
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <h5 className="font-medium text-sm">{t('office')}</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Global Remote Team</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 rtl:space-x-reverse p-4 bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm rounded-xl">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <h5 className="font-medium text-sm">{t('hours')}</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400">{t('hoursDesc')}</p>
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Send className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('startNow')}
              </Button>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            <Card 
              className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            >
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="h-8 w-8 text-green-500 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-semibold text-green-600 mb-3">{t('success')}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{t('successDesc')}</p>
                    <div className="flex items-center justify-center space-x-2 rtl:space-x-reverse text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" />
                      <span>{language === 'ar' ? 'متوقع الرد خلال ساعة' : 'Expected reply within 1 hour'}</span>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-semibold mb-2">
                        {language === 'ar' ? 'احصل على استشارة مجانية' : 'Get Free Consultation'}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'املأ النموذج وسنتواصل معك فوراً' : 'Fill the form and we\'ll contact you instantly'}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('name')} *
                      </label>
                      <Input 
                        placeholder={t('name')}
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        required
                        className="rounded-xl border-2 focus:border-blue-500 h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('email')} *
                      </label>
                      <Input 
                        type="email" 
                        placeholder={t('email')}
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                        className="rounded-xl border-2 focus:border-blue-500 h-12 text-base"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('message')} *
                      </label>
                      <Textarea 
                        placeholder={t('message')} 
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                        className="rounded-xl border-2 focus:border-blue-500 resize-none text-base"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 text-lg rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2 rtl:mr-0 rtl:ml-2"></div>
                          {t('sending')}
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2" />
                          {t('send')}
                        </>
                      )}
                    </Button>

                    <div className="text-center pt-4">
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {language === 'ar' 
                          ? 'بإرسال هذا النموذج، أنت توافق على سياسة الخصوصية الخاصة بنا'
                          : 'By submitting this form, you agree to our privacy policy'
                        }
                      </p>
                    </div>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Floating Elements */}
            <div className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce opacity-20" />
            <div className="absolute -bottom-6 -left-6 w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce delay-500 opacity-20" />
          </div>
        </div>
      </div>
    </section>
  )
}
