'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { Bot, Brain, Shield, Zap, Users, BarChart3, Cpu, Target, ArrowRight, CheckCircle } from 'lucide-react'

export function InteractiveFeatures() {
  const { language } = useLanguage()
  const [activeFeature, setActiveFeature] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'قوة الذكاء الاصطناعي المتقدم',
        subtitle: 'اكتشف كيف يعمل وكيلنا الذكي لتحقيق أفضل النتائج',
        aiAnalysis: 'تحليل ذكي',
        aiAnalysisDesc: 'يحلل سلوك الأعضاء ونشاطهم لتحديد الأعضاء الحقيقيين والنشطين فقط',
        smartFilter: 'فلترة متقدمة',
        smartFilterDesc: 'يستبعد الحسابات الوهمية والبوتات ويركز على الأعضاء ذوي القيمة العالية',
        secureTransfer: 'نقل آمن',
        secureTransferDesc: 'يستخدم خوارزميات متقدمة لضمان النقل الآمن دون التعرض للحظر',
        realTimeMonitor: 'مراقبة فورية',
        realTimeMonitorDesc: 'يراقب العملية في الوقت الفعلي ويتكيف مع أي تغييرات تلقائياً',
        smartOptimization: 'تحسين ذكي',
        smartOptimizationDesc: 'يحسن استراتيجية النقل بناءً على البيانات والتجارب السابقة',
        predictiveAnalytics: 'تحليلات تنبؤية',
        predictiveAnalyticsDesc: 'يتنبأ بأفضل أوقات النقل ومعدلات النجاح المتوقعة',
        exploreFeature: 'استكشف المميزة'
      },
      en: {
        title: 'Advanced AI Power',
        subtitle: 'Discover how our smart agent works to achieve the best results',
        aiAnalysis: 'Smart Analysis',
        aiAnalysisDesc: 'Analyzes member behavior and activity to identify only real and active members',
        smartFilter: 'Advanced Filtering',
        smartFilterDesc: 'Excludes fake accounts and bots, focusing on high-value members',
        secureTransfer: 'Secure Transfer',
        secureTransferDesc: 'Uses advanced algorithms to ensure safe transfer without risk of bans',
        realTimeMonitor: 'Real-time Monitoring',
        realTimeMonitorDesc: 'Monitors the process in real-time and adapts to any changes automatically',
        smartOptimization: 'Smart Optimization',
        smartOptimizationDesc: 'Optimizes transfer strategy based on data and previous experiences',
        predictiveAnalytics: 'Predictive Analytics',
        predictiveAnalyticsDesc: 'Predicts optimal transfer times and expected success rates',
        exploreFeature: 'Explore Feature'
      }
    }
    return translations[language][key] || key
  }

  const features = [
    {
      icon: <Brain className="h-8 w-8" />,
      title: t('aiAnalysis'),
      description: t('aiAnalysisDesc'),
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      stats: { accuracy: '99.2%', speed: '2.3s', processed: '15K+' }
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: t('smartFilter'),
      description: t('smartFilterDesc'),
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      stats: { filtered: '98.7%', quality: '95%', saved: '80%' }
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: t('secureTransfer'),
      description: t('secureTransferDesc'),
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      stats: { security: '100%', success: '99.8%', safe: '24/7' }
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: t('realTimeMonitor'),
      description: t('realTimeMonitorDesc'),
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      stats: { uptime: '99.9%', response: '0.1s', alerts: 'Real-time' }
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: t('smartOptimization'),
      description: t('smartOptimizationDesc'),
      color: 'indigo',
      gradient: 'from-indigo-500 to-blue-500',
      stats: { efficiency: '94%', learning: 'AI', improvement: '15%' }
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: t('predictiveAnalytics'),
      description: t('predictiveAnalyticsDesc'),
      color: 'yellow',
      gradient: 'from-yellow-500 to-orange-500',
      stats: { prediction: '96%', timing: 'Optimal', forecast: '7 days' }
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature(prev => (prev + 1) % features.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="features" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400">
              {t('title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className={`group relative overflow-hidden transition-all duration-500 cursor-pointer transform hover:scale-105 ${
                activeFeature === index || hoveredFeature === index
                  ? 'shadow-2xl ring-2 ring-blue-500/50 bg-white dark:bg-gray-800'
                  : 'shadow-lg hover:shadow-xl bg-white/80 dark:bg-gray-800/80'
              }`}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
              onClick={() => setActiveFeature(index)}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
              
              <CardContent className="p-8 relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    {Object.entries(feature.stats).map(([key, value], statIndex) => (
                      <div key={statIndex} className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">{value}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{key}</div>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={`w-full mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gradient-to-r ${feature.gradient} hover:text-white`}
                  >
                    {t('exploreFeature')}
                    <ArrowRight className="h-4 w-4 ml-2 rtl:ml-0 rtl:mr-2" />
                  </Button>
                </div>

                {/* Active Indicator */}
                {activeFeature === index && (
                  <div className="absolute top-4 right-4">
                    <div className={`w-3 h-3 bg-gradient-to-r ${feature.gradient} rounded-full animate-pulse`} />
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Showcase */}
        <div className="mt-16">
          <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <div className={`w-12 h-12 bg-gradient-to-br ${features[activeFeature].gradient} rounded-xl flex items-center justify-center text-white`}>
                      {features[activeFeature].icon}
                    </div>
                    <h3 className="text-2xl font-bold">{features[activeFeature].title}</h3>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                    {features[activeFeature].description}
                  </p>
                  <div className="flex items-center space-x-2 rtl:space-x-reverse text-green-600 dark:text-green-400">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">
                      {language === 'ar' ? 'متاح الآن في النظام' : 'Available Now in System'}
                    </span>
                  </div>
                </div>
                
                {/* Visual Representation */}
                <div className="relative">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{features[activeFeature].title}</span>
                        <span className="text-xs text-green-500 bg-green-100 dark:bg-green-900/30 px-2 py-1 rounded-full">
                          {language === 'ar' ? 'نشط' : 'Active'}
                        </span>
                      </div>
                      <div className="space-y-2">
                        {Object.entries(features[activeFeature].stats).map(([key, value], index) => (
                          <div key={index} className="flex justify-between items-center">
                            <span className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</span>
                            <span className="font-bold">{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${features[activeFeature].gradient} rounded-full animate-pulse`}
                          style={{ width: '85%' }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
