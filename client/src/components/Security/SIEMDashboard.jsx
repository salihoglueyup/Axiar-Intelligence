import React, { useState, useEffect } from 'react';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Activity,
  TrendingUp,
  TrendingDown,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  Globe,
  Wifi,
  Users,
  UserCheck,
  UserX,
  Clock,
  Calendar,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  Settings,
  Bell,
  Mail,
  MessageSquare,
  FileText,
  BarChart3,
  LineChart,
  PieChart,
  Map,
  Target,
  Zap,
  Cpu,
  HardDrive,
  MemoryStick,
  Thermometer,
  Wind,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Bolt,
  Power,
  Gauge,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  ArrowLeft,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreVertical,
  MoreHorizontal,
  Expand,
  Shrink,
  Fullscreen,
  Minimize,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Router,
  Network,
  Cable,
  Satellite,
  Radio,
  Signal,
  WifiOff,
  WifiOn,
  Ethernet,
  Usb,
  Bluetooth,
  BluetoothOff,
  Nfc,
  QrCode,
  Fingerprint,
  User,
  UserPlus,
  UserMinus,
  Users2,
  ShieldCheck,
  ShieldX,
  ShieldAlert,
  ShieldOff,
  KeyRound,
  KeySquare,
  Keyhole,
  Password,
  AlertCircle,
  AlertOctagon,
  HelpCircle,
  CheckSquare,
  Square,
  Circle,
  Triangle,
  Pentagon,
  Hexagon,
  Star,
  Heart,
  ZapOff,
  ZapOn,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  BatteryCharging,
  Cpu2,
  HardDrive2,
  MemoryStick2,
  SdCard,
  SdCard2,
  Usb2,
  Ethernet2,
  Wifi2,
  Router2,
  Server2,
  Cloud2,
  Cloud3,
  Cloud4,
  Cloud5,
  Cloud6,
  Cloud7,
  Cloud8,
  Cloud9,
  Cloud10,
  Cloud11,
  Cloud12,
  Cloud13,
  Cloud14,
  Cloud15,
  Cloud16,
  Cloud17,
  Cloud18,
  Cloud19,
  Cloud20
} from 'lucide-react';

const SIEMDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [alerts, setAlerts] = useState([]);
  const [threats, setThreats] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [rules, setRules] = useState([]);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(true);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'alerts', label: 'Security Alerts', icon: AlertTriangle },
    { id: 'threats', label: 'Threat Intelligence', icon: Shield },
    { id: 'incidents', label: 'Incidents', icon: AlertCircle },
    { id: 'rules', label: 'Correlation Rules', icon: Settings },
    { id: 'compliance', label: 'Compliance', icon: FileText }
  ];

  const severityLevels = {
    critical: { color: 'red', icon: AlertTriangle, label: 'Critical' },
    high: { color: 'orange', icon: AlertCircle, label: 'High' },
    medium: { color: 'yellow', icon: AlertTriangle, label: 'Medium' },
    low: { color: 'blue', icon: Info, label: 'Low' },
    info: { color: 'gray', icon: Info, label: 'Info' }
  };

  const alertCategories = {
    malware: { icon: Shield, label: 'Malware' },
    phishing: { icon: Eye, label: 'Phishing' },
    ddos: { icon: WifiOff, label: 'DDoS' },
    intrusion: { icon: UserX, label: 'Intrusion' },
    data_breach: { icon: Database, label: 'Data Breach' },
    policy_violation: { icon: FileText, label: 'Policy Violation' },
    system_anomaly: { icon: Cpu, label: 'System Anomaly' },
    network_anomaly: { icon: Network, label: 'Network Anomaly' }
  };

  useEffect(() => {
    loadAlerts();
    loadThreats();
    loadIncidents();
    loadRules();
  }, []);

  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        loadAlerts();
        loadThreats();
        loadIncidents();
      }, 30000); // Refresh every 30 seconds

      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const loadAlerts = async () => {
    // Mock data - replace with actual API call
    const mockAlerts = [
      {
        id: 'alert_1',
        title: 'Suspicious Login Activity Detected',
        description: 'Multiple failed login attempts from unusual IP address',
        severity: 'high',
        category: 'intrusion',
        status: 'open',
        source: 'authentication_system',
        timestamp: '2024-03-23T14:30:00Z',
        sourceIp: '192.168.1.100',
        targetIp: '10.0.0.1',
        user: 'admin',
        details: {
          failedAttempts: 5,
          timeWindow: '5 minutes',
          unusualLocation: 'Unknown',
          deviceType: 'Desktop',
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        },
        actions: ['block_ip', 'notify_admin', 'require_mfa'],
        assignedTo: 'security_team_1',
        tags: ['brute_force', 'authentication', 'suspicious_activity']
      },
      {
        id: 'alert_2',
        title: 'Malware Detection on File Server',
        description: 'Trojan horse detected in uploaded file',
        severity: 'critical',
        category: 'malware',
        status: 'investigating',
        source: 'antivirus_system',
        timestamp: '2024-03-23T13:45:00Z',
        sourceIp: '10.0.0.50',
        targetIp: '10.0.0.10',
        user: 'user_12345',
        details: {
          fileName: 'document.pdf.exe',
          fileSize: '2.3 MB',
          hash: 'a1b2c3d4e5f6',
          detectedBy: 'ClamAV',
          threatType: 'Trojan.GenericKD.12345'
        },
        actions: ['quarantine_file', 'scan_network', 'notify_user'],
        assignedTo: 'security_team_2',
        tags: ['malware', 'trojan', 'file_upload']
      },
      {
        id: 'alert_3',
        title: 'Unusual Data Transfer Pattern',
        description: 'Large volume of data being transferred to external server',
        severity: 'medium',
        category: 'data_breach',
        status: 'open',
        source: 'network_monitor',
        timestamp: '2024-03-23T12:15:00Z',
        sourceIp: '10.0.0.25',
        targetIp: '203.0.113.1',
        user: 'user_67890',
        details: {
          dataVolume: '15.2 GB',
          duration: '2 hours',
          protocol: 'HTTPS',
          destination: 'unknown_external_server'
        },
        actions: ['investigate', 'block_transfer', 'audit_user'],
        assignedTo: 'security_team_1',
        tags: ['data_exfiltration', 'unusual_behavior', 'network']
      },
      {
        id: 'alert_4',
        title: 'DDoS Attack Detected',
        description: 'High volume of requests from multiple sources',
        severity: 'high',
        category: 'ddos',
        status: 'mitigating',
        source: 'web_application_firewall',
        timestamp: '2024-03-23T11:30:00Z',
        sourceIp: 'multiple_sources',
        targetIp: '10.0.0.5',
        user: null,
        details: {
          requestRate: '5000 req/min',
          sources: '125 unique IPs',
          targetEndpoint: '/api/login',
          attackType: 'HTTP Flood'
        },
        actions: ['rate_limit', 'block_sources', 'enable_captcha'],
        assignedTo: 'security_team_3',
        tags: ['ddos', 'web_attack', 'high_volume']
      }
    ];
    
    setAlerts(mockAlerts);
  };

  const loadThreats = async () => {
    // Mock data - replace with actual API call
    const mockThreats = [
      {
        id: 'threat_1',
        name: 'APT29 Operation',
        type: 'advanced_persistent_threat',
        severity: 'critical',
        status: 'active',
        firstSeen: '2024-03-20T10:00:00Z',
        lastSeen: '2024-03-23T14:30:00Z',
        confidence: 0.95,
        description: 'State-sponsored threat group targeting financial institutions',
        actors: ['APT29', 'Cozy Bear'],
        indicators: [
          { type: 'ip', value: '203.0.113.1', confidence: 0.9 },
          { type: 'domain', value: 'malicious.example.com', confidence: 0.85 },
          { type: 'hash', value: 'a1b2c3d4e5f6', confidence: 0.95 },
          { type: 'email', value: 'suspicious@threat.com', confidence: 0.8 }
        ],
        tactics: ['Initial Access', 'Execution', 'Persistence', 'Exfiltration'],
        techniques: ['Spearphishing Attachment', 'PowerShell', 'Scheduled Task', 'Data Staged'],
        affectedAssets: ['web_server', 'database', 'file_server'],
        mitigation: 'Block known indicators, implement network segmentation, enhance monitoring'
      },
      {
        id: 'threat_2',
        name: 'Ransomware Campaign',
        type: 'ransomware',
        severity: 'high',
        status: 'active',
        firstSeen: '2024-03-18T15:30:00Z',
        lastSeen: '2024-03-23T09:15:00Z',
        confidence: 0.88,
        description: 'Widespread ransomware campaign targeting healthcare organizations',
        actors: ['Conti', 'LockBit'],
        indicators: [
          { type: 'ip', value: '198.51.100.1', confidence: 0.9 },
          { type: 'domain', value: 'ransomware.c2.example', confidence: 0.85 },
          { type: 'hash', value: 'f6e5d4c3b2a1', confidence: 0.92 }
        ],
        tactics: ['Initial Access', 'Execution', 'Impact'],
        techniques: ['Phishing', 'Scripting', 'Data Encrypted for Impact'],
        affectedAssets: ['workstations', 'file_servers'],
        mitigation: 'Update antivirus, educate users, implement backup strategy'
      },
      {
        id: 'threat_3',
        name: 'Supply Chain Attack',
        type: 'supply_chain',
        severity: 'medium',
        status: 'monitoring',
        firstSeen: '2024-03-15T08:00:00Z',
        lastSeen: '2024-03-22T16:45:00Z',
        confidence: 0.75,
        description: 'Compromised software library affecting multiple applications',
        actors: ['Unknown'],
        indicators: [
          { type: 'package', value: 'malicious-lib@1.2.3', confidence: 0.8 },
          { type: 'hash', value: 'b7a6c5d4e3f2', confidence: 0.85 }
        ],
        tactics: ['Initial Access', 'Persistence'],
        techniques: ['Supply Chain Compromise', 'Valid Accounts'],
        affectedAssets: ['web_application', 'api_server'],
        mitigation: 'Update dependencies, implement dependency scanning, monitor for unusual behavior'
      }
    ];
    
    setThreats(mockThreats);
  };

  const loadIncidents = async () => {
    // Mock data - replace with actual API call
    const mockIncidents = [
      {
        id: 'incident_1',
        title: 'Data Breach Investigation',
        description: 'Unauthorized access to customer database detected',
        severity: 'critical',
        status: 'investigating',
        priority: 'high',
        createdAt: '2024-03-23T10:30:00Z',
        updatedAt: '2024-03-23T14:30:00Z',
        assignedTo: 'security_team_1',
        reportedBy: 'automated_monitoring',
        category: 'data_breach',
        impact: {
          affectedSystems: ['customer_database', 'api_server'],
          dataExposed: 'customer_records',
          estimatedLoss: '$50,000',
          businessImpact: 'high'
        },
        timeline: [
          { timestamp: '2024-03-23T10:30:00Z', event: 'Incident detected', actor: 'system' },
          { timestamp: '2024-03-23T11:00:00Z', event: 'Investigation started', actor: 'security_team_1' },
          { timestamp: '2024-03-23T12:30:00Z', event: 'Breach confirmed', actor: 'security_team_1' },
          { timestamp: '2024-03-23T14:30:00Z', event: 'Containment initiated', actor: 'security_team_1' }
        ],
        actions: [
          { type: 'containment', status: 'in_progress', description: 'Isolate affected systems' },
          { type: 'investigation', status: 'in_progress', description: 'Determine breach scope' },
          { type: 'notification', status: 'pending', description: 'Notify affected parties' }
        ],
        relatedAlerts: ['alert_1', 'alert_3'],
        tags: ['data_breach', 'customer_data', 'investigation']
      },
      {
        id: 'incident_2',
        title: 'Malware Outbreak',
        description: 'Multiple systems infected with ransomware',
        severity: 'high',
        status: 'contained',
        priority: 'high',
        createdAt: '2024-03-22T16:45:00Z',
        updatedAt: '2024-03-23T09:15:00Z',
        assignedTo: 'security_team_2',
        reportedBy: 'user_report',
        category: 'malware',
        impact: {
          affectedSystems: ['workstation_1', 'workstation_2', 'file_server'],
          dataEncrypted: 'user_files',
          estimatedLoss: '$25,000',
          businessImpact: 'medium'
        },
        timeline: [
          { timestamp: '2024-03-22T16:45:00Z', event: 'First infection reported', actor: 'user_12345' },
          { timestamp: '2024-03-22T17:30:00Z', event: 'Outbreak confirmed', actor: 'security_team_2' },
          { timestamp: '2024-03-22T18:00:00Z', event: 'Containment started', actor: 'security_team_2' },
          { timestamp: '2024-03-23T09:15:00Z', event: 'Systems restored', actor: 'security_team_2' }
        ],
        actions: [
          { type: 'containment', status: 'completed', description: 'Isolate infected systems' },
          { type: 'eradication', status: 'completed', description: 'Remove malware' },
          { type: 'recovery', status: 'completed', description: 'Restore from backups' }
        ],
        relatedAlerts: ['alert_2'],
        tags: ['malware', 'ransomware', 'outbreak']
      }
    ];
    
    setIncidents(mockIncidents);
  };

  const loadRules = async () => {
    // Mock data - replace with actual API call
    const mockRules = [
      {
        id: 'rule_1',
        name: 'Multiple Failed Logins',
        description: 'Detect multiple failed login attempts from same IP',
        enabled: true,
        severity: 'high',
        category: 'authentication',
        conditions: [
          { field: 'event_type', operator: 'equals', value: 'login_failed' },
          { field: 'source_ip', operator: 'same', value: null },
          { field: 'count', operator: 'greater_than', value: 5 },
          { field: 'time_window', operator: 'less_than', value: '300' }
        ],
        actions: ['create_alert', 'block_ip_temporarily', 'notify_admin'],
        created: '2024-03-15T10:00:00Z',
        updated: '2024-03-20T14:30:00Z',
        author: 'security_admin',
        tags: ['authentication', 'brute_force', 'login']
      },
      {
        id: 'rule_2',
        name: 'Unusual Data Transfer',
        description: 'Detect large data transfers to external locations',
        enabled: true,
        severity: 'medium',
        category: 'data_exfiltration',
        conditions: [
          { field: 'event_type', operator: 'equals', value: 'data_transfer' },
          { field: 'destination', operator: 'not_in', value: ['internal_network'] },
          { field: 'data_size', operator: 'greater_than', value: '10737418240' }, // 10GB
          { field: 'time_window', operator: 'less_than', value: '3600' }
        ],
        actions: ['create_alert', 'log_transfer', 'notify_security_team'],
        created: '2024-03-10T15:30:00Z',
        updated: '2024-03-18T09:15:00Z',
        author: 'security_admin',
        tags: ['data_exfiltration', 'transfer', 'external']
      },
      {
        id: 'rule_3',
        name: 'Malware Detection',
        description: 'Create alert when malware is detected',
        enabled: true,
        severity: 'critical',
        category: 'malware',
        conditions: [
          { field: 'event_type', operator: 'equals', value: 'malware_detected' },
          { field: 'confidence', operator: 'greater_than', value: 0.8 }
        ],
        actions: ['create_alert', 'quarantine_file', 'scan_system', 'notify_admin'],
        created: '2024-03-05T09:00:00Z',
        updated: '2024-03-15T13:30:00Z',
        author: 'security_admin',
        tags: ['malware', 'detection', 'quarantine']
      }
    ];
    
    setRules(mockRules);
  };

  const handleAlertAction = async (alertId, action) => {
    // Mock action handling
    console.log('Handling alert action:', alertId, action);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-red-900/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-500" />
            </div>
            <span className="text-red-500 text-sm">+15%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">24</div>
          <div className="text-gray-400 text-sm">Active Alerts</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-900/20 rounded-lg">
              <Shield className="w-6 h-6 text-orange-500" />
            </div>
            <span className="text-orange-500 text-sm">+8%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">8</div>
          <div className="text-gray-400 text-sm">Active Threats</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-yellow-900/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-yellow-500" />
            </div>
            <span className="text-green-500 text-sm">-5%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">12</div>
          <div className="text-gray-400 text-sm">Open Incidents</div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-900/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-green-500 text-sm">92%</span>
          </div>
          <div className="text-2xl font-bold text-white mb-1">92%</div>
          <div className="text-gray-400 text-sm">System Health</div>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Recent Security Alerts</h3>
          <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors">
            View All
          </button>
        </div>
        
        <div className="space-y-4">
          {alerts.slice(0, 5).map(alert => (
            <div key={alert.id} className="flex items-center justify-between p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className={`p-2 rounded-lg ${
                  severityLevels[alert.severity].color === 'red' ? 'bg-red-900/20' :
                  severityLevels[alert.severity].color === 'orange' ? 'bg-orange-900/20' :
                  severityLevels[alert.severity].color === 'yellow' ? 'bg-yellow-900/20' :
                  severityLevels[alert.severity].color === 'blue' ? 'bg-blue-900/20' :
                  'bg-gray-900/20'
                }`}>
                  {React.createElement(severityLevels[alert.severity].icon, { 
                    className: `w-5 h-5 text-${severityLevels[alert.severity].color}-500` 
                  })}
                </div>
                <div>
                  <h4 className="text-white font-medium">{alert.title}</h4>
                  <p className="text-gray-400 text-sm">{alert.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs ${
                  alert.status === 'open' ? 'bg-red-900/30 text-red-400' :
                  alert.status === 'investigating' ? 'bg-yellow-900/30 text-yellow-400' :
                  alert.status === 'mitigating' ? 'bg-orange-900/30 text-orange-400' :
                  'bg-green-900/30 text-green-400'
                }`}>
                  {alert.status}
                </span>
                <span className="text-gray-400 text-sm">
                  {new Date(alert.timestamp).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Threat Landscape */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Threat Landscape</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-white font-medium mb-3">Threat Categories</h4>
            <div className="space-y-2">
              {Object.entries(alertCategories).map(([key, category]) => {
                const count = alerts.filter(a => a.category === key).length;
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {React.createElement(category.icon, { className: "w-4 h-4 text-cyan-500" })}
                      <span className="text-gray-300">{category.label}</span>
                    </div>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-medium mb-3">Severity Distribution</h4>
            <div className="space-y-2">
              {Object.entries(severityLevels).map(([key, level]) => {
                const count = alerts.filter(a => a.severity === key).length;
                return (
                  <div key={key} className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {React.createElement(level.icon, { className: `w-4 h-4 text-${level.color}-500` })}
                      <span className="text-gray-300">{level.label}</span>
                    </div>
                    <span className="text-white font-medium">{count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAlerts = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search alerts..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Severities</option>
            {Object.entries(severityLevels).map(([key, level]) => (
              <option key={key} value={key}>{level.label}</option>
            ))}
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Categories</option>
            {Object.entries(alertCategories).map(([key, category]) => (
              <option key={key} value={key}>{category.label}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center space-x-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
            />
            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
          </label>
          <span className="text-gray-400 text-sm">Auto Refresh</span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map(alert => (
          <div key={alert.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  severityLevels[alert.severity].color === 'red' ? 'bg-red-900/20' :
                  severityLevels[alert.severity].color === 'orange' ? 'bg-orange-900/20' :
                  severityLevels[alert.severity].color === 'yellow' ? 'bg-yellow-900/20' :
                  severityLevels[alert.severity].color === 'blue' ? 'bg-blue-900/20' :
                  'bg-gray-900/20'
                }`}>
                  {React.createElement(severityLevels[alert.severity].icon, { 
                    className: `w-6 h-6 text-${severityLevels[alert.severity].color}-500` 
                  })}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{alert.title}</h3>
                  <p className="text-gray-400 mb-3">{alert.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      alert.status === 'open' ? 'bg-red-900/30 text-red-400' :
                      alert.status === 'investigating' ? 'bg-yellow-900/30 text-yellow-400' :
                      alert.status === 'mitigating' ? 'bg-orange-900/30 text-orange-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {alert.status}
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {alertCategories[alert.category].label}
                    </span>
                    {alert.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Source: </span>
                      <span className="text-white">{alert.source}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Time: </span>
                      <span className="text-white">{new Date(alert.timestamp).toLocaleString()}</span>
                    </div>
                    {alert.sourceIp && (
                      <div>
                        <span className="text-gray-400">Source IP: </span>
                        <span className="text-white">{alert.sourceIp}</span>
                      </div>
                    )}
                    {alert.user && (
                      <div>
                        <span className="text-gray-400">User: </span>
                        <span className="text-white">{alert.user}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedAlert(alert)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {alert.details && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Details</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(alert.details).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}: </span>
                      <span className="text-white">{JSON.stringify(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {alert.actions && alert.actions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Recommended Actions</h4>
                <div className="flex flex-wrap gap-2">
                  {alert.actions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleAlertAction(alert.id, action)}
                      className="px-3 py-1 bg-cyan-600 text-white rounded hover:bg-cyan-700 transition-colors text-sm"
                    >
                      {action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderThreats = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search threats..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Types</option>
            <option value="advanced_persistent_threat">Advanced Persistent Threat</option>
            <option value="ransomware">Ransomware</option>
            <option value="phishing">Phishing</option>
            <option value="malware">Malware</option>
            <option value="supply_chain">Supply Chain</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>Add Threat Intel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {threats.map(threat => (
          <div key={threat.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{threat.name}</h3>
                <p className="text-gray-400 text-sm mb-3">{threat.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    threat.status === 'active' ? 'bg-red-900/30 text-red-400' :
                    threat.status === 'monitoring' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-gray-900/30 text-gray-400'
                  }`}>
                    {threat.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    threat.severity === 'critical' ? 'bg-red-900/30 text-red-400' :
                    threat.severity === 'high' ? 'bg-orange-900/30 text-orange-400' :
                    threat.severity === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-blue-900/30 text-blue-400'
                  }`}>
                    {threat.severity}
                  </span>
                  <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                    {(threat.confidence * 100).toFixed(1)}% confidence
                  </span>
                </div>
                
                <div className="grid grid-cols-1 gap-2 text-sm">
                  <div>
                    <span className="text-gray-400">Type: </span>
                    <span className="text-white">{threat.type.replace(/_/g, ' ')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">First Seen: </span>
                    <span className="text-white">{new Date(threat.firstSeen).toLocaleDateString()}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Last Seen: </span>
                    <span className="text-white">{new Date(threat.lastSeen).toLocaleDateString()}</span>
                  </div>
                  {threat.actors && threat.actors.length > 0 && (
                    <div>
                      <span className="text-gray-400">Actors: </span>
                      <span className="text-white">{threat.actors.join(', ')}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {threat.indicators && threat.indicators.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Indicators</h4>
                <div className="space-y-2">
                  {threat.indicators.map((indicator, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-400">{indicator.type}:</span>
                        <span className="text-white font-mono">{indicator.value}</span>
                      </div>
                      <span className="text-gray-400">
                        {(indicator.confidence * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {threat.tactics && threat.tactics.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">MITRE ATT&CK Tactics</h4>
                <div className="flex flex-wrap gap-2">
                  {threat.tactics.map((tactic, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {tactic}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {threat.mitigation && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Mitigation</h4>
                <p className="text-gray-400 text-sm">{threat.mitigation}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderIncidents = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search incidents..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Severities</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Statuses</option>
            <option value="open">Open</option>
            <option value="investigating">Investigating</option>
            <option value="contained">Contained</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Incident</span>
        </button>
      </div>

      <div className="space-y-4">
        {incidents.map(incident => (
          <div key={incident.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  incident.severity === 'critical' ? 'bg-red-900/20' :
                  incident.severity === 'high' ? 'bg-orange-900/20' :
                  incident.severity === 'medium' ? 'bg-yellow-900/20' :
                  'bg-blue-900/20'
                }`}>
                  <AlertCircle className={`w-6 h-6 text-${
                    incident.severity === 'critical' ? 'red' :
                    incident.severity === 'high' ? 'orange' :
                    incident.severity === 'medium' ? 'yellow' :
                    'blue'
                  }-500`} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{incident.title}</h3>
                  <p className="text-gray-400 mb-3">{incident.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      incident.status === 'open' ? 'bg-red-900/30 text-red-400' :
                      incident.status === 'investigating' ? 'bg-yellow-900/30 text-yellow-400' :
                      incident.status === 'contained' ? 'bg-orange-900/30 text-orange-400' :
                      'bg-green-900/30 text-green-400'
                    }`}>
                      {incident.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      incident.priority === 'high' ? 'bg-red-900/30 text-red-400' :
                      incident.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {incident.priority} priority
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {incident.category.replace(/_/g, ' ')}
                    </span>
                    {incident.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Created: </span>
                      <span className="text-white">{new Date(incident.createdAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Updated: </span>
                      <span className="text-white">{new Date(incident.updatedAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Assigned to: </span>
                      <span className="text-white">{incident.assignedTo}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Reported by: </span>
                      <span className="text-white">{incident.reportedBy}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {incident.impact && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Impact Assessment</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  {Object.entries(incident.impact).map(([key, value]) => (
                    <div key={key}>
                      <span className="text-gray-400 capitalize">{key.replace(/_/g, ' ')}: </span>
                      <span className="text-white">{Array.isArray(value) ? value.join(', ') : value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {incident.timeline && incident.timeline.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Timeline</h4>
                <div className="space-y-2">
                  {incident.timeline.map((event, index) => (
                    <div key={index} className="flex items-center space-x-3 text-sm">
                      <span className="text-gray-400">
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                      <span className="text-white">{event.event}</span>
                      <span className="text-gray-400">by {event.actor}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {incident.actions && incident.actions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Actions</h4>
                <div className="space-y-2">
                  {incident.actions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded text-xs ${
                          action.status === 'completed' ? 'bg-green-900/30 text-green-400' :
                          action.status === 'in_progress' ? 'bg-yellow-900/30 text-yellow-400' :
                          'bg-gray-900/30 text-gray-400'
                        }`}>
                          {action.status.replace(/_/g, ' ')}
                        </span>
                        <span className="text-white">{action.description}</span>
                      </div>
                      <span className="text-gray-400">{action.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderRules = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search rules..."
              className="pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-cyan-500">
            <option value="">All Categories</option>
            <option value="authentication">Authentication</option>
            <option value="data_exfiltration">Data Exfiltration</option>
            <option value="malware">Malware</option>
            <option value="network">Network</option>
          </select>
        </div>
        
        <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
          <Plus className="w-4 h-4" />
          <span>New Rule</span>
        </button>
      </div>

      <div className="space-y-4">
        {rules.map(rule => (
          <div key={rule.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  rule.enabled ? 'bg-green-900/20' : 'bg-gray-900/20'
                }`}>
                  {rule.enabled ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <XCircle className="w-6 h-6 text-gray-500" />
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-2">{rule.name}</h3>
                  <p className="text-gray-400 mb-3">{rule.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      rule.severity === 'critical' ? 'bg-red-900/30 text-red-400' :
                      rule.severity === 'high' ? 'bg-orange-900/30 text-orange-400' :
                      rule.severity === 'medium' ? 'bg-yellow-900/30 text-yellow-400' :
                      'bg-blue-900/30 text-blue-400'
                    }`}>
                      {rule.severity}
                    </span>
                    <span className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                      {rule.category.replace(/_/g, ' ')}
                    </span>
                    {rule.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded-full text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-400">Created: </span>
                      <span className="text-white">{new Date(rule.created).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Updated: </span>
                      <span className="text-white">{new Date(rule.updated).toLocaleDateString()}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Author: </span>
                      <span className="text-white">{rule.author}</span>
                    </div>
                    <div>
                      <span className="text-gray-400">Status: </span>
                      <span className={rule.enabled ? 'text-green-400' : 'text-gray-400'}>
                        {rule.enabled ? 'Enabled' : 'Disabled'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 text-gray-400 hover:text-white transition-colors">
                  <Settings className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {rule.conditions && rule.conditions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Conditions</h4>
                <div className="space-y-2">
                  {rule.conditions.map((condition, index) => (
                    <div key={index} className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-400">{condition.field}</span>
                      <span className="text-white">{condition.operator}</span>
                      <span className="text-white">{condition.value || 'N/A'}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {rule.actions && rule.actions.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <h4 className="text-white font-medium mb-2">Actions</h4>
                <div className="flex flex-wrap gap-2">
                  {rule.actions.map((action, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs">
                      {action.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-6">
      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Compliance Status</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: 'GDPR', status: 'compliant', score: 95, lastAudit: '2024-03-15' },
            { name: 'SOC 2', status: 'compliant', score: 92, lastAudit: '2024-03-10' },
            { name: 'ISO 27001', status: 'in_progress', score: 88, lastAudit: '2024-03-20' },
            { name: 'HIPAA', status: 'compliant', score: 98, lastAudit: '2024-03-12' },
            { name: 'PCI DSS', status: 'non_compliant', score: 78, lastAudit: '2024-03-18' },
            { name: 'CCPA', status: 'compliant', score: 91, lastAudit: '2024-03-08' }
          ].map((compliance, index) => (
            <div key={index} className="bg-gray-800/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-white font-medium">{compliance.name}</h4>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  compliance.status === 'compliant' ? 'bg-green-900/30 text-green-400' :
                  compliance.status === 'in_progress' ? 'bg-yellow-900/30 text-yellow-400' :
                  'bg-red-900/30 text-red-400'
                }`}>
                  {compliance.status.replace(/_/g, ' ')}
                </span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Compliance Score</span>
                  <span className="text-white">{compliance.score}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Last Audit</span>
                  <span className="text-white">{compliance.lastAudit}</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      compliance.score >= 90 ? 'bg-green-500' :
                      compliance.score >= 80 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${compliance.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-3">
            <Shield className="w-8 h-8 text-cyan-500" />
            <span>Security Information and Event Management</span>
          </h2>
          <p className="text-gray-400 mt-2">
            Advanced SIEM platform for threat detection and incident response
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2">
            <HelpCircle className="w-4 h-4" />
            <span>Documentation</span>
          </button>
          <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Report</span>
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
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'alerts' && renderAlerts()}
        {activeTab === 'threats' && renderThreats()}
        {activeTab === 'incidents' && renderIncidents()}
        {activeTab === 'rules' && renderRules()}
        {activeTab === 'compliance' && renderCompliance()}
      </div>
    </div>
  );
};

export default SIEMDashboard;
