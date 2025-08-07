'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { Bot, Brain, Target, Shield, Zap, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react'

export function AIAgentSection() {
  const { language } = useLanguage()
  const [activeStep, setActiveStep] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "وكيل الذكاء الاصطناعي المتقدم",
        subtitle: "تقنية ثورية تحلل وتنقل الأعضاء الحقيقيين بذكاء فائق",
        aiFeature1: "تحليل ذكي للأعضاء",
        aiFeature1Desc: "يحلل نشاط الأعضاء ويحدد الأعضاء الحقيقيين والنشطين فقط",
        aiFeature2: "نقل انتقائي متقدم",
        aiFeature2Desc: "ينقل الأعضاء المناسبين لمجموعتك بناءً على اهتماماتهم",
        aiFeature3: "حماية ذكية",
        aiFeature3Desc: "يحمي حسابك ومجموعتك من المخاطر والحظر التلقائي",
        howAIWorks: "كيف يعمل الوكيل الذكي؟",
        step1: "مسح وتحليل",
        step1Desc: "يمسح المجموعة المصدر ويحلل نشاط كل عضو",
        step2: "فلترة ذكية",
        step2Desc: "يفلتر الأعضاء الحقيقيين والنشطين فقط",
        step3: "نقل آمن",
        step3Desc: "ينقل الأعضاء بطريقة آمنة وطبيعية",
        learnMore: "اعرف المزيد"
      },
      en: {
        title: "Advanced AI Agent",
        subtitle: "Revolutionary technology that intelligently analyzes and transfers real members with superior intelligence",
        aiFeature1: "Smart Member Analysis",
        aiFeature1Desc: "Analyzes member activity and identifies only real and active members",
        aiFeature2: "Advanced Selective Transfer",
        aiFeature2Desc: "Transfers suitable members to your group based on their interests",
        aiFeature3: "Smart Protection",
        aiFeature3Desc: "Protects your account and group from risks and automatic bans",
        howAIWorks: "How Does the Smart Agent Work?",
        step1: "Scan & Analyze",
        step1Desc: "Scans source group and analyzes each member's activity",
        step2: "Smart Filtering",
        step2Desc: "Filters only real and active members",
        step3: "Safe Transfer",
        step3Desc: "Transfers members safely and naturally",
        learnMore: "Learn More"
      }
    }
    return translations[language][key] || key
  }

  const aiFeatures = [
    {
      icon: <Brain className="h-8 w-8 text-blue-500" />,
      title: t('aiFeature1'),
      description: t('aiFeature1Desc'),
      color: 'blue'
    },
    {
      icon: <Target className="h-8 w-8 text-purple-500" />,
      title: t('aiFeature2'),
      description: t('aiFeature2Desc'),
      color: 'purple'
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: t('aiFeature3'),
      description: t('aiFeature3Desc'),
      color: 'green'
    }
  ]

  const aiSteps = [
    {
      icon: <Bot className="h-6 w-6" />,
      title: t('step1'),
      description: t('step1Desc')
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: t('step2'),
      description: t('step2Desc')
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: t('step3'),
      description: t('step3Desc')
    }
  ]

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveStep(prev => (prev + 1) % aiSteps.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full mb-6">
            <Bot className="h-5 w-5 text-blue-600" />
            <span className="text-blue-600 dark:text-blue-400 font-medium">AI Technology</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {aiFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className={`p-6 hover:shadow-xl transition-all duration-500 transform hover:scale-105 border-0 bg-white dark:bg-gray-800 ${
                isVisible ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="space-y-4">
                <div className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl flex items-center justify-center`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* How AI Works */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-center mb-8">{t('howAIWorks')}</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Steps */}
            <div className="space-y-6">
              {aiSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`flex items-start space-x-4 p-4 rounded-lg transition-all duration-500 ${
                    activeStep === index 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    activeStep === index 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                  }`}>
                    {step.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{step.title}</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Visual Representation */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-xl p-8 text-center">
                <Bot className="h-24 w-24 text-blue-500 mx-auto mb-4 animate-pulse" />
                <div className="space-y-2">
                  <div className="h-2 bg-blue-200 dark:bg-blue-700 rounded-full">
                    <div 
                      className="h-2 bg-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${((activeStep + 1) / aiSteps.length) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Processing Step {activeStep + 1} of {aiSteps.length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-8">
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl">
              {t('learnMore')}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
