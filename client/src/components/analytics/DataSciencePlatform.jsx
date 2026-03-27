import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Brain,
  Database,
  BarChart3,
  LineChart,
  PieChart,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Target,
  Globe,
  Server,
  Cloud,
  Shield,
  Key,
  Lock,
  Unlock,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Plus,
  Edit,
  Trash2,
  Copy,
  Share,
  Maximize2,
  Grid,
  Layers,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  FileText,
  Image,
  Video,
  Map,
  Bell,
  Mail,
  MessageSquare,
  CreditCard,
  Package,
  Truck,
  Building,
  Briefcase,
  BarChart,
  AreaChart,
  ScatterChart,
  Timer,
  UserCheck,
  UserPlus,
  UserMinus,
  UserX,
  Hash,
  Percent,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  MoreVertical,
  Eye,
  EyeOff,
  Play,
  Pause,
  Square,
  SkipForward,
  SkipBack,
  Repeat,
  Shuffle,
  Volume2,
  VolumeX,
  Mic,
  MicOff,
  VideoOff,
  Phone,
  PhoneOff,
  Navigation,
  Compass,
  MapPin,
  Route,
  Navigation2
} from 'lucide-react';

const DataSciencePlatform = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedModel, setSelectedModel] = useState(null);
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [datasets, setDatasets] = useState([]);
  const [models, setModels] = useState([]);
  const [experiments, setExperiments] = useState([]);
  const [predictions, setPredictions] = useState([]);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Brain },
    { id: 'datasets', label: 'Datasets', icon: Database },
    { id: 'models', label: 'Models', icon: Brain },
    { id: 'experiments', label: 'Experiments', icon: Activity },
    { id: 'predictions', label: 'Predictions', icon: Target }
  ];

  const modelMetrics = [
    { name: 'Customer Churn', accuracy: 94.2, precision: 91.8, recall: 89.5, f1Score: 90.6 },
    { name: 'Sales Forecasting', accuracy: 88.7, precision: 85.3, recall: 87.9, f1Score: 86.6 },
    { name: 'Fraud Detection', accuracy: 96.8, precision: 94.2, recall: 91.7, f1Score: 92.9 },
    { name: 'Recommendation Engine', accuracy: 92.1, precision: 89.4, recall: 87.2, f1Score: 88.3 }
  ];

  const datasetsData = [
    {
      name: 'Customer Transactions',
      size: '2.4GB',
      records: 1234567,
      features: 45,
      lastUpdated: '2024-03-15',
      status: 'processed',
      quality: 98.5
    },
    {
      name: 'Product Catalog',
      size: '890MB',
      records: 456789,
      features: 23,
      lastUpdated: '2024-03-14',
      status: 'processing',
      quality: 95.2
    },
    {
      name: 'User Behavior',
      size: '5.6GB',
      records: 3456789,
      features: 67,
      lastUpdated: '2024-03-13',
      status: 'validated',
      quality: 97.8
    }
  ];

  const experimentsData = [
    {
      name: 'Churn Prediction v2',
      model: 'Random Forest',
      status: 'running',
      progress: 67,
      startTime: '2024-03-15 14:30',
      estimatedCompletion: '2024-03-15 16:45',
      parameters: { n_estimators: 100, max_depth: 10 }
    },
    {
      name: 'Sales Forecasting LSTM',
      model: 'LSTM',
      status: 'completed',
      progress: 100,
      startTime: '2024-03-15 10:00',
      completedTime: '2024-03-15 12:30',
      accuracy: 88.7
    },
    {
      name: 'Fraud Detection XGBoost',
      model: 'XGBoost',
      status: 'failed',
      progress: 23,
      startTime: '2024-03-15 09:15',
      error: 'Memory allocation failed'
    }
  ];

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      if (isTraining) {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            setIsTraining(false);
            return 100;
          }
          return prev + Math.random() * 5;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTraining]);

  const handleTrainModel = (modelName) => {
    setSelectedModel(modelName);
    setIsTraining(true);
    setTrainingProgress(0);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'processed':
      case 'validated':
        return 'text-green-400';
      case 'running':
      case 'processing':
        return 'text-yellow-400';
      case 'failed':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'processed':
      case 'validated':
        return <CheckCircle className="w-4 h-4" />;
      case 'running':
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'failed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Data Science Platform</h2>
          <p className="text-gray-400">Machine learning models and data analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
            <Plus className="w-4 h-4" />
            <span>New Experiment</span>
          </button>
          <button className="p-2 bg-gray-800 border border-gray-700 rounded-lg hover:bg-gray-700 transition-colors">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-gray-800 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'text-gray-400 hover:text-white hover:bg-gray-700'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Model Performance */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Model Performance</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {modelMetrics.map((model, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-white">{model.name}</h4>
                    <div className="flex items-center space-x-2">
                      <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                        <Eye className="w-3 h-3" />
                      </button>
                      <button className="p-1 hover:bg-gray-600 rounded transition-colors">
                        <Settings className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <div className="text-gray-400 text-xs">Accuracy</div>
                      <div className="text-lg font-bold text-green-400">{model.accuracy}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Precision</div>
                      <div className="text-lg font-bold text-blue-400">{model.precision}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">Recall</div>
                      <div className="text-lg font-bold text-yellow-400">{model.recall}%</div>
                    </div>
                    <div>
                      <div className="text-gray-400 text-xs">F1 Score</div>
                      <div className="text-lg font-bold text-purple-400">{model.f1Score}%</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Models', value: '12', icon: Brain, color: 'blue' },
              { label: 'Datasets', value: '24', icon: Database, color: 'green' },
              { label: 'Experiments', value: '156', icon: Activity, color: 'yellow' },
              { label: 'Predictions', value: '1.2M', icon: Target, color: 'purple' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-gray-400 text-sm">{stat.label}</div>
                    <div className="text-2xl font-bold text-white mt-1">{stat.value}</div>
                  </div>
                  <div className={`p-3 bg-gray-700 rounded-lg`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}-400`} />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'datasets' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Datasets</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Filter className="w-4 h-4" />
                  </button>
                  <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-400">Name</th>
                    <th className="text-left p-4 text-gray-400">Size</th>
                    <th className="text-left p-4 text-gray-400">Records</th>
                    <th className="text-left p-4 text-gray-400">Features</th>
                    <th className="text-left p-4 text-gray-400">Quality</th>
                    <th className="text-left p-4 text-gray-400">Status</th>
                    <th className="text-left p-4 text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {datasetsData.map((dataset, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="p-4">
                        <div>
                          <div className="font-medium text-white">{dataset.name}</div>
                          <div className="text-sm text-gray-400">Updated {dataset.lastUpdated}</div>
                        </div>
                      </td>
                      <td className="p-4 text-gray-300">{dataset.size}</td>
                      <td className="p-4 text-gray-300">{dataset.records.toLocaleString()}</td>
                      <td className="p-4 text-gray-300">{dataset.features}</td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-green-400">{dataset.quality}%</div>
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-400 h-2 rounded-full"
                              style={{ width: `${dataset.quality}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className={`flex items-center space-x-1 ${getStatusColor(dataset.status)}`}>
                          {getStatusIcon(dataset.status)}
                          <span className="capitalize">{dataset.status}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                            <Eye className="w-3 h-3" />
                          </button>
                          <button className="p-1 hover:bg-gray-700 rounded transition-colors">
                            <Download className="w-3 h-3" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'models' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {modelMetrics.map((model, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-800 rounded-lg p-6 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">{model.name}</h3>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleTrainModel(model.name)}
                      disabled={isTraining && selectedModel === model.name}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      {isTraining && selectedModel === model.name ? 'Training...' : 'Retrain'}
                    </button>
                    <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {isTraining && selectedModel === model.name && (
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Training Progress</span>
                      <span className="text-sm text-white">{Math.round(trainingProgress)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${trainingProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Accuracy</span>
                    <span className="font-medium text-green-400">{model.accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Precision</span>
                    <span className="font-medium text-blue-400">{model.precision}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Recall</span>
                    <span className="font-medium text-yellow-400">{model.recall}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">F1 Score</span>
                    <span className="font-medium text-purple-400">{model.f1Score}%</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'experiments' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg border border-gray-700">
            <div className="p-6 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">Experiments</h3>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>New Experiment</span>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {experimentsData.map((experiment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-white">{experiment.name}</h4>
                      <p className="text-sm text-gray-400">{experiment.model}</p>
                    </div>
                    <div className={`flex items-center space-x-1 ${getStatusColor(experiment.status)}`}>
                      {getStatusIcon(experiment.status)}
                      <span className="capitalize">{experiment.status}</span>
                    </div>
                  </div>

                  {experiment.status === 'running' && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Progress</span>
                        <span className="text-sm text-white">{experiment.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-600 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full"
                          style={{ width: `${experiment.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Started:</span>
                      <span className="text-gray-300 ml-2">{experiment.startTime}</span>
                    </div>
                    {experiment.completedTime && (
                      <div>
                        <span className="text-gray-400">Completed:</span>
                        <span className="text-gray-300 ml-2">{experiment.completedTime}</span>
                      </div>
                    )}
                    {experiment.estimatedCompletion && (
                      <div>
                        <span className="text-gray-400">Est. Completion:</span>
                        <span className="text-gray-300 ml-2">{experiment.estimatedCompletion}</span>
                      </div>
                    )}
                    {experiment.accuracy && (
                      <div>
                        <span className="text-gray-400">Accuracy:</span>
                        <span className="text-green-400 ml-2">{experiment.accuracy}%</span>
                      </div>
                    )}
                  </div>

                  {experiment.error && (
                    <div className="mt-3 p-2 bg-red-900 rounded text-red-300 text-sm">
                      Error: {experiment.error}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'predictions' && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">Recent Predictions</h3>
            <div className="space-y-4">
              {[
                { model: 'Churn Prediction', input: 'Customer #12345', output: 'High Risk (87%)', confidence: 87, time: '2 min ago' },
                { model: 'Sales Forecasting', input: 'Product A - Next Month', output: '1,234 units', confidence: 92, time: '5 min ago' },
                { model: 'Fraud Detection', input: 'Transaction #67890', output: 'Low Risk (12%)', confidence: 95, time: '8 min ago' },
                { model: 'Recommendation', input: 'User #54321', output: 'Product B, Product C', confidence: 78, time: '12 min ago' }
              ].map((prediction, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">{prediction.model}</div>
                      <div className="text-sm text-gray-400 mt-1">
                        <span className="text-gray-300">Input:</span> {prediction.input}
                      </div>
                      <div className="text-sm text-gray-400">
                        <span className="text-gray-300">Output:</span> {prediction.output}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-400">{prediction.time}</div>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-sm text-gray-400">Confidence:</span>
                        <span className={`text-sm font-medium ${
                          prediction.confidence >= 90 ? 'text-green-400' :
                          prediction.confidence >= 70 ? 'text-yellow-400' :
                          'text-red-400'
                        }`}>{prediction.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataSciencePlatform;
