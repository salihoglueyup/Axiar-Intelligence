import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Brain, 
  Globe, 
  Zap, 
  CheckCircle, 
  Star, 
  ArrowRight, 
  Filter, 
  Search, 
  Users, 
  TrendingUp,
  Play,
  Eye,
  Settings,
  BarChart3,
  Clock,
  Award,
  Target
} from 'lucide-react'
import PageSEO from '@/components/seo/PageSEO'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const Products = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock products data
    const mockProducts = [
      {
        id: 1,
        name: 'CyberGuard AI',
        category: 'security',
        description: 'Yapay zeka destekli proaktif siber güvenlik platformu. Tehditleri öngörün, önleyin ve yönetin.',
        features: ['Real-time Threat Detection', 'AI-powered Analysis', 'Automated Response', 'Machine Learning'],
        price: 999,
        rating: 4.9,
        reviews: 1247,
        status: 'active',
        icon: Shield,
        color: 'from-red-500 to-orange-500',
        badge: 'En Popüler'
      },
      {
        id: 2,
        name: 'DataFlow Analytics',
        category: 'analytics',
        description: 'Büyük veri setleri üzerinde derinlemeli analiz ve öngörü yetenekleri. Veriye dayalı kararlar alın.',
        features: ['Predictive Analytics', 'Real-time Dashboards', 'Custom Reports', 'Data Visualization'],
        price: 599,
        rating: 4.7,
        reviews: 892,
        status: 'active',
        icon: Brain,
        color: 'from-purple-500 to-pink-500',
        badge: 'Yeni'
      },
      {
        id: 3,
        name: 'GlobalScale CDN',
        category: 'infrastructure',
        description: 'Dünya çapında dağıtık altyapı ile yüksek erişilebilirlik ve performans. Otomatik ölçeklendirme.',
        features: ['Multi-region Deployment', 'Auto-scaling', 'CDN Optimization', 'Load Balancing'],
        price: 299,
        rating: 4.8,
        reviews: 654,
        status: 'active',
        icon: Globe,
        color: 'from-blue-500 to-cyan-500',
        badge: 'Hızlı'
      },
      {
        id: 4,
        name: 'SecureVault',
        category: 'security',
        description: 'End-to-end şifreleme ve veri gizliliği ile en üst düzey güvenlik. Military-grade koruma.',
        features: ['AES-256 Encryption', 'Zero-knowledge Architecture', 'GDPR Compliance', 'Security Audits'],
        price: 149,
        rating: 4.6,
        reviews: 432,
        status: 'beta',
        icon: Shield,
        color: 'from-green-500 to-emerald-500',
        badge: 'Beta'
      },
      {
        id: 5,
        name: 'API Gateway Pro',
        category: 'integration',
        description: 'Mevcut sistemlerinizle sorunsuz entegrasyon çalışan esnek API mimarisi. 150+ hazır connector.',
        features: ['RESTful APIs', 'Webhook Support', 'Real-time Sync', 'Custom Connectors'],
        price: 399,
        rating: 4.5,
        reviews: 276,
        status: 'active',
        icon: Zap,
        color: 'from-yellow-500 to-orange-500',
        badge: 'Entegrasyon'
      }
    ]

    setTimeout(() => {
      setProducts(mockProducts)
      setFilteredProducts(mockProducts)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, searchTerm])

  const categories = [
    { id: 'all', name: 'Tümü', icon: BarChart3 },
    { id: 'security', name: 'Güvenlik', icon: Shield },
    { id: 'analytics', name: 'Analitik', icon: Brain },
    { id: 'infrastructure', name: 'Altyapı', icon: Globe },
    { id: 'integration', name: 'Entegrasyon', icon: Zap }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-cyan-400 text-lg">Ürünler yükleniyor...</div>
      </div>
    )
  }

  return (
    <>
      <PageSEO
        title="Ürünler - Axiar Intelligence Platform"
        description="Axiar Intelligence Platform ürün kataloğu. Siber güvenlik, analitik, altyapı ve entegrasyon çözümleri."
        keywords="ürünler, siber güvenlik, analitik, altyapı, entegrasyon, AI, cybersecurity"
        type="website"
      />
      
      <div className="min-h-screen bg-gray-900">
        {/* Header */}
        <section className="py-16 bg-gradient-to-br from-gray-900 to-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4">
                Ürünlerimiz
              </h1>
              <p className="text-gray-400 text-lg max-w-3xl mx-auto">
                İş ihtiyaçlarınız için tasarlanmış yenilikçi çözümler
              </p>
            </motion.div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-8">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
                  />
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg transition-all duration-200 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {React.createElement(category.icon, { className: "w-4 h-4" })}
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12"
              >
                <div className="text-gray-400 text-lg">
                  Arama kriterlerinize uygun ürün bulunamadı.
                </div>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card glass hover className="h-full relative group">
                      {/* Badge */}
                      {product.badge && (
                        <div className="absolute top-4 right-4 z-10">
                          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                            product.badge === 'En Popüler' ? 'bg-red-500 text-white' :
                            product.badge === 'Yeni' ? 'bg-green-500 text-white' :
                            product.badge === 'Hızlı' ? 'bg-blue-500 text-white' :
                            product.badge === 'Beta' ? 'bg-yellow-500 text-black' :
                            product.badge === 'Entegrasyon' ? 'bg-purple-500 text-white' :
                            'bg-gray-500 text-white'
                          }`}>
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {/* Product Header */}
                      <div className="flex items-center space-x-4 mb-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-r ${product.color} transform transition-transform duration-300 group-hover:scale-110`}>
                          {React.createElement(product.icon, { className: "w-8 h-8 text-white" })}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-white mb-1">
                            {product.name}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < Math.floor(product.rating)
                                      ? 'text-yellow-400 fill-current'
                                      : 'text-gray-600'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-gray-300 ml-2">{product.rating}</span>
                          </div>
                          <span className="text-sm text-gray-400">({product.reviews} değerlendirme)</span>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                        {product.description}
                      </p>

                      {/* Features */}
                      <div className="mb-4">
                        <h4 className="text-sm font-semibold text-cyan-400 mb-2">Özellikler:</h4>
                        <div className="space-y-1">
                          {product.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2 text-sm text-gray-400">
                              <CheckCircle className="w-3 h-3 text-green-400 flex-shrink-0" />
                              <span>{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Price and Status */}
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <div className="text-2xl font-bold text-white">
                            ${product.price}
                            <span className="text-sm text-gray-400 font-normal">/ay</span>
                          </div>
                          <div className={`text-sm px-2 py-1 rounded-full ${
                            product.status === 'active' ? 'bg-green-500/20 text-green-400' :
                            product.status === 'beta' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {product.status === 'active' ? 'Aktif' :
                             product.status === 'beta' ? 'Beta' : 'Geliştiriliyor'}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="flex gap-3">
                        <Button className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600">
                          <Play className="w-4 h-4 mr-2" />
                          Ücretsiz Deneme
                        </Button>
                        <Button variant="secondary" className="flex-1 border-cyan-500/30">
                          <Eye className="w-4 h-4 mr-2" />
                          Detaylar
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  )
}

export default Products
