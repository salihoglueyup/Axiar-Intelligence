import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  AlertTriangle, 
  Bug, 
  Eye, 
  Clock, 
  CheckCircle, 
  Zap, 
  Activity, 
  TrendingUp, 
  Filter, 
  Search, 
  RefreshCw, 
  Plus, 
  BarChart3, 
  ShieldCheck, 
  Lock, 
  Key, 
  Fingerprint, 
  Terminal, 
  Cpu, 
  FileCheck,
  Building,
  Network,
  ArrowUpRight,
  Database,
  Server,
  Target
} from 'lucide-react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { cn } from '@/utils/cn'
import { useSecurity, useSecurityPolicies, useSecurityThreats, useSecurityAnalytics, useSecurityAlerts, useSecurityCompliance } from '@/hooks/useSecurity'

const Security = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { policies, threats, analytics, alerts, complianceStatus, riskAssessment, isLoading } = useSecurity()

  const tabs = [
    { id: 'overview', label: 'GENEL BAKIŞ', icon: <Activity className="w-4 h-4" /> },
    { id: 'policies', label: 'POLİTİKALAR', icon: <FileCheck className="w-4 h-4" /> },
    { id: 'threats', label: 'TEHDİT RADARI', icon: <Target className="w-4 h-4" /> },
    { id: 'alerts', label: 'KRİTİK UYARILAR', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'compliance', label: 'UYUMLULUK', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'risk', label: 'RİSK ANALİZİ', icon: <Fingerprint className="w-4 h-4" /> }
  ]

  const getQuickStats = () => [
    { label: 'AKTİF NODLAR', value: '1,542', icon: <Server className="w-5 h-5 text-[var(--color-neon)]" />, color: 'from-[var(--color-neon)]/20' },
    { label: 'TEHDİT SEVİYESİ', value: 'DÜŞÜK', icon: <Shield className="w-5 h-5 text-green-400" />, color: 'from-green-500/20' },
    { label: 'KRİTİK OLAYLAR', value: alerts.length, icon: <Zap className="w-5 h-5 text-yellow-400" />, color: 'from-yellow-500/20' },
    { label: 'ŞİFRELEME GÜCÜ', value: '256-BIT', icon: <Lock className="w-5 h-5 text-[var(--color-neon-purple)]" />, color: 'from-[var(--color-neon-purple)]/20' }
  ]

  return (
    <div className="space-y-8 pb-20">
      {/* Dynamic Background */}
      <div className="fixed inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Page Header */}
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[var(--color-neon)]/10 rounded-lg border border-[var(--color-neon)]/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                <Shield className="w-6 h-6 text-[var(--color-neon)]" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">GÜVENLİK <span className="text-[var(--color-neon)]">MERKEZİ</span></h1>
            </div>
            <p className="text-[var(--color-text-muted)] font-bold uppercase tracking-[0.2em] text-xs flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              SİSTEM KORUMASI AKTİF &middot; GERÇEK ZAMANLI İZLEME
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" className="bg-white/5 border-white/10" icon={RefreshCw}>
              SENKRONİZE ET
            </Button>
            <Button onClick={() => setShowCreateModal(true)} icon={Plus} className="shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              YENİ PROTOKOL
            </Button>
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getQuickStats().map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card glass neon hover className="group">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.label}</div>
                  <div className="text-2xl font-black text-white group-hover:text-[var(--color-neon)] transition-colors">{stat.value}</div>
                </div>
                <div className={cn("p-3 rounded-xl bg-gradient-to-br shadow-lg transition-transform group-hover:scale-110", stat.color)}>
                  {stat.icon}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-2 bg-black/20 p-1.5 rounded-2xl border border-white/5 w-fit">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "relative flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-300 group",
                isActive ? "text-white" : "text-gray-500 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div 
                  layoutId="active-security-tab"
                  className="absolute inset-0 bg-[var(--color-neon)]/10 border border-[var(--color-neon)]/20 rounded-xl shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]"
                />
              )}
              <span className={cn("relative z-10 transition-transform duration-300", isActive && "scale-110")}>{tab.icon}</span>
              <span className="relative z-10 text-[10px] font-black uppercase tracking-widest">{tab.label}</span>
            </button>
          )
        })}
      </div>

      {/* Content Viewport */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && <SecurityOverview getStatusColor={getStatusColor} />}
          {activeTab === 'policies' && <PolicyManager getStatusColor={getStatusColor} />}
          {activeTab === 'threats' && <ThreatDetection />}
          {activeTab === 'alerts' && <AlertManager getStatusColor={getStatusColor} />}
          {activeTab === 'compliance' && <ComplianceManager getStatusColor={getStatusColor} />}
          {activeTab === 'risk' && <RiskManager getStatusColor={getStatusColor} />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const getStatusColor = (status) => {
  const colors = {
    active: 'text-green-400 bg-green-400/10',
    open: 'text-red-400 bg-red-400/10',
    resolved: 'text-green-400 bg-green-400/10',
    investigating: 'text-blue-400 bg-blue-400/10',
    detected: 'text-yellow-400 bg-yellow-400/10',
    critical: 'text-red-500 bg-red-500/10',
    high: 'text-orange-400 bg-orange-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    low: 'text-green-400 bg-green-400/10'
  }
  return colors[status] || 'text-gray-400 bg-white/5'
}

// Security Overview Component
const SecurityOverview = ({ getStatusColor }) => {
  const { threats, alerts, complianceStatus } = useSecurity()
  const recentThreats = threats.slice(0, 4)
  const recentAlerts = alerts.slice(0, 4)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Threat Radar Feed */}
      <Card glass className="lg:col-span-2">
        <CardHeader className="border-b border-white/5 pb-6">
          <CardTitle className="flex items-center space-x-3">
            <Target className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="uppercase tracking-tighter font-black text-xl">CANLI TEHDİT RADARI</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-4">
            {recentThreats.map((threat) => (
              <div key={threat.id} className="flex items-center space-x-4 p-4 glass rounded-xl border-white/5 hover:border-red-500/20 transition-all group">
                <div className="w-10 h-10 rounded-lg bg-red-500/5 flex items-center justify-center border border-red-500/10">
                  <Bug className="w-5 h-5 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-white text-sm font-bold tracking-tight uppercase">{threat.title}</p>
                  <p className="text-gray-500 text-[9px] font-bold uppercase tracking-widest mt-1">
                    KAYNAK: {threat.source || 'BİLİNMİYOR'} &middot; {new Date(threat.created_at).toLocaleTimeString('tr-TR')}
                  </p>
                </div>
                <div className={cn("px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest", getStatusColor(threat.status))}>
                  {threat.status}
                </div>
                <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-red-500 transition-colors" />
              </div>
            ))}
            {recentThreats.length === 0 && <div className="text-center py-12 text-gray-600 font-bold uppercase tracking-widest text-xs">Aktif Tehdit Bulunmuyor</div>}
          </div>
        </CardContent>
      </Card>

      {/* Side Panels */}
      <div className="space-y-8">
        {/* Compliance Meter */}
        <Card glass neon className="border-cyan-500/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 flex items-center">
              <ShieldCheck className="w-4 h-4 mr-2 text-[var(--color-neon)]" />
              UYUMLULUK SKORU
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center py-4">
              <div className="relative w-32 h-32 flex items-center justify-center mb-4">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                  <motion.circle 
                    cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="6" fill="transparent" 
                    strokeDasharray="364.4"
                    initial={{ strokeDashoffset: 364.4 }}
                    animate={{ strokeDashoffset: 364.4 * (1 - (complianceStatus?.overall_score || 0) / 100) }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="text-[var(--color-neon)] drop-shadow-[0_0_8px_var(--color-neon)]" 
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-black text-white leading-none">{complianceStatus?.overall_score || 0}%</span>
                </div>
              </div>
              <p className="text-[10px] text-center text-gray-500 font-bold uppercase tracking-widest">
                ISO 27001 & SOC2 STANDARTLARI
              </p>
            </div>
          </CardContent>
        </Card>

        {/* System Health */}
        <Card glass>
          <CardHeader className="pb-4">
            <CardTitle className="text-sm font-black uppercase tracking-[0.2em] text-gray-400 flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              SİSTEM SAĞLIĞI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center text-[10px] font-black uppercase">
              <span className="text-gray-500">GECİKME</span>
              <span className="text-[var(--color-neon)]">12MS</span>
            </div>
            <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5">
              <div className="h-full w-[95%] bg-[var(--color-neon)] shadow-[0_0_10px_var(--color-neon)]" />
            </div>
            <div className="flex justify-between items-center text-[10px] font-black uppercase mt-2">
              <span className="text-gray-500">CPU YÜKÜ</span>
              <span className="text-purple-400">24%</span>
            </div>
            <div className="h-1.5 bg-gray-900 rounded-full overflow-hidden border border-white/5">
              <div className="h-full w-[24%] bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

// ... Placeholder components for other tabs to keep the file valid ...
const PolicyManager = ({ getStatusColor }) => <div className="text-gray-500 uppercase font-black tracking-widest p-20 text-center glass rounded-3xl border border-white/5">Politika Yönetim Modülü v4.0</div>
const AlertManager = ({ getStatusColor }) => <div className="text-gray-500 uppercase font-black tracking-widest p-20 text-center glass rounded-3xl border border-white/5">Uyarı Kontrol Terminali v4.0</div>
const ComplianceManager = ({ getStatusColor }) => <div className="text-gray-500 uppercase font-black tracking-widest p-20 text-center glass rounded-3xl border border-white/5">Uyumluluk Raporlama Sistemi v4.0</div>
const RiskManager = ({ getStatusColor }) => <div className="text-gray-500 uppercase font-black tracking-widest p-20 text-center glass rounded-3xl border border-white/5">Risk Değerlendirme Analizörü v4.0</div>

export default Security
