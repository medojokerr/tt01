'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLanguage } from '@/hooks/useLanguage'
import { Star, Quote, TrendingUp, Users, Award, CheckCircle } from 'lucide-react'

interface SocialProofProps {
  scrollY: number
}

export function SocialProof({ scrollY }: SocialProofProps) {
  const { language } = useLanguage()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    success: 0,
    transferred: 0,
    satisfaction: 0
  })

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: language === 'ar' ? 'مدير مجتمع تقني' : 'Tech Community Manager',
      company: 'TechHub',
      content: language === 'ar' 
        ? 'أداة رائعة حقاً! نقلت 8000 عضو بمعدل نجاح 99.9%. الذكاء الاصطناعي دقيق جداً في فلترة الأعضاء الحقيقيين. وفرت علي أسابيع من العمل اليدوي.'
        : 'Amazing tool! Transferred 8000 members with 99.9% success rate. AI is very accurate in filtering real members. Saved me weeks of manual work.',
      rating: 5,
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 8000, success: 99.9, time: '2 hours' },
      verified: true
    },
    {
      name: language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      role: language === 'ar' ? 'مسوقة رقمية' : 'Digital Marketing Specialist',
      company: 'MarketPro',
      content: language === 'ar'
        ? 'العملية سلسة والنتائج فاقت توقعاتي. الأعضاء المنقولون نشطون ومتفاعلون. خدمة العملاء ممتازة والدعم سريع جداً.'
        : 'Smooth process and results exceeded expectations. Transferred members are active and engaged. Excellent customer service and very fast support.',
      rating: 5,
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 12000, success: 98.7, time: '3 hours' },
      verified: true
    },
    {
      name: language === 'ar' ? 'محمد علي' : 'Mohamed Ali',
      role: language === 'ar' ? 'رائد أعمال' : 'Entrepreneur',
      company: 'StartupX',
      content: language === 'ar'
        ? 'الأمان والخصوصية ممتازة. لم أحتج لتسجيل دخول تليجرام أو مشاركة أي بيانات حساسة. النتائج احترافية والتقارير مفصلة.'
        : 'Security and privacy are excellent. No need to login to Telegram or share sensitive data. Professional results and detailed reports.',
      rating: 5,
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 6500, success: 99.2, time: '1.5 hours' },
      verified: true
    },
    {
      name: language === 'ar' ? 'فاطمة حسن' : 'Fatima Hassan',
      role: language === 'ar' ? 'مديرة محتوى' : 'Content Manager',
      company: 'ContentCorp',
      content: language === 'ar'
        ? 'استخدمت الأداة لنقل أعضاء من 5 مجموعات مختلفة. النتائج متسقة والجودة عالية. أنصح بها بشدة لأي شخص يريد توسيع مجتمعه.'
        : 'Used the tool to transfer members from 5 different groups. Consistent results and high quality. Highly recommend for anyone looking to expand their community.',
      rating: 5,
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 15000, success: 99.5, time: '4 hours' },
      verified: true
    }
  ]

  const stats = [
    {
      icon: <Users className="h-6 w-6 text-blue-500" />,
      value: animatedStats.users,
      target: 15000,
      suffix: '+',
      label: language === 'ar' ? 'مستخدم سعيد' : 'Happy Users',
      color: 'blue'
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-green-500" />,
      value: animatedStats.success,
      target: 99.8,
      suffix: '%',
      label: language === 'ar' ? 'معدل النجاح' : 'Success Rate',
      color: 'green'
    },
    {
      icon: <Award className="h-6 w-6 text-purple-500" />,
      value: animatedStats.transferred,
      target: 250000,
      suffix: '+',
      label: language === 'ar' ? 'عضو تم نقلهم' : 'Members Transferred',
      color: 'purple'
    },
    {
      icon: <Star className="h-6 w-6 text-yellow-500" />,
      value: animatedStats.satisfaction,
      target: 98.5,
      suffix: '%',
      label: language === 'ar' ? 'رضا العملاء' : 'Customer Satisfaction',
      color: 'yellow'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Animate stats
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        users: Math.min(prev.users + Math.floor(Math.random() * 100), 15000),
        success: Math.min(prev.success + 0.1, 99.8),
        transferred: Math.min(prev.transferred + Math.floor(Math.random() * 1000), 250000),
        satisfaction: Math.min(prev.satisfaction + 0.1, 98.5)
      }))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * 0.03}px) rotate(${scrollY * 0.02}deg)` }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/10 to-yellow-500/10 rounded-full blur-3xl"
          style={{ transform: `translateY(${scrollY * -0.02}px) rotate(${scrollY * -0.02}deg)` }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 rtl:space-x-reverse bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-full">
                <CheckCircle className="h-4 w-4 text-green-600 animate-pulse" />
                <span className="text-green-600 dark:text-green-400 font-medium text-sm">
                  {language === 'ar' ? 'موثوق عالمياً' : 'Globally Trusted'} • {language === 'ar' ? 'نتائج مضمونة' : 'Guaranteed Results'}
                </span>
              </div>

              <h2 className="text-3xl md:text-5xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {language === 'ar' ? 'قصص نجاح حقيقية' : 'Real Success Stories'}
                </span>
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                {language === 'ar' ? 'تجارب ملهمة من عملائنا حول العالم' : 'Inspiring experiences from our clients worldwide'}
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                {language === 'ar' 
                  ? 'اكتشف كيف ساعدنا آلاف العملاء في تحقيق أهدافهم بنجاح'
                  : 'Discover how we helped thousands of clients achieve their goals successfully'
                }
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center p-4 bg-${stat.color}-50 dark:bg-${stat.color}-900/20 rounded-xl border border-${stat.color}-200 dark:border-${stat.color}-800 hover:scale-105 transition-transform duration-300`}
                  style={{ transform: `translateY(${scrollY * 0.01 * (index + 1)}px)` }}
                >
                  <div className="flex items-center justify-center mb-2">
                    {stat.icon}
                  </div>
                  <div className={`text-2xl font-bold text-${stat.color}-600 mb-1`}>
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm font-medium">{language === 'ar' ? 'معتمد وآمن' : 'Certified & Safe'}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">{language === 'ar' ? 'تقييم 5 نجوم' : '5-Star Rated'}</span>
              </div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700">
                <Award className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium">{language === 'ar' ? 'الأفضل في فئته' : 'Best in Class'}</span>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative">
            <Card 
              className="p-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-2xl rounded-3xl"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            >
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Quote className="h-12 w-12 text-blue-500 opacity-30" />
                  {current.verified && (
                    <div className="flex items-center space-x-1 rtl:space-x-reverse bg-green-100 dark:bg-green-900/30 px-3 py-1 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                        {language === 'ar' ? 'عميل موثق' : 'Verified Client'}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-1 rtl:space-x-reverse">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>

                <blockquote className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{current.content}"
                </blockquote>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="text-xl font-bold text-blue-600">{current.stats.members.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{language === 'ar' ? 'عضو' : 'Members'}</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="text-xl font-bold text-green-600">{current.stats.success}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{language === 'ar' ? 'نجاح' : 'Success'}</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                    <div className="text-xl font-bold text-purple-600">{current.stats.time}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{language === 'ar' ? 'الوقت' : 'Time'}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Avatar className="h-12 w-12 ring-2 ring-blue-500">
                    <AvatarImage src={current.avatar || "/placeholder.svg"} alt={current.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">
                      {current.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <p className="font-semibold">{current.name}</p>
                      {current.verified && <CheckCircle className="h-4 w-4 text-green-500" />}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{current.role}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-500">{current.company}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Dots */}
            <div className="flex justify-center space-x-2 rtl:space-x-reverse mt-6">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentTestimonial 
                      ? 'bg-blue-500 scale-125 shadow-lg' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-bounce opacity-60" />
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-green-500 to-blue-500 rounded-full animate-bounce delay-500 opacity-60" />
          </div>
        </div>
      </div>
    </section>
  )
}
