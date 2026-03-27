import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Search, 
  Filter, 
  Plus, 
  FolderOpen,
  Calendar,
  TrendingUp,
  SortAsc
} from 'lucide-react'
import ProjectCard from '@/components/portal/ProjectCard'
import ProjectModal from '@/components/portal/ProjectModal'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Card from '@/components/ui/Card'
import { useSupabaseQuery } from '@/hooks/useSupabaseQuery'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [filteredProjects, setFilteredProjects] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('created_at')
  const [loading, setLoading] = useState(false)

  // Mock data - real implementation would use Supabase
  const mockProjects = [
    {
      id: '1',
      title: 'CyberGuard AI',
      description: 'Yapay zeka destekli siber güvenlik platformu geliştirme projesi. Müşteri verilerini koruyan ve tehditleri tespit eden sistem.',
      status: 'in_progress',
      progress: 75,
      start_date: '2024-01-15',
      due_date: '2024-06-30',
      client: { company: 'TechCorp' },
      reports_count: 12,
      invoices_count: 3,
      activities_count: 28
    },
    {
      id: '2',
      title: 'Metazon Capital OS',
      description: 'Finansal operasyonlar için gelişmiş sermaye yönetim sistemi. Portföy yönetimi ve risk analizi özellikleri içerir.',
      status: 'review',
      progress: 90,
      start_date: '2023-11-01',
      due_date: '2024-03-31',
      client: { company: 'FinanceHub' },
      reports_count: 8,
      invoices_count: 5,
      activities_count: 15
    },
    {
      id: '3',
      title: 'E-Commerce Platform',
      description: 'Modern e-ticaret platformu geliştirme. Kullanıcı yönetimi, ürün katalogu, ödeme sistemleri entegrasyonu.',
      status: 'completed',
      progress: 100,
      start_date: '2023-08-01',
      due_date: '2024-01-31',
      client: { company: 'ShopMax' },
      reports_count: 15,
      invoices_count: 8,
      activities_count: 42
    },
    {
      id: '4',
      title: 'Mobile Banking App',
      description: 'iOS ve Android için mobil bankacılık uygulaması. Güvenli ödemeler, hesap yönetimi, bütçe takibi.',
      status: 'planning',
      progress: 15,
      start_date: '2024-02-01',
      due_date: '2024-12-31',
      client: { company: 'BankTech' },
      reports_count: 2,
      invoices_count: 1,
      activities_count: 8
    }
  ]

  useEffect(() => {
    setProjects(mockProjects)
    setFilteredProjects(mockProjects)
  }, [])

  useEffect(() => {
    let filtered = [...projects]

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.client?.company.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(project => project.status === statusFilter)
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'progress':
          return b.progress - a.progress
        case 'due_date':
          return new Date(a.due_date) - new Date(b.due_date)
        default:
          return new Date(b.created_at) - new Date(a.created_at)
      }
    })

    setFilteredProjects(filtered)
  }, [projects, searchTerm, statusFilter, sortBy])

  const handleCreateProject = () => {
    setSelectedProject(null)
    setIsModalOpen(true)
  }

  const handleEditProject = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const handleSaveProject = async (projectData) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (selectedProject) {
        // Update existing project
        setProjects(prev => prev.map(p => 
          p.id === selectedProject.id 
            ? { ...p, ...projectData, updated_at: new Date().toISOString() }
            : p
        ))
      } else {
        // Create new project
        const newProject = {
          id: Date.now().toString(),
          ...projectData,
          created_at: new Date().toISOString(),
          client: { company: 'New Client' },
          reports_count: 0,
          invoices_count: 0,
          activities_count: 1
        }
        setProjects(prev => [newProject, ...prev])
      }
    } catch (error) {
      console.error('Save project error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteProject = async (projectId) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      setProjects(prev => prev.filter(p => p.id !== projectId))
    } catch (error) {
      console.error('Delete project error:', error)
    } finally {
      setLoading(false)
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
          <h1 className="text-2xl font-bold text-white mb-2">Projeler</h1>
          <p className="text-gray-400">
            Toplam {filteredProjects.length} proje bulundu
          </p>
        </div>

        <Button onClick={handleCreateProject}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Proje
        </Button>
      </div>

      {/* Filters and Search */}
      <Card glass>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Proje ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="planning">Planlama</option>
            <option value="in_progress">Devam Ediyor</option>
            <option value="review">İnceleme</option>
            <option value="completed">Tamamlandı</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
          >
            <option value="created_at">Oluşturulma Tarihi</option>
            <option value="title">İsim</option>
            <option value="progress">İlerleme</option>
            <option value="due_date">Bitiş Tarihi</option>
          </select>

          <div className="flex items-center space-x-2 text-gray-400">
            <Filter className="w-4 h-4" />
            <span className="text-sm">Filtreler</span>
          </div>
        </div>
      </Card>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
            >
              <ProjectCard
                project={project}
                onEdit={handleEditProject}
                onDelete={handleDeleteProject}
                onView={(project) => console.log('View project:', project)}
              />
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <Card glass>
          <div className="text-center py-12">
            <FolderOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Proje Bulunamadı
            </h3>
            <p className="text-gray-400 mb-6">
              {searchTerm || statusFilter !== 'all' 
                ? 'Arama kriterlerinize uygun proje bulunamadı.'
                : 'Henüz proje oluşturulmamış.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && (
              <Button onClick={handleCreateProject}>
                <Plus className="w-4 h-4 mr-2" />
                İlk Proje Oluştur
              </Button>
            )}
          </div>
        </Card>
      )}

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        onSave={handleSaveProject}
        onDelete={handleDeleteProject}
      />
    </motion.div>
  )
}

export default Projects
