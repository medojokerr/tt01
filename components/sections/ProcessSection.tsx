'use client'

import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/hooks/useLanguage'
import { Upload, Cpu, Download, CheckCircle, ArrowRight } from 'lucide-react'

interface ProcessSectionProps {
  scrollY: number
}

export function ProcessSection({ scrollY }: ProcessSectionProps) {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'عملية بسيطة من 3 خطوات',
        step1: 'أدخل البيانات',
        step1Desc: 'أدخل رابط المجموعة المصدر والهدف',
        step2: 'التحليل والمعالجة',
        step2Desc: 'الذكاء الاصطناعي يحلل ويفلتر الأعضاء',
        step3: 'النقل والتقرير',
        step3Desc: 'نقل آمن مع تقرير مفصل',
        minutes: 'دقائق'
      },
      en: {
        title: 'Simple 3-Step Process',
        step1: 'Enter Details',
        step1Desc: 'Enter source and target group links',
        step2: 'Analysis & Processing',
        step2Desc: 'AI analyzes and filters members',
        step3: 'Transfer & Report',
        step3Desc: 'Safe transfer with detailed report',
        minutes: 'minutes'
      }
    }
    return translations[language][key] || key
  }

  const steps = [
    {
      icon: <Upload className="h-8 w-8" />,
      title: t('step1'),
      description: t('step1Desc'),
      time: '1-2',
      color: 'blue'
    },
    {
      icon: <Cpu className="h-8 w-8" />,
      title: t('step2'),
      description: t('step2Desc'),
      time: '3-5',
      color: 'purple'
    },
    {
      icon: <Download className="h-8 w-8" />,
      title: t('step3'),
      description: t('step3Desc'),
      time: '10-30',
      color: 'green'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % steps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="process" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-900 to-purple-600 bg-clip-text text-transparent dark:from-white dark:to-purple-400">
              {t('title')}
            </span>
          </h2>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Step Card */}
              <div 
                className={`relative p-8 rounded-2xl transition-all duration-500 cursor-pointer ${
                  activeStep === index 
                    ? `bg-${step.color}-50 dark:bg-${step.color}-900/20 border-2 border-${step.color}-500 shadow-lg scale-105` 
                    : 'bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 hover:shadow-lg hover:scale-105'
                }`}
                style={{ 
                  transform: `translateY(${scrollY * 0.01 * (index + 1)}px) ${activeStep === index ? 'scale(1.05)' : ''}`,
                }}
                onClick={() => setActiveStep(index)}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-${step.color}-100 dark:bg-${step.color}-900/30 rounded-2xl flex items-center justify-center text-${step.color}-600 mb-6 mx-auto transition-all duration-300 ${
                  activeStep === index ? 'scale-110' : ''
                }`}>
                  {step.icon}
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {step.description}
                  </p>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {step.time} {t('minutes')}
                  </div>
                </div>

                {/* Active Indicator */}
                {activeStep === index && (
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent to-blue-500/5 animate-pulse" />
                )}
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                  <ArrowRight className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-12 max-w-md mx-auto">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>{language === 'ar' ? 'التقدم' : 'Progress'}</span>
            <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
