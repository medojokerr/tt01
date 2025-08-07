'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/hooks/useLanguage'
import { CheckCircle, Star } from 'lucide-react'

export function PricingSection() {
  const { language, t } = useLanguage()

  const plans = [
    {
      name: t('pricing.basic'),
      price: "0.05",
      maxMembers: "1,000",
      features: [
        "Secure guaranteed transfer",
        "Technical support available",
        "Detailed report",
        "Money back guarantee"
      ],
      popular: false
    },
    {
      name: t('pricing.premium'),
      price: "0.04",
      maxMembers: "10,000",
      features: [
        "Secure guaranteed transfer",
        "Technical support available",
        "Detailed report",
        "Money back guarantee",
        "Priority processing"
      ],
      popular: true
    },
    {
      name: t('pricing.enterprise'),
      price: "0.03",
      maxMembers: "50,000+",
      features: [
        "Secure guaranteed transfer",
        "Technical support available",
        "Detailed report",
        "Money back guarantee",
        "Priority processing",
        "Dedicated account manager"
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('pricing.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('pricing.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative p-6 transition-all duration-300 transform hover:scale-105 ${plan.popular ? 'border-2 border-blue-500 shadow-xl' : 'border-0'} bg-white dark:bg-gray-800`}>
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1">
                  <Star className="h-4 w-4 mr-1" />
                  {t('pricing.mostPopular')}
                </Badge>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-500 dark:text-gray-400 text-sm ml-1">
                    {t('pricing.usd')} {t('pricing.perMember')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  {language === 'ar' ? 'حتى' : 'Up to'} {plan.maxMembers} {t('pricing.members')}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-3">{t('pricing.features')}</h4>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className={`w-full mt-6 ${plan.popular ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {t('pricing.selectPlan')}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
