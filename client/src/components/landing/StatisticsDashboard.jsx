import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  Shield, 
  Zap, 
  Clock, 
  Activity, 
  BarChart3, 
  Globe, 
  Server, 
  Database,
  ArrowUp,
  ArrowDown,
  Eye
} from 'lucide-react'
import Card from '@/components/ui/Card'

const StatisticsDashboard = () => {
  const [stats, setStats] = useState({
    projectsCompleted: 1247,
    threatsBlocked: 89234,
    uptime: 99.97,
    activeUsers: 15420,
    dataProcessed: 8.7,
    responseTime: 0.12
  })

  const [animatedStats, setAnimatedStats] = useState({
    projectsCompleted: 0,
    threatsBlocked: 0,
    activeUsers: 0,
    dataProcessed: 0,
    uptime: 0,
    responseTime: 2.0 // Start from higher value and go down
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => {
        const next = {
          projectsCompleted: Math.min(prev.projectsCompleted + 10, stats.projectsCompleted),
          threatsBlocked: Math.min(prev.threatsBlocked + 1200, stats.threatsBlocked),
          activeUsers: Math.min(prev.activeUsers + 200, stats.activeUsers),
          dataProcessed: Math.min(prev.dataProcessed + 0.1, stats.dataProcessed),
          uptime: Math.min(prev.uptime + 1.5, stats.uptime),
          responseTime: Math.max(prev.responseTime - 0.02, stats.responseTime)
        };

        if (
          next.projectsCompleted >= stats.projectsCompleted &&
          next.threatsBlocked >= stats.threatsBlocked &&
          next.activeUsers >= stats.activeUsers &&
          next.dataProcessed >= stats.dataProcessed &&
          next.uptime >= stats.uptime &&
          next.responseTime <= stats.responseTime
        ) {
          clearInterval(interval);
        }

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [stats]);

  const statCards = [
    {
      title: 'Tamamlanan Projeler',
      value: Math.floor(animatedStats.projectsCompleted),
      target: stats.projectsCompleted,
      icon: BarChart3,
      color: 'from-cyan-500 to-blue-500',
      unit: '',
      trend: 'up'
    },
    {
      title: 'Engellenen Tehditler',
      value: Math.floor(animatedStats.threatsBlocked),
      target: stats.threatsBlocked,
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      unit: '',
      trend: 'up'
    },
    {
      title: 'Aktif Kullanıcılar',
      value: Math.floor(animatedStats.activeUsers),
      target: stats.activeUsers,
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      unit: '',
      trend: 'up'
    },
    {
      title: 'Sistem Uptime',
      value: animatedStats.uptime.toFixed(2),
      target: 100,
      icon: Server,
      color: 'from-purple-500 to-pink-500',
      unit: '%',
      trend: 'stable'
    },
    {
      title: 'İşlenen Veri',
      value: animatedStats.dataProcessed.toFixed(1),
      target: stats.dataProcessed,
      icon: Database,
      color: 'from-yellow-500 to-orange-500',
      unit: 'TB',
      trend: 'up'
    },
    {
      title: 'Yanıt Süresi',
      value: animatedStats.responseTime.toFixed(2),
      target: 0.1,
      icon: Clock,
      color: 'from-indigo-500 to-blue-500',
      unit: 's',
      trend: 'down'
    }
  ]

  return (
    <section className="py-16 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Platform İstatistikleri
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Gerçek zamanlı verilerle platform performansını takip edin
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {statCards.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card glass neon hover className="h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${stat.color}`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">{stat.title}</h3>
                      <p className="text-sm text-gray-400">Canlı</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {stat.trend === 'up' && <ArrowUp className="w-4 h-4 text-green-400" />}
                    {stat.trend === 'down' && <ArrowDown className="w-4 h-4 text-red-400" />}
                    {stat.trend === 'stable' && <div className="w-4 h-4 bg-yellow-400 rounded-full" />}
                  </div>
                </div>

                {/* Main Value */}
                <div className="mb-4">
                  <div className="text-3xl font-bold text-white mb-1">
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {stat.value.toLocaleString()}{stat.unit}
                    </motion.span>
                  </div>
                  <div className="text-sm text-gray-400">
                    Hedef: {stat.target.toLocaleString()}{stat.unit}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: `${(stat.value / stat.target) * 100}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">
                    {((stat.value / stat.target) * 100).toFixed(1)}% hedefe ulaştı
                  </span>
                  <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>Detaylar</span>
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center"
        >
          <Card glass className="max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Platformu Keşfedin
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              Detaylı analytics ve raporlama özellikleriyle verimliliğinizi artırın
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-8 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                Analytics'e Git
              </button>
              <button className="glass border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 px-8 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2">
                <Activity className="w-5 h-5" />
                Canlı Demo
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default StatisticsDashboard
