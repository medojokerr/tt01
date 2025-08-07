'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Slider } from '@/components/ui/slider'
import { useLanguage } from '@/hooks/useLanguage'
import { Calculator, Zap, Shield, Users, CheckCircle, Sparkles, TrendingUp } from 'lucide-react'

export function SmartPricingCalculator() {
  const { language } = useLanguage()
  const [memberCount, setMemberCount] = useState([1000])
  const [selectedPlan, setSelectedPlan] = useState('smart')
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [estimatedTime, setEstimatedTime] = useState('')
  const [successRate, setSuccessRate] = useState(99.8)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'حاسبة التسعير الذكية',
        subtitle: 'احسب التكلفة والوقت المتوقع لنقل أعضائك بدقة',
        memberCount: 'عدد الأعضاء المطلوب نقلهم',
        selectPlan: 'اختر الخطة المناسبة',
        basicPlan: 'الخطة الأساسية',
        basicDesc: 'نقل عادي بدون ذكاء اصطناعي',
        smartPlan: 'الخطة الذكية',
        smartDesc: 'نقل ذكي مع تحليل AI متقدم',
        proPlan: 'الخطة الاحترافية',
        proDesc: 'نقل فائق مع ضمانات إضافية',
        totalCost: 'التكلفة الإجمالية',
        estimatedTime: 'الوقت المتوقع',
        successRate: 'معدل النجاح المتوقع',
        features: 'المميزات المتضمنة',
        startTransfer: 'ابدأ النقل الآن',
        savePercent: 'وفر',
        minutes: 'دقيقة',
        hours: 'ساعة',
        days: 'يوم'
      },
      en: {
        title: 'Smart Pricing Calculator',
        subtitle: 'Calculate the cost and expected time to transfer your members accurately',
        memberCount: 'Number of members to transfer',
        selectPlan: 'Select suitable plan',
        basicPlan: 'Basic Plan',
        basicDesc: 'Regular transfer without AI',
        smartPlan: 'Smart Plan',
        smartDesc: 'Smart transfer with advanced AI analysis',
        proPlan: 'Pro Plan',
        proDesc: 'Premium transfer with additional guarantees',
        totalCost: 'Total Cost',
        estimatedTime: 'Estimated Time',
        successRate: 'Expected Success Rate',
        features: 'Included Features',
        startTransfer: 'Start Transfer Now',
        savePercent: 'Save',
        minutes: 'minutes',
        hours: 'hours',
        days: 'days'
      }
    }
    return translations[language][key] || key
  }

  const plans = {
    basic: {
      name: t('basicPlan'),
      description: t('basicDesc'),
      pricePerMember: 0.008,
      icon: <Users className="h-6 w-6" />,
      color: 'gray',
      features: [
        language === 'ar' ? 'نقل عادي' : 'Regular Transfer',
        language === 'ar' ? 'دعم أساسي' : 'Basic Support',
        language === 'ar' ? 'تقرير بسيط' : 'Simple Report'
      ],
      successRate: 95.5,
      speedMultiplier: 1
    },
    smart: {
      name: t('smartPlan'),
      description: t('smartDesc'),
      pricePerMember: 0.012,
      icon: <Sparkles className="h-6 w-6" />,
      color: 'blue',
      features: [
        language === 'ar' ? 'تحليل AI متقدم' : 'Advanced AI Analysis',
        language === 'ar' ? 'فلترة ذكية' : 'Smart Filtering',
        language === 'ar' ? 'نقل آمن' : 'Secure Transfer',
        language === 'ar' ? 'دعم أولوية' : 'Priority Support',
        language === 'ar' ? 'تقرير مفصل' : 'Detailed Report'
      ],
      successRate: 99.8,
      speedMultiplier: 1.5,
      popular: true
    },
    pro: {
      name: t('proPlan'),
      description: t('proDesc'),
      pricePerMember: 0.018,
      icon: <TrendingUp className="h-6 w-6" />,
      color: 'purple',
      features: [
        language === 'ar' ? 'كل مميزات الخطة الذكية' : 'All Smart Plan Features',
        language === 'ar' ? 'ضمان استرداد' : 'Money Back Guarantee',
        language === 'ar' ? 'نقل فوري' : 'Instant Transfer',
        language === 'ar' ? 'دعم VIP' : 'VIP Support',
        language === 'ar' ? 'تحليلات متقدمة' : 'Advanced Analytics'
      ],
      successRate: 99.9,
      speedMultiplier: 2
    }
  }

  // Calculate pricing and estimates
  useEffect(() => {
    const plan = plans[selectedPlan as keyof typeof plans]
    const members = memberCount[0]
    const basePrice = members * plan.pricePerMember
    
    // Apply discounts for larger quantities
    let discount = 0
    if (members >= 10000) discount = 0.25
    else if (members >= 5000) discount = 0.15
    else if (members >= 2000) discount = 0.10
    else if (members >= 1000) discount = 0.05

    const finalPrice = basePrice * (1 - discount)
    setCalculatedPrice(finalPrice)

    // Calculate estimated time
    const baseTimeMinutes = members / (50 * plan.speedMultiplier) // 50 members per minute base rate
    let timeString = ''
    if (baseTimeMinutes < 60) {
      timeString = `${Math.ceil(baseTimeMinutes)} ${t('minutes')}`
    } else if (baseTimeMinutes < 1440) {
      timeString = `${Math.ceil(baseTimeMinutes / 60)} ${t('hours')}`
    } else {
      timeString = `${Math.ceil(baseTimeMinutes / 1440)} ${t('days')}`
    }
    setEstimatedTime(timeString)
    setSuccessRate(plan.successRate)
  }, [memberCount, selectedPlan, language])

  const getDiscountPercentage = (members: number) => {
    if (members >= 10000) return 25
    if (members >= 5000) return 15
    if (members >= 2000) return 10
    if (members >= 1000) return 5
    return 0
  }

  return (
    <section id="pricing" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-green-600 to-blue-600 bg-clip-text text-transparent dark:from-white dark:via-green-400 dark:to-blue-400">
              {t('title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Calculator */}
          <div className="space-y-6">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
              <CardContent className="p-8">
                <div className="flex items-center space-x-3 rtl:space-x-reverse mb-6">
                  <Calculator className="h-6 w-6 text-blue-500" />
                  <h3 className="text-xl font-semibold">{language === 'ar' ? 'حاسبة التكلفة' : 'Cost Calculator'}</h3>
                </div>

                {/* Member Count Slider */}
                <div className="space-y-4 mb-8">
                  <label className="text-sm font-medium">{t('memberCount')}</label>
                  <div className="space-y-4">
                    <Slider
                      value={memberCount}
                      onValueChange={setMemberCount}
                      max={50000}
                      min={100}
                      step={100}
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                      <span>100</span>
                      <span className="font-bold text-lg text-blue-600">
                        {memberCount[0].toLocaleString()}
                      </span>
                      <span>50,000</span>
                    </div>
                  </div>
                  <Input
                    type="number"
                    value={memberCount[0]}
                    onChange={(e) => setMemberCount([parseInt(e.target.value) || 100])}
                    min={100}
                    max={50000}
                    className="text-center font-bold text-lg"
                  />
                </div>

                {/* Plan Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-medium">{t('selectPlan')}</label>
                  <div className="grid grid-cols-1 gap-3">
                    {Object.entries(plans).map(([key, plan]) => (
                      <div
                        key={key}
                        onClick={() => setSelectedPlan(key)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          selectedPlan === key
                            ? `border-${plan.color}-500 bg-${plan.color}-50 dark:bg-${plan.color}-900/20`
                            : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                        }`}
                      >
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className={`w-10 h-10 bg-${plan.color}-100 dark:bg-${plan.color}-900/30 rounded-lg flex items-center justify-center text-${plan.color}-600`}>
                            {plan.icon}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 rtl:space-x-reverse">
                              <h4 className="font-semibold">{plan.name}</h4>
                              {plan.popular && (
                                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                                  {language === 'ar' ? 'الأكثر شعبية' : 'Most Popular'}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{plan.description}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-bold">${plan.pricePerMember}</div>
                            <div className="text-xs text-gray-500">{language === 'ar' ? 'لكل عضو' : 'per member'}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {/* Price Summary */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-xl">
              <CardContent className="p-8">
                <h3 className="text-xl font-semibold mb-6 text-center">
                  {language === 'ar' ? 'ملخص التكلفة' : 'Cost Summary'}
                </h3>

                <div className="space-y-6">
                  {/* Total Cost */}
                  <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">{t('totalCost')}</div>
                    <div className="text-4xl font-bold text-blue-600 mb-2">
                      ${calculatedPrice.toFixed(2)}
                    </div>
                    {getDiscountPercentage(memberCount[0]) > 0 && (
                      <div className="text-sm text-green-600 font-medium">
                        {t('savePercent')} {getDiscountPercentage(memberCount[0])}%
                      </div>
                    )}
                  </div>

                  {/* Estimates */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                      <div className="text-2xl font-bold text-green-600 mb-1">{estimatedTime}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t('estimatedTime')}</div>
                    </div>
                    <div className="text-center p-4 bg-white/60 dark:bg-gray-800/60 rounded-xl">
                      <div className="text-2xl font-bold text-purple-600 mb-1">{successRate}%</div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">{t('successRate')}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">{t('features')}</h4>
                    <div className="space-y-2">
                      {plans[selectedPlan as keyof typeof plans].features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 rtl:space-x-reverse">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA */}
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                    <Zap className="h-5 w-5 mr-2" />
                    {t('startTransfer')}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Discount Tiers */}
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-6">
                <h4 className="font-semibold mb-4 text-center">
                  {language === 'ar' ? 'خصومات الكمية' : 'Volume Discounts'}
                </h4>
                <div className="space-y-3">
                  {[
                    { min: 1000, discount: 5 },
                    { min: 2000, discount: 10 },
                    { min: 5000, discount: 15 },
                    { min: 10000, discount: 25 }
                  ].map((tier, index) => (
                    <div 
                      key={index}
                      className={`flex justify-between items-center p-3 rounded-lg ${
                        memberCount[0] >= tier.min 
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' 
                          : 'bg-gray-50 dark:bg-gray-700/50'
                      }`}
                    >
                      <span className="text-sm">
                        {tier.min.toLocaleString()}+ {language === 'ar' ? 'عضو' : 'members'}
                      </span>
                      <span className={`font-bold ${
                        memberCount[0] >= tier.min ? 'text-green-600' : 'text-gray-600 dark:text-gray-400'
                      }`}>
                        {tier.discount}% {language === 'ar' ? 'خصم' : 'OFF'}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
