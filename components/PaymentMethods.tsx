'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Banknote, Bitcoin, Wallet } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/hooks/useLanguage'

export function PaymentMethods() {
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "Flexible Payment Options",
        subtitle: "Choose the payment method that suits you best for seamless transactions.",
        creditDebitCard: "Credit/Debit Card",
        creditDebitCardDesc: "Securely pay with your Visa, MasterCard, or American Express.",
        bankTransfer: "Bank Transfer",
        bankTransferDesc: "Direct bank transfers for larger transactions or corporate clients.",
        cryptocurrency: "Cryptocurrency",
        cryptocurrencyDesc: "Pay with Bitcoin, Ethereum, USDT, and other popular cryptocurrencies.",
        digitalWallets: "Digital Wallets",
        digitalWalletsDesc: "Convenient payments via popular digital wallet services.",
      },
      ar: {
        title: "خيارات دفع مرنة",
        subtitle: "اختر طريقة الدفع التي تناسبك للحصول على معاملات سلسة.",
        creditDebitCard: "بطاقة ائتمان/خصم",
        creditDebitCardDesc: "ادفع بأمان باستخدام بطاقات Visa، MasterCard، أو American Express.",
        bankTransfer: "تحويل بنكي",
        bankTransferDesc: "تحويلات بنكية مباشرة للمعاملات الكبيرة أو عملاء الشركات.",
        cryptocurrency: "العملات المشفرة",
        cryptocurrencyDesc: "ادفع باستخدام Bitcoin، Ethereum، USDT، وغيرها من العملات المشفرة الشائعة.",
        digitalWallets: "المحافظ الرقمية",
        digitalWalletsDesc: "مدفوعات مريحة عبر خدمات المحافظ الرقمية الشهيرة.",
      },
    }
    return translations[language][key] || key
  }

  const paymentOptions = [
    {
      icon: <CreditCard className="h-10 w-10 text-blue-600" />,
      title: t("creditDebitCard"),
      description: t("creditDebitCardDesc"),
    },
    {
      icon: <Banknote className="h-10 w-10 text-green-600" />,
      title: t("bankTransfer"),
      description: t("bankTransferDesc"),
    },
    {
      icon: <Bitcoin className="h-10 w-10 text-yellow-600" />,
      title: t("cryptocurrency"),
      description: t("cryptocurrencyDesc"),
      image: "/usdt-logo.png" // Example for USDT logo
    },
    {
      icon: <Wallet className="h-10 w-10 text-purple-600" />,
      title: t("digitalWallets"),
      description: t("digitalWalletsDesc"),
    },
  ]

  return (
    <section id="payment-methods" className="py-12 md:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-gradient-custom mb-4">
          {t("title")}
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-12">
          {t("subtitle")}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {paymentOptions.map((option, index) => (
            <Card key={index} className="p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
              <CardContent className="flex flex-col items-center text-center">
                <div className="mb-4">
                  {option.image ? (
                    <Image src={option.image || "/placeholder.svg"} alt={option.title} width={40} height={40} className="h-10 w-10" />
                  ) : (
                    option.icon
                  )}
                </div>
                <CardTitle className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                  {option.title}
                </CardTitle>
                <p className="text-gray-700 dark:text-gray-300">
                  {option.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
