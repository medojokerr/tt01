'use client'

import React, { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useLanguage } from '@/hooks/useLanguage'
import { Mail, Phone, MessageCircle, Send, CheckCircle, Clock, Users, Headphones } from 'lucide-react'

export function ContactSection() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    subject: 'general'
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const t = (key: string) => {
    const translations = {
      ar: {
        title: "تواصل معنا",
        subtitle: "فريقنا المتخصص جاهز لمساعدتك على مدار الساعة",
        name: "الاسم الكامل",
        email: "البريد الإلكتروني",
        subject: "الموضوع",
        message: "رسالتك",
        send: "إرسال الرسالة",
        sending: "جاري الإرسال...",
        emailUs: "راسلنا",
        callUs: "اتصل بنا",
        chatUs: "دردش معنا",
        emailAddress: "support@teletransfer.com",
        phoneNumber: "+1 (555) 123-4567",
        chatText: "دردشة مباشرة متاحة 24/7",
        responseTime: "وقت الاستجابة",
        responseTimeValue: "أقل من ساعة",
        supportTeam: "فريق الدعم",
        supportTeamValue: "خبراء متخصصون",
        availability: "التوفر",
        availabilityValue: "24/7 على مدار السنة",
        subjects: {
          general: "استفسار عام",
          technical: "دعم فني",
          billing: "الفواتير والدفع",
          partnership: "شراكة تجارية"
        }
      },
      en: {
        title: "Contact Us",
        subtitle: "Our specialized team is ready to help you around the clock",
        name: "Full Name",
        email: "Email Address",
        subject: "Subject",
        message: "Your Message",
        send: "Send Message",
        sending: "Sending...",
        emailUs: "Email Us",
        callUs: "Call Us",
        chatUs: "Chat With Us",
        emailAddress: "support@teletransfer.com",
        phoneNumber: "+1 (555) 123-4567",
        chatText: "Live chat available 24/7",
        responseTime: "Response Time",
        responseTimeValue: "Less than 1 hour",
        supportTeam: "Support Team",
        supportTeamValue: "Specialized experts",
        availability: "Availability",
        availabilityValue: "24/7 year-round",
        subjects: {
          general: "General Inquiry",
          technical: "Technical Support",
          billing: "Billing & Payment",
          partnership: "Business Partnership"
        }
      }
    }
    return translations[language][key] || key
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitted(true)
    setIsSubmitting(false)
    setTimeout(() => setIsSubmitted(false), 5000)
    setFormData({ name: '', email: '', message: '', subject: 'general' })
  }

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      title: t("emailUs"),
      description: t("emailAddress"),
      action: "mailto:support@teletransfer.com",
      color: 'blue'
    },
    {
      icon: <Phone className="h-6 w-6 text-green-500" />,
      title: t("callUs"),
      description: t("phoneNumber"),
      action: "tel:+15551234567",
      color: 'green'
    },
    {
      icon: <MessageCircle className="h-6 w-6 text-purple-500" />,
      title: t("chatUs"),
      description: t("chatText"),
      action: "https://wa.me/15551234567",
      color: 'purple'
    }
  ]

  const supportStats = [
    {
      icon: <Clock className="h-5 w-5 text-blue-500" />,
      label: t("responseTime"),
      value: t("responseTimeValue")
    },
    {
      icon: <Users className="h-5 w-5 text-green-500" />,
      label: t("supportTeam"),
      value: t("supportTeamValue")
    },
    {
      icon: <Headphones className="h-5 w-5 text-purple-500" />,
      label: t("availability"),
      value: t("availabilityValue")
    }
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("title")}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            {t("subtitle")}
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          {/* Support Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {supportStats.map((stat, index) => (
              <Card key={index} className="p-6 text-center bg-white dark:bg-gray-800 border-0 shadow-lg">
                <CardContent className="space-y-3">
                  <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto">
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                    <p className="font-semibold">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Methods */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold mb-6">
                {language === 'ar' ? 'طرق التواصل' : 'Contact Methods'}
              </h3>
              
              {contactMethods.map((method, index) => (
                <Card key={index} className="group p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-0 bg-white dark:bg-gray-800 cursor-pointer">
                  <CardContent className="flex items-center space-x-4">
                    <div className={`flex-shrink-0 p-4 bg-${method.color}-100 dark:bg-${method.color}-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-semibold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                        {method.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">{method.description}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild className="group-hover:border-blue-500 group-hover:text-blue-600 transition-colors duration-300">
                      <a href={method.action} target="_blank" rel="noopener noreferrer">
                        {language === 'ar' ? 'تواصل' : 'Contact'}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Contact Form */}
            <Card className="p-8 border-0 bg-white dark:bg-gray-800 shadow-xl">
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-12 animate-fade-in">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-2xl font-semibold mb-2 text-green-600">
                      {language === 'ar' ? 'تم إرسال رسالتك!' : 'Message Sent!'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {language === 'ar' 
                        ? 'سنتواصل معك في أقرب وقت ممكن' 
                        : 'We\'ll get back to you as soon as possible'
                      }
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('name')}
                        </label>
                        <Input 
                          placeholder={t('name')}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          required
                          className="rounded-lg border-2 focus:border-blue-500"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {t('email')}
                        </label>
                        <Input 
                          type="email" 
                          placeholder={t('email')}
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                          className="rounded-lg border-2 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('subject')}
                      </label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-3 py-2 border-2 border-gray-300 dark:border-gray-600 rounded-lg focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      >
                        <option value="general">{t('subjects.general')}</option>
                        <option value="technical">{t('subjects.technical')}</option>
                        <option value="billing">{t('subjects.billing')}</option>
                        <option value="partnership">{t('subjects.partnership')}</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {t('message')}
                      </label>
                      <Textarea 
                        placeholder={t('message')} 
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        required
                        className="rounded-lg border-2 focus:border-blue-500 resize-none"
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          {t('sending')}
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          {t('send')}
                        </>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
