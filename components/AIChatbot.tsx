'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Send, Bot, User } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

export function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "AI Assistant",
        placeholder: "Type your message...",
        send: "Send",
        welcomeMessage: "Hello! I'm your AI assistant. How can I help you with Telegram member transfers today?",
        thinking: "Thinking...",
        userFallback: "You",
        assistantFallback: "AI",
        error: "Sorry, I'm having trouble understanding. Please try again.",
      },
      ar: {
        title: "مساعد الذكاء الاصطناعي",
        placeholder: "اكتب رسالتك...",
        send: "إرسال",
        welcomeMessage: "مرحباً! أنا مساعدك بالذكاء الاصطناعي. كيف يمكنني مساعدتك في نقل أعضاء تليجرام اليوم؟",
        thinking: "جاري التفكير...",
        userFallback: "أنت",
        assistantFallback: "الذكاء الاصطناعي",
        error: "عذرًا، أواجه مشكلة في الفهم. يرجى المحاولة مرة أخرى.",
      },
    }
    return translations[language][key] || key
  }

  useEffect(() => {
    // Initial welcome message from AI
    if (messages.length === 0) {
      setMessages([{ id: 'welcome', role: 'assistant', content: t("welcomeMessage") }])
    }
  }, [messages.length, t])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = { id: Date.now().toString(), role: 'user', content: input }
    setMessages((prev) => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      // Simulate AI response or call an actual API
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay

      let aiResponseContent = t("error")
      if (input.toLowerCase().includes(language === 'en' ? 'transfer' : 'نقل')) {
        aiResponseContent = language === 'en' ? "To start a transfer, please visit the 'Start New Transfer' section on our homepage. You'll need the source and destination group links." : "لبدء النقل، يرجى زيارة قسم 'بدء نقل جديد' في صفحتنا الرئيسية. ستحتاج إلى روابط المجموعات المصدر والوجهة."
      } else if (input.toLowerCase().includes(language === 'en' ? 'price' : 'سعر')) {
        aiResponseContent = language === 'en' ? "Our pricing is based on the number of members you wish to transfer. You can find detailed pricing on our pricing page or during the transfer wizard." : "يعتمد تسعيرنا على عدد الأعضاء الذين ترغب في نقلهم. يمكنك العثور على تفاصيل التسعير في صفحة الأسعار الخاصة بنا أو أثناء معالج النقل."
      } else if (input.toLowerCase().includes(language === 'en' ? 'support' : 'دعم')) {
        aiResponseContent = language === 'en' ? "For direct support, please use the contact form on our 'Contact Us' page or reach out via WhatsApp support." : "للحصول على دعم مباشر، يرجى استخدام نموذج الاتصال في صفحة 'اتصل بنا' أو التواصل عبر دعم الواتساب."
      } else {
        aiResponseContent = language === 'en' ? "I'm still learning! Can you rephrase your question or ask about transfers, pricing, or support?" : "ما زلت أتعلم! هل يمكنك إعادة صياغة سؤالك أو السؤال عن التحويلات، الأسعار، أو الدعم؟"
      }

      const aiMessage: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: aiResponseContent }
      setMessages((prev) => [...prev, aiMessage])
    } catch (error) {
      console.error("AI Chatbot error:", error)
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: 'assistant', content: t("error") }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="flex flex-col h-[500px] max-w-md mx-auto shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between border-b p-4">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" /> {t("title")}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 p-4 overflow-hidden">
        <ScrollArea className="h-full pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
              >
                {message.role === 'assistant' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-logo.png" alt={t("assistantFallback")} />
                    <AvatarFallback>{t("assistantFallback")}</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={`max-w-[70%] p-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-muted rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
                {message.role === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder-user.png" alt={t("userFallback")} />
                    <AvatarFallback>{t("userFallback")}</AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            {loading && (
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder-logo.png" alt={t("assistantFallback")} />
                  <AvatarFallback>{t("assistantFallback")}</AvatarFallback>
                </Avatar>
                <div className="max-w-[70%] p-3 rounded-lg bg-muted rounded-bl-none">
                  <p className="text-sm animate-pulse">{t("thinking")}</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t p-4">
        <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
          <Input
            placeholder={t("placeholder")}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !input.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">{t("send")}</span>
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
