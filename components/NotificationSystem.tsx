'use client'

import React, { useState, useEffect } from 'react'
import { X, Info, CheckCircle, AlertTriangle, XCircle } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/use-toast'

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  message: string
  duration?: number // in ms, 0 for sticky
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const { language } = useLanguage()
  const { toast } = useToast()

  const t = (key: string) => {
    const translations = {
      en: {
        info: "Information",
        success: "Success",
        warning: "Warning",
        error: "Error",
        welcome: "Welcome to TeleTransfer! Explore our AI-powered features.",
        newFeature: "New Feature: AI Chatbot is now live!",
        transferComplete: "Your transfer is complete!",
        paymentPending: "Payment pending for order #12345. Please complete it.",
        transferFailed: "Transfer failed for group 'Crypto Hub'. Please try again.",
      },
      ar: {
        info: "معلومات",
        success: "نجاح",
        warning: "تحذير",
        error: "خطأ",
        welcome: "مرحباً بك في تيلي ترانسفر! استكشف ميزاتنا المدعومة بالذكاء الاصطناعي.",
        newFeature: "ميزة جديدة: روبوت الدردشة بالذكاء الاصطناعي متاح الآن!",
        transferComplete: "اكتمل نقلك بنجاح!",
        paymentPending: "الدفع معلق للطلب #12345. يرجى إكماله.",
        transferFailed: "فشل النقل للمجموعة 'Crypto Hub'. يرجى المحاولة مرة أخرى.",
      },
    }
    return translations[language][key] || key
  }

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    setNotifications((prev) => [...prev, { ...notification, id }])
  }

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  useEffect(() => {
    // Simulate notifications
    const timer1 = setTimeout(() => addNotification({ type: 'info', message: t('welcome'), duration: 5000 }), 1000)
    const timer2 = setTimeout(() => addNotification({ type: 'success', message: t('newFeature'), duration: 7000 }), 3000)
    const timer3 = setTimeout(() => addNotification({ type: 'warning', message: t('paymentPending'), duration: 0 }), 8000) // Sticky
    const timer4 = setTimeout(() => addNotification({ type: 'error', message: t('transferFailed'), duration: 6000 }), 12000)

    // Example: Show a welcome toast on initial load
    const hasShownWelcome = localStorage.getItem('hasShownWelcomeToast')
    if (!hasShownWelcome) {
      toast({
        title: "مرحبًا بك في TeleTransfer!",
        description: "منصة نقل أعضاء تليجرام المدعومة بالذكاء الاصطناعي.",
        duration: 5000,
      })
      localStorage.setItem('hasShownWelcomeToast', 'true')
    }

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearTimeout(timer4)
    }
  }, [language, toast])

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification.duration && notification.duration > 0) {
        const timer = setTimeout(() => {
          removeNotification(notification.id)
        }, notification.duration)
        return () => clearTimeout(timer)
      }
    })
  }, [notifications])

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Info className="h-5 w-5 text-blue-500" />
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case 'error':
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getColors = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return 'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-700 dark:text-blue-200'
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-700 dark:text-green-200'
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-950 dark:border-yellow-700 dark:text-yellow-200'
      case 'error':
        return 'bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-700 dark:text-red-200'
      default:
        return ''
    }
  }

  return (
    <div className="fixed top-4 right-4 z-[100] space-y-3 max-w-xs w-full">
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ duration: 0.3 }}
            className={`flex items-center p-4 rounded-lg shadow-lg border ${getColors(notification.type)}`}
            role="alert"
          >
            <div className="flex-shrink-0 mr-3">
              {getIcon(notification.type)}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-sm">{t(notification.type)}</p>
              <p className="text-sm">{notification.message}</p>
            </div>
            <button
              onClick={() => removeNotification(notification.id)}
              className="ml-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Close notification"
            >
              <X className="h-4 w-4 text-gray-500" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
