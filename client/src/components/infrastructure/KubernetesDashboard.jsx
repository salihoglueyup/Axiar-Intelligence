import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Server, 
  Container, 
  Network, 
  Activity,
  Layers,
  Box,
  GitBranch,
  Package,
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
  Zap,
  Globe,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Cpu,
  HardDrive,
  MemoryStick,
  Wifi,
  Cloud,
  Terminal,
  Code,
  FileText,
  BarChart3,
  TrendingUp,
  Users,
  Lock,
  Key,
  Play,
  Pause,
  Square,
  RotateCcw,
  Save,
  Copy,
  Share2,
  Link,
  ExternalLink
} from 'lucide-react';

const KubernetesDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [clusters, setClusters] = useState([]);
  const [namespaces, setNamespaces] = useState([]);
  const [pods, setPods] = useState([]);
  const [services, setServices] = useState([]);
  const [deployments, setDeployments] = useState([]);
  const [configMaps, setConfigMaps] = useState([]);
  const [secrets, setSecrets] = useState([]);
  const [ingress, setIngress] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterNamespace, setFilterNamespace] = useState('all');
  const [selectedCluster, setSelectedCluster] = useState(null);
  const [expandedSections, setExpandedSections] = useState({});
  const [realTimeMetrics, setRealTimeMetrics] = useState({});
  const [selectedResource, setSelectedResource] = useState(null);
  const [showYaml, setShowYaml] = useState(false);

  useEffect(() => {
    loadKubernetesData();
    const interval = setInterval(() => {
      updateMetrics();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const loadKubernetesData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setClusters([
      {
        id: 1,
        name: 'production-cluster',
        version: 'v1.28.2',
        nodes: 5,
        status: 'healthy',
        region: 'us-west-2',
        provider: 'AWS',
        created: '2024-01-15'
      },
      {
        id: 2,
        name: 'staging-cluster',
        version: 'v1.28.2',
        nodes: 3,
        status: 'healthy',
        region: 'eu-west-1',
        provider: 'GCP',
        created: '2024-02-01'
      }
    ]);

    setNamespaces([
      { id: 1, name: 'default', status: 'active', pods: 12, services: 5 },
      { id: 2, name: 'production', status: 'active', pods: 24, services: 8 },
      { id: 3, name: 'staging', status: 'active', pods: 18, services: 6 },
      { id: 4, name: 'monitoring', status: 'active', pods: 8, services: 3 }
    ]);

    setPods([
      {
        id: 1,
        name: 'web-app-7d4f8c9-xyz',
        namespace: 'production',
        status: 'running',
        ready: '2/2',
        restarts: 0,
        age: '7d',
        node: 'node-1',
        cpu: '250m',
        memory: '512Mi'
      },
      {
        id: 2,
        name: 'api-server-5a2b3c4-abc',
        namespace: 'production',
        status: 'running',
        ready: '1/1',
        restarts: 2,
        age: '3d',
        node: 'node-2',
        cpu: '500m',
        memory: '1Gi'
      },
      {
        id: 3,
        name: 'database-9f8e7d6-def',
        namespace: 'production',
        status: 'pending',
        ready: '0/1',
        restarts: 0,
        age: '5m',
        node: 'node-3',
        cpu: '1',
        memory: '2Gi'
      }
    ]);

    setServices([
      {
        id: 1,
        name: 'web-service',
        namespace: 'production',
        type: 'ClusterIP',
        clusterIP: '10.96.0.100',
        externalIPs: [],
        ports: '80/TCP',
        age: '7d',
        selector: 'app=web-app'
      },
      {
        id: 2,
        name: 'api-service',
        namespace: 'production',
        type: 'LoadBalancer',
        clusterIP: '10.96.0.101',
        externalIPs: ['35.224.1.100'],
        ports: '443/TCP',
        age: '3d',
        selector: 'app=api-server'
      }
    ]);

    setDeployments([
      {
        id: 1,
        name: 'web-app-deployment',
        namespace: 'production',
        ready: '2/2',
        upToDate: 2,
        available: 2,
        age: '7d',
        replicas: 2
      },
      {
        id: 2,
        name: 'api-server-deployment',
        namespace: 'production',
        ready: '1/1',
        upToDate: 1,
        available: 1,
        age: '3d',
        replicas: 1
      }
    ]);

    setLoading(false);
  };

  const updateMetrics = () => {
    setRealTimeMetrics({
      totalPods: Math.floor(Math.random() * 50) + 30,
      runningPods: Math.floor(Math.random() * 40) + 25,
      cpuUsage: Math.floor(Math.random() * 30) + 40,
      memoryUsage: Math.floor(Math.random() * 20) + 60,
      networkTraffic: Math.floor(Math.random() * 1000) + 500,
      storageUsage: Math.floor(Math.random() * 50) + 30
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
      case 'running':
      case 'healthy':
      case 'active':
        return 'text-green-400';
      case 'pending':
      case 'warning':
        return 'text-yellow-400';
      case 'failed':
      case 'error':
        return 'text-red-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
      case 'healthy':
      case 'active':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />;
      case 'failed':
      case 'error':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredPods = pods.filter(pod => {
    const matchesSearch = pod.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesNamespace = filterNamespace === 'all' || pod.namespace === filterNamespace;
    return matchesSearch && matchesNamespace;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Server className="w-4 h-4" /> },
    { id: 'clusters', label: 'Clusters', icon: <Globe className="w-4 h-4" /> },
    { id: 'workloads', label: 'Workloads', icon: <Container className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Network className="w-4 h-4" /> },
    { id: 'config', label: 'Config', icon: <Settings className="w-4 h-4" /> },
    { id: 'storage', label: 'Storage', icon: <HardDrive className="w-4 h-4" /> }
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
                Kubernetes Dashboard
              </h1>
              <p className="text-gray-400 mt-2">Container orchestration and microservices management</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedCluster?.id || ''}
                onChange={(e) => setSelectedCluster(clusters.find(c => c.id === parseInt(e.target.value)))}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
              >
                <option value="">Select Cluster</option>
                {clusters.map(cluster => (
                  <option key={cluster.id} value={cluster.id}>{cluster.name}</option>
                ))}
              </select>
              <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-8">
          {[
            { label: 'Total Pods', value: realTimeMetrics.totalPods || 0, icon: <Container className="w-5 h-5" />, color: 'blue' },
            { label: 'Running', value: realTimeMetrics.runningPods || 0, icon: <Play className="w-5 h-5" />, color: 'green' },
            { label: 'CPU Usage', value: `${realTimeMetrics.cpuUsage || 0}%`, icon: <Cpu className="w-5 h-5" />, color: 'yellow' },
            { label: 'Memory', value: `${realTimeMetrics.memoryUsage || 0}%`, icon: <MemoryStick className="w-5 h-5" />, color: 'purple' },
            { label: 'Network', value: `${realTimeMetrics.networkTraffic || 0}MB/s`, icon: <Wifi className="w-5 h-5" />, color: 'cyan' },
            { label: 'Storage', value: `${realTimeMetrics.storageUsage || 0}%`, icon: <HardDrive className="w-5 h-5" />, color: 'orange' }
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
                  <div className="text-xl font-bold mt-1">{metric.value}</div>
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
                {/* Cluster Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {clusters.map((cluster) => (
                    <motion.div
                      key={cluster.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <Server className="w-6 h-6 text-blue-400" />
                          <div>
                            <h3 className="text-lg font-semibold">{cluster.name}</h3>
                            <p className="text-gray-400 text-sm">{cluster.provider} • {cluster.region}</p>
                          </div>
                        </div>
                        <div className={`flex items-center space-x-1 ${getStatusColor(cluster.status)}`}>
                          {getStatusIcon(cluster.status)}
                          <span className="text-sm capitalize">{cluster.status}</span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-gray-400 text-sm">Version</div>
                          <div className="font-medium">{cluster.version}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Nodes</div>
                          <div className="font-medium">{cluster.nodes}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Created</div>
                          <div className="font-medium">{cluster.created}</div>
                        </div>
                        <div>
                          <div className="text-gray-400 text-sm">Provider</div>
                          <div className="font-medium">{cluster.provider}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Namespace Overview */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Layers className="w-5 h-5 mr-2 text-purple-400" />
                    Namespaces
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {namespaces.map((namespace) => (
                      <div key={namespace.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{namespace.name}</span>
                          {getStatusIcon(namespace.status)}
                        </div>
                        <div className="text-sm text-gray-400">
                          <div>{namespace.pods} pods</div>
                          <div>{namespace.services} services</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'clusters' && (
              <div className="space-y-6">
                {clusters.map((cluster) => (
                  <motion.div
                    key={cluster.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Globe className="w-6 h-6 text-blue-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{cluster.name}</h3>
                          <p className="text-gray-400 text-sm">{cluster.version}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Terminal className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="text-gray-400 text-sm mb-1">Nodes</div>
                        <div className="text-2xl font-bold">{cluster.nodes}</div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="text-gray-400 text-sm mb-1">Region</div>
                        <div className="text-lg font-medium">{cluster.region}</div>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4">
                        <div className="text-gray-400 text-sm mb-1">Provider</div>
                        <div className="text-lg font-medium">{cluster.provider}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'workloads' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search pods..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <select
                    value={filterNamespace}
                    onChange={(e) => setFilterNamespace(e.target.value)}
                    className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="all">All Namespaces</option>
                    {namespaces.map(ns => (
                      <option key={ns.id} value={ns.name}>{ns.name}</option>
                    ))}
                  </select>
                </div>

                {/* Deployments */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-green-400" />
                    Deployments
                  </h3>
                  <div className="space-y-4">
                    {deployments.map((deployment) => (
                      <div key={deployment.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{deployment.name}</h4>
                            <p className="text-gray-400 text-sm">{deployment.namespace}</p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Ready: {deployment.ready}</span>
                            <span>Up-to-date: {deployment.upToDate}</span>
                            <span>Available: {deployment.available}</span>
                            <span>Age: {deployment.age}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pods */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Container className="w-5 h-5 mr-2 text-blue-400" />
                    Pods
                  </h3>
                  <div className="space-y-4">
                    {filteredPods.map((pod) => (
                      <div key={pod.id} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(pod.status)}
                            <div>
                              <h4 className="font-medium">{pod.name}</h4>
                              <p className="text-gray-400 text-sm">{pod.namespace} • {pod.node}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>Ready: {pod.ready}</span>
                            <span>Restarts: {pod.restarts}</span>
                            <span>CPU: {pod.cpu}</span>
                            <span>Memory: {pod.memory}</span>
                            <span>Age: {pod.age}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div className="space-y-6">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Network className="w-6 h-6 text-purple-400" />
                        <div>
                          <h3 className="text-lg font-semibold">{service.name}</h3>
                          <p className="text-gray-400 text-sm">{service.namespace}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-3 py-1 bg-purple-900 text-purple-300 rounded-full text-sm">
                          {service.type}
                        </span>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Cluster IP</div>
                        <div className="font-medium">{service.clusterIP}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Ports</div>
                        <div className="font-medium">{service.ports}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Selector</div>
                        <div className="font-medium">{service.selector}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Age</div>
                        <div className="font-medium">{service.age}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'config' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* ConfigMaps */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <FileText className="w-5 h-5 mr-2 text-yellow-400" />
                      ConfigMaps
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'app-config', namespace: 'production', keys: 5, age: '7d' },
                        { name: 'database-config', namespace: 'production', keys: 3, age: '3d' },
                        { name: 'cache-config', namespace: 'staging', keys: 2, age: '1d' }
                      ].map((config, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{config.name}</h4>
                              <p className="text-gray-400 text-sm">{config.namespace}</p>
                            </div>
                            <div className="text-sm text-gray-400">
                              <div>{config.keys} keys</div>
                              <div>{config.age}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Secrets */}
                  <div className="bg-gray-800 rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4 flex items-center">
                      <Lock className="w-5 h-5 mr-2 text-red-400" />
                      Secrets
                    </h3>
                    <div className="space-y-3">
                      {[
                        { name: 'database-secret', namespace: 'production', type: 'Opaque', age: '7d' },
                        { name: 'api-keys', namespace: 'production', type: 'Opaque', age: '3d' },
                        { name: 'tls-certificate', namespace: 'production', type: 'TLS', age: '14d' }
                      ].map((secret, index) => (
                        <div key={index} className="bg-gray-700 rounded-lg p-3">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium">{secret.name}</h4>
                              <p className="text-gray-400 text-sm">{secret.namespace}</p>
                            </div>
                            <div className="text-sm text-gray-400">
                              <div>{secret.type}</div>
                              <div>{secret.age}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'storage' && (
              <div className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <HardDrive className="w-5 h-5 mr-2 text-orange-400" />
                    Persistent Volumes
                  </h3>
                  <div className="space-y-4">
                    {[
                      { name: 'postgres-data', capacity: '100Gi', access: 'RWO', status: 'Bound', claim: 'postgres-pvc' },
                      { name: 'app-logs', capacity: '50Gi', access: 'RWX', status: 'Bound', claim: 'logs-pvc' },
                      { name: 'cache-storage', capacity: '20Gi', access: 'RWO', status: 'Available', claim: '-' }
                    ].map((volume, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium">{volume.name}</h4>
                            <p className="text-gray-400 text-sm">Claim: {volume.claim}</p>
                          </div>
                          <div className="flex items-center space-x-4 text-sm">
                            <span>{volume.capacity}</span>
                            <span>{volume.access}</span>
                            <span className={getStatusColor(volume.status)}>{volume.status}</span>
                          </div>
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

export default KubernetesDashboard;
