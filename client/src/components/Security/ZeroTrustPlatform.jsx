import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Network, 
  Lock, 
  AlertTriangle, 
  CheckCircle, 
  Activity,
  Users,
  Database,
  Cloud,
  Eye,
  Settings,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Info,
  Zap,
  Globe,
  Server,
  Cpu,
  HardDrive,
  Wifi,
  Smartphone,
  Monitor,
  Fingerprint,
  Key,
  FileText,
  BarChart3,
  TrendingUp,
  AlertCircle,
  CheckSquare,
  XCircle,
  Clock,
  Calendar,
  Map,
  Navigation
} from 'lucide-react';

const ZeroTrustPlatform = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [trustLevel, setTrustLevel] = useState(85);
  const [threats, setThreats] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [devices, setDevices] = useState([]);
  const [networks, setNetworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [realTimeData, setRealTimeData] = useState({});

  useEffect(() => {
    loadZeroTrustData();
    const interval = setInterval(() => {
      updateRealTimeData();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadZeroTrustData = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setThreats([
      {
        id: 1,
        type: 'malware',
        severity: 'high',
        source: '192.168.1.100',
        target: 'database-server',
        status: 'blocked',
        timestamp: new Date().toISOString(),
        description: 'Malware detection from external IP'
      },
      {
        id: 2,
        type: 'unauthorized_access',
        severity: 'medium',
        source: 'user-123',
        target: 'admin-panel',
        status: 'investigating',
        timestamp: new Date().toISOString(),
        description: 'Unauthorized access attempt to admin panel'
      }
    ]);

    setPolicies([
      {
        id: 1,
        name: 'Device Compliance Policy',
        type: 'device',
        status: 'active',
        enforcement: 'strict',
        devices: 245,
        violations: 3
      },
      {
        id: 2,
        name: 'Network Access Control',
        type: 'network',
        status: 'active',
        enforcement: 'moderate',
        devices: 189,
        violations: 7
      }
    ]);

    setDevices([
      {
        id: 1,
        name: 'Laptop-JohnDoe',
        type: 'laptop',
        os: 'Windows 11',
        trustScore: 92,
        status: 'compliant',
        lastSeen: new Date().toISOString(),
        location: 'Istanbul Office'
      },
      {
        id: 2,
        name: 'Mobile-JaneSmith',
        type: 'mobile',
        os: 'iOS 17',
        trustScore: 88,
        status: 'compliant',
        lastSeen: new Date().toISOString(),
        location: 'Remote'
      }
    ]);

    setNetworks([
      {
        id: 1,
        name: 'Corporate Network',
        type: 'corporate',
        securityLevel: 'high',
        devices: 156,
        status: 'secure'
      },
      {
        id: 2,
        name: 'Guest Network',
        type: 'guest',
        securityLevel: 'medium',
        devices: 23,
        status: 'monitored'
      }
    ]);

    setLoading(false);
  };

  const updateRealTimeData = () => {
    setRealTimeData({
      activeConnections: Math.floor(Math.random() * 100) + 50,
      blockedAttempts: Math.floor(Math.random() * 20) + 5,
      trustScore: Math.floor(Math.random() * 10) + 80,
      newThreats: Math.floor(Math.random() * 5)
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const filteredThreats = threats.filter(threat => {
    const matchesSearch = threat.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         threat.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || threat.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-red-500';
      case 'medium': return 'text-yellow-500';
      case 'low': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'blocked': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'investigating': return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case 'resolved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: <Shield className="w-4 h-4" /> },
    { id: 'threats', label: 'Threat Intelligence', icon: <AlertTriangle className="w-4 h-4" /> },
    { id: 'policies', label: 'Access Policies', icon: <Lock className="w-4 h-4" /> },
    { id: 'devices', label: 'Device Management', icon: <Monitor className="w-4 h-4" /> },
    { id: 'networks', label: 'Network Security', icon: <Network className="w-4 h-4" /> }
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
                Zero Trust Platform
              </h1>
              <p className="text-gray-400 mt-2">Advanced security architecture with zero-trust principles</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-2xl font-bold text-green-400">{trustLevel}%</div>
                <div className="text-sm text-gray-400">Trust Level</div>
              </div>
              <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* Real-time Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Connections', value: realTimeData.activeConnections || 0, icon: <Users className="w-5 h-5" />, color: 'blue' },
            { label: 'Blocked Attempts', value: realTimeData.blockedAttempts || 0, icon: <Shield className="w-5 h-5" />, color: 'red' },
            { label: 'Trust Score', value: `${realTimeData.trustScore || 0}%`, icon: <CheckCircle className="w-5 h-5" />, color: 'green' },
            { label: 'New Threats', value: realTimeData.newThreats || 0, icon: <AlertTriangle className="w-5 h-5" />, color: 'yellow' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-gray-800 rounded-lg p-4 border border-gray-700`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                  <div className="text-2xl font-bold mt-1">{stat.value}</div>
                </div>
                <div className={`text-${stat.color}-500`}>{stat.icon}</div>
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
                {/* Trust Architecture */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Shield className="w-5 h-5 mr-2 text-blue-400" />
                    Trust Architecture
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { name: 'Identity', score: 92, icon: <Fingerprint className="w-6 h-6" /> },
                      { name: 'Device', score: 88, icon: <Monitor className="w-6 h-6" /> },
                      { name: 'Network', score: 95, icon: <Network className="w-6 h-6" /> },
                      { name: 'Application', score: 90, icon: <Cloud className="w-6 h-6" /> },
                      { name: 'Data', score: 87, icon: <Database className="w-6 h-6" /> },
                      { name: 'Infrastructure', score: 93, icon: <Server className="w-6 h-6" /> }
                    ].map((component, index) => (
                      <div key={index} className="bg-gray-700 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <div className="text-blue-400">{component.icon}</div>
                            <span className="font-medium">{component.name}</span>
                          </div>
                          <span className="text-sm text-gray-400">{component.score}%</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full"
                            style={{ width: `${component.score}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Security Principles */}
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-green-400" />
                    Zero Trust Principles
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      'Never trust, always verify',
                      'Least privilege access',
                      'Micro-segmentation',
                      'Continuous monitoring',
                      'Multi-factor authentication',
                      'Encryption everywhere'
                    ].map((principle, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-gray-700 rounded-lg p-3">
                        <CheckCircle className="w-5 h-5 text-green-400" />
                        <span>{principle}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'threats' && (
              <div className="space-y-6">
                {/* Search and Filter */}
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search threats..."
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
                    <option value="blocked">Blocked</option>
                    <option value="investigating">Investigating</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>

                {/* Threats List */}
                <div className="space-y-4">
                  {filteredThreats.map((threat) => (
                    <motion.div
                      key={threat.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="bg-gray-800 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            {getStatusIcon(threat.status)}
                            <span className={`font-semibold ${getSeverityColor(threat.severity)}`}>
                              {threat.type.toUpperCase()}
                            </span>
                            <span className="text-gray-400 text-sm">
                              {new Date(threat.timestamp).toLocaleString()}
                            </span>
                          </div>
                          <p className="text-gray-300 mb-2">{threat.description}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span>Source: {threat.source}</span>
                            <span>Target: {threat.target}</span>
                          </div>
                        </div>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Info className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'policies' && (
              <div className="space-y-6">
                {policies.map((policy) => (
                  <motion.div
                    key={policy.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-lg font-semibold">{policy.name}</h4>
                      <div className="flex items-center space-x-2">
                        <span className={`px-3 py-1 rounded-full text-sm ${
                          policy.status === 'active' 
                            ? 'bg-green-900 text-green-300' 
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {policy.status}
                        </span>
                        <button
                          onClick={() => toggleSection(policy.id)}
                          className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                        >
                          {expandedSections[policy.id] ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-gray-400 text-sm">Type</div>
                        <div className="font-medium">{policy.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Enforcement</div>
                        <div className="font-medium capitalize">{policy.enforcement}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Devices</div>
                        <div className="font-medium">{policy.devices}</div>
                      </div>
                    </div>

                    {expandedSections[policy.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="border-t border-gray-700 pt-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-400">Violations</span>
                          <span className="text-red-400 font-semibold">{policy.violations}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
                            Edit Policy
                          </button>
                          <button className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors">
                            View Details
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'devices' && (
              <div className="space-y-6">
                {devices.map((device) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Monitor className="w-6 h-6 text-blue-400" />
                        <div>
                          <h4 className="text-lg font-semibold">{device.name}</h4>
                          <p className="text-gray-400 text-sm">{device.os}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{device.trustScore}%</div>
                        <div className="text-sm text-gray-400">Trust Score</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Type</div>
                        <div className="font-medium capitalize">{device.type}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Status</div>
                        <div className="font-medium capitalize text-green-400">{device.status}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Location</div>
                        <div className="font-medium">{device.location}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'networks' && (
              <div className="space-y-6">
                {networks.map((network) => (
                  <motion.div
                    key={network.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gray-800 rounded-lg p-6 border border-gray-700"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Network className="w-6 h-6 text-purple-400" />
                        <div>
                          <h4 className="text-lg font-semibold">{network.name}</h4>
                          <p className="text-gray-400 text-sm capitalize">{network.type}</p>
                        </div>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        network.status === 'secure' 
                          ? 'bg-green-900 text-green-300' 
                          : 'bg-yellow-900 text-yellow-300'
                      }`}>
                        {network.status}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-gray-400 text-sm">Security Level</div>
                        <div className="font-medium capitalize">{network.securityLevel}</div>
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Connected Devices</div>
                        <div className="font-medium">{network.devices}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ZeroTrustPlatform;
