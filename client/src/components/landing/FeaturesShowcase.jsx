import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Zap, 
  Globe, 
  Lock, 
  Brain, 
  BarChart3, 
  Users, 
  CheckCircle, 
  ArrowRight, 
  Play, 
  Eye,
  Settings,
  Database,
  Cloud,
  Smartphone,
  FileText,
  TrendingUp
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const FeaturesShowcase = () => {
  const [activeFeature, setActiveFeature] = useState(null)
  const [hoveredFeature, setHoveredFeature] = useState(null)

  const features = [
    {
      id: 'ai-security',
      title: 'AI Destekli Güvenlik',
      description: 'Yapay zeka ile güçlendirilmiş proaktif tehdit tespiti ve otomatik koruma sistemi.',
      icon: Shield,
      color: 'from-red-500 to-orange-500',
      details: [
        'Real-time threat detection',
        'Machine learning algorithms',
        'Automated incident response',
        'Behavioral analysis'
      ],
      stats: {
        'Detection Rate': '99.7%',
        'Response Time': '<100ms',
        'False Positives': '0.02%'
      }
    },
    {
      id: 'data-analytics',
      title: 'Gelişmiş Analitik',
      description: 'Büyük veri setleri üzerinde derinlemeli analiz ve öngörü yetenekleri.',
      icon: Brain,
      color: 'from-purple-500 to-pink-500',
      details: [
        'Predictive analytics',
        'Real-time dashboards',
        'Custom reports',
        'Data visualization'
      ],
      stats: {
        'Data Processed': '8.7TB',
        'Accuracy': '98.3%',
        'Processing Speed': '1.2M records/sec'
      }
    },
    {
      id: 'global-scale',
      title: 'Küresel Ölçek',
      description: 'Dünya çapında dağıtık altyapı ile yüksek erişilebilirlik ve performans.',
      icon: Globe,
      color: 'from-blue-500 to-cyan-500',
      details: [
        'Multi-region deployment',
        'Auto-scaling',
        'CDN optimization',
        'Load balancing'
      ],
      stats: {
        'Uptime': '99.97%',
        'Global Coverage': '47 countries',
        'Response Time': '12ms'
      }
    },
    {
      id: 'data-protection',
      title: 'Veri Koruma',
      description: 'End-to-end şifreleme ve veri gizliliği ile en üst düzey güvenlik.',
      icon: Lock,
      color: 'from-green-500 to-emerald-500',
      details: [
        'AES-256 encryption',
        'Zero-knowledge architecture',
        'GDPR compliance',
        'Regular security audits'
      ],
      stats: {
        'Encryption Level': 'Military-grade',
        'Compliance': '100%',
        'Data Breaches': '0'
      }
    },
    {
      id: 'integration',
      title: 'Sistem Entegrasyonu',
      description: 'Mevcut sistemlerinizle sorunsuz entegrasyon çalışan esnek API mimarisi.',
      icon: Settings,
      color: 'from-yellow-500 to-orange-500',
      details: [
        'RESTful APIs',
        'Webhook support',
        'Real-time sync',
        'Custom connectors'
      ],
      stats: {
        'APIs Available': '150+',
        'Integration Time': '<5min',
        'Success Rate': '99.8%'
      }
    },
    {
      id: 'mobile-first',
      title: 'Mobil Öncelikli',
      description: 'Her cihazda mükemmel performans sunan responsive ve mobil uyumlu arayüz.',
      icon: Smartphone,
      color: 'from-indigo-500 to-purple-500',
      details: [
        'Progressive Web App',
        'Touch-optimized UI',
        'Offline functionality',
        'Push notifications'
      ],
      stats: {
        'Mobile Score': '94/100',
        'Page Speed': '1.2s',
        'Responsive Design': '100%'
      }
    }
  ]

  return (
    <section className="py-16 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Platform Özellikleri
          </h2>
          <p className="text-gray-400 text-lg max-w-3xl mx-auto">
            Modern teknolojiler ve yenilikçi çözümlerle işinizi bir üst seviyeye taşıyın
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredFeature(feature.id)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <Card 
                glass 
                neon={hoveredFeature === feature.id}
                hover 
                className="h-full cursor-pointer relative overflow-hidden group"
              >
                {/* Feature Header */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} transform transition-transform duration-300 group-hover:scale-110`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Feature Details */}
                <div className="space-y-3">
                  {feature.details.map((detail, detailIndex) => (
                    <motion.div
                      key={detailIndex}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: activeFeature === feature.id ? 1 : 0,
                        x: activeFeature === feature.id ? 0 : -20
                      }}
                      transition={{ duration: 0.3, delay: detailIndex * 0.1 }}
                      className="flex items-center space-x-2"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{detail}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Stats */}
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {Object.entries(feature.stats).map(([key, value]) => (
                      <div key={key} className="text-center">
                        <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                          {key.replace(/([A-Z])/g, ' $1')}
                        </div>
                        <div className="text-lg font-bold text-cyan-400">
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-6 flex justify-center">
                  <Button
                    onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
                    className="w-full sm:w-auto"
                    icon={activeFeature === feature.id ? Eye : ArrowRight}
                  >
                    {activeFeature === feature.id ? 'Detayları Kapat' : 'Detayları Göster'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Card glass className="max-w-2xl mx-auto p-8">
            <h3 className="text-2xl font-bold text-white mb-4">
              Tüm Özellikleri Keşfedin
            </h3>
            <p className="text-gray-300 mb-6 text-lg">
              150+ özellik ile iş ihtiyaçlarınız için kapsamlı çözüm
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                <Play className="w-5 h-5 mr-2" />
                Ücretsiz Deneme
              </Button>
              <Button variant="secondary" className="border-cyan-500/30">
                <FileText className="w-5 h-5 mr-2" />
                Özellik Listesi
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturesShowcase
