'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Star } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface Testimonial {
  name: string
  role: string
  avatar: string
  rating: number
  feedback: string
}

export function EnhancedTestimonials() {
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "What Our Clients Say",
        subtitle: "Hear from satisfied community managers who have transformed their Telegram groups with TeleTransfer.",
        avatarFallback: "CN", // Client Name fallback
      },
      ar: {
        title: "ماذا يقول عملاؤنا",
        subtitle: "استمع إلى آراء مديري المجتمعات الراضين الذين قاموا بتحويل مجموعات تليجرام الخاصة بهم باستخدام TeleTransfer.",
        avatarFallback: "اسم العميل",
      },
    }
    return translations[language][key] || key
  }

  const testimonials: Testimonial[] = [
    {
      name: 'Sarah M.',
      role: 'Crypto Community Manager',
      avatar: '/placeholder-user.png',
      rating: 5,
      feedback: language === 'en' ? "TeleTransfer revolutionized how we manage our crypto community. The AI-powered transfers are incredibly accurate and fast. Highly recommended!" : "لقد أحدثت TeleTransfer ثورة في كيفية إدارة مجتمع العملات المشفرة لدينا. عمليات النقل المدعومة بالذكاء الاصطناعي دقيقة وسريعة بشكل لا يصدق. موصى به للغاية!",
    },
    {
      name: 'Ahmed F.',
      role: 'Marketing Agency Owner',
      avatar: '/placeholder-user.jpg',
      rating: 5,
      feedback: language === 'en' ? "As an agency, we need reliable tools. TeleTransfer delivers! Seamless member migration, excellent support, and truly boosts our clients' growth." : "بصفتنا وكالة، نحتاج إلى أدوات موثوقة. TeleTransfer تقدم ذلك! ترحيل سلس للأعضاء، دعم ممتاز، ويعزز نمو عملائنا حقًا.",
    },
    {
      name: 'Maria P.',
      role: 'Online Course Creator',
      avatar: '/placeholder-user.png',
      rating: 4,
      feedback: language === 'en' ? "Moving my students to a new private group was a breeze. The process was straightforward, and the support team was very helpful with my specific needs." : "كان نقل طلابي إلى مجموعة خاصة جديدة أمرًا سهلاً. كانت العملية مباشرة، وكان فريق الدعم متعاونًا للغاية مع احتياجاتي الخاصة.",
    },
    {
      name: 'David L.',
      role: 'Gaming Community Admin',
      avatar: '/placeholder-user.jpg',
      rating: 5,
      feedback: language === 'en' ? "I was skeptical at first, but TeleTransfer exceeded my expectations. It saved me countless hours and ensured all active members were transferred without issues." : "كنت متشككًا في البداية، لكن TeleTransfer تجاوزت توقعاتي. لقد وفرت علي ساعات لا تحصى وضمنت نقل جميع الأعضاء النشطين دون مشاكل.",
    },
  ]

  return (
    <section id="testimonials" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gradient-custom mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardContent className="flex flex-col items-center text-center">
                <Avatar className="h-16 w-16 mb-4">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                  <AvatarFallback>{t("avatarFallback")}</AvatarFallback>
                </Avatar>
                <div className="flex mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic mb-4">
                  &quot;{testimonial.feedback}&quot;
                </p>
                <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
