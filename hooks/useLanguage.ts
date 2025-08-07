"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react'

type Language = "en" | "ar"

const translations = {
  en: {
    title: "Telegram Member Transfer Tool v4",
    subtitle: "AI-Powered Transfer System",
    nav: {
      features: "Features",
      pricing: "Pricing",
      contact: "Contact",
      home: "Home",
      about: "About",
    },
    status: {
      online: "Online",
    },
    hero: {
      badge: "AI-Powered Transfer System",
      title: "Transfer Telegram Members Smartly & Securely",
      subtitle: "Advanced tool for transferring members between Telegram groups with 99.8% success rate and complete privacy guarantee",
      description: "AI-powered tool that securely moves members from public to private Telegram groups.",
      startButton: "Start Transfer Now",
      trackButton: "Track Your Order",
      watchDemo: "Watch Demo",
      trustedBy: "Trusted by 10,000+ users",
      noLogin: "No Telegram login required",
      automated: "Fully automated process",
      secure: "100% secure & encrypted"
    },
    features: {
      title: "Why Choose TeleTransfer?",
      subtitle: "Advanced features that make member transfer easy and secure",
      feature1: {
        title: "Advanced AI",
        description: "Smart algorithms ensure transfer of only real and active members"
      },
      feature2: {
        title: "Security & Privacy",
        description: "No Telegram login required, complete protection of your privacy"
      },
      feature3: {
        title: "High Success Rate",
        description: "We achieve 99.8% success rate in transfers with quality guarantee"
      },
      feature4: {
        title: "Advanced Encryption",
        description: "All data encrypted with latest global security technologies"
      },
      feature5: {
        title: "Detailed Reports",
        description: "Get comprehensive reports about transfer process and results"
      },
      feature6: {
        title: "Premium Support",
        description: "24/7 support team available to help you anytime"
      }
    },
    howItWorks: {
      title: "How Does TeleTransfer Work?",
      subtitle: "Simple 4-step process",
      step1: {
        title: "Enter Group Details",
        description: "Enter source group link, target group link and number of members needed"
      },
      step2: {
        title: "Choose Payment Method",
        description: "Select from available payment methods and upload payment proof"
      },
      step3: {
        title: "Start Automated Process",
        description: "AI starts analyzing and transferring members automatically"
      },
      step4: {
        title: "Receive Report",
        description: "Get detailed report about transfer process and results"
      }
    },
    pricing: {
      title: "Transparent & Fair Pricing",
      subtitle: "Choose the plan that fits your needs",
      basic: "Basic Plan",
      premium: "Premium Plan",
      enterprise: "Enterprise Plan",
      mostPopular: "Most Popular",
      members: "members",
      perMember: "per member",
      features: "Included features:",
      selectPlan: "Select This Plan",
      usd: "USD"
    },
    contact: {
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
    },
    footer: {
      description: "The ultimate AI-powered simulation tool for Telegram member transfers. Safe, fun, and completely free to use.",
      made: "Made with ❤️ for demos and testing",
      product: "Product",
      support: "Support",
      docs: "Documentation",
      help: "Help Center",
      privacy: "Privacy Policy",
      rights: "All rights reserved.",
      global: "Global CDN",
    },
  },
  ar: {
    title: "أداة نقل أعضاء تليجرام الإصدار 4",
    subtitle: "نظام النقل المدعوم بالذكاء الاصطناعي",
    nav: {
      features: "المميزات",
      pricing: "الأسعار",
      contact: "اتصل بنا",
      home: "الرئيسية",
      about: "حولنا",
    },
    status: {
      online: "متصل",
    },
    hero: {
      badge: "نظام النقل المدعوم بالذكاء الاصطناعي",
      title: "انقل أعضاء تليجرام بذكاء وأمان",
      subtitle: "أداة متطورة لنقل الأعضاء بين مجموعات تليجرام بمعدل نجاح 99.8% مع ضمان الخصوصية الكاملة",
      description: "أداة مدعومة بالذكاء الاصطناعي تنقل الأعضاء بأمان من المجموعات العامة إلى الخاصة في تليجرام.",
      startButton: "ابدأ النقل الآن",
      trackButton: "تتبع طلبك",
      watchDemo: "شاهد العرض",
      trustedBy: "موثوق من قبل أكثر من 10,000 مستخدم",
      noLogin: "لا حاجة لتسجيل دخول تليجرام",
      automated: "عملية آلية بالكامل",
      secure: "آمن ومشفر 100%"
    },
    features: {
      title: "لماذا تختار TeleTransfer؟",
      subtitle: "مميزات متطورة تجعل عملية نقل الأعضاء سهلة وآمنة",
      feature1: {
        title: "ذكاء اصطناعي متطور",
        description: "خوارزميات ذكية تضمن نقل الأعضاء الحقيقيين والنشطين فقط"
      },
      feature2: {
        title: "أمان وخصوصية",
        description: "لا نطلب بيانات تسجيل دخول تليجرام، حماية كاملة لخصوصيتك"
      },
      feature3: {
        title: "معدل نجاح عالي",
        description: "نحقق معدل نجاح 99.8% في عمليات النقل مع ضمان الجودة"
      },
      feature4: {
        title: "تشفير متقدم",
        description: "جميع البيانات مشفرة بأحدث تقنيات الأمان العالمية"
      },
      feature5: {
        title: "تقارير مفصلة",
        description: "احصل على تقارير شاملة عن عملية النقل والنتائج"
      },
      feature6: {
        title: "دعم فني متميز",
        description: "فريق دعم متاح 24/7 لمساعدتك في أي وقت"
      }
    },
    howItWorks: {
      title: "كيف يعمل TeleTransfer؟",
      subtitle: "عملية بسيطة من 4 خطوات فقط",
      step1: {
        title: "أدخل بيانات المجموعات",
        description: "أدخل رابط المجموعة المصدر والمجموعة الهدف مع عدد الأعضاء المطلوب"
      },
      step2: {
        title: "اختر طريقة الدفع",
        description: "اختر من بين طرق الدفع المتاحة وارفع إثبات الدفع"
      },
      step3: {
        title: "بدء العملية الآلية",
        description: "يبدأ الذكاء الاصطناعي في تحليل ونقل الأعضاء تلقائياً"
      },
      step4: {
        title: "استلام التقرير",
        description: "احصل على تقرير مفصل عن عملية النقل والنتائج"
      }
    },
    pricing: {
      title: "أسعار شفافة ومناسبة",
      subtitle: "اختر الباقة المناسبة لاحتياجاتك",
      basic: "الباقة الأساسية",
      premium: "الباقة المميزة",
      enterprise: "باقة المؤسسات",
      mostPopular: "الأكثر شعبية",
      members: "عضو",
      perMember: "لكل عضو",
      features: "المميزات المتضمنة:",
      selectPlan: "اختر هذه الباقة",
      usd: "دولار"
    },
    contact: {
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
    footer: {
      description: "أداة المحاكاة المثلى المدعومة بالذكاء الاصطناعي لنقل أعضاء تليجرام. آمنة وممتعة ومجانية تماماً.",
      made: "صُنعت بـ ❤️ للعروض التوضيحية والاختبار",
      product: "المنتج",
      support: "الدعم",
      docs: "التوثيق",
      help: "مركز المساعدة",
      privacy: "سياسة الخصوصية",
      rights: "جميع الحقوق محفوظة.",
      global: "شبكة توصيل المحتوى العالمية",
    },
  },
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language') as Language
    if (storedLanguage && (storedLanguage === 'en' || storedLanguage === 'ar')) {
      setLanguageState(storedLanguage)
      document.documentElement.dir = storedLanguage === 'ar' ? 'rtl' : 'ltr'
      document.documentElement.lang = storedLanguage
    } else {
      setLanguageState('en')
      document.documentElement.dir = 'ltr'
      document.documentElement.lang = 'en'
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key: string) => {
    const keys = key.split('.')
    let value: any = translations[language]
    
    for (const k of keys) {
      value = value?.[k]
    }
    
    return value || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
