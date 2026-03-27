import React from 'react'
import { motion } from 'framer-motion'
import { 
  FileText, 
  Download, 
  Eye, 
  Calendar,
  MoreHorizontal,
  Edit,
  Trash2,
  FileCheck,
  AlertTriangle
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const ReportCard = ({ report, onView, onEdit, onDelete, onDownload }) => {
  const typeColors = {
    analysis: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    performance: 'bg-green-500/20 text-green-400 border-green-500/30',
    security: 'bg-red-500/20 text-red-400 border-red-500/30'
  }

  const typeLabels = {
    analysis: 'Analiz',
    performance: 'Performans',
    security: 'Güvenlik'
  }

  const typeIcons = {
    analysis: FileText,
    performance: FileCheck,
    security: AlertTriangle
  }

  const Icon = typeIcons[report.type]

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card glass neon className="h-full">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[report.type]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${typeColors[report.type]}`}>
                  {typeLabels[report.type]}
                </span>
              </div>
              
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {report.title}
              </h3>
              
              {report.summary && (
                <p className="text-gray-400 text-sm line-clamp-3">
                  {report.summary}
                </p>
              )}
            </div>
            
            {/* Actions Dropdown */}
            <div className="relative group">
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              
              <div className="absolute right-0 top-8 w-48 glass border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-2">
                  <button
                    onClick={() => onView(report)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Görüntüle</span>
                  </button>
                  <button
                    onClick={() => onEdit(report)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Düzenle</span>
                  </button>
                  <button
                    onClick={() => onDownload(report)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Download className="w-4 h-4" />
                    <span>İndir</span>
                  </button>
                  <button
                    onClick={() => onDelete(report)}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Sil</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* File Info */}
          {report.file_url && (
            <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span className="text-sm text-gray-300">
                  {report.file_url.split('/').pop()}
                </span>
              </div>
              
              <span className="text-xs text-gray-400">
                {report.file_size ? formatFileSize(report.file_size) : '2.5 MB'}
              </span>
            </div>
          )}

          {/* Metadata */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Oluşturulma: {new Date(report.created_at).toLocaleDateString('tr-TR')}</span>
              </div>
              
              {report.updated_at && (
                <span>Güncellenme: {new Date(report.updated_at).toLocaleDateString('tr-TR')}</span>
              )}
            </div>

            {report.project_name && (
              <div className="flex items-center space-x-2 text-sm">
                <span className="text-gray-400">Proje:</span>
                <span className="text-cyan-400">{report.project_name}</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex space-x-2 pt-4 border-t border-gray-700">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => onView(report)}
              className="flex-1"
            >
              <Eye className="w-4 h-4 mr-2" />
              Görüntüle
            </Button>
            
            {report.file_url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDownload(report)}
              >
                <Download className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ReportCard
