'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { Play, Pause, RotateCcw, Users, TrendingUp, Shield, Zap, CheckCircle, ArrowRight } from 'lucide-react'

export function InteractiveShowcase() {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "شاهد TeleTransfer في العمل",
        subtitle: "تجربة تفاعلية لكيفية عمل الأداة خطوة بخطوة",
        play: "تشغيل العرض",
        pause: "إيقاف مؤقت",
        restart: "إعادة تشغيل",
        step1: "تحليل المجموعة المصدر",
        step1Desc: "الذكاء الاصطناعي يحلل جميع الأعضاء ويحدد النشطين منهم",
        step2: "فلترة الأعضاء الحقيقيين",
        step2Desc: "إزالة الحسابات الوهمية والبوتات والأعضاء غير النشطين",
        step3: "النقل الآمن والذكي",
        step3Desc: "نقل الأعضاء المختارين إلى مجموعتك بطريقة طبيعية وآمنة",
        step4: "تقرير مفصل",
        step4Desc: "الحصول على تقرير شامل عن العملية والنتائج",
        membersAnalyzed: "عضو تم تحليلهم",
        realMembers: "عضو حقيقي",
        transferred: "تم نقلهم",
        successRate: "معدل النجاح"
      },
      en: {
        title: "Watch TeleTransfer in Action",
        subtitle: "Interactive experience of how the tool works step by step",
        play: "Play Demo",
        pause: "Pause",
        restart: "Restart",
        step1: "Analyze Source Group",
        step1Desc: "AI analyzes all members and identifies active ones",
        step2: "Filter Real Members",
        step2Desc: "Remove fake accounts, bots, and inactive members",
        step3: "Smart & Safe Transfer",
        step3Desc: "Transfer selected members to your group naturally and safely",
        step4: "Detailed Report",
        step4Desc: "Get comprehensive report about the process and results",
        membersAnalyzed: "Members Analyzed",
        realMembers: "Real Members",
        transferred: "Transferred",
        successRate: "Success Rate"
      }
    }
    return translations[language][key] || key
  }

  const steps = [
    {
      title: t('step1'),
      description: t('step1Desc'),
      icon: <Users className="h-6 w-6" />,
      color: 'blue',
      stats: { analyzed: 5000, real: 0, transferred: 0, success: 0 }
    },
    {
      title: t('step2'),
      description: t('step2Desc'),
      icon: <Shield className="h-6 w-6" />,
      color: 'green',
      stats: { analyzed: 5000, real: 4200, transferred: 0, success: 0 }
    },
    {
      title: t('step3'),
      description: t('step3Desc'),
      icon: <Zap className="h-6 w-6" />,
      color: 'purple',
      stats: { analyzed: 5000, real: 4200, transferred: 4150, success: 98.8 }
    },
    {
      title: t('step4'),
      description: t('step4Desc'),
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'orange',
      stats: { analyzed: 5000, real: 4200, transferred: 4150, success: 99.8 }
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
                return prevStep
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

  const handlePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
  }

  const currentStats = steps[currentStep]?.stats || steps[0].stats

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Interactive Demo */}
            <div className="space-y-6">
              <Card className="p-6 bg-white dark:bg-gray-800 shadow-xl">
                <CardContent className="space-y-6">
                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      onClick={handlePlay}
                      className={`px-6 py-3 rounded-xl ${
                        isPlaying 
                          ? 'bg-red-500 hover:bg-red-600' 
                          : 'bg-green-500 hover:bg-green-600'
                      } text-white`}
                    >
                      {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                      {isPlaying ? t('pause') : t('play')}
                    </Button>
                    <Button
                      onClick={handleRestart}
                      variant="outline"
                      className="px-6 py-3 rounded-xl"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      {t('restart')}
                    </Button>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>Step {currentStep + 1} of {steps.length}</span>
                      <span>{Math.round(progress)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Current Step */}
                  <div className="text-center space-y-4">
                    <div className={`w-16 h-16 bg-${steps[currentStep]?.color}-100 dark:bg-${steps[currentStep]?.color}-900/30 rounded-full flex items-center justify-center mx-auto`}>
                      {steps[currentStep]?.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{steps[currentStep]?.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{steps[currentStep]?.description}</p>
                  </div>

                  {/* Live Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{currentStats.analyzed.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('membersAnalyzed')}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{currentStats.real.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('realMembers')}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{currentStats.transferred.toLocaleString()}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('transferred')}</div>
                    </div>
                    <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{currentStats.success}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('successRate')}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Steps Overview */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className={`p-4 transition-all duration-300 ${
                    index === currentStep 
                      ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50 dark:bg-blue-900/20' 
                      : index < currentStep 
                        ? 'bg-green-50 dark:bg-green-900/20' 
                        : 'bg-white dark:bg-gray-800'
                  }`}
                >
                  <CardContent className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      index === currentStep 
                        ? 'bg-blue-500 text-white' 
                        : index < currentStep 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                    }`}>
                      {index < currentStep ? <CheckCircle className="h-6 w-6" /> : step.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{step.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                    </div>
                    {index === currentStep && (
                      <ArrowRight className="h-5 w-5 text-blue-500 animate-pulse" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
