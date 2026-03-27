import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Activity, 
  CheckCircle, 
  TrendingUp, 
  Cpu, 
  Settings
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const AIStatusWidget = () => {
  const [aiData] = useState({
    activeModels: 12,
    trainingModels: 3,
    accuracy: 94.7,
    processingSpeed: 1.2,
    requestsToday: 45670,
    uptime: 99.8
  })

  const [animatedStats, setAnimatedStats] = useState({
    activeModels: 0,
    requestsToday: 0,
    accuracy: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => {
        const next = {
          activeModels: Math.min(prev.activeModels + 0.5, aiData.activeModels),
          requestsToday: Math.min(prev.requestsToday + 1200, aiData.requestsToday),
          accuracy: Math.min(prev.accuracy + 2.5, aiData.accuracy)
        }

        if (
          next.activeModels >= aiData.activeModels &&
          next.requestsToday >= aiData.requestsToday &&
          next.accuracy >= aiData.accuracy
        ) {
          clearInterval(interval)
        }

        return next
      })
    }, 50)

    return () => clearInterval(interval)
  }, [aiData])

  const aiMetrics = [
    {
      title: 'Aktif Modeller',
      value: Math.floor(animatedStats.activeModels).toLocaleString(),
      icon: Brain,
      color: 'from-[var(--color-neon-purple)] to-[var(--color-neon)]',
      change: '+2',
      trend: 'up'
    },
    {
      title: 'Bugünkü İstek',
      value: Math.floor(animatedStats.requestsToday).toLocaleString(),
      icon: Activity,
      color: 'from-[var(--color-neon)] to-blue-500',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Doğruluk',
      value: `${animatedStats.accuracy.toFixed(1)}%`,
      icon: CheckCircle,
      color: 'from-green-400 to-[var(--color-neon)]',
      change: '+0.3%',
      trend: 'up'
    },
    {
      title: 'İşlem Hızı',
      value: `${aiData.processingSpeed}M req/s`,
      icon: Cpu,
      color: 'from-yellow-400 to-orange-400',
      change: 'Stabil',
      trend: 'stable'
    }
  ]

  return (
    <section className="py-12 bg-[var(--color-bg-card)]/30 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
            AI Platform Durumu
          </h3>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto">
            Geleceği bugünden tahmin eden yapay zeka modüllerimizin anlık performans metrikleri.
          </p>
        </motion.div>

        {/* AI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {aiMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card glass hover neon className="h-full border-white/10 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg group-hover:scale-110 transition-transform`}>
                      <metric.icon className="w-5 h-5 text-gray-900" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">{metric.title}</h4>
                      <div className="text-xl font-black text-white mt-1">{metric.value}</div>
                    </div>
                  </div>
                </div>

                {/* Status Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-[10px] font-bold text-gray-500 uppercase mb-2">
                    <span>Performans</span>
                    <span className="text-[var(--color-neon)]">{metric.change}</span>
                  </div>
                  <div className="h-1.5 bg-gray-900/50 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                      initial={{ width: '0%' }}
                      whileInView={{ width: '100%' }}
                      transition={{ duration: 1.5, ease: 'easeOut', delay: index * 0.2 }}
                      className={`h-full bg-gradient-to-r ${metric.color}`}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* AI Status Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Card glass className="w-full max-w-xl border-[var(--color-neon)]/20 shadow-[0_0_30px_rgba(0,240,255,0.05)]">
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Sistem Uptime</div>
                <div className="text-2xl font-black text-[var(--color-neon)]">{aiData.uptime}%</div>
              </div>
              <div className="border-x border-white/5">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Eğitimdeki</div>
                <div className="text-2xl font-black text-[var(--color-neon-purple)]">{aiData.trainingModels}</div>
              </div>
              <div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Geçikme</div>
                <div className="text-2xl font-black text-white">12ms</div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Button 
                variant="primary" 
                className="w-full py-5 text-sm uppercase tracking-widest"
                icon={Settings}
              >
                AI Terminali'ne Bağlan
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default AIStatusWidget
