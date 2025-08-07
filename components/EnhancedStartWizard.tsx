'use client'

import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressIndicator } from '@/components/ProgressIndicator'
import { ArrowLeft, ArrowRight, CheckCircle, Loader2, UploadCloud, Link, Users, DollarSign } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/use-toast'
import { PaymentProofUpload } from './PaymentProofUpload'
import { SuccessModal } from './SuccessModal'

interface EnhancedStartWizardProps {
  onBack: () => void
  language: 'en' | 'ar'
}

export function EnhancedStartWizard({ onBack, language }: EnhancedStartWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const totalSteps = 4
  const [sourceGroupLink, setSourceGroupLink] = useState('')
  const [destinationGroupLink, setDestinationGroupLink] = useState('')
  const [memberCount, setMemberCount] = useState<number | ''>('')
  const [paymentProofUploaded, setPaymentProofUploaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { toast } = useToast()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "Start New Transfer",
        step1Title: "Group Details",
        step1Subtitle: "Provide the links for your source and destination Telegram groups.",
        sourceGroupLink: "Source Telegram Group Link (Public)",
        sourceGroupPlaceholder: "e.g., https://t.me/public_group_link",
        destinationGroupLink: "Destination Telegram Group Link (Private)",
        destinationGroupPlaceholder: "e.g., https://t.me/private_group_link (Admin access required)",
        next: "Next",
        back: "Back",
        invalidLink: "Please enter a valid Telegram group link.",

        step2Title: "Transfer Details",
        step2Subtitle: "Specify the number of members to transfer and any filtering options.",
        memberCount: "Number of Members to Transfer",
        memberCountPlaceholder: "e.g., 1000",
        minMembers: "Minimum 100 members required.",
        invalidMemberCount: "Please enter a valid number of members (min 100).",
        filteringOptions: "Filtering Options (Optional)",
        activeMembersOnly: "Active members only",
        excludeBots: "Exclude bots",
        membersJoinedAfter: "Members joined after (Date)",

        step3Title: "Payment & Review",
        step3Subtitle: "Review your transfer details and proceed with payment.",
        transferSummary: "Transfer Summary",
        source: "Source Group:",
        destination: "Destination Group:",
        members: "Members:",
        estimatedCost: "Estimated Cost:",
        uploadPaymentProof: "Upload Payment Proof (Optional)",
        proceedToPayment: "Proceed to Payment",
        paymentProcessing: "Processing Payment...",
        paymentSuccess: "Payment successful! Your transfer is being initiated.",
        paymentFailed: "Payment failed. Please try again.",

        step4Title: "Transfer Confirmation",
        step4Subtitle: "Your transfer request has been submitted successfully!",
        orderId: "Your Order ID:",
        trackOrder: "Track Your Order",
        transferInitiated: "Your transfer is now being processed. You will receive updates on its progress.",
        goToDashboard: "Go to Dashboard",
        startAnotherTransfer: "Start Another Transfer",

        wizardSteps: ["Group Details", "Transfer Details", "Payment", "Confirmation"],
      },
      ar: {
        title: "بدء نقل جديد",
        step1Title: "تفاصيل المجموعة",
        step1Subtitle: "قدم روابط مجموعات تليجرام المصدر والوجهة.",
        sourceGroupLink: "رابط مجموعة تليجرام المصدر (عامة)",
        sourceGroupPlaceholder: "مثال: https://t.me/public_group_link",
        destinationGroupLink: "رابط مجموعة تليجرام الوجهة (خاصة)",
        destinationGroupPlaceholder: "مثال: https://t.me/private_group_link (يتطلب صلاحية المدير)",
        next: "التالي",
        back: "العودة",
        invalidLink: "الرجاء إدخال رابط مجموعة تليجرام صالح.",

        step2Title: "تفاصيل النقل",
        step2Subtitle: "حدد عدد الأعضاء المراد نقلهم وأي خيارات تصفية.",
        memberCount: "عدد الأعضاء المراد نقلهم",
        memberCountPlaceholder: "مثال: 1000",
        minMembers: "الحد الأدنى المطلوب 100 عضو.",
        invalidMemberCount: "الرجاء إدخال عدد صالح من الأعضاء (الحد الأدنى 100).",
        filteringOptions: "خيارات التصفية (اختياري)",
        activeMembersOnly: "الأعضاء النشطون فقط",
        excludeBots: "استبعاد الروبوتات",
        membersJoinedAfter: "الأعضاء الذين انضموا بعد (التاريخ)",

        step3Title: "الدفع والمراجعة",
        step3Subtitle: "راجع تفاصيل النقل الخاص بك وتابع عملية الدفع.",
        transferSummary: "ملخص النقل",
        source: "المجموعة المصدر:",
        destination: "المجموعة الوجهة:",
        members: "الأعضاء:",
        estimatedCost: "التكلفة التقديرية:",
        uploadPaymentProof: "رفع إثبات الدفع (اختياري)",
        proceedToPayment: "المتابعة للدفع",
        paymentProcessing: "جاري معالجة الدفع...",
        paymentSuccess: "تم الدفع بنجاح! جاري بدء النقل.",
        paymentFailed: "فشل الدفع. يرجى المحاولة مرة أخرى.",

        step4Title: "تأكيد النقل",
        step4Subtitle: "تم إرسال طلب النقل الخاص بك بنجاح!",
        orderId: "معرف طلبك:",
        trackOrder: "تتبع طلبك",
        transferInitiated: "جاري معالجة طلب النقل الخاص بك الآن. ستتلقى تحديثات حول تقدمه.",
        goToDashboard: "الذهاب إلى لوحة التحكم",
        startAnotherTransfer: "بدء نقل آخر",

        wizardSteps: ["تفاصيل المجموعة", "تفاصيل النقل", "الدفع", "التأكيد"],
      },
    }
    return translations[language][key] || key
  }

  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateLink(sourceGroupLink) || !validateLink(destinationGroupLink)) {
        toast({ title: t("invalidLink"), variant: "destructive" })
        return
      }
    } else if (currentStep === 2) {
      if (typeof memberCount !== 'number' || memberCount < 100) {
        toast({ title: t("invalidMemberCount"), variant: "destructive" })
        return
      }
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handleBackStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const validateLink = (link: string) => {
    return /^https:\/\/t\.me\/[a-zA-Z0-9_]+(\?join)?\/?$/.test(link)
  }

  const handlePayment = async () => {
    setLoading(true)
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000))
      toast({ title: t("paymentSuccess"), variant: "success" })
      setCurrentStep(4) // Move to confirmation step
      setShowSuccessModal(true)
    } catch (error) {
      toast({ title: t("paymentFailed"), variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  const estimatedCost = typeof memberCount === 'number' ? (memberCount * 0.01).toFixed(2) : '0.00' // Example cost

  return (
    <section id="start-wizard" className="py-12 md:py-20 bg-gray-100 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-3xl">
        <Button variant="ghost" onClick={onBack} className="mb-6 flex items-center text-primary">
          <ArrowLeft className="h-4 w-4 mr-2" /> {t("back")}
        </Button>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2 text-gradient-custom">
              {t("title")}
            </CardTitle>
            <ProgressIndicator currentStep={currentStep} totalSteps={totalSteps} labels={t("wizardSteps")} />
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t("step1Subtitle")}</h3>
                <div>
                  <Label htmlFor="source-group-link">{t("sourceGroupLink")}</Label>
                  <Input
                    id="source-group-link"
                    type="url"
                    placeholder={t("sourceGroupPlaceholder")}
                    value={sourceGroupLink}
                    onChange={(e) => setSourceGroupLink(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="destination-group-link">{t("destinationGroupLink")}</Label>
                  <Input
                    id="destination-group-link"
                    type="url"
                    placeholder={t("destinationGroupPlaceholder")}
                    value={destinationGroupLink}
                    onChange={(e) => setDestinationGroupLink(e.target.value)}
                    required
                  />
                </div>
                <Button onClick={handleNext} className="w-full">
                  {t("next")} <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t("step2Subtitle")}</h3>
                <div>
                  <Label htmlFor="member-count">{t("memberCount")}</Label>
                  <Input
                    id="member-count"
                    type="number"
                    placeholder={t("memberCountPlaceholder")}
                    value={memberCount}
                    onChange={(e) => setMemberCount(Number(e.target.value))}
                    min={100}
                    required
                  />
                  <p className="text-sm text-muted-foreground mt-1">{t("minMembers")}</p>
                </div>
                <div className="space-y-2">
                  <Label>{t("filteringOptions")}</Label>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="active-members" className="form-checkbox" />
                    <Label htmlFor="active-members">{t("activeMembersOnly")}</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="exclude-bots" className="form-checkbox" />
                    <Label htmlFor="exclude-bots">{t("excludeBots")}</Label>
                  </div>
                  <div>
                    <Label htmlFor="joined-after">{t("membersJoinedAfter")}</Label>
                    <Input id="joined-after" type="date" />
                  </div>
                </div>
                <div className="flex justify-between gap-4">
                  <Button variant="outline" onClick={handleBackStep} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> {t("back")}
                  </Button>
                  <Button onClick={handleNext} className="flex-1">
                    {t("next")} <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t("step3Subtitle")}</h3>
                <Card className="bg-gray-50 dark:bg-gray-900 p-4">
                  <CardTitle className="text-lg font-bold mb-2">{t("transferSummary")}</CardTitle>
                  <div className="space-y-1 text-sm">
                    <p><strong>{t("source")}</strong> {sourceGroupLink}</p>
                    <p><strong>{t("destination")}</strong> {destinationGroupLink}</p>
                    <p><strong>{t("members")}</strong> {memberCount}</p>
                    <p><strong>{t("estimatedCost")}</strong> ${estimatedCost}</p>
                  </div>
                </Card>
                <div>
                  <Label>{t("uploadPaymentProof")}</Label>
                  <PaymentProofUpload onUploadSuccess={() => setPaymentProofUploaded(true)} />
                </div>
                <div className="flex justify-between gap-4">
                  <Button variant="outline" onClick={handleBackStep} className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" /> {t("back")}
                  </Button>
                  <Button onClick={handlePayment} className="flex-1" disabled={loading}>
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" /> {t("paymentProcessing")}
                      </>
                    ) : (
                      <>
                        <DollarSign className="h-4 w-4 mr-2" /> {t("proceedToPayment")}
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center space-y-6">
                <CheckCircle className="h-20 w-20 text-green-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-bold text-gradient-custom">{t("step4Title")}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t("transferInitiated")}</p>
                <p className="text-lg font-semibold text-gray-800 dark:text-white">
                  {t("orderId")} <span className="text-primary">TT-{Math.floor(Math.random() * 1000000000)}</span>
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button onClick={onBack} className="bg-gradient-primary hover:shadow-lg hover:shadow-blue-500/25 text-white py-3 rounded-xl btn-hover-lift transition-all duration-300">
                    {t("goToDashboard")}
                  </Button>
                  <Button variant="outline" onClick={() => setCurrentStep(1)} className="border-2 border-primary text-primary hover:bg-primary hover:text-white py-3 rounded-xl transition-all duration-300">
                    {t("startAnotherTransfer")}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title={t("paymentSuccess")}
        description={t("transferInitiated")}
      />
    </section>
  )
}
