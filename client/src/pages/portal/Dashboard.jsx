import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  FolderOpen, 
  FileText, 
  CheckSquare, 
  TrendingUp,
  Users,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  FileCheck,
  AlertCircle
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { supabase } from '@/services/supabase'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const Dashboard = () => {
  const { profile, user } = useAuth()

  // Fetch Dashboard Stats
  const { data: dashboardData, loading: statsLoading } = useSupabaseQuery(async () => {
    // Parallel queries for better performance
    const [
      { count: projectsCount },
      { count: reportsCount },
      { count: invoicesCount },
      { data: activities }
    ] = await Promise.all([
      supabase.from('projects').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('reports').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('status', 'unpaid'),
      supabase.from('activities').select('*').order('created_at', { ascending: false }).limit(5)
    ])

    return {
      projectsCount: projectsCount || 0,
      reportsCount: reportsCount || 0,
      invoicesCount: invoicesCount || 0,
      activities: activities || []
    }
  }, [])

  const stats = [
    {
      title: 'Aktif Projeler',
      value: statsLoading ? '...' : dashboardData?.projectsCount.toString(),
      change: '+2',
      icon: FolderOpen,
      color: 'from-[var(--color-neon)] to-blue-500',
      trend: 'up'
    },
    {
      title: 'Bekleyen Raporlar',
      value: statsLoading ? '...' : dashboardData?.reportsCount.toString(),
      change: '-1',
      icon: FileText,
      color: 'from-[var(--color-neon-purple)] to-pink-500',
      trend: 'down'
    },
    {
      title: 'Ödenecek Faturalar',
      value: statsLoading ? '...' : dashboardData?.invoicesCount.toString(),
      change: '0',
      icon: CheckSquare,
      color: 'from-green-400 to-[var(--color-neon)]',
      trend: 'stable'
    },
    {
      title: 'Bu Ay Verimlilik',
      value: '%92',
      change: '+5%',
      icon: TrendingUp,
      color: 'from-orange-400 to-red-500',
      trend: 'up'
    }
  ]

  const recentActivities = dashboardData?.activities || []

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Welcome Banner */}
      <motion.div variants={itemVariants}>
        <Card glass neon className="relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-neon)]/5 rounded-full blur-3xl -mr-32 -mt-32 group-hover:bg-[var(--color-neon)]/10 transition-colors" />
          
          <div className="flex flex-col md:flex-row items-center justify-between relative z-10 p-2">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="px-3 py-1 bg-[var(--color-neon)]/10 border border-[var(--color-neon)]/20 rounded-full">
                  <span className="text-[var(--color-neon)] text-[10px] font-black uppercase tracking-widest">Sistem Operatörü</span>
                </div>
                <div className="h-px w-12 bg-white/10" />
                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Online</span>
              </div>
              
              <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase leading-none">
                HOŞ GELDİN, <span className="gradient-text">{profile?.full_name?.split(' ')[0] || user?.email?.split('@')[0]}</span>
              </h1>
              
              <div className="flex items-center text-[var(--color-text-muted)] font-bold uppercase tracking-widest text-xs">
                <Activity className="w-4 h-4 mr-2 text-[var(--color-neon)]" />
                Sistem durumu nominal. Tüm modüller aktif.
              </div>
            </div>

            <div className="hidden lg:flex flex-col items-end space-y-2">
              <div className="text-right">
                <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Anlık Tarih</div>
                <div className="text-xl font-black text-white">
                  {new Date().toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                </div>
              </div>
              <div className="text-[10px] text-[var(--color-neon)] font-black uppercase tracking-widest bg-[var(--color-neon)]/5 px-3 py-1 rounded border border-[var(--color-neon)]/10 mt-2">
                Core v4.2.0-stable
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index} glass hover neon className="group border-white/5">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg shadow-black/20 group-hover:scale-110 transition-transform`}>
                <stat.icon className="w-6 h-6 text-gray-900" />
              </div>
              <div className={cn(
                "flex items-center px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest",
                stat.trend === 'up' ? "bg-green-500/10 text-green-400" : 
                stat.trend === 'down' ? "bg-red-500/10 text-red-400" : 
                "bg-white/5 text-gray-400"
              )}>
                {stat.trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-1" /> : 
                 stat.trend === 'down' ? <ArrowDownRight className="w-3 h-3 mr-1" /> : null}
                {stat.change}
              </div>
            </div>
            
            <div className="space-y-1">
              <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{stat.title}</div>
              <div className="text-3xl font-black text-white group-hover:text-[var(--color-neon)] transition-colors">{stat.value}</div>
            </div>
          </Card>
        ))}
      </motion.div>

      {/* Main Content Area */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Activity Log */}
        <div className="lg:col-span-2">
          <Card glass className="h-full">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
              <CardTitle className="flex items-center space-x-2">
                <Activity className="w-5 h-5 text-[var(--color-neon)]" />
                <span className="uppercase tracking-tighter font-black text-xl">SİSTEM LOGLARI</span>
              </CardTitle>
              <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-widest">Tümünü Gör</Button>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 glass rounded-xl border-white/5 hover:border-[var(--color-neon)]/20 transition-all group">
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center border border-white/5",
                      activity.type === 'project' ? "text-cyan-400 bg-cyan-500/5" :
                      activity.type === 'report' ? "text-purple-400 bg-purple-500/5" :
                      "text-green-400 bg-green-500/5"
                    )}>
                      {
                        activity.type === 'project' ? <FolderOpen className="w-5 h-5" /> :
                        activity.type === 'report' ? <FileText className="w-5 h-5" /> :
                        <FileCheck className="w-5 h-5" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="text-white text-sm font-bold tracking-tight">{activity.action}</p>
                      <p className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mt-1">{activity.time}</p>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-600 group-hover:text-[var(--color-neon)] transition-colors" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Commands */}
        <div className="space-y-6">
          <Card glass neon>
            <CardHeader className="border-b border-white/5 pb-6">
              <CardTitle className="uppercase tracking-tighter font-black text-xl">HIZLI KOMUTLAR</CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 gap-4">
                <Button variant="secondary" className="justify-start py-6" icon={Plus}>
                  YENİ PROJE BAŞLAT
                </Button>
                <Button variant="secondary" className="justify-start py-6" icon={FileText}>
                  ANALİZ RAPORU EKLE
                </Button>
                <Button variant="secondary" className="justify-start py-6" icon={TrendingUp}>
                  İSTATİSTİKLERİ DIŞA AKTAR
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card glass className="border-red-500/20 shadow-[0_0_20px_rgba(239,68,68,0.05)]">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center text-red-500 text-sm font-black uppercase tracking-widest">
                <AlertCircle className="w-4 h-4 mr-2" />
                KRİTİK UYARILAR
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-500 font-bold leading-relaxed">
                Herhangi bir aktif güvenlik tehdidi tespit edilmedi. Sistem tam kapasite çalışıyor.
              </p>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Dashboard
