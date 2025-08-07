'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Users, DollarSign, TrendingUp, Settings, Eye, EyeOff } from 'lucide-react'

interface AdminDashboardProps {
  language: 'ar' | 'en'
  onBack: () => void
}

export function AdminDashboard({ language, onBack }: AdminDashboardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "لوحة التحكم الإدارية",
        password: "كلمة المرور",
        login: "دخول",
        wrongPassword: "كلمة مرور خاطئة",
        dashboard: "لوحة التحكم",
        orders: "الطلبات",
        settings: "الإعدادات",
        totalOrders: "إجمالي الطلبات",
        totalRevenue: "إجمالي الإيرادات",
        activeTransfers: "النقل النشط",
        successRate: "معدل النجاح",
        recentOrders: "الطلبات الأخيرة",
        orderId: "رقم الطلب",
        customer: "العميل",
        amount: "المبلغ",
        status: "الحالة",
        actions: "الإجراءات",
        view: "عرض",
        pending: "في الانتظار",
        processing: "قيد المعالجة",
        completed: "مكتمل"
      },
      en: {
        title: "Admin Dashboard",
        password: "Password",
        login: "Login",
        wrongPassword: "Wrong password",
        dashboard: "Dashboard",
        orders: "Orders",
        settings: "Settings",
        totalOrders: "Total Orders",
        totalRevenue: "Total Revenue",
        activeTransfers: "Active Transfers",
        successRate: "Success Rate",
        recentOrders: "Recent Orders",
        orderId: "Order ID",
        customer: "Customer",
        amount: "Amount",
        status: "Status",
        actions: "Actions",
        view: "View",
        pending: "Pending",
        processing: "Processing",
        completed: "Completed"
      }
    }
    return translations[language][key] || key
  }

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsAuthenticated(true)
    } else {
      alert(t("wrongPassword"))
    }
  }

  const stats = [
    {
      title: t("totalOrders"),
      value: "1,234",
      icon: <Users className="h-6 w-6 text-blue-500" />,
      change: "+12%"
    },
    {
      title: t("totalRevenue"),
      value: "$45,678",
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      change: "+8%"
    },
    {
      title: t("activeTransfers"),
      value: "23",
      icon: <TrendingUp className="h-6 w-6 text-purple-500" />,
      change: "+5%"
    },
    {
      title: t("successRate"),
      value: "99.8%",
      icon: <Settings className="h-6 w-6 text-orange-500" />,
      change: "+0.2%"
    }
  ]

  const recentOrders = [
    {
      id: "TT-1234567890",
      customer: "user@example.com",
      amount: "$120.00",
      status: "completed"
    },
    {
      id: "TT-1234567891",
      customer: "user2@example.com",
      amount: "$85.50",
      status: "processing"
    },
    {
      id: "TT-1234567892",
      customer: "user3@example.com",
      amount: "$200.00",
      status: "pending"
    }
  ]

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">{t("title")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">{t("password")}</label>
              <input
                type="password"
                className="w-full p-2 border rounded-md mt-1"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button onClick={handleLogin} className="w-full">
              {t("login")}
            </Button>
            <Button variant="outline" onClick={onBack} className="w-full">
              <ArrowRight className="h-4 w-4 mr-2" />
              {language === 'ar' ? 'العودة' : 'Back'}
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowRight className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'العودة' : 'Back'}
          </Button>
          <h1 className="text-3xl font-bold">{t("title")}</h1>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList>
            <TabsTrigger value="dashboard">{t("dashboard")}</TabsTrigger>
            <TabsTrigger value="orders">{t("orders")}</TabsTrigger>
            <TabsTrigger value="settings">{t("settings")}</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
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
                <CardTitle>{t("recentOrders")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">{t("orderId")}</th>
                        <th className="text-left p-2">{t("customer")}</th>
                        <th className="text-left p-2">{t("amount")}</th>
                        <th className="text-left p-2">{t("status")}</th>
                        <th className="text-left p-2">{t("actions")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-mono text-sm">{order.id}</td>
                          <td className="p-2">{order.customer}</td>
                          <td className="p-2 font-medium">{order.amount}</td>
                          <td className="p-2">
                            <Badge variant={
                              order.status === 'completed' ? 'default' :
                              order.status === 'processing' ? 'secondary' : 'outline'
                            }>
                              {t(order.status)}
                            </Badge>
                          </td>
                          <td className="p-2">
                            <Button size="sm" variant="ghost">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>{t("orders")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'إدارة جميع الطلبات' : 'Manage all orders'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>{t("settings")}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'إعدادات النظام' : 'System settings'}
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
