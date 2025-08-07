'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowLeft, Search, Clock, CheckCircle, AlertCircle, Users, TrendingUp } from 'lucide-react'

interface OrderTrackingProps {
  onBack: () => void
}

export function OrderTracking({ onBack }: OrderTrackingProps) {
  const { language } = useLanguage()
  const [orderId, setOrderId] = useState('')
  const [orderData, setOrderData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'تتبع الطلب',
        back: 'العودة',
        search: 'بحث',
        orderId: 'رقم الطلب',
        enterOrderId: 'أدخل رقم الطلب',
        status: 'حالة الطلب',
        progress: 'التقدم',
        details: 'تفاصيل الطلب',
        pending: 'في الانتظار',
        processing: 'قيد المعالجة',
        completed: 'مكتمل',
        failed: 'فشل',
        members: 'الأعضاء',
        success: 'معدل النجاح',
        time: 'الوقت المتبقي'
      },
      en: {
        title: 'Order Tracking',
        back: 'Back',
        search: 'Search',
        orderId: 'Order ID',
        enterOrderId: 'Enter Order ID',
        status: 'Order Status',
        progress: 'Progress',
        details: 'Order Details',
        pending: 'Pending',
        processing: 'Processing',
        completed: 'Completed',
        failed: 'Failed',
        members: 'Members',
        success: 'Success Rate',
        time: 'Time Remaining'
      }
    }
    return translations[language][key] || key
  }

  const handleSearch = async () => {
    if (!orderId.trim()) return
    
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Mock order data
    setOrderData({
      id: orderId,
      status: 'processing',
      progress: 65,
      sourceGroup: 'Tech Community',
      targetGroup: 'My Group',
      totalMembers: 5000,
      transferredMembers: 3250,
      successRate: 98.5,
      timeRemaining: '15 minutes',
      startTime: '2024-01-15 10:30:00',
      estimatedCompletion: '2024-01-15 11:45:00'
    })
    
    setIsLoading(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      case 'processing':
        return <TrendingUp className="h-5 w-5 text-blue-500" />
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
        return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20'
      case 'processing':
        return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20'
      case 'completed':
        return 'text-green-600 bg-green-100 dark:bg-green-900/20'
      case 'failed':
        return 'text-red-600 bg-red-100 dark:bg-red-900/20'
      default:
        return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20'
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

          {/* Search */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>{t('search')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4 rtl:space-x-reverse">
                <Input
                  placeholder={t('enterOrderId')}
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  ) : (
                    <Search className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Order Details */}
          {orderData && (
            <div className="space-y-6">
              {/* Status Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{t('status')}</span>
                    <div className={`flex items-center space-x-2 rtl:space-x-reverse px-3 py-1 rounded-full ${getStatusColor(orderData.status)}`}>
                      {getStatusIcon(orderData.status)}
                      <span className="capitalize">{t(orderData.status)}</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                        <span>{t('progress')}</span>
                        <span>{orderData.progress}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000"
                          style={{ width: `${orderData.progress}%` }}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-blue-600">
                          {orderData.transferredMembers.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {t('members')} / {orderData.totalMembers.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <TrendingUp className="h-6 w-6 text-green-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-green-600">
                          {orderData.successRate}%
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{t('success')}</div>
                      </div>
                      
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <Clock className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                        <div className="text-2xl font-bold text-purple-600">
                          {orderData.timeRemaining}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{t('time')}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle>{t('details')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          {t('orderId')}
                        </label>
                        <p className="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-2 rounded">
                          {orderData.id}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Source Group
                        </label>
                        <p>{orderData.sourceGroup}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Target Group
                        </label>
                        <p>{orderData.targetGroup}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Start Time
                        </label>
                        <p>{orderData.startTime}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600 dark:text-gray-400">
                          Estimated Completion
                        </label>
                        <p>{orderData.estimatedCompletion}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
