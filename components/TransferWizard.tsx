'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowLeft, ArrowRight, Users, Target, CreditCard, CheckCircle } from 'lucide-react'

interface TransferWizardProps {
  onBack: () => void
}

export function TransferWizard({ onBack }: TransferWizardProps) {
  const { language } = useLanguage()
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    sourceGroup: '',
    targetGroup: '',
    memberCount: '',
    paymentMethod: ''
  })

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'معالج نقل الأعضاء',
        back: 'العودة',
        next: 'التالي',
        previous: 'السابق',
        complete: 'إكمال',
        step1: 'بيانات المجموعات',
        step2: 'تفاصيل النقل',
        step3: 'الدفع',
        step4: 'التأكيد',
        sourceGroup: 'رابط المجموعة المصدر',
        targetGroup: 'رابط المجموعة الهدف',
        memberCount: 'عدد الأعضاء المطلوب',
        paymentMethod: 'طريقة الدفع'
      },
      en: {
        title: 'Transfer Wizard',
        back: 'Back',
        next: 'Next',
        previous: 'Previous',
        complete: 'Complete',
        step1: 'Group Details',
        step2: 'Transfer Details',
        step3: 'Payment',
        step4: 'Confirmation',
        sourceGroup: 'Source Group Link',
        targetGroup: 'Target Group Link',
        memberCount: 'Required Member Count',
        paymentMethod: 'Payment Method'
      }
    }
    return translations[language][key] || key
  }

  const steps = [
    { title: t('step1'), icon: <Users className="h-5 w-5" /> },
    { title: t('step2'), icon: <Target className="h-5 w-5" /> },
    { title: t('step3'), icon: <CreditCard className="h-5 w-5" /> },
    { title: t('step4'), icon: <CheckCircle className="h-5 w-5" /> }
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Button
              onClick={onBack}
              variant="ghost"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('back')}</span>
            </Button>
            <h1 className="text-2xl font-bold">{t('title')}</h1>
            <div></div>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  index <= currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
                }`}>
                  {step.icon}
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    index < currentStep ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Step Content */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                {steps[currentStep].icon}
                <span>{steps[currentStep].title}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('sourceGroup')}</label>
                    <Input
                      placeholder="https://t.me/source_group"
                      value={formData.sourceGroup}
                      onChange={(e) => setFormData({...formData, sourceGroup: e.target.value})}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('targetGroup')}</label>
                    <Input
                      placeholder="https://t.me/target_group"
                      value={formData.targetGroup}
                      onChange={(e) => setFormData({...formData, targetGroup: e.target.value})}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('memberCount')}</label>
                    <Input
                      type="number"
                      placeholder="1000"
                      value={formData.memberCount}
                      onChange={(e) => setFormData({...formData, memberCount: e.target.value})}
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t('paymentMethod')}</label>
                    <select 
                      className="w-full p-3 border rounded-lg"
                      value={formData.paymentMethod}
                      onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                    >
                      <option value="">Select Payment Method</option>
                      <option value="crypto">Cryptocurrency</option>
                      <option value="paypal">PayPal</option>
                      <option value="bank">Bank Transfer</option>
                    </select>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="text-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
                  <h3 className="text-xl font-semibold">
                    {language === 'ar' ? 'تم إعداد طلبك بنجاح!' : 'Your order has been set up successfully!'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {language === 'ar' ? 'سنبدأ في معالجة طلبك قريباً' : 'We will start processing your order soon'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              variant="outline"
              className="flex items-center space-x-2 rtl:space-x-reverse"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>{t('previous')}</span>
            </Button>
            
            <Button
              onClick={currentStep === steps.length - 1 ? onBack : handleNext}
              className="flex items-center space-x-2 rtl:space-x-reverse bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <span>{currentStep === steps.length - 1 ? t('complete') : t('next')}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
