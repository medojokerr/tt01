'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLanguage } from '@/hooks/useLanguage'
import { Star, Quote } from 'lucide-react'

export function Testimonials() {
  const { language } = useLanguage()

  const testimonials = [
    {
      name: language === 'ar' ? 'أحمد محمد' : 'Ahmed Mohamed',
      role: language === 'ar' ? 'مدير مجتمع' : 'Community Manager',
      content: language === 'ar' 
        ? 'أداة رائعة! نقلت 5000 عضو في أقل من ساعة بمعدل نجاح 99.9%. الدعم الفني ممتاز والخدمة احترافية جداً.'
        : 'Amazing tool! Transferred 5000 members in less than an hour with 99.9% success rate. Excellent technical support and very professional service.',
      rating: 5,
      avatar: '/placeholder.svg?height=40&width=40'
    },
    {
      name: language === 'ar' ? 'سارة أحمد' : 'Sarah Ahmed',
      role: language === 'ar' ? 'مسوقة رقمية' : 'Digital Marketer',
      content: language === 'ar'
        ? 'استخدمت الأداة لنقل أعضاء من 3 مجموعات مختلفة. العملية كانت سلسة جداً والنتائج فاقت توقعاتي.'
        : 'Used the tool to transfer members from 3 different groups. The process was very smooth and results exceeded my expectations.',
      rating: 5,
      avatar: '/placeholder.svg?height=40&width=40'
    },
    {
      name: language === 'ar' ? 'محمد علي' : 'Mohamed Ali',
      role: language === 'ar' ? 'رائد أعمال' : 'Entrepreneur',
      content: language === 'ar'
        ? 'الأمان والخصوصية على أعلى مستوى. لم أحتج لتسجيل دخول تليجرام وتمت العملية بسرية تامة.'
        : 'Security and privacy at the highest level. Didn\'t need to login to Telegram and the process was completely confidential.',
      rating: 5,
      avatar: '/placeholder.svg?height=40&width=40'
    }
  ]

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'ar' ? 'ماذا يقول عملاؤنا' : 'What Our Clients Say'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'ar' ? 'تجارب حقيقية من عملاء راضين' : 'Real experiences from satisfied customers'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 border-0 bg-white dark:bg-gray-800">
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <div className="relative">
                  <Quote className="h-8 w-8 text-blue-500 opacity-20 absolute -top-2 -left-2" />
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed pl-6">
                    {testimonial.content}
                  </p>
                </div>
                
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
