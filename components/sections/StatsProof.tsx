'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLanguage } from '@/hooks/useLanguage'
import { Star, Users, TrendingUp, Award, CheckCircle2, Quote } from 'lucide-react'

interface StatsProofProps {
  scrollY: number
}

export function StatsProof({ scrollY }: StatsProofProps) {
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
      content: language === 'ar' 
        ? 'أداة رائعة! نقلت 8000 عضو بمعدل نجاح 99.9%. وفرت علي أسابيع من العمل.'
        : 'Amazing tool! Transferred 8000 members with 99.9% success rate. Saved me weeks of work.',
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 8000, success: 99.9 }
    },
    {
      name: language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      role: language === 'ar' ? 'مسوقة رقمية' : 'Digital Marketing Specialist',
      content: language === 'ar'
        ? 'العملية سلسة والنتائج فاقت توقعاتي. الأعضاء المنقولون نشطون ومتفاعلون.'
        : 'Smooth process and results exceeded expectations. Transferred members are active and engaged.',
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 12000, success: 98.7 }
    }
  ]

  const stats = [
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      value: animatedStats.users,
      target: 15000,
      suffix: '+',
      label: language === 'ar' ? 'مستخدم سعيد' : 'Happy Users'
    },
    {
      icon: <TrendingUp className="h-5 w-5 text-green-500" />,
      value: animatedStats.success,
      target: 99.8,
      suffix: '%',
      label: language === 'ar' ? 'معدل النجاح' : 'Success Rate'
    },
    {
      icon: <Award className="h-5 w-5 text-purple-500" />,
      value: animatedStats.transferred,
      target: 250000,
      suffix: '+',
      label: language === 'ar' ? 'عضو تم نقلهم' : 'Members Transferred'
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      value: animatedStats.satisfaction,
      target: 98.5,
      suffix: '%',
      label: language === 'ar' ? 'رضا العملاء' : 'Customer Satisfaction'
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
        users: Math.min(prev.users + Math.floor(Math.random() * 50), 15000),
        success: Math.min(prev.success + 0.1, 99.8),
        transferred: Math.min(prev.transferred + Math.floor(Math.random() * 500), 250000),
        satisfaction: Math.min(prev.satisfaction + 0.1, 98.5)
      }))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-20 bg-gray-50/50 dark:bg-gray-800/50 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Stats & Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                <span className="bg-gradient-to-r from-gray-900 to-green-600 bg-clip-text text-transparent dark:from-white dark:to-green-400">
                  {language === 'ar' ? 'أرقام تتحدث عن نفسها' : 'Numbers Speak for Themselves'}
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {language === 'ar' 
                  ? 'آلاف العملاء يثقون بنا حول العالم'
                  : 'Thousands of clients trust us worldwide'
                }
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm p-6 rounded-xl border border-gray-200/50 dark:border-gray-700/50 text-center hover:shadow-lg transition-all duration-300"
                  style={{ transform: `translateY(${scrollY * 0.01 * (index + 1)}px)` }}
                >
                  <div className="flex items-center justify-center mb-3">
                    {stat.icon}
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value.toLocaleString()}{stat.suffix}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial */}
          <div className="relative">
            <Card 
              className="p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl"
              style={{ transform: `translateY(${scrollY * 0.02}px)` }}
            >
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <Quote className="h-8 w-8 text-blue-500 opacity-50" />
                  <div className="flex space-x-1 rtl:space-x-reverse">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                
                <blockquote className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                  "{current.content}"
                </blockquote>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{current.stats.members.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{language === 'ar' ? 'عضو' : 'Members'}</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{current.stats.success}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{language === 'ar' ? 'نجاح' : 'Success'}</div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 rtl:space-x-reverse pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={current.avatar || "/placeholder.svg"} alt={current.name} />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {current.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 rtl:space-x-reverse">
                      <p className="font-semibold">{current.name}</p>
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{current.role}</p>
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
                      ? 'bg-blue-500 scale-125' 
                      : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
