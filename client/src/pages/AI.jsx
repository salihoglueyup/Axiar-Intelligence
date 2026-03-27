import React, { useState } from 'react';
import { 
  Brain, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Settings,
  Zap,
  Activity,
  BarChart3,
  Cpu,
  Database,
  Network,
  Layers,
  Target,
  RefreshCw,
  Download,
  Upload,
  Play,
  Pause,
  CheckCircle,
  AlertTriangle,
  Clock,
  Globe,
  FileText,
  Camera,
  Mic
} from 'lucide-react';
import DeepLearningModel from '../components/AI/DeepLearningModel';
import ComputerVision from '../components/AI/ComputerVision';
import NaturalLanguageProcessing from '../components/AI/NaturalLanguageProcessing';
import PredictiveAnalytics from '../components/AI/PredictiveAnalytics';

const AI = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [models, setModels] = useState([]);
  const [isTraining, setIsTraining] = useState(false);

  const navigationItems = [
    { id: 'overview', label: 'AI Overview', icon: Brain },
    { id: 'deeplearning', label: 'Deep Learning', icon: Layers },
    { id: 'computervision', label: 'Computer Vision', icon: Eye },
    { id: 'nlp', label: 'NLP', icon: MessageSquare },
    { id: 'predictive', label: 'Predictive Analytics', icon: TrendingUp },
    { id: 'models', label: 'Model Management', icon: Database }
  ];

  const mockModels = [
    {
      id: 'yolo_v8',
      name: 'YOLOv8 Object Detection',
      type: 'cnn',
      description: 'Real-time object detection model for computer vision tasks',
      status: 'active',
      accuracy: 0.94,
      lastTrained: '2024-03-20T10:00:00Z',
      layers: [
        { type: 'conv2d', filters: 32 },
        { type: 'conv2d', filters: 64 },
        { type: 'conv2d', filters: 128 },
        { type: 'dense', units: 1000 }
      ],
      config: {
        learningRate: 0.001,
        batchSize: 32,
        epochs: 10,
        optimizer: 'adam',
        lossFunction: 'categorical_crossentropy'
      }
    },
    {
      id: 'bert_sentiment',
      name: 'BERT Sentiment Analysis',
      type: 'transformer',
      description: 'Transformer-based model for sentiment analysis and text classification',
      status: 'trained',
      accuracy: 0.91,
      lastTrained: '2024-03-18T15:30:00Z',
      layers: [
        { type: 'embedding', units: 768 },
        { type: 'transformer', heads: 12 },
        { type: 'transformer', heads: 12 },
        { type: 'dense', units: 768 }
      ],
      config: {
        learningRate: 0.0001,
        batchSize: 16,
        epochs: 5,
        optimizer: 'adam',
        lossFunction: 'binary_crossentropy'
      }
    },
    {
      id: 'lstm_forecast',
      name: 'LSTM Time Series Forecasting',
      type: 'rnn',
      description: 'LSTM network for time series prediction and forecasting',
      status: 'training',
      accuracy: 0.87,
      lastTrained: '2024-03-15T09:00:00Z',
      layers: [
        { type: 'lstm', units: 128 },
        { type: 'dropout', rate: 0.2 },
        { type: 'lstm', units: 64 },
        { type: 'dense', units: 1 }
      ],
      config: {
        learningRate: 0.001,
        batchSize: 64,
        epochs: 20,
        optimizer: 'rmsprop',
        lossFunction: 'mse'
      }
    }
  ];

  const handleTrainModel = async (modelId, config) => {
    setIsTraining(true);
    
    // Mock training - replace with actual API call
    setTimeout(() => {
      setModels(prev => prev.map(model => 
        model.id === modelId 
          ? { ...model, status: 'trained', accuracy: Math.random() * 0.1 + 0.9 }
          : model
      ));
      setIsTraining(false);
    }, 3000);
  };

  const handleDeployModel = async (modelId) => {
    // Mock deployment - replace with actual API call
    console.log('Deploying model:', modelId);
  };

  const handleEvaluateModel = async (modelId) => {
    // Mock evaluation - replace with actual API call
    return {
      accuracy: 0.92 + Math.random() * 0.08,
      precision: 0.89 + Math.random() * 0.11,
      recall: 0.91 + Math.random() * 0.09,
      f1Score: 0.90 + Math.random() * 0.10
    };
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <AIOverview models={mockModels} />;
      case 'deeplearning':
        return <DeepLearningSection models={mockModels} onTrain={handleTrainModel} onDeploy={handleDeployModel} onEvaluate={handleEvaluateModel} />;
      case 'computervision':
        return <ComputerVision />;
      case 'nlp':
        return <NaturalLanguageProcessing />;
      case 'predictive':
        return <PredictiveAnalytics />;
      case 'models':
        return <ModelManagement models={mockModels} />;
      default:
        return <AIOverview models={mockModels} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black">
      <div className="flex">
        {/* Sidebar Navigation */}
        <div className="w-64 bg-gray-900/50 backdrop-blur-xl border-r border-gray-800 min-h-screen">
          <div className="p-6">
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI/ML Platform</h1>
                <p className="text-gray-400 text-sm">Intelligence Hub</p>
              </div>
            </div>

            <nav className="space-y-2">
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                    activeSection === item.id
                      ? 'bg-purple-600/20 text-purple-400 border-l-4 border-purple-500'
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Quick Stats */}
          <div className="p-6 border-t border-gray-800">
            <h3 className="text-white font-medium mb-4">AI Stats</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Active Models</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Training Jobs</span>
                <span className="text-white font-medium">3</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">Avg Accuracy</span>
                <span className="text-green-400 font-medium">91.2%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400 text-sm">GPU Usage</span>
                <span className="text-purple-400 font-medium">67%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          <div className="p-8">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

