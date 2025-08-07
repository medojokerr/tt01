'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { useLanguage } from '@/hooks/useLanguage'
import { Shield, Zap, Users, Lock, BarChart, Headphones, CheckCircle, ArrowRight } from 'lucide-react'

export function FeaturesSection() {
  const { language } = useLanguage()
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)
  const [visibleFeatures, setVisibleFeatures] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "لماذا تختار TeleTransfer؟",
        subtitle: "مميزات متطورة تجعل عملية نقل الأعضاء سهلة وآمنة وذكية",
        feature1Title: "ذكاء اصطناعي متطور",
        feature1Desc: "خوارزميات ذكية تضمن نقل الأعضاء الحقيقيين والنشطين فقط مع تحليل عميق للسلوك",
        feature2Title: "أمان وخصوصية مطلقة",
        feature2Desc: "لا نطلب بيانات تسجيل دخول تليجرام، حماية كاملة لخصوصيتك مع تشفير من الدرجة العسكرية",
        feature3Title: "معدل نجاح استثنائي",
        feature3Desc: "نحقق معدل نجاح 99.8% في عمليات النقل مع ضمان الجودة والأعضاء الحقيقيين",
        feature4Title: "تشفير متقدم",
        feature4Desc: "جميع البيانات مشفرة بأحدث تقنيات الأمان العالمية مع حماية متعددة الطبقات",
        feature5Title: "تقارير ذكية مفصلة",
        feature5Desc: "احصل على تقارير شاملة وتحليلات عميقة عن عملية النقل والنتائج مع رؤى قيمة",
        feature6Title: "دعم فني متميز 24/7",
        feature6Desc: "فريق دعم متخصص متاح على مدار الساعة لمساعدتك مع خبراء في تليجرام"
      },
      en: {
        title: "Why Choose TeleTransfer?",
        subtitle: "Advanced features that make member transfer easy, secure, and intelligent",
        feature1Title: "Advanced AI Technology",
        feature1Desc: "Smart algorithms ensure transfer of only real and active members with deep behavioral analysis",
        feature2Title: "Absolute Security & Privacy",
        feature2Desc: "No Telegram login required, complete protection of your privacy with military-grade encryption",
        feature3Title: "Exceptional Success Rate",
        feature3Desc: "We achieve 99.8% success rate in transfers with quality guarantee and real members",
        feature4Title: "Advanced Encryption",
        feature4Desc: "All data encrypted with latest global security technologies with multi-layer protection",
        feature5Title: "Smart Detailed Reports",
        feature5Desc: "Get comprehensive reports and deep analytics about transfer process and results with valuable insights",
        feature6Title: "Premium 24/7 Support",
        feature6Desc: "Specialized support team available around the clock to help you with Telegram experts"
      }
    }
    return translations[language][key] || key
  }

  const features = [
    {
      icon: <Zap className="h-8 w-8 text-blue-500" />,
      title: t("feature1Title"),
      description: t("feature1Desc"),
      color: 'blue',
      benefits: ['Smart Analysis', 'Real Members Only', 'Behavioral Insights']
    },
    {
      icon: <Shield className="h-8 w-8 text-green-500" />,
      title: t("feature2Title"),
      description: t("feature2Desc"),
      color: 'green',
      benefits: ['No Login Required', 'Military-Grade Encryption', 'Complete Privacy']
    },
    {
      icon: <Users className="h-8 w-8 text-purple-500" />,
      title: t("feature3Title"),
      description: t("feature3Desc"),
      color: 'purple',
      benefits: ['99.8% Success Rate', 'Quality Guarantee', 'Real Members']
    },
    {
      icon: <Lock className="h-8 w-8 text-red-500" />,
      title: t("feature4Title"),
      description: t("feature4Desc"),
      color: 'red',
      benefits: ['Multi-Layer Security', 'Global Standards', 'Data Protection']
    },
    {
      icon: <BarChart className="h-8 w-8 text-yellow-500" />,
      title: t("feature5Title"),
      description: t("feature5Desc"),
      color: 'yellow',
      benefits: ['Detailed Analytics', 'Valuable Insights', 'Progress Tracking']
    },
    {
      icon: <Headphones className="h-8 w-8 text-indigo-500" />,
      title: t("feature6Title"),
      description: t("feature6Desc"),
      color: 'indigo',
      benefits: ['24/7 Availability', 'Expert Support', 'Quick Response']
    }
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleFeatures(prev => {
              const newVisible = [...prev]
              newVisible[index] = true
              return newVisible
            })
          }
        })
      },
      { threshold: 0.1 }
    )

    const featureElements = sectionRef.current?.querySelectorAll('[data-index]')
    featureElements?.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-white to-gray-50 dark:from-gray-950 dark:to-gray-900" ref={sectionRef}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              data-index={index}
              className={`group p-6 hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 bg-white dark:bg-gray-800 cursor-pointer overflow-hidden relative ${
                visibleFeatures[index] ? 'animate-fade-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredFeature(index)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              {/* Hover Effect Background */}
              <div className={`absolute inset-0 bg-gradient-to-br from-${feature.color}-50 to-${feature.color}-100 dark:from-${feature.color}-900/20 dark:to-${feature.color}-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              
              <CardContent className="space-y-4 relative z-10">
                <div className={`w-16 h-16 bg-${feature.color}-100 dark:bg-${feature.color}-900/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
                
                {/* Benefits List - Shows on Hover */}
                <div className={`space-y-2 transition-all duration-300 ${
                  hoveredFeature === index ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 overflow-hidden'
                }`}>
                  {feature.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center space-x-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Learn More Arrow */}
                <div className={`flex items-center text-blue-600 dark:text-blue-400 text-sm font-medium transition-all duration-300 ${
                  hoveredFeature === index ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                }`}>
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4 ml-1" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-full">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              {language === 'ar' ? 'جميع الميزات متاحة في خطة واحدة' : 'All features available in one plan'}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
