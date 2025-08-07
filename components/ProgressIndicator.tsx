'use client'

import React from 'react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'

interface ProgressIndicatorProps {
  currentStep: number
  totalSteps: number
  labels?: string[]
}

export function ProgressIndicator({ currentStep, totalSteps, labels }: ProgressIndicatorProps) {
  const progressValue = (currentStep / totalSteps) * 100

  return (
    <div className="w-full space-y-4 py-4">
      <Progress value={progressValue} className="h-2 bg-primary/20" />
      {labels && labels.length === totalSteps && (
        <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-400">
          {labels.map((label, index) => (
            <div
              key={index}
              className={cn(
                "text-center transition-colors duration-300",
                index + 1 === currentStep ? "text-primary font-bold" : "text-gray-500"
              )}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
