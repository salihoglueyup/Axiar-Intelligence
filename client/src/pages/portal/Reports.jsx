import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Plus, 
  Upload,
  FileText,
  Download,
  Calendar,
  AlertTriangle
} from 'lucide-react'
import ReportCard from '@/components/portal/ReportCard'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const Reports = () => {
  const [reports, setReports] = useState([])
  const [filteredReports, setFilteredReports] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [loading, setLoading] = useState(false)

  // Mock data - real implementation would use Supabase
  const mockReports = [
    {
      id: '1',
      title: 'Security Analysis Q1 2024',
      summary: 'CyberGuard AI projesinin birinci çeyrek güvenlik analizi. Tehdit değerlendirmesi ve zafiyet tespiti sonuçları.',
      type: 'security',
      file_url: '/reports/security-analysis-q1-2024.pdf',
      file_size: 2621440, // 2.5 MB
      project_id: '1',
      project_name: 'CyberGuard AI',
      created_at: '2024-04-01T10:00:00Z',
      updated_at: '2024-04-02T15:30:00Z'
    },
    {
      id: '2',
      title: 'Performance Metrics Report',
      summary: 'Metazon Capital OS sistem performans metrikleri. Sunucu yanıt süreleri, veritabanı optimizasyonu ve kullanıcı deneyimi analizleri.',
      type: 'performance',
      file_url: '/reports/performance-metrics-march.pdf',
      file_size: 1572864, // 1.5 MB
      project_id: '2',
      project_name: 'Metazon Capital OS',
      created_at: '2024-03-28T14:20:00Z',
      updated_at: '2024-03-28T14:20:00Z'
    },
    {
      id: '3',
      title: 'User Behavior Analysis',
      summary: 'E-Commerce platformu kullanıcı davranışları analizi. Satın alma yolları, dönüşüm oranları ve kullanıcı segmentasyonu.',
      type: 'analysis',
      file_url: '/reports/user-behavior-analysis.pdf',
      file_size: 3145728, // 3 MB
      project_id: '3',
      project_name: 'E-Commerce Platform',
      created_at: '2024-03-15T09:45:00Z',
      updated_at: '2024-03-16T11:20:00Z'
    },
    {
      id: '4',
      title: 'Code Review Summary',
      summary: 'Mobile Banking uygulaması kod inceleme özeti. Güvenlik açıkları, performans sorunları ve kod kalitesi metrikleri.',
      type: 'security',
      file_url: '/reports/code-review-summary.pdf',
      file_size: 1048576, // 1 MB
      project_id: '4',
      project_name: 'Mobile Banking App',
      created_at: '2024-03-10T16:30:00Z',
      updated_at: '2024-03-10T16:30:00Z'
    },
    {
      id: '5',
      title: 'Database Performance Report',
      summary: 'Tüm projelerin veritabanı performans analizi. Sorgu optimizasyonları, indeksleme stratejileri ve yedekleme süreçleri.',
      type: 'performance',
      file_url: '/reports/database-performance.pdf',
      file_size: 2097152, // 2 MB
      project_id: null,
      project_name: 'Genel',
      created_at: '2024-03-05T13:15:00Z',
      updated_at: '2024-03-05T13:15:00Z'
    }
  ]

  useEffect(() => {
    setReports(mockReports)
    setFilteredReports(mockReports)
  }, [])

  useEffect(() => {
    let filtered = [...reports]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        report.project_name?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Type filter
    if (typeFilter !== 'all') {
      filtered = filtered.filter(report => report.type === typeFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'type':
          return a.type.localeCompare(b.type)
        case 'file_size':
          return b.file_size - a.file_size
        default:
          return new Date(b.created_at) - new Date(a.created_at)
      }
    })

    setFilteredReports(filtered)
  }, [reports, searchTerm, typeFilter, sortBy])

  const handleUploadReport = () => {
    // TODO: Implement upload modal
    console.log('Upload report')
  }

  const handleViewReport = (report) => {
    // TODO: Implement report viewer
    console.log('View report:', report)
  }

  const handleDownloadReport = (report) => {
    // TODO: Implement download
    console.log('Download report:', report)
    // Simulate download
    const link = document.createElement('a')
    link.href = report.file_url
    link.download = report.title + '.pdf'
    link.click()
  }

  const handleDeleteReport = async (reportId) => {
    if (window.confirm('Bu raporu silmek istediğinizden emin misiniz?')) {
      setLoading(true)
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setReports(prev => prev.filter(r => r.id !== reportId))
      } catch (error) {
        console.error('Delete report error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Raporlar</h1>
          <p className="text-gray-400">
            Toplam {filteredReports.length} rapor bulundu
          </p>
        </div>

        <Button onClick={handleUploadReport}>
          <Upload className="w-4 h-4 mr-2" />
          Rapor Yükle
        </Button>
      </div>

      {/* Filters and Search */}
      <Card glass>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Rapor ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
          >
            <option value="all">Tüm Türler</option>
            <option value="analysis">Analiz</option>
            <option value="performance">Performans</option>
            <option value="security">Güvenlik</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
          >
            <option value="created_at">Oluşturulma Tarihi</option>
            <option value="title">İsim</option>
            <option value="type">Tür</option>
            <option value="file_size">Dosya Boyutu</option>
          </select>

          <div className="flex items-center space-x-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filtreler</span>
          </div>
        </div>
      </Card>

      {/* Reports Grid */}
      {filteredReports.length > 0 ? (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredReports.map((report) => (
            <motion.div
              key={report.id}
              variants={itemVariants}
            >
              <ReportCard
                report={report}
                onView={handleViewReport}
                onDownload={handleDownloadReport}
                onDelete={handleDeleteReport}
                onEdit={(report) => console.log('Edit report:', report)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card glass>
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Rapor Bulunamadı
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || typeFilter !== 'all' 
                ? 'Arama kriterlerinize uygun rapor bulunamadı.'
                : 'Henüz rapor yüklenmemiş.'
              }
            </p>
            {!searchTerm && typeFilter === 'all' && (
              <Button onClick={handleUploadReport}>
                <Upload className="w-4 h-4 mr-2" />
                İlk Rapor Yükle
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Statistics */}
      <Card glass>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              {reports.filter(r => r.type === 'security').length}
            </div>
            <div className="text-sm text-gray-400">Güvenlik Raporu</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              {reports.filter(r => r.type === 'performance').length}
            </div>
            <div className="text-sm text-gray-400">Performans Raporu</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              {reports.filter(r => r.type === 'analysis').length}
            </div>
            <div className="text-sm text-gray-400">Analiz Raporu</div>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
              <Download className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-bold gradient-text mb-1">
              {reports.reduce((total, r) => total + (r.file_size || 0), 0) / 1024 / 1024}
            </div>
            <div className="text-sm text-gray-400">Toplam Boyut (MB)</div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default Reports
