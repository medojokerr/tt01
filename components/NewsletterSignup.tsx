'use client'

import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Mail, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/hooks/useLanguage'

export function NewsletterSignup() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [subscribed, setSubscribed] = useState(false)
  const { toast } = useToast()
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "Stay Updated with TeleTransfer",
        subtitle: "Subscribe to our newsletter for the latest news, features, and exclusive offers.",
        emailLabel: "Email Address",
        emailPlaceholder: "your@example.com",
        subscribeButton: "Subscribe",
        subscribing: "Subscribing...",
        successTitle: "Subscribed!",
        successDescription: "Thank you for subscribing to our newsletter. You'll receive updates soon!",
        errorTitle: "Subscription Failed",
        errorDescription: "There was an error subscribing. Please try again.",
        invalidEmail: "Please enter a valid email address.",
      },
      ar: {
        title: "ابق على اطلاع مع TeleTransfer",
        subtitle: "اشترك في نشرتنا الإخبارية للحصول على آخر الأخبار والميزات والعروض الحصرية.",
        emailLabel: "عنوان البريد الإلكتروني",
        emailPlaceholder: "your@example.com",
        subscribeButton: "اشترك",
        subscribing: "جاري الاشتراك...",
        successTitle: "تم الاشتراك!",
        successDescription: "شكرًا لاشتراكك في نشرتنا الإخبارية. ستتلقى التحديثات قريبًا!",
        errorTitle: "فشل الاشتراك",
        errorDescription: "حدث خطأ أثناء الاشتراك. يرجى المحاولة مرة أخرى.",
        invalidEmail: "الرجاء إدخال عنوان بريد إلكتروني صالح.",
      },
    }
    return translations[language][key] || key
  }

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateEmail(email)) {
      toast({ title: t("errorTitle"), description: t("invalidEmail"), variant: "destructive" })
      return
    }

    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setSubscribed(true)
      toast({ title: t("successTitle"), description: t("successDescription"), variant: "success" })
      setEmail('') // Clear email field
    } catch (error) {
      toast({ title: t("errorTitle"), description: t("errorDescription"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="newsletter" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2 text-gradient-custom">
              {t("title")}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
          </CardHeader>
          <CardContent>
            {subscribed ? (
              <div className="text-center text-green-600 dark:text-green-400 flex flex-col items-center justify-center py-8">
                <CheckCircle className="h-12 w-12 mb-4" />
                <p className="text-xl font-semibold">{t("successTitle")}</p>
                <p className="text-md">{t("successDescription")}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="email">{t("emailLabel")}</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t("emailPlaceholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={loading}
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-blue-500/25 text-white py-3 rounded-xl btn-hover-lift transition-all duration-300"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Mail className="h-4 w-4 mr-2 animate-pulse" /> {t("subscribing")}
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4 mr-2" /> {t("subscribeButton")}
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
