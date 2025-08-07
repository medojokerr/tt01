'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useLanguage } from '@/hooks/useLanguage'
import { ArrowLeft, Users, Activity, DollarSign, TrendingUp, Settings, Eye, EyeOff } from 'lucide-react'

interface AdminPanelProps {
  onBack: () => void
}

export function AdminPanel({ onBack }: AdminPanelProps) {
  const { language } = useLanguage()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true)
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <div className="flex items-center space-x-4 mb-8">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-2xl font-bold">
                {language === 'ar' ? 'لوحة الإدارة' : 'Admin Panel'}
              </h1>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>
                  {language === 'ar' ? 'تسجيل الدخول' : 'Admin Login'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="password"
                  placeholder={language === 'ar' ? 'كلمة المرور' : 'Password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                />
                <Button onClick={handleLogin} className="w-full">
                  {language === 'ar' ? 'دخول' : 'Login'}
                </Button>
                <p className="text-xs text-gray-500 text-center">
                  Demo password: admin123
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  const stats = [
    {
      title: language === 'ar' ? 'إجمالي الطلبات' : 'Total Orders',
      value: '1,234',
      change: '+12%',
      icon: <Users className="h-6 w-6 text-blue-500" />
    },
    {
      title: language === 'ar' ? 'الطلبات النشطة' : 'Active Orders',
      value: '89',
      change: '+5%',
      icon: <Activity className="h-6 w-6 text-green-500" />
    },
    {
      title: language === 'ar' ? 'الإيرادات' : 'Revenue',
      value: '$12,345',
      change: '+18%',
      icon: <DollarSign className="h-6 w-6 text-yellow-500" />
    },
    {
      title: language === 'ar' ? 'معدل النجاح' : 'Success Rate',
      value: '99.8%',
      change: '+0.2%',
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />
    }
  ]

  const recentOrders = [
    {
      id: 'TT-2024-001234',
      source: '@techgroup',
      target: '@newtech',
      members: 1000,
      status: 'processing',
      progress: 65
    },
    {
      id: 'TT-2024-001235',
      source: '@marketing',
      target: '@digitalmarketing',
      members: 500,
      status: 'completed',
      progress: 100
    },
    {
      id: 'TT-2024-001236',
      source: '@crypto',
      target: '@blockchain',
      members: 2000,
      status: 'pending',
      progress: 0
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">
                {language === 'ar' ? 'لوحة الإدارة' : 'Admin Dashboard'}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {language === 'ar' ? 'إدارة ومراقبة النظام' : 'System management and monitoring'}
              </p>
            </div>
          </div>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'الإعدادات' : 'Settings'}
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  {stat.icon}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <CardTitle>
              {language === 'ar' ? 'الطلبات الأخيرة' : 'Recent Orders'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-semibold">{order.id}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {order.source} → {order.target}
                        </p>
                      </div>
                      <Badge variant={
                        order.status === 'completed' ? 'default' :
                        order.status === 'processing' ? 'secondary' : 'outline'
                      }>
                        {order.status === 'completed' ? (language === 'ar' ? 'مكتمل' : 'Completed') :
                         order.status === 'processing' ? (language === 'ar' ? 'قيد المعالجة' : 'Processing') :
                         (language === 'ar' ? 'في الانتظار' : 'Pending')}
                      </Badge>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>{order.members.toLocaleString()} members</span>
                        <span>{order.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
