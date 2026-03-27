import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Shield, Zap } from 'lucide-react'
import Button from '@/components/ui/Button'
import ParticleCanvas from './ParticleCanvas'

const Hero = () => {
  const canvasRef = useRef(null)

  const heroVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden scanlines">
      {/* Background Canvas & Grid */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      <div className="absolute inset-0">
        <ParticleCanvas />
      </div>
      
      {/* Moving Glow Line */}
      <div className="glow-line opacity-20" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-bg)] via-transparent to-[var(--color-bg)]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 md:mt-24">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="space-y-10"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="inline-flex">
            <div className="glass px-5 py-2.5 rounded-full border border-[var(--color-neon)]/30 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
              <span className="text-[var(--color-neon)] text-sm font-bold flex items-center tracking-wide uppercase">
                <Zap className="w-4 h-4 mr-2" />
                Next-Gen AI Security Infrastructure
              </span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black leading-none tracking-tighter"
          >
            <span className="block text-white mb-2 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">VERİNİN ZEKA KODU</span>
            <span className="gradient-text block">SİSTEMİN GÜVENCESİ</span>
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Yapay zeka destekli siber güvenlik çözümleriyle işletmenizi 
            geleceğe taşıyın. Veri analizi, tehdit tespiti ve sistem 
            optimizasyonu tek bir platformda.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button size="lg" className="group">
              Keşfet
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="secondary" size="lg" className="group">
              <Play className="w-5 h-5 mr-2" />
              Demo İzle
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
          >
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
              <div className="text-gray-400 text-sm">Güvenlik Oranı</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
              <div className="text-gray-400 text-sm">İzleme</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-400 text-sm">Müşteri</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-cyan-500 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-500 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}

export default Hero
