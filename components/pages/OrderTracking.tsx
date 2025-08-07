'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Search, CheckCircle, Clock, AlertCircle } from 'lucide-react'

interface OrderTrackingProps {
  language: 'ar' | 'en'
  onBack: () => void
}

export function OrderTracking({ language, onBack }: OrderTrackingProps) {
  const [orderId, setOrderId] = useState('')
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "تتبع الطلب",
        subtitle: "أدخل رقم الطلب لتتبع حالة النقل",
        orderIdLabel: "رقم الطلب",
        search: "بحث",
        back: "العودة",
        status: "الحالة",
        progress: "التقدم",
        details: "تفاصيل الطلب",
        sourceGroup: "المجموعة المصدر",
        targetGroup: "المجموعة الهدف",
        memberCount: "عدد الأعضاء",
        totalCost: "التكلفة الإجمالية",
        createdAt: "تاريخ الإنشاء",
        estimatedCompletion: "الوقت المتوقع للإنجاز",
        statusPending: "في الانتظار",
        statusProcessing: "قيد المعالجة",
        statusCompleted: "مكتمل",
        statusFailed: "فشل",
        notFound: "لم يتم العثور على الطلب"
      },
      en: {
        title: "Track Order",
        subtitle: "Enter your order ID to track transfer status",
        orderIdLabel: "Order ID",
        search: "Search",
        back: "Back",
        status: "Status",
        progress: "Progress",
        details: "Order Details",
        sourceGroup: "Source Group",
        targetGroup: "Target Group",
        memberCount: "Member Count",
        totalCost: "Total Cost",
        createdAt: "Created At",
        estimatedCompletion: "Estimated Completion",
        statusPending: "Pending",
        statusProcessing: "Processing",
        statusCompleted: "Completed",
        statusFailed: "Failed",
        notFound: "Order not found"
      }
    }
    return translations[language][key] || key
  }

  const handleSearch = async () => {
    if (!orderId.trim()) return
    
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock data
    if (orderId.startsWith('TT-')) {
      setOrderData({
        id: orderId,
        status: 'processing',
        progress: 65,
        sourceGroup: 'Crypto Traders Hub',
        targetGroup: 'My Trading Group',
        memberCount: 1500,
        totalCost: 60.00,
        createdAt: '2024-01-15 14:30:00',
        estimatedCompletion: '2024-01-15 18:00:00'
      })
    } else {
      setOrderData(null)
    }
    
    setIsLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'processing':
        return <Clock className="h-5 w-5 text-blue-500" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowRight className="h-4 w-4 mr-2" />
            {t("back")}
          </Button>
          
          <h1 className="text-3xl font-bold mb-2">{t("title")}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t("subtitle")}</p>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="TT-1234567890"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading}>
                <Search className="h-4 w-4 mr-2" />
                {isLoading ? (language === 'ar' ? 'جاري البحث...' : 'Searching...') : t("search")}
              </Button>
            </div>
          </CardContent>
        </Card>

        {orderData && (
          <div className="space-y-6">
            {/* Status Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{t("status")}</span>
                  <Badge className={getStatusColor(orderData.status)}>
                    {getStatusIcon(orderData.status)}
                    <span className="mr-2">
                      {t(`status${orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}`)}
                    </span>
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{t("progress")}</span>
                      <span>{orderData.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${orderData.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Details */}
            <Card>
              <CardHeader>
                <CardTitle>{t("details")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("sourceGroup")}
                    </label>
                    <p className="font-medium">{orderData.sourceGroup}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("targetGroup")}
                    </label>
                    <p className="font-medium">{orderData.targetGroup}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("memberCount")}
                    </label>
                    <p className="font-medium">{orderData.memberCount.toLocaleString()}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("totalCost")}
                    </label>
                    <p className="font-medium">${orderData.totalCost}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("createdAt")}
                    </label>
                    <p className="font-medium">{orderData.createdAt}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {t("estimatedCompletion")}
                    </label>
                    <p className="font-medium">{orderData.estimatedCompletion}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {orderId && !orderData && !isLoading && (
          <Card>
            <CardContent className="p-8 text-center">
              <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">{t("notFound")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'ar' 
                  ? 'تأكد من رقم الطلب وحاول مرة أخرى' 
                  : 'Please check your order ID and try again'
                }
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
