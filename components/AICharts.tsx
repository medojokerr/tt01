import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, LineChart, PieChart } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function AICharts() {
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "AI-Powered Analytics Charts",
        transferSuccessRate: "Transfer Success Rate",
        memberRetention: "Member Retention Over Time",
        sourceDestinationBreakdown: "Source vs. Destination Breakdown",
        dailyTransfers: "Daily Transfers Volume",
        dataPlaceholder: "Data visualization placeholder",
      },
      ar: {
        title: "رسوم بيانية تحليلية مدعومة بالذكاء الاصطناعي",
        transferSuccessRate: "معدل نجاح النقل",
        memberRetention: "احتفاظ الأعضاء بمرور الوقت",
        sourceDestinationBreakdown: "توزيع المصدر مقابل الوجهة",
        dailyTransfers: "حجم التحويلات اليومية",
        dataPlaceholder: "عنصر نائب لتصور البيانات",
      },
    }
    return translations[language][key] || key
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("transferSuccessRate")}</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            {t("dataPlaceholder")} (Bar Chart)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("memberRetention")}</CardTitle>
          <LineChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            {t("dataPlaceholder")} (Line Chart)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("sourceDestinationBreakdown")}</CardTitle>
          <PieChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            {t("dataPlaceholder")} (Pie Chart)
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t("dailyTransfers")}</CardTitle>
          <BarChart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            {t("dataPlaceholder")} (Bar Chart)
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
