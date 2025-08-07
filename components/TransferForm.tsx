'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Send, CheckCircle, Loader2, LinkIcon, Users, DollarSign, Upload, AlertCircle, Info } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { PaymentProofUpload } from './PaymentProofUpload'

interface TransferFormProps {
  language: 'en' | 'ar'
  onSubmit: () => void
}

export function TransferForm({ language, onSubmit }: TransferFormProps) {
  const [sourceGroupLink, setSourceGroupLink] = useState('')
  const [destinationGroupLink, setDestinationGroupLink] = useState('')
  const [memberCount, setMemberCount] = useState<number | ''>('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [paymentProofUploaded, setPaymentProofUploaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [transferStatus, setTransferStatus] = useState<'idle' | 'validating' | 'processing' | 'transferring' | 'completed' | 'failed'>('idle')
  const { toast } = useToast()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "Start Your AI-Powered Transfer",
        subtitle: "Fill in the details below to initiate your intelligent Telegram member transfer.",
        sourceGroupSection: "Source Group Information",
        sourceGroupLink: "Source Telegram Group Link (Public)",
        sourceGroupPlaceholder: "https://t.me/your_public_group",
        sourceGroupHelp: "Must be a public Telegram group with visible members",
        
        destinationGroupSection: "Destination Group Information", 
        destinationGroupLink: "Destination Telegram Group Link (Private)",
        destinationGroupPlaceholder: "https://t.me/your_private_group",
        destinationGroupHelp: "You must be an admin of this private group",
        
        transferDetailsSection: "Transfer Details",
        memberCount: "Number of Members to Transfer",
        memberCountPlaceholder: "e.g., 1000",
        memberCountHelp: "Minimum 100 members, maximum 50,000 per transfer",
        
        specialRequests: "Special Requirements (Optional)",
        specialRequestsPlaceholder: "Any specific requirements for member selection or transfer timing...",
        
        paymentSection: "Payment Confirmation",
        uploadPaymentProof: "Upload Payment Proof",
        paymentProofHelp: "Upload screenshot or receipt of your payment",
        
        estimatedCost: "Estimated Cost",
        processingFee: "Processing Fee",
        totalCost: "Total Cost",
        
        submitTransfer: "Start AI Transfer",
        validating: "Validating Groups...",
        processing: "Processing Request...",
        transferring: "AI Transferring Members...",
        transferComplete: "Transfer Completed!",
        transferFailed: "Transfer Failed",
        
        successToastTitle: "Transfer Initiated!",
        successToastDesc: "Your AI-powered transfer has been started successfully.",
        errorToastTitle: "Validation Failed",
        errorToastDesc: "Please check all fields and try again.",
        
        invalidLink: "Please enter a valid Telegram group link",
        invalidMemberCount: "Please enter a valid number of members (100-50,000)",
        paymentRequired: "Please upload payment proof to continue",
        
        statusMessages: {
          validating: "Validating group accessibility and permissions...",
          processing: "AI analyzing source group structure...",
          transferring: "Intelligent member migration in progress...",
          completed: "All members successfully transferred!",
          failed: "Transfer encountered an issue. Support team notified."
        }
      },
      ar: {
        title: "ابدأ النقل المدعوم بالذكاء الاصطناعي",
        subtitle: "املأ التفاصيل أدناه لبدء نقل أعضاء تليجرام الذكي.",
        sourceGroupSection: "معلومات المجموعة المصدر",
        sourceGroupLink: "رابط مجموعة تليجرام المصدر (عامة)",
        sourceGroupPlaceholder: "https://t.me/your_public_group",
        sourceGroupHelp: "يجب أن تكون مجموعة تليجرام عامة مع أعضاء مرئيين",
        
        destinationGroupSection: "معلومات المجموعة الوجهة",
        destinationGroupLink: "رابط مجموعة تليجرام الوجهة (خاصة)",
        destinationGroupPlaceholder: "https://t.me/your_private_group", 
        destinationGroupHelp: "يجب أن تكون مديرًا لهذه المجموعة الخاصة",
        
        transferDetailsSection: "تفاصيل النقل",
        memberCount: "عدد الأعضاء المراد نقلهم",
        memberCountPlaceholder: "مثال: 1000",
        memberCountHelp: "الحد الأدنى 100 عضو، الحد الأقصى 50,000 لكل نقل",
        
        specialRequests: "متطلبات خاصة (اختياري)",
        specialRequestsPlaceholder: "أي متطلبات محددة لاختيار الأعضاء أو توقيت النقل...",
        
        paymentSection: "تأكيد الدفع",
        uploadPaymentProof: "رفع إثبات الدفع",
        paymentProofHelp: "ارفع لقطة شاشة أو إيصال دفعتك",
        
        estimatedCost: "التكلفة المقدرة",
        processingFee: "رسوم المعالجة",
        totalCost: "التكلفة الإجمالية",
        
        submitTransfer: "بدء النقل بالذكاء الاصطناعي",
        validating: "جاري التحقق من المجموعات...",
        processing: "جاري معالجة الطلب...",
        transferring: "الذكاء الاصطناعي ينقل الأعضاء...",
        transferComplete: "اكتمل النقل!",
        transferFailed: "فشل النقل",
        
        successToastTitle: "تم بدء النقل!",
        successToastDesc: "تم بدء النقل المدعوم بالذكاء الاصطناعي بنجاح.",
        errorToastTitle: "فشل التحقق",
        errorToastDesc: "يرجى التحقق من جميع الحقول والمحاولة مرة أخرى.",
        
        invalidLink: "يرجى إدخال رابط مجموعة تليجرام صالح",
        invalidMemberCount: "يرجى إدخال عدد صالح من الأعضاء (100-50,000)",
        paymentRequired: "يرجى رفع إثبات الدفع للمتابعة",
        
        statusMessages: {
          validating: "جاري التحقق من إمكانية الوصول للمجموعة والصلاحيات...",
          processing: "الذكاء الاصطناعي يحلل هيكل المجموعة المصدر...",
          transferring: "ترحيل ذكي للأعضاء قيد التقدم...",
          completed: "تم نقل جميع الأعضاء بنجاح!",
          failed: "واجه النقل مشكلة. تم إشعار فريق الدعم."
        }
      },
    }
    return translations[language][key] || key
  }

  const validateLink = (link: string) => {
    return /^https:\/\/t\.me\/[a-zA-Z0-9_]+(\?join)?\/?$/.test(link)
  }

  const calculateCost = () => {
    if (typeof memberCount !== 'number') return { base: 0, processing: 0, total: 0 }
    const baseRate = 0.015 // $0.015 per member
    const baseCost = memberCount * baseRate
    const processingFee = Math.max(5, baseCost * 0.1) // 10% processing fee, minimum $5
    return {
      base: baseCost,
      processing: processingFee,
      total: baseCost + processingFee
    }
  }

  const cost = calculateCost()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!validateLink(sourceGroupLink)) {
      toast({ title: t("errorToastTitle"), description: t("invalidLink"), variant: "destructive" })
      return
    }
    if (!validateLink(destinationGroupLink)) {
      toast({ title: t("errorToastTitle"), description: t("invalidLink"), variant: "destructive" })
      return
    }
    if (typeof memberCount !== 'number' || memberCount < 100 || memberCount > 50000) {
      toast({ title: t("errorToastTitle"), description: t("invalidMemberCount"), variant: "destructive" })
      return
    }
    if (!paymentProofUploaded) {
      toast({ title: t("errorToastTitle"), description: t("paymentRequired"), variant: "destructive" })
      return
    }

    setLoading(true)
    setTransferStatus('validating')
    setProgress(0)

    try {
      // Simulate validation phase
      await new Promise(resolve => setTimeout(resolve, 2000))
      setProgress(20)
      setTransferStatus('processing')

      // Simulate processing phase
      await new Promise(resolve => setTimeout(resolve, 2000))
      setProgress(50)
      setTransferStatus('transferring')

      // Simulate transfer progress
      let currentProgress = 50
      const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 8) + 3 // Increase by 3-10%
        if (currentProgress >= 100) {
          clearInterval(interval)
          setProgress(100)
          setTransferStatus('completed')
          toast({ title: t("successToastTitle"), description: t("successToastDesc"), variant: "success" })
          setTimeout(() => {
            onSubmit() // Trigger success modal
          }, 1000)
        } else {
          setProgress(currentProgress)
        }
      }, 1000)

      // Simulate potential failure (5% chance)
      if (Math.random() < 0.05) {
        clearInterval(interval)
        setTransferStatus('failed')
        toast({ title: t("errorToastTitle"), description: t("statusMessages.failed"), variant: "destructive" })
      }

    } catch (error) {
      console.error("Transfer submission error:", error)
      setTransferStatus('failed')
      toast({ title: t("errorToastTitle"), description: t("errorToastDesc"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = () => {
    switch (transferStatus) {
      case 'validating':
      case 'processing':
      case 'transferring':
        return <Loader2 className="h-5 w-5 animate-spin" />
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'failed':
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <Send className="h-5 w-5" />
    }
  }

  const getStatusColor = () => {
    switch (transferStatus) {
      case 'completed': return 'text-green-600'
      case 'failed': return 'text-red-600'
      case 'validating':
      case 'processing':
      case 'transferring': return 'text-blue-600'
      default: return 'text-gray-600'
    }
  }

  return (
    <section id="transfer-form" className="py-12 md:py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gradient-custom mb-4">
            {t("title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t("subtitle")}
          </p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("title")}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit} className="space-y-8">
              
              {/* Source Group Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <LinkIcon className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t("sourceGroupSection")}
                  </h3>
                </div>
                <div>
                  <Label htmlFor="source-group-link" className="text-base font-medium">
                    {t("sourceGroupLink")}
                  </Label>
                  <Input
                    id="source-group-link"
                    type="url"
                    placeholder={t("sourceGroupPlaceholder")}
                    value={sourceGroupLink}
                    onChange={(e) => setSourceGroupLink(e.target.value)}
                    required
                    disabled={loading}
                    className="mt-2 h-12 text-base"
                  />
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Info className="h-4 w-4 mr-1" />
                    {t("sourceGroupHelp")}
                  </div>
                </div>
              </div>

              {/* Destination Group Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t("destinationGroupSection")}
                  </h3>
                </div>
                <div>
                  <Label htmlFor="destination-group-link" className="text-base font-medium">
                    {t("destinationGroupLink")}
                  </Label>
                  <Input
                    id="destination-group-link"
                    type="url"
                    placeholder={t("destinationGroupPlaceholder")}
                    value={destinationGroupLink}
                    onChange={(e) => setDestinationGroupLink(e.target.value)}
                    required
                    disabled={loading}
                    className="mt-2 h-12 text-base"
                  />
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Info className="h-4 w-4 mr-1" />
                    {t("destinationGroupHelp")}
                  </div>
                </div>
              </div>

              {/* Transfer Details Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <DollarSign className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t("transferDetailsSection")}
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="member-count" className="text-base font-medium">
                      {t("memberCount")}
                    </Label>
                    <Input
                      id="member-count"
                      type="number"
                      placeholder={t("memberCountPlaceholder")}
                      value={memberCount}
                      onChange={(e) => setMemberCount(Number(e.target.value))}
                      min={100}
                      max={50000}
                      required
                      disabled={loading}
                      className="mt-2 h-12 text-base"
                    />
                    <div className="flex items-center mt-2 text-sm text-gray-500">
                      <Info className="h-4 w-4 mr-1" />
                      {t("memberCountHelp")}
                    </div>
                  </div>
                  
                  {/* Cost Breakdown */}
                  {typeof memberCount === 'number' && memberCount >= 100 && (
                    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                        {t("estimatedCost")}
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Base Cost ({memberCount} members):</span>
                          <span>${cost.base.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>{t("processingFee")}:</span>
                          <span>${cost.processing.toFixed(2)}</span>
                        </div>
                        <div className="border-t pt-2 flex justify-between font-semibold">
                          <span>{t("totalCost")}:</span>
                          <span className="text-primary">${cost.total.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="special-requests" className="text-base font-medium">
                    {t("specialRequests")}
                  </Label>
                  <Textarea
                    id="special-requests"
                    placeholder={t("specialRequestsPlaceholder")}
                    value={specialRequests}
                    onChange={(e) => setSpecialRequests(e.target.value)}
                    disabled={loading}
                    className="mt-2 min-h-[100px]"
                    rows={4}
                  />
                </div>
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Upload className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {t("paymentSection")}
                  </h3>
                </div>
                <div>
                  <Label className="text-base font-medium">{t("uploadPaymentProof")}</Label>
                  <div className="mt-2">
                    <PaymentProofUpload onUploadSuccess={() => setPaymentProofUploaded(true)} />
                  </div>
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <Info className="h-4 w-4 mr-1" />
                    {t("paymentProofHelp")}
                  </div>
                </div>
              </div>

              {/* Progress Section */}
              {loading && (
                <div className="space-y-4 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon()}
                    <div>
                      <p className={`font-semibold ${getStatusColor()}`}>
                        {t(`statusMessages.${transferStatus}`)}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {transferStatus === 'validating' && t("validating")}
                        {transferStatus === 'processing' && t("processing")}
                        {transferStatus === 'transferring' && t("transferring")}
                        {transferStatus === 'completed' && t("transferComplete")}
                        {transferStatus === 'failed' && t("transferFailed")}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-6">
                <Button
                  type="submit"
                  className="w-full bg-gradient-primary hover:shadow-lg hover:shadow-blue-500/25 text-white py-4 px-8 rounded-xl text-lg font-semibold btn-hover-lift transition-all duration-300 disabled:opacity-50"
                  disabled={loading || transferStatus === 'completed'}
                  size="lg"
                >
                  <div className="flex items-center justify-center space-x-2">
                    {getStatusIcon()}
                    <span>
                      {loading ? (
                        transferStatus === 'validating' ? t("validating") :
                        transferStatus === 'processing' ? t("processing") :
                        transferStatus === 'transferring' ? t("transferring") :
                        t("processing")
                      ) : transferStatus === 'completed' ? (
                        t("transferComplete")
                      ) : (
                        t("submitTransfer")
                      )}
                    </span>
                  </div>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
