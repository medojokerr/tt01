'use client'

import React from 'react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useLanguage } from '@/hooks/useLanguage'

export function EnhancedFAQ() {
  const { language } = useLanguage()

  const faqs = [
    {
      question: language === 'ar' ? 'هل الأداة آمنة للاستخدام؟' : 'Is the tool safe to use?',
      answer: language === 'ar' 
        ? 'نعم، الأداة آمنة تماماً. نحن لا نطلب بيانات تسجيل دخول تليجرام ونستخدم تقنيات تشفير متقدمة لحماية خصوصيتك.'
        : 'Yes, the tool is completely safe. We don\'t ask for Telegram login credentials and use advanced encryption technologies to protect your privacy.'
    },
    {
      question: language === 'ar' ? 'كم يستغرق نقل الأعضاء؟' : 'How long does member transfer take?',
      answer: language === 'ar'
        ? 'يعتمد على عدد الأعضاء المطلوب نقلهم. عادة ما يستغرق من 30 دقيقة إلى 3 ساعات للمجموعات الكبيرة.'
        : 'It depends on the number of members to be transferred. Usually takes 30 minutes to 3 hours for large groups.'
    },
    {
      question: language === 'ar' ? 'ما هو معدل النجاح؟' : 'What is the success rate?',
      answer: language === 'ar'
        ? 'نحقق معدل نجاح 99.8% في عمليات النقل مع ضمان استرداد المال في حالة عدم الرضا.'
        : 'We achieve a 99.8% success rate in transfers with money-back guarantee if not satisfied.'
    },
    {
      question: language === 'ar' ? 'هل يمكنني تتبع عملية النقل؟' : 'Can I track the transfer process?',
      answer: language === 'ar'
        ? 'نعم، ستحصل على رقم تتبع لمراقبة تقدم عملية النقل في الوقت الفعلي.'
        : 'Yes, you will receive a tracking number to monitor transfer progress in real-time.'
    },
    {
      question: language === 'ar' ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are available?',
      answer: language === 'ar'
        ? 'نقبل USDT، فودافون كاش، بيتكوين، وPayPal. جميع المدفوعات آمنة ومشفرة.'
        : 'We accept USDT, Vodafone Cash, Bitcoin, and PayPal. All payments are secure and encrypted.'
    },
    {
      question: language === 'ar' ? 'هل هناك دعم فني؟' : 'Is technical support available?',
      answer: language === 'ar'
        ? 'نعم، فريق الدعم الفني متاح 24/7 عبر الواتساب والبريد الإلكتروني لمساعدتك.'
        : 'Yes, technical support team is available 24/7 via WhatsApp and email to help you.'
    }
  ]

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {language === 'ar' ? 'إجابات على أكثر الأسئلة شيوعاً' : 'Answers to the most common questions'}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 dark:border-gray-800 rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
