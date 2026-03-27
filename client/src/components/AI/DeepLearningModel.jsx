import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  Play, 
  Pause, 
  Settings, 
  Download, 
  Upload,
  BarChart3,
  Zap,
  Cpu,
  Activity,
  TrendingUp,
  Layers,
  Network,
  Eye,
  Code,
  Database,
  Clock,
  CheckCircle,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';

const DeepLearningModel = ({ model, onTrain, onDeploy, onEvaluate }) => {
  const [isTraining, setIsTraining] = useState(false);
  const [trainingProgress, setTrainingProgress] = useState(0);
  const [modelMetrics, setModelMetrics] = useState(null);
  const [showConfig, setShowConfig] = useState(false);
  const [config, setConfig] = useState(model.config || {});

  const modelTypes = {
    cnn: { icon: <Eye className="w-5 h-5" />, color: 'text-blue-500', bgColor: 'bg-blue-900/20' },
    rnn: { icon: <Activity className="w-5 h-5" />, color: 'text-green-500', bgColor: 'bg-green-900/20' },
    transformer: { icon: <Layers className="w-5 h-5" />, color: 'text-purple-500', bgColor: 'bg-purple-900/20' },
    gan: { icon: <Zap className="w-5 h-5" />, color: 'text-yellow-500', bgColor: 'bg-yellow-900/20' }
  };

  const modelInfo = modelTypes[model.type] || modelTypes.cnn;

  useEffect(() => {
    if (model.status === 'training') {
      const interval = setInterval(() => {
        setTrainingProgress(prev => {
          if (prev >= 100) {
            setIsTraining(false);
            return 100;
          }
          return prev + Math.random() * 10;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [model.status]);

  const handleTrain = async () => {
    setIsTraining(true);
    setTrainingProgress(0);
    
    try {
      await onTrain(model.id, config);
    } catch (error) {
      console.error('Training failed:', error);
      setIsTraining(false);
    }
  };

  const handleDeploy = async () => {
    try {
      await onDeploy(model.id);
    } catch (error) {
      console.error('Deployment failed:', error);
    }
  };

  const handleEvaluate = async () => {
    try {
      const metrics = await onEvaluate(model.id);
      setModelMetrics(metrics);
    } catch (error) {
      console.error('Evaluation failed:', error);
    }
  };

  return (
    <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-4">
          <div className={`p-3 rounded-lg ${modelInfo.bgColor}`}>
            {modelInfo.icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{model.name}</h3>
            <p className="text-gray-400 text-sm capitalize">{model.type} Model</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 rounded-full text-xs ${
            model.status === 'active' ? 'bg-green-900/30 text-green-400' :
            model.status === 'training' ? 'bg-yellow-900/30 text-yellow-400' :
            model.status === 'deployed' ? 'bg-blue-900/30 text-blue-400' :
            'bg-gray-900/30 text-gray-400'
          }`}>
            {model.status}
          </span>
        </div>
      </div>

      <p className="text-gray-300">{model.description}</p>

      {/* Training Progress */}
      {isTraining && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white text-sm">Training Progress</span>
            <span className="text-cyan-400 text-sm">{Math.round(trainingProgress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${trainingProgress}%` }}
            ></div>
          </div>
          <div className="flex items-center space-x-4 mt-2 text-xs text-gray-400">
            <span>Epoch: {Math.floor(trainingProgress / 10)}/10</span>
            <span>Loss: {(1 - trainingProgress / 100).toFixed(4)}</span>
            <span>Accuracy: {(trainingProgress / 100).toFixed(4)}</span>
          </div>
        </div>
      )}

      {/* Model Metrics */}
      {modelMetrics && (
        <div className="bg-gray-800/50 rounded-lg p-4">
          <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
            <BarChart3 className="w-4 h-4" />
            <span>Model Performance</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-lg font-bold text-cyan-500">{modelMetrics.accuracy}</div>
              <div className="text-gray-400 text-sm">Accuracy</div>
            </div>
            <div>
              <div className="text-lg font-bold text-green-500">{modelMetrics.precision}</div>
              <div className="text-gray-400 text-sm">Precision</div>
            </div>
            <div>
              <div className="text-lg font-bold text-purple-500">{modelMetrics.recall}</div>
              <div className="text-gray-400 text-sm">Recall</div>
            </div>
            <div>
              <div className="text-lg font-bold text-yellow-500">{modelMetrics.f1Score}</div>
              <div className="text-gray-400 text-sm">F1 Score</div>
            </div>
          </div>
        </div>
      )}

      {/* Model Architecture */}
      <div className="bg-gray-800/50 rounded-lg p-4">
        <h4 className="text-white font-medium mb-3 flex items-center space-x-2">
          <Network className="w-4 h-4" />
          <span>Architecture</span>
        </h4>
        <div className="space-y-2">
          {model.layers?.map((layer, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <span className="text-gray-300">{layer.type}</span>
              <span className="text-gray-500">{layer.units || layer.filters || 'N/A'}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={handleTrain}
          disabled={isTraining || model.status === 'training'}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          {isTraining ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Training...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Train</span>
            </>
          )}
        </button>
        
        <button
          onClick={handleEvaluate}
          disabled={model.status !== 'trained'}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <BarChart3 className="w-4 h-4" />
          <span>Evaluate</span>
        </button>
        
        <button
          onClick={handleDeploy}
          disabled={model.status !== 'trained'}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Deploy</span>
        </button>
        
        <button
          onClick={() => setShowConfig(!showConfig)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
        >
          <Settings className="w-4 h-4" />
          <span>Config</span>
        </button>
      </div>

      {/* Configuration Panel */}
      {showConfig && (
        <ModelConfig
          config={config}
          onChange={setConfig}
          onClose={() => setShowConfig(false)}
        />
      )}
    </div>
  );
};

const ModelConfig = ({ config, onChange, onClose }) => {
  const [localConfig, setLocalConfig] = useState(config);

  const handleSave = () => {
    onChange(localConfig);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-6">Model Configuration</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Learning Rate
              </label>
              <input
                type="number"
                step="0.0001"
                value={localConfig.learningRate || 0.001}
                onChange={(e) => setLocalConfig({...localConfig, learningRate: parseFloat(e.target.value)})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Batch Size
              </label>
              <input
                type="number"
                value={localConfig.batchSize || 32}
                onChange={(e) => setLocalConfig({...localConfig, batchSize: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Epochs
              </label>
              <input
                type="number"
                value={localConfig.epochs || 10}
                onChange={(e) => setLocalConfig({...localConfig, epochs: parseInt(e.target.value)})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Optimizer
              </label>
              <select
                value={localConfig.optimizer || 'adam'}
                onChange={(e) => setLocalConfig({...localConfig, optimizer: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="adam">Adam</option>
                <option value="sgd">SGD</option>
                <option value="rmsprop">RMSprop</option>
                <option value="adagrad">Adagrad</option>
              </select>
            </div>
            
            <div>
              <label className="block text-gray-300 text-sm font-medium mb-2">
                Loss Function
              </label>
              <select
                value={localConfig.lossFunction || 'categorical_crossentropy'}
                onChange={(e) => setLocalConfig({...localConfig, lossFunction: e.target.value})}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="categorical_crossentropy">Categorical Crossentropy</option>
                <option value="binary_crossentropy">Binary Crossentropy</option>
                <option value="mse">Mean Squared Error</option>
                <option value="mae">Mean Absolute Error</option>
              </select>
            </div>
          </div>
          
          <div className="flex space-x-3 mt-6">
            <button
              onClick={handleSave}
              className="flex-1 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Save Configuration
            </button>
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepLearningModel;
