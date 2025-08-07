'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Palette, DollarSign, MessageSquare, Settings } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/use-toast'

export function CustomizationPanel() {
  const { language } = useLanguage()
  const { toast } = useToast()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "Platform Customization",
        subtitle: "Tailor the TeleTransfer platform to your brand and operational needs.",
        generalSettings: "General Settings",
        platformName: "Platform Name",
        contactEmail: "Contact Email",
        welcomeMessage: "Welcome Message",
        themeSettings: "Theme Settings",
        enableDarkMode: "Enable Dark Mode Toggle",
        primaryColor: "Primary Color (Hex)",
        pricingSettings: "Pricing Settings",
        pricePerMember: "Price Per Member ($)",
        minMembers: "Minimum Members Per Transfer",
        paymentMethods: "Enabled Payment Methods",
        saveChanges: "Save Changes",
        changesSaved: "Changes saved successfully!",
        errorSavingChanges: "Error saving changes.",
      },
      ar: {
        title: "تخصيص المنصة",
        subtitle: "خصص منصة TeleTransfer لتناسب علامتك التجارية واحتياجاتك التشغيلية.",
        generalSettings: "الإعدادات العامة",
        platformName: "اسم المنصة",
        contactEmail: "بريد الاتصال الإلكتروني",
        welcomeMessage: "رسالة الترحيب",
        themeSettings: "إعدادات الثيم",
        enableDarkMode: "تمكين تبديل الوضع الداكن",
        primaryColor: "اللون الأساسي (Hex)",
        pricingSettings: "إعدادات التسعير",
        pricePerMember: "سعر العضو الواحد ($)",
        minMembers: "الحد الأدنى للأعضاء لكل نقل",
        paymentMethods: "طرق الدفع المفعلة",
        saveChanges: "حفظ التغييرات",
        changesSaved: "تم حفظ التغييرات بنجاح!",
        errorSavingChanges: "خطأ في حفظ التغييرات.",
      },
    }
    return translations[language][key] || key
  }

  const [platformName, setPlatformName] = useState('TeleTransfer')
  const [contactEmail, setContactEmail] = useState('support@teletransfer.com')
  const [welcomeMessage, setWelcomeMessage] = useState('Welcome to TeleTransfer! Your smart solution for Telegram member migration.')
  const [enableDarkMode, setEnableDarkMode] = useState(true)
  const [primaryColor, setPrimaryColor] = useState('#3b82f6') // Default blue
  const [pricePerMember, setPricePerMember] = useState(0.01)
  const [minMembers, setMinMembers] = useState(100)
  const [enabledPaymentMethods, setEnabledPaymentMethods] = useState<string[]>(['credit_card', 'crypto'])

  const handleSaveChanges = () => {
    // In a real application, this would send data to a backend API
    console.log("Saving changes:", {
      platformName, contactEmail, welcomeMessage, enableDarkMode, primaryColor, pricePerMember, minMembers, enabledPaymentMethods
    })
    toast({ title: t("changesSaved"), variant: "success" })
  }

  const handlePaymentMethodChange = (method: string) => {
    setEnabledPaymentMethods(prev =>
      prev.includes(method) ? prev.filter(m => m !== method) : [...prev, method]
    )
  }

  return (
    <section id="customization-panel" className="py-12 md:py-20 bg-gray-100 dark:bg-gray-950 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2 text-gradient-custom">
              {t("title")}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">{t("subtitle")}</p>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* General Settings */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Settings className="h-6 w-6 text-primary" /> {t("generalSettings")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="platform-name">{t("platformName")}</Label>
                  <Input id="platform-name" value={platformName} onChange={(e) => setPlatformName(e.target.value)} />
                </div>
                <div>
                  <Label htmlFor="contact-email">{t("contactEmail")}</Label>
                  <Input id="contact-email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
                </div>
              </div>
              <div className="mt-4">
                <Label htmlFor="welcome-message">{t("welcomeMessage")}</Label>
                <Textarea id="welcome-message" value={welcomeMessage} onChange={(e) => setWelcomeMessage(e.target.value)} rows={3} />
              </div>
            </div>

            {/* Theme Settings */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Palette className="h-6 w-6 text-primary" /> {t("themeSettings")}
              </h3>
              <div className="flex items-center justify-between mb-4">
                <Label htmlFor="enable-dark-mode">{t("enableDarkMode")}</Label>
                <Switch id="enable-dark-mode" checked={enableDarkMode} onCheckedChange={setEnableDarkMode} />
              </div>
              <div>
                <Label htmlFor="primary-color">{t("primaryColor")}</Label>
                <Input id="primary-color" type="color" value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="h-10 w-24 p-1" />
              </div>
            </div>

            {/* Pricing Settings */}
            <div>
              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <DollarSign className="h-6 w-6 text-primary" /> {t("pricingSettings")}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price-per-member">{t("pricePerMember")}</Label>
                  <Input id="price-per-member" type="number" step="0.001" value={pricePerMember} onChange={(e) => setPricePerMember(Number(e.target.value))} />
                </div>
                <div>
                  <Label htmlFor="min-members">{t("minMembers")}</Label>
                  <Input id="min-members" type="number" value={minMembers} onChange={(e) => setMinMembers(Number(e.target.value))} />
                </div>
              </div>
              <div className="mt-4">
                <Label>{t("paymentMethods")}</Label>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="credit_card"
                      checked={enabledPaymentMethods.includes('credit_card')}
                      onChange={() => handlePaymentMethodChange('credit_card')}
                      className="form-checkbox"
                    />
                    <Label htmlFor="credit_card">Credit Card</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="bank_transfer"
                      checked={enabledPaymentMethods.includes('bank_transfer')}
                      onChange={() => handlePaymentMethodChange('bank_transfer')}
                      className="form-checkbox"
                    />
                    <Label htmlFor="bank_transfer">Bank Transfer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="crypto"
                      checked={enabledPaymentMethods.includes('crypto')}
                      onChange={() => handlePaymentMethodChange('crypto')}
                      className="form-checkbox"
                    />
                    <Label htmlFor="crypto">Cryptocurrency</Label>
                  </div>
                </div>
              </div>
            </div>

            <Button onClick={handleSaveChanges} className="w-full">
              {t("saveChanges")}
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
