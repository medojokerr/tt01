'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowRight, Play, Users, Zap, Shield, CheckCircle2 } from 'lucide-react'

interface HeroSectionProps {
  onStartTransfer: () => void
  onTrackOrder: () => void
  scrollY: number
}

export function HeroSection({ onStartTransfer, onTrackOrder, scrollY }: HeroSectionProps) {
  const { language } = useLanguage()
  const [animatedCount, setAnimatedCount] = useState(0)

  const t = (key: string) => {
    const translations = {
      ar: {
        badge: 'ذكاء اصطناعي متقدم',
        title: 'انقل أعضاء تليجرام بذكاء',
        subtitle: 'أداة متقدمة تعتمد على الذكاء الاصطناعي لنقل الأعضاء الحقيقيين والنشطين بمعدل نجاح 99.8%',
        startTransfer: 'ابدأ النقل',
        trackOrder: 'تتبع الطلب',
        watchDemo: 'شاهد العرض',
        secure: 'آمن ومشفر',
        fast: 'سريع وموثوق',
        quality: 'جودة مضمونة'
      },
      en: {
        badge: 'Advanced AI Technology',
        title: 'Transfer Telegram Members Intelligently',
        subtitle: 'Advanced AI-powered tool to transfer real and active members with 99.8% success rate',
        startTransfer: 'Start Transfer',
        trackOrder: 'Track Order',
        watchDemo: 'Watch Demo',
        secure: 'Secure & Encrypted',
        fast: 'Fast & Reliable',
        quality: 'Quality Guaranteed'
      }
    }
    return translations[language][key] || key
  }

  const features = [
    { icon: <Shield className="h-4 w-4" />, text: t('secure'), color: 'text-green-600' },
    { icon: <Zap className="h-4 w-4" />, text: t('fast'), color: 'text-blue-600' },
    { icon: <CheckCircle2 className="h-4 w-4" />, text: t('quality'), color: 'text-purple-600' }
  ]

  // Animated counter
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCount(prev => (prev + 1) % 100000)
    }, 80)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Subtle Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-purple-50/50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800"></div>
      
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-blue-100/80 dark:bg-blue-900/30 px-4 py-2 rounded-full">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {t('badge')}
              </span>
            </div>

            {/* Main Title */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400">
                  {t('title')}
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>
            </div>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200/50 dark:border-gray-700/50">
                  <div className={feature.color}>{feature.icon}</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
              <Button
                onClick={onStartTransfer}
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                {t('startTransfer')}
                <ArrowRight className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={onTrackOrder}
                variant="outline"
                size="lg"
                className="px-8 py-4 rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                {t('trackOrder')}
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                className="px-8 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group"
              >
                <Play className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 group-hover:scale-110 transition-transform" />
                {t('watchDemo')}
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Main Card */}
              <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                <div className="text-center space-y-6">
                  {/* AI Icon */}
                  <div 
                    className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg"
                    style={{ transform: `translateY(${scrollY * 0.02}px)` }}
                  >
                    <Users className="h-10 w-10 text-white" />
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        {(animatedCount + 250000).toLocaleString()}+
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'عضو تم نقلهم' : 'Members Transferred'}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">99.8%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'معدل النجاح' : 'Success Rate'}
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{language === 'ar' ? 'معالجة نشطة' : 'Active Processing'}</span>
                      <span>85%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse" style={{ width: '85%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Icons */}
              <div className="absolute -top-4 -left-4 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center animate-bounce shadow-lg">
                <CheckCircle2 className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center animate-bounce delay-300 shadow-lg">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center animate-bounce delay-700 shadow-lg">
                <Shield className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
