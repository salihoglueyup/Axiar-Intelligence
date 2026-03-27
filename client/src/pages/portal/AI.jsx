import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  Play, 
  Pause, 
  Settings, 
  BarChart3, 
  Activity, 
  Zap, 
  Database, 
  Globe, 
  TrendingUp, 
  CheckCircle, 
  Plus, 
  RefreshCw, 
  Eye, 
  Edit, 
  Trash2, 
  Target, 
  Cpu, 
  Code,
  Network,
  Binary,
  Layers,
  Sparkles,
  Terminal,
  Unplug
} from 'lucide-react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import ModelManager from '@/components/AI/ModelManager'
import PredictionInterface from '@/components/AI/PredictionInterface'
import { cn } from '@/utils/cn'
import { useAI, useTrainingJobs } from '@/hooks/useAI'

const AI = () => {
  const [activeTab, setActiveTab] = useState('models')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { models, predictions, isLoading } = useAI()

  const tabs = [
    { id: 'models', label: 'MODELLER', icon: <Layers className="w-4 h-4" /> },
    { id: 'predictions', label: 'TAHMİN MERKEZİ', icon: <Zap className="w-4 h-4" /> },
    { id: 'training', label: 'EĞİTİM HATTI', icon: <Cpu className="w-4 h-4" /> },
    { id: 'analytics', label: 'AI ANALİTİK', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'playground', label: 'PLAYGROUND', icon: <Binary className="w-4 h-4" /> }
  ]

  const getQuickStats = () => [
    { label: 'AKTİF MODELLER', value: models.length, icon: <Brain className="w-5 h-5 text-[var(--color-neon)]" />, color: 'from-[var(--color-neon)]/20' },
    { label: 'TAHMİN GÜCÜ', value: '1.2M/s', icon: <Activity className="w-5 h-5 text-[var(--color-neon-purple)]" />, color: 'from-[var(--color-neon-purple)]/20' },
    { label: 'EĞİTİMDEKİLER', value: '3', icon: <Target className="w-5 h-5 text-yellow-400" />, color: 'from-yellow-500/20' },
    { label: 'DOĞRULUK', value: '98.4%', icon: <CheckCircle className="w-5 h-5 text-green-400" />, color: 'from-green-500/20' }
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
                <Brain className="w-6 h-6 text-[var(--color-neon)]" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase">AI <span className="text-[var(--color-neon)]">ENGINE</span></h1>
            </div>
            <p className="text-[var(--color-text-muted)] font-bold uppercase tracking-[0.2em] text-xs flex items-center">
              <Sparkles className="w-3 h-3 text-[var(--color-neon)] mr-2 animate-pulse" />
              NÖRAL AĞLAR VE MAKİNE ÖĞRENİMİ TERMİNALİ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" icon={RefreshCw} className="bg-white/5 border-white/10">
              MODÜLLERİ YENİLE
            </Button>
            <Button onClick={() => setShowCreateModal(true)} icon={Plus} className="shadow-[0_0_20px_rgba(0,240,255,0.2)]">
              YENİ MODEL EĞİT
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
                  layoutId="active-ai-tab"
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
          {activeTab === 'models' && <ModelManager />}
          {activeTab === 'predictions' && <PredictionInterface />}
          {activeTab === 'training' && <TrainingManager />}
          {activeTab === 'analytics' && <AIAnalytics />}
          {activeTab === 'playground' && <AIPlayground />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const TrainingManager = () => {
  const { trainingJobs } = useTrainingJobs()
  return (
    <div className="space-y-6">
      {trainingJobs.map((job) => (
        <Card glass key={job.id} className="p-6 border-white/5 relative overflow-hidden group">
          {job.status === 'running' && (
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-neon)] to-transparent animate-[scan_3s_linear_infinite]" />
          )}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className={cn(
                "p-4 rounded-xl border",
                job.status === 'running' ? "bg-[var(--color-neon)]/10 border-[var(--color-neon)]/20 text-[var(--color-neon)] animate-pulse" : "bg-white/5 border-white/10 text-gray-500"
              )}>
                <Cpu className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight">{job.name}</h4>
                <div className="flex items-center space-x-3 mt-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>ID: {job.id.slice(0, 8)}</span>
                  <span>&middot;</span>
                  <span className={job.status === 'running' ? "text-[var(--color-neon)]" : ""}>{job.status}</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1 max-w-md">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Eğitim İlerlemesi</span>
                <span className="text-sm font-black text-white">{job.progress?.progress_percentage.toFixed(1)}%</span>
              </div>
              <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${job.progress?.progress_percentage}%` }}
                  className="h-full bg-gradient-to-r from-[var(--color-neon-purple)] to-[var(--color-neon)] shadow-[0_0_10px_var(--color-neon)]"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" className="bg-white/5 border-white/10">DETAYLAR</Button>
              {job.status === 'running' ? (
                <Button variant="danger" size="sm" icon={Pause}>DURDUR</Button>
              ) : (
                <Button variant="primary" size="sm" icon={Play}>YENİDEN BAŞLAT</Button>
              )}
            </div>
          </div>
        </Card>
      ))}
      {trainingJobs.length === 0 && (
        <div className="text-center py-20 glass rounded-3xl border border-white/5">
          <Unplug className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs">Aktif Eğitim Hattı Bulunmuyor</p>
        </div>
      )}
    </div>
  )
}

const AIAnalytics = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <Card glass className="lg:col-span-2 min-h-[400px]">
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="uppercase tracking-tighter font-black text-xl">PERFORMANS MATRİSİ</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full text-gray-600 font-black uppercase tracking-widest text-xs italic">
        Veri İşleme ve Analiz Modülü v4.0 (Yakında)
      </CardContent>
    </Card>
    <div className="space-y-8">
      <Card glass neon className="border-[var(--color-neon-purple)]/20">
        <CardHeader><CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500 italic">Global Inference</CardTitle></CardHeader>
        <CardContent className="py-10 text-center">
          <div className="text-5xl font-black text-white mb-2">1.2<span className="text-[var(--color-neon-purple)]">M</span></div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">Requests / Second</div>
        </CardContent>
      </Card>
      <Card glass>
        <CardHeader><CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500 italic">Hardware Load</CardTitle></CardHeader>
        <CardContent className="space-y-4 pt-4">
          {[
            { label: 'GPU Cluster A', val: 84, color: 'bg-[var(--color-neon)]' },
            { label: 'TPU Node 01', val: 32, color: 'bg-[var(--color-neon-purple)]' },
            { label: 'Neural Core', val: 12, color: 'bg-green-500' }
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

const AIPlayground = () => {
  const [input, setInput] = useState('')
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      <Card glass className="lg:col-span-1 border-white/5">
        <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-6">MODEL SEÇİMİ</h4>
        <div className="space-y-3">
          {['GTP-AXIAR v4', 'NEURAL-VISION X', 'STRAT-PREDICT 2'].map((m, i) => (
            <div key={m} className={cn(
              "p-4 rounded-xl border transition-all cursor-pointer group",
              i === 0 ? "bg-[var(--color-neon)]/10 border-[var(--color-neon)]/30" : "bg-white/5 border-white/5 hover:border-white/20"
            )}>
              <div className="font-black text-white text-xs uppercase tracking-tight">{m}</div>
              <div className="text-[9px] font-bold text-gray-500 mt-1 uppercase tracking-widest">Latency: {12 + i * 4}ms</div>
            </div>
          ))}
        </div>
      </Card>
      <Card glass className="lg:col-span-3 border-white/5 p-0 overflow-hidden flex flex-col min-h-[500px]">
        <div className="bg-white/5 p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Terminal className="w-4 h-4 text-[var(--color-neon)]" />
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Neural Terminal v1.0.4</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <div className="w-2 h-2 rounded-full bg-red-500/40" />
            <div className="w-2 h-2 rounded-full bg-yellow-500/40" />
            <div className="w-2 h-2 rounded-full bg-green-500/40" />
          </div>
        </div>
        <div className="flex-1 p-6 font-mono text-xs">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-full bg-transparent border-none focus:ring-0 text-[var(--color-neon)] placeholder:text-gray-800 resize-none p-0 leading-relaxed"
            placeholder=">> MODEL_INPUT_INITIATE: Write your query here..."
          />
        </div>
        <div className="p-4 border-t border-white/5 bg-black/20">
          <Button className="w-full py-4 text-xs font-black uppercase tracking-[0.2em]" icon={Zap}>ÇALIŞTIR</Button>
        </div>
      </Card>
    </div>
  )
}

export default AI