const AIOverview = ({ models }) => {
  const stats = [
    {
      title: 'Total Models',
      value: models.length,
      change: '+2',
      trend: 'up',
      icon: Database,
      color: 'text-purple-500',
      bgColor: 'bg-purple-900/20',
      borderColor: 'border-purple-800'
    },
    {
      title: 'Active Models',
      value: models.filter(m => m.status === 'active').length,
      change: '+1',
      trend: 'up',
      icon: Play,
      color: 'text-green-500',
      bgColor: 'bg-green-900/20',
      borderColor: 'border-green-800'
    },
    {
      title: 'Training Jobs',
      value: models.filter(m => m.status === 'training').length,
      change: '0',
      trend: 'stable',
      icon: RefreshCw,
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-900/20',
      borderColor: 'border-yellow-800'
    },
    {
      title: 'Avg Accuracy',
      value: `${Math.round(models.reduce((sum, m) => sum + m.accuracy, 0) / models.length * 100)}%`,
      change: '+3%',
      trend: 'up',
      icon: Target,
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-900/20',
      borderColor: 'border-cyan-800'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'training',
      message: 'YOLOv8 model training completed',
      timestamp: '2 hours ago',
      icon: CheckCircle,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'deployment',
      message: 'BERT sentiment model deployed to production',
      timestamp: '4 hours ago',
      icon: Upload,
      color: 'text-blue-500'
    },
    {
      id: 3,
      type: 'evaluation',
      message: 'LSTM forecast model evaluation completed',
      timestamp: '6 hours ago',
      icon: BarChart3,
      color: 'text-purple-500'
    },
    {
      id: 4,
      type: 'data',
      message: 'New training dataset uploaded (10,000 samples)',
      timestamp: '1 day ago',
      icon: Database,
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">AI/ML Overview</h2>
        <p className="text-gray-400">
          Monitor and manage your machine learning models and AI services
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`bg-gray-900/50 border ${stat.borderColor} rounded-lg p-6`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-400' : 
                stat.trend === 'down' ? 'text-red-400' : 'text-gray-400'
              }`}>
                <TrendingUp className={`w-4 h-4 ${stat.trend === 'down' ? 'rotate-180' : ''}`} />
                <span>{stat.change}</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.title}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Recent Activities</h3>
          <div className="space-y-4">
            {recentActivities.map(activity => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className={`p-2 rounded-lg ${activity.color} bg-opacity-20`}>
                  <activity.icon className={`w-4 h-4 ${activity.color}`} />
                </div>
                <div className="flex-1">
                  <p className="text-white">{activity.message}</p>
                  <p className="text-gray-400 text-sm mt-1">{activity.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Model Performance */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Model Performance</h3>
          <div className="space-y-3">
            {models.slice(0, 3).map(model => (
              <div key={model.id} className="flex items-center justify-between">
                <div>
                  <div className="text-white font-medium">{model.name}</div>
                  <div className="text-gray-400 text-sm capitalize">{model.type}</div>
                </div>
                <div className="text-right">
                  <div className="text-cyan-400 font-bold">
                    {Math.round(model.accuracy * 100)}%
                  </div>
                  <div className="text-gray-400 text-sm capitalize">{model.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors text-left">
            <Upload className="w-6 h-6 text-blue-500 mb-2" />
            <div className="text-white font-medium">Upload Dataset</div>
            <div className="text-gray-400 text-sm">Add training data</div>
          </button>
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors text-left">
            <Brain className="w-6 h-6 text-purple-500 mb-2" />
            <div className="text-white font-medium">Create Model</div>
            <div className="text-gray-400 text-sm">Build new ML model</div>
          </button>
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors text-left">
            <Play className="w-6 h-6 text-green-500 mb-2" />
            <div className="text-white font-medium">Start Training</div>
            <div className="text-gray-400 text-sm">Train existing models</div>
          </button>
          <button className="p-4 bg-gray-800 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors text-left">
            <Download className="w-6 h-6 text-orange-500 mb-2" />
            <div className="text-white font-medium">Export Model</div>
            <div className="text-gray-400 text-sm">Download trained models</div>
          </button>
        </div>
      </div>
    </div>
  );
};

const DeepLearningSection = ({ models, onTrain, onDeploy, onEvaluate }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Deep Learning Models</h2>
        <p className="text-gray-400">
          Manage and train your neural network models
        </p>
      </div>

      <div className="space-y-4">
        {models.map(model => (
          <DeepLearningModel
            key={model.id}
            model={model}
            onTrain={onTrain}
            onDeploy={onDeploy}
            onEvaluate={onEvaluate}
          />
        ))}
      </div>
    </div>
  );
};

const ModelManagement = ({ models }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">Model Management</h2>
        <p className="text-gray-400">
          Centralized model repository and versioning
        </p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Model Repository</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left text-gray-400 pb-3">Model Name</th>
                <th className="text-left text-gray-400 pb-3">Type</th>
                <th className="text-left text-gray-400 pb-3">Status</th>
                <th className="text-left text-gray-400 pb-3">Accuracy</th>
                <th className="text-left text-gray-400 pb-3">Last Trained</th>
                <th className="text-left text-gray-400 pb-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {models.map(model => (
                <tr key={model.id} className="border-b border-gray-800">
                  <td className="py-3 text-white">{model.name}</td>
                  <td className="py-3 text-gray-300 capitalize">{model.type}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      model.status === 'active' ? 'bg-green-900/30 text-green-400' :
                      model.status === 'training' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-gray-900/30 text-gray-400'
                    }`}>
                      {model.status}
                    </span>
                  </td>
                  <td className="py-3 text-cyan-400">{Math.round(model.accuracy * 100)}%</td>
                  <td className="py-3 text-gray-300">
                    {new Date(model.lastTrained).toLocaleDateString()}
                  </td>
                  <td className="py-3">
                    <div className="flex space-x-2">
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Upload className="w-4 h-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-white transition-colors">
                        <Settings className="w-4 h-4" />
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
  );
};

export default AI;
