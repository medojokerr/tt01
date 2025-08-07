'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { Bot, Brain, Target, Play, Pause, RotateCcw, Activity, TrendingUp, Users } from 'lucide-react'

interface AIShowcaseProps {
  scrollY: number
}

export function AIShowcase({ scrollY }: AIShowcaseProps) {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [liveStats, setLiveStats] = useState({
    analyzed: 0,
    filtered: 0,
    transferred: 0
  })

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'الذكاء الاصطناعي في العمل',
        subtitle: 'شاهد كيف يعمل الذكاء الاصطناعي على تحليل ونقل الأعضاء بذكاء',
        description: 'تقنية متطورة تحلل سلوك الأعضاء وتفلتر الحقيقيين منهم لضمان أفضل النتائج',
        step1: 'تحليل الأعضاء',
        step1Desc: 'فحص شامل لملفات الأعضاء وأنشطتهم',
        step2: 'فلترة ذكية',
        step2Desc: 'اختيار الأعضاء النشطين والحقيقيين فقط',
        step3: 'نقل آمن',
        step3Desc: 'نقل الأعضاء بطريقة طبيعية وآمنة',
        play: 'تشغيل العرض',
        pause: 'إيقاف',
        restart: 'إعادة تشغيل',
        analyzed: 'تم تحليلهم',
        filtered: 'تم فلترتهم',
        transferred: 'تم نقلهم',
        aiPowered: 'مدعوم بالذكاء الاصطناعي',
        realTime: 'في الوقت الفعلي'
      },
      en: {
        title: 'AI in Action',
        subtitle: 'Watch how AI analyzes and transfers members intelligently',
        description: 'Advanced technology that analyzes member behavior and filters real ones to ensure best results',
        step1: 'Analyze Members',
        step1Desc: 'Comprehensive scan of member profiles and activities',
        step2: 'Smart Filtering',
        step2Desc: 'Select only active and real members',
        step3: 'Safe Transfer',
        step3Desc: 'Transfer members naturally and safely',
        play: 'Play Demo',
        pause: 'Pause',
        restart: 'Restart',
        analyzed: 'Analyzed',
        filtered: 'Filtered',
        transferred: 'Transferred',
        aiPowered: 'AI Powered',
        realTime: 'Real Time'
      }
    }
    return translations[language][key] || key
  }

  const steps = [
    { 
      title: t('step1'), 
      description: t('step1Desc'),
      icon: <Bot className="h-6 w-6" />, 
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500'
    },
    { 
      title: t('step2'), 
      description: t('step2Desc'),
      icon: <Brain className="h-6 w-6" />, 
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500'
    },
    { 
      title: t('step3'), 
      description: t('step3Desc'),
      icon: <Target className="h-6 w-6" />, 
      color: 'green',
      gradient: 'from-green-500 to-emerald-500'
    }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setCurrentStep(prevStep => {
              if (prevStep >= steps.length - 1) {
                setIsPlaying(false)
                return 0
              }
              return prevStep + 1
            })
            return 0
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  // Live stats animation
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveStats(prev => ({
        analyzed: Math.min(prev.analyzed + Math.floor(Math.random() * 50), 5000),
        filtered: Math.min(prev.filtered + Math.floor(Math.random() * 40), 4200),
        transferred: Math.min(prev.transferred + Math.floor(Math.random() * 35), 4100)
      }))
    }, 500)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.03}px) rotate(${scrollY * 0.05}deg)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                <Activity className="h-4 w-4 text-blue-600 animate-pulse" />
                <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">
                  {t('aiPowered')} • {t('realTime')}
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
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-4 rtl:space-x-reverse p-6 rounded-xl transition-all duration-500 cursor-pointer ${
                    currentStep === index 
                      ? `bg-gradient-to-r ${step.gradient} bg-opacity-10 border-l-4 rtl:border-l-0 rtl:border-r-4 border-${step.color}-500 shadow-lg` 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm'
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    currentStep === index 
                      ? `bg-${step.color}-500 text-white shadow-lg scale-110` 
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg font-semibold mb-2">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{step.description}</p>
                    {currentStep === index && (
                      <div className="mt-3">
                        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-gradient-to-r ${step.gradient} transition-all duration-300 rounded-full`}
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {progress.toFixed(0)}% {language === 'ar' ? 'مكتمل' : 'Complete'}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-gray-300 dark:text-gray-600">
                    {index + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isPlaying ? <Pause className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" /> : <Play className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />}
                {isPlaying ? t('pause') : t('play')}
              </Button>
              <Button
                onClick={() => {
                  setIsPlaying(false)
                  setCurrentStep(0)
                  setProgress(0)
                }}
                variant="outline"
                className="px-6 py-3 rounded-xl font-semibold"
              >
                <RotateCcw className="h-4 w-4 mr-2 rtl:mr-0 rtl:ml-2" />
                {t('restart')}
              </Button>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <Card className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl">
              <CardContent className="text-center space-y-8">
                <div 
                  className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto shadow-2xl"
                  style={{ 
                    transform: `translateY(${scrollY * 0.03}px) rotate(${scrollY * 0.1}deg)`,
                    animation: isPlaying ? 'pulse 2s infinite' : 'none'
                  }}
                >
                  <Bot className="h-16 w-16 text-white" />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {language === 'ar' ? 'معالجة الذكاء الاصطناعي' : 'AI Processing'}
                  </h3>
                  
                  {/* Live Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <div className="flex items-center justify-center mb-2">
                        <Users className="h-5 w-5 text-blue-500 mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-blue-600">{liveStats.analyzed.toLocaleString()}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t('analyzed')}</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <div className="flex items-center justify-center mb-2">
                        <Brain className="h-5 w-5 text-purple-500 mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600">{liveStats.filtered.toLocaleString()}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t('filtered')}</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <div className="flex items-center justify-center mb-2">
                        <TrendingUp className="h-5 w-5 text-green-500 mr-1" />
                      </div>
                      <div className="text-2xl font-bold text-green-600">{liveStats.transferred.toLocaleString()}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t('transferred')}</div>
                    </div>
                  </div>

                  {/* Progress Indicator */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>{language === 'ar' ? 'التقدم الإجمالي' : 'Overall Progress'}</span>
                      <span>{Math.round((liveStats.transferred / 5000) * 100)}%</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 rounded-full transition-all duration-1000"
                        style={{ width: `${Math.min((liveStats.transferred / 5000) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
