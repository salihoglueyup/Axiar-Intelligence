import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Zap, Globe, Lock } from 'lucide-react'
import Card from '@/components/ui/Card'

const Manifesto = () => {
  const features = [
    {
      icon: Shield,
      title: 'Güvenlik Öncelikli',
      description: 'Veri güvenliği ve siber koruma, iş modelimizin temelini oluşturur.'
    },
    {
      icon: Zap,
      title: 'AI Destekli',
      description: 'Yapay zeka ile güçlendirilmiş analiz ve otomasyon çözümleri.'
    },
    {
      icon: Globe,
      title: 'Küresel Standartlar',
      description: 'Uluslararası güvenlik standartlarına tam uyumlu altyapı.'
    },
    {
      icon: Lock,
      title: 'Gizlilik Odaklı',
      description: 'Müşteri verilerinin gizliliği ve mahremiyeti en üst düzeyde korunur.'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            <span className="text-white">Vizyonumuz</span>
            <span className="gradient-text block">Geleceği Şekillendirmek</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Axiar Intelligence olarak, veri odaklı karar alma süreçlerini 
            dönüştürüyor ve işletmeleri dijital geleceğe hazırlıyoruz. 
            İnovasyon, güvenlik ve verimlilik üçlüsüyle büyüyoruz.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card glass neon>
                <div className="text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission Statement */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card glass className="p-8 md:p-12">
            <div className="text-center space-y-6">
              <motion.h3 
                variants={itemVariants}
                className="text-2xl md:text-3xl font-bold gradient-text"
              >
                Misyonumuz
              </motion.h3>
              
              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-300 max-w-4xl mx-auto leading-relaxed"
              >
                Müşterilerimizin dijital dönüşüm yolculuklarında onlara güvenilir bir 
                ortak olmak. Yenilikçi teknolojiler ve siber güvenlik uzmanlığımızla, 
                işletmelerin potansiyellerini tam olarak ortaya çıkarmalarını sağlamak. 
                Veriye dayalı içgörülerle stratejik kararları güçlendirmek ve sürdürülebilir 
                büyüme hedeflerine ulaşmalarına yardımcı olmak.
              </motion.p>

              <motion.div 
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-8 pt-6"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                  <div className="text-gray-400 text-sm">Mutlu Müşteri</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                  <div className="text-gray-400 text-sm">Güvenlik Oranı</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                  <div className="text-gray-400 text-sm">Destek</div>
                </div>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Manifesto
