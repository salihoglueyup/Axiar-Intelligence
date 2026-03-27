import React, { useState, useEffect } from 'react'
import { Outlet, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  FolderOpen, 
  FileText, 
  FileCheck, 
  Settings, 
  Menu, 
  X,
  Bell,
  User,
  LogOut,
  Zap,
  ChevronLeft,
  Search,
  Command,
  Shield,
  Brain,
  BarChart3,
  Network,
  Building
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import Button from '@/components/ui/Button'
import { cn } from '@/utils/cn'

const PortalLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const { user, profile, signOut } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setSidebarOpen(false)
      else setSidebarOpen(true)
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navigation = [
    { name: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
    { name: 'Güvenlik', href: '/portal/security', icon: Shield },
    { name: 'AI Platform', href: '/portal/ai', icon: Brain },
    { name: 'Analitik', href: '/portal/analytics', icon: BarChart3 },
    { name: 'İş Akışları', href: '/portal/workflow', icon: Network },
    { name: 'Projeler', href: '/portal/projects', icon: FolderOpen },
    { name: 'Raporlar', href: '/portal/reports', icon: FileText },
    { name: 'Faturalar', href: '/portal/invoices', icon: FileCheck },
    { name: 'Organizasyon', href: '/portal/organization', icon: Building },
    { name: 'Ayarlar', href: '/portal/settings', icon: Settings },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 cyber-grid opacity-10 pointer-events-none" />
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-neon)]/20 to-transparent pointer-events-none" />

      {/* Sidebar */}
      <AnimatePresence mode="wait">
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="w-72 glass border-r border-white/10 fixed left-0 top-0 bottom-0 z-50 lg:relative lg:z-0 flex flex-col"
          >
            {/* Logo Section */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="w-10 h-10 bg-gradient-to-br from-[var(--color-neon)] to-[var(--color-neon-purple)] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)]">
                  <Zap className="w-6 h-6 text-gray-950" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-black text-white leading-none tracking-tighter">AXIAR</span>
                  <span className="text-[10px] text-[var(--color-neon)] font-bold tracking-[0.2em] uppercase leading-none mt-1">Portal</span>
                </div>
              </Link>
              <button 
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden p-2 text-gray-500 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      "flex items-center justify-between px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden",
                      isActive 
                        ? "bg-[var(--color-neon)]/10 text-white shadow-[inset_0_0_20px_rgba(0,240,255,0.05)]" 
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <div className="flex items-center space-x-3 relative z-10">
                      <item.icon className={cn("w-5 h-5", isActive ? "text-[var(--color-neon)]" : "group-hover:text-[var(--color-neon)] transition-colors")} />
                      <span className="font-bold text-sm tracking-wide">{item.name}</span>
                    </div>
                    {isActive && (
                      <motion.div 
                        layoutId="active-nav-glow"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-[var(--color-neon)] shadow-[0_0_15px_var(--color-neon)]"
                      />
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t border-white/5 bg-black/20">
              <div className="flex items-center space-x-3 p-3 glass rounded-2xl border-white/5 group">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-white/10">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[var(--color-bg)] rounded-full shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-black text-white truncate tracking-tight uppercase">
                    {profile?.full_name || user?.email?.split('@')[0]}
                  </p>
                  <p className="text-[10px] text-[var(--color-neon)] font-bold uppercase tracking-widest opacity-60">
                    {profile?.role || 'Operator'}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Link to="/portal/settings" className="w-full">
                  <Button variant="ghost" size="sm" className="w-full text-[10px] font-bold uppercase tracking-widest bg-white/5 hover:bg-white/10 rounded-xl py-3">
                    Profil
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="w-full text-[10px] font-bold uppercase tracking-widest text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-xl py-3"
                >
                  Çıkış
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative">
        {/* Top Header */}
        <header className={cn(
          "sticky top-0 z-30 px-6 py-4 transition-all duration-300 border-b",
          isScrolled ? "glass border-white/10 py-3" : "bg-transparent border-transparent"
        )}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 bg-white/5 rounded-xl text-gray-400 hover:text-white transition-all hover:scale-110 border border-white/10"
                >
                  <Menu className="w-6 h-6" />
                </button>
              )}
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-white tracking-tighter uppercase">
                  {navigation.find(item => item.href === location.pathname)?.name || 'Sistem'}
                </h1>
                <div className="flex items-center space-x-2 text-[10px] font-bold text-[var(--color-text-muted)] uppercase tracking-widest mt-1">
                  <span className="text-[var(--color-neon)]">Axiar OS</span>
                  <span>/</span>
                  <span>Core</span>
                  <span>/</span>
                  <span className="text-white">{location.pathname.split('/').pop()}</span>
                </div>
              </div>
            </div>

            {/* Top Right Actions */}
            <div className="flex items-center space-x-4 relative">
              <div className="hidden md:flex items-center px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-gray-500 hover:text-white transition-all group">
                <Search className="w-4 h-4 mr-3" />
                <span className="text-xs font-bold uppercase tracking-widest mr-8">Komut Ara...</span>
                <div className="flex items-center space-x-1 px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[9px] font-bold opacity-60">
                  <Command className="w-2.5 h-2.5" />
                  <span>K</span>
                </div>
              </div>

              <div className="relative">
                <button 
                  onClick={() => setShowNotifications(!showNotifications)}
                  className={cn(
                    "relative p-2.5 rounded-xl border transition-all group",
                    showNotifications 
                      ? "bg-[var(--color-neon)]/10 border-[var(--color-neon)]/30" 
                      : "bg-white/5 border-white/5 hover:border-[var(--color-neon)]/30"
                  )}
                >
                  <Bell className={cn("w-5 h-5", showNotifications ? "text-[var(--color-neon)]" : "text-gray-400 group-hover:text-[var(--color-neon)]")} />
                  <span className="absolute top-2 right-2 w-2 h-2 bg-[var(--color-neon)] rounded-full shadow-[0_0_10px_var(--color-neon)]" />
                </button>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-4 w-80 glass border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                    >
                      <div className="p-4 border-b border-white/5 flex items-center justify-between">
                        <span className="text-xs font-black text-white uppercase tracking-widest">Bildirimler</span>
                        <span className="text-[10px] font-bold text-[var(--color-neon)] uppercase">Tümünü Oku</span>
                      </div>
                      <div className="max-h-[350px] overflow-y-auto">
                        {[
                          { title: 'Güvenlik Uyarısı', desc: 'Yeni bir giriş denemesi engellendi.', time: '2 dk önce', icon: Shield, color: 'text-red-400' },
                          { title: 'Sistem Raporu', desc: 'Haftalık analitik raporunuz hazır.', time: '1 saat önce', icon: FileText, color: 'text-[var(--color-neon)]' },
                          { title: 'AI Optimizasyonu', desc: 'Model v4.2 başarıyla güncellendi.', time: '3 saat önce', icon: Zap, color: 'text-yellow-400' }
                        ].map((item, i) => (
                          <div key={i} className="p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer group">
                            <div className="flex items-start space-x-3">
                              <div className={cn("p-2 rounded-lg bg-black/40 border border-white/5", item.color)}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[11px] font-black text-white uppercase tracking-tight">{item.title}</p>
                                <p className="text-[10px] text-gray-500 line-clamp-2 mt-0.5">{item.desc}</p>
                                <span className="text-[9px] font-bold text-[var(--color-neon)]/50 uppercase mt-2 block">{item.time}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="p-3 bg-black/40 text-center">
                        <button className="text-[10px] font-black text-white uppercase tracking-widest hover:text-[var(--color-neon)] transition-colors">
                          Tüm Bildirimleri Gör
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8 relative">
          <div className="max-w-7xl mx-auto h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(10px)' }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="h-full"
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default PortalLayout
