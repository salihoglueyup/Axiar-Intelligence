import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Users, Calendar, MessageSquare, Paperclip, Play, Pause, RotateCcw, Filter, Search, Plus, Eye, Edit, Trash2, User, AlertCircle } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useTasks } from '@/hooks/useWorkflow'

const TaskManager = ({ className = '' }) => {
  const [selectedTask, setSelectedTask] = useState(null)
  const [showCommentModal, setShowCommentModal] = useState(false)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [comment, setComment] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  
  const { tasks, isLoading, completeTask, rejectTask, addComment, addAttachment } = useTasks()

  const statusOptions = [
    { value: 'all', label: 'Tümü', color: 'text-gray-400' },
    { value: 'pending', label: 'Beklemede', color: 'text-yellow-400' },
    { value: 'in_progress', label: 'Devam Ediyor', color: 'text-blue-400' },
    { value: 'completed', label: 'Tamamlandı', color: 'text-green-400' },
    { value: 'rejected', label: 'Reddedildi', color: 'text-red-400' },
    { value: 'cancelled', label: 'İptal Edildi', color: 'text-gray-400' },
    { value: 'overdue', label: 'Gecikmiş', color: 'text-orange-400' }
  ]

  const priorityOptions = [
    { value: 'all', label: 'Tümü', color: 'text-gray-400' },
    { value: 'low', label: 'Düşük', color: 'text-gray-400' },
    { value: 'medium', label: 'Orta', color: 'text-yellow-400' },
    { value: 'high', label: 'Yüksek', color: 'text-orange-400' },
    { value: 'critical', label: 'Kritik', color: 'text-red-400' }
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-400" />
      case 'in_progress':
        return <Play className="w-4 h-4 text-blue-400" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-400" />
      case 'cancelled':
        return <AlertCircle className="w-4 h-4 text-gray-400" />
      case 'overdue':
        return <AlertCircle className="w-4 h-4 text-orange-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusColor = (status) => {
    const found = statusOptions.find(s => s.value === status)
    return found ? found.color : 'text-gray-400'
  }

  const getStatusLabel = (status) => {
    const found = statusOptions.find(s => s.value === status)
    return found ? found.label : status
  }

  const getPriorityColor = (priority) => {
    const found = priorityOptions.find(p => p.value === priority)
    return found ? found.color : 'text-gray-400'
  }

  const getPriorityLabel = (priority) => {
    const found = priorityOptions.find(p => p.value === priority)
    return found ? found.label : priority
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'low':
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />
      case 'medium':
        return <div className="w-2 h-2 bg-yellow-400 rounded-full" />
      case 'high':
        return <div className="w-2 h-2 bg-orange-400 rounded-full" />
      case 'critical':
        return <div className="w-2 h-2 bg-red-400 rounded-full" />
      default:
        return <div className="w-2 h-2 bg-gray-400 rounded-full" />
    }
  }

  const isOverdue = (dueDate) => {
    if (!dueDate) return false
    return new Date(dueDate) < new Date()
  }

  const handleCompleteTask = async (taskId) => {
    try {
      await completeTask(taskId)
    } catch (error) {
      console.error('Failed to complete task:', error)
    }
  }

  const handleRejectTask = async (taskId, reason) => {
    try {
      await rejectTask(taskId, reason)
    } catch (error) {
      console.error('Failed to reject task:', error)
    }
  }

  const handleAddComment = async (taskId) => {
    if (!comment.trim()) return
    
    try {
      await addComment(taskId, comment)
      setComment('')
      setShowCommentModal(false)
    } catch (error) {
      console.error('Failed to add comment:', error)
    }
  }

  const handleAddAttachment = async (taskId, file) => {
    try {
      await addAttachment(taskId, file)
    } catch (error) {
      console.error('Failed to add attachment:', error)
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.assignee_name?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const groupedTasks = filteredTasks.reduce((groups, task) => {
    const status = task.status
    if (!groups[status]) {
      groups[status] = []
    }
    groups[status].push(task)
    return groups
  }, {})

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-white">Görev Yönetimi</h2>
          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
            {tasks.length} görev
          </span>
        </div>
        
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Görev
        </Button>
      </div>

      {/* Filters */}
      <Card glass className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Görev ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            {priorityOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Task Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {statusOptions.slice(1).map((status) => {
          const count = tasks.filter(t => t.status === status.value).length
          return (
            <motion.div
              key={status.value}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card glass className="p-4 text-center">
                <div className={`text-2xl font-bold ${status.color}`}>
                  {count}
                </div>
                <div className="text-sm text-gray-400">
                  {status.label}
                </div>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Task Boards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {statusOptions.slice(1).map((status) => (
          <div key={status.value} className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(status.value)}
                <h3 className={`font-semibold ${status.color}`}>
                  {status.label}
                </h3>
                <span className="px-2 py-1 bg-gray-800/50 text-gray-400 text-xs rounded-full">
                  {groupedTasks[status.value]?.length || 0}
                </span>
              </div>
            </div>
            
            <div className="space-y-3 min-h-[200px]">
              <AnimatePresence>
                {(groupedTasks[status.value] || []).map((task) => (
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card 
                      glass 
                      className={`p-4 cursor-pointer hover:border-cyan-500/50 transition-colors ${
                        isOverdue(task.due_date) && task.status !== 'completed' ? 'border-orange-500/50' : ''
                      }`}
                      onClick={() => {
                        setSelectedTask(task)
                        setShowDetailsModal(true)
                      }}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-white mb-1">
                            {task.title}
                          </h4>
                          {task.description && (
                            <p className="text-sm text-gray-400 line-clamp-2">
                              {task.description}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center space-x-1">
                          {getPriorityIcon(task.priority)}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {task.assignee_name && (
                            <div className="flex items-center space-x-1">
                              <User className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400">
                                {task.assignee_name}
                              </span>
                            </div>
                          )}
                          {task.due_date && (
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className={`text-xs ${
                                isOverdue(task.due_date) && task.status !== 'completed' 
                                  ? 'text-orange-400' 
                                  : 'text-gray-400'
                              }`}>
                                {new Date(task.due_date).toLocaleDateString('tr-TR')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {task.comments.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <MessageSquare className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400">
                                {task.comments.length}
                              </span>
                            </div>
                          )}
                          {task.attachments.length > 0 && (
                            <div className="flex items-center space-x-1">
                              <Paperclip className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400">
                                {task.attachments.length}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          {task.status === 'pending' && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleCompleteTask(task.id)
                              }}
                            >
                              <CheckCircle className="w-3 h-3" />
                            </Button>
                          )}
                          
                          {task.status === 'in_progress' && (
                            <>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleCompleteTask(task.id)
                                }}
                              >
                                <CheckCircle className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="secondary"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleRejectTask(task.id, 'Kullanıcı tarafından reddedildi')
                                }}
                              >
                                <XCircle className="w-3 h-3" />
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        ))}
      </div>

      {/* Task Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedTask && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">
                  {selectedTask.title}
                </h3>
                <Button
                  variant="secondary"
                  onClick={() => setShowDetailsModal(false)}
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Açıklama
                  </label>
                  <p className="text-gray-400">
                    {selectedTask.description || 'Açıklama yok'}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Durum
                    </label>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedTask.status)}
                      <span className={getStatusColor(selectedTask.status)}>
                        {getStatusLabel(selectedTask.status)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Öncelik
                    </label>
                    <div className="flex items-center space-x-2">
                      {getPriorityIcon(selectedTask.priority)}
                      <span className={getPriorityColor(selectedTask.priority)}>
                        {getPriorityLabel(selectedTask.priority)}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Atanan Kişi
                    </label>
                    <p className="text-gray-400">
                      {selectedTask.assignee_name || 'Atanmamış'}
                    </p>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Son Tarih
                    </label>
                    <p className={`text-gray-400 ${
                      isOverdue(selectedTask.due_date) && selectedTask.status !== 'completed' 
                        ? 'text-orange-400' 
                        : ''
                    }`}>
                      {selectedTask.due_date 
                        ? new Date(selectedTask.due_date).toLocaleDateString('tr-TR')
                        : 'Belirtilmemiş'
                      }
                    </p>
                  </div>
                </div>
                
                {/* Comments */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Yorumlar ({selectedTask.comments.length})
                  </label>
                  <div className="space-y-2">
                    {selectedTask.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-white">
                            {comment.user_name}
                          </span>
                          <span className="text-xs text-gray-400">
                            {new Date(comment.created_at).toLocaleDateString('tr-TR')}
                          </span>
                        </div>
                        <p className="text-sm text-gray-300">{comment.content}</p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-3 flex items-center space-x-2">
                    <Input
                      placeholder="Yorum ekle..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      className="flex-1"
                    />
                    <Button
                      onClick={() => handleAddComment(selectedTask.id)}
                      disabled={!comment.trim()}
                    >
                      <MessageSquare className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Attachments */}
                {selectedTask.attachments.length > 0 && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Ekler ({selectedTask.attachments.length})
                    </label>
                    <div className="space-y-2">
                      {selectedTask.attachments.map((attachment) => (
                        <div key={attachment.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Paperclip className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-white">{attachment.name}</span>
                            <span className="text-xs text-gray-400">
                              ({(attachment.file_size / 1024).toFixed(1)} KB)
                            </span>
                          </div>
                          <Button variant="secondary" size="sm">
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Actions */}
                <div className="flex items-center space-x-3 pt-4 border-t border-gray-700">
                  {selectedTask.status === 'pending' && (
                    <Button
                      onClick={() => handleCompleteTask(selectedTask.id)}
                      className="flex-1"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Tamamla
                    </Button>
                  )}
                  
                  {selectedTask.status === 'in_progress' && (
                    <>
                      <Button
                        onClick={() => handleCompleteTask(selectedTask.id)}
                        className="flex-1"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Tamamla
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => handleRejectTask(selectedTask.id, 'Kullanıcı tarafından reddedildi')}
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Reddet
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TaskManager
