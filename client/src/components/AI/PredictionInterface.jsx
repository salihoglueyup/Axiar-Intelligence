import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Brain, Zap, TrendingUp, Activity, BarChart3, PieChart, LineChart, Target, AlertCircle, CheckCircle, Clock, RefreshCw, Download, Upload, FileText, Image, Database, Globe } from 'lucide-react'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import { usePredictions, useModels } from '@/hooks/useAI'

const PredictionInterface = ({ className = '' }) => {
  const [selectedModel, setSelectedModel] = useState(null)
  const [inputData, setInputData] = useState({})
  const [prediction, setPrediction] = useState(null)
  const [isPredicting, setIsPredicting] = useState(false)
  const [showBatchModal, setShowBatchModal] = useState(false)
  const [batchData, setBatchData] = useState('')
  const [batchPredictions, setBatchPredictions] = useState([])
  
  const { models, predict, batchPredict } = usePredictions()

  useEffect(() => {
    // Select first deployed model by default
    const deployedModel = models.find(m => m.status === 'deployed')
    if (deployedModel) {
      setSelectedModel(deployedModel)
    }
  }, [models])

  const handlePredict = async () => {
    if (!selectedModel || Object.keys(inputData).length === 0) return
    
    setIsPredicting(true)
    try {
      const result = await predict(selectedModel.id, inputData)
      setPrediction(result)
    } catch (error) {
      console.error('Prediction failed:', error)
    } finally {
      setIsPredicting(false)
    }
  }

  const handleBatchPredict = async () => {
    if (!selectedModel || !batchData.trim()) return
    
    try {
      const lines = batchData.trim().split('\n')
      const data = lines.map(line => {
        try {
          return JSON.parse(line)
        } catch {
          return { text: line }
        }
      })
      
      const results = await batchPredict(selectedModel.id, data)
      setBatchPredictions(results)
      setShowBatchModal(false)
      setBatchData('')
    } catch (error) {
      console.error('Batch prediction failed:', error)
    }
  }

  const getModelIcon = (type) => {
    switch (type) {
      case 'classification':
        return <Target className="w-4 h-4" />
      case 'regression':
        return <TrendingUp className="w-4 h-4" />
      case 'clustering':
        return <Activity className="w-4 h-4" />
      case 'anomaly_detection':
        return <AlertCircle className="w-4 h-4" />
      case 'recommendation':
        return <Brain className="w-4 h-4" />
      case 'nlp':
        return <FileText className="w-4 h-4" />
      case 'computer_vision':
        return <Image className="w-4 h-4" />
      case 'time_series':
        return <LineChart className="w-4 h-4" />
      default:
        return <Brain className="w-4 h-4" />
    }
  }

  const renderInputFields = () => {
    if (!selectedModel) return null

    switch (selectedModel.type) {
      case 'classification':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Özellik 1
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="Değer girin"
                value={inputData.feature1 || ''}
                onChange={(e) => setInputData({ ...inputData, feature1: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Özellik 2
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="Değer girin"
                value={inputData.feature2 || ''}
                onChange={(e) => setInputData({ ...inputData, feature2: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Özellik 3
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="Değer girin"
                value={inputData.feature3 || ''}
                onChange={(e) => setInputData({ ...inputData, feature3: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        )
      
      case 'regression':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                X Değeri
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="X değeri girin"
                value={inputData.x || ''}
                onChange={(e) => setInputData({ ...inputData, x: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Y Değeri
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="Y değeri girin"
                value={inputData.y || ''}
                onChange={(e) => setInputData({ ...inputData, y: parseFloat(e.target.value) })}
              />
            </div>
          </div>
        )
      
      case 'nlp':
        return (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Metin
            </label>
            <textarea
              placeholder="Analiz edilecek metni girin"
              value={inputData.text || ''}
              onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none"
              rows={4}
            />
          </div>
        )
      
      case 'computer_vision':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Görüntü URL'si
              </label>
              <Input
                placeholder="Görüntü URL'sini girin"
                value={inputData.image_url || ''}
                onChange={(e) => setInputData({ ...inputData, image_url: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Veya Görüntü Yükle
              </label>
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-400">
                  Görüntü yüklemek için tıklayın veya sürükleyin
                </p>
              </div>
            </div>
          </div>
        )
      
      case 'anomaly_detection':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Veri Noktası
              </label>
              <Input
                type="number"
                step="0.01"
                placeholder="Veri noktası girin"
                value={inputData.data_point || ''}
                onChange={(e) => setInputData({ ...inputData, data_point: parseFloat(e.target.value) })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Zaman Damgası
              </label>
              <Input
                type="datetime-local"
                value={inputData.timestamp || ''}
                onChange={(e) => setInputData({ ...inputData, timestamp: e.target.value })}
              />
            </div>
          </div>
        )
      
      case 'recommendation':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Kullanıcı ID
              </label>
              <Input
                placeholder="Kullanıcı ID'sini girin"
                value={inputData.user_id || ''}
                onChange={(e) => setInputData({ ...inputData, user_id: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Ürün Kategorisi
              </label>
              <Input
                placeholder="Ürün kategorisini girin"
                value={inputData.category || ''}
                onChange={(e) => setInputData({ ...inputData, category: e.target.value })}
              />
            </div>
          </div>
        )
      
      default:
        return (
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Veri (JSON)
            </label>
            <textarea
              placeholder='{"key": "value"}'
              value={typeof inputData === 'string' ? inputData : JSON.stringify(inputData, null, 2)}
              onChange={(e) => {
                try {
                  const parsed = JSON.parse(e.target.value)
                  setInputData(parsed)
                } catch {
                  setInputData(e.target.value)
                }
              }}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none font-mono text-sm"
              rows={6}
            />
          </div>
        )
    }
  }

  const renderPredictionResult = () => {
    if (!prediction) return null

    switch (selectedModel?.type) {
      case 'classification':
        return (
          <div className="space-y-4">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="text-sm text-gray-400 mb-2">Tahmin Edilen Sınıf</div>
              <div className="text-2xl font-bold text-white">
                {prediction.output_data.class || 'N/A'}
              </div>
            </div>
            
            {prediction.output_data.probabilities && (
              <div className="space-y-2">
                <div className="text-sm text-gray-400">Olasılıklar</div>
                {Object.entries(prediction.output_data.probabilities).map(([className, probability]) => (
                  <div key={className} className="flex items-center justify-between">
                    <span className="text-sm text-white">{className}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-32 bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-cyan-500 h-2 rounded-full"
                          style={{ width: `${probability * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-white">
                        {(probability * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
      
      case 'regression':
        return (
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Tahmin Edilen Değer</div>
            <div className="text-2xl font-bold text-white">
              {prediction.output_data.value?.toFixed(2) || 'N/A'}
            </div>
            {prediction.output_data.confidence_interval && (
              <div className="text-sm text-gray-400 mt-2">
                %95 Güven Aralığı: [{prediction.output_data.confidence_interval[0]?.toFixed(2)}, {prediction.output_data.confidence_interval[1]?.toFixed(2)}]
              </div>
            )}
          </div>
        )
      
      case 'nlp':
        return (
          <div className="space-y-4">
            {prediction.output_data.sentiment && (
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Duygu Analizi</div>
                <div className="text-2xl font-bold text-white">
                  {prediction.output_data.sentiment}
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Güven: {((prediction.output_data.confidence || 0) * 100).toFixed(1)}%
                </div>
              </div>
            )}
            
            {prediction.output_data.entities && (
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Varlıklar</div>
                <div className="space-y-1">
                  {prediction.output_data.entities.map((entity, index) => (
                    <div key={index} className="text-sm text-white">
                      <span className="font-medium">{entity.text}</span>
                      <span className="text-gray-400 ml-2">({entity.type})</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )
      
      case 'computer_vision':
        return (
          <div className="space-y-4">
            {prediction.output_data.objects && (
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Tespit Edilen Nesneler</div>
                <div className="space-y-1">
                  {prediction.output_data.objects.map((object, index) => (
                    <div key={index} className="text-sm text-white">
                      <span className="font-medium">{object.class}</span>
                      <span className="text-gray-400 ml-2">
                        ({((object.confidence || 0) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {prediction.output_data.classification && (
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="text-sm text-gray-400 mb-2">Görüntü Sınıflandırması</div>
                <div className="text-2xl font-bold text-white">
                  {prediction.output_data.classification}
                </div>
                <div className="text-sm text-gray-400 mt-2">
                  Güven: {((prediction.output_data.confidence || 0) * 100).toFixed(1)}%
                </div>
              </div>
            )}
          </div>
        )
      
      case 'anomaly_detection':
        return (
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Anomali Durumu</div>
            <div className={`text-2xl font-bold ${
              prediction.output_data.is_anomaly ? 'text-red-400' : 'text-green-400'
            }`}>
              {prediction.output_data.is_anomaly ? 'Anomali Tespit Edildi' : 'Normal'}
            </div>
            <div className="text-sm text-gray-400 mt-2">
              Anomali Skoru: {((prediction.output_data.anomaly_score || 0) * 100).toFixed(1)}%
            </div>
          </div>
        )
      
      case 'recommendation':
        return (
          <div className="space-y-4">
            <div className="text-sm text-gray-400">Öneriler</div>
            {prediction.output_data.recommendations?.map((rec, index) => (
              <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                <div className="font-medium text-white">{rec.item}</div>
                <div className="text-sm text-gray-400">
                  Skor: {rec.score?.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        )
      
      default:
        return (
          <div className="p-4 bg-gray-800/50 rounded-lg">
            <div className="text-sm text-gray-400 mb-2">Tahmin Sonucu</div>
            <pre className="text-sm text-white font-mono">
              {JSON.stringify(prediction.output_data, null, 2)}
            </pre>
          </div>
        )
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Brain className="w-6 h-6 text-cyan-400" />
          <h2 className="text-2xl font-semibold text-white">AI Tahmin Arayüzü</h2>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="secondary" onClick={() => setShowBatchModal(true)}>
            <Database className="w-4 h-4 mr-2" />
            Toplu Tahmin
          </Button>
          <Button variant="secondary">
            <RefreshCw className="w-4 h-4 mr-2" />
            Yenile
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input Section */}
        <div className="space-y-6">
          {/* Model Selection */}
          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Model Seçimi</h3>
            
            <div className="space-y-3">
              {models.filter(m => m.status === 'deployed').map((model) => (
                <div
                  key={model.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedModel?.id === model.id
                      ? 'border-cyan-500 bg-cyan-500/20'
                      : 'border-gray-600 hover:border-cyan-500/50'
                  }`}
                  onClick={() => setSelectedModel(model)}
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-cyan-400">
                      {getModelIcon(model.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{model.name}</div>
                      <div className="text-sm text-gray-400">
                        {model.type} • {model.framework}
                      </div>
                    </div>
                    {selectedModel?.id === model.id && (
                      <CheckCircle className="w-5 h-5 text-green-400" />
                    )}
                  </div>
                </div>
              ))}
              
              {models.filter(m => m.status === 'deployed').length === 0 && (
                <div className="text-center py-8">
                  <Globe className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Dağıtılmış model bulunmuyor</p>
                </div>
              )}
            </div>
          </Card>

          {/* Input Form */}
          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Giriş Verisi</h3>
            
            {selectedModel ? (
              <div className="space-y-4">
                {renderInputFields()}
                
                <Button
                  onClick={handlePredict}
                  disabled={isPredicting || Object.keys(inputData).length === 0}
                  className="w-full"
                >
                  {isPredicting ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Tahmin Ediliyor...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Tahmin Et
                    </>
                  )}
                </Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Model seçin</p>
              </div>
            )}
          </Card>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <Card glass className="p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Tahmin Sonucu</h3>
            
            {prediction ? (
              <div className="space-y-4">
                {renderPredictionResult()}
                
                <div className="pt-4 border-t border-gray-700">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">İşlem Süresi:</span>
                      <span className="text-white ml-2">
                        {prediction.processing_time_ms}ms
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-400">Güven:</span>
                      <span className="text-white ml-2">
                        {((prediction.confidence || 0) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Button variant="secondary" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </Button>
                  <Button variant="secondary" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Görselleştir
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Tahmin sonucu bekleniyor</p>
              </div>
            )}
          </Card>

          {/* Recent Predictions */}
          {batchPredictions.length > 0 && (
            <Card glass className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Toplu Tahmin Sonuçları</h3>
              
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {batchPredictions.map((pred, index) => (
                  <div key={index} className="p-3 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-white">
                        {JSON.stringify(pred.output_data).substring(0, 100)}...
                      </div>
                      <div className="text-xs text-gray-400">
                        {((pred.confidence || 0) * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>
      </div>

      {/* Batch Prediction Modal */}
      <AnimatePresence>
        {showBatchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={() => setShowBatchModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-900 border border-gray-700 rounded-lg p-6 w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-white mb-4">Toplu Tahmin</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Veri (Her satır bir tahmin, JSON formatında)
                  </label>
                  <textarea
                    value={batchData}
                    onChange={(e) => setBatchData(e.target.value)}
                    placeholder='{"feature1": 1.0, "feature2": 2.0}\n{"feature1": 1.5, "feature2": 2.5}'
                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-cyan-500 focus:outline-none resize-none font-mono text-sm"
                    rows={10}
                  />
                </div>
                
                <div className="text-sm text-gray-400">
                  <p>Örnek format:</p>
                  <pre className="bg-gray-800 p-2 rounded mt-2">
{`{"feature1": 1.0, "feature2": 2.0}
{"feature1": 1.5, "feature2": 2.5}
{"text": "Bu bir örnek metindir"}`}
                  </pre>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 mt-6">
                <Button
                  variant="secondary"
                  onClick={() => setShowBatchModal(false)}
                  className="flex-1"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleBatchPredict}
                  disabled={!batchData.trim()}
                  className="flex-1"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Toplu Tahmin Et
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default PredictionInterface
