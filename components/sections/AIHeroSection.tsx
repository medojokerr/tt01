'use client'

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowRight, Play, Sparkles, Bot, Users, Zap, Shield, CheckCircle2, TrendingUp, Brain } from 'lucide-react'

interface AIHeroSectionProps {
  onStartTransfer: () => void
  onTrackOrder: () => void
  mousePosition: { x: number; y: number }
}

export function AIHeroSection({ onStartTransfer, onTrackOrder, mousePosition }: AIHeroSectionProps) {
  const { language } = useLanguage()
  const [aiThinking, setAiThinking] = useState(false)
  const [currentStat, setCurrentStat] = useState(0)
  const [typedText, setTypedText] = useState('')

  const t = (key: string) => {
    const translations = {
      ar: {
        aiPowered: 'مدعوم بالذكاء الاصطناعي',
        title: 'وكيل ذكي لنقل أعضاء تليجرام',
        subtitle: 'تقنية ثورية تحلل وتنقل الأعضاء الحقيقيين بذكاء فائق ومعدل نجاح 99.9%',
        startTransfer: 'ابدأ النقل الذكي',
        trackOrder: 'تتبع العملية',
        watchDemo: 'شاهد العرض',
        aiAnalyzing: 'الذكاء الاصطناعي يحلل...',
        smartFeature1: 'تحليل ذكي للأعضاء',
        smartFeature2: 'نقل آمن ومشفر',
        smartFeature3: 'سرعة فائقة',
        smartFeature4: 'دقة 99.9%'
      },
      en: {
        aiPowered: 'AI-Powered Technology',
        title: 'Smart Agent for Telegram Member Transfer',
        subtitle: 'Revolutionary technology that intelligently analyzes and transfers real members with superior AI and 99.9% success rate',
        startTransfer: 'Start Smart Transfer',
        trackOrder: 'Track Process',
        watchDemo: 'Watch Demo',
        aiAnalyzing: 'AI is analyzing...',
        smartFeature1: 'Smart Member Analysis',
        smartFeature2: 'Secure & Encrypted',
        smartFeature3: 'Lightning Fast',
        smartFeature4: '99.9% Accuracy'
      }
    }
    return translations[language][key] || key
  }

  const stats = [
    { value: '250K+', label: language === 'ar' ? 'عضو تم نقلهم' : 'Members Transferred', icon: <Users className="h-4 w-4" /> },
    { value: '99.9%', label: language === 'ar' ? 'معدل النجاح' : 'Success Rate', icon: <TrendingUp className="h-4 w-4" /> },
    { value: '15K+', label: language === 'ar' ? 'عميل سعيد' : 'Happy Clients', icon: <CheckCircle2 className="h-4 w-4" /> },
    { value: '24/7', label: language === 'ar' ? 'دعم متواصل' : 'Support Available', icon: <Shield className="h-4 w-4" /> }
  ]

  const features = [
    { icon: <Brain className="h-5 w-5" />, text: t('smartFeature1'), color: 'text-blue-500' },
    { icon: <Shield className="h-5 w-5" />, text: t('smartFeature2'), color: 'text-green-500' },
    { icon: <Zap className="h-5 w-5" />, text: t('smartFeature3'), color: 'text-yellow-500' },
    { icon: <CheckCircle2 className="h-5 w-5" />, text: t('smartFeature4'), color: 'text-purple-500' }
  ]

  // Typing animation
  useEffect(() => {
    const text = t('title')
    let index = 0
    const timer = setInterval(() => {
      if (index <= text.length) {
        setTypedText(text.slice(0, index))
        index++
      } else {
        clearInterval(timer)
      }
    }, 100)
    return () => clearInterval(timer)
  }, [language])

  // Stats rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat(prev => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // AI thinking simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setAiThinking(prev => !prev)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ 
            left: `${20 + mousePosition.x * 0.01}%`, 
            top: `${10 + mousePosition.y * 0.01}%`,
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ 
            right: `${15 + mousePosition.x * 0.008}%`, 
            bottom: `${20 + mousePosition.y * 0.008}%`,
            transform: 'translate(50%, 50%)'
          }}
        />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* AI Badge */}
            <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 px-4 py-2 rounded-full border border-blue-200/50 dark:border-blue-700/50">
              <div className="relative">
                <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                {aiThinking && <div className="absolute inset-0 animate-ping">
                  <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>}
              </div>
              <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                {t('aiPowered')}
              </span>
            </div>

            {/* Main Title with Typing Effect */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
                <span className="bg-gradient-to-r from-gray-900 via-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-white dark:via-blue-400 dark:to-purple-400">
                  {typedText}
                  <span className="animate-pulse">|</span>
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-2xl">
                {t('subtitle')}
              </p>
            </div>

            {/* Smart Features */}
            <div className="grid grid-cols-2 gap-3">
              {features.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-center space-x-2 rtl:space-x-reverse bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-3 rounded-xl border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  <div className={feature.color}>{feature.icon}</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-6">
              <Button
                onClick={onStartTransfer}
                size="lg"
                className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 hover:from-blue-700 hover:via-purple-700 hover:to-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group transform hover:scale-105"
              >
                <Bot className="h-5 w-5 mr-2 rtl:mr-0 rtl:ml-2 group-hover:animate-pulse" />
                {t('startTransfer')}
                <ArrowRight className="h-5 w-5 ml-2 rtl:ml-0 rtl:mr-2 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
              </Button>
              
              <Button
                onClick={onTrackOrder}
                variant="outline"
                size="lg"
                className="px-8 py-4 rounded-xl border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300 hover:scale-105"
              >
                <TrendingUp className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('trackOrder')}
              </Button>
              
              <Button
                variant="ghost"
                size="lg"
                className="px-8 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 group hover:scale-105"
              >
                <Play className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2 group-hover:scale-110 transition-transform" />
                {t('watchDemo')}
              </Button>
            </div>
          </div>

          {/* AI Dashboard */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-lg">
              {/* Main AI Dashboard */}
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-0 shadow-2xl rounded-3xl overflow-hidden">
                <CardContent className="p-8">
                  {/* AI Status */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center">
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse border-2 border-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">AI Agent</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {aiThinking ? t('aiAnalyzing') : 'Ready to Transfer'}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-500">Online</div>
                    </div>
                  </div>

                  {/* Live Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {stats.map((stat, index) => (
                      <div 
                        key={index}
                        className={`text-center p-4 rounded-xl transition-all duration-500 ${
                          currentStat === index 
                            ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-500 scale-105' 
                            : 'bg-gray-50 dark:bg-gray-700/50'
                        }`}
                      >
                        <div className="flex items-center justify-center mb-2">
                          {stat.icon}
                        </div>
                        <div className="text-2xl font-bold text-gray-900 dark:text-white">
                          {stat.value}
                        </div>
                        <div className="text-xs text-gray-600 dark:text-gray-400">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* AI Processing Visualization */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{language === 'ar' ? 'معالجة ذكية نشطة' : 'Smart Processing Active'}</span>
                      <span>92%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-600 rounded-full animate-pulse" style={{ width: '92%' }}></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                      <span>{language === 'ar' ? 'تحليل الأعضاء' : 'Analyzing Members'}</span>
                      <span>{language === 'ar' ? 'فلترة ذكية' : 'Smart Filtering'}</span>
                      <span>{language === 'ar' ? 'نقل آمن' : 'Safe Transfer'}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Floating Elements */}
              <div className="absolute -top-6 -left-6 w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center animate-bounce shadow-lg">
                <CheckCircle2 className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -top-6 -right-6 w-12 h-12 bg-blue-500 rounded-2xl flex items-center justify-center animate-bounce delay-300 shadow-lg">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-purple-500 rounded-2xl flex items-center justify-center animate-bounce delay-700 shadow-lg">
                <Brain className="h-6 w-6 text-white" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center animate-bounce delay-1000 shadow-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
