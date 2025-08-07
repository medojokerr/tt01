'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useLanguage } from '@/hooks/useLanguage'
import { Search, MessageCircle, ThumbsUp, ThumbsDown, Bot, Sparkles, ChevronDown, ChevronUp } from 'lucide-react'

export function IntelligentFAQ() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(0)
  const [helpfulVotes, setHelpfulVotes] = useState<{[key: number]: 'up' | 'down' | null}>({})
  const [aiResponse, setAiResponse] = useState('')
  const [isAiThinking, setIsAiThinking] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'مركز المساعدة الذكي',
        subtitle: 'احصل على إجابات فورية مع مساعد الذكاء الاصطناعي المتقدم',
        searchPlaceholder: 'ابحث عن سؤالك أو اسأل الذكاء الاصطناعي...',
        askAI: 'اسأل الذكاء الاصطناعي',
        helpful: 'هل كانت هذه الإجابة مفيدة؟',
        yes: 'نعم',
        no: 'لا',
        aiThinking: 'الذكاء الاصطناعي يفكر...',
        popularQuestions: 'الأسئلة الشائعة'
      },
      en: {
        title: 'Intelligent Help Center',
        subtitle: 'Get instant answers with advanced AI assistant',
        searchPlaceholder: 'Search your question or ask AI...',
        askAI: 'Ask AI',
        helpful: 'Was this answer helpful?',
        yes: 'Yes',
        no: 'No',
        aiThinking: 'AI is thinking...',
        popularQuestions: 'Popular Questions'
      }
    }
    return translations[language][key] || key
  }

  const faqs = [
    {
      id: 1,
      question: language === 'ar' ? 'كيف يعمل الوكيل الذكي؟' : 'How does the smart agent work?',
      answer: language === 'ar' 
        ? 'الوكيل الذكي يستخدم تقنيات الذكاء الاصطناعي المتقدمة لتحليل أعضاء المجموعة المصدر، يحدد الأعضاء الحقيقيين والنشطين، ثم ينقلهم بطريقة آمنة ومحسنة إلى مجموعتك الجديدة مع ضمان عدم التعرض للحظر.'
        : 'The smart agent uses advanced AI technologies to analyze source group members, identifies real and active members, then transfers them safely and optimized to your new group while ensuring no risk of bans.',
      popularity: 98,
      category: 'ai'
    },
    {
      id: 2,
      question: language === 'ar' ? 'ما هو معدل النجاح المضمون؟' : 'What is the guaranteed success rate?',
      answer: language === 'ar'
        ? 'نحقق معدل نجاح 99.8% مع الخطة الذكية و 99.9% مع الخطة الاحترافية. هذا المعدل العالي يأتي من استخدام الذكاء الاصطناعي المتقدم والخوارزميات المحسنة التي تتعلم وتتطور باستمرار.'
        : 'We achieve a 99.8% success rate with the Smart Plan and 99.9% with the Pro Plan. This high rate comes from using advanced AI and optimized algorithms that continuously learn and evolve.',
      popularity: 95,
      category: 'success'
    },
    {
      id: 3,
      question: language === 'ar' ? 'هل النظام آمن ومحمي؟' : 'Is the system safe and secure?',
      answer: language === 'ar'
        ? 'نعم، النظام آمن بنسبة 100%. نستخدم تشفير من الدرجة العسكرية، لا نطلب بيانات تسجيل دخول تليجرام، وجميع العمليات تتم عبر واجهات برمجة التطبيقات الرسمية مع حماية متعددة الطبقات ضد المخاطر.'
        : 'Yes, the system is 100% safe. We use military-grade encryption, don\'t ask for Telegram login credentials, and all operations are performed through official APIs with multi-layer protection against risks.',
      popularity: 92,
      category: 'security'
    },
    {
      id: 4,
      question: language === 'ar' ? 'كم يستغرق نقل الأعضاء؟' : 'How long does member transfer take?',
      answer: language === 'ar'
        ? 'الوقت يعتمد على عدد الأعضاء والخطة المختارة. عادة من 30 دقيقة إلى 3 ساعات للمجموعات الكبيرة. الخطة الاحترافية أسرع بمرتين من الخطة الأساسية بفضل التحسينات المتقدمة.'
        : 'Time depends on member count and selected plan. Usually 30 minutes to 3 hours for large groups. Pro Plan is twice as fast as Basic Plan thanks to advanced optimizations.',
      popularity: 88,
      category: 'time'
    },
    {
      id: 5,
      question: language === 'ar' ? 'هل يمكنني تتبع العملية؟' : 'Can I track the process?',
      answer: language === 'ar'
        ? 'نعم، ستحصل على رقم تتبع فريد لمراقبة تقدم العملية في الوقت الفعلي مع تحديثات مباشرة، إحصائيات تفصيلية، وتقارير شاملة عن كل خطوة في العملية.'
        : 'Yes, you will receive a unique tracking number to monitor process progress in real-time with live updates, detailed statistics, and comprehensive reports about every step.',
      popularity: 85,
      category: 'tracking'
    },
    {
      id: 6,
      question: language === 'ar' ? 'ما هي طرق الدفع المتاحة؟' : 'What payment methods are available?',
      answer: language === 'ar'
        ? 'نقبل جميع طرق الدفع الرئيسية: بطاقات الائتمان، PayPal، العملات المشفرة (Bitcoin, USDT, Ethereum)، والتحويلات البنكية. جميع المدفوعات آمنة ومشفرة.'
        : 'We accept all major payment methods: credit cards, PayPal, cryptocurrencies (Bitcoin, USDT, Ethereum), and bank transfers. All payments are secure and encrypted.',
      popularity: 78,
      category: 'payment'
    }
  ]

  const filteredFAQs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => b.popularity - a.popularity)

  const handleVote = (faqId: number, vote: 'up' | 'down') => {
    setHelpfulVotes(prev => ({
      ...prev,
      [faqId]: prev[faqId] === vote ? null : vote
    }))
  }

  const handleAskAI = async () => {
    if (!searchTerm.trim()) return
    
    setIsAiThinking(true)
    setAiResponse('')
    
    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    const responses = {
      ar: {
        default: `بناءً على سؤالك "${searchTerm}"، يمكنني مساعدتك. نظامنا الذكي مصمم للتعامل مع جميع جوانب نقل أعضاء تليجرام بأمان وفعالية. إذا كان لديك سؤال محدد، يرجى إعادة صياغته وسأقدم لك إجابة مفصلة.`,
        transfer: 'عملية النقل تتم بواسطة الذكاء الاصطناعي المتقدم الذي يحلل الأعضاء ويختار الأنسب منهم للنقل بطريقة آمنة ومحسنة.',
        price: 'التسعير يعتمد على عدد الأعضاء والخطة المختارة. يمكنك استخدام حاسبة التسعير الذكية للحصول على تقدير دقيق.',
        security: 'الأمان أولويتنا القصوى. نستخدم تشفير متقدم ولا نطلب بيانات تسجيل دخول تليجرام. جميع العمليات آمنة 100%.'
      },
      en: {
        default: `Based on your question "${searchTerm}", I can help you. Our smart system is designed to handle all aspects of Telegram member transfer safely and effectively. If you have a specific question, please rephrase it and I'll provide a detailed answer.`,
        transfer: 'The transfer process is handled by advanced AI that analyzes members and selects the most suitable ones for safe and optimized transfer.',
        price: 'Pricing depends on member count and selected plan. You can use our smart pricing calculator for accurate estimates.',
        security: 'Security is our top priority. We use advanced encryption and don\'t ask for Telegram login credentials. All operations are 100% safe.'
      }
    }
    
    let response = responses[language].default
    if (searchTerm.toLowerCase().includes(language === 'ar' ? 'نقل' : 'transfer')) {
      response = responses[language].transfer
    } else if (searchTerm.toLowerCase().includes(language === 'ar' ? 'سعر' : 'price')) {
      response = responses[language].price
    } else if (searchTerm.toLowerCase().includes(language === 'ar' ? 'أمان' : 'security')) {
      response = responses[language].security
    }
    
    setAiResponse(response)
    setIsAiThinking(false)
  }

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-900/20 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-gray-900 via-purple-600 to-blue-600 bg-clip-text text-transparent dark:from-white dark:via-purple-400 dark:to-blue-400">
              {t('title')}
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* AI Search */}
          <Card className="mb-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                <div className="relative flex-1">
                  <Search className="absolute left-4 rtl:left-auto rtl:right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder={t('searchPlaceholder')}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-12 rtl:pl-4 rtl:pr-12 pr-4 py-4 text-lg rounded-xl border-2 focus:border-blue-500"
                    onKeyPress={(e) => e.key === 'Enter' && handleAskAI()}
                  />
                </div>
                <Button
                  onClick={handleAskAI}
                  disabled={!searchTerm.trim() || isAiThinking}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {isAiThinking ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      {t('aiThinking')}
                    </>
                  ) : (
                    <>
                      <Bot className="h-5 w-5 mr-2" />
                      {t('askAI')}
                    </>
                  )}
                </Button>
              </div>

              {/* AI Response */}
              {aiResponse && (
                <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                  <div className="flex items-start space-x-3 rtl:space-x-reverse">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-600 dark:text-blue-400 mb-2">
                        {language === 'ar' ? 'إجابة الذكاء الاصطناعي' : 'AI Response'}
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {aiResponse}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Popular Questions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 flex items-center">
              <MessageCircle className="h-5 w-5 mr-2 text-blue-500" />
              {t('popularQuestions')}
            </h3>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {filteredFAQs.length === 0 ? (
              <Card className="p-8 text-center bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg">
                <CardContent>
                  <Bot className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">
                    {language === 'ar' ? 'لم يتم العثور على نتائج' : 'No results found'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {language === 'ar' 
                      ? 'جرب كلمات مختلفة أو اسأل مساعد الذكاء الاصطناعي'
                      : 'Try different keywords or ask our AI assistant'
                    }
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredFAQs.map((faq, index) => (
                <Card 
                  key={faq.id}
                  className={`transition-all duration-300 cursor-pointer bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl ${
                    expandedFAQ === faq.id ? 'ring-2 ring-blue-500/50' : ''
                  }`}
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse flex-1">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <h3 className="text-lg font-semibold flex-1 pr-4">
                          {faq.question}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <div className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                          {faq.popularity}% {language === 'ar' ? 'مفيد' : 'helpful'}
                        </div>
                        <div className={`transform transition-transform duration-300 ${
                          expandedFAQ === faq.id ? 'rotate-180' : ''
                        }`}>
                          <ChevronDown className="h-5 w-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    {expandedFAQ === faq.id && (
                      <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 animate-fade-in">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                          {faq.answer}
                        </p>
                        
                        {/* Helpful Voting */}
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{t('helpful')}</span>
                          <div className="flex items-center space-x-2 rtl:space-x-reverse">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleVote(faq.id, 'up')
                              }}
                              className={`rounded-full transition-all duration-300 ${
                                helpfulVotes[faq.id] === 'up' 
                                  ? 'bg-green-100 text-green-600 border-green-300 dark:bg-green-900/30 dark:text-green-400' 
                                  : 'hover:bg-green-50 dark:hover:bg-green-900/20'
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
                              className={`rounded-full transition-all duration-300 ${
                                helpfulVotes[faq.id] === 'down' 
                                  ? 'bg-red-100 text-red-600 border-red-300 dark:bg-red-900/30 dark:text-red-400' 
                                  : 'hover:bg-red-50 dark:hover:bg-red-900/20'
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
          <Card className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-0 shadow-xl">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Bot className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {language === 'ar' ? 'هل تحتاج مساعدة إضافية؟' : 'Need Additional Help?'}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {language === 'ar' 
                  ? 'مساعد الذكاء الاصطناعي متاح 24/7 للإجابة على جميع أسئلتك'
                  : 'AI assistant is available 24/7 to answer all your questions'
                }
              </p>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <MessageCircle className="h-4 w-4 mr-2" />
                {language === 'ar' ? 'تحدث مع الذكاء الاصطناعي' : 'Chat with AI'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
