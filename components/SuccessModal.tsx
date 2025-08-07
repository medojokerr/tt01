'use client'

import React from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { CheckCircle, Copy, ExternalLink } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

interface SuccessModalProps {
  isOpen: boolean
  onClose: () => void
  language: 'en' | 'ar'
  title?: string
  description?: string
  orderId?: string
  onConfirm?: () => void
}

export function SuccessModal({ 
  isOpen, 
  onClose, 
  language, 
  title, 
  description, 
  orderId,
  onConfirm 
}: SuccessModalProps) {
  const { toast } = useToast()

  const t = (key: string) => {
    const translations = {
      en: {
        defaultTitle: "Transfer Initiated Successfully!",
        defaultDescription: "Your Telegram member transfer has been started. You will receive updates on the progress.",
        orderId: "Order ID:",
        copyOrderId: "Copy Order ID",
        trackOrder: "Track Order",
        ok: "Got it!",
        orderIdCopied: "Order ID copied to clipboard!",
        whatNext: "What happens next?",
        step1: "Our AI system will analyze the source group",
        step2: "Members will be transferred in batches",
        step3: "You'll receive real-time progress updates",
        step4: "Transfer completion notification",
      },
      ar: {
        defaultTitle: "تم بدء النقل بنجاح!",
        defaultDescription: "تم بدء نقل أعضاء تليجرام الخاص بك. ستتلقى تحديثات حول التقدم.",
        orderId: "معرف الطلب:",
        copyOrderId: "نسخ معرف الطلب",
        trackOrder: "تتبع الطلب",
        ok: "فهمت!",
        orderIdCopied: "تم نسخ معرف الطلب إلى الحافظة!",
        whatNext: "ما الذي سيحدث بعد ذلك؟",
        step1: "سيقوم نظام الذكاء الاصطناعي بتحليل المجموعة المصدر",
        step2: "سيتم نقل الأعضاء على دفعات",
        step3: "ستتلقى تحديثات التقدم في الوقت الفعلي",
        step4: "إشعار اكتمال النقل",
      },
    }
    return translations[language][key] || key
  }

  const generatedOrderId = orderId || `TT-${Date.now().toString().slice(-8)}`

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(generatedOrderId)
    toast({
      title: t("orderIdCopied"),
      variant: "success",
    })
  }

  const handleConfirm = () => {
    onConfirm?.()
    onClose()
  }

  const nextSteps = [
    t("step1"),
    t("step2"),
    t("step3"),
    t("step4"),
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] text-center">
        <DialogHeader className="flex flex-col items-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
          </div>
          <DialogTitle className="text-2xl font-bold text-gradient-custom">
            {title || t("defaultTitle")}
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400 mt-2 text-base">
            {description || t("defaultDescription")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 my-6">
          {/* Order ID Section */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t("orderId")}
            </p>
            <div className="flex items-center justify-between bg-white dark:bg-gray-700 rounded-md p-3 border">
              <code className="text-lg font-mono font-bold text-primary">
                {generatedOrderId}
              </code>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyOrderId}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* What's Next Section */}
          <div className="text-left">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
              {t("whatNext")}
            </h4>
            <div className="space-y-2">
              {nextSteps.map((step, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex items-center space-x-2"
          >
            <ExternalLink className="h-4 w-4" />
            <span>{t("trackOrder")}</span>
          </Button>
          <Button 
            onClick={handleConfirm}
            className="bg-gradient-primary hover:shadow-lg hover:shadow-blue-500/25 text-white"
          >
            {t("ok")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
