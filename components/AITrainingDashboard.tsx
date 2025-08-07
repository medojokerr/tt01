'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Bot, Play, Pause, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'
import { useToast } from '@/hooks/use-toast'

export function AITrainingDashboard() {
  const [modelName, setModelName] = useState('Default-AI-Model-V1')
  const [trainingStatus, setTrainingStatus] = useState<'idle' | 'training' | 'paused' | 'completed' | 'failed'>('idle')
  const [progress, setProgress] = useState(0)
  const [epochs, setEpochs] = useState(10)
  const [learningRate, setLearningRate] = useState(0.001)
  const [dataset, setDataset] = useState('telegram_member_data_v2')
  const { language } = useLanguage()
  const { toast } = useToast()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "AI Model Training Dashboard",
        subtitle: "Manage and train your AI models for optimal transfer performance.",
        modelName: "Model Name",
        trainingStatus: "Training Status",
        progress: "Progress",
        epochs: "Epochs",
        learningRate: "Learning Rate",
        dataset: "Training Dataset",
        startTraining: "Start Training",
        pauseTraining: "Pause Training",
        resumeTraining: "Resume Training",
        stopTraining: "Stop Training",
        resetModel: "Reset Model",
        statusIdle: "Idle",
        statusTraining: "Training...",
        statusPaused: "Paused",
        statusCompleted: "Completed",
        statusFailed: "Failed",
        trainingStarted: "AI training started!",
        trainingPaused: "AI training paused.",
        trainingResumed: "AI training resumed.",
        trainingStopped: "AI training stopped.",
        trainingCompleted: "AI training completed successfully!",
        trainingFailed: "AI training failed. Check logs.",
        modelReset: "AI model reset to default.",
      },
      ar: {
        title: "لوحة تحكم تدريب نموذج الذكاء الاصطناعي",
        subtitle: "إدارة وتدريب نماذج الذكاء الاصطناعي لتحقيق أداء نقل أمثل.",
        modelName: "اسم النموذج",
        trainingStatus: "حالة التدريب",
        progress: "التقدم",
        epochs: "الحقب",
        learningRate: "معدل التعلم",
        dataset: "مجموعة بيانات التدريب",
        startTraining: "بدء التدريب",
        pauseTraining: "إيقاف مؤقت للتدريب",
        resumeTraining: "استئناف التدريب",
        stopTraining: "إيقاف التدريب",
        resetModel: "إعادة تعيين النموذج",
        statusIdle: "خامل",
        statusTraining: "جاري التدريب...",
        statusPaused: "متوقف مؤقتاً",
        statusCompleted: "مكتمل",
        statusFailed: "فشل",
        trainingStarted: "بدأ تدريب الذكاء الاصطناعي!",
        trainingPaused: "تم إيقاف تدريب الذكاء الاصطناعي مؤقتاً.",
        trainingResumed: "تم استئناف تدريب الذكاء الاصطناعي.",
        trainingStopped: "تم إيقاف تدريب الذكاء الاصطناعي.",
        trainingCompleted: "اكتمل تدريب الذكاء الاصطناعي بنجاح!",
        trainingFailed: "فشل تدريب الذكاء الاصطناعي. تحقق من السجلات.",
        modelReset: "تمت إعادة تعيين نموذج الذكاء الاصطناعي إلى الافتراضي.",
      },
    }
    return translations[language][key] || key
  }

  const handleStartTraining = () => {
    setTrainingStatus('training')
    setProgress(0)
    toast({ title: t("trainingStarted") })
    let currentProgress = 0
    const interval = setInterval(() => {
      currentProgress += 5
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTrainingStatus('completed')
        setProgress(100)
        toast({ title: t("trainingCompleted"), variant: "success" })
      } else {
        setProgress(currentProgress)
      }
    }, 500)
  }

  const handlePauseTraining = () => {
    setTrainingStatus('paused')
    toast({ title: t("trainingPaused") })
  }

  const handleResumeTraining = () => {
    setTrainingStatus('training')
    toast({ title: t("trainingResumed") })
    // Re-initiate progress simulation (simplified)
    let currentProgress = progress
    const interval = setInterval(() => {
      currentProgress += 5
      if (currentProgress >= 100) {
        clearInterval(interval)
        setTrainingStatus('completed')
        setProgress(100)
        toast({ title: t("trainingCompleted"), variant: "success" })
      } else {
        setProgress(currentProgress)
      }
    }, 500)
  }

  const handleStopTraining = () => {
    setTrainingStatus('idle')
    setProgress(0)
    toast({ title: t("trainingStopped") })
  }

  const handleResetModel = () => {
    setModelName('Default-AI-Model-V1')
    setTrainingStatus('idle')
    setProgress(0)
    setEpochs(10)
    setLearningRate(0.001)
    setDataset('telegram_member_data_v2')
    toast({ title: t("modelReset") })
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-6 w-6 text-blue-600" />
          {t("title")}
        </CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400">{t("subtitle")}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="model-name">{t("modelName")}</Label>
            <Input id="model-name" value={modelName} onChange={(e) => setModelName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="training-status">{t("trainingStatus")}</Label>
            <Input id="training-status" value={t(`status${trainingStatus.charAt(0).toUpperCase() + trainingStatus.slice(1)}`)} readOnly />
          </div>
        </div>

        <div>
          <Label>{t("progress")}</Label>
          <Progress value={progress} className="w-full" />
          <p className="text-right text-sm text-gray-500">{progress}%</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="epochs">{t("epochs")}</Label>
            <Input id="epochs" type="number" value={epochs} onChange={(e) => setEpochs(Number(e.target.value))} />
          </div>
          <div>
            <Label htmlFor="learning-rate">{t("learningRate")}</Label>
            <Input id="learning-rate" type="number" step="0.0001" value={learningRate} onChange={(e) => setLearningRate(Number(e.target.value))} />
          </div>
        </div>

        <div>
          <Label htmlFor="dataset">{t("dataset")}</Label>
          <Select value={dataset} onValueChange={setDataset}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t("dataset")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="telegram_member_data_v1">Telegram Member Data V1</SelectItem>
              <SelectItem value="telegram_member_data_v2">Telegram Member Data V2</SelectItem>
              <SelectItem value="custom_data_set">Custom Dataset</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {trainingStatus === 'idle' || trainingStatus === 'completed' || trainingStatus === 'failed' ? (
            <Button onClick={handleStartTraining} disabled={trainingStatus === 'training'}>
              <Play className="h-4 w-4 mr-2" /> {t("startTraining")}
            </Button>
          ) : trainingStatus === 'training' ? (
            <Button onClick={handlePauseTraining}>
              <Pause className="h-4 w-4 mr-2" /> {t("pauseTraining")}
            </Button>
          ) : (
            <Button onClick={handleResumeTraining}>
              <Play className="h-4 w-4 mr-2" /> {t("resumeTraining")}
            </Button>
          )}
          {(trainingStatus === 'training' || trainingStatus === 'paused') && (
            <Button variant="destructive" onClick={handleStopTraining}>
              <XCircle className="h-4 w-4 mr-2" /> {t("stopTraining")}
            </Button>
          )}
          <Button variant="outline" onClick={handleResetModel}>
            <RefreshCw className="h-4 w-4 mr-2" /> {t("resetModel")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
