import React, { useState, useRef, useEffect } from 'react';
import { 
  Camera, 
  Upload, 
  Eye, 
  Scan, 
  Image, 
  Video,
  Download,
  Play,
  Pause,
  Settings,
  Zap,
  Target,
  Layers,
  Grid,
  Maximize2,
  RotateCw,
  Save,
  FileImage,
  Film,
  AlertTriangle,
  CheckCircle,
  Clock,
  Activity
} from 'lucide-react';

const ComputerVision = () => {
  const [activeTab, setActiveTab] = useState('detection');
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [detectionResults, setDetectionResults] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [analysisSettings, setAnalysisSettings] = useState({
    confidence: 0.5,
    nmsThreshold: 0.4,
    inputSize: 640,
    augment: true
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const fileInputRef = useRef(null);

  const tabs = [
    { id: 'detection', label: 'Object Detection', icon: <Target className="w-4 h-4" /> },
    { id: 'classification', label: 'Image Classification', icon: <Layers className="w-4 h-4" /> },
    { id: 'segmentation', label: 'Semantic Segmentation', icon: <Grid className="w-4 h-4" /> },
    { id: 'ocr', label: 'OCR/Text Recognition', icon: <FileImage className="w-4 h-4" /> },
    { id: 'video', label: 'Video Analysis', icon: <Film className="w-4 h-4" /> }
  ];

  useEffect(() => {
    return () => {
      if (cameraActive) {
        stopCamera();
      }
    };
  }, [cameraActive]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
        setDetectionResults(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
      }
    } catch (error) {
      console.error('Camera access denied:', error);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setCameraActive(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0);
      const imageData = canvasRef.current.toDataURL('image/jpeg');
      setSelectedImage(imageData);
      stopCamera();
    }
  };

  const processImage = async () => {
    if (!selectedImage) return;
    
    setIsProcessing(true);
    
    // Mock processing - replace with actual API call
    setTimeout(() => {
      const mockResults = {
        detections: [
          {
            class: 'person',
            confidence: 0.92,
            bbox: [100, 100, 200, 400],
            color: '#00ff00'
          },
          {
            class: 'car',
            confidence: 0.87,
            bbox: [300, 200, 150, 100],
            color: '#ff0000'
          },
          {
            class: 'dog',
            confidence: 0.78,
            bbox: [500, 300, 80, 60],
            color: '#0000ff'
          }
        ],
        processingTime: 0.234,
        imageInfo: {
          width: 640,
          height: 480,
          channels: 3
        }
      };
      
      setDetectionResults(mockResults);
      setIsProcessing(false);
    }, 2000);
  };

  const renderDetectionOverlay = () => {
    if (!detectionResults || !selectedImage) return null;
    
    return (
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox={`0 0 ${detectionResults.imageInfo.width} ${detectionResults.imageInfo.height}`}
      >
        {detectionResults.detections.map((detection, index) => (
          <g key={index}>
            <rect
              x={detection.bbox[0]}
              y={detection.bbox[1]}
              width={detection.bbox[2]}
              height={detection.bbox[3]}
              fill="none"
              stroke={detection.color}
              strokeWidth="2"
            />
            <rect
              x={detection.bbox[0]}
              y={detection.bbox[1] - 25}
              width="120"
              height="25"
              fill={detection.color}
              fillOpacity="0.8"
            />
            <text
              x={detection.bbox[0] + 5}
              y={detection.bbox[1] - 8}
              fill="white"
              fontSize="12"
              fontWeight="bold"
            >
              {detection.class} {(detection.confidence * 100).toFixed(1)}%
            </text>
          </g>
        ))}
      </svg>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Eye className="w-8 h-8 text-cyan-500" />
            <span>Computer Vision</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Advanced image and video analysis using deep learning models
          </p>
        </div>
        
        <button
          onClick={() => fileInputRef.current?.click()}
          className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Image</span>
        </button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

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

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Image/Video Input Area */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Input</h3>
              <div className="flex items-center space-x-2">
                {!cameraActive ? (
                  <button
                    onClick={startCamera}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors flex items-center space-x-1"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Camera</span>
                  </button>
                ) : (
                  <button
                    onClick={captureImage}
                    className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors flex items-center space-x-1"
                  >
                    <Camera className="w-3 h-3" />
                    <span>Capture</span>
                  </button>
                )}
                <button
                  onClick={processImage}
                  disabled={!selectedImage || isProcessing}
                  className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-1"
                >
                  {isProcessing ? (
                    <Activity className="w-3 h-3 animate-spin" />
                  ) : (
                    <Scan className="w-3 h-3" />
                  )}
                  <span>{isProcessing ? 'Processing' : 'Analyze'}</span>
                </button>
              </div>
            </div>

            <div className="relative bg-gray-800 rounded-lg overflow-hidden" style={{ minHeight: '400px' }}>
              {cameraActive ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : selectedImage ? (
                <>
                  <img
                    src={selectedImage}
                    alt="Selected"
                    className="w-full h-full object-contain"
                  />
                  {renderDetectionOverlay()}
                </>
              ) : (
                <div className="flex items-center justify-center h-full min-h-[400px]">
                  <div className="text-center">
                    <Image className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400">Upload an image or use camera to start</p>
                  </div>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />
          </div>

          {/* Results */}
          {detectionResults && (
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Detection Results</span>
              </h3>
              
              <div className="space-y-3">
                {detectionResults.detections.map((detection, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-800 rounded-lg p-3">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: detection.color }}
                      ></div>
                      <span className="text-white capitalize">{detection.class}</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-cyan-400">
                        {(detection.confidence * 100).toFixed(1)}%
                      </span>
                      <span className="text-gray-400 text-sm">
                        [{detection.bbox.join(', ')}]
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Processing Time</span>
                  <span className="text-cyan-400">{detectionResults.processingTime}s</span>
                </div>
                <div className="flex items-center justify-between text-sm mt-1">
                  <span className="text-gray-400">Image Size</span>
                  <span className="text-cyan-400">
                    {detectionResults.imageInfo.width} × {detectionResults.imageInfo.height}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Settings Panel */}
        <div className="space-y-4">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Settings className="w-5 h-5" />
              <span>Analysis Settings</span>
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Confidence Threshold
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={analysisSettings.confidence}
                  onChange={(e) => setAnalysisSettings({...analysisSettings, confidence: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>{analysisSettings.confidence}</span>
                  <span>1</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  NMS Threshold
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={analysisSettings.nmsThreshold}
                  onChange={(e) => setAnalysisSettings({...analysisSettings, nmsThreshold: parseFloat(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0</span>
                  <span>{analysisSettings.nmsThreshold}</span>
                  <span>1</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Input Size
                </label>
                <select
                  value={analysisSettings.inputSize}
                  onChange={(e) => setAnalysisSettings({...analysisSettings, inputSize: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value={416}>416×416</option>
                  <option value={640}>640×640</option>
                  <option value={832}>832×832</option>
                  <option value={1024}>1024×1024</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between">
                <label className="text-gray-300 text-sm font-medium">
                  Data Augmentation
                </label>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={analysisSettings.augment}
                    onChange={(e) => setAnalysisSettings({...analysisSettings, augment: e.target.checked})}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Model Info */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center space-x-2">
              <Brain className="w-5 h-5" />
              <span>Model Info</span>
            </h3>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Model</span>
                <span className="text-white text-sm">YOLOv8</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Classes</span>
                <span className="text-white text-sm">80</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Input</span>
                <span className="text-white text-sm">{analysisSettings.inputSize}×{analysisSettings.inputSize}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">FPS</span>
                <span className="text-white text-sm">45</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">mAP</span>
                <span className="text-white text-sm">0.523</span>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export Results</span>
              </button>
              <button className="w-full px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <Save className="w-4 h-4" />
                <span>Save Model</span>
              </button>
              <button className="w-full px-3 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors flex items-center space-x-2">
                <RotateCw className="w-4 h-4" />
                <span>Reset Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComputerVision;
