'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowRight, ArrowLeft, Upload, CheckCircle, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface TransferWizardProps {
  language: 'ar' | 'en'
  onBack: () => void
}

export function TransferWizard({ language, onBack }: TransferWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    sourceGroup: '',
    targetGroup: '',
    memberCount: '',
    paymentMethod: '',
    paymentProof: null as File | null
  })

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "معالج نقل الأعضاء",
        step1: "بيانات المجموعات",
        step2: "تفاصيل النقل",
        step3: "الدفع والتأكيد",
        sourceGroup: "رابط المجموعة المصدر",
        targetGroup: "رابط المجموعة الهدف",
        memberCount: "عدد الأعضاء المطلوب",
        paymentMethod: "طريقة الدفع",
        uploadProof: "رفع إثبات الدفع",
        next: "التالي",
        back: "السابق",
        submit: "تأكيد الطلب",
        calculating: "جاري حساب التكلفة...",
        totalCost: "التكلفة الإجمالية",
        usd: "دولار",
        processing: "جاري المعالجة...",
        success: "تم إرسال طلبك بنجاح!",
        orderId: "رقم الطلب",
        trackOrder: "تتبع الطلب"
      },
      en: {
        title: "Transfer Wizard",
        step1: "Group Details",
        step2: "Transfer Details", 
        step3: "Payment & Confirmation",
        sourceGroup: "Source Group Link",
        targetGroup: "Target Group Link",
        memberCount: "Number of Members",
        paymentMethod: "Payment Method",
        uploadProof: "Upload Payment Proof",
        next: "Next",
        back: "Back",
        submit: "Confirm Order",
        calculating: "Calculating cost...",
        totalCost: "Total Cost",
        usd: "USD",
        processing: "Processing...",
        success: "Your order has been submitted successfully!",
        orderId: "Order ID",
        trackOrder: "Track Order"
      }
    }
    return translations[language][key] || key
  }

  const [isProcessing, setIsProcessing] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderId] = useState(`TT-${Date.now()}`)

  const calculateCost = () => {
    const count = parseInt(formData.memberCount) || 0
    return (count * 0.04).toFixed(2)
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    } else {
      onBack()
    }
  }

  const handleSubmit = async () => {
    setIsProcessing(true)
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 3000))
    setIsProcessing(false)
    setIsSuccess(true)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, paymentProof: file })
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="p-8 space-y-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-green-600 mb-2">{t("success")}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {t("orderId")}: <Badge variant="outline">{orderId}</Badge>
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full" onClick={onBack}>
                {t("trackOrder")}
              </Button>
              <Button variant="outline" className="w-full" onClick={onBack}>
                {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={handleBack} className="mb-4">
            <ArrowRight className="h-4 w-4 mr-2" />
            {t("back")}
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center space-x-4 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-1 mx-2 ${
                    step < currentStep ? 'bg-blue-500' : 'bg-gray-200 dark:bg-gray-700'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {currentStep === 1 && t("step1")}
              {currentStep === 2 && t("step2")}
              {currentStep === 3 && t("step3")}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>{t("sourceGroup")}</Label>
                  <Input 
                    placeholder="https://t.me/source_group"
                    value={formData.sourceGroup}
                    onChange={(e) => setFormData({...formData, sourceGroup: e.target.value})}
                  />
                </div>
                <div>
                  <Label>{t("targetGroup")}</Label>
                  <Input 
                    placeholder="https://t.me/target_group"
                    value={formData.targetGroup}
                    onChange={(e) => setFormData({...formData, targetGroup: e.target.value})}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>{t("memberCount")}</Label>
                  <Input 
                    type="number"
                    placeholder="1000"
                    value={formData.memberCount}
                    onChange={(e) => setFormData({...formData, memberCount: e.target.value})}
                  />
                </div>
                {formData.memberCount && (
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{t("totalCost")}:</span>
                      <span className="text-xl font-bold text-blue-600">
                        ${calculateCost()} {t("usd")}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>{t("paymentMethod")}</Label>
                  <select 
                    className="w-full p-2 border rounded-md"
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})}
                  >
                    <option value="">اختر طريقة الدفع</option>
                    <option value="usdt">USDT</option>
                    <option value="paypal">PayPal</option>
                    <option value="bank">تحويل بنكي</option>
                  </select>
                </div>
                
                <div>
                  <Label>{t("uploadProof")}</Label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="file-upload"
                    />
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {formData.paymentProof ? formData.paymentProof.name : 'اضغط لرفع الملف'}
                      </p>
                    </label>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={handleBack}>
                <ArrowRight className="h-4 w-4 mr-2" />
                {t("back")}
              </Button>
              
              {currentStep < 3 ? (
                <Button onClick={handleNext}>
                  {t("next")}
                  <ArrowLeft className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit} 
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  {isProcessing ? t("processing") : t("submit")}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
