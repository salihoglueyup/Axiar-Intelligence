import React from 'react'
import { motion } from 'framer-motion'
import { 
  FolderOpen, 
  Calendar, 
  TrendingUp, 
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'

const ProjectCard = ({ project, onEdit, onDelete, onView }) => {
  const statusColors = {
    planning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    in_progress: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    review: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    completed: 'bg-green-500/20 text-green-400 border-green-500/30'
  }

  const statusLabels = {
    planning: 'Planlama',
    in_progress: 'Devam Ediyor',
    review: 'İnceleme',
    completed: 'Tamamlandı'
  }

  const progressColor = project.progress >= 80 ? 'bg-green-500' :
                      project.progress >= 50 ? 'bg-blue-500' :
                      project.progress >= 20 ? 'bg-yellow-500' : 'bg-gray-500'

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
              <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2">
                {project.title}
              </h3>
              <p className="text-gray-400 text-sm line-clamp-3">
                {project.description}
              </p>
            </div>
            
            {/* Actions Dropdown */}
            <div className="relative group">
              <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                <MoreHorizontal className="w-4 h-4" />
              </Button>
              
              <div className="absolute right-0 top-8 w-48 glass border border-white/10 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                <div className="py-2">
                  <button
                    onClick={() => onView(project)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Görüntüle</span>
                  </button>
                  <button
                    onClick={() => onEdit(project)}
                    className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:text-white hover:bg-gray-700/50 transition-colors flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Düzenle</span>
                  </button>
                  <button
                    onClick={() => onDelete(project)}
                    className="w-full px-4 py-2 text-left text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors flex items-center space-x-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Sil</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Status Badge */}
          <div className="flex items-center space-x-3">
            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[project.status]}`}>
              {statusLabels[project.status]}
            </span>
            
            {project.client?.company && (
              <span className="text-sm text-gray-400">
                {project.client.company}
              </span>
            )}
          </div>

          {/* Progress */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">İlerleme</span>
              <span className="text-white font-medium">{project.progress}%</span>
            </div>
            
            <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
              <motion.div
                className={`h-full ${progressColor} rounded-full`}
                initial={{ width: 0 }}
                animate={{ width: `${project.progress}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="flex items-center justify-between text-sm text-gray-400">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Başlangıç: {new Date(project.start_date).toLocaleDateString('tr-TR')}</span>
            </div>
            
            {project.due_date && (
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-4 h-4" />
                <span>Teslim: {new Date(project.due_date).toLocaleDateString('tr-TR')}</span>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700">
            <div className="text-center">
              <div className="text-lg font-bold text-cyan-400">
                {project.reports_count || 0}
              </div>
              <div className="text-xs text-gray-400">Rapor</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-purple-400">
                {project.invoices_count || 0}
              </div>
              <div className="text-xs text-gray-400">Fatura</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-green-400">
                {project.activities_count || 0}
              </div>
              <div className="text-xs text-gray-400">Aktivite</div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default ProjectCard
