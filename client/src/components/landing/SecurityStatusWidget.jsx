import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Eye, 
  Zap,
  Activity,
  Lock,
  Search
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const SecurityStatusWidget = () => {
  const [securityData] = useState({
    threatsBlocked: 89234,
    threatsDetected: 127,
    activeAlerts: 3,
    uptime: 99.97,
    lastScan: '2 dk önce',
    securityScore: 94.2,
    protectedAssets: 15420
  })

  const [animatedCount, setAnimatedCount] = useState({
    threatsBlocked: 0,
    threatsDetected: 0,
    activeAlerts: 0,
    protectedAssets: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedCount(prev => {
        const next = {
          threatsBlocked: Math.min(prev.threatsBlocked + 1500, securityData.threatsBlocked),
          threatsDetected: Math.min(prev.threatsDetected + 5, securityData.threatsDetected),
          activeAlerts: Math.min(prev.activeAlerts + 0.5, securityData.activeAlerts),
          protectedAssets: Math.min(prev.protectedAssets + 250, securityData.protectedAssets)
        };
        
        if (
          next.threatsBlocked >= securityData.threatsBlocked &&
          next.threatsDetected >= securityData.threatsDetected &&
          next.activeAlerts >= securityData.activeAlerts &&
          next.protectedAssets >= securityData.protectedAssets
        ) {
          clearInterval(interval);
        }
        
        return next;
      });
    }, 50)

    return () => clearInterval(interval)
  }, [securityData])

  const securityMetrics = [
    {
      title: 'Engellenen Tehditler',
      value: Math.floor(animatedCount.threatsBlocked).toLocaleString(),
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      change: '+2.3%',
      trend: 'up'
    },
    {
      title: 'Aktif Taramalar',
      value: Math.floor(animatedCount.threatsDetected).toLocaleString(),
      icon: Search,
      color: 'from-[var(--color-neon)] to-blue-500',
      change: 'Stabil',
      trend: 'stable'
    },
    {
      title: 'Kritik Uyarılar',
      value: Math.floor(animatedCount.activeAlerts).toLocaleString(),
      icon: AlertTriangle,
      color: 'from-yellow-400 to-orange-400',
      change: '0',
      trend: 'stable'
    },
    {
      title: 'Korunan Node Sayısı',
      value: Math.floor(animatedCount.protectedAssets).toLocaleString(),
      icon: Lock,
      color: 'from-green-400 to-[var(--color-neon)]',
      change: '+1.2%',
      trend: 'up'
    }
  ]

  return (
    <section className="py-16 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} className="inline-block mb-4">
            <span className="text-red-500 text-[10px] font-black tracking-[0.3em] uppercase bg-red-500/5 px-4 py-1 rounded-full border border-red-500/20 flex items-center">
              <Activity className="w-3 h-3 mr-2 animate-pulse" />
              SİSTEM GÜVENLİK MONİTÖRÜ
            </span>
          </motion.div>
          <h3 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">
            GÜVENLİK <span className="text-red-500">DURUMU</span>
          </h3>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto font-bold uppercase tracking-widest text-xs">
            Axiar Shield tarafından korunan küresel ağın anlık tehdit analizi.
          </p>
        </motion.div>

        {/* Security Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {securityMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card glass hover neon className="h-full border-white/5 group overflow-hidden">
                {/* Decorative scanning line */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-red-500/40 to-transparent animate-[scan_3s_linear_infinite]" />
                
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg group-hover:scale-110 transition-transform`}>
                    <metric.icon className="w-5 h-5 text-gray-950" />
                  </div>
                  <div className={cn(
                    "px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest bg-white/5",
                    metric.trend === 'up' ? "text-green-400" : "text-gray-400"
                  )}>
                    {metric.change}
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{metric.title}</h4>
                  <div className="text-2xl font-black text-white group-hover:text-red-500 transition-colors">{metric.value}</div>
                </div>

                {/* Animated Activity Bar */}
                <div className="mt-6 flex items-end justify-between space-x-1 h-12">
                  {Array.from({ length: 12 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: '20%' }}
                      animate={{ height: [`${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`, `${Math.random() * 60 + 20}%`] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                      className={cn(
                        "flex-1 rounded-t-sm border border-white/5",
                        index === 0 ? "bg-red-500/20 border-red-500/10" : "bg-[var(--color-neon)]/20 border-[var(--color-neon)]/10"
                      )}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Security Score Overview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Card glass className="w-full max-w-2xl border-red-500/20 shadow-[0_0_40px_rgba(239,68,68,0.05)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center space-x-2 text-[10px] font-black text-green-500 uppercase tracking-[0.2em]">
                <Zap className="w-3 h-3 fill-green-500" />
                <span>Active Protection</span>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 p-2">
              {/* Radial Score */}
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                  <motion.circle 
                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                    strokeDasharray="364.4"
                    initial={{ strokeDashoffset: 364.4 }}
                    whileInView={{ strokeDashoffset: 364.4 * (1 - securityData.securityScore / 100) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white leading-none">{securityData.securityScore.toFixed(0)}</span>
                  <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest mt-1">Score</span>
                </div>
              </div>

              <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 text-center md:text-left">
                <div className="border-r border-white/5">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Uptime</div>
                  <div className="text-xl font-black text-green-400">{securityData.uptime}%</div>
                </div>
                <div className="border-r border-white/5">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Last Scan</div>
                  <div className="text-xl font-black text-white">{securityData.lastScan}</div>
                </div>
                <div className="col-span-2 md:col-span-1">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Threat Level</div>
                  <div className="text-xl font-black text-yellow-500 tracking-tighter">NOMINAL</div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-white/5">
              <Button 
                variant="danger" 
                className="w-full py-5 text-xs font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                icon={Eye}
              >
                Security Center Terminali'ni Aç
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default SecurityStatusWidget
