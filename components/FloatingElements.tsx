'use client'

import React from 'react'
import { Bot, Users, Shield, Zap, TrendingUp, Star, Sparkles, Target, Award, CheckCircle } from 'lucide-react'

interface FloatingElementsProps {
  scrollY: number
}

export function FloatingElements({ scrollY }: FloatingElementsProps) {
  const elements = [
    { icon: <Bot className="h-6 w-6" />, color: 'blue', delay: 0, size: 'w-12 h-12' },
    { icon: <Users className="h-5 w-5" />, color: 'green', delay: 1000, size: 'w-10 h-10' },
    { icon: <Shield className="h-6 w-6" />, color: 'purple', delay: 2000, size: 'w-12 h-12' },
    { icon: <Zap className="h-4 w-4" />, color: 'yellow', delay: 3000, size: 'w-8 h-8' },
    { icon: <TrendingUp className="h-5 w-5" />, color: 'indigo', delay: 4000, size: 'w-10 h-10' },
    { icon: <Star className="h-4 w-4" />, color: 'pink', delay: 5000, size: 'w-8 h-8' },
    { icon: <Sparkles className="h-5 w-5" />, color: 'cyan', delay: 1500, size: 'w-10 h-10' },
    { icon: <Target className="h-4 w-4" />, color: 'orange', delay: 2500, size: 'w-8 h-8' },
    { icon: <Award className="h-5 w-5" />, color: 'emerald', delay: 3500, size: 'w-10 h-10' },
    { icon: <CheckCircle className="h-4 w-4" />, color: 'teal', delay: 4500, size: 'w-8 h-8' }
  ]

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {elements.map((element, index) => (
        <div
          key={index}
          className={`absolute ${element.size} bg-${element.color}-500/10 rounded-full flex items-center justify-center text-${element.color}-500 animate-float backdrop-blur-sm border border-${element.color}-500/20`}
          style={{
            left: `${5 + (index * 9)}%`,
            top: `${10 + (index * 8)}%`,
            transform: `translateY(${scrollY * 0.05 * (index + 1)}px) rotate(${scrollY * 0.02 * (index + 1)}deg)`,
            animationDelay: `${element.delay}ms`,
            animationDuration: `${3 + (index * 0.5)}s`
          }}
        >
          {element.icon}
        </div>
      ))}
      
      {/* Additional floating particles */}
      <div 
        className="absolute top-1/4 right-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      />
      <div 
        className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse"
        style={{ transform: `translateY(${scrollY * 0.04}px)` }}
      />
      <div 
        className="absolute top-2/3 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-bounce"
        style={{ transform: `translateY(${scrollY * 0.02}px)` }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-4 h-4 bg-yellow-400/20 rounded-full animate-pulse delay-1000"
        style={{ transform: `translateY(${scrollY * 0.06}px)` }}
      />
      <div 
        className="absolute bottom-1/4 right-1/2 w-2 h-2 bg-pink-400 rounded-full animate-bounce delay-500"
        style={{ transform: `translateY(${scrollY * 0.03}px)` }}
      />
    </div>
  )
}
