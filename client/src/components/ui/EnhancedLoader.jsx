import React from 'react'
import { motion } from 'framer-motion'
import { Zap, Shield, Brain } from 'lucide-react'

const EnhancedLoader = ({ type = 'default' }) => {
  const loaders = {
    default: {
      icon: Brain,
      text: 'Axiar Intelligence Yükleniyor...',
      subtext: 'Yapay zeka modülleri başlatılıyor'
    },
    security: {
      icon: Shield,
      text: 'Güvenlik Taraması',
      subtext: 'Sistem güvenliği kontrol ediliyor'
    },
    analytics: {
      icon: Zap,
      text: 'Veri Analizi',
      subtext: 'Analytics verileri işleniyor'
    }
  }

  const currentLoader = loaders[type] || loaders.default

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center space-y-8">
        {/* Animated Logo */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
            <currentLoader.icon className="w-8 h-8 text-white" />
          </div>
        </motion.div>

        {/* Loading Text */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold text-white mb-2">
            {currentLoader.text}
          </h1>
          <p className="text-cyan-400 text-lg">
            {currentLoader.subtext}
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto">
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2 justify-center mt-8">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="w-3 h-3 bg-cyan-500 rounded-full"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default EnhancedLoader
