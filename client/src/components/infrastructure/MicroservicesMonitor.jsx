import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Box, 
  GitBranch,
  Package,
  Activity,
  Zap,
  Globe,
  Database,
  Cloud,
  Server,
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
  Network,
  Settings,
  RefreshCw,
  Plus,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Info,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Copy,
  Share2,
  Link,
  ExternalLink,
  Layers,
  GitMerge,
 GitCommit,
  GitPullRequest,
  Code,
  Terminal,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Lock,
  Key,
  Shield,
  Bug,
  Wrench,
  Hammer,
  Rocket,
  Anchor,
  Navigation,
  Compass,
  Map,
  Route,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  MoreVertical,
  MoreHorizontal
} from 'lucide-react';

const MicroservicesMonitor = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [instances, setInstances] = useState([]);
  const [apiGateway, setApiGateway] = useState([]);
  const [serviceMesh, setServiceMesh] = useState([]);
  const [circuitBreakers, setCircuitBreakers] = useState([]);
  const [loadBalancers, setLoadBalancers] = useState([]);
  const [serviceDiscovery, setServiceDiscovery] = useState([]);
  const [monitoring, setMonitoring] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [realTimeMetrics, setRealTimeMetrics] = useState({});
  const [showTopology, setShowTopology] = useState(false);
  const [selectedInstance, setSelectedInstance] = useState(null);

  useEffect(() => {
    loadMicroservicesData();
    const interval = setInterval(() => {
      updateMetrics();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const loadMicroservicesData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setServices([
      {
        id: 1,
        name: 'user-service',
        version: 'v2.1.0',
        status: 'healthy',
        instances: 3,
        cpu: 45,
        memory: 60,
        requests: 1250,
        errors: 2,
        latency: 120,
        repository: 'github.com/company/user-service',
        language: 'Node.js',
        framework: 'Express'
      },
      {
        id: 2,
        name: 'order-service',
        version: 'v1.8.3',
        status: 'healthy',
        instances: 2,
        cpu: 78,
        memory: 85,
        requests: 890,
        errors: 5,
        latency: 250,
        repository: 'github.com/company/order-service',
        language: 'Java',
        framework: 'Spring Boot'
      },
      {
        id: 3,
        name: 'payment-service',
        version: 'v3.0.1',
        status: 'degraded',
        instances: 1,
        cpu: 92,
        memory: 94,
        requests: 450,
        errors: 15,
        latency: 890,
        repository: 'github.com/company/payment-service',
        language: 'Python',
        framework: 'FastAPI'
      },
      {
        id: 4,
        name: 'notification-service',
        version: 'v1.5.2',
        status: 'healthy',
        instances: 2,
        cpu: 23,
        memory: 41,
        requests: 320,
        errors: 0,
        latency: 85,
        repository: 'github.com/company/notification-service',
        language: 'Go',
        framework: 'Gin'
      }
    ]);

    setInstances([
      {
        id: 1,
        serviceId: 1,
        serviceName: 'user-service',
        instanceId: 'user-service-7d4f8c9-xyz',
        host: '10.0.1.100',
        port: 3001,
        status: 'healthy',
        uptime: '7d 14h 23m',
        cpu: 42,
        memory: 58,
        lastHealthCheck: new Date().toISOString()
      },
      {
        id: 2,
        serviceId: 1,
        serviceName: 'user-service',
        instanceId: 'user-service-5a2b3c4-abc',
        host: '10.0.1.101',
        port: 3001,
        status: 'healthy',
        uptime: '3d 8h 15m',
        cpu: 48,
        memory: 62,
        lastHealthCheck: new Date().toISOString()
      },
      {
        id: 3,
        serviceId: 2,
        serviceName: 'order-service',
        instanceId: 'order-service-9f8e7d6-def',
        host: '10.0.1.102',
        port: 3002,
        status: 'healthy',
        uptime: '5d 2h 45m',
        cpu: 75,
        memory: 83,
        lastHealthCheck: new Date().toISOString()
      }
    ]);

    setApiGateway([
      {
        id: 1,
        name: 'api-gateway',
        version: 'v1.4.0',
        status: 'healthy',
        routes: 24,
        requests: 5420,
        errors: 8,
        latency: 145,
        rateLimit: 1000,
        authType: 'JWT'
      }
    ]);

    setServiceMesh([
      {
        id: 1,
        name: 'istio',
        version: 'v1.19.3',
        status: 'healthy',
        services: 12,
        proxies: 36,
        policies: 8,
        telemetry: 'enabled'
      }
    ]);

    setLoading(false);
  };

  const updateMetrics = () => {
    setRealTimeMetrics({
      totalServices: services.length,
      healthyServices: services.filter(s => s.status === 'healthy').length,
      totalInstances: instances.length,
      healthyInstances: instances.filter(i => i.status === 'healthy').length,
      totalRequests: Math.floor(Math.random() * 1000) + 500,
      errorRate: Math.floor(Math.random() * 5) + 1,
      avgLatency: Math.floor(Math.random() * 200) + 100,
      throughput: Math.floor(Math.random() * 500) + 200
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'healthy':
        return 'text-green-400';
      case 'degraded':
      case 'warning':
        return 'text-yellow-400';
      case 'unhealthy':
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'healthy':
        return <CheckCircle className="w-4 h-4" />;
      case 'degraded':
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'unhealthy':
      case 'error':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getHealthColor = (percentage) => {
    if (percentage >= 90) return 'text-green-400';
    if (percentage >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || service.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Box className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Package className="w-4 h-4" /> },
    { id: 'instances', label: 'Instances', icon: <Server className="w-4 h-4" /> },
    { id: 'gateway', label: 'API Gateway', icon: <Globe className="w-4 h-4" /> },
    { id: 'mesh', label: 'Service Mesh', icon: <Network className="w-4 h-4" /> },
    { id: 'topology', label: 'Topology', icon: <GitBranch className="w-4 h-4" /> }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                Microservices Monitor
              </h1>
              <p className="text-gray-400 mt-2">Distributed systems monitoring and management</p>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowTopology(!showTopology)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  showTopology ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <GitBranch className="w-5 h-5" />
              </button>
              <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Services', value: `${realTimeMetrics.healthyServices || 0}/${realTimeMetrics.totalServices || 0}`, icon: <Package className="w-5 h-5" />, color: 'blue' },
            { label: 'Instances', value: `${realTimeMetrics.healthyInstances || 0}/${realTimeMetrics.totalInstances || 0}`, icon: <Server className="w-5 h-5" />, color: 'green' },
            { label: 'Requests/s', value: realTimeMetrics.totalRequests || 0, icon: <Activity className="w-5 h-5" />, color: 'purple' },
            { label: 'Error Rate', value: `${realTimeMetrics.errorRate || 0}%`, icon: <AlertTriangle className="w-5 h-5" />, color: 'red' }
          ].map((metric, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800 rounded-lg p-4 border border-gray-700`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 text-sm">{metric.label}</div>
                  <div className="text-2xl font-bold mt-1">{metric.value}</div>
                </div>
                <div className={`text-${metric.color}-500`}>{metric.icon}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-800 rounded-lg p-1">
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
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Service Health Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {services.slice(0, 4).map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Package className="w-6 h-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold">{service.name}</h3>
                            <p className="text-gray-400 text-sm">{service.version}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 ${getStatusColor(service.status)}`}>
                          {getStatusIcon(service.status)}
                          <span className="text-sm capitalize">{service.status}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <div className="text-gray-400 text-sm">Instances</div>
                          <div className="font-medium">{service.instances}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Requests</div>
                          <div className="font-medium">{service.requests}/min</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">CPU</div>
                          <div className={`font-medium ${getHealthColor(100 - service.cpu)}`}>{service.cpu}%</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Memory</div>
                          <div className={`font-medium ${getHealthColor(100 - service.memory)}`}>{service.memory}%</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Latency: {service.latency}ms</span>
                        <span className="text-gray-400">Errors: {service.errors}</span>
                        <span className="text-gray-400">{service.language}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* System Architecture */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-purple-400" />
                    System Architecture
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'API Gateway', icon: <Globe className="w-8 h-8" />, count: 1, color: 'blue' },
                      { name: 'Core Services', icon: <Package className="w-8 h-8" />, count: services.length, color: 'green' },
                      { name: 'Data Stores', icon: <Database className="w-8 h-8" />, count: 5, color: 'purple' }
                    ].map((component, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className={`text-${component.color}-500 mb-2 justify-center flex`}>
                          {component.icon}
                        </div>
                        <div className="font-medium">{component.name}</div>
                        <div className="text-2xl font-bold mt-1">{component.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Status</option>
                    <option value="healthy">Healthy</option>
                    <option value="degraded">Degraded</option>
                    <option value="unhealthy">Unhealthy</option>
                  </select>
                </div>

                {/* Services List */}
                <div className="space-y-4">
                  {filteredServices.map((service) => (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Package className="w-6 h-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold">{service.name}</h3>
                            <p className="text-gray-400 text-sm">{service.version} • {service.framework}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className={`flex items-center space-x-1 ${getStatusColor(service.status)}`}>
                            {getStatusIcon(service.status)}
                            <span className="text-sm capitalize">{service.status}</span>
                          </div>
                          <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div>
                          <div className="text-gray-400 text-sm">Instances</div>
                          <div className="font-medium">{service.instances}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Requests/min</div>
                          <div className="font-medium">{service.requests}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Avg Latency</div>
                          <div className="font-medium">{service.latency}ms</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Error Rate</div>
                          <div className="font-medium">{service.errors}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-400 text-sm mb-1">CPU Usage</div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                service.cpu > 80 ? 'bg-red-500' : 
                                service.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${service.cpu}%` }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm mb-1">Memory Usage</div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${
                                service.memory > 80 ? 'bg-red-500' : 
                                service.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${service.memory}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 text-sm text-gray-400">
                        <span>{service.language}</span>
                        <a href={service.repository} className="flex items-center space-x-1 hover:text-blue-400">
                          <Code className="w-4 h-4" />
                          <span>Repository</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'instances' && (
              <div className="space-y-6">
                {instances.map((instance) => (
                  <motion.div
                    key={instance.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Server className="w-6 h-6 text-green-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{instance.instanceId}</h3>
                          <p className="text-gray-400 text-sm">{instance.serviceName}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(instance.status)}`}>
                        {getStatusIcon(instance.status)}
                        <span className="text-sm capitalize">{instance.status}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Host</div>
                        <div className="font-medium">{instance.host}:{instance.port}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Uptime</div>
                        <div className="font-medium">{instance.uptime}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">CPU</div>
                        <div className={`font-medium ${getHealthColor(100 - instance.cpu)}`}>{instance.cpu}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Memory</div>
                        <div className={`font-medium ${getHealthColor(100 - instance.memory)}`}>{instance.memory}%</div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="text-gray-400 text-sm">Last Health Check</div>
                        <div className="font-medium">{new Date(instance.lastHealthCheck).toLocaleString()}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'gateway' && (
              <div className="space-y-6">
                {apiGateway.map((gateway) => (
                  <motion.div
                    key={gateway.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-6 h-6 text-purple-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{gateway.name}</h3>
                          <p className="text-gray-400 text-sm">{gateway.version}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(gateway.status)}`}>
                        {getStatusIcon(gateway.status)}
                        <span className="text-sm capitalize">{gateway.status}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Routes</div>
                        <div className="font-medium">{gateway.routes}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Requests/min</div>
                        <div className="font-medium">{gateway.requests}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Avg Latency</div>
                        <div className="font-medium">{gateway.latency}ms</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Error Rate</div>
                        <div className="font-medium">{gateway.errors}%</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Rate Limit</div>
                        <div className="font-medium">{gateway.rateLimit}/min</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Auth Type</div>
                        <div className="font-medium">{gateway.authType}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'mesh' && (
              <div className="space-y-6">
                {serviceMesh.map((mesh) => (
                  <motion.div
                    key={mesh.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Network className="w-6 h-6 text-cyan-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{mesh.name}</h3>
                          <p className="text-gray-400 text-sm">{mesh.version}</p>
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 ${getStatusColor(mesh.status)}`}>
                        {getStatusIcon(mesh.status)}
                        <span className="text-sm capitalize">{mesh.status}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Services</div>
                        <div className="font-medium">{mesh.services}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Proxies</div>
                        <div className="font-medium">{mesh.proxies}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Policies</div>
                        <div className="font-medium">{mesh.policies}</div>
                      </div>
                      <div className="md:col-span-3">
                        <div className="text-gray-400 text-sm">Telemetry</div>
                        <div className="font-medium capitalize">{mesh.telemetry}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'topology' && (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <GitBranch className="w-5 h-5 mr-2 text-green-400" />
                    Service Topology
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {services.map((service) => (
                      <div key={service.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-medium">{service.name}</span>
                          {getStatusIcon(service.status)}
                        </div>
                        <div className="text-sm text-gray-400 space-y-1">
                          <div>Instances: {service.instances}</div>
                          <div>Port: 300{service.id}</div>
                          <div>Dependencies: {Math.floor(Math.random() * 3) + 1}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MicroservicesMonitor;
