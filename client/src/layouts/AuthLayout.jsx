import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Zap, ShieldCheck, Terminal as TerminalIcon } from 'lucide-react'
import ParticleCanvas from '@/components/landing/ParticleCanvas'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center px-4 overflow-hidden relative scanlines noise-overlay">
      {/* Dynamic Background */}
      <div className="absolute inset-0 cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute inset-0 opacity-40">
        <ParticleCanvas />
      </div>
      
      {/* Moving Glow Line */}
      <div className="glow-line opacity-10" />

      {/* Auth Viewport */}
      <div className="relative z-10 w-full max-w-[1000px] flex flex-col md:flex-row gap-8 items-stretch h-[600px]">
        
        {/* Left Panel: System Info (Hidden on small screens) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex flex-1 flex-col justify-between p-8 glass border border-white/5 rounded-3xl relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-neon)]/5 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <Link to="/" className="flex items-center space-x-3 mb-12 group/logo">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-neon)] to-[var(--color-neon-purple)] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] group-hover/logo:scale-110 transition-transform">
                <Zap className="w-7 h-7 text-gray-950" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-white leading-none tracking-tighter uppercase">AXIAR</span>
                <span className="text-[10px] text-[var(--color-neon)] font-bold tracking-[0.3em] uppercase leading-none mt-1">Intelligence</span>
              </div>
            </Link>

            <div className="space-y-6">
              <h2 className="text-4xl font-black text-white leading-none tracking-tight uppercase">
                SİSTEM <br /> <span className="gradient-text">ERİŞİMİ</span>
              </h2>
              <p className="text-[var(--color-text-muted)] text-sm font-bold uppercase tracking-widest leading-relaxed">
                Axiar Intelligence merkezi kontrol paneline bağlanmak üzeresiniz. Lütfen kimlik doğrulama protokolünü tamamlayın.
              </p>
            </div>
          </div>

          {/* System Logs Simulation */}
          <div className="relative z-10 bg-black/40 rounded-xl p-4 border border-white/5 font-mono text-[10px] space-y-1 text-green-500/60 overflow-hidden h-32 select-none">
            <div className="flex items-center space-x-2 text-[var(--color-neon)]">
              <TerminalIcon className="w-3 h-3" />
              <span className="font-bold uppercase tracking-widest">System Monitor v4.2.0</span>
            </div>
            <p className="animate-pulse">&gt;&gt; INITIATING AUTH PROTOCOL...</p>
            <p>&gt;&gt; SCANNING SECURITY HANDSHAKE...</p>
            <p>&gt;&gt; ENCRYPTING CHANNEL [256-BIT AES]...</p>
            <p>&gt;&gt; CROSS-CHECKING ORG_ID TOKEN...</p>
            <p className="text-white/40">&gt;&gt; STATUS: WAITING FOR OPERATOR INPUT</p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[10px] font-black text-white/30 uppercase tracking-[0.2em]">
            <span>Secured by Axiar Shield</span>
            <ShieldCheck className="w-4 h-4" />
          </div>
        </motion.div>

        {/* Right Panel: Auth Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full md:w-[420px] glass border border-[var(--color-neon)]/20 rounded-3xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,240,255,0.05)] relative flex flex-col justify-center"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-neon)]/40 to-transparent" />
          
          <div className="relative z-10">
            <Outlet />
          </div>
        </motion.div>

      </div>

      {/* Global Footer */}
      <div className="fixed bottom-6 w-full text-center text-[10px] font-bold text-gray-600 uppercase tracking-[0.4em] pointer-events-none">
        &copy; 2026 Axiar Intelligence Systems &middot; Secure Access Node
      </div>
    </div>
  )
}

export default AuthLayout
