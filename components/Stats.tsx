'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Users, TrendingUp, ShieldCheck, Zap } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function Stats() {
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "Our Achievements Speak for Themselves",
        subtitle: "See why TeleTransfer is the trusted choice for Telegram member transfers.",
        membersTransferred: "Members Transferred",
        successRate: "Success Rate",
        satisfiedClients: "Satisfied Clients",
        averageTransferTime: "Average Transfer Time",
        hours: "hours",
      },
      ar: {
        title: "إنجازاتنا تتحدث عن نفسها",
        subtitle: "اكتشف لماذا TeleTransfer هو الخيار الموثوق به لنقل أعضاء تليجرام.",
        membersTransferred: "الأعضاء المنقولون",
        successRate: "معدل النجاح",
        satisfiedClients: "عملاء راضون",
        averageTransferTime: "متوسط وقت النقل",
        hours: "ساعات",
      },
    }
    return translations[language][key] || key
  }

  return (
    <section id="stats" className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gradient-custom mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center">
              <Users className="h-12 w-12 text-primary mb-4" />
              <div className="text-5xl font-bold text-gray-900 dark:text-white">1M+</div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t("membersTransferred")}</p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center">
              <TrendingUp className="h-12 w-12 text-green-500 mb-4" />
              <div className="text-5xl font-bold text-gray-900 dark:text-white">99.8%</div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t("successRate")}</p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center">
              <ShieldCheck className="h-12 w-12 text-purple-500 mb-4" />
              <div className="text-5xl font-bold text-gray-900 dark:text-white">50K+</div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t("satisfiedClients")}</p>
            </CardContent>
          </Card>

          <Card className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
            <CardContent className="flex flex-col items-center justify-center">
              <Zap className="h-12 w-12 text-yellow-500 mb-4" />
              <div className="text-5xl font-bold text-gray-900 dark:text-white">24 {t("hours")}</div>
              <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">{t("averageTransferTime")}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
