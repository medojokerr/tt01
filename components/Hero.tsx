'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import { ArrowRight, Play, Shield, Zap, Users } from 'lucide-react'

interface HeroProps {
  language: 'en' | 'ar'
  onStartTransfer: () => void
}

export function Hero({ language, onStartTransfer }: HeroProps) {
  const t = (key: string) => {
    const translations = {
      en: {
        badge: "AI-Powered Transfer System",
        title: "Transfer Telegram Members with AI Intelligence",
        subtitle: "Seamlessly migrate members between Telegram groups using our advanced AI system. Achieve 99.8% success rate with complete privacy and security.",
        startTransfer: "Start Transfer Now",
        watchDemo: "Watch Demo",
        trustedBy: "Trusted by 50,000+ community managers worldwide",
        feature1: "99.8% Success Rate",
        feature2: "AI-Powered Accuracy",
        feature3: "Complete Privacy",
        feature4: "24/7 Support",
      },
      ar: {
        badge: "نظام النقل المدعوم بالذكاء الاصطناعي",
        title: "انقل أعضاء تليجرام بذكاء اصطناعي متقدم",
        subtitle: "انقل الأعضاء بسلاسة بين مجموعات تليجرام باستخدام نظامنا المتطور للذكاء الاصطناعي. حقق معدل نجاح 99.8% مع خصوصية وأمان كاملين.",
        startTransfer: "ابدأ النقل الآن",
        watchDemo: "شاهد العرض التوضيحي",
        trustedBy: "موثوق به من قبل أكثر من 50,000 مدير مجتمع حول العالم",
        feature1: "معدل نجاح 99.8%",
        feature2: "دقة مدعومة بالذكاء الاصطناعي",
        feature3: "خصوصية كاملة",
        feature4: "دعم على مدار الساعة",
      },
    }
    return translations[language][key] || key
  }

  const features = [
    { icon: <Shield className="h-5 w-5" />, text: t("feature1") },
    { icon: <Zap className="h-5 w-5" />, text: t("feature2") },
    { icon: <Users className="h-5 w-5" />, text: t("feature3") },
    { icon: <Shield className="h-5 w-5" />, text: t("feature4") },
  ]

  return (
    <section id="hero" className="relative w-full py-16 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-mesh"></div>
        <Image
          src="/abstract-network.png"
          alt="Abstract Network Background"
          fill
          className="object-cover animate-fade-in"
          priority
        />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/10 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-purple-500/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 left-20 w-12 h-12 bg-yellow-500/10 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="animate-slide-in-top">
              <Badge variant="outline" className="px-4 py-2 text-sm font-medium bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-primary/20">
                <Zap className="h-4 w-4 mr-2 text-primary" />
                {t("badge")}
              </Badge>
            </div>

            {/* Main Title */}
            <div className="space-y-4 animate-fade-in-delay">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
                <span className="text-gradient-custom">
                  {t("title")}
                </span>
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed max-w-4xl mx-auto">
                {t("subtitle")}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6 animate-slide-in-bottom">
              <Button
                onClick={onStartTransfer}
                size="lg"
                className="bg-gradient-primary hover:shadow-lg hover:shadow-blue-500/25 text-white py-4 px-8 rounded-xl text-lg font-semibold btn-hover-lift transition-all duration-300 group"
              >
                {t("startTransfer")}
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-4 px-8 rounded-xl text-lg font-semibold transition-all duration-300 group"
              >
                <Play className="h-5 w-5 mr-2 group-hover:scale-110 transition-transform" />
                {t("watchDemo")}
              </Button>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 animate-fade-in-delay-more">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center space-x-2 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-gray-200/50 dark:border-gray-700/50">
                  <div className="text-primary">{feature.icon}</div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Trust Indicator */}
            <div className="pt-8 animate-fade-in-delay-more">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {t("trustedBy")}
              </p>
              <div className="flex justify-center items-center space-x-8 opacity-60">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
