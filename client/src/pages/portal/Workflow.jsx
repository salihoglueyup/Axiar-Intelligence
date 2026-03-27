import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  Play, 
  Pause, 
  CheckCircle, 
  Clock, 
  Users, 
  BarChart3, 
  Plus, 
  RefreshCw, 
  Activity, 
  Network,
  GitBranch,
  Workflow as WorkflowIcon,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Cpu,
  Terminal,
  Unplug,
  AlertCircle
} from 'lucide-react'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import WorkflowBuilder from '@/components/Workflow/WorkflowBuilder'
import TaskManager from '@/components/Workflow/TaskManager'
import { cn } from '@/utils/cn'
import { useWorkflow, useWorkflowExecutions } from '@/hooks/useWorkflow'

const Workflow = () => {
  const [activeTab, setActiveTab] = useState('workflows')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const { workflows, executions, tasks, approvals, isLoading } = useWorkflow()

  const tabs = [
    { id: 'workflows', label: 'WORKFLOWS', icon: <WorkflowIcon className="w-4 h-4" /> },
    { id: 'tasks', label: 'GÖREVLER', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'executions', label: 'PİPELİNE', icon: <Activity className="w-4 h-4" /> },
    { id: 'approvals', label: 'ONAYLAR', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'analytics', label: 'ANALİTİK', icon: <BarChart3 className="w-4 h-4" /> }
  ]

  const getQuickStats = () => [
    { label: 'AKTİF SÜREÇLER', value: workflows.filter(w => w.is_active).length, icon: <GitBranch className="w-5 h-5 text-[var(--color-neon)]" />, color: 'from-[var(--color-neon)]/20' },
    { label: 'BEKLEYEN GÖREV', value: tasks.filter(t => t.status === 'pending').length, icon: <Clock className="w-5 h-5 text-yellow-400" />, color: 'from-yellow-500/20' },
    { label: 'ÇALIŞAN İŞLEM', value: executions.filter(e => e.status === 'running').length, icon: <Play className="w-5 h-5 text-[var(--color-neon-purple)]" />, color: 'from-[var(--color-neon-purple)]/20' },
    { label: 'SİSTEM YÜKÜ', value: '14%', icon: <Cpu className="w-5 h-5 text-green-400" />, color: 'from-green-500/20' }
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
                <Network className="w-6 h-6 text-[var(--color-neon)]" />
              </div>
              <h1 className="text-4xl font-black text-white tracking-tighter uppercase text-nowrap">OTOMASYON <span className="text-[var(--color-neon)]">MERKEZİ</span></h1>
            </div>
            <p className="text-[var(--color-text-muted)] font-bold uppercase tracking-[0.2em] text-xs flex items-center">
              <Layers className="w-3 h-3 text-[var(--color-neon)] mr-2 animate-pulse" />
              SİSTEM DÜĞÜMLERİ VE İŞ AKIŞI YÖNETİMİ
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" icon={RefreshCw} className="bg-white/5 border-white/10 text-nowrap">
              AĞI TARA
            </Button>
            <Button onClick={() => setShowCreateModal(true)} icon={Plus} className="shadow-[0_0_20px_rgba(0,240,255,0.2)] text-nowrap">
              YENİ AKIŞ OLUŞTUR
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
                  layoutId="active-workflow-tab"
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
          {activeTab === 'workflows' && <WorkflowBuilder />}
          {activeTab === 'tasks' && <TaskManager />}
          {activeTab === 'executions' && <ExecutionPipeline />}
          {activeTab === 'approvals' && <ApprovalTerminal />}
          {activeTab === 'analytics' && <WorkflowAnalytics />}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

const ExecutionPipeline = () => {
  const { executions } = useWorkflow()
  return (
    <div className="space-y-6">
      {executions.map((execution) => (
        <Card glass key={execution.id} className="p-6 border-white/5 relative overflow-hidden group">
          {execution.status === 'running' && (
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-[var(--color-neon-purple)] to-transparent animate-[scan_3s_linear_infinite]" />
          )}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <div className={cn(
                "p-4 rounded-xl border transition-colors",
                execution.status === 'running' ? "bg-[var(--color-neon-purple)]/10 border-[var(--color-neon-purple)]/20 text-[var(--color-neon-purple)] animate-pulse" : "bg-white/5 border-white/10 text-gray-500"
              )}>
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-lg font-black text-white uppercase tracking-tight">PİPELİNE #{execution.workflow_id.slice(0, 8)}</h4>
                <div className="flex items-center space-x-3 mt-1 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <span>DÜĞÜM: {execution.current_node || 'CORE-01'}</span>
                  <span>&middot;</span>
                  <span className={execution.status === 'running' ? "text-[var(--color-neon-purple)]" : ""}>{execution.status}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-8">
              <div className="text-right">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">BAŞLANGIÇ</div>
                <div className="text-xs font-bold text-white uppercase">{new Date(execution.started_at).toLocaleTimeString('tr-TR')}</div>
              </div>
              <div className="h-8 w-px bg-white/5" />
              <div className="text-right">
                <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">GEÇEN SÜRE</div>
                <div className="text-xs font-bold text-[var(--color-neon)] uppercase">14m 22s</div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button variant="secondary" size="sm" className="bg-white/5 border-white/10">LOGLARI İNCELE</Button>
              <Button variant="danger" size="sm" icon={AlertCircle}>TERMİNAT ET</Button>
            </div>
          </div>
        </Card>
      ))}
      {executions.length === 0 && (
        <div className="text-center py-20 glass rounded-3xl border border-white/5">
          <Unplug className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs">Aktif Pipeline Bulunmuyor</p>
        </div>
      )}
    </div>
  )
}

const ApprovalTerminal = () => {
  const { approvals } = useWorkflow()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {approvals.map((approval) => (
        <Card glass key={approval.id} neon={approval.status === 'pending'} className="p-6 border-white/5 group">
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-[var(--color-neon)] mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Karar Protokolü</span>
              </div>
              <h4 className="text-xl font-black text-white uppercase tracking-tight leading-none">{approval.title}</h4>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2 italic">TALEP: {approval.approver_name}</p>
            </div>
            <div className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] font-black text-gray-500 uppercase">
              #{approval.id.slice(0, 6)}
            </div>
          </div>

          <div className="bg-black/20 rounded-xl p-4 border border-white/5 mb-6">
            <p className="text-xs text-gray-400 font-bold leading-relaxed uppercase">
              Bu işlem sistem kritik seviyesindedir. Devam etmek için operatör onayı gerekmektedir.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="primary" className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest">ONAYLA</Button>
            <Button variant="danger" className="flex-1 py-4 text-[10px] font-black uppercase tracking-widest">REDDET</Button>
          </div>
        </Card>
      ))}
      {approvals.length === 0 && (
        <div className="col-span-2 text-center py-20 glass rounded-3xl border border-white/5">
          <ShieldCheck className="w-12 h-12 text-gray-700 mx-auto mb-4" />
          <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-xs">Bekleyen Onay Protokolü Bulunmuyor</p>
        </div>
      )}
    </div>
  )
}

