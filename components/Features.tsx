'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Brain, Shield, Zap, Globe, Users, BarChart } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

export function Features() {
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "Why Choose TeleTransfer?",
        subtitle: "Experience the next generation of Telegram member management with our cutting-edge features.",
        aiPowered: "AI-Powered Accuracy",
        aiPoweredDesc: "Our advanced AI algorithms ensure precise identification and seamless transfer of members, minimizing errors and maximizing efficiency.",
        securePrivate: "Secure & Private",
        securePrivateDesc: "We prioritize your data security and member privacy. All transfers are conducted with robust encryption and strict confidentiality protocols.",
        lightningFast: "Lightning-Fast Transfers",
        lightningFastDesc: "Leverage our optimized infrastructure for rapid member migration, completing large transfers in record time without compromising integrity.",
        globalReach: "Global Reach",
        globalReachDesc: "Transfer members across any public or private Telegram group, anywhere in the world, with full compatibility and reliability.",
        smartFiltering: "Smart Filtering & Targeting",
        smartFilteringDesc: "Utilize intelligent filters to select specific member demographics or activity levels for highly targeted transfers.",
        realTimeAnalytics: "Real-time Analytics",
        realTimeAnalyticsDesc: "Monitor your transfer progress with live dashboards and detailed reports, giving you full visibility and control.",
      },
      ar: {
        title: "لماذا تختار TeleTransfer؟",
        subtitle: "جرب الجيل التالي من إدارة أعضاء تليجرام مع ميزاتنا المتطورة.",
        aiPowered: "دقة مدعومة بالذكاء الاصطناعي",
        aiPoweredDesc: "تضمن خوارزميات الذكاء الاصطناعي المتقدمة لدينا تحديدًا دقيقًا ونقلًا سلسًا للأعضاء، مما يقلل الأخطاء ويزيد الكفاءة.",
        securePrivate: "آمن وخاص",
        securePrivateDesc: "نحن نعطي الأولوية لأمان بياناتك وخصوصية الأعضاء. تتم جميع التحويلات بتشفير قوي وبروتوكولات سرية صارمة.",
        lightningFast: "تحويلات سريعة للغاية",
        lightningFastDesc: "استفد من بنيتنا التحتية المحسنة لترحيل الأعضاء بسرعة، وإكمال التحويلات الكبيرة في وقت قياسي دون المساس بالنزاهة.",
        globalReach: "وصول عالمي",
        globalReachDesc: "نقل الأعضاء عبر أي مجموعة تليجرام عامة أو خاصة، في أي مكان في العالم، مع توافق وموثوقية كاملين.",
        smartFiltering: "تصفية واستهداف ذكي",
        smartFilteringDesc: "استخدم فلاتر ذكية لتحديد التركيبة السكانية للأعضاء أو مستويات النشاط لنقل مستهدف للغاية.",
        realTimeAnalytics: "تحليلات في الوقت الفعلي",
        realTimeAnalyticsDesc: "راقب تقدم النقل الخاص بك باستخدام لوحات المعلومات المباشرة والتقارير التفصيلية، مما يمنحك رؤية وتحكمًا كاملين.",
      },
    }
    return translations[language][key] || key
  }

  const features = [
    {
      icon: <Brain className="h-10 w-10 text-primary" />,
      title: t("aiPowered"),
      description: t("aiPoweredDesc"),
    },
    {
      icon: <Shield className="h-10 w-10 text-green-500" />,
      title: t("securePrivate"),
      description: t("securePrivateDesc"),
    },
    {
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: t("lightningFast"),
      description: t("lightningFastDesc"),
    },
    {
      icon: <Globe className="h-10 w-10 text-purple-500" />,
      title: t("globalReach"),
      description: t("globalReachDesc"),
    },
    {
      icon: <Users className="h-10 w-10 text-red-500" />,
      title: t("smartFiltering"),
      description: t("smartFilteringDesc"),
    },
    {
      icon: <BarChart className="h-10 w-10 text-teal-500" />,
      title: t("realTimeAnalytics"),
      description: t("realTimeAnalyticsDesc"),
    },
  ]

  return (
    <section id="features" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gradient-custom mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-4">{feature.icon}</div>
                <CardTitle className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {feature.title}
                </CardTitle>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
