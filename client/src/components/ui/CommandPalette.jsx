import React, { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, Command, X, ArrowRight, Zap, 
  Shield, Brain, BarChart3, Globe, Settings,
  MessageSquare, FileText, HelpCircle, Layout
} from 'lucide-react'
import { cn } from '@/utils/cn'

const CommandPalette = ({ isOpen, onClose }) => {
  const [search, setSearch] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const navigate = useNavigate()

  const items = [
    { id: 'home', title: 'Ana Sayfa', icon: Layout, category: 'Sayfalar', href: '/' },
    { id: 'ai', title: 'AI Platform', icon: Brain, category: 'Sayfalar', href: '/ai' },
    { id: 'analytics', title: 'Analitik', icon: BarChart3, category: 'Sayfalar', href: '/analytics' },
    { id: 'enterprise', title: 'Enterprise', icon: Shield, category: 'Sayfalar', href: '/enterprise' },
    { id: 'integrations', title: 'Entegrasyonlar', icon: Settings, category: 'Sayfalar', href: '/integrations' },
    { id: 'global', title: 'Küresel Ağ', icon: Globe, category: 'Sayfalar', href: '/global' },
    { id: 'portal', title: 'Sistem Portalı', icon: Zap, category: 'Aksiyonlar', href: '/portal' },
    { id: 'pricing', title: 'Fiyatlandırma Planları', icon: FileText, category: 'Kaynaklar', href: '/#pricing' },
    { id: 'faq', title: 'Sıkça Sorulan Sorular', icon: HelpCircle, category: 'Kaynaklar', href: '/#faq' },
    { id: 'contact', title: 'Destek Ekibiyle Görüş', icon: MessageSquare, category: 'Aksiyonlar', href: '#contact' }
  ]

  const filteredItems = items.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = useCallback((item) => {
    onClose()
    if (item.href.startsWith('/')) {
      navigate(item.href)
    } else {
      // Smooth scroll for anchors
      const element = document.querySelector(item.href)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [navigate, onClose])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return

      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setSelectedIndex(prev => (prev + 1) % filteredItems.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setSelectedIndex(prev => (prev - 1 + filteredItems.length) % filteredItems.length)
      } else if (e.key === 'Enter') {
        e.preventDefault()
        if (filteredItems[selectedIndex]) {
          handleSelect(filteredItems[selectedIndex])
        }
      } else if (e.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, filteredItems, selectedIndex, handleSelect, onClose])

  useEffect(() => {
    setSelectedIndex(0)
  }, [search])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh] px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-gray-950/60 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="relative w-full max-w-2xl bg-gray-900/90 border border-white/10 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center px-6 py-4 border-b border-white/5 bg-white/5">
              <Search className="w-5 h-5 text-gray-400 mr-4" />
              <input
                autoFocus
                className="flex-1 bg-transparent border-none outline-none text-white placeholder-gray-500 text-lg"
                placeholder="Platformda ara veya komut yaz..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="flex items-center space-x-1 px-2 py-1 rounded bg-gray-800 border border-white/5 text-[10px] font-bold text-gray-500">
                <span className="text-xs">ESC</span>
              </div>
            </div>

            {/* Results */}
            <div className="max-h-[60vh] overflow-y-auto p-2 custom-scrollbar">
              {filteredItems.length > 0 ? (
                <div className="space-y-1">
                  {filteredItems.map((item, index) => (
                    <button
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 group",
                        selectedIndex === index ? "bg-cyan-500/10 border-white/10" : "bg-transparent border-transparent"
                      )}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={cn(
                          "p-2 rounded-lg bg-gray-800 border border-white/5 transition-colors",
                          selectedIndex === index ? "text-cyan-400 border-cyan-500/30" : "text-gray-400"
                        )}>
                          <item.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <div className={cn(
                            "text-sm font-semibold transition-colors",
                            selectedIndex === index ? "text-white" : "text-gray-300"
                          )}>
                            {item.title}
                          </div>
                          <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                            {item.category}
                          </div>
                        </div>
                      </div>
                      
                      {selectedIndex === index && (
                        <motion.div
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center text-cyan-400 text-xs font-bold"
                        >
                          Git <ArrowRight className="w-3 h-3 ml-2" />
                        </motion.div>
                      )}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <div className="inline-flex p-4 rounded-full bg-gray-800 mb-4">
                    <Search className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-400">Sonuç bulunamadı...</p>
                </div>
              )}
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between px-6 py-3 border-t border-white/5 bg-gray-950/50 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
              <div className="flex items-center space-x-4">
                <span className="flex items-center"><Command className="w-3 h-3 mr-1" /> Navigasyon</span>
                <span className="flex items-center text-white"><ArrowRight className="w-3 h-3 mr-1" /> Seç</span>
              </div>
              <div>Axiar Intelligence v2.0</div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default CommandPalette
