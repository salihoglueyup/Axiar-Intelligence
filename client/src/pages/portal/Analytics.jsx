import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, 
  FileText, 
  Database, 
  Brain, 
  Plus, 
  RefreshCw, 
  Activity, 
  Layers,
  PieChart,
  LineChart,
  Target,
  Zap,
  Globe,
  Network,
  Cpu,
  Table,
  Search,
  Filter,
  Download,
  Share2,
  TrendingUp,
  Box
} from 'lucide-react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import DashboardBuilder from '@/components/Analytics/DashboardBuilder'
import ReportBuilder from '@/components/Analytics/ReportBuilder'
import PredictiveAnalytics from '@/components/Analytics/PredictiveAnalytics'
import { cn } from '@/utils/cn'
import { useAnalytics } from '@/hooks/useAnalytics'

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('dashboards')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { dashboards, reports, connections, insights, isLoading } = useAnalytics()

  const tabs = [
    { id: 'dashboards', label: 'DASHBOARDS', icon: <Box className="w-4 h-4" /> },
    { id: 'reports', label: 'RAPORLAR', icon: <FileText className="w-4 h-4" /> },
    { id: 'connections', label: 'VERİ KAYNAKLARI', icon: <Database className="w-4 h-4" /> },
    { id: 'predictive', label: 'AI ÖNGÖRÜ', icon: <Brain className="w-4 h-4" /> },
    { id: 'analytics', label: 'METRİKLER', icon: <Activity className="w-4 h-4" /> }
  ]

  const getQuickStats = () => [
    { label: 'VERİ HAVUZU', value: '8.4 TB', icon: <Database className="w-5 h-5 text-[var(--color-neon)]" />, color: 'from-[var(--color-neon)]/20' },
    { label: 'AKTİF DASHBOARD', value: dashboards.length, icon: <Layers className="w-5 h-5 text-[var(--color-neon-purple)]" />, color: 'from-[var(--color-neon-purple)]/20' },
    { label: 'TAMAMLANAN RAPOR', value: '142', icon: <FileText className="w-5 h-5 text-green-400" />, color: 'from-green-500/20' },
    { label: 'SİSTEM VERİMİ', value: '99.4%', icon: <TrendingUp className="w-5 h-5 text-yellow-400" />, color: 'from-yellow-500/20' }
  ]

  return (
    <div className="space-y-8 pb-20 relative">
      <div className="fixed inset-0 cyber-grid opacity-5 pointer-events-none" />

      {/* Page Header */}
      <div className="relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-[var(--color-neon)]/10 rounded-lg border border-[var(--color-neon)]/20 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                <BarChart3 className="w-6 h-6 text-[var(--color-neon)]" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">VERİ <span className="text-[var(--color-neon)]">İSTİHBARATI</span></h1>
            </div>
            <p className="text-[var(--color-text-muted)] font-bold uppercase tracking-[0.2em] text-xs flex items-center">
              <Network className="w-3 h-3 text-[var(--color-neon)] mr-2 animate-pulse" />
              ANALİTİK MOTORU VE BUSINESS INTELLIGENCE TERMİNALİ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" icon={RefreshCw} className="bg-white/5 border-white/10 text-nowrap">
              DATA SYNC
            </Button>
            <Button onClick={() => setShowCreateModal(true)} icon={Plus} className="shadow-[0_0_20px_rgba(0,240,255,0.2)] text-nowrap">
              YENİ ANALİZ BAŞLAT
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
            <Card glass neon hover className="group border-white/5">
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
                  layoutId="active-analytics-tab"
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
          {activeTab === 'dashboards' && <DashboardBuilder />}
          {activeTab === 'reports' && <ReportBuilder />}
          {activeTab === 'connections' && <DataPoolTerminal />}
          {activeTab === 'predictive' && <PredictiveAnalytics />}
          {activeTab === 'analytics' && <SystemMetrics />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const DataPoolTerminal = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[
        { name: 'PostgreSQL Core', type: 'Database', status: 'connected', load: '42%' },
        { name: 'AWS S3 Bucket', type: 'Storage', status: 'connected', load: '12%' },
        { name: 'Redis Cache', type: 'Memory', status: 'idle', load: '4%' }
      ].map((conn, i) => (
        <Card glass key={conn.name} neon={conn.status === 'connected'} className="p-6 border-white/5 group">
          <div className="flex items-start justify-between mb-6">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/5 group-hover:border-[var(--color-neon)]/30 transition-colors">
              <Database className={cn("w-8 h-8", conn.status === 'connected' ? "text-[var(--color-neon)]" : "text-gray-600")} />
            </div>
            <div className={cn(
              "px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest",
              conn.status === 'connected' ? "text-green-400 bg-green-400/10" : "text-gray-500 bg-white/5"
            )}>
              {conn.status}
            </div>
          </div>
          <h4 className="text-xl font-black text-white uppercase tracking-tight mb-1">{conn.name}</h4>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-6">{conn.type}</p>
          
          <div className="space-y-4">
            <div className="flex justify-between text-[9px] font-bold uppercase">
              <span className="text-gray-500">Node Load</span>
              <span className="text-white">{conn.load}</span>
            </div>
            <div className="h-1 bg-black/40 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-[var(--color-neon)] shadow-[0_0_10px_var(--color-neon)]" style={{ width: conn.load }} />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            <Button variant="secondary" className="w-full py-4 text-[10px] font-black uppercase tracking-widest">KONFİGÜRASYON</Button>
          </div>
        </Card>
      ))}
      <button className="h-full min-h-[300px] border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center space-y-4 hover:border-[var(--color-neon)]/30 hover:bg-[var(--color-neon)]/5 transition-all group">
        <div className="p-4 rounded-full bg-white/5 group-hover:scale-110 transition-transform">
          <Plus className="w-8 h-8 text-gray-600 group-hover:text-[var(--color-neon)]" />
        </div>
        <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em] group-hover:text-white">YENİ KAYNAK EKLE</span>
      </button>
    </div>
  )
}

