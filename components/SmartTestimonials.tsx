'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { useLanguage } from '@/hooks/useLanguage'
import { Star, Quote, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'

export function SmartTestimonials() {
  const { language } = useLanguage()
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: language === 'ar' ? 'مدير مجتمع العملات المشفرة' : 'Crypto Community Manager',
      company: 'CryptoHub',
      content: language === 'ar' 
        ? 'أداة رائعة حقاً! نقلت 8000 عضو في أقل من ساعتين بمعدل نجاح 99.9%. الذكاء الاصطناعي فلتر الأعضاء الحقيقيين بدقة مذهلة. الدعم الفني ممتاز والخدمة احترافية جداً. أنصح بها بشدة!'
        : 'Truly amazing tool! Transferred 8000 members in less than 2 hours with 99.9% success rate. The AI filtered real members with incredible accuracy. Excellent technical support and very professional service. Highly recommend!',
      rating: 5,
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 8000, time: '2 hours', success: 99.9 }
    },
    {
      name: language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      role: language === 'ar' ? 'مسوقة رقمية' : 'Digital Marketing Specialist',
      company: 'MarketPro Agency',
      content: language === 'ar'
        ? 'استخدمت الأداة لنقل أعضاء من 5 مجموعات مختلفة لعملائي. العملية كانت سلسة جداً والنتائج فاقت توقعاتي. الأعضاء المنقولين كانوا نشطين ومتفاعلين. وفرت علي أسابيع من العمل اليدوي.'
        : 'Used the tool to transfer members from 5 different groups for my clients. The process was very smooth and results exceeded my expectations. Transferred members were active and engaged. Saved me weeks of manual work.',
      rating: 5,
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 12000, time: '4 hours', success: 98.7 }
    },
    {
      name: language === 'ar' ? 'محمد علي' : 'Mohamed Ali',
      role: language === 'ar' ? 'رائد أعمال تقني' : 'Tech Entrepreneur',
      company: 'TechStart',
      content: language === 'ar'
        ? 'الأمان والخصوصية على أعلى مستوى. لم أحتج لتسجيل دخول تليجرام وتمت العملية بسرية تامة. الذكاء الاصطناعي ذكي جداً في اختيار الأعضاء المناسبين. استثمار ممتاز لنمو المجتمع.'
        : 'Security and privacy at the highest level. Didn\'t need to login to Telegram and the process was completely confidential. The AI is very smart in selecting suitable members. Excellent investment for community growth.',
      rating: 5,
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 6500, time: '1.5 hours', success: 99.2 }
    },
    {
      name: language === 'ar' ? 'فاطمة حسن' : 'Fatima Hassan',
      role: language === 'ar' ? 'مديرة محتوى' : 'Content Manager',
      company: 'ContentCorp',
      content: language === 'ar'
        ? 'التقارير المفصلة والتحليلات العميقة ساعدتني في فهم جمهوري بشكل أفضل. الأداة لا تنقل الأعضاء فقط، بل تقدم رؤى قيمة عن سلوكهم واهتماماتهم. خدمة عملاء استثنائية!'
        : 'Detailed reports and deep analytics helped me understand my audience better. The tool doesn\'t just transfer members, but provides valuable insights about their behavior and interests. Exceptional customer service!',
      rating: 5,
      avatar: '/placeholder.svg?height=60&width=60',
      stats: { members: 4200, time: '1 hour', success: 99.5 }
    }
  ]

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial(prev => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial(prev => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[currentTestimonial]

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'ar' ? 'قصص نجاح حقيقية' : 'Real Success Stories'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'ar' ? 'تجارب ملهمة من عملاء حققوا نتائج استثنائية' : 'Inspiring experiences from clients who achieved exceptional results'}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-white dark:bg-gray-800 shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full -translate-y-16 translate-x-16"></div>
            
            <CardContent className="relative z-10">
              {/* Controls */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="rounded-full"
                  >
                    {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {isAutoPlaying ? 'Auto-playing' : 'Paused'}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={prevTestimonial}
                    className="rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {currentTestimonial + 1} / {testimonials.length}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={nextTestimonial}
                    className="rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Main Testimonial */}
              <div className="text-center space-y-6">
                {/* Quote Icon */}
                <Quote className="h-12 w-12 text-blue-500 opacity-30 mx-auto" />
                
                {/* Rating */}
                <div className="flex justify-center space-x-1">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <blockquote className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed italic max-w-3xl mx-auto">
                  "{current.content}"
                </blockquote>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto">
                  <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="text-xl font-bold text-blue-600">{current.stats.members.toLocaleString()}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Members</div>
                  </div>
                  <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="text-xl font-bold text-green-600">{current.stats.time}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Time</div>
                  </div>
                  <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="text-xl font-bold text-purple-600">{current.stats.success}%</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">Success</div>
                  </div>
                </div>

                {/* Author */}
                <div className="flex items-center justify-center space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={current.avatar || "/placeholder.svg"} alt={current.name} />
                    <AvatarFallback>{current.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-lg">{current.name}</p>
                    <p className="text-gray-600 dark:text-gray-400">{current.role}</p>
                    <p className="text-sm text-blue-600 dark:text-blue-400">{current.company}</p>
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center space-x-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial 
                        ? 'bg-blue-500 scale-125' 
                        : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                    }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
