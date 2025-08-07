'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Star } from 'lucide-react'

interface PricingSectionProps {
  language: 'ar' | 'en'
}

export function PricingSection({ language }: PricingSectionProps) {
  const t = (key: string) => {
    const translations = {
      ar: {
        title: "أسعار شفافة ومناسبة",
        subtitle: "اختر الباقة المناسبة لاحتياجاتك",
        basic: "الباقة الأساسية",
        premium: "الباقة المميزة",
        enterprise: "باقة المؤسسات",
        mostPopular: "الأكثر شعبية",
        members: "عضو",
        perMember: "لكل عضو",
        features: "المميزات المتضمنة:",
        feature1: "نقل آمن ومضمون",
        feature2: "دعم فني متاح",
        feature3: "تقرير مفصل",
        feature4: "ضمان استرداد المال",
        feature5: "أولوية في المعالجة",
        feature6: "مدير حساب مخصص",
        selectPlan: "اختر هذه الباقة",
        usd: "دولار"
      },
      en: {
        title: "Transparent & Fair Pricing",
        subtitle: "Choose the plan that fits your needs",
        basic: "Basic Plan",
        premium: "Premium Plan", 
        enterprise: "Enterprise Plan",
        mostPopular: "Most Popular",
        members: "members",
        perMember: "per member",
        features: "Included features:",
        feature1: "Secure guaranteed transfer",
        feature2: "Technical support available",
        feature3: "Detailed report",
        feature4: "Money back guarantee",
        feature5: "Priority processing",
        feature6: "Dedicated account manager",
        selectPlan: "Select This Plan",
        usd: "USD"
      }
    }
    return translations[language][key] || key
  }

  const plans = [
    {
      name: t("basic"),
      price: "0.05",
      maxMembers: "1,000",
      features: [
        t("feature1"),
        t("feature2"),
        t("feature3"),
        t("feature4")
      ],
      popular: false
    },
    {
      name: t("premium"),
      price: "0.04",
      maxMembers: "10,000",
      features: [
        t("feature1"),
        t("feature2"),
        t("feature3"),
        t("feature4"),
        t("feature5")
      ],
      popular: true
    },
    {
      name: t("enterprise"),
      price: "0.03",
      maxMembers: "50,000+",
      features: [
        t("feature1"),
        t("feature2"),
        t("feature3"),
        t("feature4"),
        t("feature5"),
        t("feature6")
      ],
      popular: false
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-6 ${plan.popular ? 'border-2 border-blue-500 shadow-lg' : ''}`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-3 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  {t("mostPopular")}
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-3xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                    {t("usd")} {t("perMember")}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {language === 'ar' ? 'حتى' : 'Up to'} {plan.maxMembers} {t("members")}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">{t("features")}</h4>
                  <ul className="space-y-2">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className={`w-full mt-6 ${plan.popular ? 'bg-blue-500 hover:bg-blue-600' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {t("selectPlan")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
