'use client'

import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, Phone, MessageCircle, Send } from 'lucide-react'

interface ContactSectionProps {
  language: 'ar' | 'en'
}

export function ContactSection({ language }: ContactSectionProps) {
  const t = (key: string) => {
    const translations = {
      ar: {
        title: "تواصل معنا",
        subtitle: "نحن هنا لمساعدتك في أي وقت",
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        send: "إرسال الرسالة",
        emailUs: "راسلنا",
        callUs: "اتصل بنا",
        chatUs: "دردش معنا",
        emailAddress: "support@teletransfer.com",
        phoneNumber: "+1 (555) 123-4567",
        chatText: "دردشة مباشرة متاحة 24/7"
      },
      en: {
        title: "Contact Us",
        subtitle: "We're here to help you anytime",
        name: "Name",
        email: "Email",
        message: "Message",
        send: "Send Message",
        emailUs: "Email Us",
        callUs: "Call Us",
        chatUs: "Chat With Us",
        emailAddress: "support@teletransfer.com",
        phoneNumber: "+1 (555) 123-4567",
        chatText: "Live chat available 24/7"
      }
    }
    return translations[language][key] || key
  }

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      title: t("emailUs"),
      description: t("emailAddress"),
      action: "mailto:support@teletransfer.com"
    },
    {
      icon: <Phone className="h-6 w-6 text-green-500" />,
      title: t("callUs"),
      description: t("phoneNumber"),
      action: "tel:+15551234567"
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-purple-500" />,
      title: t("chatUs"),
      description: t("chatText"),
      action: "#"
    }
  ]

  return (
    <section id="contact" className="py-20 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Methods */}
          <div className="space-y-6">
            {contactMethods.map((method, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {method.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold mb-1">{method.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{method.description}</p>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={method.action}>
                      {language === 'ar' ? 'تواصل' : 'Contact'}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <Card className="p-6">
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("name")}</label>
                <Input placeholder={t("name")} />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("email")}</label>
                <Input type="email" placeholder={t("email")} />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">{t("message")}</label>
                <Textarea 
                  placeholder={t("message")} 
                  rows={5}
                />
              </div>
              
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Send className="h-4 w-4 mr-2" />
                {t("send")}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
