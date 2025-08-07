'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowRight, Play, Sparkles, TrendingUp, Users, Shield, CheckCircle, Star } from 'lucide-react'

interface HeroSectionProps {
  onStartTransfer: () => void
  onTrackOrder: () => void
  scrollY: number
}

export function HeroSection({ onStartTransfer, onTrackOrder, scrollY }: HeroSectionProps) {
  const { language } = useLanguage()
  const [animatedCount, setAnimatedCount] = useState(0)
  const [currentFeature, setCurrentFeature] = useState(0)

  const t = (key: string) => {
    const translations = {
      ar: {
        badge: 'مدعوم بالذكاء الاصطناعي المتقدم',
        title: 'وكيل ذكي لنقل أعضاء تليجرام',
        subtitle: 'اكتشف قوة الذكاء الاصطناعي في نقل الأعضاء الحقيقيين والنشطين إلى مجموعتك بدقة 99.8% وأمان كامل',
        startTransfer: 'ابدأ النقل الذكي',
        trackOrder: 'تتبع طلبك',
        watchDemo: 'شاهد العرض التوضيحي',
        noLogin: 'بدون تسجيل دخول',
        automated: 'عملية آلية بالكامل',
        secure: 'آمن ومشفر 100%',
        trustedBy: 'موثوق من قبل أكثر من 15,000 مستخدم حول العالم',
        membersTransferred: 'عضو تم نقلهم',
        successRate: 'معدل النجاح',
        activeUsers: 'مستخدم نشط'
      },
      en: {
        badge: 'Powered by Advanced AI',
        title: 'Smart Agent for Telegram Member Transfer',
        subtitle: 'Discover the power of AI in transferring real and active members to your group with 99.8% accuracy and complete security',
        startTransfer: 'Start Smart Transfer',
        trackOrder: 'Track Your Order',
        watchDemo: 'Watch Demo',
        noLogin: 'No login required',
        automated: 'Fully automated process',
        secure: '100% secure & encrypted',
        trustedBy: 'Trusted by 15,000+ users worldwide',
        membersTransferred: 'Members Transferred',
        successRate: 'Success Rate',
        activeUsers: 'Active Users'
      }
    }
    return translations[language][key] || key
  }

  const features = [
    { icon: <Users className="h-5 w-5 text-blue-500" />, text: language === 'ar' ? 'تحليل ذكي للأعضاء' : 'Smart Member Analysis' },
    { icon: <Shield className="h-5 w-5 text-green-500" />, text: language === 'ar' ? 'خصوصية كاملة' : 'Complete Privacy' },
    { icon: <TrendingUp className="h-5 w-5 text-purple-500" />, text: language === 'ar' ? 'أعضاء حقيقيون فقط' : 'Real Members Only' },
    { icon: <Sparkles className="h-5 w-5 text-yellow-500" />, text: language === 'ar' ? 'سرعة البرق' : 'Lightning Fast' },
  ]

  const highlights = [
    t('noLogin'),
    t('automated'),
    t('secure')
  ]

  // Animated counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCount(prev => (prev + 1) % 100000)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  // Rotating features
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature(prev => (prev + 1) % features.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translateY(${scrollY * 0.1}px)` }}
        />
        <div 
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translateY(${scrollY * -0.1}px)` }}
        />
        <div 
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-green-500/10 rounded-full blur-2xl animate-bounce delay-500"
          style={{ transform: `translateY(${scrollY * 0.05}px)` }}
        />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Animated Badge */}
            <div className="animate-fade-in">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-blue-200 dark:border-blue-800 px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300">
                <Sparkles className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {t('badge')}
                </span>
              </div>
            </div>

            {/* Main Title with Gradient Animation */}
            <div className="space-y-6 animate-slide-up">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
                  {t('title')}
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl">
                {t('subtitle')}
              </p>
            </div>

            {/* Highlights with Animation */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 text-sm animate-fade-in delay-500">
              {highlights.map((highlight, index) => (
                <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse bg-green-50 dark:bg-green-900/20 px-4 py-2 rounded-full border border-green-200 dark:border-green-800 hover:scale-105 transition-transform duration-300">
                  <CheckCircle className="h-4 w-4 text-green-500 animate-pulse" />
                  <span className="text-green-700 dark:text-green-300 font-medium">{highlight}</span>
                </div>
              ))}
            </div>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4 animate-fade-in delay-700">
              <Button
                onClick={onStartTransfer}
                size="lg"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                {t('startTransfer')}
                <ArrowRight className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform duration-300" />
              </Button>
              <Button
                onClick={onTrackOrder}
                variant="outline"
                size="lg"
                className="px-8 py-4 text-lg font-semibold rounded-xl border-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 hover:border-blue-500"
              >
                {t('trackOrder')}
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="group px-8 py-4 text-lg font-semibold rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <Play className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 group-hover:scale-110 transition-transform duration-300" />
                {t('watchDemo')}
              </Button>
            </div>

            {/* Trust Indicator with Stars Animation */}
            <div className="pt-8 flex items-center justify-center lg:justify-start space-x-2 rtl:space-x-reverse animate-fade-in delay-1200">
              <div className="flex -space-x-1 rtl:space-x-reverse">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star 
                    key={i} 
                    className={`h-5 w-5 text-yellow-400 fill-current animate-pulse`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 ml-3 rtl:ml-0 rtl:mr-3">
                {t('trustedBy')}
              </p>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-white/10 dark:bg-gray-800/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 dark:border-gray-700/20 shadow-2xl">
              {/* Floating Icons */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center animate-bounce shadow-lg">
                <Users className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center animate-bounce delay-300 shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center animate-bounce delay-700 shadow-lg">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>

              {/* Live Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {(animatedCount + 250000).toLocaleString()}+
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('membersTransferred')}</div>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center">
                  <div className="text-3xl font-bold text-green-600 mb-2">99.8%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('successRate')}</div>
                </div>
                <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 dark:border-gray-700/50 text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-2">15,000+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{t('activeUsers')}</div>
                </div>
              </div>

              {/* Main Visual */}
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div 
                    className="w-24 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-lg"
                    style={{ transform: `rotate(${scrollY * 0.1}deg)` }}
                  >
                    <Sparkles className="h-12 w-12 text-white" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-lg font-semibold">{language === 'ar' ? 'معالجة الذكاء الاصطناعي' : 'AI Processing'}</div>
                    <div className="w-48 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mx-auto">
                      <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {language === 'ar' ? 'تحليل الأعضاء...' : 'Analyzing members...'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rotating Features Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className={`flex flex-col items-center space-y-3 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-gray-200/50 dark:border-gray-700/50 transition-all duration-500 transform hover:scale-105 ${
                      index === currentFeature ? 'ring-2 ring-blue-500 shadow-lg' : ''
                    }`}
                  >
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg">
                      {feature.icon}
                    </div>
                    <span className="text-xs font-medium text-center">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
