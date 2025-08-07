'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Users, TrendingUp, Clock, DollarSign, ArrowRight, BarChart, ShieldCheck } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface DashboardProps {
  onStartWizard: () => void
  onTrackOrder: () => void
  language: 'en' | 'ar'
}

export function Dashboard({ onStartWizard, onTrackOrder, language }: DashboardProps) {
  const t = (key: string) => {
    const translations = {
      en: {
        title: "Your TeleTransfer Dashboard",
        subtitle: "Quick overview of your transfer activities and platform statistics.",
        totalTransfers: "Total Transfers Completed",
        membersTransferred: "Members Transferred",
        averageSuccessRate: "Average Success Rate",
        pendingTransfers: "Pending Transfers",
        quickActions: "Quick Actions",
        startNewTransfer: "Start New Transfer",
        trackExistingOrder: "Track Existing Order",
        recentActivity: "Recent Activity",
        transferTo: "Transfer to",
        members: "members",
        status: "Status",
        completed: "Completed",
        inProgress: "In Progress",
        failed: "Failed",
        viewAllActivity: "View All Activity",
        noRecentActivity: "No recent activity to display.",
      },
      ar: {
        title: "لوحة تحكم TeleTransfer الخاصة بك",
        subtitle: "نظرة عامة سريعة على أنشطة النقل وإحصائيات المنصة.",
        totalTransfers: "إجمالي التحويلات المكتملة",
        membersTransferred: "الأعضاء المنقولون",
        averageSuccessRate: "متوسط معدل النجاح",
        pendingTransfers: "التحويلات المعلقة",
        quickActions: "إجراءات سريعة",
        startNewTransfer: "بدء نقل جديد",
        trackExistingOrder: "تتبع طلب موجود",
        recentActivity: "النشاط الأخير",
        transferTo: "نقل إلى",
        members: "أعضاء",
        status: "الحالة",
        completed: "مكتمل",
        inProgress: "قيد التقدم",
        failed: "فشل",
        viewAllActivity: "عرض كل النشاط",
        noRecentActivity: "لا يوجد نشاط حديث لعرضه.",
      },
    }
    return translations[language][key] || key
  }

  const stats = [
    {
      title: t("totalTransfers"),
      value: "1,250",
      icon: <BarChart className="h-5 w-5 text-primary" />,
    },
    {
      title: t("membersTransferred"),
      value: "1.5M+",
      icon: <Users className="h-5 w-5 text-green-500" />,
    },
    {
      title: t("averageSuccessRate"),
      value: "99.7%",
      icon: <ShieldCheck className="h-5 w-5 text-purple-500" />,
    },
    {
      title: t("pendingTransfers"),
      value: "12",
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
    },
  ]

  const recentActivities = [
    {
      id: 1,
      group: "Crypto Traders Hub",
      members: 5000,
      status: t("completed"),
      progress: 100,
    },
    {
      id: 2,
      group: "NFT Collectors Guild",
      members: 2500,
      status: t("inProgress"),
      progress: 75,
    },
    {
      id: 3,
      group: "AI Enthusiasts Forum",
      members: 1000,
      status: t("failed"),
      progress: 50,
    },
  ]

  return (
    <section id="dashboard" className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gradient-custom mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <Card key={index} className="p-4 shadow-md">
              <CardContent className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-800">
                  {stat.icon}
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{t("quickActions")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button onClick={onStartWizard} className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-blue-500/25 text-white py-3 rounded-xl btn-hover-lift transition-all duration-300">
                <ArrowRight className="h-5 w-5 mr-2" /> {t("startNewTransfer")}
              </Button>
              <Button onClick={onTrackOrder} variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-xl transition-all duration-300">
                <DollarSign className="h-5 w-5 mr-2" /> {t("trackExistingOrder")}
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{t("recentActivity")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 border rounded-md dark:border-gray-700">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {t("transferTo")} {activity.group} ({activity.members} {t("members")})
                      </p>
                      <Progress value={activity.progress} className="w-full mt-1" />
                    </div>
                    <span className={`text-sm font-semibold ${
                      activity.status === t("completed") ? 'text-green-600' :
                      activity.status === t("inProgress") ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {activity.status}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-center text-muted-foreground">{t("noRecentActivity")}</p>
              )}
              <Button variant="link" className="w-full text-primary">
                {t("viewAllActivity")} <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
