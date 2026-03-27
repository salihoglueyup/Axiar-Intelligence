import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe, 
  Users, 
  Activity, 
  Clock, 
  BarChart3, 
  TrendingUp, 
  Smartphone, 
  MapPin, 
  CheckCircle,
  Languages,
  Zap
} from 'lucide-react'
import Card from '@/components/ui/Card'

const GlobalStatusWidget = () => {
  const [globalData, setGlobalData] = useState({
    activeRegions: 47,
    totalUsers: 15420,
    uptime: 99.97,
    supportedLanguages: 12,
    avgResponseTime: 145,
    dataCenters: 8
  })

  const [animatedStats, setAnimatedStats] = useState({
    activeRegions: 0,
    totalUsers: 0,
    supportedLanguages: 0,
    dataCenters: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => ({
        activeRegions: Math.min(prev.activeRegions + Math.random() * 2, globalData.activeRegions),
        totalUsers: Math.min(prev.totalUsers + Math.random() * 100, globalData.totalUsers),
        supportedLanguages: Math.min(prev.supportedLanguages + Math.random() * 0.5, globalData.supportedLanguages),
        dataCenters: Math.min(prev.dataCenters + Math.random() * 0.3, globalData.dataCenters)
      }))
    }, 70)

    return () => clearInterval(interval)
  }, [])

  const globalMetrics = [
    {
      title: 'Aktif Bölgeler',
      value: animatedStats.activeRegions.toLocaleString(),
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      change: '+3',
      trend: 'up'
    },
    {
      title: 'Toplam Kullanıcı',
      value: animatedStats.totalUsers.toLocaleString(),
      icon: Users,
      color: 'from-green-500 to-emerald-500',
      change: '+8.2%',
      trend: 'up'
    },
    {
      title: 'Desteklenen Diller',
      value: animatedStats.supportedLanguages.toLocaleString(),
      icon: Languages,
      color: 'from-purple-500 to-pink-500',
      change: '+2',
      trend: 'up'
    },
    {
      title: 'Veri Merkezleri',
      value: animatedStats.dataCenters.toLocaleString(),
      icon: BarChart3,
      color: 'from-yellow-500 to-orange-500',
      change: '+1',
      trend: 'up'
    }
  ]

  const regions = [
    { name: 'Europe', flag: '🇪', users: 4567, status: 'active' },
    { name: 'North America', flag: '🇺🇸', users: 3890, status: 'active' },
    { name: 'Asia Pacific', flag: '🇯🇵', users: 3234, status: 'active' },
    { name: 'Latin America', flag: '🇧🇷', users: 1890, status: 'active' },
    { name: 'Middle East', flag: '🇸🇦', users: 1234, status: 'active' },
    { name: 'Africa', flag: '🇿🇦', users: 890, status: 'active' }
  ]

  return (
    <section className="py-8 bg-gray-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6"
        >
          <h3 className="text-xl font-bold text-white mb-2">
            Küresel Durum
          </h3>
          <p className="text-gray-400">
            Dünya çapında dağıtık altyapı ve performans metrikleri
          </p>
        </motion.div>

        {/* Global Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {globalMetrics.map((metric, index) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card glass hover className="h-full">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-gradient-to-r ${metric.color}`}>
                      <metric.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-gray-300">{metric.title}</h4>
                      <div className="text-lg font-bold text-white">{metric.value}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {metric.trend === 'up' && (
                      <div className="flex items-center text-green-400 text-sm">
                        <TrendingUp className="w-3 h-3" />
                        <span>{metric.change}</span>
                      </div>
                    )}
                    {metric.trend === 'stable' && (
                      <div className="flex items-center text-yellow-400 text-sm">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                        <span>{metric.change}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Indicator */}
                <div className="mt-3">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ 
                        width: metric.title === 'Aktif Bölgeler' ? `${(animatedStats.activeRegions / globalData.activeRegions) * 100}%` :
                               metric.title === 'Toplam Kullanıcı' ? `${(animatedStats.totalUsers / globalData.totalUsers) * 100}%` :
                               metric.title === 'Desteklenen Diller' ? `${(animatedStats.supportedLanguages / globalData.supportedLanguages) * 100}%` :
                               `${(animatedStats.dataCenters / globalData.dataCenters) * 100}%`
                      }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${metric.color}`}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Regional Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card glass className="max-w-2xl mx-auto p-6">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">
              Bölgelere Göre Dağılım
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              {regions.map((region, index) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-2xl">{region.flag}</div>
                    <div className="text-sm font-medium text-gray-300">{region.name}</div>
                    <div className="text-xs text-gray-400">{region.users.toLocaleString()} kullanıcı</div>
                    <div className={`w-2 h-2 rounded-full ${
                      region.status === 'active' ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Sistem Uptime</div>
                  <div className="text-2xl font-bold text-green-400">{globalData.uptime}%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Ortalama Süre</div>
                  <div className="text-2xl font-bold text-cyan-400">{globalData.avgResponseTime}ms</div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <Globe className="w-5 h-5" />
                Küresel Ayarlar
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default GlobalStatusWidget
