import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Play, Pause, Settings, Trash2, Eye, Edit, Copy, Download, Upload, Brain, Cpu, Zap, TrendingUp, CheckCircle, XCircle, Clock, AlertCircle, BarChart3, Activity, Database, Code, Globe } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { useModels, getModelStatusColor, getModelStatusLabel, getModelTypeIcon, getFrameworkLabel } from '@/hooks/useAI'

const ModelManager = ({ className = '' }) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showTrainingModal, setShowTrainingModal] = useState(false)
  const [showDeployModal, setShowDeployModal] = useState(false)
  const [selectedModel, setSelectedModel] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [frameworkFilter, setFrameworkFilter] = useState('all')
  
  const { models, createModel, updateModel, deleteModel, trainModel, deployModel, undeployModel } = useModels()

  const statusOptions = [
    { value: 'all', label: 'Tümü', color: 'text-gray-400' },
    { value: 'draft', label: 'Taslak', color: 'text-gray-400' },
    { value: 'training', label: 'Eğitiliyor', color: 'text-blue-400' },
    { value: 'trained', label: 'Eğitildi', color: 'text-green-400' },
    { value: 'testing', label: 'Test Ediyor', color: 'text-yellow-400' },
    { value: 'deployed', label: 'Dağıtıldı', color: 'text-cyan-400' },
    { value: 'failed', label: 'Başarısız', color: 'text-red-400' },
    { value: 'archived', label: 'Arşivlendi', color: 'text-gray-500' }
  ]

  const typeOptions = [
    { value: 'all', label: 'Tümü', icon: '🤖' },
    { value: 'classification', label: 'Sınıflandırma', icon: '🎯' },
    { value: 'regression', label: 'Regresyon', icon: '📈' },
    { value: 'clustering', label: 'Kümeleme', icon: '🔗' },
    { value: 'anomaly_detection', label: 'Anomali Tespiti', icon: '⚠️' },
    { value: 'recommendation', label: 'Tavsiye', icon: '💡' },
    { value: 'nlp', label: 'Doğal Dil İşleme', icon: '📝' },
    { value: 'computer_vision', label: 'Bilgisayarlı Görü', icon: '👁️' },
    { value: 'time_series', label: 'Zaman Serisi', icon: '⏰' }
  ]

  const frameworkOptions = [
    { value: 'all', label: 'Tümü' },
    { value: 'tensorflow', label: 'TensorFlow' },
    { value: 'pytorch', label: 'PyTorch' },
    { value: 'scikit_learn', label: 'Scikit-Learn' },
    { value: 'xgboost', label: 'XGBoost' },
    { value: 'lightgbm', label: 'LightGBM' },
    { value: 'huggingface', label: 'Hugging Face' },
    { value: 'openai', label: 'OpenAI' },
    { value: 'anthropic', label: 'Anthropic' }
  ]

  const [newModel, setNewModel] = useState({
    name: '',
    description: '',
    type: 'classification',
    category: 'business',
    framework: 'tensorflow',
    version: '1.0.0',
    is_public: false
  })

  const [trainingConfig, setTrainingConfig] = useState({
    algorithm: 'adam',
    learning_rate: 0.001,
    batch_size: 32,
    epochs: 100,
    validation_split: 0.2
  })

  const [deployConfig, setDeployConfig] = useState({
    environment: 'production',
    auto_scaling: true,
    min_instances: 1,
    max_instances: 5
  })

  const handleCreateModel = async () => {
    try {
      await createModel({
        ...newModel,
        config: {
          architecture: {
            layers: [],
            input_shape: [],
            output_shape: [],
            parameters_count: 0,
            model_size_mb: 0
          },
          hyperparameters: {},
          preprocessing: {
            normalization: true,
            standardization: false,
            feature_scaling: 'min_max',
            missing_value_handling: 'mean',
            categorical_encoding: 'one_hot',
            text_preprocessing: {
              tokenization: 'word',
              stop_word_removal: true,
              stemming: false,
              lemmatization: false,
              lowercase: true,
              max_length: 512
            },
            image_preprocessing: {
              resize: { width: 224, height: 224, maintain_aspect_ratio: true, interpolation: 'bilinear' },
              normalization: true,
              augmentation: {},
              color_mode: 'rgb'
            }
          },
          postprocessing: {
            output_format: 'probability',
            confidence_threshold: 0.5
          },
          training_config: trainingConfig,
          inference_config: {
            batch_size: 1,
            max_concurrent_requests: 10,
            timeout_ms: 5000,
            cache_enabled: true,
            cache_ttl_seconds: 300,
            fallback_strategy: 'return_default'
          },
          resource_limits: {
            max_memory_mb: 1024,
            max_cpu_cores: 2,
            max_gpu_memory_mb: 2048,
            max_concurrent_inferences: 5,
            max_request_size_mb: 10,
            max_response_size_mb: 10
          }
        },
        metrics: {
          training_metrics: {
            training_loss: [],
            validation_loss: [],
            training_accuracy: [],
            validation_accuracy: [],
            epochs_trained: 0,
            training_time_seconds: 0,
            best_epoch: 0,
            best_val_loss: 0,
            best_val_accuracy: 0
          },
          inference_metrics: {
            avg_inference_time_ms: 0,
            p95_inference_time_ms: 0,
            p99_inference_time_ms: 0,
            requests_per_second: 0,
            error_rate: 0,
            cache_hit_rate: 0
          }
        },
        training_data: {
          source: {
            type: 'database'
          },
          preprocessing_steps: [],
          training_samples: 0,
          validation_samples: 0,
          test_samples: 0,
          feature_count: 0,
          data_quality_score: 0,
          last_updated: new Date().toISOString()
        },
        deployment: {
          environment: 'development',
          endpoint_config: {
            url: '',
            method: 'POST',
            authentication: {
              type: 'api_key',
              api_key_required: true,
              jwt_required: false,
              oauth_required: false,
              custom_auth: {}
            },
            rate_limiting: {
              enabled: true,
              requests_per_minute: 60,
              requests_per_hour: 1000,
              requests_per_day: 10000,
              burst_size: 10
            },
            cors_config: {
              enabled: true,
              allowed_origins: ['*'],
              allowed_methods: ['GET', 'POST'],
              allowed_headers: ['*'],
              max_age: 86400
            },
            request_validation: {
              schema: { type: 'json_schema', schema: {} },
              strict_mode: false,
              sanitize_input: true
            },
            response_format: {
              format: 'json',
              include_metadata: true,
              include_confidence: true,
              include_explanations: false
            }
          },
          scaling_config: {
            auto_scaling: false,
            min_instances: 1,
            max_instances: 1,
            target_cpu_utilization: 70,
            target_memory_utilization: 80,
            scale_up_cooldown: 300,
            scale_down_cooldown: 300
          },
          monitoring_config: {
            metrics_enabled: true,
            logging_enabled: true,
            tracing_enabled: false,
            alerting_enabled: false,
            health_check_enabled: true,
            custom_metrics: []
          },
          security_config: {
            encryption_enabled: true,
            input_validation: true,
            output_sanitization: false,
            audit_logging: true,
            ip_whitelist: [],
            rate_limiting_enabled: true
          },
          version: '1.0.0',
          rollback_config: {
            enabled: false,
            automatic_rollback: false,
            rollback_threshold: 0.5,
            rollback_window: 3600,
            max_rollback_attempts: 3
          }
        },
        version: 1,
        usage_count: 0,
        tags: []
      })
      
      setNewModel({ name: '', description: '', type: 'classification', category: 'business', framework: 'tensorflow', version: '1.0.0', is_public: false })
      setShowCreateModal(false)
    } catch (error) {
      console.error('Failed to create model:', error)
    }
  }

  const handleTrainModel = async (modelId) => {
    try {
      await trainModel(modelId, trainingConfig)
      setShowTrainingModal(false)
    } catch (error) {
      console.error('Failed to train model:', error)
    }
  }

  const handleDeployModel = async (modelId) => {
    try {
      await deployModel(modelId, deployConfig)
      setShowDeployModal(false)
    } catch (error) {
      console.error('Failed to deploy model:', error)
    }
  }

  const handleDeleteModel = async (modelId) => {
    if (!confirm('Bu modeli silmek istediğinizden emin misiniz?')) return
    
    try {
      await deleteModel(modelId)
    } catch (error) {
      console.error('Failed to delete model:', error)
    }
  }

  const filteredModels = models.filter(model => {
    const matchesSearch = model.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         model.description?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || model.status === statusFilter
    const matchesType = typeFilter === 'all' || model.type === typeFilter
    const matchesFramework = frameworkFilter === 'all' || model.framework === frameworkFilter
    
    return matchesSearch && matchesStatus && matchesType && matchesFramework
  })

  const getModelTypeColor = (type) => {
    const found = typeOptions.find(t => t.value === type)
    return found ? 'text-gray-400' : 'text-gray-400'
  }

  const getModelTypeLabel = (type) => {
    const found = typeOptions.find(t => t.value === type)
    return found ? found.label : type
  }

  const getFrameworkColor = (framework) => {
    switch (framework) {
      case 'tensorflow':
        return 'text-orange-400'
      case 'pytorch':
        return 'text-red-400'
      case 'scikit_learn':
        return 'text-blue-400'
      case 'xgboost':
        return 'text-green-400'
      case 'lightgbm':
        return 'text-yellow-400'
      case 'huggingface':
        return 'text-purple-400'
      case 'openai':
        return 'text-cyan-400'
      case 'anthropic':
        return 'text-pink-400'
      default:
        return 'text-gray-400'
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-white">Model Yönetimi</h2>
          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 text-sm rounded-full">
            {models.length} model
          </span>
        </div>
        
        <Button onClick={() => setShowCreateModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Yeni Model
        </Button>
      </div>

      {/* Filters */}
      <Card glass className="p-4">
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <Input
              placeholder="Model ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          
          <select
            value={frameworkFilter}
            onChange={(e) => setFrameworkFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
          >
            {frameworkOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </Card>

      {/* Model Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredModels.map((model) => (
          <motion.div
            key={model.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card glass className="p-6 hover:border-cyan-500/50 transition-colors">
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg">{getModelTypeIcon(model.type)}</span>
                    <h3 className="text-lg font-semibold text-white">
                      {model.name}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-400 line-clamp-2 mb-3">
                    {model.description}
                  </p>
                  
                  <div className="flex items-center space-x-2 mb-3">
                    <span className={`px-2 py-1 text-xs rounded-full ${getModelStatusColor(model.status)} bg-opacity-20`}>
                      {getModelStatusLabel(model.status)}
                    </span>
                    <span className={`text-xs ${getFrameworkColor(model.framework)}`}>
                      {getFrameworkLabel(model.framework)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Model Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Tip</span>
                  <span className="text-white">{getModelTypeLabel(model.type)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Versiyon</span>
                  <span className="text-white">{model.version}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Kullanım</span>
                  <span className="text-white">{model.usage_count}</span>
                </div>
                {model.last_used_at && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Son Kullanım</span>
                    <span className="text-white">
                      {new Date(model.last_used_at).toLocaleDateString('tr-TR')}
                    </span>
                  </div>
                )}
              </div>

              {/* Metrics */}
              {model.metrics && (
                <div className="pt-3 border-t border-gray-700 mb-4">
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {model.metrics.accuracy && (
                      <div className="text-center">
                        <div className="text-green-400 font-semibold">
                          {(model.metrics.accuracy * 100).toFixed(1)}%
                        </div>
                        <div className="text-gray-400">Doğruluk</div>
                      </div>
                    )}
                    {model.metrics.training_metrics && (
                      <div className="text-center">
                        <div className="text-blue-400 font-semibold">
                          {model.metrics.training_metrics.best_val_accuracy 
                            ? (model.metrics.training_metrics.best_val_accuracy * 100).toFixed(1) + '%'
                            : '-'
                          }
                        </div>
                        <div className="text-gray-400">Val. Doğruluk</div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {model.status === 'trained' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedModel(model)
                      setShowTrainingModal(true)
                    }}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
                
                {model.status === 'trained' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => {
                      setSelectedModel(model)
                      setShowDeployModal(true)
                    }}
                  >
                    <Globe className="w-4 h-4" />
                  </Button>
                )}
                
                {model.status === 'deployed' && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => undeployModel(model.id)}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                )}
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setSelectedModel(model)}
                >
                  <Eye className="w-4 h-4" />
                </Button>
                
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleDeleteModel(model.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}

        {/* Create New Model Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card 
            glass 
            className="p-6 border-2 border-dashed border-gray-600 hover:border-cyan-500/50 transition-colors cursor-pointer"
            onClick={() => setShowCreateModal(true)}
          >
            <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
              <Plus className="w-12 h-12 text-cyan-400 mb-4" />
              <h3 className="text-lg font-semibold text-white mb-2">Yeni Model</h3>
              <p className="text-sm text-gray-400">
                AI/ML modeli oluşturun
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Create Model Modal */}
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
              <h3 className="text-xl font-semibold text-white mb-4">Yeni Model</h3>
              
              <div className="space-y-4">
                <Input
                  label="Model Adı"
                  value={newModel.name}
                  onChange={(e) => setNewModel({ ...newModel, name: e.target.value })}
                  placeholder="Model adını girin"
                />
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    value={newModel.description}
                    onChange={(e) => setNewModel({ ...newModel, description: e.target.value })}
                    placeholder="Model açıklamasını girin"
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
                    rows={3}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Model Tipi
                  </label>
                  <select
                    value={newModel.type}
                    onChange={(e) => setNewModel({ ...newModel, type: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  >
                    {typeOptions.slice(1).map(type => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Framework
                  </label>
                  <select
                    value={newModel.framework}
                    onChange={(e) => setNewModel({ ...newModel, framework: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  >
                    {frameworkOptions.slice(1).map(framework => (
                      <option key={framework.value} value={framework.value}>
                        {framework.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Versiyon
                  </label>
                  <Input
                    value={newModel.version}
                    onChange={(e) => setNewModel({ ...newModel, version: e.target.value })}
                    placeholder="1.0.0"
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="is_public"
                    checked={newModel.is_public}
                    onChange={(e) => setNewModel({ ...newModel, is_public: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <label htmlFor="is_public" className="text-sm text-gray-300">
                    Modeli herkese açık yap
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
                  onClick={handleCreateModel}
                  disabled={!newModel.name.trim()}
                  className="flex-1"
                >
                  Oluştur
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Training Modal */}
      <AnimatePresence>
        {showTrainingModal && selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowTrainingModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Model Eğitimi</h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Model</div>
                  <div className="font-medium text-white">{selectedModel.name}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Algoritma
                  </label>
                  <select
                    value={trainingConfig.algorithm}
                    onChange={(e) => setTrainingConfig({ ...trainingConfig, algorithm: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="adam">Adam</option>
                    <option value="sgd">SGD</option>
                    <option value="rmsprop">RMSprop</option>
                    <option value="adagrad">AdaGrad</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Öğrenme Oranı
                  </label>
                  <Input
                    type="number"
                    step="0.001"
                    value={trainingConfig.learning_rate}
                    onChange={(e) => setTrainingConfig({ ...trainingConfig, learning_rate: parseFloat(e.target.value) })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Batch Boyutu
                  </label>
                  <Input
                    type="number"
                    value={trainingConfig.batch_size}
                    onChange={(e) => setTrainingConfig({ ...trainingConfig, batch_size: parseInt(e.target.value) })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Epoch Sayısı
                  </label>
                  <Input
                    type="number"
                    value={trainingConfig.epochs}
                    onChange={(e) => setTrainingConfig({ ...trainingConfig, epochs: parseInt(e.target.value) })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Validation Split
                  </label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="1"
                    value={trainingConfig.validation_split}
                    onChange={(e) => setTrainingConfig({ ...trainingConfig, validation_split: parseFloat(e.target.value) })}
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowTrainingModal(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={() => handleTrainModel(selectedModel.id)}
                  className="flex-1"
                >
                  Eğitimi Başlat
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deploy Modal */}
      <AnimatePresence>
        {showDeployModal && selectedModel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowDeployModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Model Dağıtımı</h3>
              
              <div className="space-y-4">
                <div className="p-3 bg-gray-800/50 rounded-lg">
                  <div className="text-sm text-gray-400 mb-1">Model</div>
                  <div className="font-medium text-white">{selectedModel.name}</div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Ortam
                  </label>
                  <select
                    value={deployConfig.environment}
                    onChange={(e) => setDeployConfig({ ...deployConfig, environment: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
                  >
                    <option value="development">Development</option>
                    <option value="staging">Staging</option>
                    <option value="production">Production</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Min. Instance
                  </label>
                  <Input
                    type="number"
                    value={deployConfig.min_instances}
                    onChange={(e) => setDeployConfig({ ...deployConfig, min_instances: parseInt(e.target.value) })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Max. Instance
                  </label>
                  <Input
                    type="number"
                    value={deployConfig.max_instances}
                    onChange={(e) => setDeployConfig({ ...deployConfig, max_instances: parseInt(e.target.value) })}
                  />
                </div>
                
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id="auto_scaling"
                    checked={deployConfig.auto_scaling}
                    onChange={(e) => setDeployConfig({ ...deployConfig, auto_scaling: e.target.checked })}
                    className="rounded border-gray-600 bg-gray-800 text-cyan-500 focus:ring-cyan-500"
                  />
                  <label htmlFor="auto_scaling" className="text-sm text-gray-300">
                    Otomatik ölçeklendirme
                  </label>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowDeployModal(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={() => handleDeployModel(selectedModel.id)}
                  className="flex-1"
                >
                  Dağıt
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ModelManager
