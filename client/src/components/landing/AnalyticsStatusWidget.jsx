import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  Clock, 
  Zap,
  Eye, 
  ArrowUp,
  ArrowDown,
  Activity,
  Database,
  Globe
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const AnalyticsStatusWidget = () => {
  const [analyticsData] = useState({
    totalViews: 124567,
    uniqueVisitors: 45890,
    avgSessionDuration: 245,
    bounceRate: 23.4,
    conversionRate: 3.2,
    dataProcessed: 8.7,
    activeReports: 12
  })

  const [animatedStats, setAnimatedStats] = useState({
    totalViews: 0,
    uniqueVisitors: 0,
    avgSessionDuration: 0,
    conversionRate: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => {
        const next = {
          totalViews: Math.min(prev.totalViews + 2000, analyticsData.totalViews),
          uniqueVisitors: Math.min(prev.uniqueVisitors + 800, analyticsData.uniqueVisitors),
          avgSessionDuration: Math.min(prev.avgSessionDuration + 5, analyticsData.avgSessionDuration),
          conversionRate: Math.min(prev.conversionRate + 0.1, analyticsData.conversionRate)
        };

        if (
          next.totalViews >= analyticsData.totalViews &&
          next.uniqueVisitors >= analyticsData.uniqueVisitors &&
          next.avgSessionDuration >= analyticsData.avgSessionDuration &&
          next.conversionRate >= analyticsData.conversionRate
        ) {
          clearInterval(interval);
        }

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [analyticsData]);

  const analyticsMetrics = [
    {
      title: 'Toplam İzleme',
      value: Math.floor(animatedStats.totalViews).toLocaleString(),
      icon: Eye,
      color: 'from-[var(--color-neon)] to-blue-600',
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Aktif Kullanıcı',
      value: Math.floor(animatedStats.uniqueVisitors).toLocaleString(),
      icon: Users,
      color: 'from-[var(--color-neon-purple)] to-pink-600',
      change: '+5.3%',
      trend: 'up'
    },
    {
      title: 'Ort. Reaksiyon',
      value: `${Math.floor(animatedStats.avgSessionDuration)}ms`,
      icon: Clock,
      color: 'from-green-400 to-[var(--color-neon)]',
      change: '-2.1%',
      trend: 'down'
    },
    {
      title: 'Veri Akışı',
      value: `${analyticsData.dataProcessed} TB`,
      icon: Database,
      color: 'from-yellow-400 to-orange-500',
      change: '+0.4%',
      trend: 'up'
    }
  ]

  return (
    <section className="py-16 bg-[var(--color-bg-card)]/20 border-y border-white/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] -ml-48 -mb-48" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="inline-block mb-4">
            <span className="text-[var(--color-neon)] text-[10px] font-black tracking-[0.3em] uppercase bg-[var(--color-neon)]/5 px-4 py-1 rounded-full border border-[var(--color-neon)]/20">
              Gerçek Zamanlı Analitik Motoru
            </span>
          </motion.div>
          <h3 className="text-3xl font-black text-white mb-3 tracking-tighter uppercase">
            VERİ <span className="gradient-text">İSTİHBARATI</span>
          </h3>
          <p className="text-[var(--color-text-muted)] max-w-xl mx-auto font-bold uppercase tracking-widest text-xs">
            Yapay zeka katmanlarımızdan süzülen ham verinin stratejik analizi.
          </p>
        </motion.div>

        {/* Analytics Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {analyticsMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card glass hover neon className="h-full border-white/5 group">
                <div className="flex items-center justify-between mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.color} shadow-lg group-hover:rotate-6 transition-transform`}>
                    <metric.icon className="w-5 h-5 text-gray-950" />
                  </div>
                  <div className={cn(
                    "flex items-center px-2 py-1 rounded text-[10px] font-black uppercase tracking-widest",
                    metric.trend === 'up' ? "text-green-400 bg-green-500/10" : "text-red-400 bg-red-500/10"
                  )}>
                    {metric.trend === 'up' ? <ArrowUp className="w-3 h-3 mr-1" /> : <ArrowDown className="w-3 h-3 mr-1" />}
                    {metric.change}
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{metric.title}</h4>
                  <div className="text-2xl font-black text-white group-hover:text-[var(--color-neon)] transition-colors">{metric.value}</div>
                </div>

                {/* Animated Data Spires */}
                <div className="mt-6 flex items-end justify-between space-x-1 h-16 bg-black/20 rounded-lg p-2 border border-white/5">
                  {Array.from({ length: 20 }, (_, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: '10%' }}
                      animate={{ height: [`${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.05 }}
                      className={cn(
                        "flex-1 rounded-t-[1px]",
                        metric.trend === 'up' ? "bg-[var(--color-neon)]/40" : "bg-purple-500/40"
                      )}
                    />
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Big Analytics Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex justify-center"
        >
          <Card glass className="w-full max-w-2xl border-white/5 relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-neon)]/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full border-4 border-white/5 flex items-center justify-center">
                    <Globe className="w-10 h-10 text-[var(--color-neon)] animate-[spin_10s_linear_infinite]" />
                  </div>
                  <div className="absolute inset-0 rounded-full border-t-4 border-[var(--color-neon)] animate-spin" />
                </div>
                <div>
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1">Küresel Veri Dağıtımı</div>
                  <div className="text-2xl font-black text-white">ACTIVE NODE: <span className="text-[var(--color-neon)]">842</span></div>
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end space-y-4 w-full md:w-auto">
                <div className="flex space-x-8 text-center md:text-right">
                  <div>
                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">İşleme Hızı</div>
                    <div className="text-lg font-black text-white">4.2GB/s</div>
                  </div>
                  <div>
                    <div className="text-[9px] font-bold text-gray-500 uppercase tracking-widest mb-1">Rapor Sayısı</div>
                    <div className="text-lg font-black text-green-400">{analyticsData.activeReports}</div>
                  </div>
                </div>
                <Button 
                  className="w-full md:w-auto px-8 py-4 rounded-xl text-[10px] font-black uppercase tracking-[0.2em]"
                  icon={Activity}
                >
                  DERİN ANALİZ PANELİNİ AÇ
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default AnalyticsStatusWidget
