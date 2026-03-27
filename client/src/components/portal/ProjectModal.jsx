import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Save, Plus, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Input'
import Card from '@/components/ui/Card'

const ProjectModal = ({ isOpen, onClose, project, onSave, onDelete }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'planning',
    progress: 0,
    start_date: '',
    due_date: '',
    client_id: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        status: project.status || 'planning',
        progress: project.progress || 0,
        start_date: project.start_date?.split('T')[0] || '',
        due_date: project.due_date?.split('T')[0] || '',
        client_id: project.client_id || ''
      })
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'planning',
        progress: 0,
        start_date: new Date().toISOString().split('T')[0],
        due_date: '',
        client_id: ''
      })
    }
  }, [project, isOpen])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      await onSave(formData)
      onClose()
    } catch (error) {
      console.error('Project save error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async () => {
    if (window.confirm('Bu projeyi silmek istediğinizden emin misiniz?')) {
      setLoading(true)
      try {
        await onDelete(project.id)
        onClose()
      } catch (error) {
        console.error('Project delete error:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  }

  const contentVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <Card glass neon>
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white">
                    {project ? 'Proje Düzenle' : 'Yeni Proje'}
                  </h2>
                  <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      name="title"
                      label="Proje Adı"
                      placeholder="Proje adını girin"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />

                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-2">
                        Durum
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
                      >
                        <option value="planning">Planlama</option>
                        <option value="in_progress">Devam Ediyor</option>
                        <option value="review">İnceleme</option>
                        <option value="completed">Tamamlandı</option>
                      </select>
                    </div>
                  </div>

                  <Textarea
                    name="description"
                    label="Proje Açıklaması"
                    placeholder="Proje detaylarını girin"
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    required
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-300 block mb-2">
                        İlerleme (%)
                      </label>
                      <input
                        type="number"
                        name="progress"
                        min="0"
                        max="100"
                        value={formData.progress}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all duration-200"
                      />
                    </div>

                    <Input
                      name="start_date"
                      type="date"
                      label="Başlangıç Tarihi"
                      value={formData.start_date}
                      onChange={handleChange}
                      required
                    />

                    <Input
                      name="due_date"
                      type="date"
                      label="Bitiş Tarihi"
                      value={formData.due_date}
                      onChange={handleChange}
                    />
                  </div>

                  <Input
                    name="client_id"
                    label="Müşteri ID"
                    placeholder="Müşteri ID'sini girin"
                    value={formData.client_id}
                    onChange={handleChange}
                  />

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <div className="flex space-x-3">
                      <Button
                        type="submit"
                        loading={loading}
                        disabled={loading}
                      >
                        <Save className="w-4 h-4 mr-2" />
                        {loading ? 'Kaydediliyor...' : 'Kaydet'}
                      </Button>
                      
                      <Button
                        type="button"
                        variant="secondary"
                        onClick={onClose}
                      >
                        İptal
                      </Button>
                    </div>

                    {project && (
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={handleDelete}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Sil
                      </Button>
                    )}
                  </div>
                </form>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default ProjectModal