const SystemMetrics = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <Card glass className="lg:col-span-2 min-h-[450px] relative overflow-hidden group">
      <div className="absolute inset-0 bg-[var(--color-neon)]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="uppercase tracking-tighter font-black text-xl text-nowrap">METRİK ANALİZ MATRİSİ</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center h-full space-y-6">
        <Activity className="w-16 h-16 text-gray-800 animate-pulse" />
        <p className="text-gray-600 font-black uppercase tracking-widest text-[10px] italic">Canlı Veri Akışı Bekleniyor...</p>
      </CardContent>
    </Card>
    <div className="space-y-8">
      <Card glass neon className="border-green-500/20">
        <CardHeader><CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500 italic">Global Data Health</CardTitle></CardHeader>
        <CardContent className="py-10 text-center">
          <div className="text-5xl font-black text-white mb-2">99.<span className="text-green-400">9</span>%</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Data Integrity Score</div>
        </CardContent>
      </Card>
      <Card glass>
        <CardHeader><CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500 italic">Processing Clusters</CardTitle></CardHeader>
        <CardContent className="space-y-4 pt-4">
          {[
            { label: 'Cluster-Alpha', val: 88, color: 'bg-[var(--color-neon)]' },
            { label: 'Cluster-Beta', val: 12, color: 'bg-[var(--color-neon-purple)]' },
            { label: 'Edge-Inference', val: 64, color: 'bg-green-500' }
          ].map(item => (
            <div key={item.label}>
              <div className="flex justify-between text-[9px] font-bold uppercase mb-1">
                <span className="text-gray-400">{item.label}</span>
                <span className="text-white">{item.val}%</span>
              </div>
              <div className="h-1 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <div className={cn("h-full", item.color)} style={{ width: `${item.val}%` }} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  </div>
)

export default Analytics
