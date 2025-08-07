'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Shield, Zap, Users, Lock, BarChart, Headphones } from 'lucide-react'

interface FeaturesSectionProps {
  language: 'ar' | 'en'
}

export function FeaturesSection({ language }: FeaturesSectionProps) {
  const t = (key: string) => {
    const translations = {
      ar: {
        title: "لماذا تختار TeleTransfer؟",
        subtitle: "مميزات متطورة تجعل عملية نقل الأعضاء سهلة وآمنة",
        feature1Title: "ذكاء اصطناعي متطور",
        feature1Desc: "خوارزميات ذكية تضمن نقل الأعضاء الحقيقيين والنشطين فقط",
        feature2Title: "أمان وخصوصية",
        feature2Desc: "لا نطلب بيانات تسجيل دخول تليجرام، حماية كاملة لخصوصيتك",
        feature3Title: "معدل نجاح عالي",
        feature3Desc: "نحقق معدل نجاح 99.8% في عمليات النقل مع ضمان الجودة",
        feature4Title: "تشفير متقدم",
        feature4Desc: "جميع البيانات مشفرة بأحدث تقنيات الأمان العالمية",
        feature5Title: "تقارير مفصلة",
        feature5Desc: "احصل على تقارير شاملة عن عملية النقل والنتائج",
        feature6Title: "دعم فني متميز",
        feature6Desc: "فريق دعم متاح 24/7 لمساعدتك في أي وقت"
      },
      en: {
        title: "Why Choose TeleTransfer?",
        subtitle: "Advanced features that make member transfer easy and secure",
        feature1Title: "Advanced AI",
        feature1Desc: "Smart algorithms ensure transfer of only real and active members",
        feature2Title: "Security & Privacy",
        feature2Desc: "No Telegram login required, complete protection of your privacy",
        feature3Title: "High Success Rate",
        feature3Desc: "We achieve 99.8% success rate in transfers with quality guarantee",
        feature4Title: "Advanced Encryption",
        feature4Desc: "All data encrypted with latest global security technologies",
        feature5Title: "Detailed Reports",
        feature5Desc: "Get comprehensive reports about transfer process and results",
        feature6Title: "Premium Support",
        feature6Desc: "24/7 support team available to help you anytime"
      }
    }
    return translations[language][key] || key
  }

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: t("feature1Title"),
      description: t("feature1Desc")
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: t("feature2Title"),
      description: t("feature2Desc")
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: t("feature3Title"),
      description: t("feature3Desc")
    },
    {
      icon: <Lock className="h-8 w-8 text-red-500" />,
      title: t("feature4Title"),
      description: t("feature4Desc")
    },
    {
      icon: <BarChart className="h-8 w-8 text-yellow-500" />,
      title: t("feature5Title"),
      description: t("feature5Desc")
    },
    {
      icon: <Headphones className="h-8 w-8 text-indigo-500" />,
      title: t("feature6Title"),
      description: t("feature6Desc")
    }
  ]

  return (
    <section id="features" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
              <CardContent className="space-y-4">
                <div className="flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg">
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
      </div>
    </section>
  )
}
