import React from 'react'
import { motion } from 'framer-motion'
import { Check, Zap, Shield, Globe, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const Pricing = () => {
  const plans = [
    {
      name: 'Başlangıç',
      price: '0',
      description: 'Bireysel geliştiriciler ve küçük projeler için temel güvenlik.',
      features: [
        'Temal Tehdit Algılama',
        'Aylık 50.000 API Çağrısı',
        'Topluluk Desteği',
        'Temel Analytics Paneli',
        'Tek Kullanıcı'
      ],
      buttonText: 'Ücretsiz Başla',
      variant: 'secondary',
      highlight: false
    },
    {
      name: 'Professional',
      price: '99',
      description: 'Büyüyen ekipler için gelişmiş AI ve güvenlik çözümleri.',
      features: [
        'Gelişmiş AI Modelleri',
        'Sınırsız API Çağrısı',
        '7/24 Öncelikli Destek',
        'Özel Analytics ve Raporlama',
        '10 Kullanıcıya Kadar',
        'Sistem Entegrasyonları'
      ],
      buttonText: 'Hemen Yükselt',
      variant: 'primary',
      highlight: true
    },
    {
      name: 'Enterprise',
      price: 'Özel',
      description: 'Küresel ölçekteki kurumlar için tam kapsamlı çözüm.',
      features: [
        'Özel ML Model Eğitimi',
        'Dedicated Sunucu Altyapısı',
        'SSO ve Kurumsal Güvenlik',
        'Sınırsız Kullanıcı',
        'Yerinde Kurulum Desteği',
        'Özel Danışmanlık'
      ],
      buttonText: 'Bize Ulaşın',
      variant: 'ghost',
      highlight: false
    }
  ]

  return (
    <section id="pricing" className="py-20 bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Esnek <span className="gradient-text">Fiyatlandırma</span>
          </motion.h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            İhtiyacınıza en uygun paketi seçin, platformun gücünden hemen faydalanmaya başlayın.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card 
                glass 
                neon={plan.highlight}
                className={`h-full flex flex-col relative ${plan.highlight ? 'scale-105 z-10' : ''}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                    En Popüler
                  </div>
                )}
                
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-white">
                      {plan.price !== 'Özel' ? `$${plan.price}` : plan.price}
                    </span>
                    {plan.price !== 'Özel' && <span className="text-gray-400 ml-2">/ay</span>}
                  </div>
                  <p className="text-gray-400 text-sm">{plan.description}</p>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  {plan.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-cyan-500/10 flex items-center justify-center">
                        <Check className="w-3 h-3 text-cyan-400" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                <Button 
                  variant={plan.variant} 
                  className="w-full group"
                >
                  {plan.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing
