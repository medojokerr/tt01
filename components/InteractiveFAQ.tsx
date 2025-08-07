'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/hooks/useLanguage'
import { Search, MessageCircle, ThumbsUp, ThumbsDown, HelpCircle, Sparkles, Bot } from 'lucide-react'

export function InteractiveFAQ() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null)
  const [helpfulVotes, setHelpfulVotes] = useState<{[key: number]: 'up' | 'down' | null}>({})

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "مركز المساعدة الذكي",
        subtitle: "احصل على إجابات فورية لأسئلتك مع مساعد الذكاء الاصطناعي",
        searchPlaceholder: "ابحث عن سؤالك...",
        categories: {
          all: "الكل",
          security: "الأمان",
          process: "العملية",
          pricing: "التسعير",
          technical: "تقني"
        },
        askAI: "اسأل الذكاء الاصطناعي",
        helpful: "هل كانت هذه الإجابة مفيدة؟",
        yes: "نعم",
        no: "لا"
      },
      en: {
        title: "Smart Help Center",
        subtitle: "Get instant answers to your questions with AI assistant",
        searchPlaceholder: "Search your question...",
        categories: {
          all: "All",
          security: "Security",
          process: "Process",
          pricing: "Pricing",
          technical: "Technical"
        },
        askAI: "Ask AI",
        helpful: "Was this answer helpful?",
        yes: "Yes",
        no: "No"
      }
    }
    return translations[language][key] || key
  }

  const faqs = [
    {
      id: 1,
      category: 'security',
      question: language === 'ar' ? 'هل الأداة آمنة للاستخدام؟' : 'Is the tool safe to use?',
      answer: language === 'ar' 
        ? 'نعم، الأداة آمنة تماماً. نحن نستخدم تقنيات تشفير من الدرجة العسكرية ولا نطلب بيانات تسجيل دخول تليجرام. جميع العمليات تتم عبر واجهات برمجة التطبيقات الرسمية لتليجرام مع حماية متعددة الطبقات.'
        : 'Yes, the tool is completely safe. We use military-grade encryption and don\'t ask for Telegram login credentials. All operations are performed through official Telegram APIs with multi-layer protection.',
      popularity: 95
    },
    {
      id: 2,
      category: 'process',
      question: language === 'ar' ? 'كم يستغرق نقل الأعضاء؟' : 'How long does member transfer take?',
      answer: language === 'ar'
        ? 'يعتمد على عدد الأعضاء المطلوب نقلهم. عادة ما يستغرق من 30 دقيقة إلى 3 ساعات للمجموعات الكبيرة. الذكاء الاصطناعي يحسن السرعة مع الحفاظ على الأمان.'
        : 'It depends on the number of members to be transferred. Usually takes 30 minutes to 3 hours for large groups. AI optimizes speed while maintaining security.',
      popularity: 88
    },
    {
      id: 3,
      category: 'process',
      question: language === 'ar' ? 'ما هو معدل النجاح؟' : 'What is the success rate?',
      answer: language === 'ar'
        ? 'نحقق معدل نجاح 99.8% في عمليات النقل. هذا المعدل العالي يأتي من استخدام الذكاء الاصطناعي المتقدم الذي يحلل ويفلتر الأعضاء الحقيقيين فقط.'
        : 'We achieve a 99.8% success rate in transfers. This high rate comes from using advanced AI that analyzes and filters only real members.',
      popularity: 92
    },
    {
      id: 4,
      category: 'technical',
      question: language === 'ar' ? 'هل يمكنني تتبع عملية النقل؟' : 'Can I track the transfer process?',
      answer: language === 'ar'
        ? 'نعم، ستحصل على رقم تتبع فريد لمراقبة تقدم عملية النقل في الوقت الفعلي مع تحديثات مباشرة وتقارير مفصلة.'
        : 'Yes, you will receive a unique tracking number to monitor transfer progress in real-time with live updates and detailed reports.',
      popularity: 76
    },
    {
      id: 5,
      category: 'security',
      question: language === 'ar' ? 'هل تحتفظون ببياناتي؟' : 'Do you keep my data?',
      answer: language === 'ar'
        ? 'لا، نحن لا نحتفظ بأي بيانات شخصية. جميع المعلومات تُحذف تلقائياً بعد اكتمال العملية. نحن ملتزمون بأعلى معايير الخصوصية.'
        : 'No, we don\'t keep any personal data. All information is automatically deleted after process completion. We are committed to the highest privacy standards.',
      popularity: 84
    },
    {
      id: 6,
      category: 'technical',
      question: language === 'ar' ? 'هل هناك دعم فني؟' : 'Is technical support available?',
      answer: language === 'ar'
        ? 'نعم، فريق الدعم الفني متاح 24/7 عبر الواتساب والبريد الإلكتروني. لدينا خبراء متخصصون في تليجرام لمساعدتك في أي وقت.'
        : 'Yes, technical support team is available 24/7 via WhatsApp and email. We have specialized Telegram experts to help you anytime.',
      popularity: 79
    }
  ]

  const categories = [
    { id: 'all', name: t('categories.all'), icon: <HelpCircle className="h-4 w-4" /> },
    { id: 'security', name: t('categories.security'), icon: <Bot className="h-4 w-4" /> },
    { id: 'process', name: t('categories.process'), icon: <Sparkles className="h-4 w-4" /> },
    { id: 'technical', name: t('categories.technical'), icon: <MessageCircle className="h-4 w-4" /> }
  ]

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  }).sort((a, b) => b.popularity - a.popularity)

  const handleVote = (faqId: number, vote: 'up' | 'down') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: prev[faqId] === vote ? null : vote
    }))
  }

  return (
    <section className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Search and Filters */}
          <div className="space-y-6 mb-8">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 text-lg rounded-xl border-2 focus:border-blue-500"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full px-4 py-2"
                >
                  {category.icon}
                  <span className="ml-2">{category.name}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <Card className="p-8 text-center">
                <CardContent>
                  <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No results found</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try different keywords or ask our AI assistant
                  </p>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {t('askAI')}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredFAQs.map((faq, index) => (
                <Card 
                  key={faq.id}
                  className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
                    expandedFAQ === faq.id ? 'ring-2 ring-blue-500' : ''
                  }`}
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold flex-1 pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full">
                          {faq.popularity}% helpful
                        </div>
                        <div className={`transform transition-transform duration-300 ${
                          expandedFAQ === faq.id ? 'rotate-180' : ''
                        }`}>
                          <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {expandedFAQ === faq.id && (
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                          {faq.answer}
                        </p>
                        
                        {/* Helpful Voting */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{t('helpful')}</span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleVote(faq.id, 'up')
                              }}
                              className={`rounded-full ${
                                helpfulVotes[faq.id] === 'up' ? 'bg-green-100 text-green-600 border-green-300' : ''
                              }`}
                            >
                              <ThumbsUp className="h-4 w-4 mr-1" />
                              {t('yes')}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleVote(faq.id, 'down')
                              }}
                              className={`rounded-full ${
                                helpfulVotes[faq.id] === 'down' ? 'bg-red-100 text-red-600 border-red-300' : ''
                              }`}
                            >
                              <ThumbsDown className="h-4 w-4 mr-1" />
                              {t('no')}
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* AI Assistant CTA */}
          <div className="mt-12 text-center">
            <Card className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0">
              <CardContent>
                <Bot className="h-12 w-12 text-blue-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">
                  {language === 'ar' ? 'لم تجد إجابتك؟' : 'Didn\'t find your answer?'}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {language === 'ar' 
                    ? 'اسأل مساعد الذكاء الاصطناعي للحصول على إجابة فورية ومخصصة'
                    : 'Ask our AI assistant for instant and personalized answers'
                  }
                </p>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  {t('askAI')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
