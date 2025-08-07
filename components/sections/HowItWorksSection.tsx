'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, MessageSquare, CreditCard, Zap, CheckCircle } from 'lucide-react'

interface HowItWorksSectionProps {
  language: 'ar' | 'en'
}

export function HowItWorksSection({ language }: HowItWorksSectionProps) {
  const t = (key: string) => {
    const translations = {
      ar: {
        title: "كيف يعمل TeleTransfer؟",
        subtitle: "عملية بسيطة من 4 خطوات فقط",
        step1Title: "أدخل بيانات المجموعات",
        step1Desc: "أدخل رابط المجموعة المصدر والمجموعة الهدف مع عدد الأعضاء المطلوب",
        step2Title: "اختر طريقة الدفع",
        step2Desc: "اختر من بين طرق الدفع المتاحة وارفع إثبات الدفع",
        step3Title: "بدء العملية الآلية",
        step3Desc: "يبدأ الذكاء الاصطناعي في تحليل ونقل الأعضاء تلقائياً",
        step4Title: "استلام التقرير",
        step4Desc: "احصل على تقرير مفصل عن عملية النقل والنتائج"
      },
      en: {
        title: "How Does TeleTransfer Work?",
        subtitle: "Simple 4-step process",
        step1Title: "Enter Group Details",
        step1Desc: "Enter source group link, target group link and number of members needed",
        step2Title: "Choose Payment Method",
        step2Desc: "Select from available payment methods and upload payment proof",
        step3Title: "Start Automated Process",
        step3Desc: "AI starts analyzing and transferring members automatically",
        step4Title: "Receive Report",
        step4Desc: "Get detailed report about transfer process and results"
      }
    }
    return translations[language][key] || key
  }

  const steps = [
    {
      icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
      title: t("step1Title"),
      description: t("step1Desc"),
      number: "1"
    },
    {
      icon: <CreditCard className="h-8 w-8 text-green-500" />,
      title: t("step2Title"),
      description: t("step2Desc"),
      number: "2"
    },
    {
      icon: <Zap className="h-8 w-8 text-purple-500" />,
      title: t("step3Title"),
      description: t("step3Desc"),
      number: "3"
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-orange-500" />,
      title: t("step4Title"),
      description: t("step4Desc"),
      number: "4"
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                <CardContent className="space-y-4">
                  <div className="relative">
                    <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full mx-auto">
                      {step.icon}
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowLeft className="h-6 w-6 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
