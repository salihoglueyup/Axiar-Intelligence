import React, { useState, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Settings, Play, Pause, Trash2, Save, Copy, Eye, ArrowRight, ArrowDown, ArrowUp, ArrowLeft, Circle, Square, Diamond, Triangle, Check, X, Clock, Users, Mail, Database, Zap, FileText, BarChart3 } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useWorkflows, useWorkflowTemplates } from '@/hooks/useWorkflow'

const WorkflowBuilder = ({ className = '' }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingWorkflow, setEditingWorkflow] = useState(null)
  const [selectedStep, setSelectedStep] = useState(null)
  const [showTemplates, setShowTemplates] = useState(false)
  const [newWorkflow, setNewWorkflow] = useState({
    name: '',
    description: '',
    category: 'automation',
    priority: 'medium',
    is_active: true,
    is_public: false
  })
  
  const { workflows, createWorkflow, updateWorkflow, deleteWorkflow, executeWorkflow } = useWorkflows()
  const { templates, createWorkflowFromTemplate } = useWorkflowTemplates()
  
  const canvasRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [draggedStep, setDraggedStep] = useState(null)
  const [workflowSteps, setWorkflowSteps] = useState([])
  const [connections, setConnections] = useState([])

  const stepTypes = [
    { type: 'start', label: 'Başlat', icon: <Circle className="w-4 h-4" />, color: 'text-green-400' },
    { type: 'task', label: 'Görev', icon: <Square className="w-4 h-4" />, color: 'text-blue-400' },
    { type: 'decision', label: 'Karar', icon: <Diamond className="w-4 h-4" />, color: 'text-yellow-400' },
    { type: 'approval', label: 'Onay', icon: <Users className="w-4 h-4" />, color: 'text-purple-400' },
    { type: 'notification', label: 'Bildirim', icon: <Mail className="w-4 h-4" />, color: 'text-cyan-400' },
    { type: 'integration', label: 'Entegrasyon', icon: <Database className="w-4 h-4" />, color: 'text-orange-400' },
    { type: 'delay', label: 'Gecikme', icon: <Clock className="w-4 h-4" />, color: 'text-gray-400' },
    { type: 'end', label: 'Bitir', icon: <Circle className="w-4 h-4" />, color: 'text-red-400' }
  ]

  const categories = [
    { value: 'approval', label: 'Onay', color: 'text-purple-400' },
    { value: 'notification', label: 'Bildirim', color: 'text-cyan-400' },
    { value: 'data_processing', label: 'Veri İşleme', color: 'text-blue-400' },
    { value: 'integration', label: 'Entegrasyon', color: 'text-orange-400' },
    { value: 'automation', label: 'Otomasyon', color: 'text-green-400' },
    { value: 'custom', label: 'Özel', color: 'text-gray-400' }
  ]

  const priorities = [
    { value: 'low', label: 'Düşük', color: 'text-gray-400' },
    { value: 'medium', label: 'Orta', color: 'text-yellow-400' },
    { value: 'high', label: 'Yüksek', color: 'text-orange-400' },
    { value: 'critical', label: 'Kritik', color: 'text-red-400' }
  ]

  const handleCreateWorkflow = async () => {
    try {
      const workflow = await createWorkflow({
        ...newWorkflow,
        steps: workflowSteps,
        variables: [],
        settings: {
          auto_start: false,
          max_concurrent_executions: 1,
          execution_timeout: 3600,
          notification_settings: {
            on_start: true,
            on_complete: true,
            on_error: true,
            on_approval: true,
            recipients: []
          },
          logging_settings: {
            log_level: 'info',
            log_execution_steps: true,
            log_variables: false,
            retention_days: 30
          },
          security_settings: {
            require_authentication: true,
            allowed_roles: [],
            ip_whitelist: [],
            encryption_enabled: true
          }
        },
        trigger: {
          type: 'manual',
          config: {}
        },
        version: 1,
        execution_count: 0,
        tags: []
      })
      
      setNewWorkflow({ name: '', description: '', category: 'automation', priority: 'medium', is_active: true, is_public: false })
      setShowCreateModal(false)
      setWorkflowSteps([])
      setConnections([])
    } catch (error) {
      console.error('Failed to create workflow:', error)
    }
  }

  const handleUpdateWorkflow = async (id, data) => {
    try {
      await updateWorkflow(id, {
        ...data,
        steps: workflowSteps,
        connections
      })
      setEditingWorkflow(null)
    } catch (error) {
      console.error('Failed to update workflow:', error)
    }
  }

  const handleDeleteWorkflow = async (id) => {
    if (!confirm('Bu workflow\'u silmek istediğinizden emin misiniz?')) return
    
    try {
      await deleteWorkflow(id)
    } catch (error) {
      console.error('Failed to delete workflow:', error)
    }
  }

  const handleExecuteWorkflow = async (id) => {
    try {
      await executeWorkflow(id)
    } catch (error) {
      console.error('Failed to execute workflow:', error)
    }
  }

  const addStep = (type, position) => {
    const newStep = {
      id: `step_${Date.now()}`,
      name: `${stepTypes.find(s => s.type === type)?.label || 'Adım'} ${workflowSteps.length + 1}`,
      type,
      position,
      config: {},
      connections: [],
      conditions: [],
      timeout: 300,
      retry_count: 3,
      error_handling: {
        strategy: 'retry',
        retry_count: 3,
        retry_delay: 60,
        fallback_step_id: null,
        error_notification: true
      }
    }
    
    setWorkflowSteps([...workflowSteps, newStep])
  }

  const updateStep = (stepId, updates) => {
    setWorkflowSteps(workflowSteps.map(step => 
      step.id === stepId ? { ...step, ...updates } : step
    ))
  }

  const deleteStep = (stepId) => {
    setWorkflowSteps(workflowSteps.filter(step => step.id !== stepId))
    setConnections(connections.filter(conn => 
      conn.from_step_id !== stepId && conn.to_step_id !== stepId
    ))
    if (selectedStep?.id === stepId) {
      setSelectedStep(null)
    }
  }

  const addConnection = (fromStepId, toStepId) => {
    const existingConnection = connections.find(conn => 
      conn.from_step_id === fromStepId && conn.to_step_id === toStepId
    )
    
    if (!existingConnection) {
      const newConnection = {
        id: `conn_${Date.now()}`,
        from_step_id: fromStepId,
        to_step_id: toStepId,
        condition: null,
        label: ''
      }
      setConnections([...connections, newConnection])
    }
  }

  const getCategoryColor = (category) => {
    const found = categories.find(c => c.value === category)
    return found ? found.color : 'text-gray-400'
  }

  const getCategoryLabel = (category) => {
    const found = categories.find(c => c.value === category)
    return found ? found.label : category
  }

  const getPriorityColor = (priority) => {
    const found = priorities.find(p => p.value === priority)
    return found ? found.color : 'text-gray-400'
  }

  const getPriorityLabel = (priority) => {
    const found = priorities.find(p => p.value === priority)
    return found ? found.label : priority
  }

  const getStepTypeInfo = (type) => {
    return stepTypes.find(s => s.type === type) || stepTypes[0]
  }

  const handleCanvasClick = (e) => {
    if (!isDragging) {
      const rect = canvasRef.current?.getBoundingClientRect()
      if (rect) {
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        // Show step type selector at clicked position
      }
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Settings className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-white">Workflow Builder</h2>
          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
            {workflows.length} workflow
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={() => setShowTemplates(true)}>
            <FileText className="w-4 h-4 mr-2" />
            Şablonlar
          </Button>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Yeni Workflow
          </Button>
        </div>
      </div>

      {/* Workflow Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Workflow List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-semibold text-white mb-4">Workflowlar</h3>
          
          {workflows.map((workflow) => (
            <motion.div
              key={workflow.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card glass className="p-4 hover:border-cyan-500/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium text-white mb-1">{workflow.name}</h4>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                      {workflow.description}
                    </p>
                    <div className="flex items-center space-x-2">
                      <span className={`text-xs ${getCategoryColor(workflow.category)}`}>
                        {getCategoryLabel(workflow.category)}
                      </span>
                      <span className={`text-xs ${getPriorityColor(workflow.priority)}`}>
                        {getPriorityLabel(workflow.priority)}
                      </span>
                      <span className={`text-xs ${workflow.is_active ? 'text-green-400' : 'text-gray-400'}`}>
                        {workflow.is_active ? 'Aktif' : 'Pasif'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                  <span>{workflow.steps?.length || 0} adım</span>
                  <span>{workflow.execution_count} çalıştırma</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleExecuteWorkflow(workflow.id)}
                    disabled={!workflow.is_active}
                  >
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setEditingWorkflow(workflow)}
                  >
                    <Eye className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleDeleteWorkflow(workflow.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Workflow Canvas */}
        <div className="lg:col-span-2">
          <Card glass className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Workflow Tasarım</h3>
              <div className="flex items-center space-x-2">
                <Button variant="secondary" size="sm">
                  <Save className="w-4 h-4 mr-2" />
                  Kaydet
                </Button>
                <Button variant="secondary" size="sm">
                  <Copy className="w-4 h-4 mr-2" />
                  Kopyala
                </Button>
              </div>
            </div>

            {/* Step Type Palette */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                {stepTypes.map((stepType) => (
                  <button
                    key={stepType.type}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-lg border border-gray-600 hover:border-cyan-500/50 transition-colors ${stepType.color}`}
                    onClick={() => addStep(stepType.type, { x: 100, y: 100 })}
                  >
                    {stepType.icon}
                    <span className="text-xs text-white">{stepType.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Canvas */}
            <div
              ref={canvasRef}
              className="relative h-96 bg-gray-800/30 rounded-lg border border-gray-700 overflow-hidden"
              onClick={handleCanvasClick}
            >
              {/* Grid Background */}
              <div className="absolute inset-0 opacity-10">
                <div className="grid grid-cols-12 grid-rows-12 h-full">
                  {Array.from({ length: 144 }).map((_, i) => (
                    <div key={i} className="border border-gray-600" />
                  ))}
                </div>
              </div>

              {/* Workflow Steps */}
              {workflowSteps.map((step) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute p-3 rounded-lg border-2 cursor-move ${
                    selectedStep?.id === step.id 
                      ? 'border-cyan-500 bg-cyan-500/20' 
                      : 'border-gray-600 bg-gray-800/50 hover:border-cyan-500/50'
                  }`}
                  style={{
                    left: `${step.position.x}px`,
                    top: `${step.position.y}px`,
                    minWidth: '120px'
                  }}
                  onClick={() => setSelectedStep(step)}
                  draggable
                  onDragStart={() => {
                    setIsDragging(true)
                    setDraggedStep(step)
                  }}
                  onDragEnd={(e) => {
                    const rect = canvasRef.current?.getBoundingClientRect()
                    if (rect) {
                      const x = e.clientX - rect.left - 60
                      const y = e.clientY - rect.top - 30
                      updateStep(step.id, { position: { x, y } })
                    }
                    setIsDragging(false)
                    setDraggedStep(null)
                  }}
                >
                  <div className="flex items-center space-x-2">
                    <div className={getStepTypeInfo(step.type).color}>
                      {getStepTypeInfo(step.type).icon}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-white">
                        {step.name}
                      </div>
                      <div className="text-xs text-gray-400">
                        {getStepTypeInfo(step.type).label}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Connections */}
              <svg className="absolute inset-0 pointer-events-none">
                {connections.map((connection) => {
                  const fromStep = workflowSteps.find(s => s.id === connection.from_step_id)
                  const toStep = workflowSteps.find(s => s.id === connection.to_step_id)
                  
                  if (!fromStep || !toStep) return null
                  
                  const x1 = fromStep.position.x + 60
                  const y1 = fromStep.position.y + 30
                  const x2 = toStep.position.x + 60
                  const y2 = toStep.position.y + 30
                  
                  return (
                    <g key={connection.id}>
                      <line
                        x1={x1}
                        y1={y1}
                        x2={x2}
                        y2={y2}
                        stroke="#06b6d4"
                        strokeWidth="2"
                        markerEnd="url(#arrowhead)"
                      />
                      <text
                        x={(x1 + x2) / 2}
                        y={(y1 + y2) / 2}
                        fill="#06b6d4"
                        fontSize="12"
                        textAnchor="middle"
                      >
                        {connection.label}
                      </text>
                    </g>
                  )
                })}
                
                {/* Arrow marker definition */}
                <defs>
                  <marker
                    id="arrowhead"
                    markerWidth="10"
                    markerHeight="10"
                    refX="9"
                    refY="3"
                    orient="auto"
                  >
                    <polygon
                      points="0 0, 10 3, 0 6"
                      fill="#06b6d4"
                    />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Step Properties Panel */}
            {selectedStep && (
              <div className="mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-white">Adım Özellikleri</h4>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => deleteStep(selectedStep.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <Input
                    label="Adım Adı"
                    value={selectedStep.name}
                    onChange={(e) => updateStep(selectedStep.id, { name: e.target.value })}
                    size="sm"
                  />
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Adım Tipi
                    </label>
                    <div className="flex items-center space-x-2">
                      <div className={getStepTypeInfo(selectedStep.type).color}>
                        {getStepTypeInfo(selectedStep.type).icon}
                      </div>
                      <span className="text-sm text-white">
                        {getStepTypeInfo(selectedStep.type).label}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      Timeout (saniye)
                    </label>
                    <Input
                      type="number"
                      value={selectedStep.timeout}
                      onChange={(e) => updateStep(selectedStep.id, { timeout: parseInt(e.target.value) })}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>

      {/* Create Workflow Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Yeni Workflow</h3>
              
              <div className="space-y-4">
                <Input
                  label="Workflow Adı"
                  value={newWorkflow.name}
                  onChange={(e) => setNewWorkflow({ ...newWorkflow, name: e.target.value })}
                  placeholder="Workflow adını girin"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={newWorkflow.description}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, description: e.target.value })}
                    placeholder="Workflow açıklamasını girin"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Kategori
                  </label>
                  <select
                    value={newWorkflow.category}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  >
                    {categories.map(category => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Öncelik
                  </label>
                  <select
                    value={newWorkflow.priority}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, priority: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  >
                    {priorities.map(priority => (
                      <option key={priority.value} value={priority.value}>
                        {priority.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="is_active"
                    checked={newWorkflow.is_active}
                    onChange={(e) => setNewWorkflow({ ...newWorkflow, is_active: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <label htmlFor="is_active" className="text-sm text-gray-300">
                    Workflow'u aktif et
                  </label>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleCreateWorkflow}
                  disabled={!newWorkflow.name.trim()}
                  className="flex-1"
                >
                  Oluştur
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowTemplates(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-4xl max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Workflow Şablonları</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card glass key={template.id} className="p-4 hover:border-cyan-500/50 transition-colors">
                    <div className="mb-3">
                      <h4 className="font-medium text-white mb-1">{template.name}</h4>
                      <p className="text-sm text-gray-400 line-clamp-2">{template.description}</p>
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-3">
                      <span className={`text-xs ${getCategoryColor(template.category)}`}>
                        {getCategoryLabel(template.category)}
                      </span>
                      <span className="text-xs text-gray-400">
                        {template.usage_count} kullanım
                      </span>
                    </div>
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        createWorkflowFromTemplate(template.id, {
                          name: `${template.name} (Kopya)`,
                          description: template.description
                        })
                        setShowTemplates(false)
                      }}
                    >
                      Şablonu Kullan
                    </Button>
                  </Card>
                ))}
              </div>
              
              <div className="flex items-center justify-center mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowTemplates(false)}
                >
                  Kapat
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default WorkflowBuilder
