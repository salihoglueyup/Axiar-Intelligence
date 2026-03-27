import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, Shield, Brain, BarChart3, Globe, 
  Settings, ChevronDown, Layout, User, LogIn,
  Search, Command, Zap, ArrowRight, Star
} from 'lucide-react'
import Button from '@/components/ui/Button'
import CommandPalette from '@/components/ui/CommandPalette'
import { cn } from '@/utils/cn'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Command Palette Keyboard Shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setIsCommandPaletteOpen(prev => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
    setActiveDropdown(null)
  }, [location.pathname])

  const solutions = [
    { name: 'AI Platform', href: '/ai', icon: Brain, desc: 'Deep Learning & NLP Modelleri', color: 'text-purple-400' },
    { name: 'Analitik', href: '/analytics', icon: BarChart3, desc: 'Real-time Veri Madenciliği', color: 'text-blue-400' },
    { name: 'Enterprise', href: '/enterprise', icon: Shield, desc: 'Kurumsal Güvenlik Mimarisi', color: 'text-red-400' },
    { name: 'Entegrasyonlar', href: '/integrations', icon: Settings, desc: 'API & Webhook Yönetimi', color: 'text-emerald-400' },
    { name: 'Küresel Ağ', href: '/global', icon: Globe, desc: 'Multi-Region Edge Infrastructure', color: 'text-cyan-400' }
  ]

  const navLinks = [
    { name: 'Ürünler', href: '/products' },
    { name: 'Fiyatlandırma', href: '/#pricing' },
    { name: 'SSS', href: '/#faq' },
    { name: 'İletişim', href: '/#contact' }
  ]

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled 
            ? "bg-gray-950/80 backdrop-blur-xl border-b border-white/5 py-2 shadow-[0_4px_30px_rgba(0,0,0,0.1)]" 
            : "bg-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-12">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-3 group relative z-10">
              <div className="absolute -inset-2 bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
              <div className="relative w-9 h-9 bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl flex items-center justify-center overflow-hidden shadow-2xl">
                <img src="/favicon.svg" alt="Axiar Logo" className="w-6 h-6 object-contain group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white tracking-tight leading-none mb-1">Axiar</span>
                <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-[0.3em] leading-none">Intelligence</span>
              </div>
            </Link>

            {/* Desktop Nav - Absolute Center to prevent shifts */}
            <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center bg-white/5 border border-white/5 rounded-full px-1.5 py-1 shadow-inner">
              {/* Mega Dropdown Trigger */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={cn(
                  "px-4 py-1.5 rounded-full flex items-center space-x-1.5 text-[13px] font-medium transition-all duration-300",
                  activeDropdown === 'solutions' ? "bg-white/10 text-white" : "text-gray-400 hover:text-white"
                )}>
                  <span>Çözümler</span>
                  <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-500", activeDropdown === 'solutions' && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {activeDropdown === 'solutions' && (
                    <motion.div
                      initial={{ opacity: 0, y: 15, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[520px] glass rounded-2xl border border-white/10 p-2 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden"
                    >
                      <div className="grid grid-cols-2 gap-2">
                        {/* Left: Featured Section */}
                        <div className="p-5 bg-gradient-to-br from-cyan-500/10 to-blue-600/10 rounded-xl border border-white/5 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center space-x-2 text-cyan-400 mb-2 text-[10px] font-bold uppercase tracking-widest">
                              <Star className="w-3 h-3" />
                              <span>Yeni Sürüm</span>
                            </div>
                            <h4 className="text-white font-bold text-base mb-2">Axiar V2.0</h4>
                            <p className="text-gray-400 text-[11px] leading-relaxed">
                              Yapay zeka altyapımız artık 10 kat daha hızlı ve güvenli. Hemen keşfedin.
                            </p>
                          </div>
                          <Link to="/ai" className="mt-4 flex items-center text-xs font-bold text-cyan-400 group/link">
                            Detayları Gör
                            <ArrowRight className="w-3 h-3 ml-1 group-hover/link:translate-x-1 transition-transform" />
                          </Link>
                        </div>

                        {/* Right: Solutions List */}
                        <div className="space-y-1">
                          {solutions.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className="flex items-center space-x-3 p-2.5 rounded-lg hover:bg-white/5 transition-all group"
                            >
                              <div className={cn("p-2 rounded-lg bg-gray-900 border border-white/5 group-hover:border-cyan-500/50 transition-colors", item.color)}>
                                <item.icon className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="text-[13px] font-bold text-white group-hover:text-cyan-400 transition-colors">{item.name}</div>
                                <div className="text-[10px] text-gray-500 leading-tight">{item.desc}</div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {navLinks.map((link) => {
                const isHashLink = link.href.startsWith('#')
                const targetPath = isHashLink ? (location.pathname === '/' ? link.href : `/${link.href}`) : link.href
                
                return (
                  <Link
                    key={link.name}
                    to={targetPath}
                    className="relative px-4 py-1.5 rounded-full text-[13px] font-medium text-gray-400 hover:text-white transition-colors group"
                  >
                    {link.name}
                    {location.pathname === link.href && (
                      <motion.div 
                        layoutId="nav-active"
                        className="absolute inset-0 bg-white/10 rounded-full -z-10"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Desktop Nav - Right Actions */}
            <div className="hidden lg:flex items-center space-x-3 z-10">
              {/* Search Trigger */}
              <button 
                onClick={() => setIsCommandPaletteOpen(true)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-gray-500 hover:text-white transition-colors group"
              >
                <Search className="w-3.5 h-3.5" />
                <div className="flex items-center space-x-1 text-[9px] font-bold opacity-50 group-hover:opacity-100 transition-opacity">
                  <Command className="w-2.5 h-2.5" />
                  <span>K</span>
                </div>
              </button>

              <Link to="/portal">
                <Button size="sm" className="px-5 rounded-full shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all text-xs">
                  <Zap className="w-3.5 h-3.5 mr-1.5" />
                  Portal
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center z-10">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Content - Fixed dynamic top spacing */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={cn(
                "fixed inset-x-0 bottom-0 bg-gray-950 z-40 lg:hidden overflow-y-auto border-t border-white/5 transition-all duration-300",
                isScrolled ? "top-[57px]" : "top-[73px]"
              )}
            >
              <div className="p-6 space-y-8">
                {/* Search Bar Mobile */}
                <button 
                  onClick={() => setIsCommandPaletteOpen(true)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 text-gray-400"
                >
                  <div className="flex items-center space-x-3">
                    <Search className="w-5 h-5" />
                    <span>Ara...</span>
                  </div>
                  <div className="flex items-center space-x-1 text-[10px] font-bold px-2 py-1 rounded bg-gray-800 border border-white/5">
                    <Command className="w-3 h-3" />
                    <span>K</span>
                  </div>
                </button>

                {/* Mobile Solutions */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Çözümlerimiz</p>
                  <div className="grid grid-cols-1 gap-3">
                    {solutions.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center space-x-4 p-4 rounded-xl bg-white/5 border border-white/5"
                      >
                        <item.icon className={cn("w-6 h-6", item.color)} />
                        <div>
                          <div className="text-sm font-bold text-white">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.desc}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Links */}
                <div className="space-y-4">
                  <p className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Navigasyon</p>
                  <div className="flex flex-col space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.href}
                        className="text-2xl font-bold text-white hover:text-cyan-400 transition-colors py-2"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Mobile Actions */}
                <div className="pt-8 border-t border-white/10 flex flex-col space-y-4">
                  <Link to="/portal">
                    <Button className="w-full py-4 text-lg rounded-2xl">
                      Sistem Portalı'na Giriş
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Command Palette Component */}
      <CommandPalette 
        isOpen={isCommandPaletteOpen} 
        onClose={() => setIsCommandPaletteOpen(false)} 
      />
    </>
  )
}

export default Navbar
