'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Link, Users, DollarSign, CheckCircle } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function ProcessSteps() {
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "How TeleTransfer Works",
        subtitle: "Our simple 4-step process makes Telegram member transfer effortless and efficient.",
        step1Title: "Provide Group Links",
        step1Desc: "Enter the public link of the source Telegram group and the private link of your destination group.",
        step2Title: "Specify Members & Pay",
        step2Desc: "Choose the number of members you want to transfer and complete the payment securely.",
        step3Title: "AI Processes Transfer",
        step3Desc: "Our intelligent AI system analyzes and initiates the member migration, ensuring accuracy and speed.",
        step4Title: "Transfer Completed",
        step4Desc: "Receive a confirmation once your members have been successfully transferred to your new group.",
      },
      ar: {
        title: "كيف يعمل TeleTransfer",
        subtitle: "عمليتنا البسيطة المكونة من 4 خطوات تجعل نقل أعضاء تليجرام سهلاً وفعالاً.",
        step1Title: "توفير روابط المجموعات",
        step1Desc: "أدخل الرابط العام لمجموعة تليجرام المصدر والرابط الخاص لمجموعتك الوجهة.",
        step2Title: "تحديد الأعضاء والدفع",
        step2Desc: "اختر عدد الأعضاء الذين تريد نقلهم وأكمل الدفع بأمان.",
        step3Title: "الذكاء الاصطناعي يعالج النقل",
        step3Desc: "يقوم نظام الذكاء الاصطناعي الذكي لدينا بتحليل وبدء ترحيل الأعضاء، مما يضمن الدقة والسرعة.",
        step4Title: "اكتمل النقل",
        step4Desc: "تلقي تأكيدًا بمجرد نقل أعضائك بنجاح إلى مجموعتك الجديدة.",
      },
    }
    return translations[language][key] || key
  }

  const steps = [
    {
      icon: <Link className="h-12 w-12 text-primary" />,
      title: t("step1Title"),
      description: t("step1Desc"),
    },
    {
      icon: <DollarSign className="h-12 w-12 text-green-500" />,
      title: t("step2Title"),
      description: t("step2Desc"),
    },
    {
      icon: <Users className="h-12 w-12 text-purple-500" />,
      title: t("step3Title"),
      description: t("step3Desc"),
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-yellow-500" />,
      title: t("step4Title"),
      description: t("step4Desc"),
    },
  ]

  return (
    <section id="process-steps" className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gradient-custom mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-4">{step.icon}</div>
                <CardTitle className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {step.title}
                </CardTitle>
                <p className="text-gray-700 dark:text-gray-300">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
