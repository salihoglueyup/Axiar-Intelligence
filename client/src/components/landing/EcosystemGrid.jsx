import React from 'react'
import { motion } from 'framer-motion'
import { Brain, Shield, Cpu, Globe, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const EcosystemGrid = () => {
  const ecosystems = [
    {
      icon: Brain,
      title: 'AI & Machine Learning',
      description: 'Yapay zeka destekli analiz, tahmin ve otomasyon çözümleri ile verimliliği artırın.',
      features: ['Predictive Analytics', 'Natural Language Processing', 'Computer Vision'],
      color: 'from-[var(--color-neon-purple)] to-[var(--color-neon)]'
    },
    {
      icon: Shield,
      title: 'Cyber Security',
      description: 'Kapsamlı siber güvenlik hizmetleri ile dijital varlıklarınızı koruyun.',
      features: ['Threat Detection', 'Security Audits', 'Incident Response'],
      color: 'from-[var(--color-neon)] to-blue-500'
    },
    {
      icon: Cpu,
      title: 'Systems Integration',
      description: 'Mevcut sistemlerinizle entegre çalışan ölçeklenebilir çözümler.',
      features: ['API Integration', 'Cloud Migration', 'Legacy Modernization'],
      color: 'from-green-400 to-[var(--color-neon)]'
    },
    {
      icon: Globe,
      title: 'Web & Mobile',
      description: 'Modern teknolojilerle kullanıcı odaklı dijital deneyimler tasarlayın.',
      features: ['Responsive Design', 'Progressive Web Apps', 'Native Applications'],
      color: 'from-orange-400 to-red-500'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <section className="py-24 bg-[var(--color-bg)] relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[var(--color-neon)]/20 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div variants={itemVariants} className="inline-block mb-4">
            <span className="text-[var(--color-neon)] text-xs font-bold tracking-[0.3em] uppercase bg-[var(--color-neon)]/5 px-4 py-1 rounded-full border border-[var(--color-neon)]/20">
              Platform Ekosistemi
            </span>
          </motion.div>
          
          <motion.h2 
            variants={itemVariants}
            className="text-4xl md:text-6xl font-black mb-8 tracking-tighter"
          >
            <span className="text-white">GELECEĞİN</span>
            <span className="gradient-text block mt-2 text-5xl md:text-7xl">HİZMET ALANLARI</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-[var(--color-text-muted)] max-w-2xl mx-auto leading-relaxed"
          >
            Dört ana stratejik alanda uzmanlaşarak, kurumunuzun dijital genetiğini geleceğe hazırlıyoruz.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {ecosystems.map((ecosystem, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <Card glass neon hover className="h-full group border-white/5 hover:border-[var(--color-neon)]/30 transition-colors duration-500">
                <div className="flex flex-col h-full space-y-8">
                  {/* Icon Section */}
                  <div className="flex items-start justify-between">
                    <div className={`w-20 h-20 bg-gradient-to-br ${ecosystem.color} rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                      <ecosystem.icon className="w-10 h-10 text-gray-950" />
                    </div>
                    <div className="text-[var(--color-neon)]/20 font-black text-6xl select-none group-hover:text-[var(--color-neon)]/40 transition-colors">
                      0{index + 1}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="flex-1 space-y-6">
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-4 group-hover:text-[var(--color-neon)] transition-colors">
                        {ecosystem.title}
                      </h3>
                      <p className="text-[var(--color-text-muted)] leading-relaxed text-base">
                        {ecosystem.description}
                      </p>
                    </div>

                    {/* Features List */}
                    <div className="grid grid-cols-1 gap-3 pt-4">
                      {ecosystem.features.map((feature, featureIndex) => (
                        <div 
                          key={featureIndex}
                          className="flex items-center space-x-3 text-sm group/item"
                        >
                          <div className="w-1.5 h-1.5 bg-[var(--color-neon)] rounded-full shadow-[0_0_8px_var(--color-neon)]" />
                          <span className="text-gray-400 group-hover/item:text-white transition-colors">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button 
                      variant="secondary" 
                      className="w-full justify-between group/btn py-4"
                    >
                      <span>Detaylı Çözümleri İncele</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default EcosystemGrid
