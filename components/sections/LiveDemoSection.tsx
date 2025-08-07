'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/hooks/useLanguage'
import { Play, Pause, RotateCcw, Users, Bot, CheckCircle, AlertCircle, TrendingUp, Zap } from 'lucide-react'

export function LiveDemoSection() {
  const { language } = useLanguage()
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)
  const [demoData, setDemoData] = useState({
    sourceGroup: '',
    targetGroup: '',
    membersFound: 0,
    membersFiltered: 0,
    membersTransferred: 0
  })

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'شاهد الوكيل الذكي في العمل',
        subtitle: 'تجربة تفاعلية مباشرة لكيفية عمل تقنية الذكاء الاصطناعي',
        sourceGroup: 'المجموعة المصدر',
        targetGroup: 'المجموعة الهدف',
        startDemo: 'ابدأ العرض',
        pauseDemo: 'إيقاف مؤقت',
        restartDemo: 'إعادة تشغيل',
        step1: 'تحليل المجموعة المصدر',
        step1Desc: 'الذكاء الاصطناعي يحلل جميع الأعضاء ويجمع البيانات',
        step2: 'فلترة ذكية للأعضاء',
        step2Desc: 'إزالة الحسابات الوهمية والبوتات والأعضاء غير النشطين',
        step3: 'النقل الآمن والذكي',
        step3Desc: 'نقل الأعضاء المختارين بطريقة طبيعية وآمنة',
        step4: 'تقرير النتائج',
        step4Desc: 'تقرير مفصل عن العملية والإحصائيات',
        membersFound: 'عضو تم العثور عليهم',
        membersFiltered: 'عضو حقيقي',
        membersTransferred: 'تم نقلهم بنجاح',
        tryNow: 'جرب الآن'
      },
      en: {
        title: 'Watch Smart Agent in Action',
        subtitle: 'Interactive live experience of how AI technology works',
        sourceGroup: 'Source Group',
        targetGroup: 'Target Group',
        startDemo: 'Start Demo',
        pauseDemo: 'Pause Demo',
        restartDemo: 'Restart Demo',
        step1: 'Analyze Source Group',
        step1Desc: 'AI analyzes all members and collects data',
        step2: 'Smart Member Filtering',
        step2Desc: 'Remove fake accounts, bots, and inactive members',
        step3: 'Smart & Safe Transfer',
        step3Desc: 'Transfer selected members naturally and safely',
        step4: 'Results Report',
        step4Desc: 'Detailed report about the process and statistics',
        membersFound: 'Members Found',
        membersFiltered: 'Real Members',
        membersTransferred: 'Successfully Transferred',
        tryNow: 'Try Now'
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
      duration: 3000
    },
    {
      title: t('step2'),
      description: t('step2Desc'),
      icon: <Bot className="h-6 w-6" />,
      color: 'purple',
      duration: 4000
    },
    {
      title: t('step3'),
      description: t('step3Desc'),
      icon: <Zap className="h-6 w-6" />,
      color: 'green',
      duration: 5000
    },
    {
      title: t('step4'),
      description: t('step4Desc'),
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'orange',
      duration: 2000
    }
  ]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress(prev => {
          const newProgress = prev + 1
          if (newProgress >= 100) {
            if (currentStep < steps.length - 1) {
              setCurrentStep(prevStep => prevStep + 1)
              return 0
            } else {
              setIsPlaying(false)
              return 100
            }
          }
          return newProgress
        })
      }, steps[currentStep]?.duration / 100 || 50)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  // Simulate data updates
  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setDemoData(prev => ({
          ...prev,
          membersFound: Math.min(prev.membersFound + Math.floor(Math.random() * 50), 5000),
          membersFiltered: Math.min(prev.membersFiltered + Math.floor(Math.random() * 30), 4200),
          membersTransferred: Math.min(prev.membersTransferred + Math.floor(Math.random() * 25), 4150)
        }))
      }, 200)
      return () => clearInterval(interval)
    }
  }, [isPlaying])

  const handlePlay = () => {
    if (!demoData.sourceGroup || !demoData.targetGroup) {
      setDemoData(prev => ({
        ...prev,
        sourceGroup: 'https://t.me/crypto_community_demo',
        targetGroup: 'https://t.me/my_new_group_demo'
      }))
    }
    setIsPlaying(!isPlaying)
  }

  const handleRestart = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
    setDemoData({
      sourceGroup: '',
      targetGroup: '',
      membersFound: 0,
      membersFiltered: 0,
      membersTransferred: 0
    })
  }

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-white dark:via-purple-400 dark:to-blue-400">
              {t('title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Demo Controls */}
          <div className="space-y-6">
            {/* Input Fields */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6 space-y-4">
                <h3 className="text-lg font-semibold mb-4">{language === 'ar' ? 'إعداد العرض التوضيحي' : 'Demo Setup'}</h3>
                <Input
                  placeholder={t('sourceGroup')}
                  value={demoData.sourceGroup}
                  onChange={(e) => setDemoData(prev => ({ ...prev, sourceGroup: e.target.value }))}
                  className="rounded-lg h-12"
                />
                <Input
                  placeholder={t('targetGroup')}
                  value={demoData.targetGroup}
                  onChange={(e) => setDemoData(prev => ({ ...prev, targetGroup: e.target.value }))}
                  className="rounded-lg h-12"
                />
              </CardContent>
            </Card>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4 rtl:space-x-reverse">
              <Button
                onClick={handlePlay}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                  isPlaying 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isPlaying ? <Pause className="h-5 w-5 mr-2" /> : <Play className="h-5 w-5 mr-2" />}
                {isPlaying ? t('pauseDemo') : t('startDemo')}
              </Button>
              <Button
                onClick={handleRestart}
                variant="outline"
                className="px-8 py-3 rounded-xl font-medium"
              >
                <RotateCcw className="h-5 w-5 mr-2" />
                {t('restartDemo')}
              </Button>
            </div>

            {/* Steps Progress */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className={`transition-all duration-500 ${
                    index === currentStep && isPlaying
                      ? `bg-${step.color}-50 dark:bg-${step.color}-900/20 border-2 border-${step.color}-500 shadow-lg`
                      : index < currentStep
                        ? 'bg-green-50 dark:bg-green-900/20 border border-green-300'
                        : 'bg-white/60 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4 rtl:space-x-reverse">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        index === currentStep && isPlaying
                          ? `bg-${step.color}-500 text-white`
                          : index < currentStep
                            ? 'bg-green-500 text-white'
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      }`}>
                        {index < currentStep ? <CheckCircle className="h-6 w-6" /> : step.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{step.title}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{step.description}</p>
                        {index === currentStep && isPlaying && (
                          <div className="mt-2">
                            <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full bg-${step.color}-500 rounded-full transition-all duration-300`}
                                style={{ width: `${progress}%` }}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Live Results */}
          <div className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-blue-500" />
                  {language === 'ar' ? 'النتائج المباشرة' : 'Live Results'}
                </h3>
                
                <div className="grid grid-cols-1 gap-6">
                  <div className="text-center p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {demoData.membersFound.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('membersFound')}</div>
                  </div>
                  
                  <div className="text-center p-6 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-purple-600 mb-2">
                      {demoData.membersFiltered.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('membersFiltered')}</div>
                  </div>
                  
                  <div className="text-center p-6 bg-green-50 dark:bg-green-900/20 rounded-xl">
                    <div className="text-3xl font-bold text-green-600 mb-2">
                      {demoData.membersTransferred.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{t('membersTransferred')}</div>
                  </div>
                </div>

                {/* Success Rate */}
                <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">{language === 'ar' ? 'معدل النجاح' : 'Success Rate'}</span>
                    <span className="text-lg font-bold text-green-600">
                      {demoData.membersFound > 0 ? Math.round((demoData.membersTransferred / demoData.membersFound) * 100) : 0}%
                    </span>
                  </div>
                  <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${demoData.membersFound > 0 ? (demoData.membersTransferred / demoData.membersFound) * 100 : 0}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Status */}
                <div className="mt-6 flex items-center justify-center space-x-2 rtl:space-x-reverse">
                  {isPlaying ? (
                    <>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-sm font-medium text-green-600">
                        {language === 'ar' ? 'جاري المعالجة...' : 'Processing...'}
                      </span>
                    </>
                  ) : currentStep === steps.length - 1 && progress === 100 ? (
                    <>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-medium text-green-600">
                        {language === 'ar' ? 'اكتملت العملية بنجاح' : 'Process Completed Successfully'}
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-5 w-5 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {language === 'ar' ? 'في انتظار البدء' : 'Ready to Start'}
                      </span>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* CTA */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
              <CardContent className="p-6 text-center">
                <h4 className="text-lg font-semibold mb-2">
                  {language === 'ar' ? 'أعجبك ما رأيت؟' : 'Impressed by what you saw?'}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {language === 'ar' 
                    ? 'ابدأ نقل أعضاء تليجرام الآن بنفس التقنية المتقدمة'
                    : 'Start transferring Telegram members now with the same advanced technology'
                  }
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <Bot className="h-4 w-4 mr-2" />
                  {t('tryNow')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
