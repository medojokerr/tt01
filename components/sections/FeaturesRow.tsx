'use client'

import React from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Bot, Shield, Zap, Users, BarChart3, Headphones } from 'lucide-react'

interface FeaturesRowProps {
  scrollY: number
}

export function FeaturesRow({ scrollY }: FeaturesRowProps) {
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'لماذا نحن الأفضل؟',
        aiTitle: 'ذكاء اصطناعي',
        aiDesc: 'تحليل ذكي للأعضاء',
        securityTitle: 'أمان مطلق',
        securityDesc: 'تشفير عسكري الدرجة',
        speedTitle: 'سرعة فائقة',
        speedDesc: 'نقل آلاف الأعضاء بدقائق',
        qualityTitle: 'جودة مضمونة',
        qualityDesc: 'أعضاء حقيقيون ونشطون',
        analyticsTitle: 'تحليلات ذكية',
        analyticsDesc: 'تقارير مفصلة ورؤى قيمة',
        supportTitle: 'دعم 24/7',
        supportDesc: 'فريق خبراء متاح دائماً'
      },
      en: {
        title: 'Why We\'re The Best?',
        aiTitle: 'AI Powered',
        aiDesc: 'Smart member analysis',
        securityTitle: 'Military Security',
        securityDesc: 'Bank-grade encryption',
        speedTitle: 'Lightning Fast',
        speedDesc: 'Transfer thousands in minutes',
        qualityTitle: 'Quality Assured',
        qualityDesc: 'Real and active members',
        analyticsTitle: 'Smart Analytics',
        analyticsDesc: 'Detailed reports and insights',
        supportTitle: '24/7 Support',
        supportDesc: 'Expert team always available'
      }
    }
    return translations[language][key] || key
  }

  const features = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: t('aiTitle'),
      description: t('aiDesc'),
      color: 'blue'
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: t('securityTitle'),
      description: t('securityDesc'),
      color: 'green'
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('speedTitle'),
      description: t('speedDesc'),
      color: 'yellow'
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('qualityTitle'),
      description: t('qualityDesc'),
      color: 'purple'
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: t('analyticsTitle'),
      description: t('analyticsDesc'),
      color: 'indigo'
    },
    {
      icon: <Headphones className="h-6 w-6" />,
      title: t('supportTitle'),
      description: t('supportDesc'),
      color: 'pink'
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50/50 dark:bg-gray-800/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent dark:from-white dark:to-blue-400">
              {t('title')}
            </span>
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group relative bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ 
                transform: `translateY(${scrollY * 0.01 * (index + 1)}px)`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-start space-x-4 rtl:space-x-reverse">
                <div className={`w-12 h-12 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl flex items-center justify-center text-${feature.color}-600 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
