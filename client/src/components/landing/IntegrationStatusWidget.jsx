import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Link, 
  Activity, 
  BarChart3, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  Globe,
  Package,
  Settings,
  RefreshCw,
  AlertTriangle
} from 'lucide-react'
import Card from '@/components/ui/Card'

const IntegrationStatusWidget = () => {
  const [integrationData, setIntegrationData] = useState({
    activeIntegrations: 16,
    totalApiCalls: 245670,
    avgResponseTime: 245,
    successRate: 99.8,
    lastSync: '5 dakika önce',
    errorRate: 0.2
  })

  const [animatedStats, setAnimatedStats] = useState({
    activeIntegrations: 0,
    totalApiCalls: 0,
    successRate: 0
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedStats(prev => {
        const next = {
          activeIntegrations: Math.min(prev.activeIntegrations + 0.3, integrationData.activeIntegrations),
          totalApiCalls: Math.min(prev.totalApiCalls + 4500, integrationData.totalApiCalls),
          successRate: Math.min(prev.successRate + 1.2, integrationData.successRate)
        };

        if (
          next.activeIntegrations >= integrationData.activeIntegrations &&
          next.totalApiCalls >= integrationData.totalApiCalls &&
          next.successRate >= integrationData.successRate
        ) {
          clearInterval(interval);
        }

        return next;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [integrationData]);

  const integrations = [
    {
      name: 'Slack',
      icon: '💬',
      status: 'active',
      calls: 45670,
      lastCall: '2 dk önce'
    },
    {
      name: 'GitHub',
      icon: '🐙',
      status: 'active',
      calls: 34500,
      lastCall: '5 dk önce'
    },
    {
      name: 'Google Cloud',
      icon: '☁️',
      status: 'active',
      calls: 28900,
      lastCall: '1 dk önce'
    },
    {
      name: 'AWS',
      icon: '🔶',
      status: 'active',
      calls: 56780,
      lastCall: '3 dk önce'
    },
    {
      name: 'Microsoft Azure',
      icon: '☁️',
      status: 'warning',
      calls: 23450,
      lastCall: '15 dk önce'
    },
    {
      name: 'Salesforce',
      icon: '☁️',
      status: 'active',
      calls: 18900,
      lastCall: '8 dk önce'
    }
  ]

  const integrationMetrics = [
    {
      title: 'Aktif Entegrasyonlar',
      value: Math.floor(animatedStats.activeIntegrations).toLocaleString(),
      percentage: (animatedStats.activeIntegrations / integrationData.activeIntegrations) * 100,
      icon: Zap,
      color: 'from-cyan-500 to-blue-500',
      change: '+3',
      trend: 'up'
    },
    {
      title: 'Bugünkü API Çağrı',
      value: Math.floor(animatedStats.totalApiCalls).toLocaleString(),
      percentage: (animatedStats.totalApiCalls / integrationData.totalApiCalls) * 100,
      icon: Activity,
      color: 'from-green-500 to-emerald-500',
      change: '+12.5%',
      trend: 'up'
    },
    {
      title: 'Başarı Oranı',
      value: `${animatedStats.successRate.toFixed(1)}%`,
      percentage: animatedStats.successRate,
      icon: CheckCircle,
      color: 'from-purple-500 to-pink-500',
      change: '+0.2%',
      trend: 'up'
    },
    {
      title: 'Ortalama Süre',
      value: `${integrationData.avgResponseTime}ms`,
      percentage: 100,
      icon: Clock,
      color: 'from-yellow-500 to-orange-500',
      change: '-8%',
      trend: 'down'
    }
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
            Entegrasyon Durumu
          </h3>
          <p className="text-gray-400">
            API entegrasyonları ve sistem bağlantı durumu
          </p>
        </motion.div>

        {/* Integration Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {integrationMetrics.map((metric, index) => (
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
                    {metric.trend === 'down' && (
                      <div className="flex items-center text-red-400 text-sm">
                        <AlertTriangle className="w-3 h-3" />
                        <span>{metric.change}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Progress Bar - Simplified logic */}
                <div className="mt-3">
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: '0%' }}
                      animate={{ width: `${metric.percentage}%` }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                      className={`h-full bg-gradient-to-r ${metric.color}`}
                    />
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Active Integrations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card glass className="max-w-2xl mx-auto p-6">
            <h4 className="text-lg font-semibold text-white mb-4 text-center">
              Aktif Entegrasyonlar
            </h4>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex flex-col items-center space-y-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="text-2xl mb-2">{integration.icon}</div>
                    <div className="text-sm font-medium text-gray-300">{integration.name}</div>
                    <div className="text-xs text-gray-400 mb-2">{integration.calls.toLocaleString()} çağrı</div>
                    <div className={`w-2 h-2 rounded-full ${
                      integration.status === 'active' ? 'bg-green-400' : 
                      integration.status === 'warning' ? 'bg-yellow-400' : 'bg-gray-400'
                    }`} />
                    <div className="text-xs text-gray-400">{integration.lastCall}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-sm text-gray-400 mb-1">Son Senkronizasyon</div>
                  <div className="text-lg font-semibold text-cyan-400">{integrationData.lastSync}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-400 mb-1">Hata Oranı</div>
                  <div className="text-lg font-semibold text-red-400">{integrationData.errorRate}%</div>
                </div>
              </div>
            </div>

            <div className="mt-4 text-center">
              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center space-x-2">
                <Settings className="w-5 h-5" />
                Entegrasyon Yönetimi
              </button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default IntegrationStatusWidget
