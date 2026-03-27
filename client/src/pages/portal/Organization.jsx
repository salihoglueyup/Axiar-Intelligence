import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Building2, Users, Settings, BarChart3, CreditCard, Shield, Globe, Bell } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import OrganizationSelector from '@/components/Organization/OrganizationSelector'
import OrganizationDashboard from '@/components/Organization/OrganizationDashboard'
import TeamManagement from '@/components/Organization/TeamManagement'
import { useOrganization, usePermissions } from '@/hooks/useOrganization'

const Organization = () => {
  const [activeTab, setActiveTab] = useState('dashboard')
  const { organization } = useOrganization()
  const { can } = usePermissions()

  const tabs = [
    {
      id: 'dashboard',
      label: 'Genel Bakış',
      icon: <BarChart3 className="w-4 h-4" />,
      permission: 'analytics'
    },
    {
      id: 'team',
      label: 'Ekip Yönetimi',
      icon: <Users className="w-4 h-4" />,
      permission: 'team'
    },
    {
      id: 'settings',
      label: 'Organizasyon Ayarları',
      icon: <Settings className="w-4 h-4" />,
      permission: 'organizations'
    },
    {
      id: 'billing',
      label: 'Faturalandırma',
      icon: <CreditCard className="w-4 h-4" />,
      permission: 'billing'
    },
    {
      id: 'security',
      label: 'Güvenlik',
      icon: <Shield className="w-4 h-4" />,
      permission: 'security'
    },
    {
      id: 'integrations',
      label: 'Entegrasyonlar',
      icon: <Globe className="w-4 h-4" />,
      permission: 'integrations'
    },
    {
      id: 'notifications',
      label: 'Bildirimler',
      icon: <Bell className="w-4 h-4" />,
      permission: 'notifications'
    }
  ]

  const visibleTabs = tabs.filter(tab => 
    !tab.permission || can(tab.permission, 'read')
  )

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <OrganizationDashboard />
      case 'team':
        return <TeamManagement />
      case 'settings':
        return <OrganizationSettings />
      case 'billing':
        return <BillingManagement />
      case 'security':
        return <SecuritySettings />
      case 'integrations':
        return <Integrations />
      case 'notifications':
        return <NotificationSettings />
      default:
        return <OrganizationDashboard />
    }
  }

  if (!organization) {
    return (
      <div className="min-h-screen bg-gray-900 p-6">
        <Card className="max-w-2xl mx-auto p-8">
          <div className="text-center">
            <Building2 className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Organizasyon Seçin</h2>
            <p className="text-gray-400 mb-6">
              Devam etmek için bir organizasyon seçin veya yeni bir organizasyon oluşturun.
            </p>
            <OrganizationSelector />
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Building2 className="w-6 h-6 text-cyan-400" />
              <h1 className="text-xl font-semibold text-white">Organizasyon Yönetimi</h1>
            </div>
            <OrganizationSelector />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 border-b border-gray-700">
            {visibleTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-cyan-500 text-cyan-400'
                    : 'border-transparent text-gray-400 hover:text-white'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  )
}

// Placeholder components for other tabs
const OrganizationSettings = () => (
  <Card glass className="p-6">
    <h2 className="text-xl font-semibold text-white mb-4">Organizasyon Ayarları</h2>
    <p className="text-gray-400">Organizasyon ayarları yakında eklenecek.</p>
  </Card>
)

const BillingManagement = () => (
  <Card glass className="p-6">
    <h2 className="text-xl font-semibold text-white mb-4">Faturalandırma</h2>
    <p className="text-gray-400">Faturalandırma yönetimi yakında eklenecek.</p>
  </Card>
)

const SecuritySettings = () => (
  <Card glass className="p-6">
    <h2 className="text-xl font-semibold text-white mb-4">Güvenlik Ayarları</h2>
    <p className="text-gray-400">Güvenlik ayarları yakında eklenecek.</p>
  </Card>
)

const Integrations = () => (
  <Card glass className="p-6">
    <h2 className="text-xl font-semibold text-white mb-4">Entegrasyonlar</h2>
    <p className="text-gray-400">Entegrasyon yönetimi yakında eklenecek.</p>
  </Card>
)

const NotificationSettings = () => (
  <Card glass className="p-6">
    <h2 className="text-xl font-semibold text-white mb-4">Bildirim Ayarları</h2>
    <p className="text-gray-400">Bildirim ayarları yakında eklenecek.</p>
  </Card>
)

export default Organization
