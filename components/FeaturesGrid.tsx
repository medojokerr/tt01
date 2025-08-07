'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import { Bot, Shield, Zap, Users, BarChart, Headphones, ArrowRight } from 'lucide-react'

interface FeaturesGridProps {
  scrollY: number
}

export function FeaturesGrid({ scrollY }: FeaturesGridProps) {
  const { language } = useLanguage()
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([])
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const sectionRef = useRef<HTMLDivElement>(null)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'لماذا TeleTransfer؟',
        subtitle: 'مميزات متطورة تجعل نقل الأعضاء سهلاً وآمناً',
        description: 'نحن نقدم حلولاً متقدمة تعتمد على الذكاء الاصطناعي لضمان نقل الأعضاء بأعلى معايير الجودة والأمان',
        aiTitle: 'ذكاء اصطناعي متطور',
        aiDesc: 'تحليل ذكي للأعضاء وفلترة الحقيقيين فقط باستخدام خوارزميات متقدمة',
        securityTitle: 'أمان مطلق',
        securityDesc: 'تشفير عسكري وحماية كاملة للخصوصية مع عدم الحاجة لبيانات تسجيل الدخول',
        speedTitle: 'سرعة فائقة',
        speedDesc: 'نقل آلاف الأعضاء في دقائق معدودة مع ضمان الاستقرار',
        qualityTitle: 'جودة مضمونة',
        qualityDesc: 'معدل نجاح 99.8% مع أعضاء حقيقيين ونشطين فقط',
        analyticsTitle: 'تحليلات ذكية',
        analyticsDesc: 'تقارير مفصلة ورؤى قيمة لتحسين استراتيجيتك',
        supportTitle: 'دعم متميز',
        supportDesc: 'فريق خبراء متاح 24/7 لمساعدتك في كل خطوة',
        learnMore: 'اعرف المزيد'
      },
      en: {
        title: 'Why TeleTransfer?',
        subtitle: 'Advanced features that make member transfer easy and secure',
        description: 'We provide advanced AI-powered solutions to ensure member transfer with the highest standards of quality and security',
        aiTitle: 'Advanced AI',
        aiDesc: 'Smart member analysis and filtering real ones only using advanced algorithms',
        securityTitle: 'Absolute Security',
        securityDesc: 'Military-grade encryption and complete privacy protection without login credentials',
        speedTitle: 'Lightning Speed',
        speedDesc: 'Transfer thousands of members in minutes with guaranteed stability',
        qualityTitle: 'Guaranteed Quality',
        qualityDesc: '99.8% success rate with real and active members only',
        analyticsTitle: 'Smart Analytics',
        analyticsDesc: 'Detailed reports and valuable insights to improve your strategy',
        supportTitle: 'Premium Support',
        supportDesc: 'Expert team available 24/7 to help you every step of the way',
        learnMore: 'Learn More'
      }
    }
    return translations[language][key] || key
  }

  const features = [
    {
      icon: <Bot className="h-8 w-8 text-blue-500" />,
      title: t('aiTitle'),
      description: t('aiDesc'),
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: t('securityTitle'),
      description: t('securityDesc'),
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: <Zap className="h-8 w-8 text-yellow-500" />,
      title: t('speedTitle'),
      description: t('speedDesc'),
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: t('qualityTitle'),
      description: t('qualityDesc'),
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: <BarChart className="h-8 w-8 text-indigo-500" />,
      title: t('analyticsTitle'),
      description: t('analyticsDesc'),
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-500'
    },
    {
      icon: <Headphones className="h-8 w-8 text-pink-500" />,
      title: t('supportTitle'),
      description: t('supportDesc'),
      color: 'pink',
      gradient: 'from-pink-500 to-rose-500'
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleFeatures(prev => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const featureElements = sectionRef.current?.querySelectorAll('[data-index]')
    featureElements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-20 relative overflow-hidden" ref={sectionRef}>
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.05}px) rotate(${scrollY * 0.1}deg)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.03}px) rotate(${scrollY * -0.1}deg)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section - Horizontal Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
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
          
          <div className="relative">
            <div 
              className="w-full h-64 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20 flex items-center justify-center"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            >
              <div className="text-center space-y-4">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto animate-pulse shadow-lg">
                  <Bot className="h-10 w-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold">{language === 'ar' ? 'تقنية متقدمة' : 'Advanced Technology'}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'مدعومة بأحدث تقنيات الذكاء الاصطناعي' : 'Powered by latest AI technologies'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              data-index={index}
              className={`group relative overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm ${
                visibleFeatures[index] ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                transform: `translateY(${scrollY * 0.02 * (index + 1)}px) ${hoveredFeature === index ? 'scale(1.05)' : ''}`
              }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />
              
              <CardContent className="p-8 space-y-6 relative z-10">
                <div className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
                
                {/* Learn More Button */}
                <div className="pt-4">
                  <button className="flex items-center space-x-2 rtl:space-x-reverse text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-300 group-hover:translate-x-2 rtl:group-hover:-translate-x-2">
                    <span>{t('learnMore')}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
            <span>{language === 'ar' ? 'اكتشف جميع المميزات' : 'Discover All Features'}</span>
            <ArrowRight className="h-5 w-5" />
          </div>
        </div>
      </div>
    </section>
  )
}
