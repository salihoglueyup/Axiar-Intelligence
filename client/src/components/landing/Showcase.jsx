import React from 'react'
import { motion } from 'framer-motion'
import { Shield, TrendingUp, Users, ArrowRight } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const Showcase = () => {
  const products = [
    {
      title: 'CyberGuard AI',
      description: 'Yapay zeka destekli proaktif siber güvenlik platformu. Tehditleri öngörün, önleyin ve yönetin.',
      image: '/api/placeholder/400/250',
      features: ['Real-time Threat Detection', 'AI-powered Analysis', 'Automated Response'],
      status: 'Active',
      link: '#'
    },
    {
      title: 'Metazon Capital OS',
      description: 'Finansal operasyonlar için gelişmiş sermaye yönetim sistemi. Verimliliği artırın, riskleri azaltın.',
      image: '/api/placeholder/400/250',
      features: ['Portfolio Management', 'Risk Analytics', 'Automated Reporting'],
      status: 'Beta',
      link: '#'
    }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
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
        <div className="absolute top-40 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
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
            <span className="text-white">Ürünlerimiz</span>
            <span className="gradient-text block">İnovasyon Somutlaşıyor</span>
          </motion.h2>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Geliştirdiğimiz ürünlerle işletmelerin dijital dönüşümünü hızlandırıyoruz.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {products.map((product, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="space-y-6"
            >
              <Card glass neon className="overflow-hidden">
                {/* Image Placeholder */}
                <div className="h-48 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <Shield className="w-16 h-16 text-cyan-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">Product Mockup</p>
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  {/* Status Badge */}
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-white">
                      {product.title}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'Active' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                        : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    }`}>
                      {product.status}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-gray-300 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {product.features.map((feature, featureIndex) => (
                      <div 
                        key={featureIndex}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                        <span className="text-gray-400">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-4 pt-4">
                    <Button className="flex-1">
                      Demo İste
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                    <Button variant="secondary" className="flex-1">
                      Detaylar
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-20"
        >
          <Card glass className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">500+</div>
                <div className="text-gray-400 text-sm">Aktif Kullanıcı</div>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
                <div className="text-gray-400 text-sm">Güvenlik SLA</div>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">40%</div>
                <div className="text-gray-400 text-sm">Verimlilik Artışı</div>
              </div>
              
              <div>
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <ArrowRight className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
                <div className="text-gray-400 text-sm">Destek</div>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default Showcase
