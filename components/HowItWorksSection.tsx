'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowRight, MessageSquare, CreditCard, Zap, CheckCircle, Play } from 'lucide-react'

export function HowItWorksSection() {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "كيف يعمل TeleTransfer؟",
        subtitle: "عملية بسيطة وذكية من 4 خطوات فقط",
        step1Title: "أدخل بيانات المجموعات",
        step1Desc: "أدخل رابط المجموعة المصدر والمجموعة الهدف مع عدد الأعضاء المطلوب نقلهم",
        step2Title: "الذكاء الاصطناعي يحلل",
        step2Desc: "يحلل الأعضاء ويفلتر الحقيقيين والنشطين فقط باستخدام خوارزميات متقدمة",
        step3Title: "النقل الآمن والذكي",
        step3Desc: "ينقل الأعضاء المختارين بطريقة طبيعية وآمنة مع مراقبة مستمرة",
        step4Title: "تقرير مفصل ونتائج",
        step4Desc: "احصل على تقرير شامل مع تحليلات عميقة ورؤى قيمة عن العملية",
        watchProcess: "شاهد العملية"
      },
      en: {
        title: "How Does TeleTransfer Work?",
        subtitle: "Simple and smart 4-step process",
        step1Title: "Enter Group Details",
        step1Desc: "Enter source group link, target group link and number of members to transfer",
        step2Title: "AI Analyzes",
        step2Desc: "Analyzes members and filters only real and active ones using advanced algorithms",
        step3Title: "Smart & Safe Transfer",
        step3Desc: "Transfers selected members naturally and safely with continuous monitoring",
        step4Title: "Detailed Report & Results",
        step4Desc: "Get comprehensive report with deep analytics and valuable insights about the process",
        watchProcess: "Watch Process"
      }
    }
    return translations[language][key] || key
  }

  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      title: t("step1Title"),
      description: t("step1Desc"),
      number: "1",
      color: 'blue',
      duration: 2000
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: t("step2Title"),
      description: t("step2Desc"),
      number: "2",
      color: 'purple',
      duration: 3000
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-500" />,
      title: t("step3Title"),
      description: t("step3Desc"),
      number: "3",
      color: 'green',
      duration: 4000
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-orange-500" />,
      title: t("step4Title"),
      description: t("step4Desc"),
      number: "4",
      color: 'orange',
      duration: 2000
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setActiveStep(prev => (prev + 1) % steps.length)
        setIsAnimating(false)
      }, 300)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Interactive Process Visualization */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Visual Process */}
            <div className="relative">
              <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
                <CardContent className="text-center space-y-6">
                  <div className={`transition-all duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
                    <div className={`w-24 h-24 bg-${steps[activeStep].color}-100 dark:bg-${steps[activeStep].color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}>
                      {steps[activeStep].icon}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{steps[activeStep].title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{steps[activeStep].description}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Step {activeStep + 1} of {steps.length}</span>
                      <span>{Math.round(((activeStep + 1) / steps.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-1000"
                        style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Watch Process Button */}
                  <button className="flex items-center justify-center space-x-2 mx-auto px-6 py-3 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Play className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">{t('watchProcess')}</span>
                  </button>
                </CardContent>
              </Card>
            </div>

            {/* Steps List */}
            <div className="space-y-4">
              {steps.map((step, index) => (
                <Card 
                  key={index}
                  className={`p-6 cursor-pointer transition-all duration-500 transform hover:scale-105 ${
                    activeStep === index 
                      ? 'ring-2 ring-blue-500 shadow-lg bg-blue-50 dark:bg-blue-900/20' 
                      : 'hover:shadow-md bg-white dark:bg-gray-800'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <CardContent className="flex items-center space-x-4">
                    <div className={`relative flex-shrink-0 w-16 h-16 rounded-full flex items-center justify-center ${
                      activeStep === index 
                        ? `bg-${step.color}-500 text-white` 
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                    }`}>
                      {step.icon}
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                        activeStep === index 
                          ? 'bg-white text-gray-800' 
                          : 'bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                      }`}>
                        {step.number}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-1">{step.title}</h4>
                      <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                    {activeStep === index && (
                      <ArrowRight className="h-5 w-5 text-blue-500 animate-pulse" />
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Process Flow Diagram */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <Card className={`p-6 text-center transition-all duration-300 transform hover:scale-105 ${
                  activeStep === index ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'
                }`}>
                  <CardContent className="space-y-4">
                    <div className="relative">
                      <div className={`w-16 h-16 bg-${step.color}-100 dark:bg-${step.color}-900/30 rounded-full flex items-center justify-center mx-auto`}>
                        {step.icon}
                      </div>
                      <div className={`absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold ${
                        activeStep === index ? 'animate-pulse' : ''
                      }`}>
                        {step.number}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </CardContent>
                </Card>
                
                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className={`hidden lg:block absolute top-1/2 ${language === 'ar' ? '-left-3' : '-right-3'} transform -translate-y-1/2 z-10`}>
                    <div className="w-6 h-6 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                      <ArrowRight className={`h-4 w-4 text-gray-400 ${language === 'ar' ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
