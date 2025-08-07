'use client'

import React, { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useLanguage } from '@/hooks/useLanguage'
import { Bot, Send, X, MessageCircle, Minimize2, Maximize2, Sparkles } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export function AIAssistant() {
  const { language } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: 'مساعد الذكاء الاصطناعي',
        placeholder: 'اكتب رسالتك هنا...',
        send: 'إرسال',
        minimize: 'تصغير',
        maximize: 'تكبير',
        close: 'إغلاق',
        typing: 'يكتب...',
        welcomeMessage: 'مرحباً! أنا مساعدك الذكي. كيف يمكنني مساعدتك في نقل أعضاء تليجرام اليوم؟',
        quickActions: 'إجراءات سريعة',
        startTransfer: 'بدء النقل',
        checkPricing: 'فحص الأسعار',
        howItWorks: 'كيف يعمل',
        contactSupport: 'تواصل مع الدعم'
      },
      en: {
        title: 'AI Assistant',
        placeholder: 'Type your message here...',
        send: 'Send',
        minimize: 'Minimize',
        maximize: 'Maximize',
        close: 'Close',
        typing: 'typing...',
        welcomeMessage: 'Hello! I\'m your smart assistant. How can I help you with Telegram member transfer today?',
        quickActions: 'Quick Actions',
        startTransfer: 'Start Transfer',
        checkPricing: 'Check Pricing',
        howItWorks: 'How It Works',
        contactSupport: 'Contact Support'
      }
    }
    return translations[language][key] || key
  }

  const quickActions = [
    { label: t('startTransfer'), action: 'start_transfer' },
    { label: t('checkPricing'), action: 'check_pricing' },
    { label: t('howItWorks'), action: 'how_it_works' },
    { label: t('contactSupport'), action: 'contact_support' }
  ]

  useEffect(() => {
    if (messages.length === 0 && isOpen) {
      const welcomeMessage: Message = {
        id: 'welcome',
        role: 'assistant',
        content: t('welcomeMessage'),
        timestamp: new Date()
      }
      setMessages([welcomeMessage])
    }
  }, [isOpen, language])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || input.trim()
    if (!content) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    await new Promise(resolve => setTimeout(resolve, 1500))

    let aiResponse = ''
    const lowerContent = content.toLowerCase()

    if (lowerContent.includes(language === 'ar' ? 'نقل' : 'transfer') || messageContent === 'start_transfer') {
      aiResponse = language === 'ar' 
        ? 'لبدء عملية النقل، ستحتاج إلى رابط المجموعة المصدر ورابط المجموعة الهدف. الوكيل الذكي سيحلل الأعضاء ويختار الأنسب منهم للنقل. هل تريد البدء الآن؟'
        : 'To start the transfer process, you\'ll need the source group link and target group link. The smart agent will analyze members and select the most suitable ones for transfer. Would you like to start now?'
    } else if (lowerContent.includes(language === 'ar' ? 'سعر' : 'price') || messageContent === 'check_pricing') {
      aiResponse = language === 'ar'
        ? 'التسعير يعتمد على عدد الأعضاء والخطة المختارة. الخطة الأساسية تبدأ من $0.008 لكل عضو، والخطة الذكية $0.012، والاحترافية $0.018. يمكنك استخدام حاسبة التسعير للحصول على تقدير دقيق.'
        : 'Pricing depends on member count and selected plan. Basic Plan starts at $0.008 per member, Smart Plan $0.012, and Pro Plan $0.018. You can use our pricing calculator for accurate estimates.'
    } else if (lowerContent.includes(language === 'ar' ? 'كيف' : 'how') || messageContent === 'how_it_works') {
      aiResponse = language === 'ar'
        ? 'العملية بسيطة: 1) تحليل المجموعة المصدر بالذكاء الاصطناعي 2) فلترة الأعضاء الحقيقيين والنشطين 3) النقل الآمن والمحسن 4) تقرير مفصل عن النتائج. معدل النجاح 99.8%!'
        : 'The process is simple: 1) AI analyzes source group 2) Filters real and active members 3) Safe and optimized transfer 4) Detailed results report. 99.8% success rate!'
    } else if (lowerContent.includes(language === 'ar' ? 'دعم' : 'support') || messageContent === 'contact_support') {
      aiResponse = language === 'ar'
        ? 'فريق الدعم متاح 24/7 لمساعدتك. يمكنك التواصل معنا عبر الواتساب، البريد الإلكتروني، أو الدردشة المباشرة. نحن هنا لضمان تجربة مثالية لك!'
        : 'Support team is available 24/7 to help you. You can contact us via WhatsApp, email, or live chat. We\'re here to ensure a perfect experience for you!'
    } else {
      aiResponse = language === 'ar'
        ? 'شكراً لسؤالك! أنا هنا لمساعدتك في كل ما يتعلق بنقل أعضاء تليجرام. يمكنني مساعدتك في فهم كيفية عمل النظام، التسعير، الأمان، أو أي استفسار آخر. ما الذي تود معرفته؟'
        : 'Thanks for your question! I\'m here to help with everything related to Telegram member transfer. I can help you understand how the system works, pricing, security, or any other inquiry. What would you like to know?'
    }

    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, assistantMessage])
    setIsTyping(false)
  }

  const handleQuickAction = (action: string) => {
    const actionLabels = {
      start_transfer: t('startTransfer'),
      check_pricing: t('checkPricing'),
      how_it_works: t('howItWorks'),
      contact_support: t('contactSupport')
    }
    handleSendMessage(action)
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group animate-pulse"
        >
          <div className="relative">
            <Bot className="h-8 w-8 group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-ping" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full" />
          </div>
        </Button>
      </div>
    )
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80' : 'w-96'
    }`}>
      <Card className={`shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl ${
        isMinimized ? 'h-16' : 'h-[600px]'
      } transition-all duration-300`}>
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <CardTitle className="flex items-center space-x-3 rtl:space-x-reverse text-lg">
            <div className="relative">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                  <Bot className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white dark:border-gray-900" />
            </div>
            <div>
              <span className="font-semibold">{t('title')}</span>
              {isTyping && (
                <div className="text-xs text-gray-500 flex items-center">
                  <Sparkles className="h-3 w-3 mr-1 animate-pulse" />
                  {t('typing')}
                </div>
              )}
            </div>
          </CardTitle>
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMinimized(!isMinimized)}
              className="w-8 h-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 p-0 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            {/* Messages */}
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-[400px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start gap-3 ${
                        message.role === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      {message.role === 'assistant' && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                            <Bot className="h-4 w-4" />
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[80%] p-3 rounded-2xl ${
                          message.role === 'user'
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <div className={`text-xs mt-1 opacity-70 ${
                          message.role === 'user' ? 'text-blue-100' : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      {message.role === 'user' && (
                        <Avatar className="h-8 w-8 flex-shrink-0">
                          <AvatarFallback className="bg-gray-300 dark:bg-gray-600">
                            U
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                  
                  {/* Quick Actions */}
                  {messages.length === 1 && (
                    <div className="space-y-3">
                      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                        {t('quickActions')}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickActions.map((action, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickAction(action.action)}
                            className="text-xs py-2 px-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200"
                          >
                            {action.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
                className="flex space-x-2 rtl:space-x-reverse"
              >
                <Input
                  placeholder={t('placeholder')}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                  className="flex-1 rounded-xl border-2 focus:border-blue-500"
                />
                <Button
                  type="submit"
                  disabled={isTyping || !input.trim()}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
