'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowRight, MessageSquare, Zap, CheckCircle, BarChart, Clock, Shield, Users } from 'lucide-react'

interface ProcessFlowProps {
  scrollY: number
}

export function ProcessFlow({ scrollY }: ProcessFlowProps) {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'كيف يعمل؟',
        subtitle: 'عملية بسيطة ومؤتمتة من 4 خطوات',
        description: 'نظام متطور يجعل عملية نقل الأعضاء سهلة وآمنة مع ضمان أفضل النتائج',
        step1: 'أدخل البيانات',
        step1Desc: 'رابط المجموعة المصدر والهدف مع عدد الأعضاء المطلوب',
        step1Detail: 'فقط أدخل الروابط وسنتولى الباقي',
        step2: 'تحليل ذكي',
        step2Desc: 'الذكاء الاصطناعي يحلل الأعضاء ويفلتر الحقيقيين',
        step2Detail: 'خوارزميات متطورة تضمن جودة الأعضاء',
        step3: 'نقل آمن',
        step3Desc: 'نقل الأعضاء بطريقة طبيعية وآمنة',
        step3Detail: 'عملية تدريجية تحاكي السلوك الطبيعي',
        step4: 'تقرير مفصل',
        step4Desc: 'احصل على النتائج والتحليلات الشاملة',
        step4Detail: 'تقارير تفصيلية مع إحصائيات دقيقة',
        minutes: 'دقائق',
        automated: 'مؤتمت بالكامل',
        secure: 'آمن 100%'
      },
      en: {
        title: 'How it Works?',
        subtitle: 'Simple automated 4-step process',
        description: 'Advanced system that makes member transfer easy and secure with guaranteed best results',
        step1: 'Enter Details',
        step1Desc: 'Source and target group links with required member count',
        step1Detail: 'Just enter the links and we handle the rest',
        step2: 'Smart Analysis',
        step2Desc: 'AI analyzes members and filters real ones',
        step2Detail: 'Advanced algorithms ensure member quality',
        step3: 'Safe Transfer',
        step3Desc: 'Transfer members naturally and safely',
        step3Detail: 'Gradual process that mimics natural behavior',
        step4: 'Detailed Report',
        step4Desc: 'Get comprehensive results and analytics',
        step4Detail: 'Detailed reports with accurate statistics',
        minutes: 'minutes',
        automated: 'Fully Automated',
        secure: '100% Secure'
      }
    }
    return translations[language][key] || key
  }

  const steps = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: t('step1'),
      description: t('step1Desc'),
      detail: t('step1Detail'),
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      time: '1-2',
      features: [
        { icon: <Clock className="h-4 w-4" />, text: `1-2 ${t('minutes')}` },
        { icon: <Shield className="h-4 w-4" />, text: t('secure') }
      ]
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: t('step2'),
      description: t('step2Desc'),
      detail: t('step2Detail'),
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      time: '3-5',
      features: [
        { icon: <Users className="h-4 w-4" />, text: t('automated') },
        { icon: <CheckCircle className="h-4 w-4" />, text: '99.8% Accuracy' }
      ]
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: t('step3'),
      description: t('step3Desc'),
      detail: t('step3Detail'),
      color: 'green',
      gradient: 'from-green-500 to-emerald-500',
      time: '10-30',
      features: [
        { icon: <Shield className="h-4 w-4" />, text: t('secure') },
        { icon: <Clock className="h-4 w-4" />, text: `10-30 ${t('minutes')}` }
      ]
    },
    {
      icon: <BarChart className="h-6 w-6" />,
      title: t('step4'),
      description: t('step4Desc'),
      detail: t('step4Detail'),
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      time: '1-2',
      features: [
        { icon: <BarChart className="h-4 w-4" />, text: 'Analytics' },
        { icon: <CheckCircle className="h-4 w-4" />, text: 'Complete' }
      ]
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => {
        const next = (prev + 1) % steps.length
        if (next === 0) {
          setCompletedSteps([])
        } else {
          setCompletedSteps(prevCompleted => [...prevCompleted, prev])
        }
        return next
      })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="process" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/3 left-1/3 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.04}px) rotate(${scrollY * 0.02}deg)` }}
        />
        <div 
          className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.02}px) rotate(${scrollY * -0.02}deg)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <Zap className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {t('automated')} • {language === 'ar' ? 'سريع وآمن' : 'Fast & Secure'}
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

            {/* Steps */}
            <div className="space-y-6">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-4 rtl:space-x-reverse p-6 rounded-xl transition-all duration-500 cursor-pointer relative overflow-hidden ${
                    activeStep === index 
                      ? `bg-gradient-to-r ${step.gradient} bg-opacity-10 border-l-4 rtl:border-l-0 rtl:border-r-4 border-${step.color}-500 shadow-lg scale-105` 
                      : completedSteps.includes(index)
                      ? 'bg-green-50 dark:bg-green-900/20 border-l-4 rtl:border-l-0 rtl:border-r-4 border-green-500'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  {/* Background Animation */}
                  {activeStep === index && (
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.gradient} opacity-5 animate-pulse`} />
                  )}

                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 relative z-10 ${
                    activeStep === index 
                      ? `bg-${step.color}-500 text-white shadow-lg scale-110` 
                      : completedSteps.includes(index)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {completedSteps.includes(index) ? <CheckCircle className="h-6 w-6" /> : step.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-lg font-semibold">{step.title}</h4>
                      <span className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full">
                        {step.time} {t('minutes')}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-3">{step.description}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed mb-3">{step.detail}</p>
                    
                    {/* Features */}
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      {step.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center space-x-1 rtl:space-x-reverse text-xs text-gray-500 dark:text-gray-400">
                          {feature.icon}
                          <span>{feature.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-2xl font-bold text-gray-300 dark:text-gray-600 relative z-10">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl p-6">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
                <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                  style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Visual Flow */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-6">
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className={`p-6 text-center transition-all duration-500 transform cursor-pointer ${
                    activeStep === index 
                      ? 'scale-110 shadow-2xl ring-2 ring-blue-500 bg-white dark:bg-gray-800' 
                      : completedSteps.includes(index)
                      ? 'scale-105 shadow-lg ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20'
                      : 'hover:scale-105 hover:shadow-lg bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'
                  }`}
                  style={{ 
                    transform: `translateY(${scrollY * 0.02 * (index + 1)}px) ${
                      activeStep === index ? 'scale(1.1)' : completedSteps.includes(index) ? 'scale(1.05)' : ''
                    }`,
                    opacity: activeStep === index ? 1 : completedSteps.includes(index) ? 0.9 : 0.7
                  }}
                  onClick={() => setActiveStep(index)}
                >
                  <CardContent className="space-y-4">
                    <div className={`w-16 h-16 rounded-xl flex items-center justify-center mx-auto transition-all duration-300 ${
                      activeStep === index
                        ? `bg-gradient-to-r ${step.gradient} text-white shadow-lg`
                        : completedSteps.includes(index)
                        ? 'bg-green-500 text-white'
                        : `bg-${step.color}-100 dark:bg-${step.color}-900/30`
                    }`}>
                      {completedSteps.includes(index) ? <CheckCircle className="h-8 w-8" /> : step.icon}
                    </div>
                    <h3 className="font-semibold text-sm">{step.title}</h3>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">{step.description}</p>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {step.time} {t('minutes')}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Connecting Lines */}
            <div className="absolute inset-0 pointer-events-none">
              <svg className="w-full h-full" viewBox="0 0 400 400">
                <defs>
                  <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" />
                    <stop offset="50%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#10B981" />
                  </linearGradient>
                </defs>
                <path
                  d="M 100 100 Q 200 50 300 100 Q 350 200 300 300 Q 200 350 100 300 Q 50 200 100 100"
                  stroke="url(#flowGradient)"
                  strokeWidth="2"
                  fill="none"
                  strokeDasharray="5,5"
                  className="animate-pulse"
                />
              </svg>
            </div>

            {/* Floating Arrow */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <ArrowRight className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
