import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Brain, 
  BarChart3, 
  Globe, 
  Zap, 
  TrendingUp, 
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  Server
} from 'lucide-react'
import Card from '@/components/ui/Card'

// Import all widget components
import SecurityStatusWidget from '../landing/SecurityStatusWidget'
import AIStatusWidget from '../landing/AIStatusWidget'
import AnalyticsStatusWidget from '../landing/AnalyticsStatusWidget'
import GlobalStatusWidget from '../landing/GlobalStatusWidget'
import IntegrationStatusWidget from '../landing/IntegrationStatusWidget'

const LandingDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const tabs = [
    { id: 'overview', label: 'Genel Bakış', icon: BarChart3 },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'ai', label: 'AI Platform', icon: Brain },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'global', label: 'Küresel', icon: Globe },
    { id: 'integrations', label: 'Entegrasyonlar', icon: Zap }
  ]

  return (
    <section className="py-8 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Platform Dashboard
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Tüm platform özelliklerini tek bir arayüzden yönetin
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <Card glass className="p-6">
                <h3 className="text-xl font-bold text-white mb-4">Platform Durumu</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400">99.97%</div>
                    <div className="text-sm text-gray-400">Sistem Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400">15,420</div>
                    <div className="text-sm text-gray-400">Aktif Kullanıcı</div>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === 'security' && <SecurityStatusWidget />}
          {activeTab === 'ai' && <AIStatusWidget />}
          {activeTab === 'analytics' && <AnalyticsStatusWidget />}
          {activeTab === 'global' && <GlobalStatusWidget />}
          {activeTab === 'integrations' && <IntegrationStatusWidget />}
        </motion.div>
      </div>
    </section>
  )
}

export default LandingDashboard
