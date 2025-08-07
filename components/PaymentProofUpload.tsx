'use client'

import React, { useState, useCallback } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { UploadCloud, CheckCircle, XCircle, Loader2, FileImage, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { useLanguage } from '@/hooks/useLanguage'

interface PaymentProofUploadProps {
  onUploadSuccess?: (fileUrl: string) => void
  onUploadError?: (error: string) => void
}

export function PaymentProofUpload({ onUploadSuccess, onUploadError }: PaymentProofUploadProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [preview, setPreview] = useState<string | null>(null)
  const { toast } = useToast()
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        uploadProof: "Upload Payment Proof",
        chooseFile: "Choose File",
        dragDrop: "Drag & drop your payment proof here, or click to browse",
        supportedFormats: "Supported formats: JPG, PNG, PDF (Max 5MB)",
        uploading: "Uploading...",
        uploadSuccess: "Payment proof uploaded successfully!",
        uploadFailed: "Upload failed. Please try again.",
        fileTooLarge: "File size exceeds 5MB limit.",
        invalidFileType: "Invalid file type. Only images (JPG, PNG) or PDFs are allowed.",
        uploadButton: "Upload Proof",
        removeFile: "Remove File",
        fileName: "File Name:",
        fileSize: "File Size:",
      },
      ar: {
        uploadProof: "رفع إثبات الدفع",
        chooseFile: "اختر ملف",
        dragDrop: "اسحب وأفلت إثبات الدفع هنا، أو انقر للتصفح",
        supportedFormats: "الصيغ المدعومة: JPG, PNG, PDF (الحد الأقصى 5 ميجابايت)",
        uploading: "جاري الرفع...",
        uploadSuccess: "تم رفع إثبات الدفع بنجاح!",
        uploadFailed: "فشل الرفع. يرجى المحاولة مرة أخرى.",
        fileTooLarge: "حجم الملف يتجاوز الحد الأقصى 5 ميجابايت.",
        invalidFileType: "نوع الملف غير صالح. يُسمح فقط بالصور (JPG, PNG) أو ملفات PDF.",
        uploadButton: "رفع الإثبات",
        removeFile: "إزالة الملف",
        fileName: "اسم الملف:",
        fileSize: "حجم الملف:",
      },
    }
    return translations[language][key] || key
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = (file: File) => {
    const fileSizeLimit = 5 * 1024 * 1024 // 5MB
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf']

    if (file.size > fileSizeLimit) {
      return { valid: false, error: t("fileTooLarge") }
    }

    if (!allowedTypes.includes(file.type)) {
      return { valid: false, error: t("invalidFileType") }
    }

    return { valid: true, error: null }
  }

  const handleFileChange = useCallback((selectedFile: File) => {
    const validation = validateFile(selectedFile)
    
    if (!validation.valid) {
      toast({ 
        title: t("uploadFailed"), 
        description: validation.error!, 
        variant: "destructive" 
      })
      return
    }

    setFile(selectedFile)
    setUploadStatus('idle')

    // Create preview for images
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreview(e.target?.result as string)
      }
      reader.readAsDataURL(selectedFile)
    } else {
      setPreview(null)
    }
  }, [toast, t])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      handleFileChange(event.target.files[0])
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const files = e.dataTransfer.files
    if (files && files[0]) {
      handleFileChange(files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setUploadStatus('idle')

    try {
      // Simulate file upload to a server
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // In a real application, you would send the file to an API endpoint
      const simulatedFileUrl = URL.createObjectURL(file)

      setUploadStatus('success')
      toast({ 
        title: t("uploadSuccess"), 
        variant: "success" 
      })
      onUploadSuccess?.(simulatedFileUrl)
    } catch (error) {
      console.error("Upload error:", error)
      setUploadStatus('error')
      toast({ 
        title: t("uploadFailed"), 
        description: (error as Error).message || t("uploadFailed"), 
        variant: "destructive" 
      })
      onUploadError?.((error as Error).message || t("uploadFailed"))
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    setPreview(null)
    setUploadStatus('idle')
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <Card className="border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-primary transition-colors">
          <CardContent className="p-6">
            <div
              className="text-center cursor-pointer"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onClick={() => document.getElementById('payment-proof-input')?.click()}
            >
              <UploadCloud className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t("dragDrop")}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("supportedFormats")}
              </p>
              <Input
                id="payment-proof-input"
                type="file"
                className="hidden"
                onChange={handleInputChange}
                accept="image/jpeg,image/png,application/pdf"
              />
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border border-gray-200 dark:border-gray-700">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              {preview ? (
                <img 
                  src={preview || "/placeholder.svg"} 
                  alt="Payment proof preview" 
                  className="w-16 h-16 object-cover rounded-lg border"
                />
              ) : (
                <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                  <FileImage className="h-8 w-8 text-gray-400" />
                </div>
              )}
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {t("fileName")} {file.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {t("fileSize")} {formatFileSize(file.size)}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRemoveFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="mt-3 flex items-center space-x-2">
                  <Button
                    onClick={handleUpload}
                    disabled={uploading || uploadStatus === 'success'}
                    size="sm"
                    className="bg-primary hover:bg-primary/90"
                  >
                    {uploading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        {t("uploading")}
                      </>
                    ) : uploadStatus === 'success' ? (
                      <>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        {t("uploadSuccess")}
                      </>
                    ) : (
                      t("uploadButton")
                    )}
                  </Button>
                  
                  {uploadStatus === 'success' && (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  )}
                  {uploadStatus === 'error' && (
                    <XCircle className="h-5 w-5 text-red-500" />
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