const WorkflowAnalytics = () => (
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <Card glass className="lg:col-span-2 min-h-[400px]">
      <CardHeader className="border-b border-white/5 pb-6">
        <CardTitle className="uppercase tracking-tighter font-black text-xl text-nowrap">OTOMASYON PERFORMANSI</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-full text-gray-600 font-black uppercase tracking-widest text-xs italic">
        Workflow Analitik Modülü v4.0 (Yakında)
      </CardContent>
    </Card>
    <div className="space-y-8">
      <Card glass neon className="border-[var(--color-neon)]/20">
        <CardHeader><CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500 italic">Efficiency Rating</CardTitle></CardHeader>
        <CardContent className="py-10 text-center">
          <div className="text-5xl font-black text-white mb-2">94.<span className="text-[var(--color-neon)]">8</span>%</div>
          <div className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em]">System Automation Score</div>
        </CardContent>
      </Card>
      <Card glass>
        <CardHeader><CardTitle className="text-xs font-black uppercase tracking-widest text-gray-500 italic">Resource Allocation</CardTitle></CardHeader>
        <CardContent className="space-y-4 pt-4">
          {[
            { label: 'Auto-Scaling', val: 92, color: 'bg-[var(--color-neon)]' },
            { label: 'API Bandwidth', val: 45, color: 'bg-[var(--color-neon-purple)]' },
            { label: 'BPM Engine', val: 78, color: 'bg-green-500' }
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

export default Workflow
