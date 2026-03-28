import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  BarChart3, 
  LineChart, 
  PieChart, 
  Activity,
  Brain,
  Zap,
  Target,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
  Download,
  Settings,
  Play,
  Pause,
  RefreshCw,
  Database,
  Layers,
  Filter,
  Eye
} from 'lucide-react';

const PredictiveAnalytics = () => {
  const [activeTab, setActiveTab] = useState('forecasting');
  const [models, setModels] = useState([]);
  const [predictions, setPredictions] = useState([]);
  const [isTraining, setIsTraining] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [confidence, setConfidence] = useState(0.95);
  const [showSettings, setShowSettings] = useState(false);

  const tabs = [
    { id: 'forecasting', label: 'Time Series Forecasting', icon: <LineChart className="w-4 h-4" /> },
    { id: 'classification', label: 'Classification', icon: <Target className="w-4 h-4" /> },
    { id: 'anomaly', label: 'Anomaly Detection', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'regression', label: 'Regression Analysis', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'clustering', label: 'Clustering', icon: <PieChart className="w-4 h-4" /> }
  ];

  useEffect(() => {
    loadModels();
    loadPredictions();
  }, []);

  const loadModels = async () => {
    // Mock data - replace with actual API call
    const mockModels = [
      {
        id: 'sales_forecast',
        name: 'Sales Forecasting Model',
        type: 'time_series',
        algorithm: 'LSTM',
        accuracy: 0.94,
        status: 'active',
        lastTrained: '2024-03-20T10:00:00Z',
        nextTraining: '2024-03-27T10:00:00Z',
        features: ['date', 'sales', 'marketing_spend', 'seasonality'],
        target: 'sales'
      },
      {
        id: 'customer_churn',
        name: 'Customer Churn Prediction',
        type: 'classification',
        algorithm: 'Random Forest',
        accuracy: 0.87,
        status: 'active',
        lastTrained: '2024-03-18T15:30:00Z',
        nextTraining: '2024-03-25T15:30:00Z',
        features: ['usage_time', 'support_tickets', 'payment_history', 'engagement'],
        target: 'churn'
      },
      {
        id: 'fraud_detection',
        name: 'Fraud Detection',
        type: 'anomaly',
        algorithm: 'Isolation Forest',
        accuracy: 0.91,
        status: 'training',
        lastTrained: '2024-03-15T09:00:00Z',
        nextTraining: '2024-03-22T09:00:00Z',
        features: ['transaction_amount', 'location', 'time', 'device'],
        target: 'fraud'
      }
    ];
    
    setModels(mockModels);
  };

  const loadPredictions = async () => {
    // Mock data - replace with actual API call
    const mockPredictions = [
      {
        id: 'pred_1',
        modelId: 'sales_forecast',
        modelName: 'Sales Forecasting Model',
        predictionDate: '2024-03-24T00:00:00Z',
        predictedValue: 125000,
        confidence: 0.92,
        actualValue: null,
        status: 'pending',
        features: {
          marketing_spend: 15000,
          seasonality: 1.2,
          day_of_week: 1
        }
      },
      {
        id: 'pred_2',
        modelId: 'customer_churn',
        modelName: 'Customer Churn Prediction',
        predictionDate: '2024-03-23T12:00:00Z',
        predictedValue: 0.15,
        confidence: 0.88,
        actualValue: null,
        status: 'pending',
        features: {
          usage_time: 120,
          support_tickets: 2,
          payment_history: 0.95,
          engagement: 0.8
        }
      },
      {
        id: 'pred_3',
        modelId: 'fraud_detection',
        modelName: 'Fraud Detection',
        predictionDate: '2024-03-23T14:30:00Z',
        predictedValue: 0.02,
        confidence: 0.95,
        actualValue: 0,
        status: 'confirmed',
        features: {
          transaction_amount: 250,
          location: 'US',
          time: 14.5,
          device: 'mobile'
        }
      }
    ];
    
    setPredictions(mockPredictions);
  };

  const handleTrainModel = async (modelId) => {
    setIsTraining(true);
    
    // Mock training - replace with actual API call
    setTimeout(() => {
      setModels(prev => prev.map(model => 
        model.id === modelId 
          ? { ...model, status: 'active', lastTrained: new Date().toISOString() }
          : model
      ));
      setIsTraining(false);
    }, 3000);
  };

  const handleGeneratePrediction = async (modelId) => {
    // Mock prediction generation - replace with actual API call
    const model = models.find(m => m.id === modelId);
    if (!model) return;

    const newPrediction = {
      id: `pred_${Date.now()}`,
      modelId: modelId,
      modelName: model.name,
      predictionDate: new Date().toISOString(),
      predictedValue: Math.random() * 100000,
      confidence: 0.85 + Math.random() * 0.15,
      actualValue: null,
      status: 'pending',
      features: {}
    };

    setPredictions(prev => [newPrediction, ...prev]);
  };



  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-900/30 text-green-400';
      case 'training': return 'bg-yellow-900/30 text-yellow-400';
      case 'error': return 'bg-red-900/30 text-red-400';
      default: return 'bg-gray-900/30 text-gray-400';
    }
  };

  const renderForecasting = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Models List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Time Series Models</h3>
            
            <div className="space-y-4">
              {models
                .filter(model => model.type === 'time_series')
                .map(model => (
                  <div key={model.id} className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-white font-medium">{model.name}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(model.status)}`}>
                            {model.status}
                          </span>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <div className="text-lg font-bold text-cyan-500">{model.accuracy}</div>
                            <div className="text-gray-400 text-sm">Accuracy</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-300">{model.algorithm}</div>
                            <div className="text-gray-400 text-sm">Algorithm</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-300">{model.features.length}</div>
                            <div className="text-gray-400 text-sm">Features</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-300 capitalize">{model.target}</div>
                            <div className="text-gray-400 text-sm">Target</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                          <span>Last trained: {new Date(model.lastTrained).toLocaleDateString()}</span>
                          <span>Next: {new Date(model.nextTraining).toLocaleDateString()}</span>
                        </div>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleTrainModel(model.id)}
                            disabled={isTraining || model.status === 'training'}
                            className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                          >
                            {isTraining ? (
                              <RefreshCw className="w-3 h-3 animate-spin" />
                            ) : (
                              <Play className="w-3 h-3" />
                            )}
                            <span>Train</span>
                          </button>
                          <button
                            onClick={() => handleGeneratePrediction(model.id)}
                            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors flex items-center space-x-1"
                          >
                            <Zap className="w-3 h-3" />
                            <span>Predict</span>
                          </button>
                          <button
                            onClick={() => setSelectedModel(model)}
                            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors flex items-center space-x-1"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Details</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Forecast Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Time Range
                </label>
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="7d">7 Days</option>
                  <option value="30d">30 Days</option>
                  <option value="90d">90 Days</option>
                  <option value="1y">1 Year</option>
                </select>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Confidence Level
                </label>
                <input
                  type="range"
                  min="0.8"
                  max="0.99"
                  step="0.01"
                  value={confidence}
                  onChange={(e) => setConfidence(parseFloat(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>80%</span>
                  <span>{Math.round(confidence * 100)}%</span>
                  <span>99%</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Forecast Horizon
                </label>
                <input
                  type="number"
                  min="1"
                  max="365"
                  value="30"
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>
          </div>

          {/* Model Performance */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Model Performance</h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">MAE</span>
                <span className="text-white text-sm">0.0234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">RMSE</span>
                <span className="text-white text-sm">0.0456</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">MAPE</span>
                <span className="text-white text-sm">2.34%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">R²</span>
                <span className="text-white text-sm">0.9456</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Predictions Table */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Predictions</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 pb-3">Model</th>
                <th className="text-left text-gray-400 pb-3">Date</th>
                <th className="text-left text-gray-400 pb-3">Predicted</th>
                <th className="text-left text-gray-400 pb-3">Actual</th>
                <th className="text-left text-gray-400 pb-3">Confidence</th>
                <th className="text-left text-gray-400 pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {predictions.slice(0, 5).map(prediction => (
                <tr key={prediction.id} className="border-b border-gray-800">
                  <td className="py-3 text-white">{prediction.modelName}</td>
                  <td className="py-3 text-gray-300">
                    {new Date(prediction.predictionDate).toLocaleDateString()}
                  </td>
                  <td className="py-3 text-cyan-400">
                    {typeof prediction.predictedValue === 'number' 
                      ? prediction.predictedValue.toFixed(2)
                      : prediction.predictedValue
                    }
                  </td>
                  <td className="py-3 text-gray-300">
                    {prediction.actualValue !== null ? prediction.actualValue : '-'}
                  </td>
                  <td className="py-3 text-gray-300">
                    {Math.round(prediction.confidence * 100)}%
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      prediction.status === 'confirmed' ? 'bg-green-900/30 text-green-400' :
                      prediction.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-gray-900/30 text-gray-400'
                    }`}>
                      {prediction.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClassification = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Classification Models</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models
            .filter(model => model.type === 'classification')
            .map(model => (
              <div key={model.id} className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">{model.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Algorithm</span>
                    <span className="text-white">{model.algorithm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-cyan-400">{model.accuracy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Classes</span>
                    <span className="text-white">Binary</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderAnomaly = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Anomaly Detection</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {models
            .filter(model => model.type === 'anomaly')
            .map(model => (
              <div key={model.id} className="bg-gray-800/50 rounded-lg p-4">
                <h4 className="text-white font-medium mb-2">{model.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Algorithm</span>
                    <span className="text-white">{model.algorithm}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="text-cyan-400">{model.accuracy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Threshold</span>
                    <span className="text-white">0.05</span>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderRegression = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Regression Analysis</h3>
        
        <div className="text-center text-gray-400 py-8">
          <BarChart3 className="w-16 h-16 mx-auto mb-4" />
          <p>Regression models would be displayed here</p>
        </div>
      </div>
    </div>
  );

  const renderClustering = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Clustering Analysis</h3>
        
        <div className="text-center text-gray-400 py-8">
          <PieChart className="w-16 h-16 mx-auto mb-4" />
          <p>Clustering models would be displayed here</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Brain className="w-8 h-8 text-cyan-500" />
            <span>Predictive Analytics</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Machine learning models for forecasting and prediction
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2"
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </button>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'forecasting' && renderForecasting()}
        {activeTab === 'classification' && renderClassification()}
        {activeTab === 'anomaly' && renderAnomaly()}
        {activeTab === 'regression' && renderRegression()}
        {activeTab === 'clustering' && renderClustering()}
      </div>

      {/* Model Detail Modal */}
      {selectedModel && (
        <ModelDetailModal
          model={selectedModel}
          onClose={() => setSelectedModel(null)}
        />
      )}
    </div>
  );
};

const ModelDetailModal = ({ model, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">{model.name}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <AlertTriangle className="w-5 h-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Model Information</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Type</span>
                  <span className="text-white capitalize">{model.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Algorithm</span>
                  <span className="text-white">{model.algorithm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Accuracy</span>
                  <span className="text-cyan-400">{model.accuracy}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Status</span>
                  <span className="text-white capitalize">{model.status}</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-3">Training Schedule</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-400">Last Trained</span>
                  <span className="text-white">
                    {new Date(model.lastTrained).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Next Training</span>
                  <span className="text-white">
                    {new Date(model.nextTraining).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="text-white font-medium mb-3">Features</h4>
            <div className="flex flex-wrap gap-2">
              {model.features.map((feature, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
