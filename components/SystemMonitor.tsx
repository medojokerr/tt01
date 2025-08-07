'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Cpu, HardDrive, Network, Activity, AlertTriangle, CheckCircle, FileText } from 'lucide-react'
import { useLanguage } from '@/hooks/useLanguage'

interface SystemMetric {
  name: string
  value: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
}

interface SystemLog {
  timestamp: string
  level: 'info' | 'warning' | 'error'
  message: string
}

export function SystemMonitor() {
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: 'CPU Usage', value: 35, unit: '%', status: 'normal' },
    { name: 'Memory Usage', value: 60, unit: '%', status: 'normal' },
    { name: 'Disk Usage', value: 85, unit: '%', status: 'warning' },
    { name: 'Network Latency', value: 25, unit: 'ms', status: 'normal' },
  ])
  const [logs, setLogs] = useState<SystemLog[]>([
    { timestamp: '2024-07-20 10:30:00', level: 'info', message: 'System started successfully.' },
    { timestamp: '2024-07-20 10:35:15', level: 'warning', message: 'High disk I/O detected.' },
    { timestamp: '2024-07-20 10:40:00', level: 'info', message: 'AI model update applied.' },
  ])
  const { language } = useLanguage()

  const t = (key: string) => {
    const translations = {
      en: {
        title: "System Monitoring",
        subtitle: "Real-time insights into system health and performance.",
        metrics: "System Metrics",
        logs: "Recent Logs",
        cpuUsage: "CPU Usage",
        memoryUsage: "Memory Usage",
        diskUsage: "Disk Usage",
        networkLatency: "Network Latency",
        timestamp: "Timestamp",
        level: "Level",
        message: "Message",
        normal: "Normal",
        warning: "Warning",
        critical: "Critical",
        info: "Info",
        error: "Error",
      },
      ar: {
        title: "مراقبة النظام",
        subtitle: "رؤى فورية حول صحة وأداء النظام.",
        metrics: "مقاييس النظام",
        logs: "السجلات الأخيرة",
        cpuUsage: "استخدام المعالج",
        memoryUsage: "استخدام الذاكرة",
        diskUsage: "استخدام القرص",
        networkLatency: "زمن استجابة الشبكة",
        timestamp: "التاريخ والوقت",
        level: "المستوى",
        message: "الرسالة",
        normal: "عادي",
        warning: "تحذير",
        critical: "حرج",
        info: "معلومات",
        error: "خطأ",
      },
    }
    return translations[language][key] || key
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prevMetrics) =>
        prevMetrics.map((metric) => {
          let newValue = metric.value + (Math.random() * 10 - 5) // +/- 5
          newValue = Math.max(0, Math.min(100, newValue)) // Keep between 0-100

          let newStatus: SystemMetric['status'] = 'normal'
          if (metric.name === 'CPU Usage' && newValue > 80) newStatus = 'critical'
          else if (metric.name === 'Memory Usage' && newValue > 70) newStatus = 'warning'
          else if (metric.name === 'Disk Usage' && newValue > 90) newStatus = 'critical'
          else if (metric.name === 'Disk Usage' && newValue > 80) newStatus = 'warning'
          else if (metric.name === 'Network Latency' && newValue > 50) newStatus = 'warning'

          return { ...metric, value: Math.round(newValue), status: newStatus }
        })
      )

      // Simulate new log entry
      const newLog: SystemLog = {
        timestamp: new Date().toISOString().slice(0, 19).replace('T', ' '),
        level: Math.random() > 0.8 ? 'error' : Math.random() > 0.6 ? 'warning' : 'info',
        message: Math.random() > 0.7 ? 'Database connection error.' : 'Successful API call.',
      }
      setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 9)]) // Keep last 10 logs
    }, 5000) // Update every 5 seconds

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: SystemMetric['status'] | SystemLog['level']) => {
    switch (status) {
      case 'normal':
      case 'info':
        return 'text-green-500'
      case 'warning':
        return 'text-yellow-500'
      case 'critical':
      case 'error':
        return 'text-red-500'
      default:
        return 'text-gray-500'
    }
  }

  const getProgressBarColor = (status: SystemMetric['status']) => {
    switch (status) {
      case 'normal':
        return 'bg-green-500'
      case 'warning':
        return 'bg-yellow-500'
      case 'critical':
        return 'bg-red-500'
      default:
        return 'bg-blue-500'
    }
  }

  const getIconForMetric = (name: string) => {
    switch (name) {
      case 'CPU Usage': return <Cpu className="h-5 w-5" />
      case 'Memory Usage': return <Activity className="h-5 w-5" />
      case 'Disk Usage': return <HardDrive className="h-5 w-5" />
      case 'Network Latency': return <Network className="h-5 w-5" />
      default: return null
    }
  }

  return (
    <div className="space-y-6">
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-6 w-6 text-blue-600" />
            {t("metrics")}
          </CardTitle>
          <p className="text-sm text-gray-500 dark:text-gray-400">{t("subtitle")}</p>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-medium">
                  {getIconForMetric(metric.name)} {t(metric.name.replace(' ', '').toLowerCase())}
                </div>
                <span className={`text-sm font-semibold ${getStatusColor(metric.status)}`}>
                  {metric.value}{metric.unit} ({t(metric.status)})
                </span>
              </div>
              <Progress value={metric.value} className={`w-full ${getProgressBarColor(metric.status)}`} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-6 w-6 text-purple-600" />
            {t("logs")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t("timestamp")}</TableHead>
                <TableHead>{t("level")}</TableHead>
                <TableHead>{t("message")}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {logs.map((log, index) => (
                <TableRow key={index}>
                  <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                  <TableCell>
                    <span className={`font-medium ${getStatusColor(log.level)}`}>
                      {t(log.level)}
                    </span>
                  </TableCell>
                  <TableCell>{log.message}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
